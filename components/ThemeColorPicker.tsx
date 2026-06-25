'use client'

import { useState, useEffect, useRef } from 'react'
import { Palette, Check } from 'lucide-react'

const themes = [
  { id: 'purple', color: '#a855f7', label: 'Purple' },
  { id: 'red', color: '#ef4444', label: 'Red' },
  { id: 'teal', color: '#14b8a6', label: 'Teal' },
  { id: 'yellow', color: '#eab308', label: 'Yellow' },
  { id: 'blue', color: '#3b82f6', label: 'Blue' },
]

const ACCENT_KEY = 'rixhub-accent'

export function applyAccent(id: string) {
  const theme = themes.find((t) => t.id === id)
  if (!theme) return
  const root = document.documentElement
  root.style.setProperty('--accent', theme.color)
  root.style.setProperty('--accent-bg', `rgba(${hexToRgb(theme.color)}, 0.1)`)
  root.style.setProperty('--accent-rgb', hexToRgb(theme.color))
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `${r}, ${g}, ${b}`
}

export default function ThemeColorPicker() {
  const [active, setActive] = useState('purple')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem(ACCENT_KEY)
    if (saved && themes.find((t) => t.id === saved)) {
      setActive(saved)
      applyAccent(saved)
    } else {
      applyAccent('purple')
    }
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSelect = (id: string) => {
    setActive(id)
    applyAccent(id)
    localStorage.setItem(ACCENT_KEY, id)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 flex items-center justify-center rounded-md border border-border hover:border-accent transition-colors duration-150"
        aria-label="Select accent color"
      >
        <Palette className="w-4 h-4" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 w-40 rounded-xl border border-border/60 bg-card p-2 shadow-xl">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                  active === t.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-foreground/70 hover:bg-muted/50'
                }`}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-border/50 shrink-0"
                  style={{ backgroundColor: t.color }}
                />
                <span className="flex-1 text-left font-medium">{t.label}</span>
                {active === t.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
