import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/common/Reveal';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Cloud,
  Database,
  ShieldCheck,
  Layers,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Clock,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Users,
  Terminal,
  Zap,
  Target,
  FileCheck,
  Lock
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { FlipCard3D } from '../components/ui/flip-card-3d';

export const ITStaffingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: '48h', label: 'Target interview shortlist delivery' },
    { value: '88%', label: 'Submission-to-interview conversion' },
    { value: '96%', label: 'Retained past initial engagement' },
    { value: '3-step', label: 'Screening on every candidate' }
  ];

  const roleCategories = [
    {
      id: '01',
      title: 'Software Engineering',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      desc: 'Full-stack, backend, frontend, and distributed systems engineers.',
      metric: 'Top 3% Code Standards',
      backSpecs: [
        'Live 60-min algorithmic & architecture audit',
        'TypeScript, Go, Rust, Java, Python expertise',
        'Direct concurrency & microservices design testing'
      ]
    },
    {
      id: '02',
      title: 'Cloud & DevOps',
      icon: <Cloud className="w-5 h-5 text-indigo-400" />,
      desc: 'AWS, Azure, GCP, Kubernetes, and Terraform platform specialists.',
      metric: 'Multi-Cloud Certified',
      backSpecs: [
        'Production Terraform IaC & GitOps pipelines',
        'Zero-downtime Kubernetes cluster deployment',
        'Multi-region failover & FinOps cloud cost audits'
      ]
    },
    {
      id: '03',
      title: 'Data & AI',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      desc: 'Data engineering, ML pipelines, MLOps, and analytics architects.',
      metric: 'Lakehouse & LLM Ready',
      backSpecs: [
        'Snowflake, Databricks & dbt transformation',
        'Streaming Kafka & real-time ETL pipelines',
        'Custom RAG architectures & PyTorch model fine-tuning'
      ]
    },
    {
      id: '04',
      title: 'Cybersecurity',
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      desc: 'SecOps, threat detection, IAM, and cloud security engineers.',
      metric: 'SOC2 & HIPAA Compliant',
      backSpecs: [
        'Zero-Trust IAM & Vault secrets orchestration',
        'Automated CI/CD AST vulnerability scans',
        'Cloud security posture management (CSPM)'
      ]
    },
    {
      id: '05',
      title: 'Product & Delivery',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      desc: 'Technical product managers, agile coaches, and delivery leads.',
      metric: 'Sprint Velocity Aligned',
      backSpecs: [
        'Technical backlog prioritization & ADR synthesis',
        'Cross-functional release & squad leadership',
        'Jira/Linear enterprise governance'
      ]
    },
    {
      id: '06',
      title: 'ERP & Enterprise',
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      desc: 'SAP, Salesforce, ServiceNow, and enterprise integration experts.',
      metric: 'Enterprise Ready',
      backSpecs: [
        'Bi-directional ERP synchronizers & APIs',
        'ServiceNow ITOM / ITSM workflow automation',
        'Salesforce Apex, LWC, and MuleSoft integrations'
      ]
    }
  ];

  const models = [
    {
      id: 'contract',
      title: 'Contract Staffing',
      badge: 'FLEXIBLE SCALE',
      sla: '< 48h Shortlist',
      trial: '14-Day Zero-Risk Trial',
      desc: 'Rapid surge capacity for deadlines, cloud migrations, and specialized skill gaps.',
      backDetails: [
        'Immediate sprint surge without permanent headcount overhead',
        'W2 and 1099 compliant global payroll handling',
        '14-day zero-risk trial: pay zero if not satisfied'
      ]
    },
    {
      id: 'contract-to-hire',
      title: 'Contract-to-Hire',
      badge: 'DE-RISKED HIRING',
      sla: '3 to 6 Month Evaluation',
      trial: 'Zero Conversion Friction',
      desc: 'Evaluate execution, code quality, and team fit before committing to permanent headcount.',
      backDetails: [
        'Audit code output and team synergy in live sprints',
        'Seamless permanent conversion with zero penalty',
        'Continuous performance advisory from Practice Lead'
      ]
    },
    {
      id: 'direct-hire',
      title: 'Direct Placement',
      badge: 'PERMANENT HIRE',
      sla: '72h First Shortlist',
      trial: '90-Day Free Replacement',
      desc: 'Targeted search for high-impact engineers, architects, and technical leaders.',
      backDetails: [
        'Dedicated senior tech sourcers matching exact culture & stack',
        'Executive & Principal-level candidate reach',
        '90-day full replacement warranty standard'
      ]
    },
    {
      id: 'dedicated-team',
      title: 'Dedicated Engineering Squad',
      badge: 'MANAGED POD',
      sla: 'Turnkey Pod in 5 Days',
      trial: 'Sprint-to-Sprint SOW',
      desc: 'Turnkey pods with embedded tech leads aligned to your product backlog and sprint cycles.',
      backDetails: [
        'Pre-configured senior squads with embedded Tech Lead',
        'Complete delivery autonomy or embedded joint workflow',
        'Bi-weekly milestone billing and transparent reporting'
      ]
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Requirement discovery',
      desc: 'Deep alignment on stack, architecture, team dynamics, and timelines.'
    },
    {
      num: '02',
      title: 'Targeted pipeline match',
      desc: 'Direct matching against our pre-assessed senior engineer network.'
    },
    {
      num: '03',
      title: 'Rigorous technical screen',
      desc: 'Live coding evaluations and system design defense led by architects.'
    },
    {
      num: '04',
      title: 'Shortlist delivery',
      desc: '2-3 interview-ready candidate profiles delivered within 48 hours.'
    },
    {
      num: '05',
      title: 'Onboarding & support',
      desc: 'Active onboarding support and milestone check-ins to ensure velocity.'
    }
  ];

  const techSkills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Java', 'AWS', 'Azure', 'GCP',
    'Kubernetes', 'Docker', 'Terraform', 'PostgreSQL', 'Snowflake', 'Databricks', 'Kafka',
    'GraphQL', 'FastAPI', 'Next.js', 'Rust', 'CI/CD Pipelines', 'Microservices'
  ];

  const faqs = [
    {
      q: 'How fast can Zangle deliver candidate shortlists?',
      a: 'We present an interview-ready shortlist of 2-3 vetted candidates within 48 to 72 hours.'
    },
    {
      q: 'How does your technical vetting process work?',
      a: 'Every engineer completes background verification, live coding, and an architect-led system design evaluation.'
    },
    {
      q: 'What happens if a placed candidate is not the right fit?',
      a: 'We provide a 14-day zero-risk trial for contracts and a 90-day replacement guarantee for direct hires.'
    },
    {
      q: 'Do you support international or remote talent placement?',
      a: 'Yes. We support remote, hybrid, and on-site placements globally with compliant payroll.'
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
            <span className="text-slate-800 dark:text-slate-200">IT Staffing</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>Staffing · IT Staffing</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              The right technologists,{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                ready when you are.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Contract, contract-to-hire, and direct placement staffing for engineering teams that need immediate, vetted technical horsepower.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/hire-talent">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Hire talent
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg">
                  View open roles
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

      {/* ROLES WE PLACE with 3D Flip Cards (6 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            ROLES WE PLACE • INTERACTIVE 3D CARDS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Direct placement across modern engineering disciplines.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Flip any discipline card to review rigorous technical audit standards and evaluated frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleCategories.map((cat, ri) => (
            <Reveal key={cat.id} delay={Math.min(ri, 6) * 0.06} className="h-full">
              <FlipCard3D
                height="min-h-[300px] h-[300px]"
                hintText="Flip for technical vetting specs"
                front={
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                          {cat.icon}
                        </div>
                        <span className="text-xs font-mono text-slate-400 font-bold">{cat.id}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-cyan-600 dark:text-cyan-400">
                      <span className="text-[11px] font-mono">{cat.metric}</span>
                      <span className="flex items-center gap-1 font-semibold">
                        Flip specs <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                }
                back={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                          VETTING BENCHMARKS
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">
                          {cat.metric}
                        </span>
                      </div>

                      <div className="space-y-2 my-2">
                        {cat.backSpecs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3 text-cyan-400" /> Assessed by Staff Leads
                      </span>
                      <Link
                        to="/hire-talent"
                        className="text-cyan-400 font-bold hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Hire →
                      </Link>
                    </div>
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* STAFFING BY DISCIPLINE with 3D Flip Cards (4 Engagement Models) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            STAFFING BY DISCIPLINE • ENGAGEMENT FRAMEWORKS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Staffing built for your delivery rhythm.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Flip any engagement card for SLA terms, guarantee clauses, and immediate hiring links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((m, i) => (
            <Reveal key={m.id} delay={Math.min(i, 6) * 0.06} className="h-full">
              <FlipCard3D
                key={i}
                height="min-h-[300px] h-[300px]"
                hintText="Flip for model terms & guarantees"
                front={
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="cyan" size="xs">
                          {m.badge}
                        </Badge>
                        <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          {m.trial}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {m.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {m.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-cyan-600 dark:text-cyan-400">
                      <span className="text-[11px] font-mono">SLA: {m.sla}</span>
                      <span className="flex items-center gap-1 font-semibold">
                        Flip for details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                }
                back={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                        <div>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                            ENGAGEMENT TERMS
                          </span>
                          <h4 className="text-sm font-bold text-white">
                            {m.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {m.sla}
                        </span>
                      </div>

                      <div className="space-y-2 my-2">
                        {m.backDetails.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <Link
                        to="/hire-talent"
                        className="w-full py-1.5 px-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs text-center transition-colors inline-flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/25"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Request {m.title}
                      </Link>
                    </div>
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* DUAL CTA CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30 text-white space-y-4 shadow-xl">
            <Badge variant="cyan" size="xs">
              FOR HIRING MANAGERS
            </Badge>
            <h3 className="text-2xl font-bold">
              Need technologists for an upcoming project?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Share your open requirements and our technical talent advisors will assemble an interview-ready candidate shortlist in 48 hours.
            </p>
            <Link to="/hire-talent" className="inline-block pt-2">
              <Button variant="glow" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Request candidates
              </Button>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 text-white space-y-4 shadow-xl">
            <Badge variant="blue" size="xs">
              FOR CANDIDATES
            </Badge>
            <h3 className="text-2xl font-bold">
              Looking for your next engineering role?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Browse active contract, contract-to-hire, and full-time opportunities across top tech stacks with leading enterprise engineering teams.
            </p>
            <Link to="/jobs" className="inline-block pt-2">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Browse open positions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW OUR STAFFING WORKS (5 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            THE PROCESS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How our staffing works.
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

      {/* SKILLS WE PLACE (Toolchain Pills) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-lg text-center space-y-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
              SKILLS & PLATFORMS
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Skills we place across modern enterprise stacks.
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {techSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STAFFING FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Staffing FAQ
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

      {/* RELATED SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
            EXPLORE MORE
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Related solutions.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/clinical-staffing"
            className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all group shadow-sm"
          >
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors mb-2">
              Clinical & Scientific Staffing
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Vetted biostatisticians, clinical research coordinators, and health informatics experts.
            </p>
          </Link>

          <Link
            to="/outsourcing"
            className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all group shadow-sm"
          >
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors mb-2">
              Outsourcing Solutions
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Extend capacity with dedicated managed teams and project-based engineering pods.
            </p>
          </Link>

          <Link
            to="/services/cloud-computing"
            className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all group shadow-sm"
          >
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors mb-2">
              Cloud Computing Services
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Cloud migration, platform engineering, FinOps, and resilient AWS/Azure/GCP infrastructure.
            </p>
          </Link>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            START HIRING NOW
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to build your high-velocity engineering team?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Contact our technical staffing team today. We'll match your specific architectural requirements with pre-screened talent in 48 hours.
          </p>
          <div className="pt-2">
            <Link to="/hire-talent">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Request Talent (48h SLA)
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ITStaffingPage;
