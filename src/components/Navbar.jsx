import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, Menu, X } from 'lucide-react'
import Button from './ui/Button'

const NAV_LINKS = [
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
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B0F1A]/95 backdrop-blur-xl border-b border-white/[0.07] shadow-xl shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-bold text-lg group">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-400 transition-colors">
            <Activity size={15} className="text-white" />
          </div>
          <span className="text-white">Dx<span className="text-blue-400">Pilot</span></span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to}
              className={`text-sm font-medium transition-colors ${pathname === l.to ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/dashboard"><Button variant="ghost" size="sm">Sign In</Button></Link>
          <Link to="/new-diagnosis"><Button size="sm">Start Free →</Button></Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-slate-400 hover:text-white transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#111827] border-t border-white/[0.07] px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className="text-sm text-slate-300 hover:text-white transition-colors">{l.label}</Link>
          ))}
          <Link to="/new-diagnosis" onClick={() => setOpen(false)}>
            <Button className="w-full">Start Free →</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
