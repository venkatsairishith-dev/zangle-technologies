import { motion } from 'framer-motion';
import { Reveal } from '../components/common/Reveal';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
  Layers,
  Cpu,
  Database,
  Building2,
  Server,
  Sparkles,
  Lock,
  Terminal
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { FlipCard3D } from '../components/ui/flip-card-3d';

export const CaseStudiesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Cloud & DevOps',
    'FinTech & Payments',
    'HealthTech',
    'AI & Data Systems',
    'SaaS Modernization'
  ];

  const caseStudies = [
    {
      id: 'fintech-cloud-migration',
      category: 'FinTech & Payments',
      client: 'Tier-1 Digital Payments Provider',
      title: 'Active-Active Multi-Region AWS Architecture for 50M+ Transactions',
      challenge: 'Legacy on-premise infrastructure suffered latency degradation and high overhead during holiday traffic spikes.',
      solution: 'Deployed an active-active multi-region AWS EKS architecture with automated DNS failover and Kafka event streaming.',
      metrics: [
        { label: 'Peak Uptime', value: '99.999%' },
        { label: 'Spend Cut', value: '40%' },
        { label: 'p99 Latency', value: '< 45ms' }
      ],
      tags: ['AWS EKS', 'Apache Kafka', 'Terraform', 'Go', 'Vault'],
      architectureDetails: [
        'Multi-region Terraform IaC with automated failover via Route 53',
        'Strict PCI-DSS compliance using HashiCorp Vault key rotation',
        'Real-time transaction reconciliation via clustered Apache Kafka'
      ]
    },
    {
      id: 'healthtech-fhir-integration',
      category: 'HealthTech',
      client: 'Series-B Telehealth Scaleup',
      title: 'HIPAA-Compliant SMART on FHIR Gateway for Epic & Cerner Sync',
      challenge: 'Disparate hospital EHR formats created data bottlenecks and delayed partner onboarding by months.',
      solution: 'Engineered a SMART on FHIR gateway with automated PHI de-identification and real-time clinical sync.',
      metrics: [
        { label: 'Faster Onboarding', value: '85%' },
        { label: 'Audit Pass Rate', value: '100%' },
        { label: 'Daily PHI Records', value: '2M+' }
      ],
      tags: ['FHIR / HL7', 'SMART on FHIR', 'Python', 'AWS HealthLake', 'PostgreSQL'],
      architectureDetails: [
        'Bi-directional HL7 v2 to FHIR R4 transformation engine',
        'End-to-end KMS encryption & HIPAA audit logging on AWS HealthLake',
        'Automated synthetic test suites simulating 50+ hospital endpoints'
      ]
    },
    {
      id: 'trading-pipeline-acceleration',
      category: 'FinTech & Payments',
      client: 'Quantitative Asset Management Firm',
      title: 'Sub-Millisecond Market Feed Ingestion & Algorithmic Execution Engine',
      challenge: 'Ingestion pipelines struggled to process real-time market feeds across 14 exchanges without dropping frames.',
      solution: 'Architected a zero-copy Go and Rust event pipeline with clustered Redis cache and gRPC streams.',
      metrics: [
        { label: 'Throughput', value: '10x' },
        { label: 'Latency', value: '< 2ms' },
        { label: 'Dropped Frames', value: '0' }
      ],
      tags: ['Rust', 'Go', 'gRPC', 'Redis', 'WebSockets', 'Low Latency'],
      architectureDetails: [
        'Zero-allocation memory layout in Rust for wire-speed parsing',
        'Kernel bypass networking (DPDK) on bare-metal compute instances',
        'Sub-microsecond order validation engine with lockless ring buffers'
      ]
    },
    {
      id: 'saas-monolith-modernization',
      category: 'SaaS Modernization',
      client: 'B2B Workforce Platform (1M+ MAU)',
      title: 'Zero-Downtime Strangler Fig Migration to Microservices on Kubernetes',
      challenge: 'Monolithic codebase caused 45-minute CI build times, frequent rollbacks, and tight database coupling.',
      solution: 'Executed a phased Strangler Fig migration to decoupled TypeScript/Go microservices on Amazon EKS via ArgoCD.',
      metrics: [
        { label: 'Build Time', value: '-80%' },
        { label: 'Deploy Speed', value: '4x' },
        { label: 'Downtime', value: '0 hrs' }
      ],
      tags: ['Strangler Fig', 'Kubernetes', 'TypeScript', 'ArgoCD', 'PostgreSQL'],
      architectureDetails: [
        'Traffic routing split via Istio Service Mesh with dark launching',
        'CDC (Change Data Capture) database sync using Debezium',
        'GitOps deployment pipelines with automated blue/green rollbacks'
      ]
    },
    {
      id: 'genai-rag-search-pipeline',
      category: 'AI & Data Systems',
      client: 'Enterprise Legal Tech Platform',
      title: 'Hybrid Vector Search & RAG System for 10M+ Legal Documents',
      challenge: 'Manual contract discovery required hundreds of attorney hours across millions of unindexed legal filings.',
      solution: 'Built a high-performance RAG pipeline combining Qdrant vector database, OpenAI embeddings, and hybrid reranking.',
      metrics: [
        { label: 'Precision', value: '92%' },
        { label: 'Time Saved', value: '90%' },
        { label: 'Indexed Items', value: '10M+' }
      ],
      tags: ['GenAI / RAG', 'Qdrant', 'OpenAI', 'Python', 'FastAPI', 'LangChain'],
      architectureDetails: [
        'Hybrid dense/sparse vector search with Cross-Encoder reranking',
        'SOC2 Type II data isolation with zero data retention policies',
        'Sub-500ms streaming generation response time via async FastAPI'
      ]
    },
    {
      id: 'headless-ecommerce-replatform',
      category: 'Cloud & DevOps',
      client: 'Global Apparel Brand ($500M GMV)',
      title: 'Sub-Second Headless Composable Storefront on Next.js & Cloudflare Edge',
      challenge: 'Legacy e-commerce engine had slow mobile load times (LCP > 4.5s) causing high checkout drop-offs.',
      solution: 'Built a composable storefront using Next.js 14, Shopify Plus, Sanity CMS, and global edge caching.',
      metrics: [
        { label: 'Conversion', value: '+62%' },
        { label: 'LCP Speed', value: '0.9s' },
        { label: 'Lighthouse', value: '99/100' }
      ],
      tags: ['Next.js', 'Shopify Plus', 'Sanity.io', 'Tailwind CSS', 'Cloudflare Edge'],
      architectureDetails: [
        'Global edge cache rendering with Cloudflare Workers',
        'Optimistic cart mutations with zero UI layout shift',
        'Granular revalidation on product catalog updates under 200ms'
      ]
    }
  ];

  const filteredStudies = activeCategory === 'All'
    ? caseStudies
    : caseStudies.filter(s => s.category === activeCategory);

  return (
    <div className="py-12 space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-500">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800 dark:text-slate-200">Case Studies</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>Proven Engineering Impact</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Case studies &{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                proven outcomes.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              See how Zangle de-risks architectures, cuts tech debt, and accelerates enterprise delivery. Flip any study for the exact architectural blueprint.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Discuss Your Architecture
                </Button>
              </Link>
              <Link to="/hire-talent">
                <Button variant="outline" size="lg">
                  Hire Engineering Squads
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-white dark:bg-zangle-card text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Case Studies Grid with 3D Flip Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study, ri) => (
            <Reveal key={study.id} delay={Math.min(ri, 6) * 0.06} className="h-full">
              <FlipCard3D
                height="min-h-[480px] h-[480px]"
                hintText="Flip for architecture blueprint"
                front={
                  <div className="flex flex-col justify-between h-full">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="cyan" size="xs">
                          {study.category}
                        </Badge>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {study.client}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-2 line-clamp-2">
                          {study.title}
                        </h3>
                        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          <div>
                            <strong className="text-slate-900 dark:text-slate-100 font-semibold">Challenge: </strong>
                            <span className="line-clamp-2">{study.challenge}</span>
                          </div>
                          <div>
                            <strong className="text-slate-900 dark:text-slate-100 font-semibold">Solution: </strong>
                            <span className="line-clamp-2">{study.solution}</span>
                          </div>
                        </div>
                      </div>

                      {/* Dark Outcomes Bar */}
                      <div className="p-3 rounded-2xl bg-[#111315] border border-slate-800 grid grid-cols-3 gap-2">
                        {study.metrics.map((m, idx) => (
                          <div key={idx} className="space-y-0.5 text-center sm:text-left">
                            <div className="text-sm sm:text-base font-bold font-mono text-cyan-400">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {study.tags.slice(0, 5).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-mono text-[11px]">Production Verified</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-1">
                        Flip for architecture <ArrowRight className="w-3 h-3" />
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
                            SYSTEM ARCHITECTURE BLUEPRINT
                          </span>
                          <h4 className="text-xs font-bold text-white">
                            {study.client}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {study.category}
                        </span>
                      </div>

                      <div className="space-y-2.5 my-3">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold flex items-center gap-1">
                          <Zap className="w-3 h-3 text-cyan-400" /> Key Architectural Innovations:
                        </span>
                        {study.architectureDetails.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{detail}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Deployed with Zangle Squad
                        </span>
                        <span className="text-cyan-400 font-bold">14-Day Trial</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                      <Link
                        to="/contact"
                        className="w-full py-2 px-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs text-center transition-colors inline-flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/25"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Request Blueprint Review
                      </Link>
                    </div>
                  </div>
                }
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#111827] to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            START YOUR SUCCESS STORY
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to architect your high-impact transformation?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Schedule a technical blueprint consultation with our principal architects today.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Book Architectural Review
              </Button>
            </Link>
            <Link to="/hire-talent">
              <Button variant="outline" size="lg">
                Hire Dedicated Pods
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;
