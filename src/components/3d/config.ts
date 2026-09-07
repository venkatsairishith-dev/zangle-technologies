import type { PerformanceTier, QualitySettings } from './types';

/**
 * Palette.
 *
 * The ground is a cool light gradient, never white. A pure white page gives a
 * transparent object nothing to be transparent *against*: glass reads by
 * bending what is behind it, so if what is behind it is #ffffff, refraction,
 * Fresnel and tint all resolve back to #ffffff and the object stops existing.
 * Backing everything off white by 6-10% is what buys the whole scene its
 * silhouette.
 */
export const PALETTE = {
  light: {
    /** Vertical gradient stops, top to bottom. */
    skyTop: '#eaf7f7',
    skyMid: '#e8f3f8',
    skyBottom: '#d3e6f2',
    /** Warm-cool bloom behind the hero sphere, upper right. */
    glow: '#c9e9f7',
    background: '#e4f0f7',
    fog: '#dceaf3',
    /** Colour the environment lightformers paint the glass with. Not white:
     *  a pure white studio reflected in every surface is the second half of
     *  the overexposure problem. */
    studio: '#dceef8',
  },
  dark: {
    skyTop: '#0a1120',
    skyMid: '#070b13',
    skyBottom: '#050912',
    glow: '#13294a',
    background: '#070b13',
    fog: '#0a1220',
    studio: '#12203a',
  },
  /**
   * Real chroma. These are the object colours, and they are saturated on
   * purpose -- against a light blue ground a pale tint is invisible, and the
   * glass, fog and Fresnel between the camera and the object will lighten
   * every one of them substantially before it reaches the screen.
   */
  blue: ['#2587ff', '#1f6fe0', '#3fa2f5', '#1b5fc8'],
  cyan: ['#00bfef', '#22cfea', '#0aa3d4'],
  green: ['#3ec96a', '#65d86e', '#00b8a9'],
  violet: ['#6f6ce0', '#8f86ee'],
  /** Glass tints for the floating spheres. */
  glass: ['#39a8e8', '#18b9a4', '#2c93da', '#5f74d8'],
  /** Emissive cores seen inside the small floating spheres. */
  core: ['#2fd6a8', '#3f9dff', '#12c7e0', '#7d76ee'],
  /** The hero lens magnifies whatever is inside it, so its cores run brighter. */
  heroCore: ['#31e0b0', '#4aa7ff', '#1fd4ea', '#8b83f4'],
} as const;

/**
 * Ribbon gradient pairs, blue -> cyan -> teal -> green.
 *
 * Held at real saturation. A ribbon is a thin, semi-transparent, double-sided
 * surface lit by a bright environment: by the time a fragment survives its own
 * alpha, the specular lobe and the fog it has already lost most of its chroma.
 * Authoring these pale meant authoring them white.
 */
export const RIBBON_GRADIENTS: Array<[string, string]> = [
  ['#2587ff', '#00bfef'],
  ['#00bfef', '#00b8a9'],
  ['#00b8a9', '#65d86e'],
  ['#1f6fe0', '#12b7c8'],
  ['#12a9e8', '#4fd07a'],
];

/**
 * The scene is a tall vertical volume. The camera starts at the top (the exact
 * composition of the reference image) and travels down it as the page scrolls,
 * so objects genuinely enter and leave frame instead of merely parallaxing.
 */
export const SCENE = {
  /** World units the camera descends across the full page scroll. */
  travelY: -46,
  /** World units the camera pushes forward across the full page scroll. */
  travelZ: -8,
  /** Half-extent the generated objects spread over on X. Kept close to the
   *  frustum half-width at z = 0 so the descent stays populated. */
  spreadX: 11,
  /** Vertical extent objects are distributed over. */
  spreadY: 56,
  /** Depth range: negative is further from camera. */
  depthNear: 2.5,
  depthFar: -18,
  cameraStart: [0, 0, 15] as [number, number, number],
  fov: 42,
} as const;

/**
 * Tier presets.
 *
 * Counts are deliberately low. These are art-direction numbers, not capability
 * numbers -- the hardware would happily draw far more, and that is precisely
 * the trap: a scene full of small objects reads as a particle demo, while a
 * handful of large, well-placed ones reads as design.
 *
 * `sphereCount`, `shapeCount` and `ribbonCount` are the *interactive* objects:
 * individually raycast, individually hoverable, each with its own material.
 * `scatterCount` is a separate, non-interactive instanced population that fills
 * the depth of the scroll journey -- the camera descends about four viewport
 * heights, and eleven interactive objects cannot both frame the opening shot
 * and keep the rest of the descent from being empty. The scatter costs two
 * draw calls no matter how many of them there are, and never raycasts.
 */
const TIER_PRESETS: Record<PerformanceTier, Omit<QualitySettings, 'tier'>> = {
  high: {
    dpr: [1, 1.5],
    antialias: true,
    transmission: true,
    heroTransmission: true,
    bloom: true,
    particleCount: 40,
    scatterCount: 20,
    sphereCount: 5,
    shapeCount: 6,
    ribbonCount: 3,
    geometryDetail: 0.9,
    envResolution: 256,
  },
  medium: {
    dpr: [1, 1.35],
    antialias: true,
    transmission: true,
    heroTransmission: false,
    bloom: true,
    particleCount: 22,
    scatterCount: 14,
    sphereCount: 4,
    shapeCount: 5,
    ribbonCount: 3,
    geometryDetail: 0.7,
    envResolution: 128,
  },
  low: {
    // Capped at 1 on low-power devices: fill rate is the binding constraint
    // there, and every 0.1 of pixel ratio is ~20% more fragments.
    dpr: [1, 1] as [number, number],
    antialias: false,
    transmission: false,
    heroTransmission: false,
    bloom: false,
    particleCount: 10,
    scatterCount: 8,
    sphereCount: 3,
    shapeCount: 4,
    ribbonCount: 2,
    geometryDetail: 0.55,
    envResolution: 64,
  },
};

export function qualityForTier(tier: PerformanceTier): QualitySettings {
  return { tier, ...TIER_PRESETS[tier] };
}

/** Selectors whose DOM hits must never steal a click for the 3D layer. */
export const UI_SELECTOR =
  'a,button,input,textarea,select,label,summary,[role="button"],[role="link"],[role="tab"],[contenteditable="true"],[data-no-3d]';
