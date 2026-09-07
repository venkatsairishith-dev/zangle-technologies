import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  LineChart,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Terminal,
  Zap,
  TrendingUp,
  ShieldCheck,
  Boxes,
  Workflow,
  BarChart3,
  Brain,
  Users
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const DataAnalysisPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: 'Single', label: 'Source of truth — one governed set of definitions teams can act on' },
    { value: '3×', label: 'Faster reporting, as modeled pipelines replace manual spreadsheet wrangling' },
    { value: 'Self-serve', label: 'Analytics adoption, so business teams answer their own questions' }
  ];

  const capabilities = [
    {
      id: '01',
      title: 'Data platform & lakehouse',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      desc: 'A scalable lakehouse on Snowflake, Databricks or BigQuery that unifies raw, refined and curated layers — built to separate storage from compute so cost scales with use, not headcount.'
    },
    {
      id: '02',
      title: 'Pipelines & integration',
      icon: <Workflow className="w-5 h-5 text-cyan-400" />,
      desc: 'Batch and streaming ingestion from databases, SaaS APIs and event streams, orchestrated in Airflow and modeled in dbt — with retries, alerting and tests so loads stay reliable as sources change.'
    },
    {
      id: '03',
      title: 'Governance & data quality',
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      desc: 'Catalogs, lineage, access policies and automated quality checks that make trust the default — so analysts know where a number came from and stewards can prove the data is fit to use.'
    },
    {
      id: '04',
      title: 'BI & visualization',
      icon: <BarChart3 className="w-5 h-5 text-indigo-400" />,
      desc: 'Governed semantic models and dashboards in Power BI, Tableau or Looker — designed around the questions executives actually ask, with consistent definitions behind every metric.'
    },
    {
      id: '05',
      title: 'Decision intelligence & ML',
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      desc: 'Forecasting, segmentation and predictive models, productionized with monitoring and tied to the decisions they inform — so insight becomes action, not another report.'
    },
    {
      id: '06',
      title: 'Data enablement & literacy',
      icon: <Users className="w-5 h-5 text-amber-400" />,
      desc: 'Operating models, ownership and training that turn a platform into a habit — so teams can find, trust and use data without waiting on a central queue.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Discover & assess',
      desc: 'Map your sources, use cases and pain points, then agree the metrics that matter and a pragmatic target architecture.'
    },
    {
      num: '02',
      title: 'Platform & lakehouse',
      desc: 'Stand up the lakehouse, environments and access model on your chosen cloud, with cost and security baked in from day one.'
    },
    {
      num: '03',
      title: 'Pipelines & integration',
      desc: 'Build and orchestrate the ingestion and transformation pipelines that bring trusted, modeled data into one place.'
    },
    {
      num: '04',
      title: 'Govern & secure',
      desc: 'Add catalog, lineage, quality tests and role-based access so the platform is trustworthy and auditable as it scales.'
    },
    {
      num: '05',
      title: 'Activate (BI & ML)',
      desc: 'Ship dashboards, semantic models and ML use cases, then enable your teams to run and extend them with confidence.'
    }
  ];

  const techStack = [
    'Snowflake', 'Databricks', 'BigQuery', 'dbt', 'Apache Airflow', 'Apache Kafka',
    'Apache Spark', 'Power BI', 'Tableau', 'Looker', 'Python', 'SQL'
  ];

  const faqs = [
    {
      q: 'Lakehouse or data warehouse — which do you build?',
      a: 'Whichever fits the problem. A cloud warehouse is often ideal for structured BI; a lakehouse shines when you also need semi-structured data, streaming and ML on one platform. We recommend based on your workloads and existing cloud, not a fixed preference.'
    },
    {
      q: 'How do you ensure data quality and governance?',
      a: 'We treat quality as code: automated tests on freshness, volume and validity run with every pipeline, paired with a catalog, column-level lineage and role-based access. Issues are caught and alerted before they reach a dashboard, and every metric is traceable to its source.'
    },
    {
      q: 'Do you build machine-learning models too?',
      a: 'Yes — forecasting, segmentation, churn and anomaly detection are common. We focus on use cases tied to a clear decision, then productionize them with monitoring and retraining so they keep earning their place rather than becoming shelfware.'
    },
    {
      q: 'Which BI tools do you work with?',
      a: 'Mainly Power BI, Tableau and Looker. If you already have a standard, we build on it; if you are choosing, we help you pick based on your stack, licensing and how self-serve you want analysts to be — always on top of a governed semantic layer.'
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
            <span className="text-slate-800 dark:text-slate-200">Data Analysis</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Service · Data Analysis</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Data decisions your team{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 bg-clip-text text-transparent">
                can defend.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Turn fragmented data into trusted platforms, governed reporting and decision intelligence that executives can use with confidence.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Assess your data
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
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
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
              From fragmented data to confident decisions.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              In most organizations the data already exists — it is just trapped in silos. Spreadsheets, SaaS exports, an aging warehouse and a dozen operational systems each tell a slightly different story, so reporting is slow and leaders learn to distrust the numbers they are handed. Zangle engineers a modern lakehouse foundation, wraps it in governance and data-quality controls, and exposes it through self-serve analytics — so every team works from one trusted source of truth.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Modern data platforms and lakehouse engineering',
                'Governed, reliable pipelines and data quality',
                'Self-serve BI and decision intelligence'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Representative engagement
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      Multi-region retailer
                    </span>
                  </div>
                </div>
                <Badge variant="emerald" size="xs">
                  VALIDATED
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Single</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Trusted view across POS, e-commerce and inventory</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">3&times;</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Faster reporting on a schedule</div>
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
            Six capabilities, one connected data practice.
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
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-emerald-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {c.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{c.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">
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
            How a data engagement runs.
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
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-emerald-500/20">
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
              TECH WE WORK WITH
            </Badge>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              A modern, open data stack — chosen to fit your cloud and team.
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
            Data & analytics FAQ.
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
                    <ChevronUp className="w-5 h-5 text-emerald-500 shrink-0" />
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
            DATA ANALYSIS
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Turn your data into a decision advantage.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Trusted platforms, governed reporting and decision intelligence — built so every team works from one source of truth.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                View services
              </Button>
            </Link>
            <Link to="/hire-talent">
              <Button variant="outline" size="lg">
                Hire data engineers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
