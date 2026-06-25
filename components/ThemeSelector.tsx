import { useTheme } from 'next-themes'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check, MousePointer2, Sun, Moon } from 'lucide-react'
import { useCursor } from '@/app/cursor-context'

const accentColors = [
  { id: 'purple', label: 'Purple', color: '#a855f7' },
  { id: 'red', label: 'Red', color: '#ef4444' },
  { id: 'teal', label: 'Teal', color: '#14b8a6' },
  { id: 'yellow', label: 'Yellow', color: '#eab308' },
  { id: 'blue', label: 'Blue', color: '#3b82f6' },
]

const legacyThemes = [
  { id: 'dota2', label: 'Dota 2', color: '#ff4444' },
  { id: 'brezee', label: 'Breeze', color: '#00d4aa' },
  { id: 'VK', label: 'VK', color: '#4488ff' },
  { id: 'binance', label: 'Binance', color: '#fcd535' },
  { id: 'DS', label: 'Dark Soul', color: '#a855f7' },
]

function getAccentFromTheme(theme: string | undefined): string {
  if (!theme) return 'purple'
  if (theme.startsWith('light-')) return theme.replace('light-', '')
  if (theme.startsWith('dark-')) return theme.replace('dark-', '')
  if (theme === 'light') return 'purple'
  if (theme === 'dark') return 'purple'
  const legacyMap: Record<string, string> = {
    dota2: 'red',
    brezee: 'teal',
    VK: 'blue',
    binance: 'yellow',
    DS: 'purple',
  }
  return legacyMap[theme] || 'purple'
}

function isLightTheme(theme: string | undefined): boolean {
  if (!theme) return false
  return theme.startsWith('light') || theme === 'light'
}

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const { enabled: cursorEnabled, toggle: toggleCursor } = useCursor()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentAccent = getAccentFromTheme(theme)
  const isLight = isLightTheme(theme)

  const toggleLightDark = useCallback(() => {
    const accent = getAccentFromTheme(theme)
    setTheme(isLight ? `dark-${accent}` : `light-${accent}`)
  }, [theme, isLight, setTheme])

  const selectAccent = useCallback(
    (accent: string) => {
      setTheme(isLight ? `light-${accent}` : `dark-${accent}`)
    },
    [isLight, setTheme]
  )

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
              className="absolute right-0 top-11 z-50 w-52 rounded-lg border border-border bg-card p-2.5 shadow-lg"
            >
              {/* Light / Dark toggle */}
              <div className="flex gap-1 mb-3">
                <button
                  onClick={() => !isLight && toggleLightDark()}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-colors ${
                    !isLight
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'text-foreground/60 hover:text-foreground hover:bg-muted border border-transparent'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  Dark
                </button>
                <button
                  onClick={() => isLight && toggleLightDark()}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-colors ${
                    isLight
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'text-foreground/60 hover:text-foreground hover:bg-muted border border-transparent'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  Light
                </button>
              </div>

              <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1.5 px-0.5">Accent</p>
              <div className="flex gap-1.5 mb-3">
                {accentColors.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => selectAccent(a.id)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      currentAccent === a.id ? 'border-foreground scale-110' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: a.color }}
                    title={a.label}
                    aria-label={a.label}
                  />
                ))}
              </div>

              <div className="my-1.5 border-t border-border" />
              <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1.5 px-0.5">Legacy</p>
              {legacyThemes.map((t) => (
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

              <div className="my-1.5 border-t border-border" />
              <button
                onClick={() => toggleCursor()}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
              >
                <MousePointer2 className="w-4 h-4" />
                <span className="flex-1 text-left">Кастомный курсор</span>
                {cursorEnabled && <Check className="w-3.5 h-3.5" />}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
