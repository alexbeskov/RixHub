'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { LanguageProvider } from '@/app/language-context'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dota2" themes={['dota2', 'brezee', 'VK', 'binance', 'DS']} enableSystem={false}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
