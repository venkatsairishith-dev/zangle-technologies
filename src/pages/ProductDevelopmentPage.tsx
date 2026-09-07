import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Code2,
  Cpu,
  Smartphone,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Boxes,
  Database,
  Terminal
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ProductDevelopmentPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: 'Weeks', label: 'To a working prototype you can put in front of real users — not months of upfront documentation' },
    { value: 'Production-grade', label: 'From day one — tested, observable and secure by default, so what ships first is something you can keep running' },
    { value: 'Scales', label: 'With demand — cloud-native architecture that handles growth in users, data and features without a costly rewrite' }
  ];

  const capabilities = [
    {
      id: '01',
      title: 'Web & mobile applications',
      icon: <Smartphone className="w-5 h-5 text-indigo-400" />,
      desc: 'Responsive web apps and native-grade iOS and Android experiences from one codebase or platform-specific builds — fast, accessible and built to your users’ real workflows.'
    },
    {
      id: '02',
      title: 'API & platform engineering',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      desc: 'Well-documented REST and GraphQL APIs, event-driven services and internal platforms that let your product — and the teams around it — integrate and grow without friction.'
    },
    {
      id: '03',
      title: 'Cloud-native architecture',
      icon: <Boxes className="w-5 h-5 text-blue-400" />,
      desc: 'Containerised, service-oriented systems designed for the cloud — resilient, observable and cost-aware, so scaling up is a configuration change rather than a rebuild.'
    },
    {
      id: '04',
      title: 'QA & test automation',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      desc: 'Automated unit, integration and end-to-end suites wired into the pipeline, so quality is verified on every commit and regressions are caught long before they reach users.'
    },
    {
      id: '05',
      title: 'DevOps & CI/CD',
      icon: <Terminal className="w-5 h-5 text-amber-400" />,
      desc: 'Infrastructure as code, automated build-and-deploy pipelines and monitoring that turn releases into a routine, low-risk event you can run many times a day.'
    },
    {
      id: '06',
      title: 'UX/UI design',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      desc: 'Research-led product design — flows, prototypes and a reusable component system — that makes the product intuitive to use and consistent to extend as it grows.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Discovery',
      desc: 'We map goals, users and constraints, then shape a clear scope and architecture for what to build first.'
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Flows, prototypes and a component system turn the scope into something tangible to validate before code.'
    },
    {
      num: '03',
      title: 'Build',
      desc: 'Squads ship in short iterations, demoing working software frequently so direction stays correct.'
    },
    {
      num: '04',
      title: 'QA & hardening',
      desc: 'Automated tests, security checks and performance tuning prepare the product for real-world load.'
    },
    {
      num: '05',
      title: 'Launch & scale',
      desc: 'We release with confidence, monitor in production and keep evolving the product as demand grows.'
    }
  ];

  const techStack = [
    'React', 'Next.js', 'Node.js', '.NET', 'Java & Spring', 'Python', 'Flutter',
    'React Native', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GitHub Actions'
  ];

  const faqs = [
    {
      q: 'Can you build an MVP first?',
      a: 'Yes — and we usually recommend it. We define the smallest version that proves the core value, ship it in weeks rather than months, then expand based on real usage. Because the MVP is built on production-grade foundations, you grow on it rather than throwing it away.'
    },
    {
      q: 'Which technology stacks do you use?',
      a: 'We work across React, Next.js, Node.js, .NET, Java and Spring, and Python on the backend; Flutter and React Native for mobile; PostgreSQL and MongoDB for data; and AWS with Docker, Kubernetes and GitHub Actions for cloud and delivery. We choose the stack that fits your problem and team.'
    },
    {
      q: 'Do you maintain the product after launch?',
      a: 'We do. Launch is a milestone, not the finish line. We offer ongoing support, monitoring, security patching and continued feature development, so your product stays reliable and keeps improving as your business and your users change.'
    },
    {
      q: 'Can we get a dedicated team?',
      a: 'Yes. We assemble a dedicated squad — engineers, QA, design and a delivery lead — that works as an extension of your organisation. The team stays consistent across the engagement, builds deep product knowledge and is accountable for outcomes, not just hours.'
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
            <span className="text-slate-800 dark:text-slate-200">Product Development</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>Service · Product Development</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Product engineering from{' '}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                prototype to scale.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Design, build, test and release production software with dedicated squads that own quality, velocity and business outcomes.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Build with us
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
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">
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
              From prototype to production scale.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Good ideas stall without engineering muscle behind them. Roadmaps drift, prototypes never leave the demo, and bespoke software turns out to be hard to ship — and harder still to keep stable as users, data and integrations multiply. Zangle closes that gap with full-cycle product engineering teams that own discovery through launch and the road beyond, making the architecture, testing and delivery decisions that keep a product fast today and ready to scale tomorrow.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Web, mobile and platform engineering',
                'Cloud-native, secure and tested by default',
                'Dedicated squads that ship and scale'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Representative engagement
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      B2B SaaS platform built from zero
                    </span>
                  </div>
                </div>
                <Badge variant="indigo" size="xs">
                  PRODUCTION READY
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">Weeks</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">To a working prototype in front of real users</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">Scales</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Cloud-native architecture that grows without a rewrite</div>
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
            Engineering across the whole product surface.
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
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-indigo-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {c.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{c.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors">
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
            How we build.
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
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-indigo-500/20">
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
              TECH WE BUILD WITH
            </Badge>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              A modern, proven stack — chosen to fit the problem.
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
            Product development FAQ
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
                    <ChevronUp className="w-5 h-5 text-indigo-500 shrink-0" />
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
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            PRODUCT DEVELOPMENT
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to take your product from prototype to scale?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Discovery, design, build, QA and launch — delivered by a dedicated squad accountable for outcomes.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                View services
              </Button>
            </Link>
            <Link to="/hire-talent">
              <Button variant="outline" size="lg">
                Hire engineers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
