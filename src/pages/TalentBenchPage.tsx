import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TALENT_BENCH } from '../data/talentBenchData';
import { TalentProfile } from '../types';
import { Reveal } from '../components/common/Reveal';
import { TalentCard } from '../components/talent/TalentCard';
import { TalentFilters } from '../components/talent/TalentFilters';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ShieldCheck, UserCheck, Sparkles, ArrowRight } from 'lucide-react';

export const TalentBenchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');

  const filteredTalent = useMemo(() => {
    return TALENT_BENCH.filter((profile) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        profile.benchCode.toLowerCase().includes(query) ||
        profile.title.toLowerCase().includes(query) ||
        profile.bioSummary.toLowerCase().includes(query) ||
        profile.topSkills.some((s) => s.toLowerCase().includes(query));

      const matchesDomain =
        selectedDomain === 'All Domains' || profile.domain === selectedDomain;

      return matchesSearch && matchesDomain;
    });
  }, [searchQuery, selectedDomain]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All Domains');
  };

  const handleRequestProfile = (talent: TalentProfile) => {
    navigate(
      `/hire-talent?profile=${talent.benchCode}&domain=${encodeURIComponent(talent.domain)}&role=${encodeURIComponent(talent.title)}`
    );
  };

  return (
    <div className="py-12 space-y-12">
      {/* Page Header */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>IMMEDIATELY DEPLOYABLE SENIOR CONSULTANTS</span>
          </motion.div>

          <motion.h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Pre-Vetted <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Talent Bench Directory.
            </span>
          </motion.h1>

          <motion.p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            Anonymized profiles of senior engineers, SREs, MLOps leads, and architects ready to deploy in days.
          </motion.p>
        </div>
      </section>

      {/* Directory Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <TalentFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDomain={selectedDomain}
          onDomainChange={setSelectedDomain}
          onReset={handleResetFilters}
          totalCount={filteredTalent.length}
        />

        {filteredTalent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalent.map((profile, i) => (
                <Reveal key={profile.id} delay={Math.min(i, 6) * 0.06} className="h-full">
                  <TalentCard
                  talent={profile}
                  onRequestProfile={handleRequestProfile}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md max-w-md mx-auto">
            <UserCheck className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              No matching profiles on active bench
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              We have thousands of unlisted consultants in our vetted pipeline.
            </p>
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Custom Search Prompt Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 border border-blue-500/30 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <Badge variant="cyan" size="xs">
              CUSTOM SEARCH REQUISITION
            </Badge>
            <h3 className="text-xl sm:text-2xl font-bold">
              Need a bespoke stack or confidential executive search?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Our technical practice leads source, code-audit, and shortlist niche enterprise engineers in 48-72 hours.
            </p>
          </div>

          <Button
            variant="glow"
            size="lg"
            onClick={() => navigate('/hire-talent')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Launch Custom Talent Search
          </Button>
        </div>
      </section>
    </div>
  );
};
