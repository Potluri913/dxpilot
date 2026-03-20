import React from 'react'

const variants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40',
  outline: 'border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400',
  ghost:   'text-slate-400 hover:text-white hover:bg-white/5',
  danger:  'bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/25',
  success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25',
}
const sizes = {
  sm: 'px-3.5 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({ children, variant = 'primary', size = 'md', className = '', loading, disabled, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer border-0 outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-px active:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full spin" />}
      {children}
    </button>
  )
}
