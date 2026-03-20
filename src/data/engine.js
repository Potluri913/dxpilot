export function generateDiagnosis(input) {
  const { problem, industry, bizSize, department, tools, urgency } = input
  const w = problem.toLowerCase()

  const has = (...terms) => terms.some(t => w.includes(t))
  const hasSlow       = has('slow','delay','bottleneck','stuck','wait')
  const hasManual     = has('manual','manually','hand','spreadsheet','excel')
  const hasEmail      = has('email','gmail','outlook')
  const hasApproval   = has('approval','approve','sign-off','sign off')
  const hasOnboarding = has('onboard','customer','client')
  const hasInvoice    = has('invoice','payment','billing','accounts')
  const hasHR         = has('hiring','recruit','hr','resume','interview')
  const hasInventory  = has('inventory','stock','warehouse','supply')

  const symptoms = []
  if (hasSlow)    symptoms.push('Process delays and slow cycle times impacting throughput')
  if (hasEmail)   symptoms.push('Critical workflows running through unstructured email chains')
  if (hasManual)  symptoms.push('High manual effort with repetitive, error-prone data tasks')
  if (hasApproval) symptoms.push('Approval bottlenecks creating queues with no visibility')
  if (symptoms.length < 4) {
    symptoms.push('Lack of real-time process visibility and status tracking')
    symptoms.push('Inconsistent handoffs between teams causing rework')
    symptoms.push('No standardized procedures, SLAs, or escalation paths')
  }

  const rootCauses = [
    'No centralized system of record for the process',
    'Reliance on informal communication channels (email, chat)',
    'Absence of automated workflow triggers and escalation rules',
    hasManual ? 'Spreadsheet-based tracking with no version control or audit trail' : 'Fragmented tooling without integration or data sync',
    hasApproval ? 'Sequential approval chains with no parallel processing capability' : 'Unclear ownership and accountability gaps across teams',
  ]

  const bottlenecks = [
    { name: 'Data Entry & Collection', severity: 'High', description: 'Manual data gathering from multiple sources creates delays and errors' },
    { name: hasApproval ? 'Approval Routing' : 'Decision Making', severity: 'Critical', description: 'Requests wait in queues with no visibility into status or escalation paths' },
    { name: 'Team Handoffs', severity: 'Medium', description: 'Information loss during transitions causes rework and confusion' },
    { name: 'Reporting & Visibility', severity: 'High', description: 'No real-time dashboards; status requires manual compilation' },
  ]

  const scores = {
    processClarity:      Math.max(1, 4 - (hasSlow ? 1 : 0) - (hasManual ? 1 : 0)),
    manualEffort:        Math.min(10, 5 + (hasManual ? 3 : 0) + (hasEmail ? 1 : 0)),
    systemFragmentation: Math.min(10, 4 + (hasManual ? 2 : 0) + (hasEmail ? 2 : 0)),
    approvalComplexity:  Math.min(10, 3 + (hasApproval ? 4 : 0) + (hasSlow ? 1 : 0)),
    automationPotential: Math.min(10, 7 + (hasManual ? 2 : 0)),
    dataVisibility:      Math.max(1, 5 - (hasManual ? 2 : 0) - (hasEmail ? 1 : 0)),
    reportingMaturity:   Math.max(1, 4 - (hasManual ? 2 : 0)),
    customerImpact:      Math.min(10, 4 + (hasOnboarding ? 3 : 0) + (hasSlow ? 2 : 0)),
    businessRisk:        Math.min(10, 4 + (hasManual ? 2 : 0) + (hasSlow ? 2 : 0)),
  }

  const overallScore = +(Object.values(scores).reduce((a, b) => a + b, 0) / 9).toFixed(1)

  const recommendations = []
  if (hasManual || hasManual)
    recommendations.push({ category: 'Workflow Automation', icon: '⟳', name: 'Implement Workflow Automation Platform', why: 'Eliminates manual handoffs and creates trackable, repeatable processes', complexity: 'Medium', timeline: '6–8 weeks', roi: '3–5× in 12 months', confidence: 92 })
  if (hasOnboarding || hasInvoice)
    recommendations.push({ category: 'CRM / ERP', icon: '♟', name: 'Deploy CRM with Lifecycle Workflows', why: 'Centralizes data and automates lifecycle stages end-to-end', complexity: 'Medium–High', timeline: '8–12 weeks', roi: '2–4× in 18 months', confidence: 87 })
  if (hasManual || hasEmail)
    recommendations.push({ category: 'Document Management', icon: '▤', name: 'Centralized Document & Data Hub', why: 'Single source of truth replaces scattered spreadsheets and email attachments', complexity: 'Low–Medium', timeline: '3–4 weeks', roi: '2× in 6 months', confidence: 95 })
  recommendations.push({ category: 'BI & Analytics', icon: '▥', name: 'Real-Time Analytics Dashboard', why: 'Provides instant visibility into process performance and bottlenecks', complexity: 'Low', timeline: '2–4 weeks', roi: '1.5–2× in 6 months', confidence: 90 })
  if (hasManual)
    recommendations.push({ category: 'RPA', icon: '⚙', name: 'RPA for Repetitive Data Tasks', why: 'Automates high-volume, rule-based tasks that consume staff time', complexity: 'Medium', timeline: '4–6 weeks', roi: '4–6× in 12 months', confidence: 85 })
  if (recommendations.length < 4)
    recommendations.push({ category: 'Low-Code Apps', icon: '▧', name: 'Low-Code Internal Tools', why: 'Rapid development of custom process apps without heavy IT investment', complexity: 'Low–Medium', timeline: '2–6 weeks per app', roi: '2–3× in 9 months', confidence: 82 })

  const roadmap = [
    { phase: 'Phase 1: Foundation', weeks: 'Weeks 1–4', color: '#3B82F6', items: ['Process mapping and documentation', 'Quick wins implementation', 'Tool selection and procurement', 'Team alignment workshops'] },
    { phase: 'Phase 2: Core Build', weeks: 'Weeks 5–12', color: '#8B5CF6', items: ['Primary platform deployment', 'Data migration and integration', 'Workflow automation setup', 'User training program'] },
    { phase: 'Phase 3: Optimization', weeks: 'Weeks 13–20', color: '#10B981', items: ['Analytics dashboard launch', 'Process refinement based on data', 'Advanced automation rules', 'Self-service portal deployment'] },
    { phase: 'Phase 4: Scale', weeks: 'Weeks 21–26', color: '#06B6D4', items: ['AI-powered recommendations', 'Cross-department expansion', 'Continuous improvement framework', 'ROI measurement and reporting'] },
  ]

  const kpis = [
    { metric: 'Cycle Time', current: hasSlow ? '15–20 days' : '7–10 days', target: '2–3 days', improvement: '80% reduction' },
    { metric: 'Manual Touch Points', current: hasManual ? '12–15 per case' : '8–10 per case', target: '2–3 per case', improvement: '75% reduction' },
    { metric: 'Error Rate', current: '8–12%', target: '<2%', improvement: '80% reduction' },
    { metric: 'Process Visibility', current: 'Ad-hoc', target: 'Real-time dashboard', improvement: '100% visibility' },
    { metric: 'Staff Satisfaction', current: 'Low', target: 'High', improvement: 'Measurable via survey' },
  ]

  const risks = [
    { risk: 'Change resistance from teams', likelihood: 'High', impact: 'Medium', mitigation: 'Early stakeholder involvement and phased rollout' },
    { risk: 'Data migration complexity', likelihood: 'Medium', impact: 'High', mitigation: 'Thorough data audit and parallel run period' },
    { risk: 'Integration with legacy systems', likelihood: 'Medium', impact: 'Medium', mitigation: 'API-first approach with middleware layer' },
  ]

  return {
    id: `DX-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    title: `${department || 'Operations'} Process Transformation — ${industry || 'General'}`,
    summary: `Analysis of ${department?.toLowerCase() || 'operational'} challenges in a ${bizSize?.toLowerCase() || 'mid-size'} ${industry?.toLowerCase() || ''} organization. The diagnosis reveals significant opportunities for digital transformation, particularly in workflow automation and data centralization. Current process maturity score: ${overallScore}/10.`,
    input,
    symptoms, rootCauses, bottlenecks,
    scores, overallScore,
    recommendations, roadmap, kpis, risks,
    quickWins: [
      { action: 'Set up a shared project board for process tracking', effort: '1 day', impact: 'High' },
      { action: 'Create standard templates for common requests', effort: '2–3 days', impact: 'Medium' },
      { action: 'Implement notification rules for stalled items', effort: '1 day', impact: 'High' },
      { action: 'Document the current process with a simple flowchart', effort: 'Half day', impact: 'Medium' },
    ],
    estimatedImpact: {
      costReduction: '25–40%', timeReduction: '60–80%',
      errorReduction: '70–90%', satisfactionIncrease: '45–65%'
    },
    opportunities: [
      'End-to-end process automation',
      'Real-time visibility and tracking',
      'Data-driven decision making',
      'Self-service portals for stakeholders',
      'Predictive analytics for bottleneck prevention',
    ],
    stakeholders: [department || 'Operations', 'IT / Technology', 'Management', 'End Users'].filter(Boolean),
  }
}
