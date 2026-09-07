import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import { JOBS_DATA } from '../data/jobsData';
import { Job } from '../types';
import { JobFilters } from '../components/jobs/JobFilters';
import { Reveal } from '../components/common/Reveal';
import { JobCard } from '../components/jobs/JobCard';
import { JobDetailModal } from '../components/jobs/JobDetailModal';
import { QuickApplyModal } from '../components/jobs/QuickApplyModal';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useToast } from '../components/common/Toast';
import { Briefcase, Sparkles, Send, Bell } from 'lucide-react';

export const JobsPage: React.FC = () => {
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedJobType, setSelectedJobType] = useState('All Types');
  const [selectedWorkLocation, setSelectedWorkLocation] = useState('All Modes');

  // Modals state
  const [activeDetailJob, setActiveDetailJob] = useState<Job | null>(null);
  const [activeApplyJob, setActiveApplyJob] = useState<Job | null>(null);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job: Job) => {
      // Search text match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        job.title.toLowerCase().includes(query) ||
        (job.description || '').toLowerCase().includes(query) ||
        job.skills.some((s: string) => s.toLowerCase().includes(query)) ||
        job.location.toLowerCase().includes(query);

      // Domain match
      const matchesDomain =
        selectedDomain === 'All Domains' || job.domain === selectedDomain;

      // Job Type match
      const matchesJobType =
        selectedJobType === 'All Types' || job.jobType === selectedJobType;

      // Work Mode match
      const matchesWorkLocation =
        selectedWorkLocation === 'All Modes' || job.workLocation === selectedWorkLocation;

      return matchesSearch && matchesDomain && matchesJobType && matchesWorkLocation;
    });
  }, [searchQuery, selectedDomain, selectedJobType, selectedWorkLocation]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All Domains');
    setSelectedJobType('All Types');
    setSelectedWorkLocation('All Modes');
  };

  const handleApplySuccess = (candidateName: string, roleTitle: string) => {
    showToast(
      `Application submitted for ${roleTitle}! Our talent team has emailed confirmation to you.`,
      'success'
    );
  };

  return (
    <div className="py-12 space-y-12">
      {/* Header Banner */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT HIRING PARTNER OPPORTUNITIES</span>
          </motion.div>

          <motion.h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Tech Roles with <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Top Enterprise Teams.
            </span>
          </motion.h1>

          <motion.p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            Active contract, C2H, and direct hire positions for senior engineers, architects, and consultants.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area: Filter & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Filters Component */}
          <JobFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDomain={selectedDomain}
            onDomainChange={setSelectedDomain}
            selectedJobType={selectedJobType}
            onJobTypeChange={setSelectedJobType}
            selectedWorkLocation={selectedWorkLocation}
            onWorkLocationChange={setSelectedWorkLocation}
            onReset={handleResetFilters}
            totalMatches={filteredJobs.length}
          />

          {/* Job Listings Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, i) => (
                  <Reveal key={job.id} delay={Math.min(i, 6) * 0.06} className="h-full">
                    <JobCard
                    job={job}
                    onViewDetails={(j) => setActiveDetailJob(j)}
                    onQuickApply={(j) => setActiveApplyJob(j)}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md max-w-lg mx-auto">
              <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                No matching opportunities found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Try expanding your search query or reset filters to see all available roles.
              </p>
              <Button variant="outline" size="sm" onClick={handleResetFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Candidate Network CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <Badge variant="cyan" size="xs">
              TALENT NETWORK
            </Badge>
            <h3 className="text-xl sm:text-2xl font-bold">
              Don’t see your exact stack or specialty?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Join our talent bench for unlisted enterprise contract and full-time opportunities.
            </p>
          </div>

          <Button
            variant="glow"
            size="md"
            className="shrink-0"
            onClick={() => {
              if (filteredJobs[0]) {
                setActiveApplyJob(filteredJobs[0]);
              }
            }}
            rightIcon={<Send className="w-4 h-4" />}
          >
            Submit General Resume
          </Button>
        </div>
      </section>

      {/* Modals */}
      <JobDetailModal
        job={activeDetailJob}
        isOpen={!!activeDetailJob}
        onClose={() => setActiveDetailJob(null)}
        onApply={(j) => setActiveApplyJob(j)}
      />

      <QuickApplyModal
        job={activeApplyJob}
        isOpen={!!activeApplyJob}
        onClose={() => setActiveApplyJob(null)}
        onSubmitSuccess={handleApplySuccess}
      />
    </div>
  );
};
