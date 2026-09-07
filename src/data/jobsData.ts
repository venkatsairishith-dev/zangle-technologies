import { Job } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-01',
    title: 'Senior Cloud Platform Engineer',
    domain: 'Cloud & DevOps',
    companyName: 'Apex HealthTech',
    companyIndustry: 'Digital Healthcare',
    location: 'Austin, TX (Remote)',
    workLocation: 'Remote',
    jobType: 'Contract',
    experienceLevel: 'Senior',
    rateOrSalary: '$90 - $115 / hr',
    duration: '9-12 Months',
    postedDate: '2 days ago',
    urgentHiring: true,
    featured: true,
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Go', 'ArgoCD', 'Prometheus', 'Docker'],
    description: 'Design GitOps pipelines and optimize multi-region AWS EKS clusters for healthcare data systems.',
    responsibilities: [
      'Maintain multi-tenant AWS EKS clusters with Terraform and Helm',
      'Deploy automated GitOps pipelines with ArgoCD and GitHub Actions',
      'Optimize infrastructure for cost and zero-downtime releases'
    ],
    qualifications: [
      '6+ years in Cloud Infrastructure and DevOps',
      'Expertise in Kubernetes (EKS), Terraform, and Docker',
      'Hands-on experience with Datadog and Prometheus'
    ],
    perks: ['100% Remote', 'Weekly pay', 'Overtime paid 1.5x']
  },
  {
    id: 'job-02',
    title: 'Staff Full-Stack React & Node Engineer',
    domain: 'Full-Stack & Backend',
    companyName: 'FinVeloce Capital',
    companyIndustry: 'FinTech Trading',
    location: 'New York, NY (Hybrid)',
    workLocation: 'Hybrid',
    jobType: 'Contract-to-Hire',
    experienceLevel: 'Lead / Staff',
    rateOrSalary: '$105 - $130 / hr ($185k - $210k FTE)',
    duration: '6 Months C2H',
    postedDate: 'Just now',
    urgentHiring: true,
    featured: true,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Redis', 'Kafka', 'Next.js'],
    description: 'Build real-time trading dashboards, order-book charting, and high-throughput Node.js microservices.',
    responsibilities: [
      'Build low-latency UI interfaces in React/Next.js and TypeScript',
      'Design event-driven microservices with Node.js and Kafka',
      'Optimize client-side rendering for real-time WebSocket feeds'
    ],
    qualifications: [
      '7+ years in TypeScript, React, and Node.js',
      'Experience in distributed event-driven systems (Kafka, Redis)',
      'FinTech or trading platform background preferred'
    ],
    perks: ['Conversion bonus', 'Hardware setup', 'Health benefits']
  },
  {
    id: 'job-03',
    title: 'Lead GenAI & MLOps Architect',
    domain: 'AI / ML & Data Science',
    companyName: 'CognitiveCore',
    companyIndustry: 'Enterprise GenAI',
    location: 'San Francisco, CA (Remote)',
    workLocation: 'Remote',
    jobType: 'Direct Placement',
    experienceLevel: 'Principal / Architect',
    rateOrSalary: '$220,000 - $260,000 + Equity',
    duration: 'Full-Time Direct Hire',
    postedDate: '3 days ago',
    urgentHiring: false,
    featured: true,
    skills: ['PyTorch', 'vLLM', 'Ray', 'Kubeflow', 'AWS SageMaker', 'Python', 'CUDA', 'Triton'],
    description: 'Scale distributed training pipelines, GPU cluster utilization, and low-latency LLM serving engines.',
    responsibilities: [
      'Architect distributed LLM fine-tuning on NVIDIA GPU clusters',
      'Deploy automated quantization (AWQ) pipelines with vLLM/Triton',
      'Build evaluation frameworks and telemetry for foundation models'
    ],
    qualifications: [
      '8+ years in engineering, 4+ years in production ML/AI infra',
      'Deep expertise in GPU scheduling, Ray, and Triton Server',
      'Proficiency in Python, C++, and CUDA'
    ],
    perks: ['Equity grant', 'Unlimited PTO', '$5k learning budget']
  },
  {
    id: 'job-04',
    title: 'Senior DevSecOps Specialist',
    domain: 'Cybersecurity',
    companyName: 'ShieldGrid Cyber',
    companyIndustry: 'Cybersecurity',
    location: 'Washington, DC (Remote)',
    workLocation: 'Remote',
    jobType: 'Contract',
    experienceLevel: 'Senior',
    rateOrSalary: '$95 - $120 / hr',
    duration: '12 Months',
    postedDate: '4 days ago',
    urgentHiring: true,
    featured: false,
    skills: ['AWS Security', 'Terraform', 'Snyk', 'Wiz', 'Trivy', 'K8s Security', 'SOC2', 'Vault'],
    description: 'Embed automated security into CI/CD pipelines and implement Zero-Trust cloud architectures.',
    responsibilities: [
      'Integrate automated SAST and container scans into CI/CD',
      'Implement Vault secrets and Wiz cloud posture monitoring',
      'Remediate IaC security vulnerabilities in Terraform'
    ],
    qualifications: [
      '5+ years in Cloud Security and DevSecOps',
      'Proven experience securing Kubernetes and AWS/Azure',
      'CISSP or AWS Security Specialty preferred'
    ],
    perks: ['High hourly rate', 'Long-term stability', 'Remote']
  },
  {
    id: 'job-05',
    title: 'Principal Snowflake Data Engineer',
    domain: 'Data Engineering',
    companyName: 'Quantum Analytics',
    companyIndustry: 'Retail Intelligence',
    location: 'Chicago, IL (Remote)',
    workLocation: 'Remote',
    jobType: 'Contract-to-Hire',
    experienceLevel: 'Principal / Architect',
    rateOrSalary: '$110 - $135 / hr ($190k - $215k FTE)',
    duration: '6 Months C2H',
    postedDate: '1 week ago',
    urgentHiring: false,
    featured: true,
    skills: ['Snowflake', 'dbt', 'Apache Spark', 'Python', 'Airflow', 'Kafka', 'AWS S3'],
    description: 'Lead enterprise data warehouse modernization with dbt transformation models and streaming data lakes.',
    responsibilities: [
      'Design petabyte-scale pipelines with Python, Spark, and Snowflake',
      'Build automated data governance and lineage frameworks',
      'Optimize Snowflake warehouse configurations for cost and speed'
    ],
    qualifications: [
      '8+ years in Data Engineering & Architecture',
      'Mastery of Snowflake, dbt Cloud, and Airflow',
      'Experience with Kafka streaming architectures'
    ],
    perks: ['Executive FTE role transition', 'Modern data stack']
  },
  {
    id: 'job-06',
    title: 'Senior Go Backend Engineer',
    domain: 'Full-Stack & Backend',
    companyName: 'AeroGrid Logistics',
    companyIndustry: 'Autonomous Supply Chain',
    location: 'Seattle, WA (Remote)',
    workLocation: 'Remote',
    jobType: 'Direct Placement',
    experienceLevel: 'Senior',
    rateOrSalary: '$170,000 - $195,000 + Bonus',
    duration: 'Full-Time Direct Hire',
    postedDate: '5 days ago',
    urgentHiring: false,
    featured: false,
    skills: ['Go (Golang)', 'gRPC', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Microservices'],
    description: 'Build core backend telemetry and routing microservices for autonomous fleet management.',
    responsibilities: [
      'Develop fault-tolerant backend microservices in Go',
      'Design low-latency gRPC APIs for IoT edge gateways',
      'Optimize PostgreSQL and Redis queries for live telemetry'
    ],
    qualifications: [
      '5+ years in Go (Golang) and distributed systems',
      'Strong grasp of concurrency patterns and memory management',
      'B.S. in Computer Science or equivalent experience'
    ],
    perks: ['401(k) 5% match', 'Health/dental/vision', 'Office stipend']
  },
  {
    id: 'job-07',
    title: 'Senior SAP S/4HANA Consultant',
    domain: 'Enterprise & ERP',
    companyName: 'Vanguard Industrial',
    companyIndustry: 'Manufacturing',
    location: 'Atlanta, GA (Hybrid)',
    workLocation: 'Hybrid',
    jobType: 'Contract',
    experienceLevel: 'Senior',
    rateOrSalary: '$120 - $145 / hr',
    duration: '12-18 Months',
    postedDate: '3 days ago',
    urgentHiring: true,
    featured: false,
    skills: ['SAP S/4HANA', 'SAP CPI', 'BTP', 'OData', 'ABAP RESTful', 'Azure'],
    description: 'Lead SAP BTP and CPI integration middleware connecting SAP S/4HANA with modern cloud platforms.',
    responsibilities: [
      'Design integration flows on SAP Cloud Platform Integration (CPI)',
      'Build OData services and ABAP Core Data Services views',
      'Map and transform legacy interfaces for ERP cutover'
    ],
    qualifications: [
      '7+ years in SAP technical architecture and integration',
      'Hands-on experience with SAP BTP and SAP S/4HANA migrations',
      'Expertise in REST, OData, and modern API protocols'
    ],
    perks: ['Premium billing rate', 'Travel expenses covered']
  },
  {
    id: 'job-08',
    title: 'Senior Mobile Engineer (React Native)',
    domain: 'Full-Stack & Backend',
    companyName: 'PulseFit Connected',
    companyIndustry: 'Consumer IoT',
    location: 'Boston, MA (Remote)',
    workLocation: 'Remote',
    jobType: 'Contract',
    experienceLevel: 'Senior',
    rateOrSalary: '$85 - $110 / hr',
    duration: '6 Months',
    postedDate: '1 day ago',
    urgentHiring: false,
    featured: false,
    skills: ['React Native', 'TypeScript', 'BLE', 'iOS (Swift)', 'Android (Kotlin)', 'Redux'],
    description: 'Architect cross-platform mobile apps interfacing with low-energy Bluetooth hardware devices.',
    responsibilities: [
      'Build performant React Native apps for iOS and Android',
      'Develop native bridge modules in Swift and Kotlin for BLE sync',
      'Optimize battery consumption and offline data caching'
    ],
    qualifications: [
      '5+ years in mobile development, 3+ years in React Native',
      'Experience with Bluetooth Low Energy (BLE) peripherals',
      'Published apps on Apple App Store & Google Play Store'
    ],
    perks: ['100% remote', 'Hardware device kit provided']
  },
  {
    id: 'job-09',
    title: 'Senior Site Reliability Engineer',
    domain: 'Cloud & DevOps',
    companyName: 'Starlight Stream Media',
    companyIndustry: 'Entertainment & Streaming',
    location: 'Los Angeles, CA (Remote)',
    workLocation: 'Remote',
    jobType: 'Contract',
    experienceLevel: 'Senior',
    rateOrSalary: '$95 - $125 / hr',
    duration: '12 Months',
    postedDate: '2 days ago',
    urgentHiring: true,
    featured: false,
    skills: ['Kubernetes', 'Datadog', 'Terraform', 'OpenTelemetry', 'Python', 'AWS'],
    description: 'Build observability dashboards, automated SLO alerts, and chaos engineering drills for video streaming.',
    responsibilities: [
      'Manage multi-region Kubernetes clusters handling peak traffic spikes',
      'Build OpenTelemetry and Datadog APM dashboards and SLO monitors',
      'Execute chaos engineering experiments to harden platform resilience'
    ],
    qualifications: [
      '6+ years in SRE and DevOps for high-traffic platforms',
      'Production experience with Kubernetes, Terraform, and APM tools',
      'Proficiency in Python or Go for infrastructure automation'
    ],
    perks: ['100% remote', 'Top hourly billing rate']
  }
];

export const JOBS_DATA: Job[] = INITIAL_JOBS;

