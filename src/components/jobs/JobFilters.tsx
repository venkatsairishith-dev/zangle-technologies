import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Filter, X, RotateCcw } from 'lucide-react';
import { TechDomain, JobType, WorkLocation } from '../../types';

interface JobFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedDomain: string;
  onDomainChange: (val: string) => void;
  selectedJobType: string;
  onJobTypeChange: (val: string) => void;
  selectedWorkLocation: string;
  onWorkLocationChange: (val: string) => void;
  onReset: () => void;
  totalMatches: number;
}

const DOMAINS: string[] = [
  'All Domains',
  'Cloud & DevOps',
  'AI / ML & Data Science',
  'Full-Stack & Backend',
  'Cybersecurity',
  'Data Engineering',
  'Enterprise & ERP'
];

const JOB_TYPES: string[] = ['All Types', 'Contract', 'Contract-to-Hire', 'Direct Placement'];
const WORK_MODES: string[] = ['All Modes', 'Remote', 'Hybrid', 'Onsite'];

export const JobFilters: React.FC<JobFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedDomain,
  onDomainChange,
  selectedJobType,
  onJobTypeChange,
  selectedWorkLocation,
  onWorkLocationChange,
  onReset,
  totalMatches
}) => {
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedDomain !== 'All Domains' ||
    selectedJobType !== 'All Types' ||
    selectedWorkLocation !== 'All Modes';

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
      {/* Top Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by role title, skill (e.g. Kubernetes, React, Python), or keywords..."
          className="w-full pl-12 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Pill Filter Rows */}
      <div className="space-y-4">
        {/* Domain Filter */}
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
            Technical Domain:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {DOMAINS.map((dom) => (
              <button
                key={dom}
                type="button"
                onClick={() => onDomainChange(dom)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDomain === dom
                    ? 'bg-cyan-500 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>

        {/* Job Type & Work Mode (Dual Rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
              Engagement Type:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {JOB_TYPES.map((jt) => (
                <button
                  key={jt}
                  type="button"
                  onClick={() => onJobTypeChange(jt)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
                    selectedJobType === jt
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {jt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
              Work Location Mode:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {WORK_MODES.map((wm) => (
                <button
                  key={wm}
                  type="button"
                  onClick={() => onWorkLocationChange(wm)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
                    selectedWorkLocation === wm
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {wm}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Status & Reset Controls */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div>
          Showing <span className="font-bold text-slate-900 dark:text-white">{totalMatches}</span> active engineering opportunities
        </div>

        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              onClick={onReset}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
