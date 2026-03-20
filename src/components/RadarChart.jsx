import React from 'react'
import { SCORING_DIMENSIONS } from '../data/constants'

export default function RadarChart({ scores, size = 280 }) {
  const cx = size / 2, cy = size / 2
  const maxR = size * 0.38
  const n = SCORING_DIMENSIONS.length
  const step = (2 * Math.PI) / n

  const pt = (i, val) => {
    const a = -Math.PI / 2 + i * step
    const r = (val / 10) * maxR
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  }

  const dataPoints = SCORING_DIMENSIONS.map((d, i) => pt(i, scores[d.key] || 0))
  const path = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', maxWidth: size }}>
      {/* Grid rings */}
      {[2, 4, 6, 8, 10].map(level => {
        const pts = SCORING_DIMENSIONS.map((_, i) => pt(i, level))
        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'
        return <path key={level} d={d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      })}
      {/* Spokes */}
      {SCORING_DIMENSIONS.map((_, i) => {
        const end = pt(i, 10)
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      })}
      {/* Data area */}
      <path d={path} fill="rgba(59,130,246,0.15)" stroke="#3B82F6" strokeWidth="2" />
      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3B82F6" stroke="#0B0F1A" strokeWidth="2" />
      ))}
      {/* Labels */}
      {SCORING_DIMENSIONS.map((d, i) => {
        const lp = pt(i, 13.5)
        const words = d.label.split(' ')
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fill="#64748B" fontSize="7.5" fontFamily="Inter, sans-serif">
            {words.map((w, wi) => (
              <tspan key={wi} x={lp.x} dy={wi === 0 ? 0 : 9}>{w}</tspan>
            ))}
          </text>
        )
      })}
    </svg>
  )
}
