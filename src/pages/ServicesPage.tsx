import { motion } from 'framer-motion';
import { Reveal } from '../components/common/Reveal';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cloud,
  Database,
  Code2,
  Globe,
  Briefcase,
  Layers,
  HeartPulse,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Zap,
  Boxes,
  Sparkles,
  Cpu
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { FlipCard3D } from '../components/ui/flip-card-3d';

export const ServicesPage: React.FC = () => {
  const stats = [
    { value: '99.9%', label: 'Production uptime standard on cloud builds' },
    { value: '40%+', label: 'Average infrastructure cost efficiency gain' },
    { value: '150+', label: 'Enterprise systems architected & deployed' },
    { value: '100%', label: 'Transparent code & asset ownership' }
  ];

  const services = [
    {
      id: '01',
      title: 'Cloud Computing & DevOps',
      path: '/services/cloud-computing',
      icon: <Cloud className="w-6 h-6 text-cyan-400" />,
      tag: 'Cloud & Infrastructure',
      desc: 'Multi-cloud architectures, automated CI/CD pipelines, Kubernetes, and Terraform IaC.',
      deliverables: [
        'Zero-downtime Kubernetes cluster setups',
        'GitOps CI/CD pipeline automation (ArgoCD / Actions)',
        'Multi-region disaster recovery & FinOps audits'
      ],
      stack: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Datadog']
    },
    {
      id: '02',
      title: 'Data Analysis & AI',
      path: '/services/data-analysis',
      icon: <Database className="w-6 h-6 text-emerald-400" />,
      tag: 'Data & Analytics',
      desc: 'Snowflake/Databricks data warehouses, real-time ETL pipelines, and GenAI models.',
      deliverables: [
        'Real-time streaming ingestion with Apache Kafka',
        'Enterprise LLM & RAG pipeline integration',
        'Production Lakehouse architectures & dbt models'
      ],
      stack: ['Snowflake', 'Databricks', 'Kafka', 'PyTorch', 'dbt']
    },
    {
      id: '03',
      title: 'Product Development',
      path: '/services/product-development',
      icon: <Layers className="w-6 h-6 text-indigo-400" />,
      tag: 'Software Engineering',
      desc: 'Full-stack SaaS engineering, distributed microservices, and reactive frontends.',
      deliverables: [
        'Scalable microservice API backends (Go/Node/Java)',
        'Ultra-fast Next.js / React 19 web applications',
        'High-concurrency GraphQL and gRPC communication'
      ],
      stack: ['React', 'Node.js', 'Go', 'PostgreSQL', 'GraphQL']
    },
    {
      id: '04',
      title: 'Website Development',
      path: '/services/website-development',
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      tag: 'Web & Experience',
      desc: 'High-performance web apps, headless CMS setups, and accessible design systems.',
      deliverables: [
        'Lighthouse 95+ performance scores guaranteed',
        'Enterprise headless CMS integrations',
        '3D WebGL / Three.js interactive UI experiences'
      ],
      stack: ['Next.js', 'TailwindCSS', 'Three.js', 'Sanity', 'Vercel']
    },
    {
      id: '05',
      title: 'IT Consulting & Architecture',
      path: '/services/it-consulting',
      icon: <Briefcase className="w-6 h-6 text-amber-400" />,
      tag: 'Strategic Advisory',
      desc: 'Tech roadmaps, FinOps cloud cost reduction, and modernization blueprints.',
      deliverables: [
        'Architecture reviews & tech debt remediation',
        'Enterprise FinOps audits saving 30-50% on AWS/GCP',
        'SOC2 / ISO 27001 compliance readiness blueprints'
      ],
      stack: ['AWS Well-Architected', 'FinOps', 'TOGAF', 'SOC2']
    },
    {
      id: '06',
      title: 'Infrastructure & SRE',
      path: '/services/infrastructure',
      icon: <Terminal className="w-6 h-6 text-purple-400" />,
      tag: 'Reliability Engineering',
      desc: '24/7 site reliability engineering, distributed tracing, and automated failover.',
      deliverables: [
        'Automated multi-region failover and self-healing',
        'OpenTelemetry distributed tracing setup',
        'Chaos engineering & SLA/SLO observability'
      ],
      stack: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Chaos Mesh']
    },
    {
      id: '07',
      title: 'Healthcare Solutions',
      path: '/services/healthcare',
      icon: <HeartPulse className="w-6 h-6 text-rose-400" />,
      tag: 'Specialized Vertical',
      desc: 'HIPAA-compliant health architectures, EHR integrations (HL7 / FHIR), and PHI data flows.',
      deliverables: [
        'HL7 v2 / FHIR API integration bridges',
        'HIPAA & HITRUST compliant encrypted storage',
        'EHR integration (Epic, Cerner, AthenaHealth)'
      ],
      stack: ['FHIR', 'HL7', 'HIPAA AWS', 'Healthcare API']
    },
    {
      id: '08',
      title: 'Business Reform',
      path: '/services/business-reform',
      icon: <TrendingUp className="w-6 h-6 text-teal-400" />,
      tag: 'Modernization',
      desc: 'Monolith-to-microservices migration, event architectures, and ERP integrations.',
      deliverables: [
        'Strangler Fig monolith decomposition',
        'Event-driven asynchronous messaging buses',
        'ERP/CRM bi-directional data synchronizers'
      ],
      stack: ['EventBridge', 'RabbitMQ', 'Apache Kafka', 'SAP/Salesforce']
    }
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Discovery & Architecture',
      desc: 'Map requirements, evaluate system constraints, and establish SLA targets.',
      backDetails: [
        'Target architecture blueprint & ADRs',
        'Security & compliance constraint mapping',
        'Defined sprint milestones and KPIs'
      ]
    },
    {
      step: '02',
      title: 'Agile Sprint Execution',
      desc: 'Agile 2-week iterations with continuous integration and automated testing.',
      backDetails: [
        'Bi-weekly production-ready releases',
        'Daily code reviews & branch preview deploys',
        'Direct Slack/Teams channel integration'
      ]
    },
    {
      step: '03',
      title: 'Security & Quality',
      desc: 'Automated linting, integration test suites, vulnerability scans, and code audits.',
      backDetails: [
        'Static & dynamic AST security analysis',
        '90%+ Unit & E2E automated test coverage',
        'Third-party pen testing certification'
      ]
    },
    {
      step: '04',
      title: 'Production Rollout',
      desc: 'Zero-downtime blue/green deployment, canary releases, and live telemetry.',
      backDetails: [
        'Canary routing with instant rollback',
        'SLO/SLA telemetry dashboards',
        'Comprehensive documentation & handover'
      ]
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
            <span className="text-slate-800 dark:text-slate-200">Services</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>Full-Stack Engineering & Consulting</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Engineering services built for{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                real-world production.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              From cloud infrastructure modernization to bespoke application engineering and automated data pipelines, we deliver end-to-end technical excellence with transparent governance.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Schedule Technical Consultation
                </Button>
              </Link>
              <Link to="/hire-talent">
                <Button variant="outline" size="lg">
                  Hire Dedicated Pods
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

      {/* 8 Services Grid with 3D Flip Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            CORE DISCIPLINES • INTERACTIVE 3D CARDS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Comprehensive technology services.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Flip any service card to reveal concrete deliverables, architecture specs, and toolchains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, ri) => (
            <Reveal key={s.id} delay={Math.min(ri, 6) * 0.06} className="h-full">
              <FlipCard3D
                height="min-h-[380px] h-[380px]"
                hintText="Flip for deliverables & stack"
                front={
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          {s.icon}
                        </div>
                        <span className="text-xs font-mono text-slate-400 font-bold">{s.id}</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-semibold tracking-wider block mb-1">
                        {s.tag}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-cyan-600 dark:text-cyan-400">
                      <span className="text-[11px] font-mono">Explore specs</span>
                      <span className="flex items-center gap-1 font-semibold">
                        Flip card <ArrowRight className="w-3.5 h-3.5" />
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
                            DELIVERABLES & STACK
                          </span>
                          <h4 className="text-xs font-bold text-white">
                            {s.title}
                          </h4>
                        </div>
                        <span className="text-xs font-mono text-slate-400 font-bold">{s.id}</span>
                      </div>

                      <div className="space-y-1.5 my-2">
                        {s.deliverables.map((del, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{del}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                          Stack:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {s.stack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-cyan-300 border border-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <Link
                        to={s.path}
                        className="w-full py-1.5 px-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs text-center transition-colors inline-flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/25"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Sparkles className="w-3.5 h-3.5" /> View Service Details
                      </Link>
                    </div>
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Methodology Section with 3D Flip Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            DELIVERY ARCHITECTURE • 4 PHASES
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Engineered for reliability, from first commit to production.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodologySteps.map((m, ri) => (
            <Reveal key={ri} delay={Math.min(ri, 6) * 0.06} className="h-full">
              <FlipCard3D
                key={m.step}
                height="min-h-[260px] h-[260px]"
                hintText="Flip for phase outputs"
                front={
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-sm flex items-center justify-center mb-3 border border-cyan-500/20">
                        {m.step}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                        {m.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                      <span>Phase Specs</span>
                      <span className="flex items-center gap-1 font-semibold">
                        Flip <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                }
                back={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div>
                      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                          PHASE {m.step} OUTPUTS
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Validated</span>
                      </div>

                      <div className="space-y-1.5 my-2">
                        {m.backDetails.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Zero-Downtime Guarantee
                    </div>
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            START ARCHITECTING
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to solve your toughest technical challenges?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Discuss your architecture roadmap with our senior technology practice leads today.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Book Architectural Review
              </Button>
            </Link>
            <Link to="/hire-talent">
              <Button variant="outline" size="lg">
                Request Engineering Pod
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
