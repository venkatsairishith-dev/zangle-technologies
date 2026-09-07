import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PALETTE } from '../config';
import type { QualitySettings } from '../types';
import type { SharedGeometries } from '../utils/geometries';
import { buildScatter } from '../utils/sceneLayout';
import { viewLayout } from '../utils/safeZones';
import { sceneState } from '../state/sceneState';

interface InstancedScatterProps {
  quality: QualitySettings;
  geometries: SharedGeometries;
}

const matrix = new THREE.Matrix4();
const quat = new THREE.Quaternion();
const euler = new THREE.Euler();
const pos = new THREE.Vector3();
const scl = new THREE.Vector3();

/**
 * The background population.
 *
 * Everything here is deliberately *not* interactive: no raycast, no hover, no
 * selection, no per-object material. That is what lets the whole population
 * collapse into two draw calls regardless of how many members it has, and it
 * is also honest about the design -- these objects exist to give the descent
 * depth and parallax, and nothing is lost by them not being grabbable.
 *
 * Two meshes rather than one because a sphere and a crystal cannot share a
 * geometry, and instancing is per-geometry. Colour varies per instance through
 * the instanceColor attribute, so they still read as a family rather than as
 * clones.
 */
export const InstancedScatter: React.FC<InstancedScatterProps> = ({ quality, geometries }) => {
  const specs = useMemo(() => buildScatter(quality.scatterCount), [quality.scatterCount]);
  const spheres = useMemo(() => specs.filter((s) => s.kind === 'sphere'), [specs]);
  const crystals = useMemo(() => specs.filter((s) => s.kind === 'crystal'), [specs]);

  const sphereRef = useRef<THREE.InstancedMesh>(null);
  const crystalRef = useRef<THREE.InstancedMesh>(null);

  // One material per kind, shared by every instance of it.
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.1,
        metalness: 0,
        ior: 1.35,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        envMapIntensity: 0.5,
      }),
    [],
  );
  useEffect(() => () => material.dispose(), [material]);

  // Colours are static, so they are written once rather than every frame.
  useEffect(() => {
    const write = (mesh: THREE.InstancedMesh | null, list: typeof specs) => {
      if (!mesh) return;
      const color = new THREE.Color();
      list.forEach((spec, i) => {
        color.set(PALETTE.glass[spec.colorIndex % PALETTE.glass.length]);
        mesh.setColorAt(i, color);
      });
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    };
    write(sphereRef.current, spheres);
    write(crystalRef.current, crystals);
  }, [spheres, crystals]);

  useFrame(() => {
    const t = sceneState.reducedMotion ? 0 : performance.now() / 1000;
    const scroll = sceneState.scroll.smooth;

    const write = (mesh: THREE.InstancedMesh | null, list: typeof specs) => {
      if (!mesh) return;
      for (let i = 0; i < list.length; i++) {
        const s = list[i];
        // Same absolute-transform rule as the interactive objects: base plus
        // animation plus scroll, never accumulated, so scroll 0 is always the
        // original arrangement.
        const p = s.phase;
        pos.set(
          s.basePosition[0] * viewLayout.xScale + Math.sin(t * s.speed + p) * s.amplitude,
          s.basePosition[1] +
            Math.sin(t * s.speed * 0.77 + p * 1.6) * s.amplitude +
            scroll * s.scrollOffset,
          s.basePosition[2] + Math.sin(t * s.speed * 0.53 + p * 2.2) * s.amplitude * 0.6,
        );
        euler.set(t * s.spin, t * s.spin * 1.3 + p, 0);
        quat.setFromEuler(euler);
        scl.setScalar(s.scale);
        matrix.compose(pos, quat, scl);
        mesh.setMatrixAt(i, matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    };

    write(sphereRef.current, spheres);
    write(crystalRef.current, crystals);
  });

  return (
    <group>
      {spheres.length > 0 && (
        <instancedMesh
          ref={sphereRef}
          args={[geometries.coreSphere, material, spheres.length]}
          frustumCulled={false}
          raycast={() => null}
          renderOrder={2}
        />
      )}
      {crystals.length > 0 && (
        <instancedMesh
          ref={crystalRef}
          args={[geometries.shapes.crystal, material, crystals.length]}
          frustumCulled={false}
          raycast={() => null}
          renderOrder={2}
        />
      )}
    </group>
  );
};
