import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'

const FEATURES = [
  { title: 'AI-Powered Diagnosis', desc: 'Describe your messy business problem in plain language. Our AI extracts symptoms, identifies patterns, and structures a consulting-grade diagnosis in seconds.', points: ['Natural language input', 'Extracts symptoms and root causes', 'Contextual by industry and size'] },
  { title: 'Maturity Scoring', desc: 'Get scored across 9 critical dimensions. Understand exactly where your process stands and where to focus first.', points: ['9-dimension framework', 'Visual radar chart', 'Industry benchmarked'] },
  { title: 'Root Cause Analysis', desc: 'Go beyond symptoms. Identify the underlying structural causes of your process failures.', points: ['Structured root cause identification', 'Bottleneck severity classification', 'Risk assessment'] },
  { title: 'ROI Recommendations', desc: 'Every solution comes with expected ROI, complexity, and timeline so you can prioritize with confidence.', points: ['Categorized solution library', 'Confidence scores', 'Quick wins vs. strategic'] },
  { title: 'Implementation Roadmap', desc: 'A phased 26-week transformation plan with clear milestones — ready to share with stakeholders.', points: ['4-phase roadmap', 'Week-by-week milestones', 'Dependency mapping'] },
  { title: 'KPI & Risk Tracking', desc: 'Define success metrics upfront and track improvement targets with a built-in risk register.', points: ['Before/after KPI comparison', 'Risk register', 'Progress tracking'] },
]

export default function Features() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <div className="max-w-2xl mx-auto px-8 pt-40 pb-20 text-center">
        <h1 className="text-4xl font-black tracking-tight mb-4">The full toolkit</h1>
        <p className="text-slate-500 text-sm">From diagnosis to implementation — everything in one place.</p>
      </div>

      <div className="max-w-3xl mx-auto px-8 pb-32">
        <div className="space-y-16">
          {FEATURES.map((f, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-16 border-b border-white/[0.05] last:border-0">
              <div>
                <h3 className="text-white font-bold mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
              <ul className="space-y-2.5 self-center">
                {f.points.map((p, pi) => (
                  <li key={pi} className="flex items-center gap-2.5 text-sm text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/new-diagnosis"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm">
            Start Free <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
