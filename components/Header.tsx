'use client'

import SearchBox from './SearchBox'
import ThemeSelector from './ThemeSelector'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/app/language-context'

export default function Header() {
  const { lang } = useLanguage()

  return (
    <header className="sticky top-0 z-50 flex items-center gap-3 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3">
      {/* Spacer for mobile hamburger */}
      <div className="lg:hidden w-9 shrink-0" />

      <div className="flex-1 flex items-center gap-3 min-w-0">
        <SearchBox />
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
