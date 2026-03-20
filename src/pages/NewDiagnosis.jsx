import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Lightbulb } from 'lucide-react'
import { INDUSTRIES, BIZ_SIZES, DEPARTMENTS, URGENCY_LEVELS, EXAMPLE_PROMPTS } from '../data/constants'
import { generateDiagnosis } from '../data/engine'

const inputCls = `w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm
  placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.03] transition-all`

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

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
    }, 2200)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex flex-col items-center justify-center gap-5 text-white">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 spin" />
          <div className="absolute inset-3 flex items-center justify-center">
            <Zap size={16} className="text-blue-400" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-bold mb-1">Analyzing your process...</h2>
          <p className="text-slate-500 text-sm">Extracting patterns and generating recommendations</p>
        </div>
        <div className="flex gap-2 mt-2">
          {['Parsing symptoms', 'Scoring dimensions', 'Building roadmap'].map((s, i) => (
            <span key={i} className="text-xs text-slate-500 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-full">{s}</span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black mb-1">New Diagnosis</h1>
          <p className="text-slate-500 text-sm">Describe your business problem and get an AI-powered diagnosis.</p>
        </div>

        {/* Examples */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Lightbulb size={12} className="text-amber-400" />
            <span className="text-xs text-slate-500">Try an example</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((ep, i) => (
              <button key={i} onClick={() => set('problem', ep.text)}
                className="text-xs px-3 py-1.5 rounded-full border border-white/[0.07] text-slate-400 hover:text-white hover:border-white/20 transition-all">
                {ep.title}
              </button>
            ))}
          </div>
        </div>

        {/* Problem */}
        <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6 mb-4">
          <Field label="Describe your business problem *">
            <textarea
              value={form.problem}
              onChange={e => set('problem', e.target.value)}
              placeholder="e.g., Our customer onboarding is slow, teams use spreadsheets, approvals happen over email..."
              rows={5}
              className={`${inputCls} resize-none`}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-slate-600 text-xs">Be specific for better results</span>
              <span className="text-slate-600 text-xs">{form.problem.length} chars</span>
            </div>
          </Field>
        </div>

        {/* Context */}
        <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6 mb-6">
          <p className="text-xs font-medium text-slate-500 mb-4">Context <span className="text-slate-600">(improves accuracy)</span></p>
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
              <input value={form.tools} onChange={e => set('tools', e.target.value)} placeholder="e.g., Excel, Gmail, Slack" className={inputCls} />
            </Field>
            <Field label="People Involved">
              <input placeholder="e.g., 15–20 people" className={inputCls} />
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button onClick={handleSubmit} disabled={!form.problem.trim()}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm">
            <Zap size={14} /> Generate Diagnosis
          </button>
        </div>
      </div>
    </div>
  )
}
