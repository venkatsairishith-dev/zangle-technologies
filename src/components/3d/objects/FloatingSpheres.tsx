import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { PALETTE } from '../config';
import type { FloatingObjectSpec, QualitySettings } from '../types';
import type { SharedGeometries } from '../utils/geometries';
import { buildSpheres } from '../utils/sceneLayout';
import { InteractiveObject } from '../InteractiveObject';
import { HighlightShell } from './HighlightShell';
import { MaterialResponse } from './MaterialResponse';

interface FloatingSphereProps {
  spec: FloatingObjectSpec;
  quality: QualitySettings;
  geometries: SharedGeometries;
  index: number;
}

const FloatingSphere: React.FC<FloatingSphereProps> = ({ spec, quality, geometries, index }) => {
  const shellMaterial = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const tint = PALETTE.glass[spec.colorIndex % PALETTE.glass.length];
  const core = PALETTE.core[index % PALETTE.core.length];

  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(core),
        roughness: 0.18,
        metalness: 0,
        emissive: new THREE.Color(core),
        emissiveIntensity: 0.42,
        envMapIntensity: 1.1,
      }),
    [core],
  );

  return (
    <InteractiveObject
      id={spec.id}
      basePosition={spec.basePosition}
      motion={spec.motion}
      parallax={spec.parallax}
      baseScale={spec.scale}
      seed={index * 1.9 + 0.7}
      hoverScale={0.11}
    >
      <MaterialResponse
        material={shellMaterial}
        baseEmissive={0.1}
        hoverEmissive={0.5}
        baseEnv={0.55}
        hoverEnv={1.5}
        baseOpacity={spec.opacity}
      />

      {/* Deliberately NOT `transmission`. three.js renders the entire scene
          into a refraction buffer once per transmissive mesh per frame, so a
          dozen transmissive spheres cost a dozen extra scene renders -- which
          is exactly what made this scene stutter. Only the hero sphere, which
          is large enough for real refraction to read, pays that. At this size
          a clearcoated alpha shell with a strong environment is visually
          indistinguishable and costs one ordinary draw call. */}
      <mesh geometry={geometries.sphere} renderOrder={3}>
        <meshPhysicalMaterial
          ref={shellMaterial}
          color={tint}
          roughness={0.05}
          metalness={0}
          ior={1.33}
          clearcoat={0}
          transparent
          opacity={spec.opacity}
          depthWrite={false}
          emissive={new THREE.Color(tint)}
          // Emissive is a *tint* lift here, not a glow. Pushed higher it starts
          // adding the same value to every facet regardless of orientation,
          // which flattens the shading the directional rig just built.
          emissiveIntensity={0.1}
          // Under 1: the environment is the brightest thing these surfaces see,
          // and reflecting a studio at full strength is what turned them white.
          envMapIntensity={0.55}
        />
      </mesh>

      {/* Every sphere in the reference carries a small coloured body inside it;
          it is what stops them looking like empty bubbles. */}
      <mesh
        geometry={geometries.coreSphere}
        material={coreMaterial}
        scale={0.42}
        position={[0.08, -0.06, 0.05]}
        raycast={() => null}
      />

      {/* Silhouette line plus coloured sheen, one pass. The dark edge is what
          makes these read as glass rather than as coloured haze: without a
          boundary a transparent object has no shape for the eye to find. */}
      <HighlightShell
        geometry={geometries.sphere}
        color={core}
        edgeColor="#14608e"
        edgeOpacity={0.42}
        scale={1.03}
        power={2.2}
        baseOpacity={0.3}
      />
    </InteractiveObject>
  );
};

interface FloatingSpheresProps {
  quality: QualitySettings;
  geometries: SharedGeometries;
}

export const FloatingSpheres: React.FC<FloatingSpheresProps> = ({ quality, geometries }) => {
  const specs = useMemo(() => buildSpheres(quality.sphereCount), [quality.sphereCount]);

  return (
    <group>
      {specs.map((spec, index) => (
        <FloatingSphere
          key={spec.id}
          spec={spec}
          quality={quality}
          geometries={geometries}
          index={index}
        />
      ))}
    </group>
  );
};
