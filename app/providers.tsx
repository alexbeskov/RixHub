'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { LanguageProvider } from '@/app/language-context'

const allThemes = [
  'dark', 'dark-purple', 'dark-red', 'dark-teal', 'dark-yellow', 'dark-blue',
  'light', 'light-purple', 'light-red', 'light-teal', 'light-yellow', 'light-blue',
  'dota2', 'brezee', 'VK', 'binance', 'DS',
]

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" themes={allThemes} enableSystem={false}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
