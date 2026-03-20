import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'

const FEATURES = [
  { title: 'AI Diagnosis', desc: 'Describe your problem in plain language and get a structured, consulting-grade diagnosis in seconds.' },
  { title: 'Maturity Scoring', desc: 'Understand exactly where your process stands across 9 dimensions with a clear visual score.' },
  { title: 'Transformation Roadmap', desc: 'Get a phased implementation plan with ROI estimates, timelines, and prioritized next steps.' },
]

const STEPS = [
  { n: '01', label: 'Describe your problem' },
  { n: '02', label: 'AI diagnoses root causes' },
  { n: '03', label: 'Get your roadmap' },
]

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', color: '#F1F5F9' }}>

      {/* Hero */}
      <div className="dx-hero">
        <h1>
          Diagnose your processes.<br />
          <span>Fix what matters.</span>
        </h1>
        <p>AI-powered process diagnosis that turns operational chaos into a clear transformation plan.</p>
        <div className="dx-hero-ctas">
          <Link to="/new-diagnosis" className="dx-btn-primary">
            Start Diagnosis <ArrowRight size={15} />
          </Link>
          <Link to="/results/demo" className="dx-btn-ghost">
            View demo report →
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="dx-section">
        <div className="dx-features">
          {FEATURES.map((f, i) => (
            <div key={i}>
              <div className="dx-feature-title">{f.title}</div>
              <div className="dx-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
      </div>

      {/* How it works */}
      <div className="dx-section">
        <div className="dx-steps">
          {STEPS.map((s, i) => (
            <div key={i}>
              <div className="dx-step-num">{s.n}</div>
              <div className="dx-step-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
      </div>

      {/* CTA */}
      <div className="dx-cta-section">
        <h2>Ready to start?</h2>
        <p>Free to use. Results in under a minute.</p>
        <Link to="/new-diagnosis" className="dx-btn-primary">
          Start Free Diagnosis <ArrowRight size={15} />
        </Link>
      </div>

      <Footer />
    </div>
  )
}
