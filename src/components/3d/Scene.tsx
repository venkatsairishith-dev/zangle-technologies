import React, { useEffect, useMemo } from 'react';
import { PALETTE } from './config';
import type { QualitySettings } from './types';
import { createSharedGeometries } from './utils/geometries';
import { CameraController } from './CameraController';
import { ScrollController } from './ScrollController';
import { Lighting } from './Lighting';
import { Effects } from './Effects';
import { Ribbons } from './objects/Ribbons';
import { GlassSphere } from './objects/GlassSphere';
import { FloatingSpheres } from './objects/FloatingSpheres';
import { FloatingShapes } from './objects/FloatingShapes';
import { ParticleField } from './objects/ParticleField';
import { Backdrop } from './objects/Backdrop';
import { InstancedScatter } from './objects/InstancedScatter';

interface SceneProps {
  quality: QualitySettings;
  theme: 'light' | 'dark';
}

/**
 * Assembles the world. Everything below this point is either a controller (no
 * geometry, drives the frame) or a family of objects sharing pooled geometry.
 */
export const Scene: React.FC<SceneProps> = ({ quality, theme }) => {
  const geometries = useMemo(
    () => createSharedGeometries(quality.geometryDetail),
    [quality.geometryDetail],
  );
  useEffect(() => () => geometries.dispose(), [geometries]);

  const colors = theme === 'light' ? PALETTE.light : PALETTE.dark;

  return (
    <>
      <color attach="background" args={[colors.background]} />
      {/* Exponential fog is doing the heavy lifting for atmospheric depth:
          distant ribbons dissolve into the ground colour instead of ending.
          Tuned down from where it was: fog is atmospheric perspective, but it
          is also a desaturator, and at the old density it was quietly bleaching
          the midground along with the background. */}
      <fogExp2 attach="fog" args={[colors.fog, theme === 'light' ? 0.0062 : 0.02]} />

      <Backdrop theme={theme} />

      <ScrollController />
      <CameraController />
      <Lighting theme={theme} quality={quality} />

      <Ribbons quality={quality} theme={theme} />
      <GlassSphere quality={quality} geometries={geometries} />
      <FloatingSpheres quality={quality} geometries={geometries} />
      <FloatingShapes quality={quality} geometries={geometries} />
      <InstancedScatter quality={quality} geometries={geometries} />
      <ParticleField quality={quality} theme={theme} />

      <Effects quality={quality} theme={theme} />
    </>
  );
};
