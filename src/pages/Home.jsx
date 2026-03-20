import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'

const FEATURES = [
  {
    title: 'AI Diagnosis',
    desc: 'Describe your problem in plain language and get a structured, consulting-grade diagnosis in seconds.',
  },
  {
    title: 'Maturity Scoring',
    desc: 'Understand exactly where your process stands across 9 dimensions with a clear visual score.',
  },
  {
    title: 'Transformation Roadmap',
    desc: 'Get a phased implementation plan with ROI estimates, timelines, and prioritized next steps.',
  },
]

const STEPS = [
  { n: '01', label: 'Describe your problem' },
  { n: '02', label: 'AI diagnoses root causes' },
  { n: '03', label: 'Get your roadmap' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-8 pt-44 pb-40 text-center">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
          Diagnose your processes.<br />
          <span className="text-blue-400">Fix what matters.</span>
        </h1>
        <p className="text-slate-400 text-lg mb-12 max-w-md mx-auto">
          AI-powered process diagnosis that turns operational chaos into a clear transformation plan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/new-diagnosis"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-px text-sm">
            Start Diagnosis <ArrowRight size={15} />
          </Link>
          <Link to="/results/demo"
            className="text-sm text-slate-400 hover:text-white transition-colors">
            View demo report →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-8 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURES.map((f, i) => (
            <div key={i}>
              <h3 className="text-white font-semibold mb-3 text-sm">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-8 pb-40">
        <div className="grid grid-cols-3 gap-8">
          {STEPS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-blue-400 font-black text-xs mb-3 tracking-widest">{s.n}</div>
              <div className="text-slate-300 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-xl mx-auto px-8 pb-40 text-center">
        <h2 className="text-3xl font-black tracking-tight mb-4">Ready to start?</h2>
        <p className="text-slate-500 text-sm mb-8">Free to use. Results in under a minute.</p>
        <Link to="/new-diagnosis"
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-px text-sm">
          Start Free Diagnosis <ArrowRight size={15} />
        </Link>
      </section>

      <Footer />
    </div>
  )
}
