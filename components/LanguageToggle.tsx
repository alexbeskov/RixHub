'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage, Lang } from '@/app/language-context'
import { Globe, Check } from 'lucide-react'

const languages: { id: Lang; native: string; flag: string }[] = [
  { id: 'ru', native: 'Русский', flag: '🇷🇺' },
  { id: 'en', native: 'English', flag: '🇬🇧' },
]

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = languages.find((l) => l.id === lang) || languages[0]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-border/60 px-2 py-1.5 text-[11px] font-medium text-foreground/70 hover:text-foreground hover:border-accent/40 transition-all"
        aria-label="Switch language"
      >
        <Globe className="w-3.5 h-3.5 text-foreground/50" />
        <span className="uppercase tracking-wide">{current.id}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-9 z-50 w-40 rounded-xl border border-border/60 bg-card p-1.5 shadow-xl">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setLang(l.id)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                  lang === l.id ? 'bg-accent/10 text-accent' : 'text-foreground/70 hover:bg-muted/50'
                }`}
              >
                <span className="text-base leading-none">{l.flag}</span>
                <span className="flex-1 text-left font-medium">{l.native}</span>
                {lang === l.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
