import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  HeartPulse,
  Microscope,
  FileCheck2,
  Stethoscope,
  Database,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Users,
  Award
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ClinicalStaffingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: '99.2%', label: 'Credentialing pass rate' },
    { value: '48-72h', label: 'Target shortlist delivery' },
    { value: '100%', label: 'GxP & HIPAA compliance checked' },
    { value: '95%', label: 'Placement retention rate' }
  ];

  const roleCategories = [
    {
      id: '01',
      title: 'Clinical Research & Operations',
      icon: <Activity className="w-5 h-5 text-cyan-400" />,
      desc: 'CRAs, Clinical Trial Managers (CTMs), Project Managers, and Study Coordinators.'
    },
    {
      id: '02',
      title: 'Biostatistics & Data Management',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      desc: 'SAS/R programmers, principal biostatisticians, CDISC/SDTM analysts, and data managers.'
    },
    {
      id: '03',
      title: 'Regulatory Affairs & QA',
      icon: <FileCheck2 className="w-5 h-5 text-blue-400" />,
      desc: 'Regulatory strategists, FDA/EMA eCTD submission specialists, and QA compliance auditors.'
    },
    {
      id: '04',
      title: 'Health Informatics & EHR',
      icon: <HeartPulse className="w-5 h-5 text-indigo-400" />,
      desc: 'Epic, Cerner, and MEDITECH analysts, HL7/FHIR engineers, and workflow consultants.'
    },
    {
      id: '05',
      title: 'Medical Affairs & Drug Safety',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      desc: 'Pharmacovigilance scientists, drug safety associates, and Medical Science Liaisons (MSLs).'
    },
    {
      id: '06',
      title: 'Laboratory & Life Sciences',
      icon: <Microscope className="w-5 h-5 text-purple-400" />,
      desc: 'Molecular biologists, assay scientists, QC analysts, and GLP/GMP laboratory managers.'
    }
  ];

  const credentialingPillars = [
    {
      title: 'Board & License Verification',
      desc: 'Primary-source verification of medical licenses, NPI records, DEA numbers, and board credentials.'
    },
    {
      title: 'Regulatory & GxP Compliance',
      desc: 'Screening for compliance with FDA 21 CFR Part 11, ICH GCP E6(R2), HIPAA, and CAP/CLIA.'
    },
    {
      title: 'Protocol & Therapeutic Fit',
      desc: 'Evaluation across oncology, immunology, neurology, gene therapy, and rare diseases.'
    },
    {
      title: 'Continuous Quality Monitoring',
      desc: 'Regular sponsor feedback and performance reviews to maintain trial audit-readiness.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Protocol Intake',
      desc: 'Analyze trial protocols, timelines, regulatory scope, and therapeutic requirements.'
    },
    {
      num: '02',
      title: 'Talent Matching',
      desc: 'Source from our credentialed network of life sciences and clinical experts.'
    },
    {
      num: '03',
      title: 'Credential Audit',
      desc: '100% primary source verification, OIG/GSA exclusions, and reference checks.'
    },
    {
      num: '04',
      title: 'Shortlist in 48-72h',
      desc: 'Delivered with qualification dossiers, compliance checklists, and availability.'
    },
    {
      num: '05',
      title: 'Deployment & Support',
      desc: 'Seamless onboarding with ongoing compliance governance throughout the trial.'
    }
  ];

  const faqs = [
    {
      q: 'What types of life sciences organizations do you staff for?',
      a: 'We staff biopharma firms, biotech startups, CROs, medical device manufacturers, health systems, and diagnostic labs.'
    },
    {
      q: 'How does Zangle handle primary-source credentialing?',
      a: 'Our credentialing team validates medical licenses, degrees, ACRP/CCRP certifications, and DEA registrations against OIG/SAM databases.'
    },
    {
      q: 'Can you provide talent for sudden clinical trial scale-ups or site rescue?',
      a: 'Yes. We maintain an active bench of credentialed CRAs and data managers ready for immediate deployment on trial rescue operations.'
    },
    {
      q: 'What engagement models do you offer for clinical staffing?',
      a: 'We offer Contract Staffing (phase-specific labor), Contract-to-Hire (trial-to-perm), and Direct Placement for specialized scientists.'
    }
  ];

  return (
    <div className="py-12 space-y-16">
      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
            <Link to="/" className="hover:text-cyan-500">Home</Link>
            <span className="mx-2">/</span>
            <span>Staffing</span>
            <span className="mx-2">/</span>
            <span className="text-slate-800 dark:text-slate-200">Clinical & Scientific</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>Staffing · Clinical & Scientific</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Clinical & scientific talent,{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                thoroughly credentialed.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Direct placement, contract staffing, and dedicated teams for life sciences, clinical trials, medical devices, health systems, and biopharma organizations.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/hire-talent">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Request talent
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

      {/* OVERVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <Badge variant="cyan" size="xs">
              CLINICAL & REGULATORY RIGOR
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Healthcare and life sciences talent that meets regulatory standards.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Clinical milestones cannot wait for credentialing setbacks or compliance oversights. We place specialized professionals who are pre-screened for GxP, HIPAA, and FDA guidelines, ensuring immediate impact on trial execution and research velocity.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Primary-source verification of all medical, nursing, and clinical certifications',
                'Comprehensive experience audits across FDA 21 CFR Part 11 and ICH GCP',
                'Fast deployment for trial site expansion, monitoring, and data locks',
                'Zero-friction compliance onboarding and background verification'
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
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      100% Audit-Ready Verification
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      Standard across all submissions
                    </span>
                  </div>
                </div>
                <Badge variant="emerald" size="xs">
                  VERIFIED
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {credentialingPillars.map((p, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                      {p.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROLES WE PLACE (6 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            SPECIALIZED DISCIPLINES
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Clinical and life sciences roles we place.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleCategories.map((cat, _i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(_i, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {cat.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{cat.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW OUR CLINICAL STAFFING WORKS (5 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            DELIVERY WORKFLOW
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How our clinical staffing works.
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

      {/* CLINICAL FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            COMMON QUESTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Clinical Staffing FAQ
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
            CREDENTIALED TALENT
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to accelerate your clinical and life sciences projects?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Contact our specialized life sciences recruitment practice today. We provide verified, audit-ready clinical talent shortlists in 48-72 hours.
          </p>
          <div className="pt-2">
            <Link to="/hire-talent">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Request Clinical Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
