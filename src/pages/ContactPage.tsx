import React from 'react';
import { motion } from 'framer-motion';
import { ContactForm } from '../components/contact/ContactForm';
import { FaqAccordion } from '../components/contact/FaqAccordion';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { useToast } from '../components/common/Toast';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Building,
  HelpCircle
} from 'lucide-react';

/**
 * Entrance motion for the page.
 *
 * Everything -- the hero included -- is driven by `whileInView` rather than a
 * mount animation. The route wrapper is an `<AnimatePresence initial={false}>`,
 * which propagates a "skip mount animations" flag to every descendant, so a
 * hero using `animate` renders already settled on a hard load (it only played
 * when you arrived by clicking a link). `whileInView` is not gated by that
 * context, so the hero animates on both paths.
 *
 * Sections animate on scroll with
 * `once: true`, so scrolling back up does not replay the page. `rise` is the
 * single shared easing -- one curve everywhere reads as one page, where a
 * different duration per section reads as several.
 */
const rise = {
  initial: { opacity: 0, y: 22 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

const inView = { once: true, amount: 0.25 };

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();

  const handleFormSuccess = (name: string) => {
    showToast(
      `Thank you ${name}! Your inquiry has been dispatched to our technical staffing leads.`,
      'success'
    );
  };

  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...rise}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>DIRECT ENTERPRISE ADVISORY CHANNELS</span>
          </motion.div>

          <motion.h1
            {...rise}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ ...rise.transition, delay: 0.08 }}
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight"
          >
            Connect With Our <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Staffing Leads.
            </span>
          </motion.h1>

          <motion.p
            {...rise}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ ...rise.transition, delay: 0.16 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Direct access to practice directors for rates, contract models, and custom engineering pods.
          </motion.p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={rise.transition}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Global Headquarters & Reach
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-semibold">
                      Tech Talent Hubs
                    </strong>
                    <span>San Francisco, CA • Austin, TX • New York, NY • London, UK</span>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-semibold">
                      Direct Email Inquiries
                    </strong>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">
                      talent@zangle-technologies.com
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.4, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-semibold">
                      Enterprise Support Line
                    </strong>
                    <span className="font-mono">+1 (800) 926-4530</span>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.4, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-semibold">
                      Response Guarantee
                    </strong>
                    <span>Within 2 hours during normal business hours (8am - 8pm EST)</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Consultation Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ ...rise.transition, delay: 0.12 }}
              className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-white shadow-xl space-y-3"
            >
              <Badge variant="emerald" size="xs" dot>
                FREE CONSULTATION
              </Badge>
              <h4 className="text-base font-bold">
                15-Min Technical Discovery
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Review your stack needs, rate benchmarks, and sprint capacity with an engineering director.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ ...rise.transition, delay: 0.08 }}
          >
            <ContactForm onSuccess={handleFormSuccess} />
          </motion.div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-12 bg-slate-50 dark:bg-zangle-dark/90">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          {...rise}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
        >
          <SectionHeader
            badge="Client & Candidate FAQs"
            badgeVariant="cyan"
            title="Frequently Asked"
            gradientText="Questions."
            subtitle="Answers on screening standards, rates, risk-free trials, and contract terms."
          />

          <FaqAccordion />
        </motion.div>
      </section>
    </div>
  );
};
