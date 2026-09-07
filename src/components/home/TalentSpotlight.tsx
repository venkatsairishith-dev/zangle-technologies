import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TALENT_BENCH } from '../../data/talentBenchData';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { ArrowRight } from 'lucide-react';
import { TalentCard } from '../talent/TalentCard';

export const TalentSpotlight: React.FC = () => {
  // Show first 4 top talent profiles on home
  const featuredTalent = TALENT_BENCH.slice(0, 4);

  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-950/50 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-24 w-[450px] h-[450px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-24 w-[450px] h-[450px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Ready for Deployment"
          badgeVariant="cyan"
          title="Featured Pre-Vetted"
          gradientText="Talent Bench."
          subtitle="Interactive 3D Profile Cards: Pre-screened senior engineers available for immediate deployment. Flip any card to reveal career milestones, past scale achievements, and audit metrics."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredTalent.map((profile, idx) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="h-full"
            >
              <TalentCard talent={profile} />
            </motion.div>
          ))}
        </div>

        {/* View Full Talent Bench Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link to="/talent-bench">
            <Button variant="outline" size="md" className="rounded-full px-8 shadow-sm hover:shadow-cyan-500/10" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View Full Talent Bench ({TALENT_BENCH.length}+ Active Profiles)
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TalentSpotlight;
