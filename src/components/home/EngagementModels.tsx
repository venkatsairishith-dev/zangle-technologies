import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HIRING_MODELS } from '../../data/servicesData';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Check, ArrowRight, Zap, RefreshCw, UserCheck, Users } from 'lucide-react';
import { TiltCard3D } from '../ui/tilt-card-3d';

export const EngagementModels: React.FC = () => {
  const modelIcons = {
    contract: <Zap className="w-5 h-5 text-cyan-400" />,
    'contract-to-hire': <RefreshCw className="w-5 h-5 text-indigo-400" />,
    'direct-placement': <UserCheck className="w-5 h-5 text-emerald-400" />,
    'managed-team': <Users className="w-5 h-5 text-amber-400" />
  };

  const badgeVariants: Record<string, 'cyan' | 'indigo' | 'emerald' | 'amber'> = {
    contract: 'cyan',
    'contract-to-hire': 'indigo',
    'direct-placement': 'emerald',
    'managed-team': 'amber'
  };

  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-950/50 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 -left-20 w-[450px] h-[350px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-20 w-[450px] h-[350px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Flexible Engagement Models"
          badgeVariant="indigo"
          title="Engineered to Fit Your"
          gradientText="Hiring Strategy."
          subtitle="Flexible hiring: agile contract capacity, risk-free trial evaluation, or permanent executive placement."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIRING_MODELS.map((model, idx) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="h-full"
            >
              <TiltCard3D
                tiltIntensity={10}
                glareOpacity={0.15}
                className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-2xl dark:shadow-card-dark transition-all duration-300 group"
              >
                <div>
                  {/* Card Top */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 group-hover:scale-110 transition-transform">
                      {modelIcons[model.id]}
                    </div>
                    <Badge variant={badgeVariants[model.id]} size="xs">
                      {model.badge}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
                    {model.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {model.tagline}
                  </p>

                  {/* Key Benefits List */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      Key Highlights
                    </span>
                    {model.benefits.slice(0, 3).map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom SLA & Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Turnaround:</span>
                    <span className="font-mono font-semibold text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">
                      {model.sla}
                    </span>
                  </div>

                  <Link to={`/hire-talent?model=${model.id}`} className="block w-full">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full justify-between rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 transition-all"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Select Model
                    </Button>
                  </Link>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

        {/* Comparison Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Need guidance selecting the right engagement model?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Speak with a technical staffing advisor to tailor team structures, trial periods, and SLAs.
            </p>
          </div>
          <Link to="/hire-talent" className="shrink-0 w-full sm:w-auto">
            <Button variant="glow" size="md" className="w-full sm:w-auto rounded-full px-6" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Compare Models
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EngagementModels;
