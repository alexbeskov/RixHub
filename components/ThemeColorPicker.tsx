'use client'

import { useState, useEffect } from 'react'

const themes = [
  { id: 'purple', color: '#a855f7' },
  { id: 'red', color: '#ef4444' },
  { id: 'teal', color: '#14b8a6' },
  { id: 'yellow', color: '#eab308' },
  { id: 'blue', color: '#3b82f6' },
]

export default function ThemeColorPicker() {
  const [active, setActive] = useState('purple')

  useEffect(() => {
    const saved = localStorage.getItem('rixhub-theme-color')
    if (saved && themes.find((t) => t.id === saved)) {
      setActive(saved)
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])

  const handleSelect = (id: string) => {
    setActive(id)
    document.documentElement.setAttribute('data-theme', id)
    localStorage.setItem('rixhub-theme-color', id)
  }

  return (
    <div className="flex items-center gap-1.5">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => handleSelect(t.id)}
          className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${
            active === t.id
              ? 'ring-2 ring-white ring-offset-1 ring-offset-black'
              : ''
          }`}
          style={{ backgroundColor: t.color }}
          aria-label={`Select ${t.id} theme`}
          title={t.id}
        />
      ))}
    </div>
  )
}
