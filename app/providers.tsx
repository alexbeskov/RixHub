'use client'

import { useEffect, ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/app/language-context'
import { applyAccent } from '@/components/ThemeColorPicker'

const allThemes = [
  'dark', 'dark-purple', 'dark-red', 'dark-teal', 'dark-yellow', 'dark-blue',
  'light', 'light-purple', 'light-red', 'light-teal', 'light-yellow', 'light-blue',
  'dota2', 'brezee', 'VK', 'binance', 'DS',
]

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem('rixhub-accent')
    if (saved) {
      applyAccent(saved)
    }
  }, [])

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" themes={allThemes} enableSystem={false}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
