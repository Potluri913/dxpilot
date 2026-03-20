import { Link } from 'react-router-dom'
import { Plus, FileText, TrendingUp, Clock, ChevronRight, Activity, BarChart3, Settings, Home } from 'lucide-react'
import { SAMPLE_REPORTS } from '../data/constants'

const SIDEBAR = [
  { icon: Home,      label: 'Dashboard', active: true },
  { icon: FileText,  label: 'Reports',   active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Settings,  label: 'Settings',  active: false },
]

const STATS = [
  { label: 'Total Diagnoses',    value: '12', sub: '+3 this month',        icon: FileText },
  { label: 'Avg Maturity Score', value: '6.7', sub: '+0.4 vs last month',  icon: TrendingUp },
  { label: 'Processes Improved', value: '8',   sub: '67% completion rate', icon: Activity },
  { label: 'Time Saved',         value: '240h', sub: 'Across all projects', icon: Clock },
]

function Ring({ score }) {
  const color = score >= 7 ? '#EF4444' : score >= 5 ? '#F59E0B' : '#10B981'
  return (
    <div className="relative w-9 h-9 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-9 h-9 -rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={`${(score / 10) * 251} 251`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold text-xs">{score}</span>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-52 bg-[#0d1424] border-r border-white/[0.06] fixed top-0 left-0 h-full pt-14">
        <div className="p-4 mt-2">
          <Link to="/new-diagnosis" className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2.5 rounded-xl transition-all w-full">
            <Plus size={13} /> New Diagnosis
          </Link>
        </div>
        <nav className="flex-1 px-3">
          {SIDEBAR.map((l, i) => (
            <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 text-xs font-medium transition-all cursor-pointer
              ${l.active ? 'bg-white/[0.07] text-white' : 'text-slate-500 hover:text-white hover:bg-white/[0.04]'}`}>
              <l.icon size={14} /> {l.label}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">JS</div>
            <div>
              <div className="text-white text-xs font-medium">Jane Smith</div>
              <div className="text-slate-500 text-xs">Pro Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-52 pt-14 p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-black">Dashboard</h1>
            <p className="text-slate-500 text-xs mt-0.5">Welcome back, Jane.</p>
          </div>
          <Link to="/new-diagnosis" className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all">
            <Plus size={13} /> New Diagnosis
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {STATS.map((s, i) => (
            <div key={i} className="bg-[#111827] border border-white/[0.06] rounded-2xl p-5">
              <s.icon size={14} className="text-slate-500 mb-3" />
              <div className="text-2xl font-black text-white mb-0.5">{s.value}</div>
              <div className="text-slate-500 text-xs">{s.label}</div>
              <div className="text-emerald-400 text-xs mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Reports */}
        <div className="bg-[#111827] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold">Recent Diagnoses</h2>
            <span className="text-xs text-slate-500">{SAMPLE_REPORTS.length} reports</span>
          </div>
          <div className="space-y-2">
            {SAMPLE_REPORTS.map((r, i) => (
              <Link key={i} to="/results/demo"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.02] transition-all group">
                <Ring score={r.overallScore} />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{r.title}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{r.industry} · {new Date(r.createdAt).toLocaleDateString()}</div>
                </div>
                <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <Link to="/new-diagnosis" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
              <Plus size={12} /> Run new diagnosis
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
