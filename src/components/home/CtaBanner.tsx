import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { StarButton } from '../ui/star-button';
import { ShimmerText } from '../ui/shimmer-text';
import { FlipCard3D } from '../ui/flip-card-3d';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Calendar,
  CheckCircle2,
  Sparkles,
  Layers,
  Clock
} from 'lucide-react';

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FlipCard3D
          height="min-h-[460px] h-[460px]"
          frontClassName="!bg-gradient-to-b !from-slate-900 !via-slate-950 !to-[#060b13] !border-cyan-500/30 text-white"
          backClassName="!bg-gradient-to-b !from-slate-950 !via-slate-900 !to-[#040810] !border-cyan-400/40 text-white"
          hintText="Flip for 3-step deployment roadmap"
          front={
            <div className="flex flex-col justify-between h-full relative">
              {/* Subtle Ambient Background */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5 my-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono backdrop-blur-md">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold tracking-wider">SCALE YOUR TECH CAPACITY</span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Ready to Accelerate Your <br />
                  <ShimmerText variant="electric" className="inline-block mt-1">
                    Engineering Roadmap?
                  </ShimmerText>
                </h2>

                <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Deploy verified senior engineers or dedicated agile pods in 48–72 hours with a 14-day zero-risk trial.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <Link
                    to="/hire-talent"
                    className="w-full sm:w-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <StarButton
                      duration={3.5}
                      lightColor="#38bdf8"
                      backgroundColor="#080C14"
                      className="h-11 sm:h-12 px-7 rounded-full font-semibold cursor-pointer shadow-lg shadow-cyan-500/20 text-white w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        Request Talent Now <ArrowRight className="w-4 h-4 text-cyan-400" />
                      </span>
                    </StarButton>
                  </Link>
                  <Link
                    to="/jobs"
                    className="w-full sm:w-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full sm:w-auto h-11 sm:h-12 px-6 rounded-full border-slate-700 bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-800 shadow-sm text-xs sm:text-sm"
                      rightIcon={<Users className="w-4 h-4 text-cyan-400" />}
                    >
                      Explore Tech Roles
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Quick Guarantees Trust Badges */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-400 font-mono relative z-10">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>48-72h Shortlist SLA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>14-Day Zero-Risk Trial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Strict 5-Stage Vetting</span>
                </div>
              </div>
            </div>
          }
          back={
            <div className="flex flex-col justify-between h-full relative text-left">
              {/* Subtle ambient glow */}
              <div className="absolute top-0 left-1/3 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

              <div>
                {/* Back Header */}
                <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800 relative z-10">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-semibold">
                      RAPID ENGAGEMENT PROCESS • ZERO RISK
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2 mt-0.5">
                      How Zangle Deploys Top 3% Tech Talent
                    </h3>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Guaranteed SLA
                  </span>
                </div>

                {/* 3 Step Deployment Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 my-2">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center border border-cyan-500/40">
                        1
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-white">Discovery & Scope (24h)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Technical architect review of your exact codebase, tech stack, and deliverable sprint milestones.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold flex items-center justify-center border border-blue-500/40">
                        2
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-white">Curated Profiles (48h)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Receive 2–3 pre-screened senior engineers with live code audit scores, system design history, and references.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center border border-emerald-500/40">
                        3
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-white">14-Day Trial Sprint</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Engineer deploys directly onto your team. If you are not 100% satisfied during the trial, you pay nothing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back Footer Action */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Start with 0 financial commitment</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/contact"
                    className="px-5 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-1.5 shadow-md shadow-cyan-500/25"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Discovery Call</span>
                  </Link>
                  <Link
                    to="/hire-talent"
                    className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors inline-flex items-center gap-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Request Custom Pod</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </Link>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default CtaBanner;
