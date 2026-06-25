import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check, MousePointer2 } from 'lucide-react'
import { useCursor } from '@/app/cursor-context'

const themeGroups = [
  {
    label: 'Dark',
    themes: [
      { id: 'dark', label: 'Default', color: '#a855f7' },
      { id: 'dark-red', label: 'Red', color: '#ef4444' },
      { id: 'dark-teal', label: 'Teal', color: '#14b8a6' },
      { id: 'dark-blue', label: 'Blue', color: '#3b82f6' },
      { id: 'dark-yellow', label: 'Yellow', color: '#eab308' },
    ],
  },
  {
    label: 'Light',
    themes: [
      { id: 'light', label: 'Default', color: '#a855f7' },
      { id: 'light-red', label: 'Red', color: '#ef4444' },
      { id: 'light-teal', label: 'Teal', color: '#14b8a6' },
      { id: 'light-blue', label: 'Blue', color: '#3b82f6' },
      { id: 'light-yellow', label: 'Yellow', color: '#eab308' },
    ],
  },
  {
    label: 'Classic',
    themes: [
      { id: 'dota2', label: 'Dota 2', color: '#ff4444' },
      { id: 'brezee', label: 'Breeze', color: '#00d4aa' },
      { id: 'VK', label: 'VK', color: '#4488ff' },
      { id: 'binance', label: 'Binance', color: '#fcd535' },
      { id: 'DS', label: 'Dark Soul', color: '#a855f7' },
    ],
  },
]

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const { enabled: cursorEnabled, toggle: toggleCursor } = useCursor()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/60">
        <Palette className="w-3.5 h-3.5 text-foreground/50" />
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/60 hover:border-accent/40 transition-all"
        aria-label="Select theme"
      >
        <Palette className="w-3.5 h-3.5 text-foreground/50" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.12 }}
              className="absolute right-0 top-10 z-50 w-48 rounded-xl border border-border/60 bg-card p-2 shadow-xl"
            >
              {themeGroups.map((group, gi) => (
                <div key={group.label}>
                  {gi > 0 && <div className="my-2 border-t border-border/40" />}
                  <p className="text-[10px] uppercase tracking-wider text-foreground/30 mb-1.5 px-1">
                    {group.label}
                  </p>
                  {group.themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id)
                        setOpen(false)
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                        theme === t.id
                          ? 'bg-accent/10 text-accent'
                          : 'text-foreground/70 hover:bg-muted/50'
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-border/50 shrink-0"
                        style={{ backgroundColor: t.color }}
                      />
                      <span className="flex-1 text-left font-medium">{t.label}</span>
                      {theme === t.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              ))}

              <div className="my-2 border-t border-border/40" />
              <button
                onClick={() => toggleCursor()}
                className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-foreground/70 hover:bg-muted/50 transition-colors"
              >
                <MousePointer2 className="w-3.5 h-3.5" />
                <span className="flex-1 text-left font-medium">Custom cursor</span>
                {cursorEnabled && <Check className="w-3.5 h-3.5 text-accent" />}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
