export type EngagementModel = 'contract' | 'contract-to-hire' | 'direct-placement' | 'managed-team';

export type JobType = 'Contract' | 'Contract-to-Hire' | 'Direct Placement' | 'Full-Time';

export type WorkLocation = 'Remote' | 'Hybrid' | 'Onsite';

export type ExperienceLevel = 'Mid-Level' | 'Senior' | 'Lead / Staff' | 'Principal / Architect';
export type SeniorityLevel = ExperienceLevel;

export type TechDomain =
  | 'Cloud & DevOps'
  | 'AI / ML & Data Science'
  | 'Full-Stack & Backend'
  | 'Cybersecurity'
  | 'Data Engineering'
  | 'Enterprise & ERP';

export interface Job {
  id: string;
  title: string;
  domain: TechDomain;
  companyName: string;
  companyIndustry: string;
  location: string;
  workLocation: WorkLocation;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  rateOrSalary: string;
  duration?: string; // e.g. "6-12 Months (Extendable)"
  postedDate: string;
  urgentHiring?: boolean;
  featured?: boolean;
  skills: string[];
  description: string;
  overview?: string;
  responsibilities: string[];
  qualifications: string[];
  requirements?: string[];
  perks: string[];
  securityClearance?: string;
}

export interface TalentProfile {
  id: string;
  benchCode: string; // e.g., "TALENT-8042"
  title: string;
  domain: TechDomain;
  yearsOfExperience: number;
  location: string;
  availability: string; // e.g., "Immediate (2-3 days)"
  rateGuide: string; // e.g., "$85 - $105 / hr"
  topSkills: string[];
  bioSummary: string;
  recentProjects: string[];
  certifications: string[];
  preferredModels: ('Contract' | 'Contract-to-Hire' | 'Direct')[];
}

export interface PracticeArea {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  domain: TechDomain;
  description: string;
  technologies: string[];
  rolesStaffed: string[];
  rolesCovered?: string[];
  avgTimeToFill: string;
  keyHighlights: string[];
}

export interface HiringModelInfo {
  id: EngagementModel;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  idealFor: string[];
  benefits: string[];
  sla: string;
  trialPeriod?: string;
}

export interface TalentRequestSubmission {
  domain: TechDomain | '';
  roleTitle: string;
  engagementModel: EngagementModel | '';
  seniority: ExperienceLevel | '';
  targetStartDate: string;
  contractDuration?: string;
  skillsNeeded: string[];
  jobDescriptionNotes: string;
  budgetOrRate: string;
  companyName: string;
  contactName: string;
  workEmail: string;
  phoneNumber: string;
  teamSize?: string;
}

export interface QuickApplicationSubmission {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubOrPortfolio?: string;
  yearsOfExp: string;
  resumeFileName?: string;
  coverNote?: string;
}

export interface ContactInquiry {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  inquiryType: 'Hiring Talent' | 'Looking for a Job' | 'Partnership' | 'General Inquiry';
  message: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  rating: number;
  content: string;
  avatarUrl?: string;
  badge: string; // e.g., "Enterprise FinTech", "AI Startup"
}

export interface FaqItem {
  id: string;
  category: 'Hiring Managers' | 'Candidates' | 'Billing & Compliance' | 'Vetting Process';
  question: string;
  answer: string;
}
