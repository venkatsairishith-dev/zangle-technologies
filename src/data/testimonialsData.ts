import { FaqItem, Testimonial } from '../types';

export const STATS_DATA = [
  { value: '48 Hrs', label: 'Shortlist SLA', description: 'Matched in 48 hours' },
  { value: '98.4%', label: 'Retention Rate', description: 'Contract extensions' },
  { value: '5,000+', label: 'Vetted Talent', description: 'Top 3% engineers' },
  { value: '14 Days', label: 'Risk-Free Trial', description: '100% guarantee' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'Apex HealthTech',
    industry: 'Digital Health',
    rating: 5,
    badge: 'Enterprise HealthTech',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'Zangle delivered three elite DevOps architects in 48 hours. Flawless execution and zero ramp-up time.'
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
    content: 'World-class vetting. Candidates aced our high-frequency system design audits on day one.'
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
    content: 'Found specialized MLOps and distributed CUDA engineers effortlessly. Saved our roadmap over 6 weeks.'
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
    content: 'High-impact enterprise projects, transparent top tier rates, and genuine technical culture alignment.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Hiring Managers',
    question: 'How fast do you provide candidate shortlists?',
    answer: 'We deliver 2–3 vetted, interview-ready profiles within 48 hours.'
  },
  {
    id: 'faq-2',
    category: 'Hiring Managers',
    question: 'How does the 14-Day Zero-Risk Trial work?',
    answer: 'Evaluate for 14 days. If unsatisfied, pay zero with immediate replacement.'
  },
  {
    id: 'faq-3',
    category: 'Vetting Process',
    question: 'What is the 5-Stage Vetting Process?',
    answer: 'Code audit, live coding, system design, communication, and references.'
  },
  {
    id: 'faq-4',
    category: 'Billing & Compliance',
    question: 'How are payroll, taxes, and compliance handled?',
    answer: 'Zangle manages payroll, taxes, NDAs, IP assignments, and compliance.'
  },
  {
    id: 'faq-5',
    category: 'Hiring Managers',
    question: 'What is the difference between Contract, C2H, and Direct?',
    answer: 'Contract is instant capacity, C2H is trial-to-perm, Direct is permanent search.'
  },
  {
    id: 'faq-6',
    category: 'Candidates',
    question: 'How do engineers join the Zangle Talent Network?',
    answer: 'Apply online. Pass our technical evaluations to access enterprise projects.'
  }
];

export const VETTING_STEPS = [
  {
    step: '01',
    title: 'Code Audit',
    description: 'Production code & repo review.',
    icon: 'FileCheck'
  },
  {
    step: '02',
    title: 'Live Coding',
    description: 'Practical algorithms & clean code.',
    icon: 'Terminal'
  },
  {
    step: '03',
    title: 'System Design',
    description: 'Scalability & fault tolerance defense.',
    icon: 'Network'
  },
  {
    step: '04',
    title: 'Communication',
    description: 'Async clarity & team collaboration.',
    icon: 'MessageSquare'
  },
  {
    step: '05',
    title: 'Matched in 48h',
    description: 'Top 3-5% ready for active sprints.',
    icon: 'Sparkles'
  }
];
