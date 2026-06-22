'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import NeonLogo from './NeonLogo'
import ThemeToggle from './ThemeToggle'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'AI Tools', href: '/ai-tools' },
  { label: 'Docs', href: '/docs' },
  { label: 'Services', href: '/services' },
  { label: 'Prompts', href: '/prompts' },
  { label: 'Free Steel', href: '/free-steel' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(5,5,8,0.7)] backdrop-blur-xl border-b border-[rgba(168,85,247,0.1)]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          <NeonLogo text="RixHub" size="md" />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                  isActive ? 'text-white font-medium' : 'text-foreground/60 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px bg-[#a855f7]"
                    style={{ boxShadow: '0 0 6px rgba(168,85,247,0.6)' }}
                  />
                )}
              </Link>
            )
          })}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-md border border-border"
            aria-label="Toggle menu"
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
            className="md:hidden border-b border-[rgba(168,85,247,0.1)] bg-[rgba(5,5,8,0.95)] backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                      isActive ? 'bg-[rgba(168,85,247,0.1)] text-white font-medium' : 'text-foreground/60 hover:text-white hover:bg-[rgba(168,85,247,0.05)]'
                    }`}
                  >
                    {item.label}
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
