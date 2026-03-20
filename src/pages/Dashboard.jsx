import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, FileText, TrendingUp, Clock, ChevronRight, Activity, BarChart3, Settings, Home, Trash2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { SAMPLE_REPORTS } from '../data/constants'

const SIDEBAR_LINKS = [
  { icon: Home,      label: 'Dashboard',    to: '/dashboard',      active: true },
  { icon: FileText,  label: 'Reports',      to: '/dashboard',      active: false },
  { icon: BarChart3, label: 'Analytics',    to: '/dashboard',      active: false },
  { icon: Settings,  label: 'Settings',     to: '/dashboard',      active: false },
]

const STATS = [
  { label: 'Total Diagnoses', value: '12', change: '+3 this month', icon: FileText, color: 'blue' },
  { label: 'Avg Maturity Score', value: '6.7', change: '+0.4 vs last month', icon: TrendingUp, color: 'green' },
  { label: 'Processes Improved', value: '8', change: '67% completion rate', icon: Activity, color: 'purple' },
  { label: 'Time Saved (est.)', value: '240h', change: 'Across all projects', icon: Clock, color: 'cyan' },
]

function ScoreRing({ score }) {
  const pct = (score / 10) * 264
  const color = score >= 7 ? '#EF4444' : score >= 5 ? '#F59E0B' : '#10B981'
  return (
    <div className="relative w-10 h-10">
      <svg viewBox="0 0 100 100" className="w-10 h-10 -rotate-90">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${pct} 264`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold text-xs">{score}</span>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[#0d1424] border-r border-white/[0.07] fixed top-0 left-0 h-full pt-16">
        <div className="p-4 mt-2">
          <Link to="/new-diagnosis">
            <Button className="w-full gap-2">
              <Plus size={15} /> New Diagnosis
            </Button>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-2">
          {SIDEBAR_LINKS.map((l, i) => (
            <Link key={i} to={l.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all
                ${l.active ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <l.icon size={16} />
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">JS</div>
            <div>
              <div className="text-white text-sm font-medium">Jane Smith</div>
              <div className="text-slate-500 text-xs">Pro Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-60 pt-16 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-0.5">Welcome back, Jane. Here's your process intelligence overview.</p>
          </div>
          <Link to="/new-diagnosis">
            <Button className="gap-2"><Plus size={15} /> New Diagnosis</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((s, i) => (
            <Card key={i} className="fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center
                  ${s.color === 'blue'   ? 'bg-blue-500/15'   : ''}
                  ${s.color === 'green'  ? 'bg-emerald-500/15': ''}
                  ${s.color === 'purple' ? 'bg-purple-500/15' : ''}
                  ${s.color === 'cyan'   ? 'bg-cyan-500/15'   : ''}
                `}>
                  <s.icon size={16} className={`
                    ${s.color === 'blue'   ? 'text-blue-400'   : ''}
                    ${s.color === 'green'  ? 'text-emerald-400': ''}
                    ${s.color === 'purple' ? 'text-purple-400' : ''}
                    ${s.color === 'cyan'   ? 'text-cyan-400'   : ''}
                  `} />
                </div>
              </div>
              <div className="text-2xl font-black text-white mb-0.5">{s.value}</div>
              <div className="text-slate-500 text-xs">{s.label}</div>
              <div className="text-emerald-400 text-xs mt-1">{s.change}</div>
            </Card>
          ))}
        </div>

        {/* Reports */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-base">Recent Diagnoses</h2>
            <Badge color="gray">{SAMPLE_REPORTS.length} reports</Badge>
          </div>
          <div className="space-y-3">
            {SAMPLE_REPORTS.map((r, i) => (
              <Link key={i} to={`/results/demo`}
                className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/[0.05] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group">
                <ScoreRing score={r.overallScore} />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm truncate">{r.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge color="blue">{r.industry}</Badge>
                    <Badge color="gray">{r.department}</Badge>
                    <span className="text-slate-500 text-xs">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color="green">Complete</Badge>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.07] text-center">
            <Link to="/new-diagnosis">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus size={13} /> Run New Diagnosis
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  )
}
