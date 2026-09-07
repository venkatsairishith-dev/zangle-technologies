import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Sparkles } from 'lucide-react';

export interface FlipCard3DProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  frontClassName?: string;
  backClassName?: string;
  height?: string;
  flipTrigger?: 'both' | 'hover' | 'click';
  showFlipHint?: boolean;
  hintText?: string;
  isFlippedControlled?: boolean;
  onFlipChange?: (flipped: boolean) => void;
}

export const FlipCard3D: React.FC<FlipCard3DProps> = ({
  front,
  back,
  className = '',
  frontClassName = '',
  backClassName = '',
  height = 'h-full min-h-[280px]',
  flipTrigger = 'both',
  showFlipHint = true,
  hintText = 'Click or Hover to Flip',
  isFlippedControlled,
  onFlipChange,
}) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Determine flipped state
  const isFlipped =
    isFlippedControlled !== undefined
      ? isFlippedControlled
      : flipTrigger === 'hover'
      ? isHovered
      : flipTrigger === 'click'
      ? internalFlipped
      : isHovered || internalFlipped;

  const handleClick = (e: React.MouseEvent) => {
    // If click is on an interactive element like button or link, don't flip unless desired
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input')) {
      return;
    }

    if (flipTrigger === 'both' || flipTrigger === 'click') {
      const next = !internalFlipped;
      setInternalFlipped(next);
      onFlipChange?.(next);
    }
  };

  const handleMouseEnter = () => {
    if (flipTrigger === 'both' || flipTrigger === 'hover') {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (flipTrigger === 'both' || flipTrigger === 'hover') {
      setIsHovered(false);
    }
  };

  return (
    <div
      className={`group/flip relative [perspective:1400px] cursor-pointer ${height} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Rotator Container */}
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          y: isHovered ? -6 : 0,
        }}
        transition={{
          duration: 0.65,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {/* ─── FRONT FACE ─────────────────────────────────────── */}
        <div
          className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-2xl dark:shadow-card-dark flex flex-col justify-between overflow-hidden ${frontClassName}`}
        >
          {/* Subtle Ambient Front Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

          {/* Front Content */}
          <div className="w-full h-full flex flex-col justify-between relative z-10 p-6 sm:p-7">
            {front}
          </div>

          {/* Interactive Flip Badge Hint on Front */}
          {showFlipHint && (
            <div className="absolute bottom-2.5 right-3 z-20 flex items-center gap-1 text-[10px] font-mono text-slate-400 dark:text-slate-500 opacity-60 group-hover/flip:opacity-100 group-hover/flip:text-cyan-500 dark:group-hover/flip:text-cyan-400 transition-all pointer-events-none">
              <RotateCw className="w-3 h-3 group-hover/flip:rotate-180 transition-transform duration-500" />
              <span className="hidden sm:inline">{hintText}</span>
            </div>
          )}
        </div>

        {/* ─── BACK FACE (FUTURISTIC DARK NAVY GLASSMORPHIC) ───── */}
        <div
          className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-[#070d18] text-white border border-cyan-500/40 shadow-2xl flex flex-col justify-between overflow-hidden ${backClassName}`}
        >
          {/* Futuristic Back Accent Highlights */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          {/* Back Content */}
          <div className="w-full h-full flex flex-col justify-between relative z-10 p-6 sm:p-7">
            {back}
          </div>

          {/* Back Side Flip Hint */}
          {showFlipHint && (
            <div className="absolute bottom-2.5 right-3 z-20 flex items-center gap-1 text-[10px] font-mono text-cyan-400/70 group-hover/flip:text-cyan-300 transition-all pointer-events-none">
              <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">Flip Back</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard3D;
