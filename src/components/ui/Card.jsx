import React from 'react'

export default function Card({ children, className = '', hover, onClick, glow }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-[#111827] border border-white/[0.07] rounded-2xl p-6
        transition-all duration-300
        ${hover ? 'hover:border-blue-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 cursor-pointer' : ''}
        ${glow ? 'glow-pulse' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
