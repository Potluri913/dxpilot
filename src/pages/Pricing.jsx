import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import Footer from '../components/Footer'

const PLANS = [
  {
    name: 'Free', price: { m: 0, a: 0 },
    desc: 'For exploring DxPilot.',
    features: ['3 diagnoses / month', 'Basic maturity scoring', 'Overview report', 'PDF export'],
    cta: 'Get Started', primary: false,
  },
  {
    name: 'Pro', price: { m: 49, a: 39 },
    desc: 'For teams that need more.',
    features: ['Unlimited diagnoses', 'Full 9-dimension scoring', 'Root cause analysis', 'ROI recommendations', 'Implementation roadmap', 'KPI & risk tracking', 'Priority support'],
    cta: 'Start Pro Trial', primary: true,
  },
  {
    name: 'Enterprise', price: { m: null, a: null },
    desc: 'For large organizations.',
    features: ['Everything in Pro', 'Unlimited seats', 'Custom AI fine-tuning', 'SSO & security', 'API access', 'Dedicated success manager'],
    cta: 'Contact Sales', primary: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <div className="max-w-2xl mx-auto px-6 pt-36 pb-16 text-center">
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Pricing</p>
        <h1 className="text-4xl font-black tracking-tight mb-4">Simple pricing</h1>
        <p className="text-slate-400 text-sm mb-8">Start free. Upgrade when you need more.</p>
        <div className="inline-flex items-center gap-1 bg-white/5 rounded-lg p-1 text-xs">
          <button onClick={() => setAnnual(false)} className={`px-4 py-1.5 rounded-md font-medium transition-all ${!annual ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Monthly</button>
          <button onClick={() => setAnnual(true)} className={`px-4 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${annual ? 'bg-white/10 text-white' : 'text-slate-500'}`}>
            Annual <span className="text-emerald-400 text-xs">–20%</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan, i) => (
            <div key={i} className={`rounded-2xl p-6 flex flex-col border ${plan.primary ? 'border-blue-500/40 bg-blue-500/5' : 'border-white/[0.07] bg-[#111827]'}`}>
              <div className="mb-6">
                <h3 className="text-white font-bold mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-xs">{plan.desc}</p>
              </div>
              <div className="mb-6">
                {plan.price.m === null
                  ? <span className="text-3xl font-black text-white">Custom</span>
                  : <div className="flex items-end gap-1">
                      <span className="text-3xl font-black text-white">${annual ? plan.price.a : plan.price.m}</span>
                      {plan.price.m > 0 && <span className="text-slate-500 text-xs mb-1">/mo</span>}
                    </div>
                }
              </div>
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-xs text-slate-400">
                    <Check size={12} className="text-emerald-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/new-diagnosis" className={`text-center text-xs font-semibold py-2.5 rounded-xl transition-all ${plan.primary ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'border border-white/10 text-slate-300 hover:text-white hover:border-white/20'}`}>
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
