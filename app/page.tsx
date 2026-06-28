'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, RefreshCw, X } from 'lucide-react'
import FadeInView from '@/components/FadeInView'
import TypewriterText from '@/components/TypewriterText'
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
      closeLabel: 'Закрыть',
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
      closeLabel: 'Close',
    },
  }

  const current = t[lang]

  return (
    <div className="relative">
      {/* Hero */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 text-center relative landing-hero-bg">
        <FadeInView>
          <span className="pill inline-flex items-center gap-2 px-3 py-1 text-[11px] sm:text-xs font-medium tracking-wide uppercase mb-6 sm:mb-8">
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
              className="btn-primary"
            >
              {current.primaryBtn}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-secondary"
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
              aria-label={current.closeLabel}
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
              className="btn-primary"
            >
              {current.closeBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
