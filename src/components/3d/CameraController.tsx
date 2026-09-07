import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SCENE } from './config';
import { clamp, damp, smoothstep } from './utils/motion';
import { fbm3 } from './utils/random';
import { sceneState } from './state/sceneState';

/**
 * Flies the camera down the scene volume.
 *
 * Three inputs are summed and then damped as one: the scroll path (a curved
 * descent, not a straight drop -- a straight drop reads as a texture scrolling
 * past), a continuous noise-driven float so the shot is never dead, and a small
 * pointer parallax. Damping the *sum* rather than each part means the camera
 * has a single, consistent inertia no matter which input moved.
 */
export const CameraController: React.FC = () => {
  const scratch = useMemo(
    () => ({
      position: new THREE.Vector3(...SCENE.cameraStart),
      target: new THREE.Vector3(0, 0, 0),
      lookAt: new THREE.Vector3(0, 0, 0),
    }),
    [],
  );

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30);
    const t = state.clock.elapsedTime;
    const { scroll, pointer, reducedMotion } = sceneState;
    const raw = scroll.smooth;

    // Scroll travel ramps in rather than starting at full rate.
    //
    // The first viewport is the page's shopfront and it has to feel settled:
    // a camera that lurches on the first notch of the wheel makes the whole
    // site feel unstable. `ramp` is ~0 for the first few percent of the
    // document, so early scrolling barely moves the camera, then it hands over
    // to the real travel. It still reaches exactly 1.0 at the bottom, so no
    // range is lost -- only the opening is calmed.
    const ramp = smoothstep(0, 0.075, raw);
    const progress = raw * ramp;

    // Portrait viewports see a much narrower slice of the composition, so the
    // camera backs off until the hero group fits again.
    const aspect = state.viewport.aspect;
    const dolly = clamp((1.6 - aspect) * 5.5, 0, 9);

    // The descent curves: the camera drifts sideways as it falls, so ribbons
    // sweep across frame instead of sliding down it.
    const sway = Math.sin(progress * Math.PI * 1.6) * 2.6;
    const arc = Math.sin(progress * Math.PI) * 2.2;

    // The idle float is likewise held back over the hero so the opening frame
    // reads as composed rather than as drifting.
    const floatScale = reducedMotion ? 0 : 0.4 + 0.6 * ramp;
    const floatX = fbm3(t * 0.045, 0, 0) * 0.55 * floatScale;
    const floatY = fbm3(0, t * 0.038, 3.1) * 0.42 * floatScale;
    const floatZ = fbm3(7.4, 0, t * 0.03) * 0.35 * floatScale;

    scratch.target.set(
      SCENE.cameraStart[0] + sway + floatX + pointer.sx * 1.05,
      SCENE.cameraStart[1] + progress * SCENE.travelY + floatY + pointer.sy * 0.7,
      SCENE.cameraStart[2] + progress * SCENE.travelZ + dolly + arc + floatZ,
    );

    scratch.position.x = damp(scratch.position.x, scratch.target.x, 3.2, dt);
    scratch.position.y = damp(scratch.position.y, scratch.target.y, 4.0, dt);
    scratch.position.z = damp(scratch.position.z, scratch.target.z, 3.2, dt);
    state.camera.position.copy(scratch.position);

    // Aim slightly ahead of the travel direction and lean into the pointer --
    // the same trick a camera operator uses to make a move feel intentional.
    scratch.lookAt.set(
      damp(scratch.lookAt.x, sway * 0.35 + pointer.sx * 0.9, 3, dt),
      damp(
        scratch.lookAt.y,
        progress * SCENE.travelY - 1.2 - scroll.velocity * 1.4 + pointer.sy * 0.5,
        4,
        dt,
      ),
      damp(scratch.lookAt.z, -2 + progress * SCENE.travelZ * 0.4, 3, dt),
    );
    state.camera.lookAt(scratch.lookAt);

    // A whisper of roll. Any more and the page content starts to feel crooked.
    state.camera.rotation.z += pointer.sx * 0.012 + clamp(scroll.velocity, -1, 1) * 0.01;
    state.camera.updateMatrixWorld();
  });

  return null;
};
