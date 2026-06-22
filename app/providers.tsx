'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="red" themes={['red', 'teal', 'light', 'blue']} enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}
