'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage, Lang } from '@/app/language-context'
import { Globe, Check } from 'lucide-react'

const languages: { id: Lang; label: string; native: string; flag: string }[] = [
  { id: 'ru', label: 'Русский', native: 'Русский', flag: '🇷🇺' },
  { id: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { id: 'zh', label: '中文', native: '中文', flag: '🇨🇳' },
  { id: 'ja', label: '日本語', native: '日本語', flag: '🇯🇵' },
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
        className="flex items-center gap-1.5 rounded-md border border-border px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-foreground/60 hover:text-foreground hover:border-accent transition-colors"
        aria-label="Switch language"
      >
        <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span className="uppercase">{current.id}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 w-44 rounded-lg border border-border bg-card p-1.5 shadow-lg">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setLang(l.id)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors ${
                  lang === l.id ? 'text-accent' : 'text-foreground/70'
                }`}
              >
                <span className="text-base">{l.flag}</span>
                <span className="flex-1 text-left">{l.native}</span>
                {lang === l.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
