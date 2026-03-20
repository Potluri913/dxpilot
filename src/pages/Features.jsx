import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'

const FEATURES = [
  { title: 'AI-Powered Diagnosis', badge: 'Core', desc: 'Describe your messy business problem in plain language. Our AI extracts symptoms, identifies patterns, and structures a consulting-grade diagnosis in seconds.', points: ['Natural language input', 'Extracts symptoms and root causes automatically', 'Contextual analysis based on industry and size'] },
  { title: 'Maturity Scoring', badge: 'Analytics', desc: 'Get scored across 9 critical dimensions with a visual radar chart. Understand exactly where your process stands and where to focus first.', points: ['9-dimension scoring framework', 'Visual radar chart', 'Benchmarked against industry standards'] },
  { title: 'Root Cause Analysis', badge: 'Analysis', desc: 'Go beyond symptoms. DxPilot identifies the underlying structural causes of your process failures.', points: ['Structured root cause identification', 'Bottleneck severity classification', 'Risk assessment with mitigation'] },
  { title: 'ROI Recommendations', badge: 'Solutions', desc: 'Every solution comes with expected ROI, implementation complexity, and timeline estimates.', points: ['Categorized solution library', 'Confidence scores per recommendation', 'Quick wins vs. strategic initiatives'] },
  { title: 'Implementation Roadmap', badge: 'Planning', desc: 'A phased 26-week transformation plan with clear milestones and deliverables — ready to share with stakeholders.', points: ['4-phase structured roadmap', 'Week-by-week milestones', 'Dependency mapping'] },
  { title: 'KPI & Risk Tracking', badge: 'Tracking', desc: 'Define success metrics upfront and track improvement targets with a built-in risk register.', points: ['Before/after KPI comparison', 'Risk register with mitigation plans', 'Progress tracking'] },
]

export default function Features() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <div className="max-w-3xl mx-auto px-6 pt-36 pb-16 text-center">
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Features</p>
        <h1 className="text-4xl font-black tracking-tight mb-4">The full diagnosis toolkit</h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">Everything you need to go from operational chaos to a structured transformation plan.</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.06]">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-[#0B0F1A] hover:bg-[#0d1424] transition-colors p-8 flex flex-col md:flex-row gap-6">
              <div className="md:w-48 flex-shrink-0">
                <span className="text-xs text-blue-400 font-semibold">{f.badge}</span>
                <h3 className="text-white font-bold mt-1 text-sm">{f.title}</h3>
              </div>
              <div className="flex-1">
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                <ul className="space-y-1.5">
                  {f.points.map((p, pi) => (
                    <li key={pi} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="text-emerald-500">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/new-diagnosis" className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm">
            Start Free Diagnosis <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
