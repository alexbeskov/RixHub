'use client'

import { Search } from 'lucide-react'
import ThemeSelector from './ThemeSelector'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/app/language-context'

export default function Header() {
  const { lang } = useLanguage()

  const placeholder = lang === 'ru' ? 'Поиск по сайту...' : 'Search...'

  return (
    <header className="sticky top-0 z-50 flex items-center gap-3 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3">
      {/* Spacer for mobile hamburger */}
      <div className="lg:hidden w-9 shrink-0" />

      <div className="flex-1 flex items-center gap-3 min-w-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/40" />
          <input
            type="text"
            placeholder={placeholder}
            className="w-full h-8 sm:h-9 pl-8 sm:pl-9 pr-3 sm:pr-4 rounded-md border border-border bg-transparent text-xs sm:text-sm placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <LanguageToggle />
        <div className="hidden sm:block">
          <ThemeSelector />
        </div>
      </div>
    </header>
  )
}
