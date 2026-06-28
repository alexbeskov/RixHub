'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageToggle from './LanguageToggle'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/app/language-context'

const navItems = [
  { label: 'AI Tools', labelRu: 'AI Инструменты', href: '/ai-tools' },
  { label: 'Docs', labelRu: 'Документы', href: '/docs' },
  { label: 'Services', labelRu: 'Сервисы', href: '/services' },
  { label: 'Prompts', labelRu: 'Промпты', href: '/prompts' },
  { label: 'Free Steel', labelRu: 'Бесплатно', href: '/free-steel' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang } = useLanguage()

  const menuLabel = lang === 'ru' ? 'Открыть меню' : 'Open menu'
  const closeMenuLabel = lang === 'ru' ? 'Закрыть меню' : 'Close menu'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(5,5,8,0.7)] backdrop-blur-xl border-b theme-border-subtle">
      <div className="container-rix flex items-center justify-between h-14">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          RixHub
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const label = lang === 'ru' ? (item.labelRu || item.label) : item.label
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link relative px-1 py-1.5 ${
                  isActive ? 'text-foreground font-medium' : ''
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px theme-accent-underline" />
                )}
              </Link>
            )
          })}
          <div className="flex items-center gap-2">
            <LanguageToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-md border border-border"
            aria-label={mobileOpen ? closeMenuLabel : menuLabel}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b theme-border-subtle bg-[rgba(5,5,8,0.95)] backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const label = lang === 'ru' ? (item.labelRu || item.label) : item.label
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                      isActive ? 'theme-nav-active text-white font-medium' : 'text-foreground/60 hover:text-white theme-nav-hover'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
