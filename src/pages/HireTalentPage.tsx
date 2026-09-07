import { motion } from 'framer-motion';
import React from 'react';
import { TalentWizard } from '../components/hire/TalentWizard';
import { SlaGuarantees } from '../components/hire/SlaGuarantees';
import { ModelComparison } from '../components/hire/ModelComparison';
import { Badge } from '../components/common/Badge';
import { SectionHeader } from '../components/common/SectionHeader';
import { ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';
import { useToast } from '../components/common/Toast';

export const HireTalentPage: React.FC = () => {
  const { showToast } = useToast();

  const handleWizardComplete = (formData: any) => {
    showToast(
      `Talent request for ${formData.headcount}x ${formData.roleTitle} transmitted! Dedicated tech lead will contact ${formData.workEmail} within 2 hours.`,
      'success'
    );
  };

  return (
    <div className="py-12 space-y-16">
      {/* Hero Header */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>48-72 HOUR VERIFIED CANDIDATE SHORTLISTS</span>
          </motion.div>

          <motion.h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 max-w-4xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Deploy Top Engineering Squads <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              With Pre-Assessed Talent.
            </span>
          </motion.h1>

          <motion.p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            Tell us your stack and timeline. We match you with the top 3-5% of pre-vetted senior engineers in 48 hours.
          </motion.p>
        </div>
      </section>

      {/* Talent Request Wizard Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <TalentWizard onComplete={handleWizardComplete} />
      </section>

      {/* Guarantees */}
      <SlaGuarantees />

      {/* Engagement Models Comparison */}
      <ModelComparison />
    </div>
  );
};
