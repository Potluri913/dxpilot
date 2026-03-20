import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, Menu, X } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B0F1A]/90 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'}`}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-sm">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
            <Activity size={13} className="text-white" />
          </div>
          <span className="text-white">Dx<span className="text-blue-400">Pilot</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to}
              className={`text-xs font-medium transition-colors ${pathname === l.to ? 'text-white' : 'text-slate-500 hover:text-white'}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/dashboard" className="text-xs text-slate-400 hover:text-white transition-colors font-medium">Sign In</Link>
          <Link to="/new-diagnosis" className="text-xs bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-all">
            Start Free
          </Link>
        </div>

        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0d1424] border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4">
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm text-slate-300 hover:text-white">{l.label}</Link>
          ))}
          <Link to="/new-diagnosis" onClick={() => setOpen(false)} className="text-sm bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg text-center">Start Free</Link>
        </div>
      )}
    </nav>
  )
}
