import React from 'react';
import { Job } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Calendar,
  Building,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (job: Job) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isOpen,
  onClose,
  onApply
}) => {
  if (!job) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title="Position Specification">
      <div className="space-y-6">
        {/* Header Summary */}
        <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="cyan" size="xs">
              {job.jobType}
            </Badge>
            <Badge variant="slate" size="xs">
              {job.domain}
            </Badge>
            {job.featured && (
              <Badge variant="amber" size="xs" dot>
                PRIORITY HIRE
              </Badge>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            {job.title}
          </h2>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-500" />
              <span>{job.location} ({job.workLocation})</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{job.rateOrSalary}</span>
            </div>
            {job.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{job.duration}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Posted {job.postedDate}</span>
            </div>
          </div>
        </div>

        {/* Required Tech Stack */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
            Required Technical Core
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {job.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Role Overview */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
            Role Overview
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {job.description || job.overview}
          </p>
        </div>

        {/* Responsibilities */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
            Key Engineering Responsibilities
          </h4>
          <ul className="space-y-2">
            {job.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
            Required Qualifications & Experience
          </h4>
          <ul className="space-y-2">
            {(job.qualifications || job.requirements || []).map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits & Perks */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
            Placement Benefits & Compensation Terms
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {job.perks.map((perk, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Button variant="ghost" size="md" onClick={onClose}>
            Close
          </Button>

          <Button
            variant="glow"
            size="md"
            onClick={() => {
              onClose();
              onApply(job);
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Apply for this Position
          </Button>
        </div>
      </div>
    </Modal>
  );
};
