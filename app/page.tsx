'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import NeonLogo from '@/components/NeonLogo'
import FadeInView from '@/components/FadeInView'

const stats = [
  { label: 'AI инструментов', value: 100, icon: '🤖' },
  { label: 'промптов', value: 500, icon: '✨' },
  { label: 'гайдов', value: 50, icon: '📚' },
]

const sections = [
  { emoji: '🤖', title: 'Тир-лист AI', description: 'Рейтинг лучших AI-инструментов для разработки', href: '/ai-tools' },
  { emoji: '✨', title: 'Промпты', description: 'Готовые промпты для разных задач', href: '/prompts' },
  { emoji: '📚', title: 'Гайды', description: 'Подробные руководства и статьи', href: '/docs' },
  { emoji: '🛠️', title: 'Сервисы', description: 'Сервисы для разработки и дизайна', href: '/services' },
  { emoji: '🆓', title: 'Бесплатные ресурсы', description: 'Готовые стаки для разных проектов', href: '/free-steel' },
]

const TYPEWRITER_TEXT = 'AI-инструменты, промпты и гайды для вайбкодеров'

function AnimatedCounter({ value, label, icon }: { value: number; label: string; icon: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(eased * value))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <span ref={ref} className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-foreground/70">
      <span>{icon}</span>
      <span className="font-semibold text-foreground">{displayValue}+</span> {label}
    </span>
  )
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [text])

  return (
    <span className="text-lg text-foreground/70 max-w-xl">
      {displayed}
      {showCursor && <span className="typewriter-cursor" />}
    </span>
  )
}

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
      <FadeInView>
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(168,85,247,0.2)] bg-[rgba(168,85,247,0.05)] px-3 py-1 text-xs font-medium text-[#a855f7]">
              <Zap className="w-3 h-3" />
              Всё, что нужно для вайбкодинга
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <NeonLogo text="RixHub" size="lg" />
          </h1>
          <div className="mb-4">
            <TypewriterText text={TYPEWRITER_TEXT} />
          </div>
          <p className="text-sm text-foreground/50 max-w-xl mb-6">
            Подборки лучших AI-инструментов, готовые промпты, гайды и ресурсы. Собрано с любовью для соло-билдеров и энтузиастов.
          </p>

          <div className="flex flex-wrap gap-3">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} icon={stat.icon} />
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-foreground/70">
              <span>🔄</span>
              Постоянные обновления
            </span>
          </div>
        </section>
      </FadeInView>

      <FadeInView delay={0.1}>
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Популярные разделы</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section, index) => (
              <FadeInView key={section.href} delay={index * 0.05}>
                <Link
                  href={section.href}
                  className="group block p-5 rounded-lg border border-[rgba(168,85,247,0.15)] bg-[rgba(255,255,255,0.02)] backdrop-blur-sm transition-all duration-300 hover:border-[rgba(168,85,247,0.5)] hover:bg-[rgba(168,85,247,0.05)] hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-0.5"
                >
                  <div className="text-2xl mb-3">{section.emoji}</div>
                  <h3 className="text-base font-semibold mb-1">{section.title}</h3>
                  <p className="text-sm text-foreground/60 mb-3">{section.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-foreground/40 group-hover:text-foreground transition-colors">
                    Смотреть <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </FadeInView>
            ))}
          </div>
        </section>
      </FadeInView>
    </div>
  )
}
