import React from 'react';
import { Link } from 'react-router-dom';
import { TalentProfile } from '../../types';
import { FlipCard3D } from '../ui/flip-card-3d';
import {
  MapPin,
  Clock,
  DollarSign,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Layers
} from 'lucide-react';

interface TalentCardProps {
  talent: TalentProfile;
  onRequestProfile?: (talent: TalentProfile) => void;
}

export const TalentCard: React.FC<TalentCardProps> = ({ talent, onRequestProfile }) => {
  return (
    <FlipCard3D
      height="min-h-[390px] h-[390px]"
      front={
        <div className="flex flex-col justify-between h-full">
          <div>
            {/* Top Code & Availability status */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {talent.benchCode}
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  • {talent.yearsOfExperience}+ Yrs
                </span>
              </div>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {talent.availability}
              </span>
            </div>

            {/* Title & Domain */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-0.5 line-clamp-1">
              {talent.title}
            </h3>

            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
              {talent.domain}
            </div>

            {/* Quick Rate & Location */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-600 dark:text-slate-300 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-3.5 h-3.5" />
                <span>{talent.rateGuide}</span>
              </div>
              <div className="flex items-center gap-1 truncate text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{talent.location}</span>
              </div>
            </div>

            {/* Bio Summary */}
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed line-clamp-2">
              {talent.bioSummary}
            </p>

            {/* Top Skills */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1 font-semibold">
                Verified Stack:
              </span>
              <div className="flex flex-wrap gap-1">
                {talent.topSkills.slice(0, 5).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Audit Passed</span>
            </div>

            <span className="text-cyan-600 dark:text-cyan-400 font-semibold inline-flex items-center gap-1 text-xs">
              Flip for milestones <ArrowRight className="w-3 h-3" />
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
                  ENGINEER SNAPSHOT • {talent.benchCode}
                </span>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {talent.title}
                </h4>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 whitespace-nowrap">
                98.8% Audit
              </span>
            </div>

            {/* Key Scale Milestones / Recent Projects */}
            <div className="mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> Career Milestones & Scale:
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {talent.recentProjects.slice(0, 3).map((proj, i) => (
                  <li key={i} className="flex items-start gap-1.5 leading-tight">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications & Models */}
            {talent.certifications.length > 0 && (
              <div className="mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                  <Award className="w-3 h-3 text-indigo-400" /> Certifications:
                </span>
                <p className="text-[11px] text-slate-300 font-mono truncate">
                  {talent.certifications.join(' • ')}
                </p>
              </div>
            )}
          </div>

          {/* Back Action */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <Link
              to={`/hire-talent?profile=${talent.benchCode}&role=${encodeURIComponent(talent.title)}`}
              className="px-3.5 py-1 text-xs font-semibold rounded-full bg-cyan-500 hover:bg-cyan-400 text-white transition-colors inline-flex items-center gap-1.5 shadow-sm shadow-cyan-500/30"
              onClick={(e) => {
                e.stopPropagation();
                onRequestProfile?.(talent);
              }}
            >
              <Sparkles className="w-3 h-3" /> Request Profile (14d Trial)
            </Link>

            <span className="text-[10px] font-mono text-slate-500">
              {talent.preferredModels.join(' / ')}
            </span>
          </div>
        </div>
      }
    />
  );
};

export default TalentCard;
