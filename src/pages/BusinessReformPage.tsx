import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Boxes,
  Layers,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  ShieldCheck,
  Workflow,
  RefreshCw,
  Zap,
  LineChart
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const BusinessReformPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: 'Lower', label: 'Operating cost — fewer manual steps, less rework and tighter processes reduce the cost of day-to-day operations' },
    { value: 'Faster', label: 'Cycle times — streamlined, automated flows shorten the time from request to done' },
    { value: 'Less', label: 'Manual effort — automation absorbs the repetitive load, returning hours for higher-value work' }
  ];

  const capabilities = [
    {
      id: '01',
      title: 'Process assessment',
      icon: <LineChart className="w-5 h-5 text-teal-400" />,
      desc: 'We map how work really moves — interviews, observation and data — to surface bottlenecks, rework loops and the constraints that quietly cap your throughput.'
    },
    {
      id: '02',
      title: 'Workflow optimization',
      icon: <Workflow className="w-5 h-5 text-cyan-400" />,
      desc: 'We redesign end-to-end flows around outcomes — removing handoffs, clarifying ownership and standardizing steps so work moves with fewer touches and less waiting.'
    },
    {
      id: '03',
      title: 'Automation & RPA',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      desc: 'We automate repetitive, rules-based tasks with software bots and integrations — cutting manual data entry, reconciliation and copy-paste work that ties up skilled people.'
    },
    {
      id: '04',
      title: 'Digital transformation',
      icon: <Boxes className="w-5 h-5 text-blue-400" />,
      desc: 'We replace spreadsheets, email chains and legacy tools with connected digital workflows — giving teams a single, reliable place to do and track their work.'
    },
    {
      id: '05',
      title: 'Change management',
      icon: <TrendingUp className="w-5 h-5 text-indigo-400" />,
      desc: 'We bring people with us — communication, training and visible quick wins — so new processes are understood, trusted and used rather than quietly bypassed.'
    },
    {
      id: '06',
      title: 'Continuous improvement',
      icon: <RefreshCw className="w-5 h-5 text-purple-400" />,
      desc: 'We instrument the new way of working, review the metrics that matter and tune over time — so reform becomes a habit, not a one-off project.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Assess',
      desc: 'Map current processes, costs and pain points to find where the real friction lives.'
    },
    {
      num: '02',
      title: 'Reimagine',
      desc: 'Redesign the workflow around outcomes, not the way things have always been done.'
    },
    {
      num: '03',
      title: 'Automate',
      desc: 'Build the automations and integrations that take manual, repetitive work off people’s plates.'
    },
    {
      num: '04',
      title: 'Embed',
      desc: 'Train teams, update roles and reinforce new habits so the change becomes the default.'
    },
    {
      num: '05',
      title: 'Measure',
      desc: 'Track cost, cycle time and quality against the baseline to prove and protect the gains.'
    }
  ];

  const techStack = [
    'BPMN', 'Lean', 'Six Sigma', 'UiPath',
    'Power Automate', 'Microsoft Power Platform', 'Agile'
  ];

  const faqs = [
    {
      q: 'What exactly is business reform?',
      a: 'It is the disciplined redesign of how work gets done — combining process improvement, automation and change management. Rather than tweaking one tool, we look at the whole flow of a process and rebuild it around clear outcomes, then make the new way the default.'
    },
    {
      q: 'Which automation tools do you use?',
      a: 'We work with established platforms such as UiPath, Microsoft Power Automate and the wider Power Platform, alongside method frameworks like BPMN, Lean and Six Sigma. We are tool-agnostic — the right choice depends on your existing systems, scale and team.'
    },
    {
      q: 'How do you manage change and adoption?',
      a: 'We involve the people who do the work from the start, communicate the reasoning, deliver visible quick wins, and pair every process change with training and support. Adoption is treated as a deliverable, not an afterthought.'
    },
    {
      q: 'How do you measure ROI?',
      a: 'We capture a baseline up front — cost, cycle time, error rates and effort — then track the same measures after reform. That lets us quantify savings and improvement against where you started, and keep tuning where the numbers say there is more to gain.'
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
            <span className="text-slate-800 dark:text-slate-200">Business Reform</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span>Service · Business Reform</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Business reform{' '}
              <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
                that keeps moving.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Redesign processes, systems and operating rhythms so change is practical, adopted and measurable, with technology and people aligned from the start.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Compare plans
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
                <div className="text-3xl sm:text-4xl font-extrabold text-teal-400 font-mono">
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
              Reform the way work gets done.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Most organizations do not lose ground to competitors — they lose it to their own processes. Manual handoffs, disconnected systems and workarounds that grew over years quietly drain hours, inflate cost and frustrate the people doing the work. We assess how work actually flows, reimagine it around clear outcomes, automate the steps that should never have been manual, and embed new habits so the gains hold long after the project ends.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Process assessment and redesign',
                'Automation that removes manual toil',
                'Change management that makes it stick'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Representative engagement
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      Back-office operation
                    </span>
                  </div>
                </div>
                <Badge variant="emerald" size="xs">
                  ZERO DOWNTIME
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-teal-600 dark:text-teal-400">Lower</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Operating cost, from fewer manual steps and less rework</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">Faster</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Cycle times, from streamlined and automated flows</div>
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
            Capabilities that turn intent into operating change.
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
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-teal-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {c.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{c.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-500 transition-colors">
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
            Our reform model.
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
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-teal-500/20">
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
              Proven methods and platforms, applied to your context.
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
            Business reform FAQ
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
                    <ChevronUp className="w-5 h-5 text-teal-500 shrink-0" />
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
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            BUSINESS REFORM
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to reform the way work gets done?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Process redesign, automation and change management — designed for adoption so the gains actually hold.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                View services
              </Button>
            </Link>
            <Link to="/hire-talent">
              <Button variant="outline" size="lg">
                Explore IT consulting
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
