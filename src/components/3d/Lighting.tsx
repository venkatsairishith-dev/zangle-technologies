import React from 'react';
import * as THREE from 'three';
import { Environment, Lightformer } from '@react-three/drei';
import { PALETTE } from './config';
import type { QualitySettings } from './types';

interface LightingProps {
  theme: 'light' | 'dark';
  quality: QualitySettings;
}

/**
 * Directional studio lighting.
 *
 * The environment is built from lightformers rather than a downloaded HDRI:
 * there is no network request, no licensing question, and -- more importantly --
 * the reflections are *authored*. The bright bar overhead, the cool blue slab
 * on the left and the green slab on the right are what you actually read in the
 * glass, and they are placed to reproduce the reference's reflection pattern.
 *
 * `frames={1}` bakes the cubemap once at mount; nothing in it moves, so paying
 * for it every frame would be pure waste.
 */
export const Lighting: React.FC<LightingProps> = ({ theme, quality }) => {
  const isLight = theme === 'light';
  const studio = isLight ? PALETTE.light.studio : PALETTE.dark.studio;

  return (
    <>
      {/* Directional, not uniform.
          The previous rig piled white ambient, white hemisphere and a white key
          on top of each other. Total irradiance passed 1.0 almost everywhere,
          which is the definition of overexposure: every surface saturates to
          the same value regardless of which way it faces, so geometry stops
          having a readable shape. Ambient is now a floor, not a light -- just
          enough to keep shadowed faces from going to black -- and all the
          modelling comes from three directional sources at different hues, so
          which way a facet points determines what colour it is. */}
      <ambientLight intensity={isLight ? 0.2 : 0.24} color={isLight ? '#cfe3f2' : '#8fb6e8'} />
      <hemisphereLight
        intensity={isLight ? 0.24 : 0.2}
        color={isLight ? '#dcf0ff' : '#3f6ea8'}
        groundColor={isLight ? '#a8c8dc' : '#050a12'}
      />

      {/* Cool blue key, front-above-left. Tinted rather than white so lit faces
          pick up a hue instead of just brightness. No shadow maps anywhere --
          hard shadows would fight the airiness, and the modelling is coming
          from the hue split between these three lights instead. */}
      <directionalLight position={[-6, 9, 8]} intensity={isLight ? 1.45 : 0.4} color="#cfe2ff" />
      {/* Cyan rim from behind. This is the light that draws the silhouette:
          it grazes the far side of every sphere and ribbon, which is what makes
          a transparent object legible without an outline pass. */}
      <directionalLight position={[8, -3, -9]} intensity={isLight ? 1.05 : 0.5} color="#2fd2ee" />
      {/* Soft green fill, camera right. Fills the shadow side without lifting
          it to the key's value -- the gap between the two is the dimensionality. */}
      <directionalLight position={[9, 4, 4]} intensity={isLight ? 0.5 : 0.28} color="#6fd88a" />

      {/* Colour accents. Physical falloff, so these read as nearby practicals
          rather than flat tints. */}
      <pointLight position={[-9, 2, 5]} intensity={22} distance={34} decay={2} color="#2587ff" />
      <pointLight position={[9, -3, 4]} intensity={18} distance={34} decay={2} color="#3ec96a" />
      <pointLight position={[0, 6, -6]} intensity={16} distance={30} decay={2} color="#00bfef" />

      <Environment resolution={quality.envResolution} frames={1} background={false}>
        {/* The white world the glass sits in. */}
        <mesh scale={60}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshBasicMaterial color={studio} side={THREE.BackSide} />
        </mesh>

        {/* Overhead softbox -- the long horizontal highlight on every sphere.
            Pulled back hard and tinted: this is the single biggest surface in
            the environment, so at white and 3.2 it was what every piece of
            glass in the scene mostly reflected. */}
        <Lightformer
          form="rect"
          intensity={isLight ? 1.7 : 1.6}
          color="#e6f4ff"
          position={[0, 8, 2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[18, 8, 1]}
        />
        {/* Cool slab, camera left. */}
        <Lightformer
          form="rect"
          intensity={isLight ? 2.4 : 1.4}
          color="#2f9ef2"
          position={[-10, 1, 4]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12, 9, 1]}
        />
        {/* Fresh green slab, camera right -- the source of the green edges. */}
        <Lightformer
          form="rect"
          intensity={isLight ? 2.2 : 1.3}
          color="#57d47a"
          position={[10, -1, 3]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[12, 9, 1]}
        />
        {/* Small hot circle for the crisp specular dot the reference shows on
            the top-left of every sphere. */}
        <Lightformer
          form="circle"
          intensity={isLight ? 4.2 : 3}
          color="#ffffff"
          position={[-5, 6, 8]}
          scale={[3, 3, 1]}
        />
        {/* Bounce from below keeps the undersides from going muddy. */}
        <Lightformer
          form="rect"
          intensity={isLight ? 0.85 : 0.7}
          color="#cfe6f6"
          position={[0, -9, 2]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[16, 8, 1]}
        />
      </Environment>
    </>
  );
};
