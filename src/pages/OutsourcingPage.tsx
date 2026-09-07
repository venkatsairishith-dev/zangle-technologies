import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Users,
  ShieldCheck,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Clock,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Terminal,
  Zap,
  TrendingUp,
  LineChart,
  Boxes
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const OutsourcingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: '45%', label: 'Average operational cost reduction' },
    { value: '2-3 wks', label: 'Average dedicated pod ramp-up' },
    { value: '98.6%', label: 'Sprint milestone completion rate' },
    { value: '100%', label: 'IP & Code ownership retained by client' }
  ];

  const outsourcingModels = [
    {
      id: '01',
      title: 'Dedicated Managed Teams',
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      desc: 'Cross-functional pods with tech leads, senior engineers, QA automation, and agile delivery managers.'
    },
    {
      id: '02',
      title: 'Staff Augmentation',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      desc: 'Pre-screened senior engineers who integrate directly into your internal teams and workflows.'
    },
    {
      id: '03',
      title: 'Project Outsourcing',
      icon: <Boxes className="w-5 h-5 text-emerald-400" />,
      desc: 'Milestone-based project execution owned end-to-end from architecture to production deployment.'
    },
    {
      id: '04',
      title: 'Dedicated Engineering Pods',
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      desc: 'Long-term product development squads that scale dynamically with your feature roadmap.'
    },
    {
      id: '05',
      title: 'Tier 2 & 3 Engineering Support',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      desc: '24/7 site reliability, on-call monitoring, bug triage, and continuous patch management with defined SLAs.'
    },
    {
      id: '06',
      title: 'Managed Cloud & Data Services',
      icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
      desc: 'Managed cloud infrastructure, CI/CD pipelines, data operations, and FinOps cost optimization.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Scope & Governance',
      desc: 'Define sprint milestones, architecture expectations, security standards, and SLA benchmarks.'
    },
    {
      num: '02',
      title: 'Build the Team',
      desc: 'Curate a dedicated squad with exact technical stack experience and timezone alignment.'
    },
    {
      num: '03',
      title: 'Onboard & Connect',
      desc: 'Standardized access to Jira, GitHub, Slack, and cloud staging environments.'
    },
    {
      num: '04',
      title: 'Deliver & Report',
      desc: 'Bi-weekly sprint demos, shared code reviews, automated CI/CD, and real-time burndown tracking.'
    },
    {
      num: '05',
      title: 'Scale on Demand',
      desc: 'Expand squad capacity or adjust skill mix as milestones evolve with flexible 30-day terms.'
    }
  ];

  const toolsAndFrameworks = [
    'Dedicated Teams', 'Time & Materials', 'Fixed-Scope SOW', 'GCC Framework',
    'Jira', 'Slack', 'GitHub', 'Confluence', 'Datadog', 'AWS', 'Azure',
    'Kubernetes', 'Docker', 'Terraform', 'PostgreSQL', 'ArgoCD'
  ];

  const faqs = [
    {
      q: 'How does Zangle maintain code quality in outsourced teams?',
      a: 'Engineers adhere to your PR review guidelines, automated CI/CD checks, and branch policies with regular lead audits.'
    },
    {
      q: 'Who owns the intellectual property (IP) developed by the outsourced team?',
      a: 'You retain 100% ownership of all source code, architecture designs, data models, and assets from day one.'
    },
    {
      q: 'How do timezone differences and team communication work?',
      a: 'We provide overlapping core business hours for daily standups, live sprint planning, and synchronous Slack communication.'
    },
    {
      q: 'What is the ramp-up time for a dedicated engineering pod?',
      a: 'Dedicated pods are typically vetted, matched, and onboarded into your development pipeline within 2 to 3 weeks.'
    }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-500">Home</Link>
            <span className="mx-2">/</span>
            <span>Staffing</span>
            <span className="mx-2">/</span>
            <span className="text-slate-800 dark:text-slate-200">Outsourcing</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>Service · Outsourcing</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Outsourcing with control,{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                not compromise.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Extend capacity with dedicated teams and managed services that bring governance, reporting, and accountability into every outsourced workflow.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/hire-talent">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore models
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg">
                  All services
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dark Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#111315] border border-slate-800 p-8 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <Badge variant="cyan" size="xs">
              OVERVIEW
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Scale your capacity, not your overhead.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Traditional outsourcing fails when transparency is lost and work is hidden behind opaque black boxes. We design dedicated engineering pods that integrate directly into your sprint boards, code repositories, and communication channels with clear SLAs.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Dedicated engineering squads integrated into your Jira and sprint cycles',
                'Transparent SLA tracking, velocity reporting, and shared retrospectives',
                'Direct communication in Slack and real-time pull request reviews',
                'Flexible engagement models: T&M, fixed-scope, or dedicated managed pods'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Engineered for Full Visibility
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                You receive weekly velocity metrics, commit analytics, and burn-down reporting. Our technical project leads ensure standard operational procedures and prompt delivery across all sprints.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">100%</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Direct Git Access</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Daily</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Synchronous Standups</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 OUTSOURCING MODELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            DELIVERY MODELS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Choose the outsourcing framework that fits your goals.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outsourcingModels.map((m, _i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(_i, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {m.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{m.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
                {m.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5-STEP OUTSOURCING PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            METHODOLOGY
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How outsourcing with Zangle works.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, _i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(_i, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-cyan-500/20">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OUTCOMES DARK CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#111315] border border-slate-800 p-8 sm:p-12 text-white shadow-2xl space-y-8">
          <div className="max-w-2xl">
            <Badge variant="cyan" size="xs" className="mb-3">
              MEASURABLE OUTCOMES
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Engineered for velocity, cost optimization and retained quality.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-cyan-400">Faster</div>
              <h4 className="text-sm font-semibold text-white">Scale-up Velocity</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deploy full pods in 2-3 weeks without lengthy recruitment cycles or domestic HR overhead.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-2xl font-bold text-emerald-400">Lower</div>
              <h4 className="text-sm font-semibold text-white">Cost to Serve</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reduce total software development cost by 40-50% while sustaining tier-1 engineering rigor.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-2xl font-bold text-indigo-400">Retained</div>
              <h4 className="text-sm font-semibold text-white">Quality & Ownership</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                All source code, architectural documentation, and tests belong to your company from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTSOURCING FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Outsourcing FAQ
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-cyan-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            ELEVATE DELIVERY
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Scale your delivery without the friction.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Talk to an outsourcing architect today to design a dedicated engineering team matched to your exact roadmap requirements.
          </p>
          <div className="pt-2">
            <Link to="/hire-talent">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Build Your Dedicated Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
