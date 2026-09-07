import { HiringModelInfo, PracticeArea } from '../types';

export const HIRING_MODELS: HiringModelInfo[] = [
  {
    id: 'contract',
    title: 'Contract Augmentation',
    badge: 'Fastest Scaling',
    tagline: 'Engineers deployed in 48 hours.',
    description: 'Add senior tech talent instantly to active sprints.',
    idealFor: [
      'Sprint surges',
      'Specialist skill gaps',
      'Flexible hourly billing',
      'Interim projects'
    ],
    benefits: [
      '48h candidate shortlist',
      'Zero payroll friction',
      'Elastic scaling',
      '14-day risk-free trial'
    ],
    sla: '48h to Interview',
    trialPeriod: '14-Day Trial'
  },
  {
    id: 'contract-to-hire',
    title: 'Contract-to-Hire',
    badge: 'Risk-Free Trial',
    tagline: 'Evaluate talent before hiring.',
    description: 'Test engineers on live code before full-time hiring.',
    idealFor: [
      'De-risking key hires',
      'Live code evaluation',
      'Pending headcount approvals',
      'Culture alignment'
    ],
    benefits: [
      '3-6 month trial',
      'Seamless conversion',
      'Zero recruiter fees',
      'Continuous support'
    ],
    sla: '3-5 Days Shortlist',
    trialPeriod: '3-6 Mo Trial'
  },
  {
    id: 'direct-placement',
    title: 'Direct Placement',
    badge: 'Permanent Hire',
    tagline: 'Permanent senior leaders & architects.',
    description: 'Targeted search for principal engineers and executives.',
    idealFor: [
      'Staff & Principal engineers',
      'VP & CTO leadership',
      'Core IP owners',
      'Permanent tech teams'
    ],
    benefits: [
      'Architect-led vetting',
      '90-day warranty',
      'Top 3% passive talent',
      'Salary benchmarking'
    ],
    sla: '5-7 Days Delivery',
    trialPeriod: '90-Day Guarantee'
  },
  {
    id: 'managed-team',
    title: 'Dedicated Pods',
    badge: 'Turnkey Delivery',
    tagline: 'Self-managed agile engineering squads.',
    description: 'Complete pods with lead, developers, and QA.',
    idealFor: [
      'MVPs & new products',
      'Legacy cloud rewrites',
      'Parallel roadmaps',
      'Autonomous delivery'
    ],
    benefits: [
      'Pre-assembled teams',
      'Dedicated Tech Lead',
      'Milestone-based SLAs',
      '100% client IP'
    ],
    sla: '1-2 Weeks Deploy',
    trialPeriod: 'Milestone Guarantee'
  }
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    tagline: 'Multi-cloud, Kubernetes, and GitOps automation.',
    iconName: 'Cloud',
    domain: 'Cloud & DevOps',
    description: 'SREs and architects for resilient cloud infrastructure.',
    technologies: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Terraform', 'ArgoCD', 'Docker', 'Datadog'],
    rolesStaffed: ['Cloud Architect', 'SRE', 'DevOps Engineer', 'Platform Engineer', 'FinOps Lead'],
    avgTimeToFill: '48 Hours',
    keyHighlights: ['Disaster recovery', 'Automated GitOps', 'Terraform IaC']
  },
  {
    id: 'ai-ml-data',
    title: 'AI / ML & MLOps',
    tagline: 'GenAI, LLM serving, and distributed models.',
    iconName: 'Cpu',
    domain: 'AI / ML & Data Science',
    description: 'Engineers deploying production-grade AI & LLM systems.',
    technologies: ['PyTorch', 'vLLM', 'Ray', 'CUDA', 'LangChain', 'LlamaIndex', 'Pinecone', 'Triton'],
    rolesStaffed: ['MLOps Engineer', 'GenAI Architect', 'RAG Specialist', 'Vision Engineer', 'ML Scientist'],
    avgTimeToFill: '3-5 Days',
    keyHighlights: ['LLM fine-tuning', 'Enterprise RAG', 'GPU optimization']
  },
  {
    id: 'fullstack-backend',
    title: 'Software & Backend',
    tagline: 'High-speed APIs and modern React frontends.',
    iconName: 'Code2',
    domain: 'Full-Stack & Backend',
    description: 'Engineers building low-latency microservices and web apps.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Go', 'Python', 'Java', 'PostgreSQL', 'Redis', 'Kafka'],
    rolesStaffed: ['Staff Full-Stack', 'Senior Backend', 'Frontend Architect', 'Distributed Systems', 'Mobile Dev'],
    avgTimeToFill: '48 Hours',
    keyHighlights: ['Event-driven systems', 'Sub-ms APIs', 'Type-safe apps']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & AppSec',
    tagline: 'Zero-Trust, cloud security, and compliance.',
    iconName: 'ShieldCheck',
    domain: 'Cybersecurity',
    description: 'Security engineers embedding governance into CI/CD.',
    technologies: ['Wiz', 'HashiCorp Vault', 'Snyk', 'Trivy', 'K8s Security', 'GuardDuty', 'Splunk', 'SOC2 / HIPAA'],
    rolesStaffed: ['DevSecOps Lead', 'Security Architect', 'AppSec Engineer', 'Pen Tester', 'SOC Lead'],
    avgTimeToFill: '3-4 Days',
    keyHighlights: ['Zero-Trust IAM', 'Shift-left security', 'SOC2 / HIPAA']
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    tagline: 'Pipelines, Snowflake, and streaming analytics.',
    iconName: 'Database',
    domain: 'Data Engineering',
    description: 'Data architects building real-time pipelines and warehouses.',
    technologies: ['Snowflake', 'dbt', 'Apache Spark', 'Airflow', 'Kafka', 'Databricks', 'AWS Glue', 'BigQuery'],
    rolesStaffed: ['Principal Data Eng', 'Analytics Eng', 'Snowflake Architect', 'Streaming Lead', 'BI Developer'],
    avgTimeToFill: '48 Hours',
    keyHighlights: ['Real-time streaming', 'Data quality tests', 'Warehouse tuning']
  },
  {
    id: 'enterprise-erp',
    title: 'Enterprise & ERP',
    tagline: 'SAP S/4HANA, Salesforce, and enterprise integrations.',
    iconName: 'Layers',
    domain: 'Enterprise & ERP',
    description: 'Consultants connecting ERP platforms to modern cloud stacks.',
    technologies: ['SAP S/4HANA', 'SAP BTP', 'Salesforce', 'ServiceNow', 'Workday', 'MuleSoft', 'Dynamics 365'],
    rolesStaffed: ['SAP Architect', 'Salesforce Architect', 'IT Consultant', 'ERP Manager', 'Integration Lead'],
    avgTimeToFill: '4-6 Days',
    keyHighlights: ['Cloud ERP migration', 'API integration', 'Zero-downtime cutover']
  }
];
