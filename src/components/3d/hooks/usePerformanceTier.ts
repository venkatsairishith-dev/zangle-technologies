import { useMemo } from 'react';
import { qualityForTier } from '../config';
import type { PerformanceTier, QualitySettings } from '../types';

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

let cached: PerformanceTier | null = null;

/**
 * Picks a quality bucket once per session from cheap, synchronous signals.
 *
 * Deliberately conservative: a wrong guess upwards costs a janky first
 * impression on a phone, a wrong guess downwards costs a slightly softer
 * looking background on a desktop.
 */
export function detectPerformanceTier(): PerformanceTier {
  if (cached) return cached;
  if (typeof window === 'undefined') return 'medium';

  // ?gfx=high|medium|low forces a bucket. Auto-detection is a heuristic, and a
  // heuristic you cannot override is a heuristic you cannot test.
  const forced = new URLSearchParams(window.location.search).get('gfx');
  if (forced === 'high' || forced === 'medium' || forced === 'low') {
    cached = forced;
    return cached;
  }

  const nav = navigator as NavigatorWithMemory;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 900;
  const saveData = (nav as unknown as { connection?: { saveData?: boolean } }).connection?.saveData;

  // A real WebGL2 context is the difference between "modern GPU" and "fallback".
  let webgl2 = false;
  try {
    const probe = document.createElement('canvas');
    webgl2 = !!probe.getContext('webgl2');
  } catch {
    webgl2 = false;
  }

  let score = 0;
  if (cores >= 8) score += 2;
  else if (cores >= 4) score += 1;
  if (memory >= 8) score += 2;
  else if (memory >= 4) score += 1;
  if (webgl2) score += 1;
  if (coarse) score -= 2;
  if (narrow) score -= 1;
  if (saveData) score -= 3;

  cached = score >= 5 ? 'high' : score >= 2 ? 'medium' : 'low';
  return cached;
}

export function usePerformanceTier(override?: PerformanceTier): QualitySettings {
  return useMemo(() => qualityForTier(override ?? detectPerformanceTier()), [override]);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
