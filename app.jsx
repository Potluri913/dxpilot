const { useState, useEffect, useCallback, useRef, useMemo } = React;

// ─── CONSTANTS & CONFIG ─────────────────────────────────────────────
const INDUSTRIES = ["Healthcare","Finance & Banking","Retail & E-commerce","Manufacturing","Education","Government","Technology","Logistics & Supply Chain","Real Estate","Professional Services","Telecommunications","Energy & Utilities"];
const BIZ_SIZES = ["Startup (1-10)","Small (11-50)","Medium (51-200)","Large (201-1000)","Enterprise (1000+)"];
const DEPARTMENTS = ["Operations","Customer Service","Sales","Marketing","HR & People","Finance & Accounting","IT & Engineering","Procurement","Legal & Compliance","Product Management"];
const URGENCY = ["Low — exploring options","Medium — planning for next quarter","High — actively blocking operations","Critical — causing revenue loss now"];
const EXAMPLE_PROMPTS = [
  { title: "Customer Onboarding Chaos", text: "Our customer onboarding is slow, teams use spreadsheets, approvals happen over email, and nobody knows where applications get stuck. We lose about 15% of new customers during the process." },
  { title: "Invoice Processing Nightmare", text: "Invoices arrive via email, fax, and mail. Someone manually enters them into our accounting system. Approvals take 2-3 weeks because managers are never available. We frequently pay late fees." },
  { title: "HR Recruitment Bottleneck", text: "Our hiring process takes 45+ days. Resumes pile up in shared folders, interview feedback is scattered across Slack and email, and hiring managers don't know the status of their open positions." },
  { title: "Inventory Management Gaps", text: "We track inventory in Excel across 3 warehouses. Stock counts are always wrong, we overorder some items and run out of others. Returns processing takes weeks and nobody reconciles the numbers." },
];
const SCORING_DIMENSIONS = [
  { key: "processClarity", label: "Process Clarity", icon: "◎", desc: "How well-defined are current workflows" },
  { key: "manualEffort", label: "Manual Effort", icon: "⚙", desc: "Level of manual/repetitive work involved" },
  { key: "systemFragmentation", label: "System Fragmentation", icon: "◧", desc: "How scattered tools and data are" },
  { key: "approvalComplexity", label: "Approval Complexity", icon: "⊘", desc: "Bottlenecks in decision/approval chains" },
  { key: "automationPotential", label: "Automation Potential", icon: "⚡", desc: "Opportunity for digital automation" },
  { key: "dataVisibility", label: "Data Visibility", icon: "◉", desc: "Access to real-time data and insights" },
  { key: "reportingMaturity", label: "Reporting Maturity", icon: "▦", desc: "Quality of analytics and reporting" },
  { key: "customerImpact", label: "Customer Impact", icon: "★", desc: "Effect on customer experience" },
  { key: "businessRisk", label: "Business Risk", icon: "△", desc: "Risk to business continuity" },
];
const SOLUTION_CATEGORIES = [
  { id: "workflow", name: "Workflow Automation", icon: "⟳" },
  { id: "crm", name: "CRM Implementation", icon: "♟" },
  { id: "erp", name: "ERP Integration", icon: "⬡" },
  { id: "docmgmt", name: "Document Management", icon: "▤" },
  { id: "bi", name: "BI / Dashboarding", icon: "▥" },
  { id: "rpa", name: "RPA", icon: "⚙" },
  { id: "ai", name: "AI Copilots", icon: "◈" },
  { id: "helpdesk", name: "Helpdesk / Ticketing", icon: "✎" },
  { id: "lowcode", name: "Low-Code Apps", icon: "▧" },
  { id: "kb", name: "Knowledge Base / SOP", icon: "▨" },
];

// ─── DIAGNOSIS ENGINE ───────────────────────────────────────────────
function generateDiagnosis(input) {
  const { problem, industry, bizSize, department, tools, people, urgency, goals } = input;
  const words = problem.toLowerCase();
  const hasOnboarding = words.includes("onboard");
  const hasInvoice = words.includes("invoice") || words.includes("payment");
  const hasHR = words.includes("hiring") || words.includes("recruit") || words.includes("hr");
  const hasInventory = words.includes("inventory") || words.includes("stock") || words.includes("warehouse");
  const hasEmail = words.includes("email");
  const hasSpreadsheet = words.includes("spreadsheet") || words.includes("excel");
  const hasApproval = words.includes("approval") || words.includes("approve");
  const hasSlow = words.includes("slow") || words.includes("delay") || words.includes("bottleneck");
  const hasManual = words.includes("manual") || words.includes("manually");

  const symptoms = [];
  if (hasSlow) symptoms.push("Process delays and slow cycle times");
  if (hasEmail) symptoms.push("Critical workflows running through email");
  if (hasSpreadsheet) symptoms.push("Data scattered across spreadsheets");
  if (hasApproval) symptoms.push("Approval bottlenecks causing delays");
  if (hasManual) symptoms.push("High manual effort and repetitive tasks");
  if (symptoms.length < 3) {
    symptoms.push("Lack of process visibility and tracking");
    symptoms.push("Inconsistent handoffs between teams");
    symptoms.push("No standardized procedures or SLAs");
  }

  const rootCauses = [
    "No centralized system of record for the process",
    "Reliance on informal communication channels",
    "Absence of automated workflow triggers and escalations",
    hasSpreadsheet ? "Spreadsheet-based tracking with no version control" : "Fragmented tooling without integration",
    hasApproval ? "Sequential approval chains with no parallel processing" : "Unclear ownership and accountability gaps",
  ];

  const bottlenecks = [
    { name: "Data Entry & Collection", severity: "High", description: "Manual data gathering from multiple sources creates delays and errors" },
    { name: hasApproval ? "Approval Routing" : "Decision Making", severity: "Critical", description: "Requests wait in queues with no visibility into status or escalation paths" },
    { name: "Handoff Between Teams", severity: "Medium", description: "Information loss during team transitions causes rework and confusion" },
    { name: "Reporting & Visibility", severity: "High", description: "No real-time dashboards; status requires manual compilation" },
  ];

  const scores = {
    processClarity: Math.max(1, 3 - (hasSlow ? 1 : 0) - (hasManual ? 1 : 0)),
    manualEffort: Math.min(10, 6 + (hasManual ? 2 : 0) + (hasSpreadsheet ? 1 : 0)),
    systemFragmentation: Math.min(10, 5 + (hasSpreadsheet ? 2 : 0) + (hasEmail ? 2 : 0)),
    approvalComplexity: Math.min(10, 4 + (hasApproval ? 3 : 0) + (hasSlow ? 1 : 0)),
    automationPotential: Math.min(10, 7 + (hasManual ? 1 : 0)),
    dataVisibility: Math.max(1, 4 - (hasSpreadsheet ? 2 : 0)),
    reportingMaturity: Math.max(1, 3 - (hasSpreadsheet ? 1 : 0)),
    customerImpact: Math.min(10, 5 + (hasOnboarding ? 3 : 0) + (hasSlow ? 1 : 0)),
    businessRisk: Math.min(10, 5 + (hasManual ? 1 : 0) + (hasSlow ? 1 : 0)),
  };

  const overallScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length * 10) / 10;

  const recommendations = [];
  if (hasManual || hasSpreadsheet) recommendations.push({ category: "workflow", name: "Implement Workflow Automation Platform", why: "Eliminates manual handoffs and creates trackable, repeatable processes", problemSolved: "Manual data entry, lost requests, and invisible process status", complexity: "Medium", timeline: "6-8 weeks", roi: "3-5x within 12 months", prerequisites: ["Process mapping workshop", "Stakeholder alignment", "Tool evaluation"], confidence: 92 });
  if (hasOnboarding || words.includes("customer")) recommendations.push({ category: "crm", name: "Deploy CRM with Onboarding Workflows", why: "Centralizes customer data and automates lifecycle stages", problemSolved: "Fragmented customer information and inconsistent follow-ups", complexity: "Medium-High", timeline: "8-12 weeks", roi: "2-4x within 18 months", prerequisites: ["Customer journey mapping", "Data migration plan", "Team training program"], confidence: 87 });
  if (hasSpreadsheet || hasEmail) recommendations.push({ category: "docmgmt", name: "Centralized Document & Data Management", why: "Single source of truth replaces scattered spreadsheets and email attachments", problemSolved: "Version conflicts, data loss, and access control issues", complexity: "Low-Medium", timeline: "3-4 weeks", roi: "2x within 6 months", prerequisites: ["Document audit", "Folder structure design", "Access policy definition"], confidence: 95 });
  recommendations.push({ category: "bi", name: "Real-Time Analytics Dashboard", why: "Provides instant visibility into process performance and bottlenecks", problemSolved: "Blind spots in operations and delayed decision-making", complexity: "Low", timeline: "2-4 weeks", roi: "1.5-2x within 6 months", prerequisites: ["KPI definition", "Data source integration", "Dashboard wireframes"], confidence: 90 });
  if (hasManual) recommendations.push({ category: "rpa", name: "RPA for Repetitive Data Tasks", why: "Automates high-volume, rule-based tasks that consume staff time", problemSolved: "Data entry errors, slow processing, and staff burnout", complexity: "Medium", timeline: "4-6 weeks", roi: "4-6x within 12 months", prerequisites: ["Task audit and prioritization", "Bot development environment", "Testing framework"], confidence: 85 });
  if (recommendations.length < 4) recommendations.push({ category: "lowcode", name: "Low-Code Internal Tools", why: "Rapid development of custom process apps without heavy IT investment", problemSolved: "Process gaps not covered by off-the-shelf software", complexity: "Low-Medium", timeline: "2-6 weeks per app", roi: "2-3x within 9 months", prerequisites: ["Requirements gathering", "Platform selection", "Citizen developer training"], confidence: 82 });

  const quickWins = [
    { action: "Set up a shared project board for process tracking", effort: "1 day", impact: "High" },
    { action: "Create standard templates for common requests", effort: "2-3 days", impact: "Medium" },
    { action: "Implement notification rules for stalled items", effort: "1 day", impact: "High" },
    { action: "Document the current process with a simple flowchart", effort: "Half day", impact: "Medium" },
  ];

  const roadmap = [
    { phase: "Phase 1: Foundation", weeks: "Weeks 1-4", items: ["Process mapping and documentation", "Quick wins implementation", "Tool selection and procurement", "Team alignment workshops"] },
    { phase: "Phase 2: Core Build", weeks: "Weeks 5-12", items: ["Primary platform deployment", "Data migration and integration", "Workflow automation setup", "User training program"] },
    { phase: "Phase 3: Optimization", weeks: "Weeks 13-20", items: ["Analytics dashboard launch", "Process refinement based on data", "Advanced automation rules", "Self-service portal deployment"] },
    { phase: "Phase 4: Scale", weeks: "Weeks 21-26", items: ["AI-powered recommendations", "Cross-department expansion", "Continuous improvement framework", "ROI measurement and reporting"] },
  ];

  const kpis = [
    { metric: "Cycle Time", current: hasSlow ? "15-20 days" : "7-10 days", target: "2-3 days", improvement: "80% reduction" },
    { metric: "Manual Touch Points", current: hasManual ? "12-15 per case" : "8-10 per case", target: "2-3 per case", improvement: "75% reduction" },
    { metric: "Error Rate", current: "8-12%", target: "<2%", improvement: "80% reduction" },
    { metric: "Process Visibility", current: "Ad-hoc", target: "Real-time dashboard", improvement: "100% visibility" },
    { metric: "Staff Satisfaction", current: "Low", target: "High", improvement: "Measurable via survey" },
  ];

  const risks = [
    { risk: "Change resistance from teams", likelihood: "High", impact: "Medium", mitigation: "Early stakeholder involvement and phased rollout" },
    { risk: "Data migration complexity", likelihood: "Medium", impact: "High", mitigation: "Thorough data audit and parallel run period" },
    { risk: "Integration challenges with legacy systems", likelihood: "Medium", impact: "Medium", mitigation: "API-first approach with middleware layer" },
  ];

  return {
    id: `DX-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    title: `${department || "Operations"} Process Transformation — ${industry || "General"}`,
    summary: `Analysis of ${department?.toLowerCase() || "operational"} challenges in a ${bizSize?.toLowerCase() || "mid-size"} ${industry?.toLowerCase() || ""} organization. The diagnosis reveals significant opportunities for digital transformation, particularly in workflow automation and data centralization. The current process maturity score of ${overallScore}/10 indicates substantial room for improvement.`,
    input: { problem, industry, bizSize, department, tools, people, urgency, goals },
    symptoms, rootCauses, bottlenecks,
    stakeholders: [department || "Operations", "IT / Technology", "Management", "End Users / Customers"].filter(Boolean),
    currentTools: tools ? tools.split(",").map(t => t.trim()) : ["Email", "Spreadsheets", "Shared drives"],
    maturityScores: scores, overallScore, recommendations, quickWins, roadmap, kpis, risks,
    estimatedImpact: { costReduction: "25-40%", timeReduction: "60-80%", errorReduction: "70-90%", satisfactionIncrease: "45-65%" },
    opportunities: ["End-to-end process automation", "Real-time visibility and tracking", "Data-driven decision making", "Self-service portals for stakeholders", "Predictive analytics for bottleneck prevention"],
  };
}

// ─── STYLE SYSTEM ───────────────────────────────────────────────────
const colors = {
  bg: "#0B0F1A", bgCard: "#111827", bgHover: "#1A2236", bgAccent: "#0D2847",
  border: "#1E293B", borderLight: "#2A3A52",
  text: "#E2E8F0", textMuted: "#8899B0", textDim: "#5A6A82",
  accent: "#3B82F6", accentLight: "#60A5FA", accentDark: "#1D4ED8",
  green: "#10B981", greenDark: "#065F46", amber: "#F59E0B", amberDark: "#78350F",
  red: "#EF4444", redDark: "#7F1D1D", purple: "#8B5CF6", pink: "#EC4899",
  cyan: "#06B6D4",
};

// ─── ICONS ──────────────────────────────────────────────────────────
const Icons = {
  Home: () => React.createElement("svg", { width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("path",{d:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"}), React.createElement("polyline",{points:"9 22 9 12 15 12 15 22"})),
  Plus: () => React.createElement("svg", { width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("line",{x1:12,y1:5,x2:12,y2:19}), React.createElement("line",{x1:5,y1:12,x2:19,y2:12})),
  File: () => React.createElement("svg", { width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}), React.createElement("polyline",{points:"14 2 14 8 20 8"})),
  Settings: () => React.createElement("svg", { width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("circle",{cx:12,cy:12,r:3}), React.createElement("path",{d:"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"})),
  ChevRight: () => React.createElement("svg", { width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("polyline",{points:"9 18 15 12 9 6"})),
  Download: () => React.createElement("svg", { width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}), React.createElement("polyline",{points:"7 10 12 15 17 10"}), React.createElement("line",{x1:12,y1:15,x2:12,y2:3})),
  Trash: () => React.createElement("svg", { width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("polyline",{points:"3 6 5 6 21 6"}), React.createElement("path",{d:"M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"})),
  Check: () => React.createElement("svg", { width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("polyline",{points:"20 6 9 17 4 12"})),
  Arrow: () => React.createElement("svg", { width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("line",{x1:5,y1:12,x2:19,y2:12}), React.createElement("polyline",{points:"12 5 19 12 12 19"})),
  Menu: () => React.createElement("svg", { width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("line",{x1:3,y1:12,x2:21,y2:12}), React.createElement("line",{x1:3,y1:6,x2:21,y2:6}), React.createElement("line",{x1:3,y1:18,x2:21,y2:18})),
  X: () => React.createElement("svg", { width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("line",{x1:18,y1:6,x2:6,y2:18}), React.createElement("line",{x1:6,y1:6,x2:18,y2:18})),
  Zap: () => React.createElement("svg", { width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})),
  Brain: () => React.createElement("svg", { width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("path",{d:"M12 2a5 5 0 015 5c0 .8-.2 1.5-.5 2.2A5 5 0 0120 14a5 5 0 01-3.2 4.7A4 4 0 0112 22a4 4 0 01-4.8-3.3A5 5 0 014 14a5 5 0 013.5-4.8A5 5 0 017 7a5 5 0 015-5z"})),
  Compare: () => React.createElement("svg", { width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("rect",{x:3,y:3,width:7,height:18,rx:1}), React.createElement("rect",{x:14,y:3,width:7,height:18,rx:1})),
  Clock: () => React.createElement("svg", { width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round" }, React.createElement("circle",{cx:12,cy:12,r:10}), React.createElement("polyline",{points:"12 6 12 12 16 14"})),
};

// ─── REUSABLE COMPONENTS ────────────────────────────────────────────
function Button({ children, variant = "primary", size = "md", onClick, disabled, style: sx, ...props }) {
  const base = { border: "none", borderRadius: 8, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s ease", opacity: disabled ? 0.5 : 1, letterSpacing: "0.01em" };
  const sizes = { sm: { padding: "6px 14px", fontSize: 13 }, md: { padding: "10px 22px", fontSize: 14 }, lg: { padding: "14px 32px", fontSize: 16 } };
  const variants = {
    primary: { background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`, color: "#fff", boxShadow: "0 2px 12px rgba(59,130,246,0.3)" },
    secondary: { background: colors.bgHover, color: colors.text, border: `1px solid ${colors.border}` },
    ghost: { background: "transparent", color: colors.textMuted },
    danger: { background: colors.redDark, color: colors.red, border: `1px solid ${colors.red}33` },
    success: { background: colors.greenDark, color: colors.green, border: `1px solid ${colors.green}33` },
  };
  return React.createElement("button", { onClick, disabled, style: { ...base, ...sizes[size], ...variants[variant], ...sx }, ...props }, children);
}

function Card({ children, style: sx, hover, onClick, ...props }) {
  const [hovered, setHovered] = useState(false);
  return React.createElement("div", {
    onMouseEnter: () => hover && setHovered(true),
    onMouseLeave: () => hover && setHovered(false),
    onClick,
    style: { background: colors.bgCard, border: `1px solid ${hovered ? colors.borderLight : colors.border}`, borderRadius: 14, padding: 24, transition: "all 0.25s ease", transform: hovered ? "translateY(-2px)" : "none", boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.1)", cursor: onClick ? "pointer" : "default", ...sx },
    ...props
  }, children);
}

function Badge({ children, color = colors.accent, style: sx }) {
  return React.createElement("span", { style: { display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: `${color}15`, color, border: `1px solid ${color}30`, letterSpacing: "0.03em", ...sx } }, children);
}

function ScoreBar({ value, max = 10, color = colors.accent, label, showValue = true }) {
  const pct = (value / max) * 100;
  return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, width: "100%" } },
    label && React.createElement("span", { style: { fontSize: 13, color: colors.textMuted, minWidth: 140, flexShrink: 0 } }, label),
    React.createElement("div", { style: { flex: 1, height: 8, background: colors.bgHover, borderRadius: 4, overflow: "hidden" } },
      React.createElement("div", { style: { width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${color}CC)`, borderRadius: 4, transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)" } })
    ),
    showValue && React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color, minWidth: 28, textAlign: "right", fontFamily: "'JetBrains Mono', monospace" } }, value)
  );
}

function Tabs({ tabs, active, onChange }) {
  return React.createElement("div", { style: { display: "flex", gap: 2, background: colors.bgHover, borderRadius: 10, padding: 3, marginBottom: 24, flexWrap: "wrap" } },
    tabs.map(t => React.createElement("button", {
      key: t.id, onClick: () => onChange(t.id),
      style: { flex: 1, padding: "10px 16px", border: "none", borderRadius: 8, cursor: "pointer", background: active === t.id ? colors.bgCard : "transparent", color: active === t.id ? colors.text : colors.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: active === t.id ? 600 : 400, transition: "all 0.2s", boxShadow: active === t.id ? "0 2px 8px rgba(0,0,0,0.2)" : "none", whiteSpace: "nowrap" }
    }, t.label))
  );
}

function Select({ value, onChange, options, placeholder, style: sx }) {
  return React.createElement("select", {
    value, onChange: e => onChange(e.target.value),
    style: { width: "100%", padding: "10px 14px", background: colors.bgHover, border: `1px solid ${colors.border}`, borderRadius: 8, color: value ? colors.text : colors.textDim, fontSize: 14, fontFamily: "'DM Sans', sans-serif", appearance: "none", cursor: "pointer", ...sx }
  },
    React.createElement("option", { value: "", style: { color: colors.textDim } }, placeholder),
    options.map(o => React.createElement("option", { key: o, value: o, style: { background: colors.bgCard, color: colors.text } }, o))
  );
}

function TextArea({ value, onChange, placeholder, rows = 6, style: sx }) {
  return React.createElement("textarea", {
    value, onChange: e => onChange(e.target.value), placeholder, rows,
    style: { width: "100%", padding: "14px 16px", background: colors.bgHover, border: `1px solid ${colors.border}`, borderRadius: 10, color: colors.text, fontSize: 15, fontFamily: "'DM Sans', sans-serif", resize: "vertical", lineHeight: 1.6, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box", ...sx },
    onFocus: e => e.target.style.borderColor = colors.accent,
    onBlur: e => e.target.style.borderColor = colors.border
  });
}

function Input({ value, onChange, placeholder, style: sx }) {
  return React.createElement("input", {
    value, onChange: e => onChange(e.target.value), placeholder,
    style: { width: "100%", padding: "10px 14px", background: colors.bgHover, border: `1px solid ${colors.border}`, borderRadius: 8, color: colors.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box", ...sx },
    onFocus: e => e.target.style.borderColor = colors.accent,
    onBlur: e => e.target.style.borderColor = colors.border
  });
}

function LoadingDots() {
  return React.createElement("div", { style: { display: "flex", gap: 6, justifyContent: "center", padding: 40 } },
    [0,1,2].map(i => React.createElement("div", { key: i, style: { width: 10, height: 10, borderRadius: "50%", background: colors.accent, animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` } })),
    React.createElement("style", null, `@keyframes pulse { 0%, 80%, 100% { transform: scale(0.3); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }`)
  );
}

function EmptyState({ icon, title, description, action }) {
  return React.createElement("div", { style: { textAlign: "center", padding: "60px 24px" } },
    React.createElement("div", { style: { fontSize: 48, marginBottom: 16, opacity: 0.4 } }, icon),
    React.createElement("h3", { style: { color: colors.text, fontSize: 18, fontWeight: 600, margin: "0 0 8px" } }, title),
    React.createElement("p", { style: { color: colors.textMuted, fontSize: 14, margin: "0 0 24px", maxWidth: 400, marginLeft: "auto", marginRight: "auto" } }, description),
    action
  );
}

// ─── RADAR CHART ────────────────────────────────────────────────────
function RadarChart({ scores }) {
  const dims = SCORING_DIMENSIONS;
  const cx = 150, cy = 150, maxR = 110;
  const n = dims.length;
  const angleStep = (2 * Math.PI) / n;
  const getPoint = (i, val) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = (val / 10) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };
  const gridLevels = [2, 4, 6, 8, 10];
  const dataPoints = dims.map((d, i) => getPoint(i, scores[d.key] || 0));
  const path = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  return React.createElement("svg", { viewBox: "0 0 300 300", style: { width: "100%", maxWidth: 300 } },
    gridLevels.map(level => {
      const pts = dims.map((_, i) => getPoint(i, level));
      const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
      return React.createElement("path", { key: level, d, fill: "none", stroke: colors.border, strokeWidth: "0.5", opacity: "0.6" });
    }),
    dims.map((_, i) => {
      const end = getPoint(i, 10);
      return React.createElement("line", { key: i, x1: cx, y1: cy, x2: end.x, y2: end.y, stroke: colors.border, strokeWidth: "0.5", opacity: "0.4" });
    }),
    React.createElement("path", { d: path, fill: `${colors.accent}20`, stroke: colors.accent, strokeWidth: "2" }),
    dataPoints.map((p, i) => React.createElement("circle", { key: i, cx: p.x, cy: p.y, r: "4", fill: colors.accent, stroke: colors.bg, strokeWidth: "2" })),
    dims.map((d, i) => {
      const labelPt = getPoint(i, 13.5);
      const words = d.label.split(" ");
      return React.createElement("text", { key: i, x: labelPt.x, y: labelPt.y, textAnchor: "middle", dominantBaseline: "middle", fill: colors.textMuted, fontSize: "8", fontFamily: "'DM Sans', sans-serif" },
        words.map((w, wi) => React.createElement("tspan", { key: wi, x: labelPt.x, dy: wi === 0 ? 0 : 10 }, w))
      );
    })
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────
function HomePage({ onNavigate }) {
  const features = [
    { icon: React.createElement(Icons.Brain), title: "AI-Powered Analysis", desc: "Describe your messy business problem in plain language and get a structured consulting-grade diagnosis." },
    { icon: React.createElement(Icons.Zap), title: "Instant Recommendations", desc: "Receive categorized digital transformation solutions with complexity, timeline, and ROI estimates." },
    { icon: "◎", title: "Maturity Scoring", desc: "Get scored across 9 dimensions from process clarity to automation potential with visual scorecards." },
    { icon: React.createElement(Icons.File), title: "Export & Share", desc: "Save diagnoses, export reports, and share findings with stakeholders." },
  ];
  return React.createElement("div", { style: { minHeight: "100vh", background: colors.bg } },
    React.createElement("div", { style: { position: "relative", overflow: "hidden", padding: "100px 24px 80px", textAlign: "center" } },
      React.createElement("div", { style: { position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 800, height: 800, background: `radial-gradient(circle, ${colors.accent}12 0%, transparent 70%)`, pointerEvents: "none" } }),
      React.createElement("div", { style: { position: "relative", maxWidth: 720, margin: "0 auto" } },
        React.createElement(Badge, { color: colors.green, style: { marginBottom: 24, fontSize: 12 } }, "AI-Powered Process Intelligence"),
        React.createElement("h1", { style: { fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: colors.text, lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-0.02em", fontFamily: "'Instrument Serif', Georgia, serif" } }, "Turn messy processes", React.createElement("br"), "into digital clarity"),
        React.createElement("p", { style: { fontSize: 18, color: colors.textMuted, lineHeight: 1.65, margin: "0 0 40px", maxWidth: 560, marginLeft: "auto", marginRight: "auto" } }, "Describe your operational chaos in plain language. Our AI diagnoses root causes, scores maturity, and recommends transformation solutions — like having a digital consultant on demand."),
        React.createElement("div", { style: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" } },
          React.createElement(Button, { size: "lg", onClick: () => onNavigate("new-diagnosis") }, "Start Diagnosis ", React.createElement(Icons.Arrow)),
          React.createElement(Button, { variant: "secondary", size: "lg", onClick: () => onNavigate("demo") }, "See Demo Report")
        )
      )
    ),
    React.createElement("div", { style: { maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" } },
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 } },
        features.map((f, i) => React.createElement(Card, { key: i, hover: true },
          React.createElement("div", { style: { width: 44, height: 44, borderRadius: 10, background: `${colors.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.accent, fontSize: 20, marginBottom: 16 } }, f.icon),
          React.createElement("h3", { style: { fontSize: 16, fontWeight: 700, color: colors.text, margin: "0 0 8px" } }, f.title),
          React.createElement("p", { style: { fontSize: 13, color: colors.textMuted, lineHeight: 1.6, margin: 0 } }, f.desc)
        ))
      )
    ),
    React.createElement("div", { style: { maxWidth: 900, margin: "0 auto", padding: "0 24px 100px" } },
      React.createElement("h2", { style: { textAlign: "center", fontSize: 28, fontWeight: 700, color: colors.text, marginBottom: 48, fontFamily: "'Instrument Serif', Georgia, serif" } }, "How it works"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 } },
        ["Describe your problem in plain language", "AI analyzes and structures the diagnosis", "Review scores, root causes, and bottlenecks", "Get actionable transformation recommendations"].map((step, i) =>
          React.createElement("div", { key: i, style: { textAlign: "center" } },
            React.createElement("div", { style: { width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18, margin: "0 auto 16px", fontFamily: "'JetBrains Mono', monospace" } }, i + 1),
            React.createElement("p", { style: { color: colors.textMuted, fontSize: 14, lineHeight: 1.5, margin: 0 } }, step)
          )
        )
      )
    )
  );
}

// ─── AUTH PAGE ──────────────────────────────────────────────────────
function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  return React.createElement("div", { style: { minHeight: "100vh", background: colors.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 } },
    React.createElement(Card, { style: { width: 420, maxWidth: "100%" } },
      React.createElement("div", { style: { textAlign: "center", marginBottom: 32 } },
        React.createElement("div", { style: { fontSize: 28, fontWeight: 800, color: colors.text, fontFamily: "'Instrument Serif', Georgia, serif", marginBottom: 4 } }, "DxPilot"),
        React.createElement("p", { style: { color: colors.textMuted, fontSize: 14, margin: 0 } }, mode === "login" ? "Welcome back" : "Create your account")
      ),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
        mode === "signup" && React.createElement("div", null,
          React.createElement("label", { style: { fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.05em" } }, "Full Name"),
          React.createElement(Input, { value: name, onChange: setName, placeholder: "Jane Smith" })
        ),
        React.createElement("div", null,
          React.createElement("label", { style: { fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.05em" } }, "Email"),
          React.createElement(Input, { value: email, onChange: setEmail, placeholder: "you@company.com" })
        ),
        React.createElement("div", null,
          React.createElement("label", { style: { fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: "0.05em" } }, "Password"),
          React.createElement(Input, { value: pw, onChange: setPw, placeholder: "••••••••" })
        ),
        React.createElement(Button, { size: "lg", style: { width: "100%", justifyContent: "center", marginTop: 8 }, onClick: () => onLogin({ name: name || "Jane Smith", email: email || "jane@company.com" }) }, mode === "login" ? "Sign In" : "Create Account"),
        React.createElement("p", { style: { textAlign: "center", fontSize: 13, color: colors.textMuted, margin: "8px 0 0" } },
          mode === "login" ? "Don't have an account?" : "Already have an account?",
          React.createElement("button", { onClick: () => setMode(mode === "login" ? "signup" : "login"), style: { background: "none", border: "none", color: colors.accent, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginLeft: 4 } }, mode === "login" ? "Sign up" : "Sign in")
        )
      )
    )
  );
}

// ─── NEW DIAGNOSIS PAGE ─────────────────────────────────────────────
function NewDiagnosisPage({ onSubmit }) {
  const [problem, setProblem] = useState("");
  const [industry, setIndustry] = useState("");
  const [bizSize, setBizSize] = useState("");
  const [department, setDepartment] = useState("");
  const [tools, setTools] = useState("");
  const [people, setPeople] = useState("");
  const [urgency, setUrgency] = useState("");
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!problem.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const diagnosis = generateDiagnosis({ problem, industry, bizSize, department, tools, people, urgency, goals });
      onSubmit(diagnosis);
    }, 2200);
  };

  if (loading) return React.createElement("div", { style: { padding: 60, textAlign: "center" } },
    React.createElement(LoadingDots),
    React.createElement("h3", { style: { color: colors.text, fontSize: 20, fontWeight: 600, marginTop: 24 } }, "Analyzing your process..."),
    React.createElement("p", { style: { color: colors.textMuted, fontSize: 14 } }, "Extracting patterns, scoring maturity, and generating recommendations")
  );

  const labelStyle = { fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 6, display: "block" };

  return React.createElement("div", { style: { maxWidth: 800, margin: "0 auto" } },
    React.createElement("div", { style: { marginBottom: 32 } },
      React.createElement("h1", { style: { fontSize: 28, fontWeight: 700, color: colors.text, margin: "0 0 8px", fontFamily: "'Instrument Serif', Georgia, serif" } }, "New Diagnosis"),
      React.createElement("p", { style: { color: colors.textMuted, fontSize: 14, margin: 0 } }, "Describe your business problem and we'll generate a structured process diagnosis.")
    ),
    React.createElement("div", { style: { marginBottom: 28 } },
      React.createElement("p", { style: { fontSize: 12, color: colors.textDim, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 } }, "Try an example"),
      React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
        EXAMPLE_PROMPTS.map((ep, i) => React.createElement("button", {
          key: i, onClick: () => setProblem(ep.text),
          style: { padding: "6px 14px", borderRadius: 20, border: `1px solid ${colors.border}`, background: colors.bgHover, color: colors.textMuted, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }
        }, ep.title))
      )
    ),
    React.createElement(Card, { style: { marginBottom: 24 } },
      React.createElement("label", { style: { fontSize: 13, fontWeight: 600, color: colors.text, marginBottom: 10, display: "block" } }, "Describe your business problem *"),
      React.createElement(TextArea, { value: problem, onChange: setProblem, placeholder: "e.g., Our customer onboarding is slow, teams use spreadsheets, approvals happen over email...", rows: 6 })
    ),
    React.createElement(Card, { style: { marginBottom: 24 } },
      React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: colors.text, margin: "0 0 16px" } }, "Context (helps improve diagnosis accuracy)"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } },
        React.createElement("div", null, React.createElement("label", { style: labelStyle }, "Industry"), React.createElement(Select, { value: industry, onChange: setIndustry, options: INDUSTRIES, placeholder: "Select industry" })),
        React.createElement("div", null, React.createElement("label", { style: labelStyle }, "Business Size"), React.createElement(Select, { value: bizSize, onChange: setBizSize, options: BIZ_SIZES, placeholder: "Select size" })),
        React.createElement("div", null, React.createElement("label", { style: labelStyle }, "Department"), React.createElement(Select, { value: department, onChange: setDepartment, options: DEPARTMENTS, placeholder: "Select department" })),
        React.createElement("div", null, React.createElement("label", { style: labelStyle }, "Urgency"), React.createElement(Select, { value: urgency, onChange: setUrgency, options: URGENCY, placeholder: "Select urgency" })),
        React.createElement("div", null, React.createElement("label", { style: labelStyle }, "Current Tools"), React.createElement(Input, { value: tools, onChange: setTools, placeholder: "e.g., Excel, Gmail, Slack" })),
        React.createElement("div", null, React.createElement("label", { style: labelStyle }, "People Involved"), React.createElement(Input, { value: people, onChange: setPeople, placeholder: "e.g., 15-20" }))
      ),
      React.createElement("div", { style: { marginTop: 16 } },
        React.createElement("label", { style: labelStyle }, "Business Goals (optional)"),
        React.createElement(TextArea, { value: goals, onChange: setGoals, placeholder: "e.g., Reduce onboarding time by 50%...", rows: 3 })
      )
    ),
    React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 12 } },
      React.createElement(Button, { variant: "secondary" }, "Save as Draft"),
      React.createElement(Button, { onClick: handleSubmit, disabled: !problem.trim() }, React.createElement(Icons.Zap), " Generate Diagnosis")
    )
  );
}

// ─── DIAGNOSIS RESULTS PAGE ─────────────────────────────────────────
function DiagnosisResultsPage({ diagnosis, onSave, onBack }) {
  const [activeTab, setActiveTab] = useState("overview");
  const d = diagnosis;
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "scores", label: "Maturity Scores" },
    { id: "analysis", label: "Root Cause Analysis" },
    { id: "solutions", label: "Solutions" },
    { id: "roadmap", label: "Roadmap" },
    { id: "impact", label: "Impact & KPIs" },
  ];
  const getScoreColor = v => v <= 3 ? colors.green : v <= 6 ? colors.amber : colors.red;
  const getScoreLabel = v => v <= 3 ? "Good" : v <= 6 ? "Needs Work" : "Critical";

  return React.createElement("div", { style: { maxWidth: 1000, margin: "0 auto" } },
    // Header
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 } },
      React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 } },
          React.createElement(Badge, { color: colors.accent }, d.id),
          React.createElement(Badge, { color: colors.purple }, d.input.industry || "General")
        ),
        React.createElement("h1", { style: { fontSize: 24, fontWeight: 700, color: colors.text, margin: 0, fontFamily: "'Instrument Serif', Georgia, serif" } }, d.title)
      ),
      React.createElement("div", { style: { display: "flex", gap: 8 } },
        React.createElement(Button, { variant: "secondary", size: "sm", onClick: onBack }, "← Back"),
        React.createElement(Button, { variant: "secondary", size: "sm" }, React.createElement(Icons.Download), " Export"),
        React.createElement(Button, { size: "sm", onClick: () => onSave(d) }, React.createElement(Icons.Check), " Save")
      )
    ),
    // Score card
    React.createElement(Card, { style: { marginBottom: 24, background: `linear-gradient(135deg, ${colors.bgAccent}, ${colors.bgCard})` } },
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" } },
        React.createElement("div", { style: { position: "relative", width: 90, height: 90, flexShrink: 0 } },
          React.createElement("svg", { viewBox: "0 0 100 100", style: { width: 90, height: 90 } },
            React.createElement("circle", { cx: 50, cy: 50, r: 42, fill: "none", stroke: colors.border, strokeWidth: 6 }),
            React.createElement("circle", { cx: 50, cy: 50, r: 42, fill: "none", stroke: colors.accent, strokeWidth: 6, strokeDasharray: `${(d.overallScore / 10) * 264} 264`, strokeLinecap: "round", transform: "rotate(-90 50 50)" })
          ),
          React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" } },
            React.createElement("span", { style: { fontSize: 24, fontWeight: 800, color: colors.text, fontFamily: "'JetBrains Mono', monospace" } }, d.overallScore),
            React.createElement("span", { style: { fontSize: 9, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" } }, "/ 10")
          )
        ),
        React.createElement("div", { style: { flex: 1, minWidth: 200 } },
          React.createElement("h3", { style: { fontSize: 16, fontWeight: 600, color: colors.text, margin: "0 0 6px" } }, "Process Maturity Score"),
          React.createElement("p", { style: { fontSize: 13, color: colors.textMuted, margin: 0, lineHeight: 1.6 } }, d.summary)
        ),
        React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap" } },
          Object.entries(d.estimatedImpact).map(([k, v]) =>
            React.createElement("div", { key: k, style: { textAlign: "center" } },
              React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: colors.green, fontFamily: "'JetBrains Mono', monospace" } }, v),
              React.createElement("div", { style: { fontSize: 10, color: colors.textMuted, textTransform: "capitalize" } }, k.replace(/([A-Z])/g, " $1").trim())
            )
          )
        )
      )
    ),
    React.createElement(Tabs, { tabs, active: activeTab, onChange: setActiveTab }),

    // Overview tab
    activeTab === "overview" && React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 } },
      React.createElement(Card, null,
        React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Symptoms Identified"),
        d.symptoms.map((s, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < d.symptoms.length - 1 ? `1px solid ${colors.border}` : "none" } },
          React.createElement("span", { style: { color: colors.amber, fontSize: 14, flexShrink: 0, marginTop: 1 } }, "▸"),
          React.createElement("span", { style: { fontSize: 13, color: colors.textMuted, lineHeight: 1.5 } }, s)
        ))
      ),
      React.createElement(Card, null,
        React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Process Bottlenecks"),
        d.bottlenecks.map((b, i) => React.createElement("div", { key: i, style: { padding: "10px 0", borderBottom: i < d.bottlenecks.length - 1 ? `1px solid ${colors.border}` : "none" } },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
            React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: colors.text } }, b.name),
            React.createElement(Badge, { color: b.severity === "Critical" ? colors.red : b.severity === "High" ? colors.amber : colors.accent }, b.severity)
          ),
          React.createElement("p", { style: { fontSize: 12, color: colors.textMuted, margin: 0, lineHeight: 1.5 } }, b.description)
        ))
      ),
      React.createElement(Card, null,
        React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Stakeholders"),
        React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } },
          d.stakeholders.map((s, i) => React.createElement(Badge, { key: i, color: colors.purple }, s))
        )
      ),
      React.createElement(Card, null,
        React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Opportunities"),
        d.opportunities.map((o, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < d.opportunities.length - 1 ? `1px solid ${colors.border}` : "none" } },
          React.createElement("span", { style: { color: colors.green, fontSize: 14, flexShrink: 0, marginTop: 1 } }, "◆"),
          React.createElement("span", { style: { fontSize: 13, color: colors.textMuted, lineHeight: 1.5 } }, o)
        ))
      )
    ),

    // Scores tab
    activeTab === "scores" && React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 } },
      React.createElement(Card, null,
        React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Maturity Radar"),
        React.createElement("div", { style: { display: "flex", justifyContent: "center" } }, React.createElement(RadarChart, { scores: d.maturityScores }))
      ),
      React.createElement(Card, null,
        React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Dimension Scores"),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
          SCORING_DIMENSIONS.map(dim => React.createElement("div", { key: dim.key },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
              React.createElement("span", { style: { fontSize: 12, color: colors.textMuted } }, `${dim.icon} ${dim.label}`),
              React.createElement(Badge, { color: getScoreColor(d.maturityScores[dim.key]) }, getScoreLabel(d.maturityScores[dim.key]))
            ),
            React.createElement(ScoreBar, { value: d.maturityScores[dim.key], color: getScoreColor(d.maturityScores[dim.key]) })
          ))
        )
      )
    ),

    // Analysis tab
    activeTab === "analysis" && React.createElement("div", { style: { display: "grid", gap: 20 } },
      React.createElement(Card, null,
        React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Root Causes"),
        d.rootCauses.map((rc, i) => React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < d.rootCauses.length - 1 ? `1px solid ${colors.border}` : "none" } },
          React.createElement("div", { style: { width: 32, height: 32, borderRadius: 8, background: `${colors.red}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.red, fontSize: 14, fontWeight: 700, flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" } }, i + 1),
          React.createElement("span", { style: { fontSize: 14, color: colors.text, lineHeight: 1.5 } }, rc)
        ))
      ),
      React.createElement(Card, null,
        React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Risk Assessment"),
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } },
            React.createElement("thead", null, React.createElement("tr", null,
              ["Risk", "Likelihood", "Impact", "Mitigation"].map(h => React.createElement("th", { key: h, style: { textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 600, color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${colors.border}` } }, h))
            )),
            React.createElement("tbody", null,
              d.risks.map((r, i) => React.createElement("tr", { key: i },
                React.createElement("td", { style: { padding: "12px 14px", fontSize: 13, color: colors.text, borderBottom: `1px solid ${colors.border}` } }, r.risk),
                React.createElement("td", { style: { padding: "12px 14px", borderBottom: `1px solid ${colors.border}` } }, React.createElement(Badge, { color: r.likelihood === "High" ? colors.red : colors.amber }, r.likelihood)),
                React.createElement("td", { style: { padding: "12px 14px", borderBottom: `1px solid ${colors.border}` } }, React.createElement(Badge, { color: r.impact === "High" ? colors.red : colors.amber }, r.impact)),
                React.createElement("td", { style: { padding: "12px 14px", fontSize: 13, color: colors.textMuted, borderBottom: `1px solid ${colors.border}` } }, r.mitigation)
              ))
            )
          )
        )
      )
    ),

    // Solutions tab
    activeTab === "solutions" && React.createElement("div", { style: { display: "grid", gap: 16 } },
      React.createElement(Card, null,
        React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.green, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "⚡ Quick Wins"),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 } },
          d.quickWins.map((qw, i) => React.createElement("div", { key: i, style: { padding: 14, background: `${colors.green}08`, border: `1px solid ${colors.green}20`, borderRadius: 10 } },
            React.createElement("p", { style: { fontSize: 13, color: colors.text, margin: "0 0 8px", fontWeight: 500 } }, qw.action),
            React.createElement("div", { style: { display: "flex", gap: 8 } },
              React.createElement(Badge, { color: colors.textMuted }, qw.effort),
              React.createElement(Badge, { color: colors.green }, `${qw.impact} impact`)
            )
          ))
        )
      ),
      d.recommendations.map((rec, i) => {
        const cat = SOLUTION_CATEGORIES.find(c => c.id === rec.category);
        return React.createElement(Card, { key: i },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 8 } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
              React.createElement("div", { style: { width: 40, height: 40, borderRadius: 10, background: `${colors.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 } }, cat?.icon || "◈"),
              React.createElement("div", null,
                React.createElement("h4", { style: { fontSize: 15, fontWeight: 700, color: colors.text, margin: 0 } }, rec.name),
                React.createElement("span", { style: { fontSize: 12, color: colors.textMuted } }, cat?.name)
              )
            ),
            React.createElement("div", { style: { width: 44, height: 44, borderRadius: "50%", border: `2px solid ${colors.green}`, display: "flex", alignItems: "center", justifyContent: "center" } },
              React.createElement("span", { style: { fontSize: 13, fontWeight: 800, color: colors.green, fontFamily: "'JetBrains Mono', monospace" } }, `${rec.confidence}%`)
            )
          ),
          React.createElement("p", { style: { fontSize: 13, color: colors.textMuted, lineHeight: 1.6, margin: "0 0 14px" } }, rec.why),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 } },
            [{ label: "Problem Solved", value: rec.problemSolved }, { label: "Complexity", value: rec.complexity }, { label: "Timeline", value: rec.timeline }, { label: "Expected ROI", value: rec.roi }].map((item, j) =>
              React.createElement("div", { key: j, style: { padding: 10, background: colors.bgHover, borderRadius: 8 } },
                React.createElement("div", { style: { fontSize: 10, color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 } }, item.label),
                React.createElement("div", { style: { fontSize: 12, color: colors.text, fontWeight: 500 } }, item.value)
              )
            )
          ),
          rec.prerequisites?.length > 0 && React.createElement("div", { style: { marginTop: 12, padding: "10px 14px", background: `${colors.amber}08`, border: `1px solid ${colors.amber}15`, borderRadius: 8 } },
            React.createElement("span", { style: { fontSize: 11, color: colors.amber, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" } }, "Prerequisites: "),
            React.createElement("span", { style: { fontSize: 12, color: colors.textMuted } }, rec.prerequisites.join(" → "))
          )
        );
      })
    ),

    // Roadmap tab
    activeTab === "roadmap" && React.createElement("div", { style: { display: "grid", gap: 20 } },
      d.roadmap.map((phase, pi) => React.createElement(Card, { key: pi, style: { borderLeft: `3px solid ${[colors.accent, colors.purple, colors.green, colors.cyan][pi]}` } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } },
          React.createElement("h3", { style: { fontSize: 16, fontWeight: 700, color: colors.text, margin: 0 } }, phase.phase),
          React.createElement(Badge, { color: [colors.accent, colors.purple, colors.green, colors.cyan][pi] }, phase.weeks)
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 } },
          phase.items.map((item, ii) => React.createElement("div", { key: ii, style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: colors.bgHover, borderRadius: 8 } },
            React.createElement("div", { style: { width: 6, height: 6, borderRadius: "50%", background: [colors.accent, colors.purple, colors.green, colors.cyan][pi], flexShrink: 0 } }),
            React.createElement("span", { style: { fontSize: 13, color: colors.textMuted } }, item)
          ))
        )
      ))
    ),

    // Impact tab
    activeTab === "impact" && React.createElement("div", { style: { display: "grid", gap: 20 } },
      React.createElement(Card, null,
        React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Expected Business Impact"),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 } },
          Object.entries(d.estimatedImpact).map(([k, v]) => React.createElement("div", { key: k, style: { textAlign: "center", padding: 20, background: `${colors.green}08`, border: `1px solid ${colors.green}20`, borderRadius: 12 } },
            React.createElement("div", { style: { fontSize: 28, fontWeight: 800, color: colors.green, fontFamily: "'JetBrains Mono', monospace" } }, v),
            React.createElement("div", { style: { fontSize: 12, color: colors.textMuted, marginTop: 4, textTransform: "capitalize" } }, k.replace(/([A-Z])/g, " $1").trim())
          ))
        )
      ),
      React.createElement(Card, null,
        React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Key Performance Indicators"),
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse" } },
            React.createElement("thead", null, React.createElement("tr", null,
              ["KPI", "Current State", "Target", "Expected Improvement"].map(h => React.createElement("th", { key: h, style: { textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 600, color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${colors.border}` } }, h))
            )),
            React.createElement("tbody", null,
              d.kpis.map((kpi, i) => React.createElement("tr", { key: i },
                React.createElement("td", { style: { padding: "12px 14px", fontSize: 13, fontWeight: 600, color: colors.text, borderBottom: `1px solid ${colors.border}` } }, kpi.metric),
                React.createElement("td", { style: { padding: "12px 14px", fontSize: 13, color: colors.red, borderBottom: `1px solid ${colors.border}`, fontFamily: "'JetBrains Mono', monospace" } }, kpi.current),
                React.createElement("td", { style: { padding: "12px 14px", fontSize: 13, color: colors.green, borderBottom: `1px solid ${colors.border}`, fontFamily: "'JetBrains Mono', monospace" } }, kpi.target),
                React.createElement("td", { style: { padding: "12px 14px", borderBottom: `1px solid ${colors.border}` } }, React.createElement(Badge, { color: colors.green }, kpi.improvement))
              ))
            )
          )
        )
      )
    )
  );
}

// ─── SAVED REPORTS PAGE ─────────────────────────────────────────────
function SavedReportsPage({ reports, onView, onDelete }) {
  if (reports.length === 0) return React.createElement(EmptyState, { icon: "📋", title: "No saved reports", description: "Run your first diagnosis to see it here." });
  return React.createElement("div", null,
    React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 } },
      React.createElement("h1", { style: { fontSize: 24, fontWeight: 700, color: colors.text, margin: 0, fontFamily: "'Instrument Serif', Georgia, serif" } }, "Saved Reports"),
      React.createElement(Badge, { color: colors.textMuted }, `${reports.length} report${reports.length !== 1 ? "s" : ""}`)
    ),
    React.createElement("div", { style: { display: "grid", gap: 12 } },
      reports.map((r, i) => React.createElement(Card, { key: i, hover: true, onClick: () => onView(r) },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
          React.createElement("div", null,
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 } },
              React.createElement(Badge, { color: colors.accent }, r.id),
              React.createElement(Badge, { color: colors.purple }, r.input.industry || "General"),
              React.createElement(Badge, { color: colors.amber }, `${r.overallScore}/10`)
            ),
            React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: colors.text, margin: 0 } }, r.title),
            React.createElement("p", { style: { fontSize: 12, color: colors.textDim, margin: "4px 0 0" } }, new Date(r.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))
          ),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            React.createElement(Button, { variant: "ghost", size: "sm", onClick: e => { e.stopPropagation(); onDelete(i); } }, React.createElement(Icons.Trash)),
            React.createElement(Button, { variant: "secondary", size: "sm" }, "View ", React.createElement(Icons.ChevRight))
          )
        )
      ))
    )
  );
}

// ─── COMPARE PAGE ───────────────────────────────────────────────────
function ComparePage({ reports }) {
  const [sel1, setSel1] = useState(0);
  const [sel2, setSel2] = useState(reports.length > 1 ? 1 : 0);
  if (reports.length < 2) return React.createElement(EmptyState, { icon: "⟷", title: "Need at least 2 reports", description: "Save multiple diagnoses to compare them side by side." });
  const r1 = reports[sel1], r2 = reports[sel2];
  return React.createElement("div", null,
    React.createElement("h1", { style: { fontSize: 24, fontWeight: 700, color: colors.text, margin: "0 0 24px", fontFamily: "'Instrument Serif', Georgia, serif" } }, "Compare Diagnoses"),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 } },
      React.createElement(Select, { value: String(sel1), onChange: v => setSel1(Number(v)), options: reports.map((r, i) => String(i)), placeholder: "Select report 1" }),
      React.createElement(Select, { value: String(sel2), onChange: v => setSel2(Number(v)), options: reports.map((r, i) => String(i)), placeholder: "Select report 2" })
    ),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } },
      [r1, r2].map((r, ri) => React.createElement(Card, { key: ri },
        React.createElement(Badge, { color: colors.accent, style: { marginBottom: 12 } }, r.id),
        React.createElement("h3", { style: { fontSize: 15, fontWeight: 600, color: colors.text, margin: "0 0 16px" } }, r.title),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 } },
          React.createElement("div", { style: { fontSize: 28, fontWeight: 800, color: colors.accent, fontFamily: "'JetBrains Mono', monospace" } }, r.overallScore),
          React.createElement("span", { style: { fontSize: 12, color: colors.textMuted } }, "/ 10 maturity score")
        ),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
          SCORING_DIMENSIONS.map(dim => React.createElement(ScoreBar, { key: dim.key, value: r.maturityScores[dim.key], label: dim.label, color: r.maturityScores[dim.key] <= 3 ? colors.green : r.maturityScores[dim.key] <= 6 ? colors.amber : colors.red }))
        )
      ))
    )
  );
}

// ─── SETTINGS PAGE ──────────────────────────────────────────────────
function SettingsPage({ user }) {
  return React.createElement("div", { style: { maxWidth: 700, margin: "0 auto" } },
    React.createElement("h1", { style: { fontSize: 24, fontWeight: 700, color: colors.text, margin: "0 0 24px", fontFamily: "'Instrument Serif', Georgia, serif" } }, "Settings"),
    React.createElement(Card, { style: { marginBottom: 20 } },
      React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Profile"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } },
        React.createElement("div", null, React.createElement("label", { style: { fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 6, display: "block" } }, "Name"), React.createElement(Input, { value: user.name, onChange: () => {} })),
        React.createElement("div", null, React.createElement("label", { style: { fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 6, display: "block" } }, "Email"), React.createElement(Input, { value: user.email, onChange: () => {} }))
      )
    ),
    React.createElement(Card, { style: { marginBottom: 20 } },
      React.createElement("h3", { style: { fontSize: 14, fontWeight: 700, color: colors.text, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "0.04em" } }, "AI Configuration"),
      React.createElement("p", { style: { fontSize: 13, color: colors.textMuted, margin: "0 0 14px" } }, "Customize the AI diagnosis engine behavior and scoring weights."),
      React.createElement("div", { style: { display: "grid", gap: 10 } },
        ["Industry-specific analysis weighting", "Custom scoring thresholds", "Solution recommendation filters", "Template management"].map((item, i) =>
          React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: colors.bgHover, borderRadius: 8 } },
            React.createElement("span", { style: { fontSize: 13, color: colors.text } }, item),
            React.createElement(Button, { variant: "ghost", size: "sm" }, "Configure ", React.createElement(Icons.ChevRight))
          )
        )
      )
    ),
    React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: 12 } },
      React.createElement(Button, { variant: "secondary" }, "Cancel"),
      React.createElement(Button, null, "Save Changes")
    )
  );
}

// ─── TOP BAR ────────────────────────────────────────────────────────
function TopBar({ onNavigate }) {
  return React.createElement("div", { style: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: `${colors.bg}E6`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${colors.border}`, padding: "0 24px" } },
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" } },
      React.createElement("span", { style: { fontSize: 22, fontWeight: 800, color: colors.text, cursor: "pointer", fontFamily: "'Instrument Serif', Georgia, serif" }, onClick: () => onNavigate("home") }, "DxPilot"),
      React.createElement("div", { style: { display: "flex", gap: 12 } },
        React.createElement(Button, { variant: "ghost", onClick: () => onNavigate("auth") }, "Sign In"),
        React.createElement(Button, { size: "sm", onClick: () => onNavigate("new-diagnosis") }, "Start Free")
      )
    )
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [currentDiagnosis, setCurrentDiagnosis] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notification, setNotification] = useState(null);

  const showNotification = msg => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = u => { setUser(u); setPage("dashboard"); };

  const handleNavigate = p => {
    if (p === "demo") {
      const demo = generateDiagnosis({ problem: EXAMPLE_PROMPTS[0].text, industry: "Finance & Banking", bizSize: "Medium (51-200)", department: "Operations", tools: "Excel, Gmail, Shared Drives", people: "20", urgency: "High — actively blocking operations", goals: "Reduce onboarding time by 50%" });
      setCurrentDiagnosis(demo);
      if (!user) setUser({ name: "Demo User", email: "demo@example.com" });
      setPage("results");
    } else if (!user && p !== "home") {
      setPage("auth");
    } else {
      setPage(p);
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: React.createElement(Icons.Home) },
    { id: "new-diagnosis", label: "New Diagnosis", icon: React.createElement(Icons.Plus) },
    { id: "reports", label: "Saved Reports", icon: React.createElement(Icons.File) },
    { id: "compare", label: "Compare", icon: React.createElement(Icons.Compare) },
    { id: "settings", label: "Settings", icon: React.createElement(Icons.Settings) },
  ];

  if (!user && page === "home") return React.createElement("div", { style: { fontFamily: "'DM Sans', sans-serif" } },
    React.createElement(TopBar, { onNavigate: handleNavigate }),
    React.createElement(HomePage, { onNavigate: handleNavigate })
  );

  if (!user) return React.createElement(AuthPage, { onLogin: handleLogin });

  return React.createElement("div", { style: { fontFamily: "'DM Sans', sans-serif", background: colors.bg, minHeight: "100vh", color: colors.text } },
    React.createElement("style", null, `@keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`),
    notification && React.createElement("div", { style: { position: "fixed", top: 20, right: 20, zIndex: 9999, padding: "12px 20px", background: colors.green, color: "#fff", borderRadius: 10, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(16,185,129,0.4)", animation: "slideIn 0.3s ease", display: "flex", alignItems: "center", gap: 8 } },
      React.createElement(Icons.Check), notification
    ),
    React.createElement("div", { style: { display: "flex" } },
      // Sidebar
      React.createElement("aside", { style: { width: sidebarOpen ? 240 : 64, flexShrink: 0, height: "100vh", position: "sticky", top: 0, background: colors.bgCard, borderRight: `1px solid ${colors.border}`, transition: "width 0.3s ease", display: "flex", flexDirection: "column", overflow: "hidden" } },
        React.createElement("div", { style: { padding: sidebarOpen ? "20px 16px" : "20px 12px", borderBottom: `1px solid ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" } },
          sidebarOpen && React.createElement("span", { style: { fontSize: 20, fontWeight: 800, color: colors.text, fontFamily: "'Instrument Serif', Georgia, serif", whiteSpace: "nowrap" } }, "DxPilot"),
          React.createElement("button", { onClick: () => setSidebarOpen(!sidebarOpen), style: { background: "none", border: "none", cursor: "pointer", color: colors.textMuted, padding: 4, flexShrink: 0 } }, React.createElement(Icons.Menu))
        ),
        React.createElement("nav", { style: { flex: 1, padding: "12px 8px" } },
          navItems.map(item => React.createElement("button", {
            key: item.id, onClick: () => setPage(item.id),
            style: { display: "flex", alignItems: "center", gap: 12, width: "100%", padding: sidebarOpen ? "10px 12px" : "10px", border: "none", borderRadius: 8, cursor: "pointer", marginBottom: 2, background: page === item.id ? colors.bgHover : "transparent", color: page === item.id ? colors.text : colors.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: page === item.id ? 600 : 400, transition: "all 0.2s", justifyContent: sidebarOpen ? "flex-start" : "center", whiteSpace: "nowrap", overflow: "hidden" }
          }, item.icon, sidebarOpen && item.label))
        ),
        React.createElement("div", { style: { padding: sidebarOpen ? "16px" : "16px 8px", borderTop: `1px solid ${colors.border}` } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, overflow: "hidden" } },
            React.createElement("div", { style: { width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 } }, user.name.charAt(0)),
            sidebarOpen && React.createElement("div", { style: { overflow: "hidden" } },
              React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: colors.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, user.name),
              React.createElement("div", { style: { fontSize: 11, color: colors.textDim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, user.email)
            )
          )
        )
      ),
      // Main content
      React.createElement("main", { style: { flex: 1, padding: "32px 40px", minHeight: "100vh", overflow: "auto" } },
        page === "dashboard" && React.createElement("div", null,
          React.createElement("div", { style: { marginBottom: 32 } },
            React.createElement("h1", { style: { fontSize: 28, fontWeight: 700, color: colors.text, margin: "0 0 4px", fontFamily: "'Instrument Serif', Georgia, serif" } }, `Welcome back, ${user.name.split(" ")[0]}`),
            React.createElement("p", { style: { color: colors.textMuted, fontSize: 14, margin: 0 } }, "Here's an overview of your process diagnoses.")
          ),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 } },
            [
              { label: "Total Diagnoses", value: reports.length, color: colors.accent },
              { label: "Avg Maturity Score", value: reports.length ? (reports.reduce((a, r) => a + r.overallScore, 0) / reports.length).toFixed(1) : "—", color: colors.purple },
              { label: "Solutions Found", value: reports.reduce((a, r) => a + r.recommendations.length, 0), color: colors.green },
              { label: "Quick Wins", value: reports.reduce((a, r) => a + r.quickWins.length, 0), color: colors.amber },
            ].map((stat, i) => React.createElement(Card, { key: i },
              React.createElement("div", { style: { fontSize: 11, color: colors.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 } }, stat.label),
              React.createElement("div", { style: { fontSize: 32, fontWeight: 800, color: stat.color, fontFamily: "'JetBrains Mono', monospace" } }, stat.value)
            ))
          ),
          React.createElement(Card, { style: { background: `linear-gradient(135deg, ${colors.bgAccent}, ${colors.bgCard})`, marginBottom: 24 } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 } },
              React.createElement("div", null,
                React.createElement("h3", { style: { fontSize: 18, fontWeight: 700, color: colors.text, margin: "0 0 6px" } }, "Ready to diagnose a new process?"),
                React.createElement("p", { style: { fontSize: 13, color: colors.textMuted, margin: 0 } }, "Describe your business challenge and get AI-powered transformation insights.")
              ),
              React.createElement(Button, { onClick: () => setPage("new-diagnosis") }, React.createElement(Icons.Plus), " New Diagnosis")
            )
          ),
          reports.length > 0 && React.createElement("div", null,
            React.createElement("h3", { style: { fontSize: 16, fontWeight: 600, color: colors.text, margin: "0 0 14px" } }, "Recent Reports"),
            reports.slice(0, 3).map((r, i) => React.createElement(Card, { key: i, hover: true, onClick: () => { setCurrentDiagnosis(r); setPage("results"); }, style: { marginBottom: 10 } },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } },
                  React.createElement("div", { style: { width: 40, height: 40, borderRadius: 10, background: `${colors.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.accent, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 } }, r.overallScore),
                  React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: colors.text } }, r.title),
                    React.createElement("div", { style: { fontSize: 12, color: colors.textDim } }, new Date(r.createdAt).toLocaleDateString())
                  )
                ),
                React.createElement(Icons.ChevRight)
              )
            ))
          )
        ),
        page === "new-diagnosis" && React.createElement(NewDiagnosisPage, { onSubmit: d => { setCurrentDiagnosis(d); setPage("results"); } }),
        page === "results" && currentDiagnosis && React.createElement(DiagnosisResultsPage, { diagnosis: currentDiagnosis, onSave: d => { setReports(prev => [d, ...prev]); showNotification("Diagnosis saved successfully!"); }, onBack: () => setPage("dashboard") }),
        page === "reports" && React.createElement(SavedReportsPage, { reports, onView: r => { setCurrentDiagnosis(r); setPage("results"); }, onDelete: i => { setReports(prev => prev.filter((_, j) => j !== i)); showNotification("Report deleted."); } }),
        page === "compare" && React.createElement(ComparePage, { reports }),
        page === "settings" && React.createElement(SettingsPage, { user })
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
