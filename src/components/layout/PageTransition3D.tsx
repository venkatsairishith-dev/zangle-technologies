import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface PageTransition3DProps {
  children: React.ReactNode;
}

/**
 * Route transition wrapper.
 *
 * This used to apply, permanently, to a wrapper containing the whole page:
 *   - `will-change: transform`  — pins a full-page texture in GPU memory for the
 *     entire session. `will-change` is a short-lived hint you set just before an
 *     animation, not a decoration; leaving it on a page-sized element is one of
 *     the fastest ways to make a site stutter on low-memory machines.
 *   - `transform-style: preserve-3d` + `perspective` — puts every descendant
 *     into a 3D rendering context, disabling compositing fast paths site-wide.
 *   - per-route rotateX/rotateY variants, which is what required the 3D context.
 *
 * A single opacity + small translate reads as a clean, professional transition,
 * needs no 3D context, and lets framer-motion manage `will-change` itself for
 * the ~350ms the animation is actually running.
 */
export const PageTransition3D: React.FC<PageTransition3DProps> = ({ children }) => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // The first page must not slide in -- a route transition on a cold load is
  // just a flash before the content the user asked for. But `initial={false}`
  // on AnimatePresence is the wrong lever for that: it publishes "skip mount
  // animations" through PresenceContext to *every* descendant, which silently
  // disabled every whileInView entrance on the site whenever a page was loaded
  // directly rather than reached by clicking a link. Suppressing it on this one
  // element instead leaves the context alone.
  const firstRender = useRef(true);
  useEffect(() => {
    firstRender.current = false;
  }, []);

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={firstRender.current ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', minHeight: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition3D;
