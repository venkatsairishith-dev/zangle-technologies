/**
 * Deterministic randomness. The whole scene is generated from integer seeds so
 * that "organic and somewhat random" never means "different every reload" --
 * the composition is authored once and reproduced exactly.
 */

export type Rng = () => number;

/** mulberry32 -- small, fast, good enough distribution for scene layout. */
export function makeRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function range(rng: Rng, min: number, max: number): number {
  return min + rng() * (max - min);
}

/** Biased toward the middle of the range -- avoids clumping at the extremes. */
export function centered(rng: Rng, spread: number): number {
  return (rng() + rng() - 1) * spread;
}

export function pick<T>(rng: Rng, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length) % items.length];
}

/* ------------------------------------------------------------------ */
/* Value noise                                                         */
/* ------------------------------------------------------------------ */

const PERM = (() => {
  const rng = makeRng(1337);
  const p = new Uint8Array(512);
  const base = new Uint8Array(256);
  for (let i = 0; i < 256; i++) base[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = base[i];
    base[i] = base[j];
    base[j] = t;
  }
  for (let i = 0; i < 512; i++) p[i] = base[i & 255];
  return p;
})();

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const grad = (hash: number) => ((hash & 255) / 255) * 2 - 1;

/**
 * 3D value noise in [-1, 1]. Cheap enough to call a few times per object per
 * frame on the CPU; the particle field uses a GLSL twin instead.
 */
export function noise3(x: number, y: number, z: number): number {
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;
  const zi = Math.floor(z) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const zf = z - Math.floor(z);
  const u = fade(xf);
  const v = fade(yf);
  const w = fade(zf);

  const aaa = PERM[PERM[PERM[xi] + yi] + zi];
  const aba = PERM[PERM[PERM[xi] + yi + 1] + zi];
  const aab = PERM[PERM[PERM[xi] + yi] + zi + 1];
  const abb = PERM[PERM[PERM[xi] + yi + 1] + zi + 1];
  const baa = PERM[PERM[PERM[xi + 1] + yi] + zi];
  const bba = PERM[PERM[PERM[xi + 1] + yi + 1] + zi];
  const bab = PERM[PERM[PERM[xi + 1] + yi] + zi + 1];
  const bbb = PERM[PERM[PERM[xi + 1] + yi + 1] + zi + 1];

  const x1 = lerp(grad(aaa), grad(baa), u);
  const x2 = lerp(grad(aba), grad(bba), u);
  const y1 = lerp(x1, x2, v);
  const x3 = lerp(grad(aab), grad(bab), u);
  const x4 = lerp(grad(abb), grad(bbb), u);
  const y2 = lerp(x3, x4, v);
  return lerp(y1, y2, w);
}

/** Two octaves is plenty for drift; more just costs frame time. */
export function fbm3(x: number, y: number, z: number): number {
  return noise3(x, y, z) * 0.65 + noise3(x * 2.13, y * 2.13, z * 2.13) * 0.35;
}
