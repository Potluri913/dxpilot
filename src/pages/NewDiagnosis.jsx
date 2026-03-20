import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Lightbulb } from 'lucide-react'
import { INDUSTRIES, BIZ_SIZES, DEPARTMENTS, URGENCY_LEVELS, EXAMPLE_PROMPTS } from '../data/constants'
import { generateDiagnosis } from '../data/engine'

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
      <div className="dx-loading">
        <div style={{ position: 'relative', width: 56, height: 56 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#3B82F6' }} className="spin" />
          <div style={{ position: 'absolute', inset: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} color="#60a5fa" />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Analyzing your process...</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>Extracting patterns and generating recommendations</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Parsing symptoms', 'Scoring dimensions', 'Building roadmap'].map((s, i) => (
            <span key={i} style={{ fontSize: 12, color: '#475569', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', padding: '6px 14px', borderRadius: 20 }}>{s}</span>
          ))}
        </div>
      </div>
    )
  }

  const inputStyle = { width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#F1F5F9', fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' }
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 500, color: '#64748b', marginBottom: 6 }

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', color: '#F1F5F9', paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>New Diagnosis</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Describe your business problem and get an AI-powered diagnosis.</p>
        </div>

        {/* Examples */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Lightbulb size={12} color="#f59e0b" />
            <span style={{ fontSize: 12, color: '#64748b' }}>Try an example</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {EXAMPLE_PROMPTS.map((ep, i) => (
              <button key={i} onClick={() => set('problem', ep.text)}
                style={{ fontSize: 12, padding: '6px 14px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', background: 'none', color: '#64748b', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.target.style.color = '#fff'; e.target.style.borderColor = 'rgba(255,255,255,0.2)' }}
                onMouseLeave={e => { e.target.style.color = '#64748b'; e.target.style.borderColor = 'rgba(255,255,255,0.07)' }}>
                {ep.title}
              </button>
            ))}
          </div>
        </div>

        {/* Problem */}
        <div className="dx-card" style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Describe your business problem *</label>
          <textarea value={form.problem} onChange={e => set('problem', e.target.value)}
            placeholder="e.g., Our customer onboarding is slow, teams use spreadsheets, approvals happen over email..."
            rows={5} style={{ ...inputStyle, resize: 'none' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 11, color: '#334155' }}>Be specific for better results</span>
            <span style={{ fontSize: 11, color: '#334155' }}>{form.problem.length} chars</span>
          </div>
        </div>

        {/* Context */}
        <div className="dx-card" style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 20 }}>Context <span style={{ color: '#475569', fontWeight: 400 }}>(improves accuracy)</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              ['Industry', 'industry', INDUSTRIES],
              ['Company Size', 'bizSize', BIZ_SIZES],
              ['Department', 'department', DEPARTMENTS],
              ['Urgency', 'urgency', URGENCY_LEVELS],
            ].map(([label, key, opts]) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <select value={form[key]} onChange={e => set(key, e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Select {label.toLowerCase()}</option>
                  {opts.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label style={labelStyle}>Current Tools</label>
              <input value={form.tools} onChange={e => set('tools', e.target.value)} placeholder="e.g., Excel, Gmail, Slack" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>People Involved</label>
              <input placeholder="e.g., 15–20 people" style={inputStyle} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleSubmit} disabled={!form.problem.trim()} className="dx-btn-primary">
            <Zap size={14} /> Generate Diagnosis
          </button>
        </div>
      </div>
    </div>
  )
}
