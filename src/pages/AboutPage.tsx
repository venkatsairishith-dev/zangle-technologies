import { motion } from 'framer-motion';
import { Reveal } from '../components/common/Reveal';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Compass,
  Globe,
  ShieldCheck,
  Shield,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Lock,
  Zap,
  Building2,
  Cpu
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { FlipCard3D } from '../components/ui/flip-card-3d';

export const AboutPage: React.FC = () => {
  // Three Pillars (What We Do)
  const pillars = [
    {
      id: '01',
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      title: 'IT Staffing',
      description:
        'Vetted technologists placed fast — contract, contract-to-hire and direct — matched to the role and the team.',
      metric: '< 48h Shortlists',
      backTitle: 'STAFFING METRICS & TERMS',
      backPoints: [
        'Contract, Contract-to-Hire & Direct Placement',
        'Top 3% technical vetting audit by senior practice leads',
        '14-day zero-risk trial period on all contract hires',
        '90-day direct replacement warranty'
      ]
    },
    {
      id: '02',
      icon: <Compass className="w-6 h-6 text-emerald-400" />,
      title: 'Statement of Work Consulting',
      description:
        'Scoped, outcome-driven engagements where Zangle owns the deliverable, the milestones and the result.',
      metric: 'Outcome Ownership',
      backTitle: 'SOW GOVERNANCE',
      backPoints: [
        'Fixed-deliverable & milestone-based contracts',
        'End-to-end architecture accountability & KPIs',
        '100% intellectual property & code ownership transfer',
        'Transparent bi-weekly sprint telemetry & reporting'
      ]
    },
    {
      id: '03',
      icon: <Globe className="w-6 h-6 text-indigo-400" />,
      title: 'Dedicated Engineering Team',
      description:
        'Focused engineering support shaped around the requirement, skill profile and team context.',
      metric: 'Embedded Pods',
      backTitle: 'POD INTEGRATION',
      backPoints: [
        'Native Slack, Jira, and GitHub workflow integration',
        'Timezone aligned to US EST / CST / PST working hours',
        '98.4% milestone completion & retention benchmark',
        'Continuous practice lead oversight & code audits'
      ]
    }
  ];

  // Four Principles (What We Hold Ourselves To)
  const principles = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: 'Accountability',
      description:
        'We own the outcome, not just the deliverable — from the first conversation to steady-state.',
      metric: 'Outcome-First',
      backPoints: [
        'Full lifecycle commitment from intake to onboarding',
        'Direct practice lead accountability on every placement',
        'Transparent feedback loops with client hiring managers'
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: 'Rigor',
      description:
        'Security, compliance and governance are defaults in every engagement and every technologist we place.',
      metric: 'Enterprise Rigor',
      backPoints: [
        'Strict background verification and NDA enforcement',
        'SOC2, HIPAA, and ISO 27001 compliance readiness',
        'Algorithmic & system architecture vetting standards'
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-400" />,
      title: 'People first',
      description:
        'Behind every placement is a career and a business. We treat both with the seriousness they deserve.',
      metric: 'Talent Centric',
      backPoints: [
        'Transparent compensation and zero hidden recruiter markups',
        'Continuous career advisory for placed consultants',
        'Long-term client partnerships built on trust'
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      title: 'Momentum',
      description:
        'We optimise for speed-to-value — mobilising talent in days, not the months our peers take.',
      metric: 'Speed-to-Value',
      backPoints: [
        'Curated bench of active, pre-vetted engineers',
        'Candidate shortlist submission within 48 to 72 hours',
        'Same-day technical interview scheduling'
      ]
    }
  ];

  return (
    <div className="py-6 sm:py-10 space-y-20">
      {/* =========================================================================
          SECTION 1: HERO HEADER
          "A clear staffing partner for modern engineering teams."
         ========================================================================= */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-500">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800 dark:text-slate-200">About</span>
          </div>

          <div className="max-w-4xl space-y-6">
            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              A clear staffing partner for modern{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                engineering teams.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Zangle Technologies is a privately held staffing and recruiting company connecting
              enterprises with skilled engineering talent.
            </motion.p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OUR STORY (SPLIT WITH ARCHITECTURE DIAGRAM)
          "A partner that staffs and delivers."
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left / Top Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold">
              <span>OUR STORY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              A partner that staffs and delivers.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Zangle focuses on a simple but important problem: helping organizations clarify
                their business and technical requirements, then connect with skilled engineers who
                can contribute with the right tools, platforms and modern software practices.
              </p>
              <p>
                Zangle is a privately held staffing and recruiting company focused on connecting
                organizations with skilled engineers who can contribute from day one.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/contact">
                <Button variant="glow" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Connect with practice leads
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="md">
                  Explore delivery models
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Modern Delivery & Architecture Diagram Component */}
          <div className="lg:col-span-6">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
              {/* Background ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Interactive Visual Graphic representing Advise -> Staff -> Deliver */}
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-400">
                  <span className="text-cyan-500 font-bold uppercase tracking-wider">
                    OPERATIONAL ENGAGEMENT CYCLE
                  </span>
                  <span>Zangle Engine</span>
                </div>

                {/* Nodes & Cards Layout */}
                <div className="relative py-6 flex flex-col items-center justify-center gap-6">
                  {/* Dotted Connecting Line */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-[2px] border-t-2 border-dashed border-cyan-500/30" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 w-full relative z-10">
                    {/* Node 1: ADVISE */}
                    <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 text-center shadow-lg transform transition-transform hover:-translate-y-1">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 mx-auto mb-2 animate-ping" />
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                        PHASE 01
                      </span>
                      <h4 className="text-sm font-extrabold text-white mt-1">ADVISE</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Clarify Stack & SLAs</p>
                    </div>

                    {/* Node 2: STAFF */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white border border-cyan-400/40 text-center shadow-xl transform transition-transform hover:-translate-y-1 scale-105">
                      <div className="w-3 h-3 rounded-full bg-white mx-auto mb-2" />
                      <span className="text-[10px] font-mono text-cyan-100 uppercase tracking-wider block font-bold">
                        PHASE 02
                      </span>
                      <h4 className="text-sm font-extrabold text-white mt-1">STAFF</h4>
                      <p className="text-[10px] text-cyan-100 mt-1">Top 3% Vetted Talent</p>
                    </div>

                    {/* Node 3: DELIVER */}
                    <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 text-center shadow-lg transform transition-transform hover:-translate-y-1">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 mx-auto mb-2" />
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                        PHASE 03
                      </span>
                      <h4 className="text-sm font-extrabold text-white mt-1">DELIVER</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Zero-Downtime Output</p>
                    </div>
                  </div>
                </div>

                {/* Sub-card feature list */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Direct Senior Practice Oversight</span>
                  </div>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">14-Day Trial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHAT WE DO (THREE PILLARS, ONE ACCOUNTABLE PARTNER)
         ========================================================================= */}
      <section className="py-12 bg-slate-50/50 dark:bg-zangle-dark/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="WHAT WE DO"
            badgeVariant="cyan"
            title="Three pillars, one accountable"
            gradientText="partner."
            subtitle="Flexible, high-impact engagement models structured to meet you wherever you are on your engineering journey. Flip any card for specifications."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <Reveal key={pillar.id} delay={Math.min(idx, 6) * 0.06} className="h-full">
                <FlipCard3D
                  key={idx}
                  height="min-h-[380px] h-[380px]"
                  hintText="Flip for model specifications"
                  front={
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            {pillar.icon}
                          </div>
                          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                            {pillar.metric}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          {pillar.title}
                        </h3>

                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-cyan-600 dark:text-cyan-400">
                        <span className="text-[11px] font-mono">Pillar {pillar.id}</span>
                        <span className="flex items-center gap-1 font-semibold">
                          Flip card <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  }
                  back={
                    <div className="flex flex-col justify-between h-full text-left">
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                            {pillar.backTitle}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            {pillar.metric}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-white mb-2">{pillar.title}</h4>

                        <div className="space-y-2 my-3">
                          {pillar.backPoints.map((pt, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-cyan-400" />
                        Enterprise Master Services Agreement Standard
                      </div>
                    </div>
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: WHAT WE STAND FOR (WHAT WE HOLD OURSELVES TO)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="WHAT WE STAND FOR"
          badgeVariant="emerald"
          title="What we hold"
          gradientText="ourselves to."
          subtitle="Built on deep technical rigor, transparent communication, and respect for talent and clients alike."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((pr, idx) => (
            <Reveal key={idx} delay={Math.min(idx, 6) * 0.06} className="h-full">
              <FlipCard3D
                key={idx}
                height="min-h-[340px] h-[340px]"
                hintText="Flip for standard proof"
                front={
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                          {pr.icon}
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                          {pr.metric}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {pr.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {pr.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-cyan-600 dark:text-cyan-400">
                      <span className="text-[11px] font-mono">Core Value</span>
                      <span className="flex items-center gap-1 font-semibold">
                        Flip <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                }
                back={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                          PRACTICE BENCHMARK
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          {pr.metric}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white mb-2">{pr.title}</h4>

                      <div className="space-y-2 my-2">
                        {pr.backPoints.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-cyan-400" />
                      Enforced across all engagements
                    </div>
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: MIDDLE TRUST STATEMENT
          "Trusted for quality talent delivery — security, compliance and governance..."
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 leading-snug">
          Trusted for quality talent delivery — security, compliance and governance built into every
          engagement.
        </h3>

        <div>
          <Link to="/contact">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-6 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700 hover:border-cyan-500"
              rightIcon={<ArrowRight className="w-4 h-4 text-cyan-500" />}
            >
              Meet the team
            </Button>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: BOTTOM DARK CTA BANNER
          "Talent. Delivered. Built around your needs."
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#0a2324] to-slate-950 border border-slate-800 p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Talent. Delivered. Built around your needs.
            </h2>
            <p className="text-sm text-slate-300">
              Explore our comprehensive staffing, consulting, and engineering services.
            </p>
          </div>

          <div className="shrink-0">
            <Link to="/services">
              <button
                type="button"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <span>View services</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
