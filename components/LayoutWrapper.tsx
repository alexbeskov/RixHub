'use client'

import { useSidebar } from '@/app/sidebar-context'
import { ReactNode } from 'react'

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar()

  return (
    <div className={`min-h-screen flex flex-col transition-[margin] duration-300 ease-in-out ${collapsed ? 'lg:ml-16' : 'lg:ml-56'}`}>
      {children}
    </div>
  )
}
