import { Reveal } from '../components/common/Reveal';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Code2,
  Search,
  MessageSquare,
  ShieldCheck,
  Clock,
  MapPin,
  ExternalLink,
  Sparkles,
  Send,
  Linkedin
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SectionHeader } from '../components/common/SectionHeader';
import { Field, fieldControlClass } from '../components/common/Field';

export const HomePage: React.FC = () => {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  // Hero panel content.
  //
  // This used to be a mock shortlist of four named candidates with match
  // percentages and availability. None of it was real, and a fabricated
  // candidate record is not a placeholder -- it reads as live data from a
  // system that does not exist. Replaced with the delivery process, which is
  // the same three steps stated further down the page and is something the
  // company can actually stand behind.
  const deliveryTimeline = [
    {
      step: '01',
      tag: 'Technical intake',
      title: 'Clarify the requirement',
      detail: 'A 30-minute discovery session on your stack, seniority thresholds and delivery milestones.'
    },
    {
      step: '02',
      tag: 'Hands-on code audit',
      title: 'Vet for real skill',
      detail: 'Evaluations run by former architects against production code and system design, not keyword matching.'
    },
    {
      step: '03',
      tag: '48h shortlist',
      title: 'Deliver 2-3 engineers',
      detail: 'Interview-ready, with verified scorecards, direct scheduling links and transparent rate cards.'
    }
  ];

  // 3 Requirement Cards for "Our Mission" Section
  const missionCards = [
    {
      icon: <Search className="w-6 h-6 text-cyan-400" />,
      title: 'Understand the requirement',
      description:
        'We begin with the business need, role context, technical environment and the outcome the team is trying to reach.'
    },
    {
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      title: 'Match skilled engineers',
      description:
        'We focus on engineers who understand modern software standards, tools, platforms, frameworks and technologies.'
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      title: 'Keep the process clean',
      description:
        'Clear communication, practical screening and concise next steps help teams move without noise or inflated claims.'
    }
  ];

  // 3 Service Models for "How We Help" Section
  const serviceModels = [
    {
      num: '01 · Staffing',
      title: 'IT Staffing',
      description:
        'Vetted technologists for contract, contract-to-hire and direct placement across IT, data, cloud, security and product — with full workforce, payroll and onboarding support.',
      deliverables: ['Contract, C2H & direct hire', 'Screening and onboarding coordination', 'Managed payroll & compliance'],
      path: '/services/it-staffing',
      linkLabel: 'Explore staffing'
    },
    {
      num: '02 · Consulting',
      title: 'Statement of Work',
      description:
        'Outcome-driven, fixed-scope projects across AI & intelligent automation, digital transformation, enterprise data & analytics, cloud and cybersecurity — owned end to end.',
      deliverables: ['AI & intelligent automation', 'Cloud transformation', 'Data, analytics & cybersecurity'],
      path: '/services/it-consulting',
      linkLabel: 'Explore SOW services'
    },
    {
      num: '03 · Engineering talent',
      title: 'Skilled Engineering Support',
      description:
        'Connect with engineers who understand the standards, tools, platforms and frameworks your team uses, with a process shaped around the requirement.',
      deliverables: ['Role and skill mapping', 'Candidate context and screening', 'Clear next-step coordination'],
      path: '/services',
      linkLabel: 'Explore services'
    }
  ];

  // 3 Process Steps for "How We Work" Section
  const processSteps = [
    {
      number: '01',
      title: 'Clarify the requirement',
      description: 'We learn the business need, technical environment, must-have skills and hiring timeline.'
    },
    {
      number: '02',
      title: 'Focus on skilled engineers',
      description: 'We look for engineers familiar with the standards, tools, platforms and frameworks your team uses.'
    },
    {
      number: '03',
      title: 'Keep communication direct',
      description: 'Candidate context, feedback and next steps stay concise so the process remains easy to manage.'
    }
  ];

  return (
    <div className="py-6 sm:py-10 space-y-24 sm:space-y-28">
      {/* =========================================================================
          SECTION 1: HERO SECTION
          "Skilled engineers for clear business needs." + Candidate Shortlist UI
         ========================================================================= */}
      <section className="relative pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Tag / Badge */}
              <motion.div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold tracking-wider"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span>STAFFING + TECHNOLOGY</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-2xl"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                Skilled engineers for{' '}
                <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                  clear business needs.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                Zangle helps teams clarify requirements, then connect with skilled engineers
                familiar with modern software standards, tools, platforms and frameworks.
              </motion.p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a href="#contact">
                  <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Hire Talent
                  </Button>
                </a>
                <a href="#contact">
                  <Button variant="outline" size="lg">
                    Deliver a Project
                  </Button>
                </a>
                <Link to="/careers">
                  <Button variant="outline" size="lg">
                    Find a Job
                  </Button>
                </Link>
              </div>

              {/* Key Highlights Checklist */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>Pre-screened senior engineers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>Shortlists in 48 hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>14-day zero-risk trial</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Candidate Shortlist Window */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-slate-900/95 dark:bg-slate-950 border border-slate-800 shadow-2xl p-5 sm:p-6 text-white">
                {/* Glow Backdrop */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

                {/* Window Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-xs font-mono font-bold tracking-wider text-slate-300">
                      HOW WE STAFF
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-semibold">
                    <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>48-hour shortlists</span>
                  </div>
                </div>

                {/* Target Role Context Banner */}
                <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 mb-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 block font-semibold uppercase">
                      ENGAGEMENT MODELS
                    </span>
                    <span className="font-bold text-white text-xs">
                      Contract · Contract-to-Hire · Direct
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    US / Remote
                  </span>
                </div>

                {/* Delivery Timeline */}
                <div className="relative space-y-2.5">
                  {deliveryTimeline.map((item, idx) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.5, delay: 0.12 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      className="relative p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-cyan-500/40 transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-mono font-bold text-[11px] text-white shadow-md">
                          {item.step}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <h4 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                              {item.title}
                            </h4>
                            <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-slate-900/80 text-cyan-300 border border-cyan-500/20">
                              {item.tag}
                            </span>
                          </div>
                          <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Profile Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    Senior Practice Lead Audited
                  </span>
                  <a
                    href="#contact"
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-0.5"
                  >
                    Request shortlist →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: COMPANY PROFILE & MISSION SECTION
          "Make staffing conversations clearer, cleaner and more useful from day one."
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile At A Glance Top Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-sm mb-16 sm:mb-20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Profile at a glance:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-slate-600 dark:text-slate-400">
            <div>
              <span className="text-slate-400 dark:text-slate-500 mr-1.5">Industry:</span>
              <strong className="text-slate-900 dark:text-slate-200 font-semibold">
                Staffing and Recruiting
              </strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 mr-1.5">Ownership:</span>
              <strong className="text-slate-900 dark:text-slate-200 font-semibold">
                Privately Held
              </strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 mr-1.5">Specialization:</span>
              <strong className="text-cyan-600 dark:text-cyan-400 font-semibold">
                Skilled Engineering Talent
              </strong>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <SectionHeader
          badge="OUR MISSION"
          badgeVariant="cyan"
          title="Make staffing conversations clearer, cleaner and more useful"
          gradientText="from day one."
        />

        {/* 3 Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionCards.map((card, idx) => (
            <Reveal key={idx} delay={Math.min(idx, 6) * 0.06} className="h-full">
              <div className="h-full p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HOW WE HELP (3 SERVICE MODELS)
          01 · STAFFING (IT Staffing), 02 · CONSULTING (SOW), 03 – ENGINEERING TALENT
         ========================================================================= */}
      <section className="py-12 bg-slate-50/50 dark:bg-zangle-dark/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="HOW WE HELP"
            badgeVariant="blue"
            title="Clear ways to work with"
            gradientText="Zangle."
            subtitle="Start with the business requirement. Zangle helps shape the role, identify the skill profile and connect you with capable engineering talent."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceModels.map((model, idx) => (
              <Reveal key={idx} delay={Math.min(idx, 6) * 0.06} className="h-full">
                <div className="h-full flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 tracking-wider">
                        {model.num}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">
                      {model.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {model.description}
                    </p>

                    <div className="space-y-2">
                      {model.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      to={model.path}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      {model.linkLabel} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HOW WE WORK (3 STEPS)
          "How we deliver the right engineering fit."
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="OUR PROCESS"
          badgeVariant="indigo"
          title="Simple, focused"
          gradientText="staffing support."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(idx, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-300"
            >
              {/* Top Step Number Badge */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono font-extrabold text-lg flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {step.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>

              {/* Bottom Subtle Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400">
                <span>Phase {step.number} Protocol</span>
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DARK GRADIENT CTA BANNER
          "Talent. Delivered. Built around your needs."
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-14 text-white text-center shadow-2xl space-y-6 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENGINEERING PARTNERSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Talent. Delivered.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Built around your needs.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Hire vetted technologists, scope an outcome-driven project, or stand up a managed delivery team — start with one clear requirement.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/services">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View services
              </Button>
            </Link>
            <a href="#contact">
              <Button
                variant="outline"
                size="lg"
                className="text-white border-slate-600 hover:bg-slate-800"
              >
                Contact our team
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: GET IN TOUCH (CONTACT SECTION & LEAD CAPTURE FORM)
          "Let's talk about your next hire or project."
         ========================================================================= */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <SectionHeader
          badge="GET IN TOUCH"
          badgeVariant="emerald"
          title="Let's talk about your next hire"
          gradientText="or project."
          subtitle="Tell us the role, the skills and the timeline. We'll come back with a clear, practical next step — usually within one business day."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Info & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Visit us
              </h3>

              <div className="space-y-4 pt-2">
                {/* Office Location */}
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="leading-snug">
                      410 Peachtree Parkway, Building Suite #4245,<br />
                      Cumming, GA 30041, United States
                    </span>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/company/zangle-technologies/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      Connect on LinkedIn
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="block mt-0.5 text-slate-500 dark:text-slate-400">
                      Follow Zangle Technologies for roles, news and updates.
                    </span>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                  <Clock className="w-4 h-4" />
                  <span>Response time</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  We typically reply within one business day, Monday to Friday.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Message & Requisition Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Thanks — we've noted your details
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    We've noted your details and will be in touch shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        message: ''
                      });
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Send a message
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <Field label="Name" required>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className={fieldControlClass}
                      />
                    </Field>

                    {/* Email */}
                    <Field label="Email" required delay={0.06}>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={fieldControlClass}
                      />
                    </Field>
                  </div>

                  {/* Company */}
                  <Field label="Company (optional)" delay={0.12}>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={fieldControlClass}
                    />
                  </Field>

                  {/* Message */}
                  <Field label="How can we help?" required delay={0.24}>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`${fieldControlClass} resize-none block`}
                    />
                  </Field>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="glow"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full"
                      rightIcon={
                        isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )
                      }
                    >
                      {isSubmitting ? 'Submitting inquiry...' : 'Send message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
