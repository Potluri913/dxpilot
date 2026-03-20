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
function scoreBadge(v) {
  const cls = v >= 7 ? 'text-red-400 bg-red-500/10' : v >= 5 ? 'text-amber-400 bg-amber-500/10' : 'text-emerald-400 bg-emerald-500/10'
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>{scoreLabel(v)}</span>
}

export default function Results({ diagnosis: prop }) {
  const d = prop || DEMO
  const [tab, setTab] = useState('Overview')

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full font-medium">{d.id}</span>
              <span className="text-xs text-slate-500 bg-white/5 px-2.5 py-0.5 rounded-full">{d.input?.industry}</span>
            </div>
            <h1 className="text-xl font-black">{d.title}</h1>
            <p className="text-slate-500 text-xs mt-1">{new Date(d.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-white/[0.07] px-3 py-2 rounded-xl transition-all">
              <ArrowLeft size={12} /> Back
            </Link>
            <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-white/[0.07] px-3 py-2 rounded-xl transition-all">
              <Download size={12} /> Export
            </button>
          </div>
        </div>

        {/* Score banner */}
        <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6 mb-6 flex flex-wrap items-center gap-6">
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-16 h-16 -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#3B82F6" strokeWidth="8"
                strokeDasharray={`${(d.overallScore / 10) * 264} 264`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white font-black text-lg leading-none">{d.overallScore}</span>
              <span className="text-slate-500 text-xs">/10</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold mb-1">Process Maturity Score</div>
            <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{d.summary}</p>
          </div>
          <div className="flex gap-5 flex-wrap">
            {Object.entries(d.estimatedImpact).map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="text-emerald-400 font-black text-base">{v}</div>
                <div className="text-slate-500 text-xs capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/[0.03] rounded-xl p-1 mb-6 overflow-x-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap
                ${tab === t ? 'bg-blue-500 text-white' : 'text-slate-500 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Symptoms</p>
              <ul className="space-y-3">
                {d.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <AlertTriangle size={12} className="text-amber-400 mt-0.5 flex-shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Bottlenecks</p>
              <div className="space-y-3">
                {d.bottlenecks.map((b, i) => (
                  <div key={i} className="p-3 bg-white/[0.03] rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-xs font-semibold">{b.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${b.severity === 'Critical' ? 'text-red-400 bg-red-500/10' : b.severity === 'High' ? 'text-amber-400 bg-amber-500/10' : 'text-blue-400 bg-blue-500/10'}`}>{b.severity}</span>
                    </div>
                    <p className="text-slate-500 text-xs">{b.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Opportunities</p>
              <ul className="space-y-2">
                {d.opportunities.map((o, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-emerald-400">◆</span> {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Stakeholders</p>
              <div className="flex flex-wrap gap-2">
                {d.stakeholders.map((s, i) => (
                  <span key={i} className="text-xs text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scores */}
        {tab === 'Scores' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6 flex flex-col items-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4 self-start">Maturity Radar</p>
              <RadarChart scores={d.scores} />
            </div>
            <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Dimension Scores</p>
              <div className="space-y-4">
                {SCORING_DIMENSIONS.map(dim => {
                  const val = d.scores[dim.key] || 0
                  return (
                    <div key={dim.key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-300 text-xs">{dim.label}</span>
                        <div className="flex items-center gap-2">
                          {scoreBadge(val)}
                          <span className="text-white font-bold text-xs w-4 text-right">{val}</span>
                        </div>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${val * 10}%`, background: scoreColor(val) }} />
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
          <div className="space-y-4">
            <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Root Causes</p>
              <div className="space-y-2">
                {d.rootCauses.map((rc, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.03] rounded-xl">
                    <span className="w-5 h-5 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className="text-slate-300 text-sm">{rc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Risk Assessment</p>
              <div className="space-y-2">
                {d.risks.map((r, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 p-3 bg-white/[0.03] rounded-xl text-xs">
                    <span className="text-slate-300 col-span-1">{r.risk}</span>
                    <span className={`${r.likelihood === 'High' ? 'text-red-400' : 'text-amber-400'}`}>{r.likelihood}</span>
                    <span className={`${r.impact === 'High' ? 'text-red-400' : 'text-amber-400'}`}>{r.impact}</span>
                    <span className="text-slate-500">{r.mitigation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Solutions */}
        {tab === 'Solutions' && (
          <div className="space-y-4">
            <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-4">Quick Wins</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {d.quickWins.map((qw, i) => (
                  <div key={i} className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <p className="text-slate-200 text-xs font-medium mb-2">{qw.action}</p>
                    <div className="flex gap-2">
                      <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">{qw.effort}</span>
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{qw.impact} impact</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {d.recommendations.map((rec, i) => (
              <div key={i} className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{rec.icon}</span>
                    <div>
                      <h4 className="text-white font-bold text-sm">{rec.name}</h4>
                      <span className="text-slate-500 text-xs">{rec.category}</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-black text-sm">{rec.confidence}%</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{rec.why}</p>
                <div className="grid grid-cols-3 gap-3">
                  {[['Complexity', rec.complexity], ['Timeline', rec.timeline], ['ROI', rec.roi]].map(([l, v]) => (
                    <div key={l} className="p-2.5 bg-white/[0.03] rounded-lg">
                      <div className="text-slate-500 text-xs mb-0.5">{l}</div>
                      <div className="text-white text-xs font-semibold">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Roadmap */}
        {tab === 'Roadmap' && (
          <div className="space-y-3">
            {d.roadmap.map((phase, pi) => (
              <div key={pi} className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6 border-l-2" style={{ borderLeftColor: phase.color }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-sm">{phase.phase}</h3>
                  <span className="text-xs text-slate-500 bg-white/5 px-2.5 py-1 rounded-full">{phase.weeks}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {phase.items.map((item, ii) => (
                    <div key={ii} className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: phase.color }} />
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(d.estimatedImpact).map(([k, v]) => (
                <div key={k} className="bg-[#111827] border border-emerald-500/10 rounded-2xl p-5 text-center">
                  <div className="text-emerald-400 font-black text-xl mb-1">{v}</div>
                  <div className="text-slate-500 text-xs capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
              ))}
            </div>
            <div className="bg-[#111827] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">KPI Targets</p>
              <div className="space-y-2">
                {d.kpis.map((kpi, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 p-3 bg-white/[0.03] rounded-xl text-xs items-center">
                    <span className="text-white font-medium">{kpi.metric}</span>
                    <span className="text-red-400">{kpi.current}</span>
                    <span className="text-emerald-400">{kpi.target}</span>
                    <span className="flex items-center gap-1 text-emerald-400"><TrendingUp size={10} />{kpi.improvement}</span>
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
