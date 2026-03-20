import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-white font-bold text-sm">DxPilot</span>
        <div className="flex gap-8">
          {['Features', 'Pricing', 'Dashboard', 'Privacy'].map(l => (
            <a key={l} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">{l}</a>
          ))}
        </div>
        <p className="text-xs text-slate-700">© 2025 DxPilot</p>
      </div>
    </footer>
  )
}
