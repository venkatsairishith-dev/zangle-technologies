import { PALETTE, RIBBON_GRADIENTS, SCENE } from '../config';
import type {
  DepthLayer,
  FloatingObjectSpec,
  RibbonSpec,
  ShapeKind,
  ShapeSpec,
} from '../types';
import { createMotionParams } from './motion';
import { centered, makeRng, pick, range, type Rng } from './random';
import { clamp, smoothstep } from './motion';

/**
 * Scene composition.
 *
 * The first objects of every kind are hand-placed to reproduce the reference
 * frame at scroll position zero -- the hero sphere just left of centre, the pale
 * blue cube on the left third, the green cube up on the right, the foreground
 * cube falling out of the bottom-left corner. Everything after that is
 * generated down a tall volume so that scrolling reveals genuinely new
 * geometry rather than the same objects sliding past.
 *
 * Screen-space positions from the reference were mapped through the camera
 * frustum at z = 0 (fov 42deg, camera at z = 15), which is why the numbers look
 * arbitrary: they are pixel measurements pushed into world units.
 */

const AUTHORED_RIBBONS: Array<{
  points: [number, number, number][];
  width: number;
  gradient: number;
  opacity: number;
  parallax: number;
}> = [
  {
    // Right-hand sweep. Enters above the navbar on the right, falls past the
    // dashboard and exits bottom-right. It never crosses the hero copy column,
    // so the widest ribbon in the scene costs the headline nothing.
    points: [
      [3.4, 7.4, -4.0],
      [5.0, 4.4, -2.4],
      [5.8, 1.6, -1.2],
      [5.4, -1.4, 0.6],
      [6.6, -4.2, -0.6],
      [9.4, -6.4, -2.6],
      [12.6, -7.6, -4.6],
    ],
    width: 1.9,
    gradient: 0,
    opacity: 0.9,
    parallax: 0.82,
  },
  {
    // Its mint understudy, a little further back and a little lower.
    points: [
      [2.2, 8.0, -6.0],
      [4.2, 5.2, -4.4],
      [5.4, 2.4, -3.4],
      [5.2, -0.6, -2.2],
      [6.4, -3.6, -3.0],
      [9.6, -5.8, -4.8],
      [12.4, -7.2, -6.6],
    ],
    width: 1.45,
    gradient: 2,
    opacity: 0.78,
    parallax: 0.86,
  },
  {
    // Left margin. Hugs the outer edge and only re-enters frame low, under the
    // CTA row, where there is no longer any copy to cross.
    points: [
      [-12.4, 5.6, -5.0],
      [-9.6, 3.2, -3.6],
      [-8.4, 0.2, -2.6],
      [-8.8, -3.0, -1.6],
      [-7.2, -5.8, -1.0],
      [-3.6, -7.6, -2.2],
      [1.2, -8.2, -3.8],
    ],
    width: 1.55,
    gradient: 1,
    opacity: 0.8,
    parallax: 0.88,
  },
  {
    // The low crossing, kept well below the first viewport so it reads as the
    // scene opening up rather than as clutter behind the hero.
    points: [
      [-12.0, -9.4, -1.6],
      [-7.4, -10.4, 0.2],
      [-3.0, -11.2, 1.2],
      [1.6, -11.6, 0.2],
      [6.0, -11.0, -1.6],
      [10.0, -9.8, -3.2],
      [13.0, -8.8, -4.6],
    ],
    width: 1.7,
    gradient: 3,
    opacity: 0.86,
    parallax: 0.9,
  },
];

export function buildRibbons(count: number, seed = 21): RibbonSpec[] {
  const rng = makeRng(seed);
  const specs: RibbonSpec[] = [];

  for (let i = 0; i < count; i++) {
    const authored = AUTHORED_RIBBONS[i];
    let points: [number, number, number][];
    let width: number;
    let gradientIndex: number;
    let opacity: number;
    let parallax: number;

    if (authored) {
      points = authored.points;
      width = authored.width;
      gradientIndex = authored.gradient;
      opacity = authored.opacity;
      parallax = authored.parallax;
    } else {
      // Deeper ribbons live further down the volume, drawn as a wide arc that
      // crosses the whole frame so the camera always has something to fly past.
      const band = i - AUTHORED_RIBBONS.length;
      const centreY = -8 - band * 5.2 - range(rng, 0, 2.5);
      const direction = band % 2 === 0 ? 1 : -1;
      const nodes = 7;
      points = [];
      for (let n = 0; n < nodes; n++) {
        const t = n / (nodes - 1);
        points.push([
          direction * (-13 + t * 26),
          centreY + Math.sin(t * Math.PI * 1.2 + band) * 3.2 + centered(rng, 0.6),
          range(rng, -6, 2.5) - t * 2,
        ]);
      }
      width = range(rng, 1.0, 2.0);
      gradientIndex = Math.floor(rng() * RIBBON_GRADIENTS.length);
      opacity = range(rng, 0.62, 0.85);
      parallax = range(rng, 0.78, 0.95);
    }

    const [colorA, colorB] = RIBBON_GRADIENTS[gradientIndex % RIBBON_GRADIENTS.length];
    specs.push({
      id: `ribbon-${i}`,
      points,
      width,
      colorA,
      colorB,
      opacity,
      parallax,
      // Low amplitudes, low frequencies: the ribbons should breathe, not flap.
      amplitude: [range(rng, 0.28, 0.62), range(rng, 0.16, 0.4), range(rng, 0.35, 0.8)],
      frequency: [range(rng, 2.2, 4.4), range(rng, 3.4, 6.2), range(rng, 1.6, 3.0)],
      speed: [range(rng, 0.12, 0.3), range(rng, 0.09, 0.22), range(rng, 0.07, 0.16)],
      phase: range(rng, 0, Math.PI * 2),
    });
  }

  return specs;
}

/** Hand-placed spheres matching the reference composition, in world units. */

/* ------------------------------------------------------------------ */
/* Depth layers                                                        */
/* ------------------------------------------------------------------ */

/**
 * Three readable planes rather than a continuous soup.
 *
 * Background sits far back and nearly transparent so it reads as atmosphere;
 * midground carries the actual glass; foreground gets full presence because it
 * is what the user can reach and grab. Derived from z so the layering survives
 * any change to the layout, and ramped so nothing pops as the camera passes.
 */
export function depthLayerFor(z: number): DepthLayer {
  if (z < -8.5) return 'background';
  if (z < -0.5) return 'midground';
  return 'foreground';
}

export function depthOpacity(z: number): number {
  const t = smoothstep(SCENE.depthFar, SCENE.depthNear, z);
  // Wider spread than before, in both directions. The three layers are only
  // layers if they differ: background at 0.42 reads as atmosphere, foreground
  // at 1.0 is fully present and grabbable. The old 0.5-0.95 band was narrow
  // enough that everything arrived at roughly the same weight.
  return clamp(0.42 + t * 0.58, 0.42, 1.0);
}

/**
 * X placement that keeps the hero copy column clear.
 *
 * Only applies near the top of the volume -- that is the only part of the scene
 * the first viewport ever sees, and the only part where the headline exists.
 * Deeper down the scene fills the full width, which is what makes the descent
 * feel like it opens out.
 *
 * This is composition, not enforcement: the screen-space zones in `safeZones`
 * are what actually guarantee readability once objects start drifting. Placing
 * them well just means the zones rarely have to intervene, so the motion keeps
 * looking autonomous instead of corrected.
 */
function composedX(rng: Rng, y: number, z: number): number {
  const x = centered(rng, SCENE.spreadX);
  // One viewport of travel, not a third of the volume: below that the
  // headline has scrolled away and the scene is free to fill the width.
  const nearTop = 1 - smoothstep(-12, -4, y);
  if (nearTop < 0.4) return x;
  // Far-background objects are exempt. At this depth they are small, fogged
  // and already dimmed by their depth layer, so they read as atmosphere behind
  // the copy rather than as competition with it -- and something has to be
  // back there, or the headline sits on a gradient instead of inside a world.
  if (z < -11) return x;
  if (x > -6.4 && x < 2.6) {
    // Push to whichever rim is closer, favouring the right: that side has the
    // dashboard anchoring it and can carry more depth.
    return x > -1.9 ? range(rng, 2.8, SCENE.spreadX) : -range(rng, 6.6, SCENE.spreadX);
  }
  return x;
}

const AUTHORED_SPHERES: Array<[number, number, number, number]> = [
  // x, y, z, radius
  // All outside the hero copy column, weighted to the right where the
  // dashboard card anchors the composition.
  // Larger than they were. With a third as many objects in the scene, each one
  // has to hold its part of the frame on its own -- and a big form reads as
  // architecture where a small one reads as debris.
  [3.2, 3.4, -2.2, 0.66],
  [6.0, -6.4, -2.0, 0.62],
  [-8.0, 1.4, -3.6, 0.7],
  [9.0, -2.2, -1.6, 0.86],
  [-9.0, -4.2, -2.4, 0.72],
  [3.6, -8.4, 0.2, 0.8],
  [-4.2, -11.0, -6.4, 0.56],
];

export function buildSpheres(count: number, seed = 77): FloatingObjectSpec[] {
  const rng = makeRng(seed);
  const specs: FloatingObjectSpec[] = [];

  for (let i = 0; i < count; i++) {
    const authored = AUTHORED_SPHERES[i];
    const basePosition: [number, number, number] = authored
      ? [authored[0], authored[1], authored[2]]
      : (() => {
          // Distributed down the travel volume, biased below the opening frame.
          const y = range(rng, -SCENE.spreadY, -4);
          const z = range(rng, SCENE.depthFar, SCENE.depthNear);
          return [composedX(rng, y, z), y, z] as [number, number, number];
        })();
    const scale = authored ? authored[3] : range(rng, 0.5, 1.3);

    specs.push({
      id: `sphere-${i}`,
      basePosition,
      scale,
      // Nearer objects track the camera less, so they sweep past faster.
      parallax: 1 - (basePosition[2] - SCENE.depthFar) / (SCENE.depthNear - SCENE.depthFar) * 0.35,
      motion: createMotionParams(rng, 0.55 + scale),
      opacity: depthOpacity(basePosition[2]),
      layer: depthLayerFor(basePosition[2]),
      colorIndex: Math.floor(rng() * PALETTE.glass.length),
    });
  }

  return specs;
}

// Weighted toward faceted crystals and polyhedra. Cubes read as heavy and
// blocky at this scale, so exactly one soft rounded box survives per handful.
const SHAPE_KINDS: ShapeKind[] = [
  'crystal',
  'crystal',
  'icosahedron',
  'octahedron',
  'dodecahedron',
  'tetrahedron',
  'roundedBox',
];

/**
 * Shapes that anchor the opening frame.
 *
 * Everything here stays behind the composition plane and under ~0.7 radius: a
 * shape parked near the camera fills a fifth of the viewport and stops reading
 * as a floating gem, which is what the big foreground cube used to do.
 */
const AUTHORED_SHAPES: Array<[number, number, number, number, ShapeKind]> = [
  [-8.8, 2.8, -2.4, 0.78, 'crystal'],
  [8.6, 2.4, -3.8, 0.8, 'icosahedron'],
  [-9.4, -1.8, -3.2, 0.82, 'dodecahedron'],
  [3.4, 5.2, -7.0, 0.55, 'octahedron'],
  [8.4, -4.4, -3.0, 0.66, 'crystal'],
  [-7.6, -9.0, -5.4, 0.64, 'roundedBox'],
];

export function buildShapes(count: number, seed = 404): ShapeSpec[] {
  const rng = makeRng(seed);
  const specs: ShapeSpec[] = [];

  for (let i = 0; i < count; i++) {
    const authored = AUTHORED_SHAPES[i];
    const basePosition: [number, number, number] = authored
      ? [authored[0], authored[1], authored[2]]
      : (() => {
          const y = range(rng, -SCENE.spreadY, -5);
          // Held back from the near plane: a faceted shape drifting past the
          // lens is a distraction, not depth.
          const z = range(rng, SCENE.depthFar, 0.0);
          return [composedX(rng, y, z), y, z] as [number, number, number];
        })();
    const scale = authored ? authored[3] : range(rng, 0.5, 1.05);

    specs.push({
      id: `shape-${i}`,
      kind: authored ? authored[4] : pick(rng, SHAPE_KINDS),
      basePosition,
      scale,
      parallax: 1 - (basePosition[2] - SCENE.depthFar) / (SCENE.depthNear - SCENE.depthFar) * 0.4,
      motion: createMotionParams(rng, 0.5 + scale * 0.8),
      opacity: depthOpacity(basePosition[2]),
      layer: depthLayerFor(basePosition[2]),
      colorIndex: i,
    });
  }

  return specs;
}

/** Colour for a geometric shape: alternates through blue, cyan and green. */
export function shapeColor(index: number): string {
  const ramp = [...PALETTE.blue, ...PALETTE.cyan, ...PALETTE.green];
  return ramp[index % ramp.length];
}

/** Interior objects of the hero sphere, mirroring the reference's cluster. */
export function buildCoreObjects(rng: Rng = makeRng(9)) {
  const layout: Array<[number, number, number, number, number]> = [
    // x, y, z, radius, colour index -- one dominant green core, three satellites
    // Refraction magnifies, so these read considerably larger on screen than
    // their radii suggest. One dominant core with clear glass around it.
    [-0.22, -0.2, 0.04, 0.24, 0],
    [0.32, 0.28, -0.1, 0.17, 1],
    [-0.34, 0.3, 0.22, 0.15, 2],
    [0.3, -0.38, 0.18, 0.1, 3],
  ];
  return layout.map(([x, y, z, r, c], i) => ({
    id: `core-${i}`,
    basePosition: [x, y, z] as [number, number, number],
    scale: r,
    parallax: 1,
    motion: createMotionParams(rng, 0.06),
    colorIndex: c,
  }));
}


/* ------------------------------------------------------------------ */
/* Instanced background scatter                                        */
/* ------------------------------------------------------------------ */

export interface ScatterSpec {
  kind: 'sphere' | 'crystal';
  basePosition: [number, number, number];
  scale: number;
  phase: number;
  speed: number;
  amplitude: number;
  spin: number;
  /** World units this instance shifts across the full scroll, for parallax. */
  scrollOffset: number;
  colorIndex: number;
}

/**
 * The non-interactive population that fills the descent.
 *
 * Deliberately smaller and further back than anything interactive: these read
 * as depth cues rather than as objects, which is what lets them be instanced
 * with a single shared material without the scene looking cloned. They obey
 * the same hero-copy exclusion as everything else near the top of the volume.
 */
export function buildScatter(count: number, seed = 8123): ScatterSpec[] {
  const rng = makeRng(seed);
  const specs: ScatterSpec[] = [];

  for (let i = 0; i < count; i++) {
    // Biased below the opening frame: the first viewport is composed by hand,
    // and the scatter's job starts once the camera begins moving.
    const y = range(rng, -SCENE.spreadY, -6);
    const z = range(rng, SCENE.depthFar, -1.5);
    const basePosition: [number, number, number] = [composedX(rng, y, z), y, z];
    const parallax = 1 - ((z - SCENE.depthFar) / (SCENE.depthNear - SCENE.depthFar)) * 0.4;

    specs.push({
      kind: rng() > 0.45 ? 'crystal' : 'sphere',
      basePosition,
      scale: range(rng, 0.28, 0.62),
      phase: range(rng, 0, Math.PI * 2),
      speed: range(rng, 0.12, 0.3),
      amplitude: range(rng, 0.18, 0.5),
      spin: range(rng, 0.02, 0.09),
      scrollOffset: SCENE.travelY * (1 - parallax),
      colorIndex: Math.floor(rng() * 4),
    });
  }

  return specs;
}
