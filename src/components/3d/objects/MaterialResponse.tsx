import React from 'react';
import type * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useInteractiveRefs } from '../InteractiveObject';

interface MaterialResponseProps {
  material: React.MutableRefObject<THREE.MeshPhysicalMaterial | null>;
  baseEmissive?: number;
  hoverEmissive?: number;
  baseEnv?: number;
  hoverEnv?: number;
  /** Resting alpha. Required for the readability fade to have something to scale. */
  baseOpacity?: number;
}

/**
 * Turns the interaction weights into material brightness.
 *
 * Lives as a sibling of the mesh rather than inside it so that the hover
 * response costs one `useFrame` and zero React renders -- the material is
 * mutated in place, never re-created.
 */
export const MaterialResponse: React.FC<MaterialResponseProps> = ({
  material,
  baseEmissive = 0.06,
  hoverEmissive = 0.4,
  baseEnv = 1.4,
  hoverEnv = 2.3,
  baseOpacity = 1,
}) => {
  const refs = useInteractiveRefs();

  useFrame(() => {
    const m = material.current;
    if (!m) return;
    // Selection counts for more than hover, so a chosen object stays clearly
    // marked even after the cursor wanders off it.
    const energy = Math.min(1, refs.hover.current * 0.7 + refs.select.current);
    // Readability wins over interaction feedback: an object hovering behind
    // the headline stays faded even while the cursor is on it. It is still
    // fully interactive -- only its brightness yields.
    const dim = refs.dim.current;
    const visibility = 1 - dim;
    m.emissiveIntensity = (baseEmissive + (hoverEmissive - baseEmissive) * energy) * visibility;
    m.envMapIntensity = (baseEnv + (hoverEnv - baseEnv) * energy) * visibility;
    m.opacity = baseOpacity * visibility;
  });

  return null;
};
