'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Brain, BookOpen, RefreshCw } from 'lucide-react'
import FadeInView from '@/components/FadeInView'
import TypewriterText from '@/components/TypewriterText'
import CountUp from '@/components/CountUp'
import { useLanguage } from '@/app/language-context'

export default function LandingPage() {
  const { lang } = useLanguage()

  const t = {
    ru: {
      badge: 'Всё, что нужно для вайбкодинга',
      title: 'RixHub',
      subtitle: 'AI-инструменты, промпты и гайды для вайбкодеров',
      typewriter: 'Собрано с любовью для соло-билдеров и энтузиастов...',
      description: 'Подборки лучших AI-инструментов, готовые промпты, гайды и ресурсы.',
      stats: [
        { label: 'AI инструментов', value: 100 },
        { label: 'промптов', value: 500 },
        { label: 'гайдов', value: 50 },
      ],
      updates: 'Постоянные обновления',
      getStarted: 'Начать',
      footer: 'RixHub 2026',
    },
    en: {
      badge: 'Everything you need for vibe coding',
      title: 'RixHub',
      subtitle: 'AI tools, prompts and guides for vibe coders',
      typewriter: 'Built with love for solo builders and enthusiasts...',
      description: 'Curated AI tools, ready-made prompts, guides and resources.',
      stats: [
        { label: 'AI tools', value: 100 },
        { label: 'prompts', value: 500 },
        { label: 'guides', value: 50 },
      ],
      updates: 'Regular updates',
      getStarted: 'Get Started',
      footer: 'RixHub 2026',
    },
  }

  const current = t[lang]

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 text-center relative">
      <FadeInView>
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] sm:text-xs font-medium tracking-wide uppercase border border-accent/20 text-accent/80 bg-accent/5 mb-6 sm:mb-8">
          <Zap className="w-3 h-3" />
          {current.badge}
        </span>
      </FadeInView>

      <FadeInView delay={0.05}>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4 sm:mb-6 leading-[0.95]">
          {current.title}
        </h1>
      </FadeInView>

      <FadeInView delay={0.1}>
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/60 max-w-2xl mb-2 sm:mb-3 leading-relaxed">
          {current.subtitle}
        </p>
      </FadeInView>

      <FadeInView delay={0.15}>
        <div className="h-7 sm:h-8 mb-4 sm:mb-6">
          <TypewriterText
            text={current.typewriter}
            speed={45}
            delay={600}
            className="text-sm sm:text-base text-foreground/40"
            showCursor={true}
          />
        </div>
      </FadeInView>

      <FadeInView delay={0.2}>
        <p className="text-sm sm:text-base text-foreground/50 max-w-xl mb-8 sm:mb-10">
          {current.description}
        </p>
      </FadeInView>

      <FadeInView delay={0.25}>
        <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-foreground/50 mb-12 sm:mb-16">
          {current.stats.map((stat, i) => (
            <span key={stat.label} className="inline-flex items-center gap-1">
              <CountUp end={stat.value} suffix="+" className="font-semibold text-foreground/80" />
              <span>{stat.label}</span>
              {i < current.stats.length - 1 && (
                <span className="text-foreground/20 mx-1.5 sm:mx-2">·</span>
              )}
            </span>
          ))}
          <span className="text-foreground/20 mx-1.5 sm:mx-2">·</span>
          <span className="inline-flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/30" />
            {current.updates}
          </span>
        </div>
      </FadeInView>

      <FadeInView delay={0.35}>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2.5 rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.08)] mb-8 sm:mb-10"
        >
          {current.getStarted}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeInView>

      <FadeInView delay={0.45}>
        <p className="text-[11px] sm:text-xs text-foreground/25 tracking-[0.25em] uppercase mt-auto">
          {current.footer}
        </p>
      </FadeInView>
    </div>
  )
}
