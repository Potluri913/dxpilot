import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-8">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-sm">
          <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
            <Activity size={11} className="text-white" />
          </div>
          <span className="text-white">Dx<span className="text-blue-400">Pilot</span></span>
        </Link>
        <div className="flex flex-wrap gap-6 text-xs text-slate-500">
          {['Features', 'Pricing', 'Dashboard', 'Privacy', 'Terms'].map(l => (
            <a key={l} href="#" className="hover:text-slate-300 transition-colors">{l}</a>
          ))}
        </div>
        <p className="text-xs text-slate-600">© 2025 DxPilot</p>
      </div>
    </footer>
  )
}
