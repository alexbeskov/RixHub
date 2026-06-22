'use client'

import { Search } from 'lucide-react'
import ThemeSelector from './ThemeSelector'
import CursorToggle from './CursorToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center gap-4 border-b border-border bg-background/80 backdrop-blur-md px-6 py-3">
      <div className="flex-1 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input
            type="text"
            placeholder="Поиск по сайту..."
            className="w-full h-9 pl-9 pr-4 rounded-md border border-border bg-transparent text-sm placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 text-xs text-foreground/40 mr-2">
          <span className="text-foreground/60">Звёзд: 1.2k</span>
          <span>→</span>
        </div>
        <CursorToggle />
        <ThemeSelector />
      </div>
    </header>
  )
}
