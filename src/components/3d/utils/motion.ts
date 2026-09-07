import type { MotionParams } from '../types';
import { centered, fbm3, range, type Rng } from './random';

/**
 * Frame-rate independent exponential approach. `smoothing` is the fraction of
 * the remaining distance left after one second, so the result is identical at
 * 30fps and 144fps -- the reason the camera never stutters or jumps.
 */
export function damp(current: number, target: number, smoothing: number, dt: number): number {
  return target + (current - target) * Math.exp(-smoothing * dt);
}

/** Shortest-path angular damp, so rotations never unwind the long way round. */
export function dampAngle(current: number, target: number, smoothing: number, dt: number): number {
  let delta = target - current;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  return damp(current, current + delta, smoothing, dt);
}

export function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Builds one object's motion signature. Amplitudes, frequencies and phases are
 * all drawn independently so that objects never fall into visible lockstep --
 * the single biggest tell of a procedurally animated scene.
 */
export function createMotionParams(rng: Rng, scale = 1): MotionParams {
  return {
    amplitude: [
      range(rng, 0.25, 0.9) * scale,
      range(rng, 0.35, 1.2) * scale,
      range(rng, 0.2, 0.7) * scale,
    ],
    frequency: [range(rng, 0.08, 0.24), range(rng, 0.06, 0.2), range(rng, 0.05, 0.18)],
    phase: [range(rng, 0, Math.PI * 2), range(rng, 0, Math.PI * 2), range(rng, 0, Math.PI * 2)],
    spin: [centered(rng, 0.09), centered(rng, 0.12), centered(rng, 0.07)],
    wobble: [range(rng, 0.05, 0.22), range(rng, 0.05, 0.28), range(rng, 0.04, 0.16)],
    breath: range(rng, 0.015, 0.05),
    breathSpeed: range(rng, 0.25, 0.7),
    noiseAmplitude: range(rng, 0.15, 0.55) * scale,
    noiseSpeed: range(rng, 0.03, 0.11),
  };
}

/** Scratch tuple reused by `evalDrift` so the animation loop stays allocation free. */
const drift: [number, number, number] = [0, 0, 0];

/**
 * Positional offset for an object at time `t`.
 *
 * Two sines per axis, nothing more. The previous version added an fbm term to
 * break the periodicity, which cost three hash-and-interpolate lattice lookups
 * per axis per object per frame -- for motion that is, by design, too slow to
 * watch a loop in. The second sine runs at an irrational-ish multiple of the
 * first, so the pair only repeats after minutes, at about a twentieth of the
 * cost.
 */
export function evalDrift(m: MotionParams, t: number, seed: number): [number, number, number] {
  const { amplitude: a, frequency: f, phase: p } = m;
  const n = m.noiseAmplitude;
  const ns = m.noiseSpeed;
  drift[0] =
    Math.sin(t * f[0] * Math.PI * 2 + p[0]) * a[0] +
    Math.sin(t * f[0] * 0.61803 * Math.PI * 2 + seed) * n;
  drift[1] =
    Math.sin(t * f[1] * Math.PI * 2 + p[1]) * a[1] +
    Math.sin(t * f[1] * 0.61803 * Math.PI * 2 + seed * 1.7) * n;
  drift[2] =
    Math.sin(t * f[2] * Math.PI * 2 + p[2]) * a[2] +
    Math.sin(t * f[2] * 0.61803 * Math.PI * 2 + seed * 2.3) * n;
  return drift;
}
