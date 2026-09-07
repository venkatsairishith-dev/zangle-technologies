import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Layout,
  Smartphone,
  Gauge,
  ShieldCheck,
  Code2,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShoppingBag,
  Layers
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const WebsiteDevelopmentPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { value: 'Faster', label: 'Load times — performance budgets and image, font and code optimisation cut time-to-interactive' },
    { value: 'Higher', label: 'Conversion — clearer messaging and focused calls to action turn more of the same traffic into enquiries' },
    { value: 'Stronger', label: 'SEO ranking — technical SEO, structured data and Core Web Vitals help pages climb and hold positions' }
  ];

  const capabilities = [
    {
      id: '01',
      title: 'Marketing & corporate sites',
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      desc: 'Brand, product and service sites with clear messaging hierarchy, fast page loads and conversion paths that guide visitors to enquire, sign up or buy.'
    },
    {
      id: '02',
      title: 'Web apps & portals',
      icon: <Layout className="w-5 h-5 text-cyan-400" />,
      desc: 'Authenticated dashboards, customer and partner portals and internal tools built on React and Next.js, with role-based access and clean, documented APIs.'
    },
    {
      id: '03',
      title: 'E-commerce storefronts',
      icon: <ShoppingBag className="w-5 h-5 text-emerald-400" />,
      desc: 'Shopify and headless commerce builds with optimised product pages, streamlined checkout and payment, shipping and inventory integrations that scale with sales.'
    },
    {
      id: '04',
      title: 'CMS (WordPress & Webflow)',
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      desc: 'Editor-friendly WordPress and Webflow sites with reusable content blocks, so marketing teams can publish pages and campaigns without waiting on developers.'
    },
    {
      id: '05',
      title: 'SEO & performance',
      icon: <Gauge className="w-5 h-5 text-amber-400" />,
      desc: 'Technical SEO, structured data and performance tuning to hit Core Web Vitals — faster paint, less layout shift and pages search engines can crawl and rank.'
    },
    {
      id: '06',
      title: 'Accessibility & compliance',
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
      desc: 'WCAG-aligned builds with keyboard navigation, sensible contrast and semantic structure — so your site works for every visitor and meets accessibility expectations.'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Discovery',
      desc: 'We map goals, audiences, content and competitors to agree scope, success metrics and sitemap.'
    },
    {
      num: '02',
      title: 'UX/UI design',
      desc: 'Wireframes and high-fidelity designs in a reusable system, reviewed with you before a line of code.'
    },
    {
      num: '03',
      title: 'Build',
      desc: 'Front-end, CMS and integrations built in clean, documented code on a staging environment you can preview.'
    },
    {
      num: '04',
      title: 'SEO & performance',
      desc: 'Technical SEO, metadata, structured data and performance tuning, validated against Core Web Vitals.'
    },
    {
      num: '05',
      title: 'Launch & support',
      desc: 'Careful go-live with redirects and analytics, then ongoing updates, monitoring and improvements.'
    }
  ];

  const techStack = [
    'Next.js', 'React', 'TypeScript', 'WordPress', 'Webflow',
    'Shopify', 'Tailwind CSS', 'Node.js', 'Vercel', 'Google Analytics'
  ];

  const faqs = [
    {
      q: 'WordPress or a custom build — which is right for us?',
      a: 'It depends on how you work. If your team publishes content often and wants independence, a well-structured WordPress or Webflow site is usually the right call. If you need bespoke functionality, complex data or app-like interactions, a custom React/Next.js build gives more control. We recommend based on your goals, budget and who maintains the site.'
    },
    {
      q: 'Do you handle SEO?',
      a: 'Yes. Technical SEO is part of every build: clean semantic markup, fast pages, structured data, sensible metadata, sitemaps and crawlable architecture. We also set up analytics and search tooling so you can track rankings and traffic.'
    },
    {
      q: 'Can you maintain the site after launch?',
      a: 'Absolutely. We offer ongoing maintenance and support covering updates, security patches, backups, performance monitoring and small enhancements. Plans scale from light, on-demand support to a regular roadmap of improvements.'
    },
    {
      q: 'Do you build e-commerce?',
      a: 'Yes — from Shopify storefronts to headless commerce on a custom front-end. We optimise product and category pages, streamline checkout, and integrate payment, shipping, tax and inventory systems.'
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
            <span className="text-slate-800 dark:text-slate-200">Website Development</span>
          </div>

          <div className="max-w-4xl">
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 text-xs font-mono mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Service · Website Development</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Websites built{' '}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-400 bg-clip-text text-transparent">
                to perform.
              </span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Design and ship marketing sites, web apps and storefronts measured against speed, search visibility and conversion, not just visual polish.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/contact">
                <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Compare plans
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
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">
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
              Websites that perform, not just look good.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Too many business sites are slow, dated and built on tangled templates nobody can update. They bury the offer below the fold, take five seconds to paint on a phone, and quietly leak traffic to competitors who rank higher and load faster. We take a different approach: modern, fast, SEO-first builds where every decision is measurable — pages engineered around real performance budgets, semantic markup and clean information architecture, then wired to analytics so you can see what each change does.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Fast, accessible, mobile-first builds',
                'SEO and Core Web Vitals from day one',
                'CMS or custom — built to your team’s workflow'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Representative engagement
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      Corporate rebrand
                    </span>
                  </div>
                </div>
                <Badge variant="cyan" size="xs">
                  OPTIMIZED
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">Faster</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Load times, from performance budgets and asset optimisation</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Stronger</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">SEO ranking, from technical SEO and Core Web Vitals work</div>
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
            WHAT WE BUILD
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            From a single landing page to a full platform.
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
              className="p-6 rounded-2xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {c.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{c.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
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
            How a website project runs.
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
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm flex items-center justify-center mb-4 border border-blue-500/20">
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
              TECH WE BUILD WITH
            </Badge>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              A modern, proven stack — chosen to fit your team, not the other way round.
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
            Website FAQ
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
                    <ChevronUp className="w-5 h-5 text-blue-500 shrink-0" />
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
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
          <Badge variant="cyan" size="xs">
            WEBSITE DEVELOPMENT
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready for a website that works as hard as you do?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Marketing sites, web apps and storefronts built around speed, search visibility and conversion.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                View services
              </Button>
            </Link>
            <Link to="/hire-talent">
              <Button variant="outline" size="lg">
                Hire web engineers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
