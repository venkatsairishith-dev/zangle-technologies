import React from 'react';
import { motion } from 'framer-motion';
import { VETTING_STEPS } from '../../data/testimonialsData';
import { SectionHeader } from '../common/SectionHeader';
import { FileCheck, Terminal, Network, MessageSquare, Sparkles } from 'lucide-react';
import { TiltCard3D } from '../ui/tilt-card-3d';

export const VettingProcess: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    FileCheck: <FileCheck className="w-5 h-5 text-cyan-400" />,
    Terminal: <Terminal className="w-5 h-5 text-blue-400" />,
    Network: <Network className="w-5 h-5 text-indigo-400" />,
    MessageSquare: <MessageSquare className="w-5 h-5 text-purple-400" />,
    Sparkles: <Sparkles className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Our Vetting Standard"
          badgeVariant="emerald"
          title="The Rigorous 5-Stage"
          gradientText="Technical Screening."
          subtitle="Only the top 3-5% pass our multi-stage evaluation for production architecture, concurrency, and clean code."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {VETTING_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="h-full"
            >
              <TiltCard3D
                tiltIntensity={12}
                glareOpacity={0.18}
                glowColor="rgba(34, 211, 238, 0.3)"
                className="h-full p-5 rounded-2xl bg-slate-800/80 backdrop-blur-md border border-slate-700/80 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                      {step.step}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 group-hover:border-cyan-500/40 transition-colors">
                      {iconMap[step.icon]}
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Phase {idx + 1}</span>
                  <span className="text-emerald-400 font-semibold">Strict Standard</span>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/90 border border-slate-700 text-xs sm:text-sm text-slate-300 shadow-lg backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Every candidate interview and code audit is conducted by senior engineering practitioners.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VettingProcess;
