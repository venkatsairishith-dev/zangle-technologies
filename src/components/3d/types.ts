import type { Vector3Tuple } from 'three';

/**
 * Device capability bucket. Everything expensive in the scene (object counts,
 * postprocessing, transmission/refraction, DPR) is keyed off this so the same
 * component tree renders on a phone and on a workstation.
 */
export type PerformanceTier = 'low' | 'medium' | 'high';

export interface QualitySettings {
  tier: PerformanceTier;
  /** Max device pixel ratio handed to the renderer. */
  dpr: [number, number];
  antialias: boolean;
  /** Real scene refraction (three's transmission pass). Off on low-end GPUs. */
  transmission: boolean;
  /** drei MeshTransmissionMaterial on the hero sphere (one FBO per frame). */
  heroTransmission: boolean;
  bloom: boolean;
  particleCount: number;
  /** Non-interactive instanced background objects; two draw calls total. */
  scatterCount: number;
  sphereCount: number;
  shapeCount: number;
  ribbonCount: number;
  /** Tubular/radial resolution multiplier for procedural geometry. */
  geometryDetail: number;
  /** Environment cube resolution for the lightformer studio. */
  envResolution: number;
}

/** Lifecycle of every user-controllable object in the scene. */
export type InteractionState = 'idle' | 'hover' | 'selected' | 'dragging' | 'released';

/**
 * Per-object autonomous motion. Every field is seeded from the object's index so
 * the scene is deterministic across reloads but no two objects ever move alike.
 */
export interface MotionParams {
  /** Drift amplitude on each axis, world units. */
  amplitude: Vector3Tuple;
  /** Drift frequency on each axis, radians/second. */
  frequency: Vector3Tuple;
  /** Phase offset on each axis, radians. */
  phase: Vector3Tuple;
  /** Constant angular velocity, radians/second. */
  spin: Vector3Tuple;
  /** Oscillating rotation amplitude, radians. */
  wobble: Vector3Tuple;
  /** Scale breathing amplitude, fraction of base scale. */
  breath: number;
  /** Speed of the scale breathing, radians/second. */
  breathSpeed: number;
  /** Curl-noise contribution, world units. */
  noiseAmplitude: number;
  noiseSpeed: number;
}

/**
 * Which of the three composition layers an object belongs to. Derived from its
 * depth, not authored, so the layering survives any change to the layout.
 */
export type DepthLayer = 'background' | 'midground' | 'foreground';

export interface FloatingObjectSpec {
  id: string;
  basePosition: Vector3Tuple;
  scale: number;
  /** Depth parallax factor applied to scroll travel. 1 = locked to camera path. */
  parallax: number;
  motion: MotionParams;
  /** Index into the scene palette. */
  colorIndex: number;
  /** Resting alpha for this object's depth layer. */
  opacity: number;
  layer: DepthLayer;
}

export type ShapeKind =
  | 'crystal'
  | 'dodecahedron'
  | 'icosahedron'
  | 'octahedron'
  | 'tetrahedron'
  | 'roundedBox';

export interface ShapeSpec extends FloatingObjectSpec {
  kind: ShapeKind;
}

export interface RibbonSpec {
  id: string;
  /** Control points of the Catmull-Rom spine. */
  points: Vector3Tuple[];
  width: number;
  colorA: string;
  colorB: string;
  opacity: number;
  parallax: number;
  /** Wave amplitudes: [normal-1, normal-2, lateral]. */
  amplitude: Vector3Tuple;
  /** Wave frequencies along the spine. */
  frequency: Vector3Tuple;
  /** Wave animation speeds. */
  speed: Vector3Tuple;
  phase: number;
}
