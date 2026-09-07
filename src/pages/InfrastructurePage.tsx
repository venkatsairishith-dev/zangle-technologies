import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Activity,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Server,
  Zap,
  RotateCcw,
  Flame,
  Radio
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const InfrastructurePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: '99.99%', label: 'Target uptime SLA across client production clusters' },
    { value: '< 5 min', label: 'Mean time to detect (MTTD) critical incidents' },
    { value: '100%', label: 'Automated rollbacks on health check failures' },
    { value: '0 RPO', label: 'Zero data loss disaster recovery objective' }
  ];

  const capabilities = [
    {
      id: '01',
      title: '24/7 SRE & Managed Operations',
      icon: <Radio className="w-5 h-5 text-purple-400" />,
      desc: '24/7 reliability engineering with guaranteed response SLAs and incident commanders.'
    },
    {
      id: '02',
      title: 'Distributed Tracing & APM',
      icon: <Activity className="w-5 h-5 text-cyan-400" />,
      desc: 'Full-stack observability using OpenTelemetry, Datadog, and Grafana Tempo.'
    },
    {
      id: '03',
      title: 'Automated Runbooks & Self-Healing',
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      desc: 'Automated remediation scripts and auto-scaling triggers in Kubernetes to resolve alerts.'
    },
    {
      id: '04',
      title: 'Disaster Recovery & Multi-Region HA',
      icon: <RotateCcw className="w-5 h-5 text-blue-400" />,
      desc: 'Active-active multi-region cloud failovers with automated DNS rerouting.'
    },
    {
      id: '05',
      title: 'Chaos Engineering & Fault Drills',
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      desc: 'Proactive resilience testing using Chaos Mesh to simulate outages and network partitions.'
    },
    {
      id: '06',
      title: 'Zero-Trust Infrastructure Security',
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
      desc: 'Hardening networks with mTLS, HashiCorp Vault secrets, and automated CVE patching.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'SLI & SLO Definition',
      desc: 'Define service level indicators (SLIs) and realistic error budgets.'
    },
    {
      num: '02',
      title: 'Telemetry Instrumentation',
      desc: 'Embed OpenTelemetry traces, custom Prometheus metrics, and centralized logs.'
    },
    {
      num: '03',
      title: 'Codified Runbook Setup',
      desc: 'Create automated PagerDuty alerting thresholds and executable response runbooks.'
    },
    {
      num: '04',
      title: 'Chaos & Failover Drills',
      desc: 'Run disaster recovery tests to validate backups and automated traffic failover.'
    },
    {
      num: '05',
      title: '24/7 Observability Handoff',
      desc: 'Transition to continuous SRE monitoring with weekly error-budget reviews.'
    }
  ];

  const techStack = [
    'Datadog', 'Prometheus', 'Grafana', 'OpenTelemetry', 'PagerDuty',
    'Kubernetes', 'Istio', 'HashiCorp Vault', 'Terraform', 'ArgoCD',
    'AWS CloudWatch', 'Chaos Mesh', 'Fluentd', 'Loki', 'Jaeger'
  ];

  const faqs = [
    {
      q: 'How does Zangle handle on-call escalation and incident response?',
      a: 'We establish dedicated on-call rotations integrated with PagerDuty, guaranteeing a 5-minute engineer response SLA for Sev-1/2 alerts.'
    },
    {
      q: 'Can you implement OpenTelemetry across our existing microservices?',
      a: 'Yes. We instrument Go, Node.js, Python, and Java services with vendor-agnostic OpenTelemetry agents, routing to Datadog, Grafana, or Honeycomb.'
    },
    {
      q: 'What is your approach to Disaster Recovery (DR) testing?',
      a: 'We conduct non-disruptive game-day drills injecting node failures and regional latency to validate RTO and RPO targets.'
    },
    {
      q: 'Do you offer hybrid SRE models where your engineers embed with our team?',
      a: 'Yes. Our SREs can operate autonomously 24/7 or embed into your internal platform team to co-develop tooling.'
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
            <span className="text-slate-800 dark:text-slate-200">Infrastructure & SRE</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span>Service · Reliability Engineering</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Enterprise SRE & infrastructure for{' '}
              <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                24/7 reliability.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              24/7 site reliability engineering, distributed tracing, automated incident response, disaster recovery planning, and zero-trust security postures.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore SRE Solutions
                </Button>
              </Link>
              <Link to="/hire-talent">
                <Button variant="outline" size="lg">
                  Hire SRE Engineers
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
                <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">
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
              RELIABILITY ENGINEERING
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Eliminate outages with automated observability & fast incident response.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Unplanned downtime costs millions and damages brand trust. We engineer automated self-healing cloud platforms, instrument end-to-end distributed telemetry, and provide 24/7 on-call incident response to guarantee four-nines availability.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Full-stack distributed tracing with OpenTelemetry and Datadog',
                'Guaranteed 5-minute MTTD with automated PagerDuty on-call escalation',
                'Disaster recovery architectures with zero RPO and multi-region failover',
                'Zero-trust network security, mTLS service mesh, and automated secrets rotation'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      SRE Rigor Standard
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      Automated self-healing
                    </span>
                  </div>
                </div>
                <Badge variant="purple" size="xs">
                  FOUR NINES
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400">99.99%</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Target Availability</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">&lt; 5 min</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Response Time SLA</div>
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
            CORE CAPABILITIES
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Infrastructure & SRE practice areas.
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
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-purple-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {c.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{c.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors">
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
            DELIVERY PROCESS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How we operationalize reliability engineering.
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
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-purple-500/20">
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
              SRE & OBSERVABILITY STACK
            </Badge>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Toolchain & platforms we deploy.
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
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Infrastructure & SRE FAQ
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
                    <ChevronUp className="w-5 h-5 text-purple-500 shrink-0" />
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
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            GUARANTEE UPTIME
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to achieve four-nines production reliability?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Schedule a session with our principal SRE architects to assess your observability setup and disaster recovery posture.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Book SRE Consultation
              </Button>
            </Link>
            <Link to="/hire-talent">
              <Button variant="outline" size="lg">
                Hire SRE Engineers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
