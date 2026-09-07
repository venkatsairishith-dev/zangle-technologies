import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PALETTE } from '../config';
import { sceneState } from '../state/sceneState';

const VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  // Already in clip space: this plane is not in the world, it *is* the frame.
  gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uTop;
uniform vec3 uMid;
uniform vec3 uBottom;
uniform vec3 uGlow;
uniform float uScroll;
varying vec2 vUv;

void main() {
  // Two-segment vertical ramp rather than a single mix, so the midtone can sit
  // off the straight line between the ends. A linear top-to-bottom gradient
  // reads as a backdrop cloth; a curved one reads as air.
  float y = clamp(vUv.y + uScroll * 0.12, 0.0, 1.0);
  vec3 col = y > 0.5
    ? mix(uMid, uTop, smoothstep(0.5, 1.0, y))
    : mix(uBottom, uMid, smoothstep(0.0, 0.5, y));

  // Soft light source upper right, behind where the hero sphere sits. This is
  // what stops the ground reading as a CSS gradient: the scene has a direction
  // its light comes from, and the background agrees with it.
  vec2 toGlow = (vUv - vec2(0.76, 0.82)) * vec2(1.35, 1.0);
  col = mix(col, uGlow, exp(-dot(toGlow, toGlow) * 3.4) * 0.85);

  // A second, much wider cool pool in the lower left balances it and keeps the
  // bottom of the frame from going flat.
  vec2 toCool = (vUv - vec2(0.12, 0.06)) * vec2(1.1, 1.0);
  col = mix(col, uBottom, exp(-dot(toCool, toCool) * 2.2) * 0.5);

  // Ordered-ish dither. Eight-bit output over a gradient this shallow bands
  // visibly; a sub-LSB of noise costs nothing and removes it entirely.
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.004;

  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * The ground the whole scene is read against.
 *
 * Drawn as a full-frame triangle-pair with depth testing off and a renderOrder
 * far below everything else, so it costs one untextured draw call and replaces
 * the flat clear colour. It is attached to the camera so it never leaves frame.
 */
export const Backdrop: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const colors = theme === 'light' ? PALETTE.light : PALETTE.dark;

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms: {
          uTop: { value: new THREE.Color(colors.skyTop) },
          uMid: { value: new THREE.Color(colors.skyMid) },
          uBottom: { value: new THREE.Color(colors.skyBottom) },
          uGlow: { value: new THREE.Color(colors.glow) },
          uScroll: { value: 0 },
        },
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
        fog: false,
      }),
    [colors],
  );

  const uniforms = useRef(material.uniforms);
  uniforms.current = material.uniforms;

  useFrame(() => {
    // The gradient drifts a fraction of the scroll, so descending through the
    // scene also descends through the light.
    uniforms.current.uScroll.value = sceneState.scroll.smooth;
  });

  return (
    <mesh material={material} renderOrder={-1000} frustumCulled={false} raycast={() => null}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
};
