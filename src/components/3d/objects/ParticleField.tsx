import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { SCENE } from '../config';
import type { QualitySettings } from '../types';
import { SAFE_ZONE_GLSL, safeZoneUniforms, viewLayout } from '../utils/safeZones';
import { makeRng, range } from '../utils/random';
import { sceneState } from '../state/sceneState';

const VERTEX = /* glsl */ `
attribute float aSeed;
attribute float aSize;
attribute float aTone;

uniform float uTime;
uniform float uCameraY;
uniform float uSpanY;
uniform float uPixelRatio;
uniform vec2 uPointer;
uniform float uDrift;

varying float vAlpha;
varying float vTone;

void main() {
  vec3 pos = position;

  // Independent drift per particle. Three coprime-ish frequencies keep the
  // field from ever pulsing in unison.
  pos.x += sin(uTime * 0.11 + aSeed * 6.28) * 0.7 * uDrift;
  pos.y += cos(uTime * 0.087 + aSeed * 4.71) * 0.55 * uDrift;
  pos.z += sin(uTime * 0.065 + aSeed * 8.13) * 0.45 * uDrift;

  // Wrap the field around the camera instead of spawning particles down the
  // whole travel volume: a few hundred points then give constant density over
  // an arbitrarily long scroll, for a fixed cost.
  // Not named half: that is a reserved word in GLSL ES and would silently
  // fail the whole shader compile.
  float halfSpan = uSpanY * 0.5;
  float rel = mod(pos.y - uCameraY + halfSpan, uSpanY) - halfSpan;
  pos.y = uCameraY + rel;

  // A gentle shove away from the cursor -- just enough to notice.
  vec2 toPointer = pos.xy - uPointer;
  float dist = length(toPointer);
  pos.xy += normalize(toPointer + 1e-5) * exp(-dist * dist * 0.02) * 0.5;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = aSize * uPixelRatio * (240.0 / max(-mvPosition.z, 0.1));

  // Fade with distance and at the wrap boundary, so recycled particles never
  // pop into existence.
  float depthFade = smoothstep(70.0, 8.0, -mvPosition.z);
  float edgeFade = smoothstep(halfSpan, halfSpan * 0.6, abs(rel));
  vAlpha = depthFade * edgeFade;
  vTone = aTone;
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;
uniform vec2 uResolution;
${SAFE_ZONE_GLSL}

varying float vAlpha;
varying float vTone;

void main() {
  // Procedural soft disc: no texture fetch, no atlas to ship.
  float d = length(gl_PointCoord - vec2(0.5));
  float mask = smoothstep(0.5, 0.08, d);
  // Dust is the layer most likely to sparkle directly over body copy or on
  // top of the dashboard card, so it obeys the same readability mask as the
  // ribbons rather than being placed around the layout.
  float alpha = mask * vAlpha * uOpacity * (1.0 - safeZoneDim(gl_FragCoord.xy / uResolution));
  if (alpha < 0.004) discard;
  gl_FragColor = vec4(mix(uColorA, uColorB, vTone), alpha);
}
`;

interface ParticleFieldProps {
  quality: QualitySettings;
  theme: 'light' | 'dark';
}

/**
 * Atmospheric dust.
 *
 * One `Points` draw call for the entire field, animated wholly on the GPU. The
 * field wraps around the camera as it descends, so scrolling never runs out of
 * particles and the count stays flat regardless of how long the page is.
 */
export const ParticleField: React.FC<ParticleFieldProps> = ({ quality, theme }) => {
  const points = useRef<THREE.Points>(null);
  const dpr = useThree((state) => state.viewport.dpr);
  const spanY = SCENE.spreadY + 24;

  const geometry = useMemo(() => {
    const rng = makeRng(2024);
    const count = quality.particleCount;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    const tones = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Tighter than it was. At 40 particles instead of 840, spreading them
      // over the old volume would have put roughly three of them on screen;
      // the field has to shrink with the count or it stops existing.
      positions[i * 3] = range(rng, -SCENE.spreadX * 1.1, SCENE.spreadX * 1.1);
      positions[i * 3 + 1] = range(rng, -spanY * 0.5, spanY * 0.5);
      positions[i * 3 + 2] = range(rng, SCENE.depthFar + 2, SCENE.depthNear + 2);
      seeds[i] = rng();
      // A handful of larger motes carry the foreground; the rest stay as dust.
      // Keep the big motes rare and modest: out of focus, a large dark point
      // stops reading as dust and starts reading as a smudge on the lens.
      sizes[i] = rng() > 0.85 ? range(rng, 3.0, 4.6) : range(rng, 1.2, 2.6);
      tones[i] = rng() > 0.78 ? range(rng, 0.55, 1) : range(rng, 0, 0.3);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aTone', new THREE.BufferAttribute(tones, 1));
    return geo;
  }, [quality.particleCount, spanY]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uCameraY: { value: 0 },
          uSpanY: { value: spanY },
          uPixelRatio: { value: 1 },
          uPointer: { value: new THREE.Vector2() },
          uDrift: { value: 1 },
          uColorA: { value: new THREE.Color('#ffffff') },
          uColorB: { value: new THREE.Color('#7fb6e0') },
          uOpacity: { value: 0.5 },
          uResolution: { value: new THREE.Vector2(1, 1) },
          ...safeZoneUniforms,
        },
        transparent: true,
        depthWrite: false,
        // Normal blending, not additive: additive light on a near-white ground
        // is invisible, which is the classic way this effect disappears.
        blending: THREE.NormalBlending,
        toneMapped: false,
      }),
    [spanY],
  );

  useEffect(() => {
    const u = material.uniforms;
    if (theme === 'light') {
      // Against a near-white ground the dust has to be *darker* than the page
      // to be seen at all -- the instinctive pale-white dust is invisible here.
      u.uColorA.value.set('#5c9ac6');
      u.uColorB.value.set('#3fb69a');
      u.uOpacity.value = 0.42;
    } else {
      // On black, bright dust immediately reads as a starfield. Dim and
      // desaturated keeps it atmospheric.
      u.uColorA.value.set('#6f96b8');
      u.uColorB.value.set('#6aa88a');
      u.uOpacity.value = 0.42;
    }
  }, [material, theme]);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  useFrame((state) => {
    // Absolute, not incremental: the field is authored against a landscape
    // frustum, so a portrait viewport squeezes it back into frame.
    if (points.current) points.current.scale.x = viewLayout.xScale;
    const u = material.uniforms;
    u.uTime.value = sceneState.reducedMotion ? 0 : state.clock.elapsedTime;
    u.uCameraY.value = state.camera.position.y;
    u.uPixelRatio.value = dpr;
    u.uDrift.value = sceneState.reducedMotion ? 0.15 : 1;
    u.uPointer.value.set(sceneState.pointer.worldX, sceneState.pointer.worldY);
    state.gl.getDrawingBufferSize(u.uResolution.value);
  });

  return (
    <points
      ref={points}
      geometry={geometry}
      material={material}
      frustumCulled={false}
      raycast={() => null}
    />
  );
};
