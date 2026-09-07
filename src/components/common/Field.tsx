import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FieldProps {
  label: string;
  required?: boolean;
  /** Seconds of stagger, so a row of fields arrives in sequence. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Label, focus affordance and entrance motion for one form control.
 *
 * Focus is tracked on the wrapper rather than on the control: React's
 * `onFocus`/`onBlur` are focusin/focusout, which bubble, so a single pair of
 * handlers covers whatever `input`, `select` or `textarea` is passed as a
 * child. The controls stay plain DOM elements -- no cloning, no refs, and no
 * per-field state leaking into the page that renders them.
 *
 * The focus ring is animated here instead of via Tailwind's `focus:ring`,
 * which snaps on instantly. Two things move: a soft ring that grows out of the
 * control's edge, and an underline that scales out from the centre.
 */
export const Field: React.FC<FieldProps> = ({
  label,
  required = false,
  delay = 0,
  className = '',
  children,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <label
        className={`block text-xs font-mono font-semibold mb-1.5 transition-colors duration-200 ${
          focused ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300'
        }`}
      >
        {label}
        {required && (
          <span className={focused ? 'text-cyan-500' : 'text-slate-400'}> *</span>
        )}
      </label>

      <motion.div
        className="relative rounded-xl"
        animate={{
          boxShadow: focused
            ? '0 0 0 4px rgba(6, 182, 212, 0.15)'
            : '0 0 0 0px rgba(6, 182, 212, 0)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {children}

        {/* Sweeps out from the centre. `initial={false}` so a field that is
            focused on mount does not play the sweep before it is visible. */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 bottom-0 h-[2px] origin-center rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </motion.div>
  );
};

/** Shared control styling, so every field in a form animates identically. */
export const fieldControlClass =
  'w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border ' +
  'border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white ' +
  'placeholder-slate-400 focus:outline-none focus:border-cyan-500/70 ' +
  'transition-colors duration-200';
