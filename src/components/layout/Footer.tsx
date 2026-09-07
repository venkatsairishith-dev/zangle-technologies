import React from 'react';
import { Reveal } from '../common/Reveal';
import { Link } from 'react-router-dom';
import { MapPin, Linkedin, ArrowUpRight } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0c10] text-slate-300 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden relative font-sans">
      {/* Subtle background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section: Brand Info, Mission, Address & LinkedIn */}
        <div className="space-y-6 pb-14 border-b border-slate-800/80 max-w-3xl">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center group" aria-label="Zangle Technologies Home">
            <Logo size="lg" />
          </Link>

          {/* Description */}
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl font-normal">
            A privately held staffing and recruiting company helping teams understand hiring needs and connect with skilled engineers.
          </p>

          {/* Contact Details & Links */}
          <div className="pt-2 space-y-3.5 text-sm text-slate-300">
            {/* Address */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=410+Peachtree+Parkway+Building+Suite+4245+Cumming+GA+30041"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-slate-400 hover:text-cyan-400 transition-colors group"
            >
              <MapPin className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 shrink-0 mt-0.5 transition-colors" />
              <span className="leading-snug">
                410 Peachtree Parkway, Building Suite #4245,<br />
                Cumming, GA 30041, United States
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/zangle-technologies"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 transition-colors pt-1 group"
            >
              <div className="w-5 h-5 rounded bg-[#0A66C2] text-white flex items-center justify-center shrink-0">
                <Linkedin className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">
                Follow us on LinkedIn
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Grid: 3 Categorized Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 py-12 border-b border-slate-800/80">
          {/* Col 1: STAFFING */}
          <Reveal delay={0.0}>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-300 font-mono">
                STAFFING
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link to="/services/it-staffing" className="hover:text-cyan-400 transition-colors block">
                    IT Staffing
                  </Link>
                </li>
                <li>
                  <Link to="/services/clinical-staffing" className="hover:text-cyan-400 transition-colors block">
                    Clinical & Scientific
                  </Link>
                </li>
                <li>
                  <Link to="/services/outsourcing" className="hover:text-cyan-400 transition-colors block">
                    Outsourcing
                  </Link>
                </li>
                <li>
                  <Link to="/services/veteran-hiring" className="hover:text-cyan-400 transition-colors block">
                    Veteran Hiring
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-cyan-400 transition-colors block">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Col 2: SERVICES */}
          <Reveal delay={0.07}>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-300 font-mono">
                SERVICES
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link to="/services/it-consulting" className="hover:text-cyan-400 transition-colors block">
                    IT Consulting
                  </Link>
                </li>
                <li>
                  <Link to="/services/cloud-computing" className="hover:text-cyan-400 transition-colors block">
                    Cloud Computing
                  </Link>
                </li>
                <li>
                  <Link to="/services/data-analysis" className="hover:text-cyan-400 transition-colors block">
                    Data Analysis
                  </Link>
                </li>
                <li>
                  <Link to="/services/product-development" className="hover:text-cyan-400 transition-colors block">
                    Product Development
                  </Link>
                </li>
                <li>
                  <Link to="/services/website-development" className="hover:text-cyan-400 transition-colors block">
                    Website Development
                  </Link>
                </li>
                <li>
                  <Link to="/services/infrastructure" className="hover:text-cyan-400 transition-colors block">
                    Infrastructure
                  </Link>
                </li>
                <li>
                  <Link to="/services/healthcare" className="hover:text-cyan-400 transition-colors block">
                    Healthcare
                  </Link>
                </li>
                <li>
                  <Link to="/services/business-reform" className="hover:text-cyan-400 transition-colors block">
                    Business Reform
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Col 3: COMPANY */}
          <Reveal delay={0.14}>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-300 font-mono">
                COMPANY
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link to="/about" className="hover:text-cyan-400 transition-colors block">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/case-studies" className="hover:text-cyan-400 transition-colors block">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex items-center justify-center text-xs text-slate-500">
          <div>
            &copy; {currentYear} Zangle Technologies, Inc. All rights reserved. Specialized Staffing & Technology Solutions.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
