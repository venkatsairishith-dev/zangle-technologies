import React from 'react';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import type { QualitySettings } from './types';

interface EffectsProps {
  quality: QualitySettings;
  theme: 'light' | 'dark';
}

/**
 * Post pass.
 *
 * Bloom only. Depth of field was removed deliberately: a full-screen CoC pass
 * is the most expensive thing in the frame, and because this canvas sits behind
 * real page copy the blur read as a smeared background rather than as depth.
 * Distance is carried by `fogExp2` and by scale instead, which costs nothing.
 *
 * Bloom stays restrained, and in light mode it is nearly off. Threshold 0.98
 * with tight smoothing means only genuine speculars -- the hot dot on a sphere,
 * a selected object's rim, the brightest particles -- ever reach it. Anything
 * looser and the bloom lifts the ground itself, at which point every object in
 * front of the ground loses the contrast it was being read by.
 */
export const Effects: React.FC<EffectsProps> = ({ quality, theme }) => {
  if (!quality.bloom) return null;
  const isLight = theme === 'light';

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={isLight ? 0.2 : 0.44}
        luminanceThreshold={isLight ? 0.98 : 0.88}
        luminanceSmoothing={0.12}
        radius={0.42}
        mipmapBlur
      />
    </EffectComposer>
  );
};
