import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { damp } from './utils/motion';
import { heroWeight, safeZoneUniforms, updateZoneLayout } from './utils/safeZones';
import { sceneState } from './state/sceneState';

/**
 * The scene's clock-in. Runs before every other `useFrame` in the tree
 * (negative priority) and turns the raw DOM signals into the smoothed values
 * that the camera, ribbons and particles all read the same frame.
 *
 * Centralising the smoothing here is what keeps the whole scene coherent: if
 * each component damped scroll on its own they would drift apart by a frame or
 * two and the parallax would visibly shear.
 */
export const ScrollController: React.FC = () => {
  const camera = useThree((state) => state.camera);
  const scratch = useMemo(
    () => ({ dir: new THREE.Vector3(), point: new THREE.Vector3() }),
    [],
  );

  useFrame((state, rawDelta) => {
    updateZoneLayout(state.viewport.aspect);
    const dt = Math.min(rawDelta, 1 / 30);
    const scroll = sceneState.scroll;
    const previous = scroll.smooth;

    // A slow follow is what turns a jumpy trackpad or a mouse wheel's discrete
    // steps into a continuous camera dolly.
    scroll.smooth = damp(scroll.smooth, scroll.raw, 4.5, dt);
    scroll.velocity = dt > 0 ? (scroll.smooth - previous) / dt : 0;

    const pointer = sceneState.pointer;
    const settle = pointer.inside ? 3.2 : 1.4;
    pointer.sx = damp(pointer.sx, pointer.inside ? pointer.x : 0, settle, dt);
    pointer.sy = damp(pointer.sy, pointer.inside ? pointer.y : 0, settle, dt);

    // The hero-scoped exclusion zones only mean anything while the first
    // viewport is on screen. Damped rather than assigned so that a fast flick
    // does not pop the ribbons back to full strength mid-sweep.
    const hero = heroWeight(scroll.smooth, scroll.viewports);
    const dims = safeZoneUniforms.uZoneDims.value;
    dims.w = damp(dims.w, hero, 3.5, dt);

    // Project the cursor onto the z = 0 plane so ribbons can bend away from it
    // in world units rather than in screen space.
    scratch.point.set(pointer.sx, pointer.sy, 0.5).unproject(camera);
    scratch.dir.copy(scratch.point).sub(camera.position);
    if (Math.abs(scratch.dir.z) > 1e-4) {
      const distance = -camera.position.z / scratch.dir.z;
      scratch.point.copy(camera.position).addScaledVector(scratch.dir, distance);
      pointer.worldX = scratch.point.x;
      pointer.worldY = scratch.point.y;
    }
  }, -100);

  return null;
};
