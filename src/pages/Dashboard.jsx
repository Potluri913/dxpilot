import { Link } from 'react-router-dom'
import { Plus, FileText, TrendingUp, Clock, ChevronRight, Activity, BarChart3, Settings, Home } from 'lucide-react'
import { SAMPLE_REPORTS } from '../data/constants'

const SIDEBAR_LINKS = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: FileText, label: 'Reports', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Settings, label: 'Settings', active: false },
]

const STATS = [
  { label: 'Total Diagnoses', value: '12', sub: '+3 this month', icon: FileText },
  { label: 'Avg Score', value: '6.7', sub: '+0.4 vs last month', icon: TrendingUp },
  { label: 'Improved', value: '8', sub: '67% completion', icon: Activity },
  { label: 'Time Saved', value: '240h', sub: 'Across all projects', icon: Clock },
]

function Ring({ score }) {
  const color = score >= 7 ? '#EF4444' : score >= 5 ? '#F59E0B' : '#10B981'
  return (
    <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}>
      <svg viewBox="0 0 100 100" style={{ width: 36, height: 36, transform: 'rotate(-90deg)' }}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={`${(score / 10) * 251} 251`} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>{score}</span>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', color: '#F1F5F9', display: 'flex' }}>
      {/* Sidebar */}
      <aside className="dx-sidebar">
        <div style={{ padding: '16px 12px' }}>
          <Link to="/new-diagnosis" className="dx-btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '10px 16px' }}>
            <Plus size={13} /> New Diagnosis
          </Link>
        </div>
        <nav className="dx-sidebar-nav">
          {SIDEBAR_LINKS.map((l, i) => (
            <button key={i} className={`dx-sidebar-link ${l.active ? 'active' : ''}`}>
              <l.icon size={14} /> {l.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>JS</div>
            <div>
              <div style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Jane Smith</div>
              <div style={{ color: '#475569', fontSize: 11 }}>Pro Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="dx-main">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Dashboard</h1>
            <p style={{ color: '#64748b', fontSize: 13 }}>Welcome back, Jane.</p>
          </div>
          <Link to="/new-diagnosis" className="dx-btn-primary" style={{ fontSize: 13, padding: '10px 20px' }}>
            <Plus size={13} /> New Diagnosis
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
          {STATS.map((s, i) => (
            <div key={i} className="dx-card" style={{ padding: 24 }}>
              <s.icon size={14} color="#475569" style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#10b981', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Reports */}
        <div className="dx-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Recent Diagnoses</span>
            <span style={{ fontSize: 12, color: '#475569' }}>{SAMPLE_REPORTS.length} reports</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SAMPLE_REPORTS.map((r, i) => (
              <Link key={i} to="/results/demo" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none', transition: 'all 0.15s', color: 'inherit' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}>
                <Ring score={r.overallScore} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{r.industry} · {new Date(r.createdAt).toLocaleDateString()}</div>
                </div>
                <ChevronRight size={14} color="#334155" />
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Link to="/new-diagnosis" style={{ fontSize: 12, color: '#3B82F6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Plus size={12} /> Run new diagnosis
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
