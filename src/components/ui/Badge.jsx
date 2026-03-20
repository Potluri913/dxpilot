import React from 'react'

const colorMap = {
  blue:    'bg-blue-500/15 text-blue-400 border-blue-500/20',
  green:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  yellow:  'bg-amber-500/15 text-amber-400 border-amber-500/20',
  red:     'bg-red-500/15 text-red-400 border-red-500/20',
  purple:  'bg-purple-500/15 text-purple-400 border-purple-500/20',
  cyan:    'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
  gray:    'bg-white/5 text-slate-400 border-white/10',
}

export default function Badge({ children, color = 'blue' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorMap[color] || colorMap.blue}`}>
      {children}
    </span>
  )
}
