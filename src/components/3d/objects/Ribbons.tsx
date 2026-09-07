import React, { useMemo } from 'react';
import type { QualitySettings } from '../types';
import { buildRibbons } from '../utils/sceneLayout';
import { Ribbon } from './Ribbon';

interface RibbonsProps {
  quality: QualitySettings;
  theme: 'light' | 'dark';
}

export const Ribbons: React.FC<RibbonsProps> = ({ quality, theme }) => {
  const specs = useMemo(() => buildRibbons(quality.ribbonCount), [quality.ribbonCount]);

  return (
    <group>
      {specs.map((spec, index) => (
        <Ribbon key={spec.id} spec={spec} quality={quality} theme={theme} seed={index * 3.7 + 1.3} />
      ))}
    </group>
  );
};
