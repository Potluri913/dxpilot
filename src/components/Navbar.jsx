import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0B0F1A]/95 backdrop-blur-xl border-b border-white/[0.05]' : 'bg-transparent'}`}>
      <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
            <Activity size={13} className="text-white" />
          </div>
          <span className="text-white font-bold text-sm">DxPilot</span>
        </Link>

        <div className="flex items-center gap-8">
          {[['/', 'Home'], ['/features', 'Features'], ['/pricing', 'Pricing']].map(([to, label]) => (
            <Link key={to} to={to}
              className={`text-xs transition-colors ${pathname === to ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              {label}
            </Link>
          ))}
        </div>

        <Link to="/new-diagnosis"
          className="text-xs bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-all">
          Start Free
        </Link>
      </div>
    </nav>
  )
}
