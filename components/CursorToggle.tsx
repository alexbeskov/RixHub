'use client'

import { useCursor } from '@/app/cursor-context'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '@/app/language-context'

export default function CursorToggle() {
  const { enabled, toggle } = useCursor()
  const { lang } = useLanguage()

  const label = enabled
    ? lang === 'ru' ? 'Выключить курсор' : 'Disable cursor'
    : lang === 'ru' ? 'Включить курсор' : 'Enable cursor'

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 flex items-center justify-center rounded-md border border-border hover:border-accent transition-colors duration-150"
      aria-label={label}
      title={label}
    >
      <motion.div
        key={enabled ? 'on' : 'off'}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {enabled ? (
          <Sparkles className="w-4 h-4" />
        ) : (
          <Sparkles className="w-4 h-4 text-foreground/30" />
        )}
      </motion.div>
    </button>
  )
}
