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
  ChevronRight,
  Mail,
  Github,
  Twitter,
} from 'lucide-react'

const navItems = [
  { label: 'Главная', href: '/', icon: Home },
  { label: 'Тир-лист AI', href: '/ai-tools', icon: Bot },
  { label: 'Промпты', href: '/prompts', icon: Sparkles },
  { label: 'Гайды', href: '/docs', icon: BookOpen },
  { label: 'Сервисы', href: '/services', icon: Wrench },
  { label: 'Бесплатные ресурсы', href: '/free-steel', icon: Gift },
  { label: 'О проекте', href: '/about', icon: Info },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <>
      <div className="px-4 pt-6 pb-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">RixHub</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
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
              <span className="truncate">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="ml-auto w-1 h-1 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-4 mt-auto border-t border-border">
        <p className="text-xs text-foreground/40 mb-3">Подпишись на обновления</p>
        <div className="flex gap-2">
          <div className="flex-1 h-8 rounded-md border border-border bg-transparent text-sm px-2 flex items-center text-foreground/30">
            email
          </div>
          <button className="h-8 px-3 rounded-md bg-accent text-background text-xs font-medium hover:opacity-90 transition-opacity">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <a href="#" className="text-foreground/40 hover:text-foreground transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="#" className="text-foreground/40 hover:text-foreground transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="text-foreground/40 hover:text-foreground transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-[100] lg:hidden w-9 h-9 flex items-center justify-center rounded-md border border-border bg-card"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 h-screen flex-col border-r border-border fixed left-0 top-0 z-[80] bg-background">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -224 }}
            animate={{ x: 0 }}
            exit={{ x: -224 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-[95] w-56 h-screen flex-col border-r border-border bg-background flex lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
