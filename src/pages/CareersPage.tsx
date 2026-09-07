import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Globe,
  Award,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code2,
  Cpu,
  Sparkles,
  Layers
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const CareersPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: '100%', label: 'Remote-first global culture' },
    { value: '94%', label: 'Consultant project retention rate' },
    { value: '4.9/5', label: 'Engineer satisfaction rating' },
    { value: '< 72 hrs', label: 'Average candidate match velocity' }
  ];

  const perks = [
    {
      id: '01',
      title: 'High-Impact Architecture',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      desc: 'Build tier-1 distributed systems, cloud migrations, and greenfield AI products.'
    },
    {
      id: '02',
      title: 'Top 5% Compensation',
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      desc: 'Transparent rates and salaries benchmarked to premier US and EU tech markets.'
    },
    {
      id: '03',
      title: '100% Remote & Async First',
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      desc: 'Work from anywhere with autonomous schedules and structured async collaboration.'
    },
    {
      id: '04',
      title: 'Direct Architect Access',
      icon: <Code2 className="w-5 h-5 text-purple-400" />,
      desc: 'Collaborate with veteran principal engineers committed to clean code standards.'
    },
    {
      id: '05',
      title: 'Sponsored Certifications',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      desc: 'Full reimbursement for advanced AWS, Azure, GCP, Kubernetes, and security certs.'
    },
    {
      id: '06',
      title: 'Continuous Pipeline',
      icon: <Zap className="w-5 h-5 text-rose-400" />,
      desc: 'Seamless rollover to high-tier engagements before current contracts conclude.'
    }
  ];

  const vettingSteps = [
    {
      num: '01',
      title: 'Code Review',
      desc: 'Review of production GitHub repos, open-source work, and system design.'
    },
    {
      num: '02',
      title: 'Architect Deep-Dive',
      desc: '60-minute practical technical session on real-world system architecture trade-offs.'
    },
    {
      num: '03',
      title: 'Communication Fit',
      desc: 'Evaluation of asynchronous clarity, English fluency, and team collaboration.'
    },
    {
      num: '04',
      title: 'Client Placement',
      desc: 'Rapid matching with enterprise clients, complete with rate negotiation support.'
    }
  ];

  const featuredRoles = [
    {
      title: 'Staff Site Reliability Engineer (Kubernetes / Istio)',
      domain: 'Cloud & SRE',
      type: 'Contract (12 mos)',
      location: 'Remote (Global)',
      rate: '$85 - $115 / hr'
    },
    {
      title: 'Senior Full-Stack Engineer (React / Go / PostgreSQL)',
      domain: 'Full-Stack Engineering',
      type: 'Contract-to-Hire',
      location: 'Remote (US/Canada/LATAM)',
      rate: '$75 - $95 / hr'
    },
    {
      title: 'Lead AI / MLOps Engineer (LLMs / Python / Vector DBs)',
      domain: 'AI & Data Systems',
      type: 'Direct Placement',
      location: 'Remote (US/EMEA)',
      rate: '$160k - $210k / yr'
    },
    {
      title: 'Principal Cloud Security Architect (Zero-Trust / AWS)',
      domain: 'Cybersecurity',
      type: 'Contract (6 mos+)',
      location: 'Remote (US Only)',
      rate: '$100 - $130 / hr'
    }
  ];

  const faqs = [
    {
      q: 'What types of roles and engagements does Zangle offer?',
      a: 'We offer contract roles (6-18+ months), contract-to-hire arrangements, and direct placements across startups and Fortune 500 enterprises.'
    },
    {
      q: 'How long does the interview and vetting process take?',
      a: 'Our technical evaluation takes 3 to 5 business days from initial code review to final bench approval, with immediate matching.'
    },
    {
      q: 'Can engineers based outside the United States apply?',
      a: 'Yes. We hire senior engineers globally across North America, LATAM, Europe, and APAC with compliant international payroll.'
    },
    {
      q: 'How does Zangle handle hourly payments and invoicing for contractors?',
      a: 'Contractors are paid on bi-weekly or monthly cycles via direct deposit or wire with automated timesheet approvals.'
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
            <span className="text-slate-800 dark:text-slate-200">Careers</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>Join Our Global Engineering Network</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Build mission-critical systems with{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                top engineering leaders.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Join an elite global network of architects, engineers, SREs, and data specialists building tier-1 tech products.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/jobs">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore Open Positions
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Join Talent Network
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

      {/* 6 PERKS / VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            WHY JOIN ZANGLE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Engineered for senior technical talent.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((p, _i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(_i, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {p.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{p.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4-STAGE VETTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            EVALUATION PROCESS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How we evaluate technical excellence.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {vettingSteps.map((step, _i) => (
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

      {/* FEATURED ROLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
              FEATURED OPPORTUNITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Currently open engineering roles.
            </h2>
          </div>
          <Link to="/jobs">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Roles
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredRoles.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(idx, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="cyan" size="xs">
                    {role.domain}
                  </Badge>
                  <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {role.rate}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                  {role.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>{role.type}</span>
                  <span>•</span>
                  <span>{role.location}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Link to="/jobs">
                  <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Apply Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Engineer & Consultant FAQ
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

      {/* BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            ELEVATE YOUR CAREER
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to join the top 5% of global engineering talent?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Submit your profile to our talent network or apply directly for active enterprise roles.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/jobs">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Browse Open Roles
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Submit Open Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
