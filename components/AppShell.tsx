'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import CursorDotRing from '@/components/CursorDotRing'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLanding = pathname === '/'

  if (isLanding) {
    return (
      <>
        <Navbar />
        <div className="pt-14">{children}</div>
      </>
    )
  }

  return (
    <>
      <CursorDotRing />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  )
}
