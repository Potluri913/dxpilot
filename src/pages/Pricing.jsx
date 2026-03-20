import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, Zap } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Footer from '../components/Footer'

const PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    desc: 'Perfect for exploring DxPilot and running your first diagnosis.',
    badge: null,
    features: [
      '3 diagnoses per month',
      'Basic maturity scoring',
      'Overview & symptoms report',
      'PDF export',
      'Email support',
    ],
    cta: 'Get Started Free',
    ctaVariant: 'outline',
    to: '/new-diagnosis',
  },
  {
    name: 'Pro',
    price: { monthly: 49, annual: 39 },
    desc: 'For teams that need unlimited diagnoses and advanced insights.',
    badge: 'Most Popular',
    features: [
      'Unlimited diagnoses',
      'Full 9-dimension scoring',
      'Root cause analysis',
      'ROI-backed recommendations',
      'Implementation roadmap',
      'KPI & risk tracking',
      'Priority support',
      'Team collaboration (3 seats)',
    ],
    cta: 'Start Pro Trial',
    ctaVariant: 'primary',
    to: '/new-diagnosis',
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    desc: 'Custom solutions for large organizations with complex needs.',
    badge: null,
    features: [
      'Everything in Pro',
      'Unlimited team seats',
      'Custom AI model fine-tuning',
      'SSO & advanced security',
      'API access',
      'Dedicated success manager',
      'SLA guarantee',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    ctaVariant: 'outline',
    to: '/new-diagnosis',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="pt-32 pb-16 px-6 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />
        <Badge color="blue">Pricing</Badge>
        <h1 className="text-5xl font-black text-white mt-4 mb-4 tracking-tight">
          Simple, transparent pricing
        </h1>
        <p className="text-slate-400 text-xl max-w-xl mx-auto mb-8">
          Start free. Upgrade when you need more power.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-white/5 rounded-xl p-1">
          <button onClick={() => setAnnual(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!annual ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}>
            Monthly
          </button>
          <button onClick={() => setAnnual(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${annual ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}>
            Annual
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <div key={i} className={`relative ${plan.badge ? 'md:-mt-4' : ''}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge color="blue"><Zap size={10} className="mr-1" />{plan.badge}</Badge>
                </div>
              )}
              <Card className={`h-full flex flex-col ${plan.badge ? 'border-blue-500/40 shadow-xl shadow-blue-500/10' : ''}`}>
                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-sm">{plan.desc}</p>
                </div>

                <div className="mb-6">
                  {plan.price.monthly === null ? (
                    <div className="text-3xl font-black text-white">Custom</div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black text-white">
                        ${annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-slate-400 text-sm mb-1.5">/mo</span>
                      )}
                    </div>
                  )}
                  {annual && plan.price.monthly > 0 && (
                    <p className="text-slate-500 text-xs mt-1">Billed annually</p>
                  )}
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to={plan.to}>
                  <Button variant={plan.ctaVariant} className="w-full">
                    {plan.cta} {plan.ctaVariant === 'primary' && <ArrowRight size={14} />}
                  </Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Questions?</h2>
          <p className="text-slate-400 mb-4">We're happy to help. Reach out at <span className="text-blue-400">hello@dxpilot.ai</span></p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
