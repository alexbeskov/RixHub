import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check } from 'lucide-react'

const themes = [
  { id: 'red', label: 'Красная', color: '#ff4444' },
  { id: 'teal', label: 'Бирюзовая', color: '#00d4aa' },
  { id: 'light', label: 'Светлая', color: '#e5e5e5' },
  { id: 'blue', label: 'Синяя', color: '#4488ff' },
]

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-9 h-9 flex items-center justify-center rounded-md border border-border">
        <Palette className="w-4 h-4" />
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 flex items-center justify-center rounded-md border border-border hover:border-accent transition-colors duration-150"
        aria-label="Выбрать тему"
      >
        <Palette className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-11 z-50 w-44 rounded-lg border border-border bg-card p-2 shadow-lg"
            >
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id)
                    setOpen(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                >
                  <span
                    className="h-4 w-4 rounded-full border border-border"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="flex-1 text-left">{t.label}</span>
                  {theme === t.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
