import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../common/SectionHeader';
import { StarButton } from '../ui/star-button';
import { FlipCard3D } from '../ui/flip-card-3d';
import {
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Award
} from 'lucide-react';

interface TestimonialFlipData {
  id: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  rating: number;
  badge: string;
  avatarUrl?: string;
  content: string;
  // Back face details
  projectTitle: string;
  teamDeployed: string;
  techStack: string[];
  outcomes: string[];
  slaResult: string;
}

const TESTIMONIALS_FLIP: TestimonialFlipData[] = [
  {
    id: 't-1',
    author: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'Apex HealthTech',
    industry: 'Digital Health',
    rating: 5,
    badge: 'Enterprise HealthTech',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'Zangle delivered three elite DevOps architects in 48 hours. Flawless execution and zero ramp-up time.',
    projectTitle: 'HIPAA-Compliant Multi-Region Cloud Infra',
    teamDeployed: '2 Senior DevOps Leads + 1 Cloud Security Architect',
    techStack: ['Terraform', 'AWS EKS', 'Istio', 'Datadog', 'Go'],
    outcomes: ['99.999% platform uptime achieved', '-42% cloud infrastructure cost savings', 'Full SOC2 Type II compliance in 60 days'],
    slaResult: '48-Hour Shortlist Met',
  },
  {
    id: 't-2',
    author: 'Elena Rostova',
    role: 'VP of Engineering',
    company: 'FinVeloce Capital',
    industry: 'FinTech Trading',
    rating: 5,
    badge: 'FinTech Trading',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    content: 'World-class vetting. Candidates aced our high-frequency system design audits on day one.',
    projectTitle: 'Ultra-Low Latency Order Execution Engine',
    teamDeployed: '3 Principal C++ Engineers + 1 Rust Systems Lead',
    techStack: ['C++20', 'Rust', 'DPDK Kernel Bypass', 'Kafka', 'TimescaleDB'],
    outcomes: ['Sub-150μs p99 order execution latency', '10x throughput surge capacity', '100% test pass on live market simulations'],
    slaResult: 'Direct C2H Conversion',
  },
  {
    id: 't-3',
    author: 'David Chen',
    role: 'Head of Artificial Intelligence',
    company: 'CognitiveCore AI',
    industry: 'Generative AI',
    rating: 5,
    badge: 'AI Pioneer',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    content: 'Found specialized MLOps and distributed CUDA engineers effortlessly. Saved our roadmap over 6 weeks.',
    projectTitle: 'Distributed Multi-Node LLM Training Cluster',
    teamDeployed: '2 Senior MLOps Engineers + 2 CUDA Specialists',
    techStack: ['PyTorch', 'Ray Train', 'vLLM', 'NVIDIA TensorRT', 'Triton'],
    outcomes: ['-58% token inference latency', 'Saved 6 weeks on critical Q3 roadmap', 'Zero GPU memory leaks on multi-GPU nodes'],
    slaResult: '14-Day Trial to 12-Mo Pod',
  },
  {
    id: 't-4',
    author: 'Sarah Jenkins',
    role: 'Lead Cloud Architect',
    company: 'Global Cloud Systems',
    industry: 'Cloud Architecture',
    rating: 5,
    badge: 'Placed Talent',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    content: 'High-impact enterprise projects, transparent top tier rates, and genuine technical culture alignment.',
    projectTitle: 'Enterprise Hybrid-Cloud Multi-Tenant SaaS',
    teamDeployed: '2 Staff Cloud Architects + 2 Golang Engineers',
    techStack: ['AWS', 'Azure', 'Golang', 'Kubernetes', 'OpenTelemetry'],
    outcomes: ['Multi-cloud auto failover deployment', 'Seamless SOC2 & GDPR data residency', 'Zero disruption migration for 500K users'],
    slaResult: '98.4% Retention Extended',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  const industries = ['All', 'Digital Health', 'FinTech Trading', 'Generative AI', 'Cloud Architecture'];

  const filteredTestimonials =
    selectedIndustry === 'All'
      ? TESTIMONIALS_FLIP
      : TESTIMONIALS_FLIP.filter((t) => t.industry === selectedIndustry);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-zangle-dark/50">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Verified Client & Talent Feedback"
          badgeVariant="amber"
          title="Trusted By Engineering Leaders &"
          gradientText="Senior Consultants."
          subtitle="Interactive 3D Case Cards: Flip any testimonial card to reveal technical achievements, team composition, and verified project outcomes."
        />

        {/* Industry Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedIndustry === ind
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Testimonials 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredTestimonials.map((testimonial) => (
            <FlipCard3D
              key={testimonial.id}
              height="min-h-[340px] h-[340px]"
              front={
                <div className="flex flex-col justify-between h-full">
                  <div>
                    {/* Header: Rating & Verified Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                          5.0
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <ShieldCheck className="w-3 h-3" /> Verified Engagement
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {testimonial.badge}
                        </span>
                      </div>
                    </div>

                    {/* Quote Content */}
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 italic mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Author Card Footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {testimonial.avatarUrl ? (
                        <img
                          src={testimonial.avatarUrl}
                          alt={testimonial.author}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-cyan-500/30 shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {testimonial.author.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          {testimonial.author}
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {testimonial.role} • <span className="text-cyan-600 dark:text-cyan-400 font-medium">{testimonial.company}</span>
                        </p>
                      </div>
                    </div>

                    <Quote className="w-6 h-6 text-slate-300 dark:text-slate-700 shrink-0 opacity-40 group-hover:opacity-80 transition-opacity" />
                  </div>
                </div>
              }
              back={
                <div className="flex flex-col justify-between h-full text-left">
                  <div>
                    {/* Header with Project Title & SLA */}
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                          CASE STUDY SNAPSHOT • {testimonial.company}
                        </span>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          {testimonial.projectTitle}
                        </h4>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 whitespace-nowrap">
                        {testimonial.slaResult}
                      </span>
                    </div>

                    {/* Team Deployed */}
                    <div className="mb-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                        <Layers className="w-3 h-3 text-cyan-400" /> Team Deployed:
                      </span>
                      <p className="text-xs text-slate-200 font-medium">{testimonial.teamDeployed}</p>
                    </div>

                    {/* Key Outcomes */}
                    <div className="mb-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-400" /> Verified Results:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {testimonial.outcomes.map((out, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-indigo-400" /> Technology Stack:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {testimonial.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800/90 text-cyan-300 border border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Back Action */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <Link
                      to="/case-studies"
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Read Full Case Study</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <span className="text-[10px] font-mono text-slate-500">Zangle Vetted</span>
                  </div>
                </div>
              }
            />
          ))}
        </div>

        {/* Star Button Call To Action Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950 text-white border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10 space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" /> 14-Day Risk-Free Trial Guarantee
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Ready to Accelerate Your Technical Roadmap?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Connect with vetted senior software architects, DevOps leads, and clinical specialists in under 48 hours.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link to="/hire-talent">
              <StarButton
                duration={3.5}
                lightColor="#38bdf8"
                backgroundColor="#080C14"
                className="h-11 px-6 rounded-full font-semibold cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <span className="inline-flex items-center gap-2">
                  Request Vetted Talent <ArrowRight className="w-4 h-4 text-cyan-400" />
                </span>
              </StarButton>
            </Link>

            <Link to="/case-studies">
              <StarButton
                duration={4.5}
                lightColor="#818cf8"
                backgroundColor="#080C14"
                className="h-11 px-6 rounded-full font-semibold cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  Read Case Studies <TrendingUp className="w-4 h-4 text-indigo-400" />
                </span>
              </StarButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
