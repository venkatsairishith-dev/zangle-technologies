import React from 'react';
import { Badge } from './Badge';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'cyan' | 'blue' | 'indigo' | 'emerald' | 'amber' | 'purple';
  title: string;
  gradientText?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

/**
 * Nearly every section on the site opens with one of these, so the small
 * cascade here -- badge, then heading, then subtitle, 60ms apart -- is what
 * gives the whole site its entrance rhythm without any page having to ask
 * for it.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'cyan',
  title,
  gradientText,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <Reveal className="mb-3">
          <Badge variant={badgeVariant} size="sm" dot>
            {badge}
          </Badge>
        </Reveal>
      )}
      <Reveal delay={badge ? 0.06 : 0}>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {title}{' '}
          {gradientText && (
            <span className="text-gradient">{gradientText}</span>
          )}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={badge ? 0.12 : 0.06}>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
};
