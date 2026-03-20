export const INDUSTRIES = [
  'Healthcare','Finance & Banking','Retail & E-commerce','Manufacturing',
  'Education','Government','Technology','Logistics & Supply Chain',
  'Real Estate','Professional Services','Telecommunications','Energy & Utilities'
]

export const BIZ_SIZES = [
  'Startup (1–10)','Small (11–50)','Medium (51–200)','Large (201–1000)','Enterprise (1000+)'
]

export const DEPARTMENTS = [
  'Operations','Customer Service','Sales','Marketing','HR & People',
  'Finance & Accounting','IT & Engineering','Procurement','Legal & Compliance','Product Management'
]

export const URGENCY_LEVELS = [
  'Low — exploring options',
  'Medium — planning for next quarter',
  'High — actively blocking operations',
  'Critical — causing revenue loss now'
]

export const EXAMPLE_PROMPTS = [
  {
    title: 'Customer Onboarding',
    text: 'Our customer onboarding is slow, teams use spreadsheets, approvals happen over email, and nobody knows where applications get stuck. We lose about 15% of new customers during the process.'
  },
  {
    title: 'Invoice Processing',
    text: 'Invoices arrive via email, fax, and mail. Someone manually enters them into our accounting system. Approvals take 2–3 weeks because managers are never available. We frequently pay late fees.'
  },
  {
    title: 'HR Recruitment',
    text: 'Our hiring process takes 45+ days. Resumes pile up in shared folders, interview feedback is scattered across Slack and email, and hiring managers don\'t know the status of their open positions.'
  },
  {
    title: 'Inventory Management',
    text: 'We track inventory in Excel across 3 warehouses. Stock counts are always wrong, we overorder some items and run out of others. Returns processing takes weeks and nobody reconciles the numbers.'
  }
]

export const SCORING_DIMENSIONS = [
  { key: 'processClarity',      label: 'Process Clarity',       desc: 'How well-defined are current workflows' },
  { key: 'manualEffort',        label: 'Manual Effort',          desc: 'Level of manual/repetitive work' },
  { key: 'systemFragmentation', label: 'System Fragmentation',   desc: 'How scattered tools and data are' },
  { key: 'approvalComplexity',  label: 'Approval Complexity',    desc: 'Bottlenecks in decision chains' },
  { key: 'automationPotential', label: 'Automation Potential',   desc: 'Opportunity for digital automation' },
  { key: 'dataVisibility',      label: 'Data Visibility',        desc: 'Access to real-time data and insights' },
  { key: 'reportingMaturity',   label: 'Reporting Maturity',     desc: 'Quality of analytics and reporting' },
  { key: 'customerImpact',      label: 'Customer Impact',        desc: 'Effect on customer experience' },
  { key: 'businessRisk',        label: 'Business Risk',          desc: 'Risk to business continuity' },
]

export const SAMPLE_REPORTS = [
  {
    id: 'DX-001',
    title: 'Customer Onboarding — FinTech',
    industry: 'Finance & Banking',
    department: 'Operations',
    overallScore: 6.8,
    createdAt: '2025-03-15T10:30:00Z',
    status: 'complete'
  },
  {
    id: 'DX-002',
    title: 'Invoice Processing — Retail',
    industry: 'Retail & E-commerce',
    department: 'Finance & Accounting',
    overallScore: 7.4,
    createdAt: '2025-03-10T14:20:00Z',
    status: 'complete'
  },
  {
    id: 'DX-003',
    title: 'HR Recruitment Pipeline',
    industry: 'Technology',
    department: 'HR & People',
    overallScore: 5.9,
    createdAt: '2025-03-05T09:00:00Z',
    status: 'complete'
  }
]
