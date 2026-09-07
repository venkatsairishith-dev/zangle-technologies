import React from 'react';
import { motion } from 'framer-motion';
import { TiltCard3D } from '../ui/tilt-card-3d';
import {
  Cloud,
  Terminal,
  Cpu,
  Layers,
  GitBranch,
  Server
} from 'lucide-react';

interface TechPartner {
  name: string;
  category: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
}

const PARTNERS: TechPartner[] = [
  {
    name: 'AWS',
    category: 'Cloud Infrastructure',
    badge: 'Advanced Tier',
    icon: <Cloud className="w-5 h-5 text-amber-500" />,
    color: '#f59e0b',
  },
  {
    name: 'Microsoft Azure',
    category: 'Enterprise Cloud & AI',
    badge: 'Gold Partner',
    icon: <Server className="w-5 h-5 text-blue-500" />,
    color: '#3b82f6',
  },
  {
    name: 'Google Cloud',
    category: 'Data & Distributed Compute',
    badge: 'Premier',
    icon: <Cpu className="w-5 h-5 text-cyan-500" />,
    color: '#06b6d4',
  },
  {
    name: 'Docker',
    category: 'Containerization',
    badge: 'Standard',
    icon: <Layers className="w-5 h-5 text-blue-400" />,
    color: '#60a5fa',
  },
  {
    name: 'Kubernetes',
    category: 'Cloud-Native Orchestration',
    badge: 'CNCF Verified',
    icon: <Terminal className="w-5 h-5 text-indigo-500" />,
    color: '#6366f1',
  },
  {
    name: 'GitHub',
    category: 'DevOps & Enterprise CI/CD',
    badge: 'Enterprise',
    icon: <GitBranch className="w-5 h-5 text-purple-500" />,
    color: '#a855f7',
  },
];

export const TrustedCompanies: React.FC = () => {
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
              TRUSTED BY INNOVATIVE COMPANIES & ENTERPRISE ECOSYSTEMS
            </span>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {PARTNERS.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
              >
                <TiltCard3D
                  tiltIntensity={10}
                  glareOpacity={0.14}
                  glowColor="rgba(56, 189, 248, 0.25)"
                  className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-md flex flex-col items-center justify-center text-center group h-full hover:border-cyan-500/40 transition-all cursor-default"
                >
                  <div className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/70 mb-2 group-hover:scale-110 transition-transform shadow-sm">
                    {partner.icon}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate max-w-full">
                    {partner.category}
                  </p>
                  <span className="mt-2 text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                    {partner.badge}
                  </span>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
