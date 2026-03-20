import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Lightbulb } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { INDUSTRIES, BIZ_SIZES, DEPARTMENTS, URGENCY_LEVELS, EXAMPLE_PROMPTS } from '../data/constants'
import { generateDiagnosis } from '../data/engine'

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
      {children}
    </div>
  )
}

const inputCls = `w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm
  placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-blue-500/5 transition-all`

export default function NewDiagnosis({ onResult }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ problem: '', industry: '', bizSize: '', department: '', tools: '', urgency: '' })
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    if (!form.problem.trim()) return
    setLoading(true)
    setTimeout(() => {
      const result = generateDiagnosis(form)
      onResult(result)
      navigate('/results/latest')
    }, 2400)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex flex-col items-center justify-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 spin" />
          <div className="absolute inset-3 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Zap size={20} className="text-blue-400" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-white font-bold text-xl mb-2">Analyzing your process...</h2>
          <p className="text-slate-400 text-sm">Extracting patterns, scoring maturity, generating recommendations</p>
        </div>
        <div className="flex gap-2">
          {['Parsing symptoms', 'Scoring dimensions', 'Building roadmap'].map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/[0.07]">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 spin" style={{ animationDelay: `${i * 0.3}s` }} />
              {s}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">New Diagnosis</h1>
          <p className="text-slate-400">Describe your business problem and get a structured AI-powered diagnosis.</p>
        </div>

        {/* Example prompts */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={13} className="text-amber-400" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Try an example</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((ep, i) => (
              <button key={i} onClick={() => set('problem', ep.text)}
                className="px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-400 text-xs hover:text-white hover:border-blue-500/40 hover:bg-blue-500/5 transition-all">
                {ep.title}
              </button>
            ))}
          </div>
        </div>

        {/* Problem description */}
        <Card className="mb-5">
          <Field label="Describe your business problem *">
            <textarea
              value={form.problem}
              onChange={e => set('problem', e.target.value)}
              placeholder="e.g., Our customer onboarding is slow, teams use spreadsheets, approvals happen over email, and nobody knows where applications get stuck..."
              rows={6}
              className={`${inputCls} resize-none`}
            />
            <div className="flex justify-between mt-2">
              <span className="text-slate-600 text-xs">Be as specific as possible for better results</span>
              <span className="text-slate-600 text-xs">{form.problem.length} chars</span>
            </div>
          </Field>
        </Card>

        {/* Context */}
        <Card className="mb-6">
          <h3 className="text-white font-semibold text-sm mb-4">Context <span className="text-slate-500 font-normal">(improves accuracy)</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Industry">
              <select value={form.industry} onChange={e => set('industry', e.target.value)} className={inputCls}>
                <option value="">Select industry</option>
                {INDUSTRIES.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Company Size">
              <select value={form.bizSize} onChange={e => set('bizSize', e.target.value)} className={inputCls}>
                <option value="">Select size</option>
                {BIZ_SIZES.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Department">
              <select value={form.department} onChange={e => set('department', e.target.value)} className={inputCls}>
                <option value="">Select department</option>
                {DEPARTMENTS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Urgency">
              <select value={form.urgency} onChange={e => set('urgency', e.target.value)} className={inputCls}>
                <option value="">Select urgency</option>
                {URGENCY_LEVELS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Current Tools">
              <input value={form.tools} onChange={e => set('tools', e.target.value)}
                placeholder="e.g., Excel, Gmail, Slack" className={inputCls} />
            </Field>
            <Field label="People Involved">
              <input placeholder="e.g., 15–20 people" className={inputCls} />
            </Field>
          </div>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm">Save as Draft</Button>
          <Button onClick={handleSubmit} disabled={!form.problem.trim()} loading={loading} size="lg" className="gap-2">
            <Zap size={16} /> Generate Diagnosis
          </Button>
        </div>
      </div>
    </div>
  )
}
