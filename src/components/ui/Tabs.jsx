import React, { useState } from 'react'

export function Tabs({ tabs, defaultTab, children }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)
  return (
    <div>
      <div className="flex gap-1 bg-white/[0.04] rounded-xl p-1 mb-6 overflow-x-auto scrollbar-none">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center
              ${active === t.id
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
          >
            {t.icon && <span className="text-base">{t.icon}</span>}
            {t.label}
          </button>
        ))}
      </div>
      {React.Children.map(children, child =>
        child?.props?.tabId === active ? child : null
      )}
    </div>
  )
}

export function TabPanel({ children }) {
  return <div className="fade-up">{children}</div>
}
