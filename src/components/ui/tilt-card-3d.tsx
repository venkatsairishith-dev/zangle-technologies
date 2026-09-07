import React, { useRef, useState, useCallback, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TiltCard3DProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  tiltIntensity?: number;
  glareOpacity?: number;
  glowColor?: string;
  enableGlare?: boolean;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className,
  tiltIntensity = 12,
  glareOpacity = 0.15,
  glowColor = 'rgba(56, 189, 248, 0.25)',
  enableGlare = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates relative to card [-0.5, 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural mechanical response
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Calculate 3D rotations
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]);

  // Specular Glare Coordinates
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      className={cn(
        'relative rounded-2xl transition-shadow duration-300',
        isHovered
          ? 'shadow-[0_20px_50px_rgba(8,112,184,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
          : 'shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]',
        className
      )}
      {...props}
    >
      {/* 3D Content Wrapper */}
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>

      {/* Dynamic Specular Reflection Glare */}
      {enableGlare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            transition: 'opacity 0.3s ease',
          }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute -inset-[50%]"
            style={{
              background: `radial-gradient(circle at center, ${glowColor} 0%, rgba(255, 255, 255, 0.4) 30%, transparent 70%)`,
              left: glareX,
              top: glareY,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default TiltCard3D;
