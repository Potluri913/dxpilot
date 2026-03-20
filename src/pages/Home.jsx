import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Footer from '../components/Footer'

const FEATURES = [
  { title: 'AI Diagnosis', desc: 'Describe your problem in plain language. Get a structured diagnosis instantly.' },
  { title: 'Maturity Scoring', desc: 'Score your process across 9 dimensions with a visual radar chart.' },
  { title: 'Root Cause Analysis', desc: 'Find the real reasons your process is broken, not just the symptoms.' },
  { title: 'ROI Recommendations', desc: 'Every solution comes with timeline, complexity, and expected ROI.' },
  { title: 'Implementation Roadmap', desc: 'A phased 26-week plan with clear milestones and deliverables.' },
  { title: 'KPI & Risk Tracking', desc: 'Track improvement targets and manage risks with mitigation strategies.' },
]

const STEPS = [
  { n: '1', title: 'Describe your problem', desc: 'Write about your operational challenge in plain language.' },
  { n: '2', title: 'AI analyzes & diagnoses', desc: 'Scores maturity across 9 dimensions and identifies root causes.' },
  { n: '3', title: 'Get your roadmap', desc: 'Receive prioritized solutions with ROI and a phased plan.' },
]

const INDUSTRIES = ['Startups', 'SMEs', 'Enterprises', 'Operations Teams']

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-40 pb-32 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          AI-Powered Process Intelligence
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.08] mb-6">
          Diagnose your business<br />
          <span className="text-blue-400">processes in minutes</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Describe your operational problem. DxPilot's AI diagnoses root causes, scores process maturity, and delivers a transformation roadmap.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/new-diagnosis" className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-px text-sm">
            Start Diagnosis <ArrowRight size={15} />
          </Link>
          <Link to="/results/demo" className="inline-flex items-center justify-center gap-2 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 font-semibold px-6 py-3 rounded-xl transition-all text-sm">
            View Demo Report
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-xs text-slate-500">
          {['No credit card required', 'Free forever plan', 'Results in 30 seconds'].map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-emerald-500" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl font-black tracking-tight">Everything you need</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-[#0B0F1A] p-8 hover:bg-[#111827] transition-colors">
              <div className="text-blue-400 font-black text-2xl mb-3">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-white font-bold mb-2 text-sm">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl font-black tracking-tight">Three steps to clarity</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-5">
                <span className="text-blue-400 font-black">{s.n}</span>
              </div>
              <h3 className="text-white font-bold mb-2 text-sm">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/new-diagnosis" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-px text-sm">
            Try it free <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="text-center mb-12">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Use Cases</p>
          <h2 className="text-3xl font-black tracking-tight">Built for every team</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INDUSTRIES.map((name, i) => (
            <div key={i} className="border border-white/[0.07] rounded-2xl p-6 text-center hover:border-blue-500/30 hover:bg-blue-500/5 transition-all">
              <div className="text-2xl mb-3">{['🚀', '🏢', '🏗️', '⚙️'][i]}</div>
              <div className="text-white font-semibold text-sm">{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 pb-32 text-center">
        <div className="border border-white/[0.07] rounded-3xl p-12">
          <h2 className="text-3xl font-black tracking-tight mb-4">Ready to diagnose?</h2>
          <p className="text-slate-400 text-sm mb-8">Turn operational chaos into a structured transformation plan.</p>
          <Link to="/new-diagnosis" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-px text-sm">
            Start Free Diagnosis <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
