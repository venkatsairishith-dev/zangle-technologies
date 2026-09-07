import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { QualitySettings, ShapeSpec } from '../types';
import type { SharedGeometries } from '../utils/geometries';
import { buildShapes, shapeColor } from '../utils/sceneLayout';
import { InteractiveObject } from '../InteractiveObject';
import { HighlightShell } from './HighlightShell';
import { MaterialResponse } from './MaterialResponse';

interface FloatingShapeProps {
  spec: ShapeSpec;
  quality: QualitySettings;
  geometries: SharedGeometries;
  index: number;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({ spec, quality, geometries, index }) => {
  const material = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const geometry = geometries.shapes[spec.kind];
  const color = shapeColor(spec.colorIndex);
  const faceted = spec.kind !== 'roundedBox';

  return (
    <InteractiveObject
      id={spec.id}
      basePosition={spec.basePosition}
      motion={spec.motion}
      parallax={spec.parallax}
      baseScale={spec.scale}
      seed={index * 2.3 + 4.1}
      hoverScale={0.13}
    >
      <MaterialResponse
        material={material}
        baseEmissive={0.1}
        hoverEmissive={0.55}
        baseEnv={0.6}
        hoverEnv={1.6}
        baseOpacity={spec.opacity * (faceted ? 1 : 0.9)}
      />

      <mesh geometry={geometry} renderOrder={3}>
        <meshPhysicalMaterial
          ref={material}
          color={color}
          roughness={faceted ? 0.12 : 0.06}
          metalness={0}
          // Same reasoning as the floating spheres: no `transmission`, because
          // each transmissive mesh costs a full extra scene render per frame.
          // Faceted crystals lose almost nothing -- their read comes from hard
          // specular edges and the environment, not from refracting the scene.
          ior={1.42}
          clearcoat={0}
          transparent
          opacity={spec.opacity * (faceted ? 1 : 0.9)}
          depthWrite={false}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.1}
          // Faceted crystals can take more environment than the spheres: a flat
          // facet reflects one direction of the studio rather than smearing all
          // of it, so this reads as a hard specular edge instead of a wash.
          envMapIntensity={faceted ? 0.8 : 0.5}
          flatShading={faceted}
        />
      </mesh>

      <HighlightShell
        geometry={geometry}
        color={color}
        edgeColor="#155f8c"
        edgeOpacity={0.36}
        scale={1.035}
        power={2.1}
        baseOpacity={0.24}
      />
    </InteractiveObject>
  );
};

interface FloatingShapesProps {
  quality: QualitySettings;
  geometries: SharedGeometries;
}

export const FloatingShapes: React.FC<FloatingShapesProps> = ({ quality, geometries }) => {
  const specs = useMemo(() => buildShapes(quality.shapeCount), [quality.shapeCount]);

  return (
    <group>
      {specs.map((spec, index) => (
        <FloatingShape
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
