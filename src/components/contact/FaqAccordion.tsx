import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../../data/testimonialsData';
import { SectionHeader } from '../common/SectionHeader';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {FAQ_ITEMS.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-2xl border transition-all ${
              isOpen
                ? 'bg-white dark:bg-zangle-card border-cyan-500/40 shadow-lg'
                : 'bg-white/60 dark:bg-zangle-card/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
            >
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-cyan-500 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Height-animated so opening one question eases the ones below it
                down instead of snapping them. `initial={false}` stops the first
                item -- which starts open -- from unrolling on page load. */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
