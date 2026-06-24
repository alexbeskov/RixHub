'use client'

import { useLanguage } from '@/app/language-context'
import { Globe } from 'lucide-react'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
      className="flex items-center gap-1 rounded-md border border-border px-1.5 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-foreground/60 hover:text-foreground hover:border-accent transition-colors"
      aria-label="Switch language"
    >
      <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      <span className="uppercase">{lang}</span>
    </button>
  )
}
