import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, Zap, Clock, ShieldCheck, CheckCircle2, Sparkles, Calendar, Layers } from 'lucide-react';
import { FlipCard3D } from '../ui/flip-card-3d';
import { Badge } from '../common/Badge';

export const HiringEstimator: React.FC = () => {
  const [engineersCount, setEngineersCount] = useState<number>(2);
  const [model, setModel] = useState<'contract' | 'c2h' | 'direct' | 'managed'>('contract');
  const [domain, setDomain] = useState<string>('Cloud & DevOps');

  // Dynamic calculations based on state
  const timeToShortlist =
    model === 'contract'
      ? '48 - 72 Hours'
      : model === 'c2h'
      ? '3 - 5 Days'
      : model === 'managed'
      ? '1 - 2 Weeks'
      : '5 - 7 Days';

  const trialGuarantee =
    model === 'contract'
      ? '14-Day Zero-Risk Trial'
      : model === 'c2h'
      ? '3-6 Mo Evaluation'
      : model === 'managed'
      ? 'Sprint Milestone Guarantee'
      : '90-Day Replacement Guarantee';

  const estimatedSavings =
    model === 'contract'
      ? 'Up to 35% vs FTE overhead'
      : model === 'c2h'
      ? 'Zero early severance liability'
      : model === 'managed'
      ? '50% faster delivery cycle'
      : 'Permanent core IP retention';

  const modelLabel =
    model === 'contract'
      ? 'Contract Augmentation'
      : model === 'c2h'
      ? 'Contract-to-Hire'
      : model === 'managed'
      ? 'Dedicated Pod'
      : 'Direct Placement';

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Interactive Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
                <Calculator className="w-3.5 h-3.5" />
                <span>HIRING VELOCITY CALCULATOR</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Estimate Ramp-Up Time & Model Fit
              </h3>

              <div className="space-y-5 pt-2">
                {/* 1. Engineering Domain */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    1. Select Tech Domain
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Cloud & DevOps', 'AI / ML & MLOps', 'Full-Stack & Backend', 'Cybersecurity', 'Data Engineering'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDomain(d)}
                        className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all cursor-pointer ${
                          domain === d
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-sm'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Engagement Model */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    2. Engagement Model
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'contract', label: 'Contract' },
                      { id: 'c2h', label: 'Contract-to-Hire' },
                      { id: 'direct', label: 'Direct Placement' },
                      { id: 'managed', label: 'Managed Pod' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setModel(m.id as any)}
                        className={`px-3 py-2 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                          model === m.id
                            ? 'bg-blue-600/30 border-blue-400 text-blue-300 font-semibold'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Number of Engineers Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>3. Team Scale / Number of Engineers</span>
                    <span className="text-cyan-400 font-bold text-sm">
                      {engineersCount} Engineer{engineersCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={engineersCount}
                    onChange={(e) => setEngineersCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>1 (Solo Specialist)</span>
                    <span>5 (Mid Pod)</span>
                    <span>10+ (Enterprise Squad)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive 3D Flip Card Match Summary (5 cols) */}
            <div className="lg:col-span-5">
              <FlipCard3D
                height="min-h-[420px] h-[420px]"
                frontClassName="!bg-slate-900/95 !border-cyan-500/40 text-white"
                hintText="Flip for onboarding roadmap"
                front={
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      {/* Header with Instant Estimate Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="cyan" size="xs" dot>
                          INSTANT ESTIMATE
                        </Badge>
                        <span className="text-[10px] font-mono text-cyan-400">
                          {modelLabel}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-white mb-4">
                        Match Summary: <span className="text-cyan-400">{domain}</span> ({engineersCount}x)
                      </h4>

                      <div className="space-y-3.5 text-xs sm:text-sm">
                        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                          <span className="text-slate-400 flex items-center gap-2 text-xs">
                            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                            Shortlist SLA:
                          </span>
                          <span className="font-mono font-bold text-cyan-300 text-xs sm:text-sm">
                            {timeToShortlist}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                          <span className="text-slate-400 flex items-center gap-2 text-xs">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            Guarantee:
                          </span>
                          <span className="font-semibold text-emerald-400 text-right text-xs">
                            {trialGuarantee}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                          <span className="text-slate-400 flex items-center gap-2 text-xs">
                            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                            Efficiency:
                          </span>
                          <span className="font-medium text-slate-200 text-right text-xs">
                            {estimatedSavings}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3">
                      <Link
                        to={`/hire-talent?domain=${encodeURIComponent(domain)}&model=${model}&count=${engineersCount}`}
                        className="block w-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Request {engineersCount} Vetted Specialist{engineersCount > 1 ? 's' : ''}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                      <p className="text-[10px] text-center text-slate-400 mt-1.5">
                        Zero commitment • 14-day risk-free trial
                      </p>
                    </div>
                  </div>
                }
                back={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div>
                      {/* Back Header */}
                      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
                        <div>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                            RAPID DEPLOYMENT ROADMAP
                          </span>
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                            How We Deliver in 48 Hours
                          </h4>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          TOP 3% BENCH
                        </span>
                      </div>

                      {/* 3 Step Process */}
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border border-cyan-500/30 mt-0.5">
                            1
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">Discovery Call (24h)</span>
                            <span className="text-[11px] text-slate-400">Architect audit of your tech stack, sprint goals, and team dynamics.</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border border-cyan-500/30 mt-0.5">
                            2
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">Pre-Vetted Profiles (48h)</span>
                            <span className="text-[11px] text-slate-400">Receive 2–3 senior candidates with code audit scores and architecture history.</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
                            3
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">14-Day Trial Sprint</span>
                            <span className="text-[11px] text-slate-400">Engineer deploys on live codebase. 100% satisfaction or zero billing.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back Action */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <Link
                        to="/contact"
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Technical Discovery</span>
                      </Link>
                      <span className="text-[10px] font-mono text-slate-500">Zero Risk</span>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiringEstimator;
