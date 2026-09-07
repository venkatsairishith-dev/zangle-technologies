import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SCENE } from '../config';
import type { QualitySettings, RibbonSpec } from '../types';
import { createRibbonGeometry } from '../utils/ribbonGeometry';
import { createRibbonMaterial } from '../utils/ribbonMaterial';
import { damp } from '../utils/motion';
import { fbm3 } from '../utils/random';
import { isPointerOverUI, sceneState } from '../state/sceneState';
import { viewLayout } from '../utils/safeZones';

interface RibbonProps {
  spec: RibbonSpec;
  quality: QualitySettings;
  theme: 'light' | 'dark';
  seed: number;
}

/**
 * One flowing ribbon.
 *
 * Geometry is generated once from a Catmull-Rom spine; every wave, bend and
 * pointer reaction after that happens in the vertex shader. The component's job
 * per frame is just to push four uniforms and a parallax offset -- so five of
 * these cost about as much as one.
 */
export const Ribbon: React.FC<RibbonProps> = ({ spec, quality, theme, seed }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const hoverTarget = useRef(0);
  const hover = useRef(0);

  const { geometry, material, curveLength } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      spec.points.map((p) => new THREE.Vector3(...p)),
      false,
      'catmullrom',
      0.5,
    );
    const length = curve.getLength();
    // Lengthwise resolution only has to keep the sine displacement smooth.
    // These are flat strips, not tubes -- there is no radial ring to pay for --
    // so the cost is linear in this number, and 160 was buying sub-pixel
    // smoothness on a curve that is never seen close up.
    const segments = Math.max(40, Math.round(88 * quality.geometryDetail));
    const crossSegments = quality.geometryDetail > 0.6 ? 3 : 2;

    return {
      geometry: createRibbonGeometry(curve, {
        segments,
        crossSegments,
        width: spec.width,
      }),
      material: createRibbonMaterial(spec, length, {
        iridescence: quality.tier === 'high',
        theme,
      }),
      curveLength: length,
    };
  }, [spec, quality.geometryDetail, quality.tier, theme]);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  useFrame((state, rawDelta) => {
    const node = mesh.current;
    if (!node) return;
    const dt = Math.min(rawDelta, 1 / 30);
    const t = state.clock.elapsedTime;
    const uniforms = material.userData.uniforms;

    // Absolute, not incremental -- keeps the sweep inside a portrait frame.
    node.scale.x = viewLayout.xScale;

    uniforms.uTime.value = sceneState.reducedMotion ? 0 : t;
    // gl_FragCoord is in device pixels, so the readability mask has to be told
    // the drawing-buffer size, not the CSS size -- they differ on every
    // retina display and again whenever the dpr governor steps in.
    state.gl.getDrawingBufferSize(uniforms.uResolution.value);
    uniforms.uPointer.value.set(sceneState.pointer.worldX, sceneState.pointer.worldY, 0);

    hover.current = damp(hover.current, hoverTarget.current, 6, dt);
    // Ribbons always lean a little away from the cursor; hovering one leans it
    // considerably more, which is how a shape with no click target still reads
    // as interactive.
    uniforms.uPointerStrength.value = sceneState.pointer.inside
      ? 0.35 + hover.current * 1.15
      : 0;
    material.emissiveIntensity = hover.current * 0.22;

    // Depth parallax against the camera's descent, plus a very slow bodily
    // drift so the ribbon is never rigidly pinned in space.
    const scrollOffset = sceneState.scroll.smooth * SCENE.travelY * (1 - spec.parallax);
    const wander = sceneState.reducedMotion ? 0 : 1;
    node.position.set(
      fbm3(seed, t * 0.02, 0) * 0.5 * wander,
      scrollOffset + fbm3(0, seed + t * 0.017, 2.4) * 0.4 * wander,
      fbm3(3.7, 0, seed + t * 0.013) * 0.6 * wander,
    );
    node.rotation.z = fbm3(seed * 1.3, 0, t * 0.011) * 0.06 * wander;
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      material={material}
      renderOrder={2}
      onPointerOver={(event) => {
        if (isPointerOverUI(event.nativeEvent.target)) return;
        hoverTarget.current = 1;
      }}
      onPointerOut={() => {
        hoverTarget.current = 0;
      }}
      userData={{ curveLength }}
    />
  );
};
