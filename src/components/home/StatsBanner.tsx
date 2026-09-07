import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Users, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { FlipCard3D } from '../ui/flip-card-3d';
import { Link } from 'react-router-dom';

interface StatFlipItem {
  id: string;
  value: string;
  label: string;
  frontSub: string;
  badge: string;
  icon: React.ReactNode;
  backTitle: string;
  backHighlights: string[];
  backActionText: string;
  backActionLink: string;
}

const STAT_FLIP_DATA: StatFlipItem[] = [
  {
    id: 'sla',
    value: '48 Hrs',
    label: 'Shortest SLA',
    frontSub: 'Interview-ready candidates in 48h',
    badge: 'VERIFIED SLA',
    icon: <Clock className="w-5 h-5 text-cyan-500" />,
    backTitle: '48-Hour Shortlist SLA',
    backHighlights: [
      '2–3 senior engineer profiles delivered within 48h',
      'Pre-vetted through live system design audits',
      'Direct hiring manager calendar booking',
    ],
    backActionText: 'Request Shortlist',
    backActionLink: '/hire-talent',
  },
  {
    id: 'retention',
    value: '98.4%',
    label: 'Retention Rate',
    frontSub: 'High contract & C2H longevity',
    badge: 'ENTERPRISE FIT',
    icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
    backTitle: 'Engineered For Longevity',
    backHighlights: [
      'Top-tier technical & cultural alignment',
      'Ongoing dedicated consultant advocacy',
      '84% contract-to-hire conversion success',
    ],
    backActionText: 'View Case Studies',
    backActionLink: '/case-studies',
  },
  {
    id: 'talent',
    value: '5,000+',
    label: 'Vetted Talent',
    frontSub: 'Top 3% senior engineers ready',
    badge: 'PRE-VETTED',
    icon: <Users className="w-5 h-5 text-emerald-500" />,
    backTitle: 'Architect-Led Bench',
    backHighlights: [
      'Strict 5-stage coding & architecture screening',
      'Cloud, AI/ML, DevOps, and Full-Stack leads',
      'Immediate availability for contract or direct',
    ],
    backActionText: 'Explore Talent Bench',
    backActionLink: '/talent-bench',
  },
  {
    id: 'trial',
    value: '14 Days',
    label: 'Risk-Free Trial',
    frontSub: '100% satisfaction guaranteed',
    badge: 'ZERO RISK',
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    backTitle: '100% Zero-Risk Trial',
    backHighlights: [
      'Evaluate your candidate on real team sprints',
      'Zero financial liability if not 100% satisfied',
      'Instant priority engineer replacement',
    ],
    backActionText: 'Start Free Trial',
    backActionLink: '/hire-talent',
  },
];

export const StatsBanner: React.FC = () => {
  return (
    <section className="py-14 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Hint */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            INTERACTIVE 3D METRICS • HOVER OR CLICK ANY CARD TO REVEAL DETAILS
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STAT_FLIP_DATA.map((stat) => (
            <FlipCard3D
              key={stat.id}
              height="min-h-[220px] h-[220px]"
              front={
                <div className="flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <span className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60">
                      {stat.icon}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      {stat.badge}
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {stat.frontSub}
                    </div>
                  </div>
                </div>
              }
              back={
                <div className="flex flex-col justify-between h-full text-left">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        {stat.backTitle}
                      </h4>
                    </div>

                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      {stat.backHighlights.map((point, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-tight">
                          <span className="text-cyan-400 font-bold shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <Link
                      to={stat.backActionLink}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{stat.backActionText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <span className="text-[10px] font-mono text-slate-500">Zangle SLA</span>
                  </div>
                </div>
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBanner;
