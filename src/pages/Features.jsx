import React from 'react'
import { Link } from 'react-router-dom'
import { Brain, BarChart3, GitBranch, TrendingUp, Map, Shield, Zap, Database, ArrowRight } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Footer from '../components/Footer'

const FEATURES = [
  {
    icon: Brain, color: 'blue', badge: 'Core',
    title: 'AI-Powered Diagnosis',
    desc: 'Describe your messy business problem in plain language. Our AI extracts symptoms, identifies patterns, and structures a consulting-grade diagnosis in seconds.',
    points: ['Natural language input — no forms or templates', 'Extracts symptoms and root causes automatically', 'Contextual analysis based on industry and company size']
  },
  {
    icon: BarChart3, color: 'purple', badge: 'Analytics',
    title: 'Maturity Scoring (Radar Chart)',
    desc: 'Get scored across 9 critical dimensions with a visual radar chart. Understand exactly where your process stands and where to focus first.',
    points: ['9-dimension scoring framework', 'Visual radar chart for instant comprehension', 'Benchmarked against industry standards']
  },
  {
    icon: GitBranch, color: 'red', badge: 'Analysis',
    title: 'Root Cause Analysis',
    desc: 'Go beyond symptoms. DxPilot identifies the underlying structural causes of your process failures — the real reasons things break down.',
    points: ['Structured root cause identification', 'Bottleneck severity classification', 'Risk assessment with mitigation strategies']
  },
  {
    icon: TrendingUp, color: 'green', badge: 'Solutions',
    title: 'ROI-Backed Recommendations',
    desc: 'Every solution comes with expected ROI, implementation complexity, and timeline estimates so you can prioritize with confidence.',
    points: ['Categorized solution library (CRM, RPA, BI, etc.)', 'Confidence scores for each recommendation', 'Quick wins vs. strategic initiatives']
  },
  {
    icon: Map, color: 'cyan', badge: 'Planning',
    title: 'Implementation Roadmap',
    desc: 'A phased 26-week transformation plan with clear milestones, deliverables, and team assignments — ready to share with stakeholders.',
    points: ['4-phase structured roadmap', 'Week-by-week milestone breakdown', 'Prerequisite and dependency mapping']
  },
  {
    icon: Shield, color: 'yellow', badge: 'Tracking',
    title: 'KPI & Risk Tracking',
    desc: 'Define success metrics upfront and track improvement targets. Built-in risk register with likelihood, impact, and mitigation strategies.',
    points: ['Before/after KPI comparison', 'Risk register with mitigation plans', 'Progress tracking dashboard']
  },
]

export default function Features() {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="pt-32 pb-16 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />
        <Badge color="blue">Features</Badge>
        <h1 className="text-5xl font-black text-white mt-4 mb-4 tracking-tight">
          The full diagnosis toolkit
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          Everything you need to go from operational chaos to a structured transformation plan.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <Card key={i} hover className="fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border
                  ${f.color === 'blue'   ? 'bg-blue-500/10 border-blue-500/20'   : ''}
                  ${f.color === 'purple' ? 'bg-purple-500/10 border-purple-500/20' : ''}
                  ${f.color === 'red'    ? 'bg-red-500/10 border-red-500/20'     : ''}
                  ${f.color === 'green'  ? 'bg-emerald-500/10 border-emerald-500/20' : ''}
                  ${f.color === 'cyan'   ? 'bg-cyan-500/10 border-cyan-500/20'   : ''}
                  ${f.color === 'yellow' ? 'bg-amber-500/10 border-amber-500/20' : ''}
                `}>
                  <f.icon size={20} className={`
                    ${f.color === 'blue'   ? 'text-blue-400'   : ''}
                    ${f.color === 'purple' ? 'text-purple-400' : ''}
                    ${f.color === 'red'    ? 'text-red-400'    : ''}
                    ${f.color === 'green'  ? 'text-emerald-400': ''}
                    ${f.color === 'cyan'   ? 'text-cyan-400'   : ''}
                    ${f.color === 'yellow' ? 'text-amber-400'  : ''}
                  `} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge color={f.color === 'red' ? 'red' : f.color === 'green' ? 'green' : f.color === 'yellow' ? 'yellow' : f.color === 'cyan' ? 'cyan' : f.color === 'purple' ? 'purple' : 'blue'}>
                      {f.badge}
                    </Badge>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                  <ul className="space-y-1.5">
                    {f.points.map((p, pi) => (
                      <li key={pi} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/new-diagnosis">
            <Button size="lg">Start Your Free Diagnosis <ArrowRight size={16} /></Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
