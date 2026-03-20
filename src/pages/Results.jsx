import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { Tabs, TabPanel } from '../components/ui/Tabs'
import RadarChart from '../components/RadarChart'
import { SCORING_DIMENSIONS } from '../data/constants'
import { generateDiagnosis } from '../data/engine'

// Demo data for /results/demo route
const DEMO = generateDiagnosis({
  problem: 'Our customer onboarding is slow, teams use spreadsheets, approvals happen over email, and nobody knows where applications get stuck. We lose about 15% of new customers during the process.',
  industry: 'Finance & Banking',
  bizSize: 'Medium (51–200)',
  department: 'Operations',
  tools: 'Excel, Gmail, Slack',
  urgency: 'High — actively blocking operations'
})

const TABS = [
  { id: 'overview',  label: 'Overview',  icon: '◎' },
  { id: 'scores',    label: 'Scores',    icon: '▦' },
  { id: 'analysis',  label: 'Analysis',  icon: '⚡' },
  { id: 'solutions', label: 'Solutions', icon: '◈' },
  { id: 'roadmap',   label: 'Roadmap',   icon: '▶' },
  { id: 'impact',    label: 'Impact',    icon: '★' },
]

function ScoreColor(v) {
  return v >= 7 ? 'red' : v >= 5 ? 'yellow' : 'green'
}
function ScoreLabel(v) {
  return v >= 7 ? 'Critical' : v >= 5 ? 'Needs Work' : 'Good'
}
function ScoreHex(v) {
  return v >= 7 ? '#EF4444' : v >= 5 ? '#F59E0B' : '#10B981'
}

export default function Results({ diagnosis: propDiagnosis }) {
  const d = propDiagnosis || DEMO

  return (
    <div className="min-h-screen bg-[#0B0F1A] pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge color="blue">{d.id}</Badge>
              <Badge color="purple">{d.input?.industry || 'General'}</Badge>
              <Badge color="gray">{d.input?.department || 'Operations'}</Badge>
            </div>
            <h1 className="text-2xl font-black text-white">{d.title}</h1>
            <p className="text-slate-500 text-sm mt-1">{new Date(d.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard"><Button variant="ghost" size="sm"><ArrowLeft size={14} /> Back</Button></Link>
            <Button variant="outline" size="sm"><Download size={14} /> Export</Button>
            <Button size="sm"><CheckCircle size={14} /> Save</Button>
          </div>
        </div>

        {/* Score banner */}
        <Card className="mb-6 bg-gradient-to-br from-[#0d1e3a] to-[#111827] border-blue-500/20">
          <div className="flex flex-wrap items-center gap-6">
            {/* Ring */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#3B82F6" strokeWidth="8"
                  strokeDasharray={`${(d.overallScore / 10) * 264} 264`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white font-black text-xl leading-none">{d.overallScore}</span>
                <span className="text-slate-500 text-xs">/10</span>
              </div>
            </div>
            {/* Summary */}
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold mb-1">Process Maturity Score</div>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{d.summary}</p>
            </div>
            {/* Impact stats */}
            <div className="flex gap-4 flex-wrap">
              {Object.entries(d.estimatedImpact).map(([k, v]) => (
                <div key={k} className="text-center">
                  <div className="text-emerald-400 font-black text-lg">{v}</div>
                  <div className="text-slate-500 text-xs capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs tabs={TABS} defaultTab="overview">
          {/* Overview */}
          <TabPanel tabId="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Card>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Symptoms Identified</h3>
                <ul className="space-y-3">
                  {d.symptoms.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <AlertTriangle size={13} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Process Bottlenecks</h3>
                <div className="space-y-3">
                  {d.bottlenecks.map((b, i) => (
                    <div key={i} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-semibold">{b.name}</span>
                        <Badge color={b.severity === 'Critical' ? 'red' : b.severity === 'High' ? 'yellow' : 'blue'}>{b.severity}</Badge>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{b.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Stakeholders</h3>
                <div className="flex flex-wrap gap-2">
                  {d.stakeholders.map((s, i) => <Badge key={i} color="purple">{s}</Badge>)}
                </div>
              </Card>
              <Card>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Opportunities</h3>
                <ul className="space-y-2.5">
                  {d.opportunities.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">◆</span> {o}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </TabPanel>

          {/* Scores */}
          <TabPanel tabId="scores">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Card className="flex flex-col items-center">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 self-start">Maturity Radar</h3>
                <RadarChart scores={d.scores} />
              </Card>
              <Card>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Dimension Scores</h3>
                <div className="space-y-4">
                  {SCORING_DIMENSIONS.map(dim => {
                    const val = d.scores[dim.key] || 0
                    const hex = ScoreHex(val)
                    return (
                      <div key={dim.key}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-slate-300 text-sm">{dim.label}</span>
                          <div className="flex items-center gap-2">
                            <Badge color={ScoreColor(val)}>{ScoreLabel(val)}</Badge>
                            <span className="text-white font-bold text-sm w-5 text-right">{val}</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${val * 10}%`, background: hex }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>
          </TabPanel>

          {/* Analysis */}
          <TabPanel tabId="analysis">
            <div className="space-y-5">
              <Card>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Root Causes</h3>
                <div className="space-y-3">
                  {d.rootCauses.map((rc, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                      <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center text-red-400 font-bold text-xs flex-shrink-0">{i + 1}</div>
                      <span className="text-slate-300 text-sm leading-relaxed">{rc}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Risk Assessment</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        {['Risk', 'Likelihood', 'Impact', 'Mitigation'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {d.risks.map((r, i) => (
                        <tr key={i} className="border-t border-white/[0.05]">
                          <td className="py-3 pr-4 text-sm text-slate-300">{r.risk}</td>
                          <td className="py-3 pr-4"><Badge color={r.likelihood === 'High' ? 'red' : 'yellow'}>{r.likelihood}</Badge></td>
                          <td className="py-3 pr-4"><Badge color={r.impact === 'High' ? 'red' : 'yellow'}>{r.impact}</Badge></td>
                          <td className="py-3 text-xs text-slate-400">{r.mitigation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </TabPanel>

          {/* Solutions */}
          <TabPanel tabId="solutions">
            <div className="space-y-4">
              {/* Quick wins */}
              <Card>
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">⚡ Quick Wins</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {d.quickWins.map((qw, i) => (
                    <div key={i} className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
                      <p className="text-slate-200 text-sm font-medium mb-2">{qw.action}</p>
                      <div className="flex gap-2">
                        <Badge color="gray">{qw.effort}</Badge>
                        <Badge color="green">{qw.impact} impact</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              {/* Recommendations */}
              {d.recommendations.map((rec, i) => (
                <Card key={i}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">{rec.icon}</div>
                      <div>
                        <h4 className="text-white font-bold text-sm">{rec.name}</h4>
                        <span className="text-slate-500 text-xs">{rec.category}</span>
                      </div>
                    </div>
                    <div className="w-11 h-11 rounded-full border-2 border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400 font-black text-xs">{rec.confidence}%</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{rec.why}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[['Complexity', rec.complexity], ['Timeline', rec.timeline], ['Expected ROI', rec.roi]].map(([l, v]) => (
                      <div key={l} className="p-2.5 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                        <div className="text-slate-500 text-xs mb-1">{l}</div>
                        <div className="text-white text-xs font-semibold">{v}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabPanel>

          {/* Roadmap */}
          <TabPanel tabId="roadmap">
            <div className="space-y-4">
              {d.roadmap.map((phase, pi) => (
                <Card key={pi} className="border-l-2" style={{ borderLeftColor: phase.color }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold">{phase.phase}</h3>
                    <Badge color={['blue','purple','green','cyan'][pi]}>{phase.weeks}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {phase.items.map((item, ii) => (
                      <div key={ii} className="flex items-center gap-2.5 p-2.5 bg-white/[0.03] rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: phase.color }} />
                        <span className="text-slate-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabPanel>

          {/* Impact */}
          <TabPanel tabId="impact">
            <div className="space-y-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(d.estimatedImpact).map(([k, v]) => (
                  <Card key={k} className="text-center bg-emerald-500/5 border-emerald-500/15">
                    <div className="text-emerald-400 font-black text-2xl mb-1">{v}</div>
                    <div className="text-slate-400 text-xs capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </Card>
                ))}
              </div>
              <Card>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">KPI Targets</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        {['Metric', 'Current', 'Target', 'Improvement'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider pb-3 pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {d.kpis.map((kpi, i) => (
                        <tr key={i} className="border-t border-white/[0.05]">
                          <td className="py-3 pr-4 text-sm text-white font-medium">{kpi.metric}</td>
                          <td className="py-3 pr-4 text-sm text-red-400">{kpi.current}</td>
                          <td className="py-3 pr-4 text-sm text-emerald-400">{kpi.target}</td>
                          <td className="py-3">
                            <Badge color="green"><TrendingUp size={10} className="mr-1" />{kpi.improvement}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}
