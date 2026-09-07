import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/common/Reveal';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRACTICE_AREAS, HIRING_MODELS } from '../data/servicesData';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { FlipCard3D } from '../components/ui/flip-card-3d';
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
  Terminal,
  Zap,
  Sparkles
} from 'lucide-react';

export const PracticeAreasPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(PRACTICE_AREAS[0].id);

  const iconMap: Record<string, React.ReactNode> = {
    Cloud: <Cloud className="w-6 h-6 text-cyan-400" />,
    Cpu: <Cpu className="w-6 h-6 text-indigo-400" />,
    Code2: <Code2 className="w-6 h-6 text-blue-400" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    Database: <Database className="w-6 h-6 text-amber-400" />,
    Layers: <Layers className="w-6 h-6 text-purple-400" />
  };

  const selectedPractice = PRACTICE_AREAS.find((p) => p.id === activeTab) || PRACTICE_AREAS[0];

  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>SPECIALIZED TECHNICAL VERTICALS</span>
          </motion.div>

          <motion.h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 max-w-4xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Engineered Practice Areas for <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Mission-Critical Architectures.
            </span>
          </motion.h1>

          <motion.p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            Our talent advisors possess real-world software engineering backgrounds, evaluating code depth, system resilience, and concurrency over generic keywords.
          </motion.p>
        </div>
      </section>

      {/* Interactive Tabs + Deep Dive Vertical Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Vertical Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block px-2 mb-2">
              Select Practice Area
            </span>
            {PRACTICE_AREAS.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => setActiveTab(area.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                  activeTab === area.id
                    ? 'bg-white dark:bg-zangle-card border-cyan-500 shadow-lg ring-2 ring-cyan-500/20'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {iconMap[area.iconName]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                      {area.title}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      SLA: {area.avgTimeToFill}
                    </span>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform ${activeTab === area.id ? 'text-cyan-500 translate-x-1' : 'text-slate-400'}`} />
              </button>
            ))}
          </div>

          {/* Right Detailed Practice Overview Card (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
            <motion.div
              key={selectedPractice.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                    {iconMap[selectedPractice.iconName]}
                  </div>
                  <div>
                    <Badge variant="cyan" size="xs" className="mb-1">
                      PRACTICE DEEP-DIVE
                    </Badge>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {selectedPractice.title}
                    </h2>
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-slate-500 dark:text-slate-400">
                  <span>Target Shortlist Turnaround:</span>
                  <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                    {selectedPractice.avgTimeToFill}
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Practice Focus & Scope
                </h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedPractice.description}
                </p>
              </div>

              {/* Roles Typically Staffed */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                  Roles & Positions Frequently Deployed
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(selectedPractice.rolesStaffed || selectedPractice.rolesCovered || []).map((role, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                      <span className="font-semibold">{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Core Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                  Core Assessed Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPractice.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Banner */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Ready to deploy engineers in <strong className="text-slate-900 dark:text-white">{selectedPractice.title}</strong>?
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    to={`/hire-talent?domain=${encodeURIComponent(selectedPractice.domain)}`}
                    className="w-full sm:w-auto"
                  >
                    <Button variant="glow" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Request Talent in this Vertical
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* All 4 Engagement Models Section with 3D Flip Cards */}
      <section className="py-12 bg-slate-50/50 dark:bg-zangle-dark/90 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Flexible Deployment"
            badgeVariant="blue"
            title="Available Across All 4"
            gradientText="Engagement Frameworks."
            subtitle="Engage individual senior contributors or turnkey pods with transparent terms and zero risk. Flip any card for engagement specifics."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIRING_MODELS.map((m, ri) => (
              <Reveal key={m.id} delay={Math.min(ri, 6) * 0.06} className="h-full">
                <FlipCard3D
                  height="min-h-[360px] h-[360px]"
                  hintText="Flip for model benefits"
                  front={
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <Badge variant="cyan" size="xs">
                            {m.badge || m.sla}
                          </Badge>
                          <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                            SLA: {m.sla}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                          {m.title}
                        </h3>
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2.5">
                          {m.tagline}
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                          {m.description}
                        </p>

                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-1">
                            Ideal Use Case:
                          </span>
                          {m.idealFor.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                              <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                          ✓ {m.trialPeriod}
                        </span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-1">
                          Flip for perks <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  }
                  back={
                    <div className="flex flex-col justify-between h-full text-left">
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                          <div>
                            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                              ENGAGEMENT ADVANTAGES
                            </span>
                            <h4 className="text-sm font-bold text-white">
                              {m.title}
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            {m.trialPeriod}
                          </span>
                        </div>

                        <div className="space-y-1.5 my-2">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block flex items-center gap-1">
                            <Zap className="w-3 h-3 text-cyan-400" /> Enterprise Guarantees:
                          </span>
                          {m.benefits.map((benefit, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-tight">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                        <Link
                          to={`/hire-talent?model=${m.id}`}
                          className="w-full py-1.5 px-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs text-center transition-colors inline-flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/25"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Select {m.title}
                        </Link>
                      </div>
                    </div>
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticeAreasPage;
