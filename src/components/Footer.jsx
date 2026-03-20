import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Twitter, Linkedin, Github, Mail } from 'lucide-react'

const COLS = [
  { title: 'Product',  links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
  { title: 'Company',  links: ['About', 'Blog', 'Careers', 'Press'] },
  { title: 'Legal',    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'] },
]

export default function Footer() {
  return (
    <footer className="bg-[#0B0F1A] border-t border-white/[0.07] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Activity size={15} className="text-white" />
              </div>
              <span className="text-white">Dx<span className="text-blue-400">Pilot</span></span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              AI-powered digital process diagnosis for modern businesses.
            </p>
            <div className="flex gap-2">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
          {COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.07] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">© 2025 DxPilot, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Mail size={13} />
            <span>hello@dxpilot.ai</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
