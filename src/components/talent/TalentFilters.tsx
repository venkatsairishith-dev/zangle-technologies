import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

interface TalentFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedDomain: string;
  onDomainChange: (val: string) => void;
  onReset: () => void;
  totalCount: number;
}

const TALENT_DOMAINS = [
  'All Domains',
  'Cloud & DevOps',
  'AI / ML & Data Science',
  'Full-Stack & Backend',
  'Cybersecurity',
  'Data Engineering',
  'Enterprise & ERP'
];

export const TalentFilters: React.FC<TalentFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedDomain,
  onDomainChange,
  onReset,
  totalCount
}) => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by bench code (e.g. ZGL-8401), specific skill (e.g. AWS, PyTorch, Go), or role..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        />
      </div>

      {/* Domain Filters */}
      <div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
          Domain Category:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {TALENT_DOMAINS.map((dom) => (
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

      {/* Stats and Reset */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          Showing <strong className="text-slate-900 dark:text-white">{totalCount}</strong> vetted senior engineering consultants
        </span>

        {(searchQuery || selectedDomain !== 'All Domains') && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
