import React, { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ShimmerTextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: React.ReactNode;
  variant?: 'electric' | 'aurora' | 'sunset' | 'cyber' | 'subtle';
  speed?: number; // duration in seconds
  triggerOnHover?: boolean;
  glow?: boolean;
  className?: string;
}

const variantGradients: Record<string, string> = {
  electric:
    'from-[#00d2ff] via-[#7928ca] via-[#ff0080] via-white via-[#00f2fe] via-[#7928ca] to-[#00d2ff]',
  aurora:
    'from-[#10b981] via-[#06b6d4] via-[#6366f1] via-white via-[#a855f7] via-[#06b6d4] to-[#10b981]',
  sunset:
    'from-[#f59e0b] via-[#ef4444] via-[#ec4899] via-white via-[#8b5cf6] via-[#ef4444] to-[#f59e0b]',
  cyber:
    'from-[#00f2fe] via-[#4facfe] via-[#000] via-white via-[#00f2fe] to-[#4facfe]',
  subtle:
    'from-slate-300 via-slate-100 via-white via-cyan-200 via-slate-400 to-slate-300',
};

const variantGlows: Record<string, string> = {
  electric:
    'drop-shadow-[0_0_24px_rgba(121,40,202,0.35)] drop-shadow-[0_0_48px_rgba(0,210,255,0.2)]',
  aurora:
    'drop-shadow-[0_0_24px_rgba(6,182,212,0.35)] drop-shadow-[0_0_48px_rgba(16,185,129,0.2)]',
  sunset:
    'drop-shadow-[0_0_24px_rgba(239,68,68,0.35)] drop-shadow-[0_0_48px_rgba(245,158,11,0.2)]',
  cyber:
    'drop-shadow-[0_0_24px_rgba(79,172,254,0.35)] drop-shadow-[0_0_48px_rgba(0,242,254,0.2)]',
  subtle: 'drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]',
};

export const ShimmerText: React.FC<ShimmerTextProps> = ({
  as: Component = 'span',
  children,
  variant = 'electric',
  speed = 7,
  triggerOnHover = false,
  glow = true,
  className,
  style,
  ...props
}) => {
  const gradientClass = variantGradients[variant] || variantGradients.electric;
  const glowClass = glow ? variantGlows[variant] || variantGlows.electric : '';

  return (
    <Component
      style={{
        animationDuration: `${speed}s`,
        backgroundSize: '200% auto',
        ...style,
      }}
      className={cn(
        'inline-block font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r',
        gradientClass,
        glowClass,
        triggerOnHover
          ? 'hover:animate-text-shimmer motion-reduce:animate-none'
          : 'animate-text-shimmer motion-reduce:animate-none',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ShimmerText;
