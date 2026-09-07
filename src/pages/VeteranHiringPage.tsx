import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Users,
  Compass,
  Zap,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Radio,
  Lock,
  Flag,
  Target
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const VeteranHiringPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: '100%', label: 'Active or transferable US clearance vetting' },
    { value: '96.2%', label: 'Long-term enterprise retention rate' },
    { value: '48-72h', label: 'Candidate presentation timeline' },
    { value: 'DOD', label: 'SkillBridge & Transition Partner aligned' }
  ];

  const veteranPrograms = [
    {
      id: '01',
      title: 'Cybersecurity & InfoSec',
      icon: <Lock className="w-5 h-5 text-cyan-400" />,
      desc: 'DoD 8570 compliant SOC analysts, incident response leads, penetration testers, and Zero-Trust architects.'
    },
    {
      id: '02',
      title: 'Defense Cloud & DevSecOps',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      desc: 'AWS GovCloud, Azure Government, DISA STIG hardened Kubernetes, and secure automated CI/CD pipelines.'
    },
    {
      id: '03',
      title: 'Network & Satellite Comms',
      icon: <Radio className="w-5 h-5 text-emerald-400" />,
      desc: 'SATCOM, tactical wireless networks, fiber backbones, microwave comms, and resilient mesh routing.'
    },
    {
      id: '04',
      title: 'Systems & Hardware Maintenance',
      icon: <Compass className="w-5 h-5 text-amber-400" />,
      desc: 'Mission-critical hardware deployment, ruggedized server environments, and precision avionics maintenance.'
    },
    {
      id: '05',
      title: 'Technical Program Leadership',
      icon: <Target className="w-5 h-5 text-purple-400" />,
      desc: 'Military officers and NCOs skilled in agile program management, risk mitigation, and cross-functional leadership.'
    }
  ];

  const processStages = [
    {
      num: '01',
      title: 'Role & Clearance Check',
      desc: 'Map technical requirements and clearance tiers (Secret, TS/SCI, Polygraph, Public Trust).'
    },
    {
      num: '02',
      title: 'MOS / AFSC Translation',
      desc: 'Translate military occupational specialties directly into corporate enterprise tech roles.'
    },
    {
      num: '03',
      title: 'Shortlist in 48-72h',
      desc: 'Deliver 2-3 interview-ready cleared veteran engineers with verified military service records.'
    },
    {
      num: '04',
      title: 'Client Technical Review',
      desc: 'Facilitate interviews with structured resume briefing sheets and technical references.'
    },
    {
      num: '05',
      title: 'Onboarding & 14-Day Trial',
      desc: 'Civilian transition onboarding supported by our standard zero-risk 14-day trial guarantee.'
    }
  ];

  const badges = [
    'Secret Clearance',
    'Top Secret / SCI',
    'DoD 8570.01-M Compliant',
    'CompTIA Security+ / CySA+',
    'CISSP Certified',
    'AWS GovCloud',
    'Azure Government',
    'DISA STIG Hardening',
    'NIST 800-53 / 800-171',
    'CMMC 2.0 Ready',
    'Tactical SATCOM',
    'Zero-Trust Architecture'
  ];

  const faqs = [
    {
      q: 'Why hire military veterans through Zangle?',
      a: 'Veterans bring disciplined leadership, crisis adaptability, and specialized security expertise—often with active DoD clearances.'
    },
    {
      q: 'What security clearances do veteran candidates hold?',
      a: 'Our network includes verified Secret, Top Secret, TS/SCI, and Polygraph clearances ready for immediate deployment.'
    },
    {
      q: 'Are veteran placements backed by guarantees?',
      a: 'Yes. Contract hires include our 14-day zero-risk trial, and direct placements carry full replacement guarantees.'
    },
    {
      q: 'How do you support veterans transitioning to civilian tech?',
      a: 'We provide MOS translation, technical interview prep, mentorship, and direct connections to enterprise employers.'
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
            <Link to="/hire-talent" className="hover:text-cyan-500">Staffing</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800 dark:text-slate-200">Veteran Hiring</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>Honoring Service • Delivering Technical Excellence</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Connect with cleared, mission-driven{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                military veteran tech talent.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Empower your enterprise with battle-tested cyber operators, cloud architects, and systems engineers who bring unmatched discipline, leadership, and active security clearances.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/hire-talent">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Hire Cleared Veteran Talent
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Join Veteran Network
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

      {/* Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            VETERAN SPECIALIZATIONS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            High-demand disciplines for cleared veterans.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {veteranPrograms.map((p, _i) => (
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

      {/* 5-Stage Vetting Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            TRANSITION & PLACEMENT
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Structured 5-stage veteran onboarding pipeline.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {processStages.map((stage, _i) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(_i, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-cyan-500/20">
                  {stage.num}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {stage.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Clearance & Compliance Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-10 text-white">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-2">
              Clearances, Standards & Defense Accreditations
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Our veteran engineers hold verified DoD credentials, security clearances, and compliance certifications.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300 hover:border-cyan-500/50 transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Veteran Hiring FAQ
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

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            SUPPORT VETERAN CAREERS
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to hire cleared veteran engineers?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Get connected with disciplined, cleared veteran talent for your mission-critical defense and enterprise initiatives.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/hire-talent">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Request Cleared Talent
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Talk to Veteran Program Lead
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
