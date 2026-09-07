import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Terminal,
  FileCheck2,
  Compass,
  LineChart
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ITConsultingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: 'Weeks', label: 'To a costed, defensible roadmap — not months of analysis before anyone can act' },
    { value: '1 team', label: 'Advisory and delivery under one accountability line, with no handoff between plan and build' },
    { value: 'Measurable', label: 'ROI tracked against the business case set on day one — value in production, not just velocity' }
  ];

  const capabilities = [
    {
      id: '01',
      title: 'Digital strategy & roadmaps',
      icon: <Compass className="w-5 h-5 text-amber-400" />,
      desc: 'We translate business goals into a sequenced, costed plan — capability gaps, investment cases and a quarter-by-quarter path you can fund and defend.'
    },
    {
      id: '02',
      title: 'Application modernization',
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      desc: 'Legacy systems re-platformed, re-factored or rebuilt — incrementally, with the lights kept on. We retire risk and technical debt without a big-bang cutover.'
    },
    {
      id: '03',
      title: 'Cloud & platform strategy',
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      desc: 'Landing zones, migration patterns and cost-aware architecture across AWS, Azure and Google Cloud — built for security, resilience and FinOps from day one.'
    },
    {
      id: '04',
      title: 'Enterprise architecture',
      icon: <FileCheck2 className="w-5 h-5 text-indigo-400" />,
      desc: 'Target operating models, integration patterns and a reference architecture your teams can build against — standards that simplify rather than slow delivery.'
    },
    {
      id: '05',
      title: 'Program & delivery management',
      icon: <Briefcase className="w-5 h-5 text-emerald-400" />,
      desc: 'Lightweight governance that keeps complex, multi-team work moving — clear ownership, transparent reporting and the cadence to surface risk early.'
    },
    {
      id: '06',
      title: 'Change management & adoption',
      icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
      desc: 'New platforms only pay back when people use them. We plan the rollout, enablement and operating-model shifts that make adoption stick.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Diagnose',
      desc: 'Assess the current estate, constraints and goals to find the real bottlenecks — not the assumed ones.'
    },
    {
      num: '02',
      title: 'Roadmap',
      desc: 'Sequence the work into a costed, fundable plan with clear priorities and a business case behind each move.'
    },
    {
      num: '03',
      title: 'Design',
      desc: 'Define the architecture, integration approach and delivery model the build will run on.'
    },
    {
      num: '04',
      title: 'Deliver',
      desc: 'Stand up the squads and ship in increments — value in production early, then iterated.'
    },
    {
      num: '05',
      title: 'Sustain',
      desc: 'Hand over with the practices, runbooks and skills for your team to own and evolve it.'
    }
  ];

  const techStack = [
    'TOGAF', 'Agile', 'Scrum', 'SAFe', 'AWS', 'Azure',
    'Google Cloud', 'Microservices', 'DevOps', 'ITIL', 'Lean'
  ];

  const faqs = [
    {
      q: 'Do you only advise, or do you deliver too?',
      a: 'Both — and that is the point. The team that frames the strategy is the team accountable for shipping it. You can engage us for advisory alone, but most clients want the same group to carry the roadmap through to running software.'
    },
    {
      q: 'How do you measure ROI on a transformation?',
      a: 'We set the business case up front — the metrics, baselines and targets the investment is meant to move — then track delivery against them release by release. ROI is judged on value in production, not story points burned.'
    },
    {
      q: 'What engagement models do you offer?',
      a: 'Fixed-scope advisory, time-and-materials delivery squads, and outcome-based programmes with shared milestones. We recommend the model that fits the risk profile and how clearly the scope is defined.'
    },
    {
      q: 'Can you augment our existing team?',
      a: 'Yes. We frequently embed architects, delivery leads and engineers alongside in-house staff — adding capability and pace without displacing the people who will own the platform long term.'
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
            <Link to="/services" className="hover:text-cyan-500">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800 dark:text-slate-200">IT Consulting</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Service · IT Consulting</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              IT consulting that moves{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-400 bg-clip-text text-transparent">
                from roadmap to release.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Shape strategy, modernize applications and deliver platforms with one team accountable for both the plan and the working system.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  View services
                </Button>
              </Link>
              <Link to="/hire-talent">
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
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
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
              Strategy that ships.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Most transformations don’t fail in the boardroom — they stall in the gap between strategy and execution. A deck sets the ambition, then ownership fragments across vendors and quarterly reprioritization, and the costed roadmap quietly becomes shelfware. Zangle closes that gap by advising and delivering: the same accountable team that frames the business case writes the architecture, stands up the squads and ships the increments.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Pragmatic strategy and modernization roadmaps',
                'Architecture and delivery, not slideware',
                'The technologists to execute, on one accountable team'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Representative engagement
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      Mid-market insurer
                    </span>
                  </div>
                </div>
                <Badge variant="amber" size="xs">
                  OBJECTIVE
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">Weeks</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">To a costed, defensible roadmap</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">1 team</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Advisory and delivery on one accountability line</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            WHAT WE DELIVER
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Capabilities, end to end.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c, _i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(_i, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-amber-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {c.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{c.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">
                {c.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5-STEP METHODOLOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            HOW WE DELIVER
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Our engagement model.
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
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-amber-500/20">
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

      {/* TECH STACK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div>
            <Badge variant="cyan" size="xs" className="mb-2">
              HOW WE WORK
            </Badge>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Frameworks and platforms we build with.
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 text-xs font-mono rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            IT consulting FAQ
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
                    <ChevronUp className="w-5 h-5 text-amber-500 shrink-0" />
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

      {/* BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            IT CONSULTING
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Let’s turn your roadmap into results.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Strategy, modernization and delivery under one accountable team — so the plan and the working system stay aligned.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                View services
              </Button>
            </Link>
            <Link to="/hire-talent">
              <Button variant="outline" size="lg">
                Hire specialists
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
