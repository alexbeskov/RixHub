'use client'

import { usePathname } from 'next/navigation'
import { SidebarProvider } from '@/app/sidebar-context'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import CursorDotRing from '@/components/CursorDotRing'
import LayoutWrapper from '@/components/LayoutWrapper'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLanding = pathname === '/'

  if (isLanding) {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <SidebarProvider>
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
  )
}
