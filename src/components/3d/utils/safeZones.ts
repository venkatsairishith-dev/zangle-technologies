import * as THREE from 'three';
import { clamp, smoothstep } from './motion';

/**
 * Screen-space exclusion zones.
 *
 * The HTML layout has priority over the 3D world, so the scene is composed
 * around the page rather than the other way round. Every zone below is a
 * rectangle in *viewport* space -- not world space -- because that is the only
 * frame in which "behind the headline" is a meaningful statement. World-space
 * keep-out volumes cannot work here: the camera flies through the scene, so a
 * volume that clears the headline at the top of the page is somewhere else
 * entirely two seconds later.
 *
 * Rectangles are authored top-down (y = 0 at the top of the viewport, matching
 * how the page is designed) and converted once to the bottom-up convention that
 * both NDC and `gl_FragCoord` use.
 *
 * The `dim` values are deliberately partial. Readability is bought by *moving*
 * objects out (`push`), and the fade is only there to catch whatever is too
 * large or too far to move -- a ribbon spanning the frame, a distant sphere.
 * Dimming to near-zero would keep the text readable by deleting the background,
 * which is not a background any more.
 */
export interface SafeZone {
  id: string;
  /** Authored top-down: left, top, right, bottom as fractions of the viewport. */
  rect: [number, number, number, number];
  /**
   * Extra clearance kept beyond the zone's edge, as a fraction of the viewport.
   *
   * Note this is a *margin*, not a magnitude: how far an object is moved is
   * derived from how far inside the zone it actually is, and this only says
   * how much daylight to leave once it is out. Driving the displacement from
   * a fixed magnitude scaled by the zone's fade weight was wrong -- weight
   * climbs 0 to 1 across the feather, so an object sitting near an edge got
   * anything from no push to the full push as the camera's idle float nudged
   * its projection back and forth, and slid several units across the frame
   * doing it. Penetration depth is naturally zero at the boundary, so the
   * response is continuous there and objects stop twitching.
   */
  push: number;
  /** How far towards invisible an object goes at the centre of the zone. */
  dim: number;
  /**
   * `sticky` zones apply for the whole page (the navbar is fixed, so it is
   * always over the canvas). `hero` zones only exist while the first viewport
   * is on screen and fade out as the user scrolls past them.
   */
  scope: 'sticky' | 'hero';
}

export const SAFE_ZONES: SafeZone[] = [
  {
    id: 'nav',
    // Full width: the navbar spans the viewport and is fixed, so nothing may
    // ever drift up behind it.
    rect: [0, 0, 1, 0.117],
    push: 0.05,
    // The navbar is the one place dimmed hard rather than partially. It is a
    // thin strip so almost no scene is lost, and its links are small text over
    // a translucent bar -- the least forgiving type on the page.
    dim: 0.86,
    scope: 'sticky',
  },
  {
    id: 'hero-copy',
    // Eyebrow through trust indicators. Deliberately a little taller and wider
    // than the text itself so objects start yielding before they touch it --
    // the headline's own last line reaches about 53% of the viewport, so a
    // narrower zone let objects sit against the final word.
    rect: [0, 0.22, 0.55, 0.9],
    push: 0.075,
    dim: 0.5,
    scope: 'hero',
  },
  {
    id: 'dashboard',
    // The shortlist card. Dimmed less than the copy: the card is opaque, so
    // objects behind it cannot hurt readability -- this only stops large
    // shapes visually merging with its edges.
    rect: [0.55, 0.22, 0.97, 0.98],
    push: 0.04,
    dim: 0.3,
    scope: 'hero',
  },
];

/**
 * Feather width, in viewport fractions, over which a zone fades in.
 *
 * Capped against the zone's own smaller half-extent, because a feather wider
 * than the zone is thick means the zone never reaches full strength *anywhere*
 * -- the fade-in from one edge is still running when the fade-out from the
 * opposite edge begins. The navbar strip is 10.5% tall, i.e. half-extent 0.052
 * against a 0.11 feather, so it was topping out at roughly half the dimming it
 * was configured for and objects stayed visible behind the nav links.
 */
const FEATHER = 0.11;

function featherFor(halfX: number, halfY: number): number {
  return Math.min(FEATHER, Math.min(halfX, halfY) * 0.9);
}

/**
 * Narrow-viewport overrides.
 *
 * The desktop layout puts the copy in the left 48% and the card on the right;
 * the same page in portrait stacks them, so the copy spans the full width and
 * the card has moved below the fold entirely. Reusing the desktop rectangles on
 * a phone would protect an empty left column and leave the actual headline
 * exposed -- so the zones follow the layout, exactly as the page's own
 * breakpoints do.
 */
const PORTRAIT_RECTS: Partial<Record<string, [number, number, number, number]>> = {
  'hero-copy': [0, 0.18, 1, 0.82],
  // Off-screen: on a phone the shortlist card is a scroll away, so there is
  // nothing here to keep clear.
  dashboard: [0, 1.4, 1, 1.5],
};

/** Bottom-up rects (x0, y0, x1, y1), which is what NDC and gl_FragCoord use. */
function toBottomUp(rect: [number, number, number, number]): THREE.Vector4 {
  return new THREE.Vector4(rect[0], 1 - rect[3], rect[2], 1 - rect[1]);
}

export const SAFE_ZONE_RECTS: THREE.Vector4[] = SAFE_ZONES.map((z) => toBottomUp(z.rect));

/**
 * Live uniform block, shared *by reference* with every ribbon and particle
 * material in the scene. One controller writes it once per frame; nothing else
 * has to know the zones exist.
 *
 * `.w` of `dims` carries the hero weight, so a single uniform read in the
 * shader covers both "how strong is each zone" and "are the hero zones alive
 * at all".
 */
export const safeZoneUniforms = {
  uZoneA: { value: SAFE_ZONE_RECTS[0] },
  uZoneB: { value: SAFE_ZONE_RECTS[1] },
  uZoneC: { value: SAFE_ZONE_RECTS[2] },
  /** x, y, z = per-zone dim strength; w = hero weight 0..1. */
  uZoneDims: { value: new THREE.Vector4(SAFE_ZONES[0].dim, SAFE_ZONES[1].dim, SAFE_ZONES[2].dim, 1) },
  uZoneFeather: { value: FEATHER },
};

/**
 * Point the zones at whichever layout is on screen. Cheap enough to call every
 * frame; it only writes when the breakpoint actually changes, and because the
 * uniforms *are* the rects, one call keeps the CPU tests and both shaders in
 * agreement. Threshold matches the page's own stacking point.
 */
let currentLayout: 'landscape' | 'portrait' | null = null;

/**
 * Horizontal compression of the composition, shared by every object that reads
 * a base X. The scene's X positions are authored against a landscape frustum;
 * at a phone's aspect the horizontal half-width collapses to under a third of
 * that, which throws objects authored at x = +/-9 out to NDC +/-1.9 -- off
 * screen, leaving the background nearly empty. Scaling base X back by the same
 * ratio keeps the composition in frame without re-authoring it per breakpoint.
 *
 * Read every frame as part of the BASE transform, never accumulated.
 */
export const viewLayout = { xScale: 1, portrait: false };

const REFERENCE_ASPECT = 1.6;
const MIN_X_SCALE = 0.42;

export function updateZoneLayout(aspect: number): void {
  // Continuous, so a resize drags the composition with it rather than snapping
  // at the breakpoint -- unlike the rect swap below, which is discrete.
  viewLayout.xScale = Math.min(1, Math.max(MIN_X_SCALE, aspect / REFERENCE_ASPECT));

  const layout = aspect < 1.05 ? 'portrait' : 'landscape';
  if (layout === currentLayout) return;
  currentLayout = layout;
  viewLayout.portrait = layout === 'portrait';
  for (let i = 0; i < SAFE_ZONES.length; i++) {
    const zone = SAFE_ZONES[i];
    const override = layout === 'portrait' ? PORTRAIT_RECTS[zone.id] : undefined;
    SAFE_ZONE_RECTS[i].copy(toBottomUp(override ?? zone.rect));
  }
}

/**
 * How alive the hero-scoped zones are. Full strength while the first viewport
 * is on screen, gone by the time it has scrolled away -- past that point the
 * headline and the card are no longer there to protect.
 */
export function heroWeight(scrollProgress: number, viewportsInPage: number): number {
  if (viewportsInPage <= 0) return 1;
  // scrollProgress is 0..1 over the whole document; convert to viewports.
  const viewportsScrolled = scrollProgress * viewportsInPage;
  return 1 - smoothstep(0.1, 0.85, viewportsScrolled);
}

/**
 * Signed distance from a point to a rect, negative inside. Standard rounded-box
 * SDF with the radius left at zero.
 */
function rectSdf(u: number, v: number, r: THREE.Vector4): number {
  const cx = (r.x + r.z) * 0.5;
  const cy = (r.y + r.w) * 0.5;
  const hx = (r.z - r.x) * 0.5;
  const hy = (r.w - r.y) * 0.5;
  const dx = Math.abs(u - cx) - hx;
  const dy = Math.abs(v - cy) - hy;
  const outside = Math.hypot(Math.max(dx, 0), Math.max(dy, 0));
  return outside + Math.min(Math.max(dx, dy), 0);
}

export interface ZoneResponse {
  /** 0..1, how far towards invisible this point should go. */
  dim: number;
  /**
   * Escape displacement in viewport fractions -- the distance still needed to
   * clear the zone's nearest edge. The caller converts to world units at the
   * object's own depth, which is the only place that conversion is defined.
   */
  pushX: number;
  pushY: number;
  /** Positive when the object should also retreat in depth. */
  pushDepth: number;
}

const response: ZoneResponse = { dim: 0, pushX: 0, pushY: 0, pushDepth: 0 };

/**
 * Evaluate every zone at one NDC point.
 *
 * Returns the *strongest* dim rather than a sum, so an object sitting in two
 * overlapping zones does not vanish twice over, while pushes accumulate --
 * being caught between two zones should squeeze an object out, not stall it.
 *
 * The escape direction is the nearest edge, not the vector from the zone
 * centre. Pushing away from the centre would drive an object trapped in the
 * middle of the hero copy straight down its length; the nearest edge always
 * gets it out in the fewest world units, which reads as the object politely
 * stepping aside.
 */
export function evaluateZones(
  ndcX: number,
  ndcY: number,
  hero: number,
  /**
   * The object's projected radius in viewport fractions. A point test is wrong
   * for anything large: a 2-unit sphere whose *centre* sits below the navbar
   * still has its whole crown behind the nav links. Inflating the test by the
   * radius is what makes "do not put large objects behind the navigation" true
   * for large objects specifically.
   */
  radius = 0,
): ZoneResponse {
  const u = ndcX * 0.5 + 0.5;
  const v = ndcY * 0.5 + 0.5;
  response.dim = 0;
  response.pushX = 0;
  response.pushY = 0;
  response.pushDepth = 0;

  for (let i = 0; i < SAFE_ZONES.length; i++) {
    const zone = SAFE_ZONES[i];
    const scope = zone.scope === 'hero' ? hero : 1;
    if (scope <= 0.001) continue;

    const rect = SAFE_ZONE_RECTS[i];
    const cx = (rect.x + rect.z) * 0.5;
    const cy = (rect.y + rect.w) * 0.5;
    const hx = (rect.z - rect.x) * 0.5;
    const hy = (rect.w - rect.y) * 0.5;
    const feather = featherFor(hx, hy);

    const sd = rectSdf(u, v, rect) - radius;
    if (sd > feather) continue;

    // 1 deep inside, 0 at the outer edge of the feather.
    const weight = (1 - smoothstep(-feather, feather, sd)) * scope;
    if (weight <= 0.001) continue;

    response.dim = Math.max(response.dim, weight * zone.dim);
    // How far the object still has to travel to clear each edge, including its
    // own radius and the zone's margin. Whichever is cheaper wins, so a wide,
    // short zone ejects vertically rather than along its length -- the nearest
    // edge always gets an object out in the fewest world units, which reads as
    // stepping aside rather than as being swept down the zone's length.
    const exitX = hx - Math.abs(u - cx) + radius + zone.push;
    const exitY = hy - Math.abs(v - cy) + radius + zone.push;
    if (exitX <= 0 || exitY <= 0) continue;

    if (exitX < exitY) {
      response.pushX += Math.sign(u - cx || 1) * exitX;
    } else {
      response.pushY += Math.sign(v - cy || 1) * exitY;
    }
    // Retreating in depth also reduces the object's apparent size, so it helps
    // even when the lateral move is clamped short.
    response.pushDepth += Math.min(exitX, exitY) * 0.45;
  }

  response.dim = clamp(response.dim, 0, 1);
  return response;
}

/**
 * The same rect masks, in GLSL, for materials that cover too much screen for a
 * per-object CPU test to mean anything -- the ribbons and the particle field.
 * Both already run custom shader code, so this rides along for a handful of
 * ALU ops and no extra draw calls.
 */
export const SAFE_ZONE_GLSL = /* glsl */ `
uniform vec4 uZoneA;
uniform vec4 uZoneB;
uniform vec4 uZoneC;
uniform vec4 uZoneDims;
uniform float uZoneFeather;

float safeZoneRect(vec2 uv, vec4 r) {
  vec2 c = (r.xy + r.zw) * 0.5;
  vec2 h = (r.zw - r.xy) * 0.5;
  vec2 d = abs(uv - c) - h;
  float sd = length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0);
  // Same cap as the CPU path: a feather wider than the zone is thick would
  // stop the zone ever reaching full strength.
  float fe = min(uZoneFeather, min(h.x, h.y) * 0.9);
  return 1.0 - smoothstep(-fe, fe, sd);
}

/** 0 = untouched, 1 = fully suppressed for readability. */
float safeZoneDim(vec2 uv) {
  float nav = safeZoneRect(uv, uZoneA) * uZoneDims.x;
  float copy = safeZoneRect(uv, uZoneB) * uZoneDims.y * uZoneDims.w;
  float card = safeZoneRect(uv, uZoneC) * uZoneDims.z * uZoneDims.w;
  return clamp(max(nav, max(copy, card)), 0.0, 1.0);
}
`;
