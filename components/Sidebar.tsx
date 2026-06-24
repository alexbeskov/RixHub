'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import RixHubLogo from './RixHubLogo'
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
  Send,
  Github,
  Loader2,
  PanelLeft,
  PanelRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useLanguage } from '@/app/language-context'
import { useSidebar } from '@/app/sidebar-context'

const navItems = [
  { label: 'Главная', labelEn: 'Home', href: '/', icon: Home },
  { label: 'Тир-лист AI', labelEn: 'AI Tier List', href: '/ai-tools', icon: Bot },
  { label: 'Промпты', labelEn: 'Prompts', href: '/prompts', icon: Sparkles },
  { label: 'Гайды', labelEn: 'Guides', href: '/docs', icon: BookOpen },
  { label: 'Сервисы', labelEn: 'Services', href: '/services', icon: Wrench },
  { label: 'Бесплатные ресурсы', labelEn: 'Free Resources', href: '/free-steel', icon: Gift },
  { label: 'О проекте', labelEn: 'About', href: '/about', icon: Info },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang } = useLanguage()
  const { collapsed, toggle } = useSidebar()
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const t = {
    ru: {
      subscribeTitle: 'Обновления',
      emailPlaceholder: 'email...',
      subscribeSuccess: '✓',
      subscribeError: '✗',
    },
    en: {
      subscribeTitle: 'Updates',
      emailPlaceholder: 'email...',
      subscribeSuccess: '✓',
      subscribeError: '✗',
    },
  }

  const currentT = t[lang]

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) return
    setSubscribing(true)
    setSubscribeStatus('idle')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubscribeStatus('success')
        setEmail('')
      } else {
        setSubscribeStatus('error')
      }
    } catch {
      setSubscribeStatus('error')
    } finally {
      setSubscribing(false)
    }
  }

  const sidebarWidth = collapsed ? 'w-16' : 'w-56'

  const sidebarContent = (
    <>
      {/* Logo area */}
      <div className={`px-4 pt-6 pb-4 ${collapsed ? 'flex justify-center' : ''}`}>
        <Link href="/" className={`flex items-center gap-2.5 group ${collapsed ? 'justify-center' : ''}`}>
          <RixHubLogo size={collapsed ? 22 : 26} className="shrink-0 group-hover:drop-shadow-[0_0_6px_rgba(34,231,196,0.6)] transition-all duration-300" />
          {!collapsed && <span className="text-xl font-bold tracking-tight font-pixel">RixHub</span>}
        </Link>
      </div>

      {/* Collapse button */}
      <div className={`px-3 mb-2 ${collapsed ? 'flex justify-center' : ''}`}>
        <button
          onClick={toggle}
          className="flex items-center gap-2 text-[10px] text-foreground/30 hover:text-foreground/60 transition-colors uppercase tracking-wider font-pixel-mono"
          title={collapsed ? 'Развернуть' : 'Свернуть'}
        >
          {collapsed ? (
            <PanelRight className="w-4 h-4" />
          ) : (
            <>
              <PanelLeft className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Свернуть</span>
            </>
          )}
        </button>
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
              className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
                collapsed ? 'justify-center' : 'gap-2.5'
              } ${
                isActive
                  ? 'bg-accent/10 text-foreground font-medium'
                  : 'text-foreground/60 hover:text-foreground hover:bg-muted/50'
              }`}
              title={collapsed ? (lang === 'ru' ? item.label : item.labelEn) : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{lang === 'ru' ? item.label : item.labelEn}</span>}
              {isActive && !collapsed && (
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

      {/* Subscribe + Socials — hidden when collapsed */}
      {!collapsed && (
        <div className="px-3 py-3 mt-auto border-t border-border">
          <div className="flex items-center gap-1.5 mb-2">
            <p className="text-[10px] text-foreground/40 font-pixel-mono uppercase tracking-wider">{currentT.subscribeTitle}</p>
            {subscribeStatus === 'success' && (
              <span className="text-[10px] text-green-500">{currentT.subscribeSuccess}</span>
            )}
            {subscribeStatus === 'error' && (
              <span className="text-[10px] text-red-500">{currentT.subscribeError}</span>
            )}
          </div>
          <div className="flex gap-1.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              placeholder={currentT.emailPlaceholder}
              className="flex-1 h-7 rounded border border-border bg-transparent text-[11px] px-1.5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent transition-colors"
            />
            <button
              onClick={handleSubscribe}
              disabled={subscribing}
              className="h-7 w-7 rounded bg-accent text-background flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
              aria-label="Subscribe"
            >
              {subscribing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
            </button>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <a
              href="https://github.com/alexbeskov/RixHub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://t.me/rixbild"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-foreground transition-colors"
              aria-label="Telegram"
            >
              <Icon icon="simple-icons:telegram" className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-3 left-3 z-[100] lg:hidden w-9 h-9 flex items-center justify-center rounded-md border border-border bg-card/90 backdrop-blur-sm"
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
      <aside
        className={`hidden lg:flex ${sidebarWidth} h-screen flex-col border-r border-border fixed left-0 top-0 z-[80] bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out`}
      >
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
