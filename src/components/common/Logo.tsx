import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  height?: number | string;
  className?: string;
  showSubtitle?: boolean;
  categoryBadge?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  height,
  className = '',
  categoryBadge
}) => {
  // Height mappings based on size
  const heights = {
    sm: 28,
    md: 42,
    lg: 48,
    xl: 60,
    custom: typeof height === 'number' ? height : (height ? parseInt(String(height), 10) : 40)
  };

  const currentHeight = height
    ? (typeof height === 'number' ? height : parseInt(String(height), 10) || 38)
    : heights[size];

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center shrink-0 ${className}`}>
        <img
          src="/logo-icon.png"
          alt="Zangle Technologies Logo"
          height={currentHeight}
          style={{ height: `${currentHeight}px`, width: 'auto' }}
          className="object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(6,182,212,0.25)]"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 shrink-0 ${className} select-none`}>
      <img
        src="/logo.png"
        alt="Zangle Technologies"
        height={currentHeight}
        style={{ height: `${currentHeight}px`, width: 'auto' }}
        className="object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(6,182,212,0.2)] max-w-none"
      />

      {categoryBadge && (
        <div className="hidden sm:flex items-center pl-3 min-[1280px]:pl-3.5 border-l border-slate-300 dark:border-slate-700">
          <span className="text-[10px] min-[1280px]:text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase font-mono leading-tight">
            {categoryBadge}
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
