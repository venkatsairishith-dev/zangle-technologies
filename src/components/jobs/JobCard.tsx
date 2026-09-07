import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { FlipCard3D } from '../ui/flip-card-3d';
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Calendar
} from 'lucide-react';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onQuickApply: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails, onQuickApply }) => {
  const getJobTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'Contract':
        return 'cyan';
      case 'Contract-to-Hire':
        return 'blue';
      case 'Direct Placement':
      case 'Full-Time':
        return 'emerald';
      default:
        return 'slate';
    }
  };

  return (
    <FlipCard3D
      height="min-h-[420px] h-[420px]"
      hintText="Flip for interview stages & perks"
      front={
        <div className="flex flex-col justify-between h-full">
          <div>
            {/* Top Badges & Posted Date */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Badge variant={getJobTypeBadgeVariant(job.jobType)} size="xs">
                  {job.jobType}
                </Badge>
                {job.featured && (
                  <Badge variant="amber" size="xs" dot>
                    HOT ROLE
                  </Badge>
                )}
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Posted {job.postedDate}
              </span>
            </div>

            {/* Title & Domain */}
            <h3
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(job);
              }}
              className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-cyan-500 transition-colors cursor-pointer mb-0.5 line-clamp-1"
            >
              {job.title}
            </h3>

            <div className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
              {job.domain} • <span className="text-slate-500 dark:text-slate-400">{job.experienceLevel}</span>
            </div>

            {/* Meta Info Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 mb-2.5 pb-2 border-b border-slate-100 dark:border-slate-800 font-mono">
              <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 truncate">
                <DollarSign className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{job.rateOrSalary}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span className="truncate">{job.location} ({job.workLocation})</span>
              </div>
            </div>

            {/* Short Summary Description */}
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2 leading-relaxed">
              {job.overview || job.description}
            </p>

            {/* Skills Pills */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
                Required Toolchain:
              </span>
              <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 4).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 4 && (
                  <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20">
                    +{job.skills.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(job);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-cyan-500 transition-colors"
            >
              Full Spec
            </button>

            <span className="text-cyan-600 dark:text-cyan-400 font-semibold inline-flex items-center gap-1 text-xs">
              Flip for process <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      }
      back={
        <div className="flex flex-col justify-between h-full text-left">
          <div>
            {/* Back Header */}
            <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                  HIRING VELOCITY • SLA
                </span>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {job.title}
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                {job.rateOrSalary}
              </span>
            </div>

            {/* Fast-Track Interview Steps */}
            <div className="mb-3 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1 font-semibold">
                <Zap className="w-3 h-3 text-cyan-400" /> Fast-Track Process:
              </span>

              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-semibold">Step 1 (24h):</strong> 30-min Technical Sync with Zangle Practice Lead.
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-semibold">Step 2 (48h):</strong> Direct Team / Architecture Discussion with Hiring VP.
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-semibold">Step 3:</strong> Final Offer & Immediate Onboarding.
                </div>
              </div>
            </div>

            {/* Security / Clearance details */}
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 font-mono">
              <span className="text-slate-400">Security Requirement: </span>
              <span className="text-cyan-300">{job.securityClearance || 'Standard Enterprise Background Check'}</span>
            </div>
          </div>

          {/* Back Footer Actions */}
          <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(job);
              }}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              View Full Spec
            </button>

            <Button
              variant="glow"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onQuickApply(job);
              }}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Quick Apply
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default JobCard;
