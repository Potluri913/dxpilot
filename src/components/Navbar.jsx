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
    <nav className="dx-nav" style={{ background: scrolled ? 'rgba(11,15,26,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
      <div className="dx-nav-inner">
        <Link to="/" className="dx-logo">
          <div className="dx-logo-icon">
            <Activity size={13} color="#fff" />
          </div>
          <span className="dx-logo-text">DxPilot</span>
        </Link>

        <div className="dx-nav-links">
          {[['/', 'Home'], ['/features', 'Features'], ['/pricing', 'Pricing']].map(([to, label]) => (
            <Link key={to} to={to} className={`dx-nav-link ${pathname === to ? 'active' : ''}`}>{label}</Link>
          ))}
        </div>

        <Link to="/new-diagnosis" className="dx-btn-nav">Start Free</Link>
      </div>
    </nav>
  )
}
