import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  ShieldCheck,
  Activity,
  FileCheck2,
  Lock,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Database,
  Layers,
  Cpu,
  Video
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const HealthcarePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: '100%', label: 'HIPAA & HITECH compliance audit pass rate' },
    { value: '< 200ms', label: 'FHIR / HL7 payload processing latency' },
    { value: '5M+', label: 'Protected health records (PHI) secured' },
    { value: '0', label: 'Data breaches across deployed health architectures' }
  ];

  const capabilities = [
    {
      id: '01',
      title: 'FHIR & HL7 Interoperability',
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      desc: 'Connecting EHRs like Epic, Cerner, and Athenahealth with SMART on FHIR and HL7 APIs.'
    },
    {
      id: '02',
      title: 'HIPAA-Compliant Cloud Architecture',
      icon: <Lock className="w-5 h-5 text-cyan-400" />,
      desc: 'BAA-backed AWS and Azure infrastructure with KMS encryption, isolated VPCs, and audit logging.'
    },
    {
      id: '03',
      title: 'Telehealth & Remote Care Platforms',
      icon: <Video className="w-5 h-5 text-blue-400" />,
      desc: 'WebRTC video consultations, secure asynchronous chat, and medical device telemetry bridges.'
    },
    {
      id: '04',
      title: 'Clinical Data Warehousing & Analytics',
      icon: <Database className="w-5 h-5 text-indigo-400" />,
      desc: 'Centralizing clinical data into OMOP CDM and Snowflake health data lakes for analytics.'
    },
    {
      id: '05',
      title: 'Medical Imaging (DICOM/PACS) Solutions',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      desc: 'Cloud-native DICOM web viewers, PACS migrations, and AI radiological inference pipelines.'
    },
    {
      id: '06',
      title: 'FDA SaMD & ISO 13485 Support',
      icon: <FileCheck2 className="w-5 h-5 text-rose-400" />,
      desc: 'Software development aligned with FDA Class I/II SaMD, IEC 62304, and ISO 14971 standards.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Compliance & BAA Mapping',
      desc: 'Conduct HIPAA gap assessments, sign BAAs, and establish PHI data classification protocols.'
    },
    {
      num: '02',
      title: 'EHR & FHIR Modeling',
      desc: 'Map clinical models to FHIR R4 resources and establish SMART on FHIR authorization scopes.'
    },
    {
      num: '03',
      title: 'Encrypted Pipeline Dev',
      desc: 'Engineer zero-trust APIs, encrypted queues, and automated audit trails for all data in transit.'
    },
    {
      num: '04',
      title: 'Pen-Testing & QA',
      desc: 'Conduct independent HIPAA audits, penetration tests, and vulnerability remediation.'
    },
    {
      num: '05',
      title: 'Clinical Deployment',
      desc: 'Deploy to BAA-covered infrastructure with 24/7 SIEM monitoring and audit logging.'
    }
  ];

  const techStack = [
    'HL7 / FHIR', 'SMART on FHIR', 'Epic API', 'Cerner API', 'Athenahealth',
    'AWS HealthLake', 'Azure Health Data', 'WebRTC', 'DICOM / PACS',
    'Snowflake Healthcare', 'Docker', 'Kubernetes', 'PostgreSQL',
    'HashiCorp Vault', 'OAuth2 / OIDC', 'Terraform'
  ];

  const faqs = [
    {
      q: 'How do you guarantee HIPAA compliance for our software and infrastructure?',
      a: 'We sign BAAs with cloud providers, enforce AES-256 and TLS 1.3 encryption, maintain immutable access logs, and implement strict RBAC controls.'
    },
    {
      q: 'Can you integrate our custom platform with hospital EHR systems like Epic and Cerner?',
      a: 'Yes. We build compliant integration layers using SMART on FHIR and HL7 v2/v3 interfaces for bi-directional patient data sync.'
    },
    {
      q: 'What is your experience with FDA Software as a Medical Device (SaMD) requirements?',
      a: 'We guide teams through IEC 62304 lifecycle processes, ISO 14971 risk management, and documentation needed for FDA 510(k) clearances.'
    },
    {
      q: 'How do you manage Protected Health Information (PHI) during development and testing?',
      a: 'We never use live PHI in development or QA. We generate synthetic patient datasets and automated masking tools to prevent compliance exposure.'
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
            <span className="text-slate-800 dark:text-slate-200">Healthcare IT Solutions</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Industry · HealthTech & Life Sciences</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              HIPAA-compliant healthcare IT &{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 bg-clip-text text-transparent">
                biomedical software.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              EHR integrations, FHIR/HL7 data pipelines, HIPAA-compliant cloud architectures, telehealth platforms, and FDA Software as a Medical Device (SaMD) validation.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore HealthTech Solutions
                </Button>
              </Link>
              <Link to="/hire-talent">
                <Button variant="outline" size="lg">
                  Hire HealthTech Engineers
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
              HEALTHCARE ENGINEERING
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Bridge medical interoperability and strict regulatory compliance.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Healthcare data demands the highest security, privacy, and uptime guarantees. We build interoperable FHIR pipelines, HIPAA-compliant telehealth applications, and cloud data platforms that empower clinicians and protect patient data.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Seamless SMART on FHIR integration with Epic, Cerner, and Athenahealth',
                'Zero-trust cloud security postures with signed BAAs on AWS and Azure',
                'Real-time low-latency telehealth video & remote patient monitoring (RPM)',
                'Audit-ready SDLC aligned with FDA 510(k) and IEC 62304 standards'
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
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      HIPAA / HITECH Standard
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      End-to-End PHI Encryption
                    </span>
                  </div>
                </div>
                <Badge variant="emerald" size="xs">
                  COMPLIANT
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Audit Pass Rate</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">&lt; 200ms</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">FHIR API Latency</div>
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
            HealthTech & clinical software practices.
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
            DELIVERY PROCESS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How we engineer compliant healthcare solutions.
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
              HEALTHTECH STACK
            </Badge>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Clinical protocols & healthcare cloud ecosystems.
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
            Healthcare IT Solutions FAQ
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
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            SECURE PHI DATA
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to build HIPAA-compliant healthcare software?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Consult with our HealthTech practice leads to plan your FHIR integration, EHR connector, or clinical cloud deployment.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Book HealthTech Consultation
              </Button>
            </Link>
            <Link to="/hire-talent">
              <Button variant="outline" size="lg">
                Hire HealthTech Engineers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
