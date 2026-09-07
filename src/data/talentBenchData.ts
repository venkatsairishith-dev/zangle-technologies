import { TalentProfile } from '../types';

export const TALENT_BENCH: TalentProfile[] = [
  {
    id: 'talent-01',
    benchCode: 'ZGL-8401',
    title: 'Staff Cloud & FinOps Architect',
    domain: 'Cloud & DevOps',
    yearsOfExperience: 12,
    location: 'Austin, TX (US Citizen)',
    availability: 'Available in 3 Days',
    rateGuide: '$110 - $130 / hr',
    topSkills: ['AWS Multi-Account', 'Terraform', 'Kubernetes (EKS)', 'FinOps', 'Datadog', 'Go'],
    bioSummary: 'Principal cloud architect who cut cloud spend by $3.4M with 99.995% uptime.',
    recentProjects: [
      'AWS EKS multi-region disaster recovery with 2-min RTO',
      'FinOps spot orchestration saving 38% compute cost',
      'Terraform Cloud enterprise modules deployment'
    ],
    certifications: ['AWS Solutions Architect Pro', 'CKA Certified', 'FinOps Practitioner'],
    preferredModels: ['Contract', 'Contract-to-Hire']
  },
  {
    id: 'talent-02',
    benchCode: 'ZGL-9124',
    title: 'Lead GenAI & MLOps Engineer',
    domain: 'AI / ML & Data Science',
    yearsOfExperience: 8,
    location: 'San Francisco, CA (US Citizen)',
    availability: 'Available in 1 Week',
    rateGuide: '$125 - $150 / hr',
    topSkills: ['PyTorch', 'vLLM', 'Ray Clusters', 'Llama 3', 'Pinecone', 'Python', 'CUDA'],
    bioSummary: 'LLM serving specialist who built RAG pipelines serving 15M+ daily requests.',
    recentProjects: [
      'Multi-agent financial document parsing (99.2% accuracy)',
      'Ray on Kubernetes GPU cluster for synthetic data',
      'Quantized vLLM models cutting GPU costs by 60%'
    ],
    certifications: ['NVIDIA Deep Learning Specialist', 'TensorFlow Developer'],
    preferredModels: ['Contract', 'Direct']
  },
  {
    id: 'talent-03',
    benchCode: 'ZGL-7209',
    title: 'Principal Full-Stack Architect',
    domain: 'Full-Stack & Backend',
    yearsOfExperience: 11,
    location: 'New York, NY (US Citizen)',
    availability: 'Available Immediately',
    rateGuide: '$100 - $125 / hr',
    topSkills: ['React / Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Redis', 'Kafka'],
    bioSummary: 'Full-stack lead architecting real-time trading dashboards and microservices.',
    recentProjects: [
      'Next.js App Router migration boosting Web Vitals by 45%',
      'WebSocket messaging handling 50k concurrent users',
      'Tailwind design system used by 60+ engineers'
    ],
    certifications: ['AWS Developer Associate', 'Apollo GraphQL Certified'],
    preferredModels: ['Contract', 'Contract-to-Hire', 'Direct']
  },
  {
    id: 'talent-04',
    benchCode: 'ZGL-6518',
    title: 'Senior DevSecOps Consultant',
    domain: 'Cybersecurity',
    yearsOfExperience: 9,
    location: 'Washington, DC (Top Secret)',
    availability: 'Available in 2 Weeks',
    rateGuide: '$115 - $140 / hr',
    topSkills: ['AWS/GCP Security', 'HashiCorp Vault', 'Wiz', 'K8s Security', 'SOC2 / HIPAA', 'Terraform'],
    bioSummary: 'Security specialist in automated CI/CD governance and SOC2/HIPAA compliance.',
    recentProjects: [
      'GitLab CI vulnerability scanning with Snyk and Trivy',
      'Dynamic Vault secrets rotation across 200+ services',
      'Remediated 400+ cloud vulnerabilities via Wiz'
    ],
    certifications: ['CISSP', 'CCSP', 'AWS Security Specialty'],
    preferredModels: ['Contract', 'Contract-to-Hire']
  },
  {
    id: 'talent-05',
    benchCode: 'ZGL-5832',
    title: 'Staff Snowflake & Data Architect',
    domain: 'Data Engineering',
    yearsOfExperience: 10,
    location: 'Chicago, IL (US Citizen)',
    availability: 'Available Immediately',
    rateGuide: '$105 - $130 / hr',
    topSkills: ['Snowflake', 'dbt Cloud', 'Apache Spark', 'Airflow', 'Kafka', 'Python', 'Data Vault'],
    bioSummary: 'Enterprise data architect building high-speed Snowflake analytics for 50TB+ warehouses.',
    recentProjects: [
      'Snowflake data warehouse replacing Oracle with 80% speedup',
      '200+ modular dbt models with Great Expectations tests',
      'Kafka pipelines streaming 800k events/sec to Delta Lake'
    ],
    certifications: ['Snowflake SnowPro Architect', 'dbt Certified Developer'],
    preferredModels: ['Contract', 'Direct']
  },
  {
    id: 'talent-06',
    benchCode: 'ZGL-4911',
    title: 'Senior Go & Backend Specialist',
    domain: 'Full-Stack & Backend',
    yearsOfExperience: 7,
    location: 'Seattle, WA (US Citizen)',
    availability: 'Available in 4 Days',
    rateGuide: '$95 - $115 / hr',
    topSkills: ['Golang', 'gRPC / Protobuf', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'NATS'],
    bioSummary: 'Backend engineer focused on sub-millisecond Go APIs and high-concurrency event loops.',
    recentProjects: [
      'Go payment routing engine processing $20M+ daily',
      'gRPC service mesh reducing payload overhead by 65%',
      'Redis distributed locking and rate limiting'
    ],
    certifications: ['CKAD Certified'],
    preferredModels: ['Contract', 'Contract-to-Hire']
  },
  {
    id: 'talent-07',
    benchCode: 'ZGL-3745',
    title: 'Senior SAP S/4HANA Lead',
    domain: 'Enterprise & ERP',
    yearsOfExperience: 13,
    location: 'Atlanta, GA (US Citizen)',
    availability: 'Available in 1 Week',
    rateGuide: '$130 - $160 / hr',
    topSkills: ['SAP S/4HANA', 'SAP BTP', 'SAP CPI', 'ABAP RESTful', 'Azure Integration', 'OData'],
    bioSummary: 'ERP architect with 4 full-lifecycle global SAP S/4HANA migrations.',
    recentProjects: [
      '$40M SAP S/4HANA rollout across 18 countries',
      '60+ real-time integration flows on SAP CPI',
      'Optimized ABAP CDS views with 4x faster reporting'
    ],
    certifications: ['SAP Certified S/4HANA', 'SAP Certified CPI'],
    preferredModels: ['Contract']
  },
  {
    id: 'talent-08',
    benchCode: 'ZGL-2903',
    title: 'Senior QA Automation Architect',
    domain: 'Full-Stack & Backend',
    yearsOfExperience: 9,
    location: 'Denver, CO (US Citizen)',
    availability: 'Available in 3 Days',
    rateGuide: '$80 - $100 / hr',
    topSkills: ['Playwright', 'Cypress', 'TypeScript', 'k6 Load Testing', 'CI/CD Pipelines', 'Appium'],
    bioSummary: 'QA architect automating end-to-end regression and high-load performance tests.',
    recentProjects: [
      'Playwright parallel suite cutting test runtime from 4h to 12m',
      'Shift-left k6 load testing in GitHub Actions',
      'API regression testing for 300+ REST and GraphQL endpoints'
    ],
    certifications: ['ISTQB Advanced Test Automation'],
    preferredModels: ['Contract', 'Contract-to-Hire']
  }
];
