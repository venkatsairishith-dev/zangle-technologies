import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Check, Minus } from 'lucide-react';

export const ModelComparison: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Average Time to First Shortlist',
      contract: '48 - 72 Hours',
      c2h: '3 - 5 Days',
      direct: '5 - 10 Days',
      pod: '1 - 2 Weeks'
    },
    {
      feature: 'Payroll, Benefits & Taxes',
      contract: 'Handled 100% by Zangle',
      c2h: 'Zangle during trial, then client',
      direct: 'Client W-2 Payroll',
      pod: 'Handled 100% by Zangle'
    },
    {
      feature: 'Trial & Evaluation Period',
      contract: '14-Day Zero-Risk Trial',
      c2h: '3-6 Months On-the-Job',
      direct: '90-Day Full Replacement',
      pod: 'Sprint-by-Sprint Milestones'
    },
    {
      feature: 'Cost Structure',
      contract: 'Hourly / Monthly Billing',
      c2h: 'Hourly → Prorated Conversion',
      direct: 'One-Time Success Fee',
      pod: 'Fixed Monthly Squad Retainer'
    },
    {
      feature: 'IP & Code Ownership',
      contract: '100% Client Ownership',
      contractCheck: true,
      c2hCheck: true,
      directCheck: true,
      podCheck: true
    },
    {
      feature: 'Best Fit Scenario',
      contract: 'Bursty projects, niche tech, migrations',
      c2h: 'Long-term team growth with low risk',
      direct: 'Core foundational hires & leadership',
      pod: 'End-to-end product feature delivery'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-zangle-dark/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Engagement Comparison"
          badgeVariant="blue"
          title="Compare Flexible"
          gradientText="Hiring Models."
          subtitle="Choose the engagement model that matches your timeline, budget, and team strategy."
        />

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-zangle-card shadow-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white">
                <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs text-slate-500 dark:text-slate-400">
                  Feature / Parameter
                </th>
                <th className="py-4 px-5 font-bold text-cyan-600 dark:text-cyan-400">
                  Contract / Staff Aug
                </th>
                <th className="py-4 px-5 font-bold text-blue-600 dark:text-blue-400">
                  Contract-to-Hire
                </th>
                <th className="py-4 px-5 font-bold text-indigo-600 dark:text-indigo-400">
                  Direct Placement
                </th>
                <th className="py-4 px-5 font-bold text-purple-600 dark:text-purple-400">
                  Managed Pod
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-sans">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 px-5 font-semibold text-slate-900 dark:text-slate-100">
                    {row.feature}
                  </td>
                  <td className="py-4 px-5 text-slate-600 dark:text-slate-300">
                    {row.contractCheck ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <Check className="w-4 h-4" /> Yes (Client Owns)
                      </span>
                    ) : (
                      row.contract
                    )}
                  </td>
                  <td className="py-4 px-5 text-slate-600 dark:text-slate-300">
                    {row.c2hCheck ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <Check className="w-4 h-4" /> Yes (Client Owns)
                      </span>
                    ) : (
                      row.c2h
                    )}
                  </td>
                  <td className="py-4 px-5 text-slate-600 dark:text-slate-300">
                    {row.directCheck ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <Check className="w-4 h-4" /> Yes (Client Owns)
                      </span>
                    ) : (
                      row.direct
                    )}
                  </td>
                  <td className="py-4 px-5 text-slate-600 dark:text-slate-300">
                    {row.podCheck ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <Check className="w-4 h-4" /> Yes (Client Owns)
                      </span>
                    ) : (
                      row.pod
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
