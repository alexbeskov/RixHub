'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, RefreshCw, X } from 'lucide-react'
import FadeInView from '@/components/FadeInView'
import TypewriterText from '@/components/TypewriterText'
import LanguageToggle from '@/components/LanguageToggle'
import ThemeSelector from '@/components/ThemeSelector'
import { useLanguage } from '@/app/language-context'

export default function LandingPage() {
  const { lang } = useLanguage()
  const [modalOpen, setModalOpen] = useState(false)

  const t = {
    ru: {
      badge: 'Всё для вайбкодинга',
      title: 'RixHub',
      subtitle: 'AI-инструменты, промпты и гайды для вайбкодеров',
      typewriter: 'Собрано с любовью для соло-билдеров и энтузиастов...',
      description: 'Подборки лучших AI-инструментов, готовые промпты, гайды и ресурсы.',
      primaryBtn: 'Начать',
      secondaryBtn: 'Подробнее',
      updates: 'Постоянные обновления',
      footer: 'RixHub 2026',
      stats: { ai: 'AI инструментов', prompts: 'промптов', guides: 'гайдов' },
      modalText: 'RixHub — был разработан мною лично для всех пользователей интернета, которые решили пойти в билдинг, веб 2 и веб 3 разработку. Пусть данный сайт будет служить вам как надёжный инструмент, которым можно пользоваться снова и снова.',
      closeBtn: 'Закрыть',
    },
    en: {
      badge: 'Everything for vibe coding',
      title: 'RixHub',
      subtitle: 'AI tools, prompts and guides for vibe coders',
      typewriter: 'Built with love for solo builders and enthusiasts...',
      description: 'Curated AI tools, ready-made prompts, guides and resources.',
      primaryBtn: 'Get Started',
      secondaryBtn: 'Learn More',
      updates: 'Regular updates',
      footer: 'RixHub 2026',
      stats: { ai: 'AI tools', prompts: 'prompts', guides: 'guides' },
      modalText: 'RixHub was developed personally by me for all internet users who decided to go into building, web 2 and web 3 development. May this site serve you as a reliable tool that you can use again and again.',
      closeBtn: 'Close',
    },
  }

  const current = t[lang]

  return (
    <div className="relative">
      {/* Top-right controls */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2">
        <LanguageToggle />
        <ThemeSelector />
      </div>

      {/* Hero */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 text-center relative">
        <FadeInView>
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] sm:text-xs font-medium tracking-wide uppercase mb-6 sm:mb-8"
            style={{
              border: '1px solid var(--accent, rgba(255,255,255,0.08))',
              background: 'var(--accent-bg, rgba(168,85,247,0.1))',
              color: 'var(--accent)',
            }}>
            <Zap className="w-3 h-3" />
            {current.badge}
          </span>
        </FadeInView>

        <FadeInView delay={0.05}>
          <h1 className="mb-4 sm:mb-6 leading-[0.95]"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 800,
              letterSpacing: '-2px',
            }}>
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
              className="text-sm sm:text-base text-foreground/50"
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
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2.5 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium bg-white text-black hover:bg-white/90 transition-colors"
            >
              {current.primaryBtn}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium border border-white/20 text-white hover:bg-white/5 transition-colors"
            >
              {current.secondaryBtn}
            </button>
          </div>
        </FadeInView>

        <FadeInView delay={0.3}>
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-foreground/50 mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold text-foreground">100+</span>
              <span>{current.stats.ai}</span>
            </span>
            <span className="text-foreground/20 mx-1.5 sm:mx-2">·</span>
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold text-foreground">500+</span>
              <span>{current.stats.prompts}</span>
            </span>
            <span className="text-foreground/20 mx-1.5 sm:mx-2">·</span>
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold text-foreground">50+</span>
              <span>{current.stats.guides}</span>
            </span>
            <span className="text-foreground/20 mx-1.5 sm:mx-2">·</span>
            <span className="inline-flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/30" />
              {current.updates}
            </span>
          </div>
        </FadeInView>

        <FadeInView delay={0.35}>
          <p className="text-[11px] sm:text-xs text-foreground/30 tracking-[0.25em] uppercase">
            {current.footer}
          </p>
        </FadeInView>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-6 sm:p-8 text-center"
            style={{
              background: 'var(--card, #111)',
              border: '1px solid var(--accent, rgba(255,255,255,0.08))',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1 rounded-full text-foreground/40 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2
              className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5"
              style={{ color: 'var(--accent)' }}
            >
              RixHub
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-6 sm:mb-8">
              {current.modalText}
            </p>
            <button
              onClick={() => setModalOpen(false)}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors"
            >
              {current.closeBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
