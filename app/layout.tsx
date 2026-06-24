import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Press_Start_2P, VT323 } from 'next/font/google'
import '../styles/globals.css'
import Providers from './providers'
import { CursorProvider } from './cursor-context'
import { SidebarProvider } from './sidebar-context'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import CursorDotRing from '@/components/CursorDotRing'
import LayoutWrapper from '@/components/LayoutWrapper'
import AnimatedBackground from '@/components/AnimatedBackground'

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin', 'cyrillic'],
  variable: '--font-pixel',
  display: 'swap',
})

const vt323 = VT323({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-pixel-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RixHub — Всё для вайбкодера в одном месте',
  description: 'AI Tools, Docs, Services, Prompts, Free Steel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${pressStart.variable} ${vt323.variable} font-sans antialiased`}>
        <Providers>
          <CursorProvider>
            <SidebarProvider>
              <AnimatedBackground />
              <CursorDotRing />
              <div className="relative z-10">
                <Sidebar />
                <LayoutWrapper>
                  <Header />
                  <main className="flex-1">
                    {children}
                  </main>
                </LayoutWrapper>
              </div>
            </SidebarProvider>
          </CursorProvider>
        </Providers>
      </body>
    </html>
  )
}
