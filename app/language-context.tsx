'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Lang = 'ru' | 'en'

const LANG_KEY = 'rixhub-lang'
const DEFAULT_LANG: Lang = 'ru'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: DEFAULT_LANG,
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem(LANG_KEY) as Lang | null) : null
    if (saved && ['ru', 'en'].includes(saved)) {
      setLangState(saved)
    }
    setHydrated(true)
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANG_KEY, newLang)
    }
  }

  if (!hydrated) {
    return (
      <LanguageContext.Provider value={{ lang: DEFAULT_LANG, setLang: () => {} }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
