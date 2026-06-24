'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface CursorContextType {
  enabled: boolean
  toggle: () => void
}

const CursorContext = createContext<CursorContextType>({ enabled: true, toggle: () => {} })

export function CursorProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const toggle = useCallback(() => setEnabled(prev => !prev), [])
  return (
    <CursorContext.Provider value={{ enabled, toggle }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  return useContext(CursorContext)
}
