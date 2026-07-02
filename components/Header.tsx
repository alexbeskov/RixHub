'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Bot,
  BookOpen,
  Wrench,
  Sparkles,
  Gift,
  Info,
  Menu,
  X,
} from 'lucide-react'
import SearchBox from './SearchBox'
import LanguageToggle from './LanguageToggle'
import RixHubLogo from './RixHubLogo'
import { useLanguage } from '@/app/language-context'

const navItems = [
  { label: 'Главная', labelEn: 'Home', href: '/', icon: Home },
  { label: 'Тир-лист AI', labelEn: 'AI Tier List', href: '/ai-tools', icon: Bot },
  { label: 'Промпты', labelEn: 'Prompts', href: '/prompts', icon: Sparkles },
  { label: 'Гайды', labelEn: 'Guides', href: '/docs', icon: BookOpen },
  { label: 'Сервисы', labelEn: 'Services', href: '/services', icon: Wrench },
  { label: 'Бесплатные ресурсы', labelEn: 'Free Resources', href: '/free-steel', icon: Gift },
  { label: 'О проекте', labelEn: 'About', href: '/about', icon: Info },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang } = useLanguage()

  const menuLabel = lang === 'ru' ? 'Открыть меню' : 'Open menu'
  const closeMenuLabel = lang === 'ru' ? 'Закрыть меню' : 'Close menu'

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-rix flex items-center h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0 mr-4">
          <RixHubLogo size={24} className="shrink-0 group-hover:drop-shadow-[0_0_6px_rgba(34,231,196,0.6)] transition-all duration-300" />
          <span className="text-lg font-bold tracking-tight">RixHub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            const label = lang === 'ru' ? item.label : item.labelEn
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
                  isActive
                    ? 'bg-accent/10 text-foreground font-medium'
                    : 'text-foreground/60 hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="topbar-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <div className="hidden sm:flex items-center flex-1 justify-end max-w-[200px] md:max-w-[260px] lg:max-w-xs">
            <SearchBox />
          </div>
          <LanguageToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md border border-border"
            aria-label={mobileOpen ? closeMenuLabel : menuLabel}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                const label = lang === 'ru' ? item.label : item.labelEn
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
                      isActive
                        ? 'bg-accent/10 text-foreground font-medium'
                        : 'text-foreground/60 hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{label}</span>
                  </Link>
                )
              })}
              <div className="mt-2 sm:hidden">
                <SearchBox />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
