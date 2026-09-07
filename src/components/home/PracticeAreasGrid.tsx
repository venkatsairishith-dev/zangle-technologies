import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRACTICE_AREAS } from '../../data/servicesData';
import { SectionHeader } from '../common/SectionHeader';
import { FlipCard3D } from '../ui/flip-card-3d';
import {
  Cloud,
  Cpu,
  Code2,
  ShieldCheck,
  Database,
  Layers,
  ArrowRight,
  Clock,
  CheckCircle2,
  Users,
  Sparkles,
  Award
} from 'lucide-react';

export const PracticeAreasGrid: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Cloud: <Cloud className="w-5 h-5 text-cyan-500" />,
    Cpu: <Cpu className="w-5 h-5 text-indigo-500" />,
    Code2: <Code2 className="w-5 h-5 text-blue-500" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    Database: <Database className="w-5 h-5 text-amber-500" />,
    Layers: <Layers className="w-5 h-5 text-purple-500" />,
  };

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/40 dark:bg-slate-950/40">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Specialized Tech Verticals"
          badgeVariant="cyan"
          title="Deep Domain Expertise in"
          gradientText="High-Demand Tech."
          subtitle="Interactive 3D Practice Cards: Flip any vertical card to reveal roles staffed, delivery capabilities, and candidate availability SLAs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRACTICE_AREAS.map((area, idx) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
              className="h-full"
            >
              <FlipCard3D
                height="min-h-[380px] h-[380px]"
                front={
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      {/* Icon & SLA Time Pill */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 shadow-sm">
                          {iconMap[area.iconName]}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
                          <Clock className="w-3.5 h-3.5 text-cyan-500" />
                          <span>Fill: {area.avgTimeToFill}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                        {area.title}
                      </h3>

                      <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400 mb-2.5 font-mono">
                        {area.tagline}
                      </p>

                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-2">
                        {area.description}
                      </p>

                      {/* Tech Pills */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1.5">
                          Core Technologies
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {area.technologies.slice(0, 5).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
                            >
                              {tech}
                            </span>
                          ))}
                          {area.technologies.length > 5 && (
                            <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
                              +{area.technologies.length - 5}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Front Footer */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                        Architect-Vetted
                      </span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-semibold inline-flex items-center gap-1">
                        Flip for capabilities <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                }
                back={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div>
                      {/* Back Header */}
                      <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-800">
                        <div>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                            PRACTICE BENCH PROFILE
                          </span>
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                            {area.title}
                          </h4>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 whitespace-nowrap">
                          {area.avgTimeToFill} SLA
                        </span>
                      </div>

                      {/* Key Highlights / Capabilities */}
                      <div className="mb-2.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-400" /> Core Capabilities:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {area.keyHighlights.map((hl, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Roles Staffed */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                          <Users className="w-3 h-3 text-cyan-400" /> Common Roles Deployed:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {area.rolesStaffed.map((role, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-200 border border-slate-700/70"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Back Action */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <Link
                        to={`/hire-talent?domain=${encodeURIComponent(area.domain)}`}
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500 text-white hover:bg-cyan-400 transition-colors inline-flex items-center gap-1 shadow-sm shadow-cyan-500/30"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Sparkles className="w-3 h-3" /> Hire In This Domain
                      </Link>

                      <Link
                        to={`/services#${area.id}`}
                        className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasGrid;
