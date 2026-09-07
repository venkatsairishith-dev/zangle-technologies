import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealDirection = 'up' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  /** Which way the element drifts in from. Default 'up'. */
  from?: RevealDirection;
  /** Stagger, in seconds. Pass `index * 0.06` for a list. */
  delay?: number;
  className?: string;
  /** Renders as this element instead of a div, so grid/flex children stay valid. */
  as?: 'div' | 'li' | 'section' | 'article' | 'span';
}

/**
 * The site's one entrance animation.
 *
 * Deliberately small: 12px of travel and a fade, nothing else. Only `opacity`
 * and `transform` are touched, so each reveal is a compositor job -- no layout,
 * no paint, and no reflow of the section around it. Anything that animates
 * width, height, top or margin belongs somewhere else.
 *
 * `once: true` means a reveal fires the first time it is scrolled to and never
 * again; replaying on every pass is what makes a long page feel restless.
 * `amount: 0.15` fires as soon as a sliver is showing, so tall cards do not sit
 * blank waiting to cross the middle of the screen.
 *
 * Under `prefers-reduced-motion` this renders a plain element with no motion
 * props at all, rather than a zero-duration animation.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  from = 'up',
  delay = 0,
  className = '',
  as = 'div',
}) => {
  const reduce = useReducedMotion();

  const offset =
    from === 'up'
      ? { y: 12 }
      : from === 'left'
        ? { x: -16 }
        : from === 'right'
          ? { x: 16 }
          : {};

  if (reduce) {
    return React.createElement(as, { className }, children);
  }

  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
};
