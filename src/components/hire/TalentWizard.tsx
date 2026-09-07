import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  UserCheck,
  Building,
  Mail,
  Phone,
  Briefcase,
  Layers,
  Calendar,
  Code
} from 'lucide-react';
import { TechDomain, EngagementModel, SeniorityLevel } from '../../types';

interface WizardFormData {
  domain: TechDomain;
  roleTitle: string;
  engagementModel: EngagementModel;
  seniority: SeniorityLevel;
  techStack: string[];
  timeline: string;
  headcount: number;
  companyName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  projectDescription: string;
}

const POPULAR_SKILLS: Record<TechDomain, string[]> = {
  'Cloud & DevOps': ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'Azure', 'GCP', 'Helm', 'ArgoCD', 'Prometheus'],
  'AI / ML & Data Science': ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'LangChain', 'MLOps', 'Vector DBs', 'FastAPI', 'HuggingFace', 'Kubeflow'],
  'Full-Stack & Backend': ['React', 'Node.js', 'TypeScript', 'Go', 'Rust', 'Python', 'Java / Spring', 'PostgreSQL', 'GraphQL', 'Next.js'],
  'Cybersecurity': ['DevSecOps', 'SIEM / Splunk', 'Zero Trust', 'SOC 2', 'Penetration Testing', 'Cloud Security', 'IAM', 'Wiz / Prisma'],
  'Data Engineering': ['Snowflake', 'Apache Spark', 'dbt', 'Databricks', 'Airflow', 'Kafka', 'SQL', 'BigQuery', 'PostgreSQL'],
  'Enterprise & ERP': ['SAP S/4HANA', 'Salesforce Core', 'Workday', 'ServiceNow', 'Oracle Cloud', 'ABAP', 'Apex / LWC']
};

export const TalentWizard: React.FC<{ onComplete?: (data: WizardFormData) => void }> = ({ onComplete }) => {
  const [searchParams] = useSearchParams();

  // Step state (1 to 4 + 5 confirmation)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [customSkillInput, setCustomSkillInput] = useState<string>('');

  const [formData, setFormData] = useState<WizardFormData>({
    domain: (searchParams.get('domain') as TechDomain) || 'Cloud & DevOps',
    roleTitle: searchParams.get('role') || 'Senior Cloud & DevOps Engineer',
    engagementModel: (searchParams.get('model') as EngagementModel) || 'contract',
    seniority: 'Senior',
    techStack: ['AWS', 'Kubernetes', 'Terraform'],
    timeline: 'immediate',
    headcount: parseInt(searchParams.get('count') || '1'),
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    projectDescription: searchParams.get('profile') ? `Requesting match for Pre-Vetted Profile [${searchParams.get('profile')}]` : ''
  });

  // Watch URL params if passed
  useEffect(() => {
    const domainParam = searchParams.get('domain') as TechDomain;
    const roleParam = searchParams.get('role');
    const profileParam = searchParams.get('profile');

    if (domainParam) {
      setFormData((prev) => ({
        ...prev,
        domain: domainParam,
        techStack: POPULAR_SKILLS[domainParam]?.slice(0, 3) || prev.techStack
      }));
    }
    if (roleParam) {
      setFormData((prev) => ({ ...prev, roleTitle: roleParam }));
    }
    if (profileParam) {
      setFormData((prev) => ({
        ...prev,
        projectDescription: `Requesting interview with Pre-Vetted Profile: ${profileParam}`
      }));
    }
  }, [searchParams]);

  const handleDomainChange = (domain: TechDomain) => {
    setFormData((prev) => ({
      ...prev,
      domain,
      techStack: POPULAR_SKILLS[domain]?.slice(0, 3) || []
    }));
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => {
      const exists = prev.techStack.includes(skill);
      if (exists) {
        return { ...prev, techStack: prev.techStack.filter((s) => s !== skill) };
      } else {
        return { ...prev, techStack: [...prev.techStack, skill] };
      }
    });
  };

  const handleAddCustomSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customSkillInput.trim()) {
      e.preventDefault();
      if (!formData.techStack.includes(customSkillInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          techStack: [...prev.techStack, customSkillInput.trim()]
        }));
      }
      setCustomSkillInput('');
    }
  };

  const validateStep = (): boolean => {
    if (currentStep === 1) return !!formData.domain && !!formData.roleTitle;
    if (currentStep === 2) return !!formData.engagementModel && !!formData.seniority;
    if (currentStep === 3) return formData.techStack.length > 0;
    if (currentStep === 4) {
      return (
        formData.contactName.trim().length > 1 &&
        formData.workEmail.includes('@') &&
        formData.companyName.trim().length > 1
      );
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setIsSubmitted(true);
    if (onComplete) {
      onComplete(formData);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-zangle-card border border-emerald-500/30 shadow-2xl text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <Badge variant="emerald" size="sm" className="mb-3">
          REQUEST TRANSMITTED • 48-HOUR SLA ACTIVE
        </Badge>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
          Talent Request Received!
        </h3>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          Thank you <strong className="text-slate-900 dark:text-white">{formData.contactName}</strong> from <strong className="text-slate-900 dark:text-white">{formData.companyName}</strong>. A dedicated Technical Account Lead has been assigned to match your requirement for <strong className="text-cyan-600 dark:text-cyan-400">{formData.headcount}x {formData.seniority} {formData.roleTitle}</strong>.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-left text-xs font-mono space-y-2 mb-6 text-slate-600 dark:text-slate-300">
          <div>• Target Domain: <span className="text-cyan-500 font-bold">{formData.domain}</span></div>
          <div>• Model: <span className="text-blue-400 font-bold uppercase">{formData.engagementModel}</span></div>
          <div>• Required Skills: <span className="text-indigo-400">{formData.techStack.join(', ')}</span></div>
          <div>• Shortlist Target Delivery: <span className="text-emerald-400 font-bold">Within 48 Hours to {formData.workEmail}</span></div>
        </div>

        <Button
          variant="glow"
          size="md"
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(1);
          }}
        >
          Submit Another Talent Request
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white dark:bg-zangle-card border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
      {/* Wizard Progress Bar Header */}
      <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-500" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
              Interactive Talent Request Wizard
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Step {currentStep} of 4
          </span>
        </div>

        {/* Steps Breadcrumbs */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { step: 1, label: 'Domain & Role' },
            { step: 2, label: 'Model & Scale' },
            { step: 3, label: 'Stack & Timeline' },
            { step: 4, label: 'Company Info' }
          ].map((s) => (
            <div key={s.step} className="space-y-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep >= s.step
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
              <span
                className={`text-[11px] font-medium hidden sm:block ${
                  currentStep === s.step
                    ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-10">
        <AnimatePresence mode="wait">
        {/* STEP 1: Technical Domain & Role */}
        {currentStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                1. Select Engineering Practice Domain
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Choose the primary technical domain for your upcoming talent requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(Object.keys(POPULAR_SKILLS) as TechDomain[]).map((dom) => (
                <button
                  key={dom}
                  type="button"
                  onClick={() => handleDomainChange(dom)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.domain === dom
                      ? 'bg-cyan-500/10 border-cyan-500 text-slate-900 dark:text-white shadow-md ring-2 ring-cyan-500/30'
                      : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">{dom}</span>
                    {formData.domain === dom && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                    {POPULAR_SKILLS[dom].slice(0, 4).join(', ')}...
                  </span>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                Target Job Title / Position
              </label>
              <input
                type="text"
                value={formData.roleTitle}
                onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                placeholder="e.g. Staff Site Reliability Engineer, Lead React Developer"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                required
              />
            </div>
          </motion.div>
        )}

        {/* STEP 2: Engagement Model, Seniority & Scale */}
        {currentStep === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                2. Engagement Model & Seniority Level
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Pick the structural hiring arrangement and technical seniority expected.
              </p>
            </div>

            {/* Engagement Model */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Engagement Model
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'contract',
                    title: 'Contract / Staff Augmentation',
                    desc: 'Instant specialized burst capacity. Hourly or monthly billing.'
                  },
                  {
                    id: 'contract-to-hire',
                    title: 'Contract-to-Hire (C2H)',
                    desc: '3-6 months trial period with seamless full-time transition.'
                  },
                  {
                    id: 'direct-placement',
                    title: 'Direct Placement / Permanent',
                    desc: 'Retained or contingency search with 90-day guarantee.'
                  },
                  {
                    id: 'managed-team',
                    title: 'Dedicated Engineering Pod',
                    desc: 'Turnkey autonomous pod with Tech Lead and Project Manager.'
                  }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, engagementModel: m.id as EngagementModel })}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      formData.engagementModel === m.id
                        ? 'bg-blue-500/10 border-blue-500 text-slate-900 dark:text-white shadow-md ring-2 ring-blue-500/30'
                        : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{m.title}</span>
                      {formData.engagementModel === m.id && (
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{m.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Seniority */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Seniority Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(['Junior', 'Mid-Level', 'Senior', 'Staff', 'Principal'] as SeniorityLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData({ ...formData, seniority: lvl })}
                    className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                      formData.seniority === lvl
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                        : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Headcount */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 mb-2">
                <span>Number of Engineers Needed</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">
                  {formData.headcount} Professional{formData.headcount > 1 ? 's' : ''}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.headcount}
                onChange={(e) => setFormData({ ...formData, headcount: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </motion.div>
        )}

        {/* STEP 3: Tech Stack & Timeline */}
        {currentStep === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                3. Mandatory Tech Stack & Ramp-Up Timeline
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Select required technologies to match against our pre-assessed bench skills.
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Suggested Skills for {formData.domain} (Click to toggle)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {POPULAR_SKILLS[formData.domain]?.map((skill) => {
                  const isSelected = formData.techStack.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-700 dark:text-cyan-300 font-bold shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {skill}
                    </button>
                  );
                })}
              </div>

              {/* Custom Skill Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  onKeyDown={handleAddCustomSkill}
                  placeholder="Type custom skill & press Enter (e.g. Rust, ClickHouse)"
                  className="flex-1 px-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Deployment Urgency
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'immediate', label: 'Immediate (< 1 Week)', desc: 'Deploy from active bench' },
                  { id: '2weeks', label: '1 - 2 Weeks', desc: 'Custom curated shortlist' },
                  { id: '1month', label: '1 Month+', desc: 'Pipeline build for next quarter' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, timeline: t.id })}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      formData.timeline === t.id
                        ? 'bg-emerald-500/10 border-emerald-500 text-slate-900 dark:text-white font-bold'
                        : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold">{t.label}</div>
                    <div className="text-[11px] text-slate-500">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes / Description */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Project Scope / Key Deliverables (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                placeholder="Briefly describe the key engineering challenge, architecture environment, or specific profile codes you'd like to interview..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>
          </motion.div>
        )}

        {/* STEP 4: Company & Contact Information */}
        {currentStep === 4 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                4. Where Should We Send the Candidate Shortlist?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                We will email verified resumes, code audition summaries, and availability schedules within 48 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Full Name *
                </label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Company Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. FinTech Global, HealthCloud"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Corporate Work Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/40"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Direct Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/40"
                  />
                </div>
              </div>
            </div>

            {/* Summary Review Banner */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-slate-700 dark:text-slate-200 space-y-1">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Ready to submit:
              </div>
              <p>
                Requesting <strong className="text-slate-900 dark:text-white">{formData.headcount}x {formData.seniority} {formData.roleTitle}</strong> ({formData.domain}) under <strong className="uppercase">{formData.engagementModel}</strong> model.
              </p>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Wizard Controls */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button
              type="button"
              variant="glow"
              size="md"
              disabled={!validateStep()}
              onClick={() => setCurrentStep((prev) => prev + 1)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="submit"
              variant="glow"
              size="lg"
              disabled={!validateStep()}
              rightIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Transmit Talent Request (48h SLA)
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
