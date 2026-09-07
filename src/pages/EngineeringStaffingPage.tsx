import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Layers,
  Code2,
  Wrench,
  Cog,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Radio,
  Server,
  Terminal,
  Compass
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const EngineeringStaffingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: '48-72h', label: 'Average candidate shortlist turnaround' },
    { value: '98.4%', label: 'Technical interview-to-offer ratio' },
    { value: '100%', label: 'IP protection & NDA secured talent' },
    { value: '14-Day', label: 'Zero-risk trial guarantee on contract staff' }
  ];

  const engineeringDisciplines = [
    {
      id: '01',
      title: 'Embedded Systems & Firmware',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      desc: 'C/C++, Rust, FreeRTOS, Zephyr, ARM Cortex, and low-level peripheral driver development.'
    },
    {
      id: '02',
      title: 'Hardware & PCB Architecture',
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      desc: 'High-speed PCB layout, Altium schematic design, FPGA (Verilog/VHDL), and signal integrity.'
    },
    {
      id: '03',
      title: 'Robotics, IoT & Automation',
      icon: <Cog className="w-5 h-5 text-emerald-400" />,
      desc: 'ROS2, motion planning, sensor fusion (LiDAR/cameras), industrial PLCs, and edge AI.'
    },
    {
      id: '04',
      title: 'Systems & Reliability Engineering',
      icon: <Radio className="w-5 h-5 text-amber-400" />,
      desc: 'Hardware-in-the-loop (HIL) testing, EMC/EMI compliance, and thermal/stress simulations.'
    },
    {
      id: '05',
      title: 'Mechanical & Mechatronics Design',
      icon: <Wrench className="w-5 h-5 text-purple-400" />,
      desc: 'SolidWorks, CAD/CAM, structural FEA, precision mechanisms, and rapid additive prototyping.'
    }
  ];

  const processStages = [
    {
      num: '01',
      title: 'Needs & Spec Analysis',
      desc: 'Discover hardware constraints, EDA tools, RTOS preferences, and milestones.'
    },
    {
      num: '02',
      title: 'Portfolio & Lab Vetting',
      desc: 'Evaluate schematic samples, code repos, timing closure, and physical builds.'
    },
    {
      num: '03',
      title: 'Shortlist in 48 Hours',
      desc: 'Deliver 2-3 interview-ready engineers with verified skill matrices.'
    },
    {
      num: '04',
      title: 'Client Technical Review',
      desc: 'Live technical interviews and practical design challenges facilitated.'
    },
    {
      num: '05',
      title: 'Onboarding & 14-Day Trial',
      desc: 'Seamless equipment provisioning, compliance, and guaranteed trial.'
    }
  ];

  const techPills = [
    'Embedded C/C++',
    'Rust for Embedded',
    'FreeRTOS / Zephyr',
    'ARM Cortex-M/A',
    'Altium Designer',
    'Verilog / VHDL',
    'FPGA (Xilinx / Altera)',
    'ROS / ROS2',
    'SolidWorks',
    'Signal Integrity (SI/PI)',
    'BLE / Zigbee / LoRa',
    'Hardware-in-the-Loop (HIL)',
    'EMC / EMI Compliance',
    'Edge AI / Jetson'
  ];

  const faqs = [
    {
      q: 'What engagement models do you support for engineering talent?',
      a: 'We offer Contract Staff Augmentation (hourly), Contract-to-Hire (3-6 month trial to FTE), and Direct Placement with guarantee periods.'
    },
    {
      q: 'How do you verify hardware and embedded engineering credentials?',
      a: 'Our vetting is led by veteran hardware architects reviewing past silicon tape-outs, PCB layout samples, Git repositories, and system design.'
    },
    {
      q: 'Can you provide cleared engineers for aerospace and defense projects?',
      a: 'Yes. We maintain a talent bench of US citizens with active Security Clearances (Secret / Top Secret / SCI) and ITAR eligibility.'
    },
    {
      q: 'How fast can an engineering consultant join our lab or project?',
      a: 'Pre-vetted engineers onboard within 3 to 7 business days depending on background checks and hardware provisioning.'
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
            <span className="text-slate-800 dark:text-slate-200">Engineering Staffing</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>Specialized Hardware & Systems Talent</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Elite embedded, hardware &{' '}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                robotics engineering talent.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              From bare-metal firmware to complex high-speed PCB layouts and robotic automation, Zangle Technologies supplies battle-tested engineers who accelerate your hardware and physical tech milestones.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/hire-talent">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Request Engineering Talent
                </Button>
              </Link>
              <Link to="/talent-bench">
                <Button variant="outline" size="lg">
                  Browse Engineering Bench
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

      {/* Disciplines Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            PRACTICE SPECIALIZATIONS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Comprehensive engineering disciplines.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringDisciplines.map((d, _i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(_i, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-cyan-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {d.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{d.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
                {d.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5-Stage Vetting Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
            DELIVERY LIFECYCLE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            5-Stage technical vetting & deployment.
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

      {/* Tech Stack Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-10 text-white">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-2">
              Core Engineering Stack & Tooling
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Verified proficiency across standard EDA tools, RTOS kernels, communication protocols, and testing suites.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {techPills.map((pill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300 hover:border-cyan-500/50 transition-colors"
              >
                {pill}
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
            Engineering Staffing FAQ
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
            SCHEDULE A TECHNICAL SCOPING CALL
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to hire specialized engineering talent?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Receive matched, pre-screened engineering candidates within 48-72 hours backed by our 14-day zero-risk trial.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/hire-talent">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Request Engineering Talent
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Speak With A Technical Recruiter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
