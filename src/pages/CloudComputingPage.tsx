import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cloud,
  Layers,
  ShieldCheck,
  Cpu,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Terminal,
  TrendingUp,
  Server,
  Zap,
  Boxes
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const CloudComputingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: '40% faster', label: 'Migration timelines, through repeatable landing zones and automated tooling' },
    { value: '22%', label: 'Average cloud-cost reduction once FinOps right-sizing and commitments take hold' },
    { value: 'Availability', label: 'Platform availability planning with SLOs and proactive monitoring' }
  ];

  const capabilities = [
    {
      id: '01',
      title: 'Cloud migration & re-platforming',
      icon: <Cloud className="w-5 h-5 text-cyan-400" />,
      desc: 'We profile each workload, choose the right path — rehost, re-platform or refactor — and move it with dependency mapping and rollback plans so cutovers stay low-risk and downtime stays minimal.'
    },
    {
      id: '02',
      title: 'Landing zones & platform engineering',
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      desc: 'Multi-account landing zones, identity, networking and policy guardrails delivered as code, plus golden paths and reusable modules that let product teams ship safely without re-inventing the basics.'
    },
    {
      id: '03',
      title: 'DevOps & SRE',
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      desc: 'Automated CI/CD pipelines, infrastructure as code and observability, paired with SRE practices — SLOs, error budgets and incident response — so releases are frequent and reliability is measured, not assumed.'
    },
    {
      id: '04',
      title: 'Managed cloud operations',
      icon: <Server className="w-5 h-5 text-indigo-400" />,
      desc: 'Round-the-clock monitoring, patching, backup and incident response against agreed SLAs — we run the environment day to day so your engineers stay focused on the product, not the platform.'
    },
    {
      id: '05',
      title: 'FinOps & cost optimization',
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
      desc: 'Cost visibility, tagging and showback, right-sizing, commitment planning and automated cleanup of idle resources — so spend is attributed to teams and reduced without throttling delivery.'
    },
    {
      id: '06',
      title: 'Cloud security & compliance',
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
      desc: 'Identity and access design, encryption, network segmentation and continuous compliance scanning, with controls mapped to frameworks such as SOC 2, ISO 27001, HIPAA and GDPR for audit-ready evidence.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Assess & business case',
      desc: 'Inventory the estate, map dependencies and build the cost and risk case that defines the right migration path.'
    },
    {
      num: '02',
      title: 'Landing zone & foundations',
      desc: 'Stand up secure accounts, identity, networking and guardrails as code so everything that follows lands on solid ground.'
    },
    {
      num: '03',
      title: 'Migrate & modernize',
      desc: 'Move workloads in waves, refactoring and containerizing where it pays off, with validation at every cutover.'
    },
    {
      num: '04',
      title: 'Optimize (FinOps & performance)',
      desc: 'Right-size, tune and apply commitments to drive down spend and improve performance once real usage is visible.'
    },
    {
      num: '05',
      title: 'Operate (managed cloud)',
      desc: 'Run it day to day — monitoring, patching, incidents and continuous improvement — against clear SLAs.'
    }
  ];

  const techStack = [
    'AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'Terraform', 'Docker',
    'Helm', 'Argo CD', 'GitHub Actions', 'Datadog', 'Prometheus', 'FinOps'
  ];

  const faqs = [
    {
      q: 'Which cloud platforms do you support?',
      a: 'We work across AWS, Microsoft Azure and Google Cloud, and we support hybrid and multi-cloud estates. We recommend the platform that fits your workloads, team skills and commercial agreements rather than defaulting to a single vendor.'
    },
    {
      q: 'How long does a typical migration take?',
      a: 'It depends on the size and complexity of the estate. A focused workload can move in a few weeks, while a full data-center exit usually runs over several months in planned waves. We scope timelines during the assessment phase so there are no surprises.'
    },
    {
      q: 'How do you keep cloud costs under control?',
      a: 'We embed FinOps from day one: tagging and showback make spend visible by team, right-sizing and commitment plans cut waste, and automation removes idle resources. Costs are reviewed continuously, not just when the bill arrives.'
    },
    {
      q: 'Do you provide ongoing managed cloud operations?',
      a: 'Yes. Many clients keep us on after go-live to run the environment — monitoring, patching, backups, incident response and continuous optimization — against agreed SLAs, so internal teams can stay focused on product work.'
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
            <span className="text-slate-800 dark:text-slate-200">Cloud Computing</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>Service · Cloud Computing</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Cloud programs that are modern,{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                governed and cost-aware.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Move, modernize and operate workloads across AWS, Azure and Google Cloud with security, automation and FinOps discipline built into the plan.
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
              Cloud that earns its place.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Most cloud programs stall in the same place. Legacy estates are expensive to run, brittle under change, and hard to secure — yet a straight lift-and-shift rarely delivers the savings or speed that justified the move. Zangle assesses what you actually run, builds solid foundations — secure landing zones, identity, networking and guardrails — then modernizes the workloads that benefit most. After go-live we keep running it for you, with FinOps cost discipline so spend stays visible, attributed and under control.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Migration and modernization across AWS, Azure and Google Cloud',
                'Platform engineering and golden paths for self-serve delivery',
                'Managed operations with FinOps cost control'
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
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Representative engagement
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      Financial-services platform
                    </span>
                  </div>
                </div>
                <Badge variant="emerald" size="xs">
                  DELIVERED
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">Waves</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Core services moved in controlled waves</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Audit</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Security posture hardened for audit</div>
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
            Capabilities across the full cloud lifecycle.
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
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {c.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{c.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
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
            How a cloud engagement runs.
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

      {/* TECH STACK PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div>
            <Badge variant="cyan" size="xs" className="mb-2">
              TECH WE WORK WITH
            </Badge>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              A pragmatic, multi-cloud toolchain — chosen to fit your team, not ours.
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
            Cloud FAQ
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
            CLOUD COMPUTING
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Move to cloud with a partner who runs it too.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Migration, modernization and managed operations across AWS, Azure and Google Cloud — with FinOps discipline built in.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                View services
              </Button>
            </Link>
            <Link to="/hire-talent">
              <Button variant="outline" size="lg">
                Hire cloud engineers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
