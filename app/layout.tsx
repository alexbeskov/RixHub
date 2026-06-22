import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import '../styles/globals.css'
import Providers from './providers'
import { CursorProvider } from './cursor-context'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import CursorGlow from '@/components/CursorGlow'

import AnimatedBackground from '@/components/AnimatedBackground'

export const metadata: Metadata = {
  title: 'RixHub — Всё для вайбкодера в одном месте',
  description: 'AI Tools, Docs, Services, Prompts, Free Steel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${GeistSans.variable} font-sans antialiased`}>
        <Providers>
          <CursorProvider>
            <AnimatedBackground />
            <CursorGlow />
            <div className="relative z-10">
              <Sidebar />
              <div className="lg:ml-56 min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </div>
          </CursorProvider>
        </Providers>
      </body>
    </html>
  )
}
