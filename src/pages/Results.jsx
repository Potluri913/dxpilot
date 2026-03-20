import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, TrendingUp, AlertTriangle } from 'lucide-react'
import RadarChart from '../components/RadarChart'
import { SCORING_DIMENSIONS } from '../data/constants'
import { generateDiagnosis } from '../data/engine'

const DEMO = generateDiagnosis({
  problem: 'Our customer onboarding is slow, teams use spreadsheets, approvals happen over email, and nobody knows where applications get stuck. We lose about 15% of new customers during the process.',
  industry: 'Finance & Banking', bizSize: 'Medium (51–200)',
  department: 'Operations', tools: 'Excel, Gmail, Slack',
  urgency: 'High — actively blocking operations'
})

const TABS = ['Overview', 'Scores', 'Analysis', 'Solutions', 'Roadmap', 'Impact']

function scoreColor(v) { return v >= 7 ? '#EF4444' : v >= 5 ? '#F59E0B' : '#10B981' }
function scoreLabel(v) { return v >= 7 ? 'Critical' : v >= 5 ? 'Needs Work' : 'Good' }

const card = { background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }
const sectionLabel = { fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }
const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }

export default function Results({ diagnosis: prop }) {
  const d = prop || DEMO
  const [tab, setTab] = useState('Overview')

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', color: '#F1F5F9', paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: '#60a5fa', background: 'rgba(59,130,246,0.1)', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{d.id}</span>
              <span style={{ fontSize: 11, color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '3px 10px', borderRadius: 20 }}>{d.input?.industry}</span>
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>{d.title}</h1>
            <p style={{ fontSize: 12, color: '#475569' }}>{new Date(d.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', border: '1px solid rgba(255,255,255,0.07)', padding: '8px 14px', borderRadius: 10, textDecoration: 'none' }}>
              <ArrowLeft size={12} /> Back
            </Link>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', border: '1px solid rgba(255,255,255,0.07)', padding: '8px 14px', borderRadius: 10, background: 'none', cursor: 'pointer' }}>
              <Download size={12} /> Export
            </button>
          </div>
        </div>

        {/* Score banner */}
        <div style={{ ...card, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24, marginBottom: 24 }}>
          <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
            <svg viewBox="0 0 100 100" style={{ width: 64, height: 64, transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#3B82F6" strokeWidth="8"
                strokeDasharray={`${(d.overallScore / 10) * 264} 264`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 18, lineHeight: 1 }}>{d.overallScore}</span>
              <span style={{ color: '#475569', fontSize: 10 }}>/10</span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Process Maturity Score</div>
            <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{d.summary}</p>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {Object.entries(d.estimatedImpact).map(([k, v]) => (
              <div key={k} style={{ textAlign: 'center' }}>
                <div style={{ color: '#10b981', fontWeight: 900, fontSize: 15 }}>{v}</div>
                <div style={{ color: '#475569', fontSize: 11, marginTop: 2, textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="dx-tabs">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`dx-tab ${tab === t ? 'active' : ''}`}>{t}</button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'Overview' && (
          <div style={grid2}>
            <div style={card}>
              <div style={sectionLabel}>Symptoms</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {d.symptoms.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#cbd5e1' }}>
                    <AlertTriangle size={12} color="#f59e0b" style={{ marginTop: 2, flexShrink: 0 }} /> {s}
                  </div>
                ))}
              </div>
            </div>
            <div style={card}>
              <div style={sectionLabel}>Bottlenecks</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {d.bottlenecks.map((b, i) => (
                  <div key={i} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{b.name}</span>
                      <span style={{ fontSize: 11, color: b.severity === 'Critical' ? '#f87171' : b.severity === 'High' ? '#fbbf24' : '#60a5fa', background: b.severity === 'Critical' ? 'rgba(239,68,68,0.1)' : b.severity === 'High' ? 'rgba(245,158,11,0.1)' : 'rgba(59,130,246,0.1)', padding: '2px 8px', borderRadius: 20 }}>{b.severity}</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#64748b' }}>{b.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={card}>
              <div style={sectionLabel}>Opportunities</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {d.opportunities.map((o, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#94a3b8' }}>
                    <span style={{ color: '#10b981' }}>◆</span> {o}
                  </div>
                ))}
              </div>
            </div>
            <div style={card}>
              <div style={sectionLabel}>Stakeholders</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {d.stakeholders.map((s, i) => (
                  <span key={i} style={{ fontSize: 12, color: '#a78bfa', background: 'rgba(139,92,246,0.1)', padding: '4px 12px', borderRadius: 20 }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scores */}
        {tab === 'Scores' && (
          <div style={grid2}>
            <div style={{ ...card, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={sectionLabel}>Maturity Radar</div>
              <RadarChart scores={d.scores} />
            </div>
            <div style={card}>
              <div style={sectionLabel}>Dimension Scores</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {SCORING_DIMENSIONS.map(dim => {
                  const val = d.scores[dim.key] || 0
                  return (
                    <div key={dim.key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: '#cbd5e1' }}>{dim.label}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 11, color: scoreColor(val), background: `${scoreColor(val)}18`, padding: '2px 8px', borderRadius: 20 }}>{scoreLabel(val)}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', width: 16, textAlign: 'right' }}>{val}</span>
                        </div>
                      </div>
                      <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${val * 10}%`, background: scoreColor(val), borderRadius: 2, transition: 'width 0.7s' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Analysis */}
        {tab === 'Analysis' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={card}>
              <div style={sectionLabel}>Root Causes</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {d.rootCauses.map((rc, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                    <span style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(239,68,68,0.1)', color: '#f87171', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 13, color: '#cbd5e1' }}>{rc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={card}>
              <div style={sectionLabel}>Risk Assessment</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {d.risks.map((r, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr', gap: 16, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, fontSize: 12 }}>
                    <span style={{ color: '#cbd5e1' }}>{r.risk}</span>
                    <span style={{ color: r.likelihood === 'High' ? '#f87171' : '#fbbf24' }}>{r.likelihood}</span>
                    <span style={{ color: r.impact === 'High' ? '#f87171' : '#fbbf24' }}>{r.impact}</span>
                    <span style={{ color: '#64748b' }}>{r.mitigation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Solutions */}
        {tab === 'Solutions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={card}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Quick Wins</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {d.quickWins.map((qw, i) => (
                  <div key={i} style={{ padding: '12px 14px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: 10 }}>
                    <p style={{ fontSize: 12, fontWeight: 500, color: '#e2e8f0', marginBottom: 8 }}>{qw.action}</p>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontSize: 11, color: '#64748b', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 20 }}>{qw.effort}</span>
                      <span style={{ fontSize: 11, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: 20 }}>{qw.impact} impact</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {d.recommendations.map((rec, i) => (
              <div key={i} style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 20 }}>{rec.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{rec.name}</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>{rec.category}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 900, color: '#10b981' }}>{rec.confidence}%</span>
                </div>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>{rec.why}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                  {[['Complexity', rec.complexity], ['Timeline', rec.timeline], ['ROI', rec.roi]].map(([l, v]) => (
                    <div key={l} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <div style={{ fontSize: 11, color: '#475569', marginBottom: 2 }}>{l}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Roadmap */}
        {tab === 'Roadmap' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {d.roadmap.map((phase, pi) => (
              <div key={pi} style={{ ...card, borderLeft: `3px solid ${phase.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{phase.phase}</span>
                  <span style={{ fontSize: 12, color: '#64748b', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 20 }}>{phase.weeks}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {phase.items.map((item, ii) => (
                    <div key={ii} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#94a3b8' }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: phase.color, flexShrink: 0, marginTop: 6 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Impact */}
        {tab === 'Impact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {Object.entries(d.estimatedImpact).map(([k, v]) => (
                <div key={k} style={{ ...card, textAlign: 'center', border: '1px solid rgba(16,185,129,0.1)' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#10b981', marginBottom: 4 }}>{v}</div>
                  <div style={{ fontSize: 12, color: '#64748b', textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
              ))}
            </div>
            <div style={card}>
              <div style={sectionLabel}>KPI Targets</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {d.kpis.map((kpi, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 16, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, fontSize: 12, alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{kpi.metric}</span>
                    <span style={{ color: '#f87171' }}>{kpi.current}</span>
                    <span style={{ color: '#10b981' }}>{kpi.target}</span>
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}><TrendingUp size={10} />{kpi.improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
