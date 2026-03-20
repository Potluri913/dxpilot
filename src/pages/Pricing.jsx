import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const PLANS = [
  {
    name: 'Free', price: { m: '$0', a: '$0' }, desc: 'For exploring DxPilot.',
    features: ['3 diagnoses / month', 'Basic maturity scoring', 'Overview report', 'PDF export'],
    cta: 'Get Started', primary: false,
  },
  {
    name: 'Pro', price: { m: '$49', a: '$39' }, desc: 'For teams that need more.',
    features: ['Unlimited diagnoses', 'Full 9-dimension scoring', 'Root cause analysis', 'ROI recommendations', 'Implementation roadmap', 'KPI & risk tracking', 'Priority support'],
    cta: 'Start Pro Trial', primary: true,
  },
  {
    name: 'Enterprise', price: { m: 'Custom', a: 'Custom' }, desc: 'For large organizations.',
    features: ['Everything in Pro', 'Unlimited seats', 'Custom AI fine-tuning', 'SSO & security', 'API access', 'Dedicated success manager'],
    cta: 'Contact Sales', primary: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', color: '#F1F5F9' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '160px 40px 60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 12 }}>Simple pricing</h1>
        <p style={{ color: '#64748b', fontSize: 15, marginBottom: 32 }}>Start free. Upgrade when you need more.</p>
        <div style={{ display: 'inline-flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4, border: '1px solid rgba(255,255,255,0.06)' }}>
          {[['Monthly', false], ['Annual  –20%', true]].map(([label, val]) => (
            <button key={label} onClick={() => setAnnual(val)}
              style={{ padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: annual === val ? 'rgba(255,255,255,0.1)' : 'transparent', color: annual === val ? '#fff' : '#64748b' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 40px 120px' }}>
        <div className="dx-pricing-grid">
          {PLANS.map((plan, i) => (
            <div key={i} className={`dx-plan ${plan.primary ? 'dx-plan-featured' : ''}`}>
              <div className="dx-plan-name">{plan.name}</div>
              <div className="dx-plan-desc">{plan.desc}</div>
              <div className="dx-plan-price">
                {annual ? plan.price.a : plan.price.m}
                {plan.price.m !== 'Custom' && plan.price.m !== '$0' && <span> /mo</span>}
              </div>
              <ul className="dx-plan-features">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="dx-plan-feature">{f}</li>
                ))}
              </ul>
              <Link to="/new-diagnosis" className={`dx-plan-cta ${plan.primary ? 'dx-plan-cta-primary' : 'dx-plan-cta-secondary'}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
