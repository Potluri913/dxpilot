import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, BarChart3, GitBranch, TrendingUp, Map, Shield, Brain, CheckCircle, ChevronRight } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Footer from '../components/Footer'

const FEATURES = [
  { icon: Brain,      title: 'AI-Powered Diagnosis',       desc: 'Describe your problem in plain language. Our AI extracts symptoms, root causes, and patterns like a senior consultant.' },
  { icon: BarChart3,  title: 'Maturity Scoring',           desc: 'Get scored across 9 dimensions — from process clarity to automation potential — with a visual radar chart.' },
  { icon: GitBranch,  title: 'Root Cause Analysis',        desc: 'Identify the real bottlenecks, not just symptoms. Understand why your process is broken, not just where.' },
  { icon: TrendingUp, title: 'ROI-Backed Solutions',       desc: 'Every recommendation comes with complexity, timeline, and expected ROI so you can prioritize with confidence.' },
  { icon: Map,        title: 'Implementation Roadmap',     desc: 'A phased 26-week transformation plan with clear milestones, owners, and deliverables.' },
  { icon: Shield,     title: 'KPI & Risk Tracking',        desc: 'Track improvement targets and proactively manage risks with built-in mitigation strategies.' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Describe Your Problem', desc: 'Write about your operational challenge in plain language — no technical jargon needed.' },
  { step: '02', title: 'AI Analyzes & Diagnoses', desc: 'Our engine extracts patterns, scores maturity across 9 dimensions, and identifies root causes.' },
  { step: '03', title: 'Get Your Roadmap', desc: 'Receive prioritized solutions with ROI estimates, timelines, and a phased implementation plan.' },
]

const INDUSTRIES = [
  { name: 'Startups',          desc: 'Move fast without breaking processes. Build scalable workflows from day one.' },
  { name: 'SMEs',              desc: 'Identify the highest-impact improvements without enterprise-level budgets.' },
  { name: 'Enterprises',       desc: 'Diagnose complex, cross-functional processes across departments and regions.' },
  { name: 'Operations Teams',  desc: 'Get a structured view of inefficiencies and a clear path to optimization.' },
]

const PREVIEW_TABS = ['Overview', 'Scores', 'Analysis', 'Solutions', 'Roadmap']

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        {/* Glow bg */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="fade-up">
            <Badge color="green">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 inline-block" />
              AI-Powered Process Intelligence
            </Badge>
          </div>

          <h1 className="fade-up d1 mt-6 text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
            Diagnose Your Business<br />
            <span className="text-blue-400">Processes in Minutes</span>
          </h1>

          <p className="fade-up d2 mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Describe your operational chaos in plain language. DxPilot's AI diagnoses root causes,
            scores process maturity, and delivers a transformation roadmap — like having a digital
            consultant on demand.
          </p>

          <div className="fade-up d3 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/new-diagnosis">
              <Button size="lg" className="gap-2">
                Start Diagnosis <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/results/demo">
              <Button variant="outline" size="lg">
                View Demo Report
              </Button>
            </Link>
          </div>

          <div className="fade-up d4 mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
            {['No credit card required', 'Free forever plan', 'Results in 30 seconds'].map((t, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-emerald-500" /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="fade-up d5 relative max-w-5xl mx-auto mt-16">
          <div className="bg-[#111827] border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1424] border-b border-white/[0.07]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex-1 mx-4 bg-white/5 rounded-md px-3 py-1 text-xs text-slate-500">
                app.dxpilot.ai/results/DX-A3F9B2
              </div>
            </div>
            {/* Mock dashboard content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-xs font-semibold border border-blue-500/20">DX-A3F9B2</div>
                  <div className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 text-xs font-semibold border border-purple-500/20">Finance & Banking</div>
                </div>
                <h3 className="text-white font-bold text-lg">Customer Onboarding Process Transformation</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Analysis reveals significant opportunities in workflow automation and data centralization. Current maturity score indicates substantial room for improvement across 9 dimensions.</p>
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {[['25–40%','Cost Reduction'],['60–80%','Time Saved'],['70–90%','Error Reduction'],['45–65%','Satisfaction']].map(([v,l]) => (
                    <div key={l} className="bg-white/[0.03] rounded-xl p-3 text-center border border-white/[0.05]">
                      <div className="text-emerald-400 font-black text-base">{v}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
                {/* Tab bar */}
                <div className="flex gap-1 bg-white/[0.03] rounded-lg p-1 mt-2">
                  {PREVIEW_TABS.map((t, i) => (
                    <div key={t} className={`flex-1 text-center py-1.5 rounded-md text-xs font-medium transition-all ${i === 0 ? 'bg-blue-500 text-white' : 'text-slate-500'}`}>{t}</div>
                  ))}
                </div>
              </div>
              {/* Score circle */}
              <div className="flex flex-col items-center justify-center bg-white/[0.02] rounded-xl border border-white/[0.05] p-6">
                <div className="relative w-24 h-24 mb-4">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#3B82F6" strokeWidth="8"
                      strokeDasharray="185 264" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white font-black text-2xl">7.0</span>
                    <span className="text-slate-500 text-xs">/10</span>
                  </div>
                </div>
                <div className="text-white font-semibold text-sm">Maturity Score</div>
                <div className="text-slate-500 text-xs mt-1">Needs Improvement</div>
                <div className="mt-4 space-y-2 w-full">
                  {[['Automation Potential','9'],['Manual Effort','8'],['Data Visibility','3']].map(([l,v]) => (
                    <div key={l} className="flex items-center gap-2">
                      <span className="text-slate-500 text-xs flex-1">{l}</span>
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${parseInt(v)*10}%` }} />
                      </div>
                      <span className="text-blue-400 text-xs font-bold w-4">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Glow under mockup */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-blue-500/10 blur-2xl rounded-full" />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge color="blue" className="mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 tracking-tight">
              Everything you need to<br /><span className="text-blue-400">transform your processes</span>
            </h2>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
              From diagnosis to implementation, DxPilot covers the full transformation lifecycle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <Card key={i} hover className={`fade-up d${Math.min(i + 1, 6)}`}>
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
                  <f.icon size={20} className="text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-[#0d1424]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge color="purple">How It Works</Badge>
            <h2 className="text-4xl font-black text-white mt-4 tracking-tight">Three steps to clarity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0" />
            {HOW_IT_WORKS.map((s, i) => (
              <div key={i} className="text-center fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20">
                  <span className="text-white font-black text-xl">{s.step}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/new-diagnosis">
              <Button size="lg">Try It Now — It's Free <ArrowRight size={16} /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge color="cyan">Use Cases</Badge>
            <h2 className="text-4xl font-black text-white mt-4 tracking-tight">Built for every team size</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <Card key={i} hover className="text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                  <span className="text-2xl">{['🚀','🏢','🏗️','⚙️'][i]}</span>
                </div>
                <h3 className="text-white font-bold mb-2">{ind.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{ind.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/10 border border-blue-500/20 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
            <div className="relative">
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
                Ready to diagnose your processes?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Join hundreds of teams using DxPilot to turn operational chaos into structured transformation plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/new-diagnosis">
                  <Button size="lg">Start Free Diagnosis <ArrowRight size={16} /></Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg">View Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
