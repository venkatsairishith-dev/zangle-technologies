import React from 'react';
import { Clock, ShieldCheck, RefreshCw, Award, Zap, CheckCircle2, ArrowRight, FileText, Lock } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { FlipCard3D } from '../ui/flip-card-3d';

export const SlaGuarantees: React.FC = () => {
  const guarantees = [
    {
      icon: <Clock className="w-6 h-6 text-cyan-400" />,
      title: '48-72 Hour Shortlist SLA',
      subtitle: 'Velocity without compromise',
      description: 'Receive 3-5 pre-vetted, interview-ready candidate dossiers with complete code evaluation reports within 48-72 hours.',
      metric: '< 48 Hours Median',
      details: [
        'Dedicated Practice Lead assigned upon requisition',
        'Direct calendar booking links for all shortlisted engineers',
        'Comprehensive repo code audit attached with each resume'
      ],
      clause: 'Clause 4.2 • Velocity SLA Guarantee'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: '14-Day Zero-Risk Trial',
      subtitle: '100% Satisfaction guarantee',
      description: 'Evaluate your contractor on active deliverables for two full weeks. If not completely satisfied, pay zero.',
      metric: '0 Financial Risk',
      details: [
        'Active production sprint participation from Day 1',
        'Zero-questions-asked cancellation during first 14 days',
        'Immediate seamless replacement within 48h if required'
      ],
      clause: 'Clause 7.1 • Zero-Risk Performance Assurance'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-blue-400" />,
      title: '90-Day Placement Guarantee',
      subtitle: 'Direct-hire security',
      description: 'For direct hires, if a candidate leaves or fails to meet deliverables within 90 days, we replace them at zero extra cost.',
      metric: '100% Free Replacement',
      details: [
        'Covers voluntary departures and performance mismatch',
        'Full priority pipeline re-activated instantly',
        'No replacement recruitment fee charged'
      ],
      clause: 'Clause 9.4 • Direct Placement Warranty'
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: 'Strict Technical Audits',
      subtitle: 'Vetted by Staff Engineers',
      description: 'Every candidate is evaluated on live architecture, concurrency, and production codebases by senior tech leads.',
      metric: 'Top 3% Acceptance',
      details: [
        'Live 60-min system design & concurrency code review',
        'Identity & security clearance background check',
        'Real-world algorithmic problem solving evaluation'
      ],
      clause: 'Clause 3.1 • Technical Competence Standard'
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Enterprise SLA Guarantees"
          badgeVariant="emerald"
          title="De-Risk Your Hiring With"
          gradientText="Ironclad Protections."
          subtitle="Every talent placement comes standard with enterprise SLAs designed to eliminate hiring friction and guarantee engineering excellence."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => (
            <FlipCard3D
              key={idx}
              height="min-h-[340px] h-[340px]"
              hintText="Flip for SLA terms"
              front={
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                        {item.metric}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-2 font-mono">
                      {item.subtitle}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> MSA Backed
                    </span>
                    <span className="text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                      SLA Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              }
              back={
                <div className="flex flex-col justify-between h-full text-left">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white">
                        <Lock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>SLA CLAUSE SUMMARY</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300">
                        {item.metric}
                      </span>
                    </div>

                    <div className="space-y-1.5 my-2">
                      {item.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3 text-emerald-400" /> {item.clause}
                    </span>
                    <span className="text-emerald-400 font-bold">100% Enforced</span>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SlaGuarantees;
