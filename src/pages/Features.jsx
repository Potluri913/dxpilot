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
    <div style={{ minHeight: '100vh', background: '#0B0F1A', color: '#F1F5F9' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '160px 40px 60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}>The full toolkit</h1>
        <p style={{ color: '#64748b', fontSize: 15 }}>From diagnosis to implementation — everything in one place.</p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px 120px' }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, paddingTop: 48, paddingBottom: 48, borderBottom: i < FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{f.desc}</div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, alignSelf: 'center' }}>
              {f.points.map((p, pi) => (
                <li key={pi} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#94a3b8' }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#3B82F6', flexShrink: 0 }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <Link to="/new-diagnosis" className="dx-btn-primary">
            Start Free <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
