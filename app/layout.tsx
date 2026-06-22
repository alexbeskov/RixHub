import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import '../styles/globals.css'
import Providers from './providers'
import Navbar from '@/components/Navbar'
import CursorGlow from '@/components/CursorGlow'

export const metadata: Metadata = {
  title: 'RixyHub — Всё для вайбкодера в одном месте',
  description: 'AI Tools, Docs, Services, Prompts, Free Steel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${GeistSans.variable} font-sans antialiased`}>
        <Providers>
          <CursorGlow />
          <Navbar />
          <main className="pt-14">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
