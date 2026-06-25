'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Brain, BookOpen, Code, Layout, Leaf, RefreshCw } from 'lucide-react'
import FadeInView from '@/components/FadeInView'
import TypewriterText from '@/components/TypewriterText'
import { useLanguage } from '@/app/language-context'
import { aiModels } from '@/data/ai-models'
import { prompts } from '@/data/prompts'
import { docs } from '@/data/docs'
import { services } from '@/data/services'
import { freeSteel } from '@/data/free-steel'

export default function LandingPage() {
  const { lang } = useLanguage()

  const t = {
    ru: {
      badge: 'Всё, что нужно для вайбкодинга',
      title: 'RixHub',
      subtitle: 'AI-инструменты, промпты и гайды для вайбкодеров',
      typewriter: 'Собрано с любовью для соло-билдеров и энтузиастов...',
      description: 'Подборки лучших AI-инструментов, готовые промпты, гайды и ресурсы.',
      primaryBtn: 'Начать',
      secondaryBtn: 'Подробнее',
      updates: 'Постоянные обновления',
      footer: 'RixHub 2026',
      sections: [
        { Icon: Brain, title: 'Тир-лист AI', description: 'Рейтинг лучших AI-инструментов для разработки', href: '/ai-tools', count: aiModels.length },
        { Icon: BookOpen, title: 'Промпты', description: 'Готовые промпты для разных задач', href: '/prompts', count: prompts.length },
        { Icon: Code, title: 'Гайды', description: 'Подробные руководства и статьи', href: '/docs', count: docs.length },
        { Icon: Layout, title: 'Сервисы', description: 'Сервисы для разработки и дизайна', href: '/services', count: services.length },
        { Icon: Leaf, title: 'Бесплатные ресурсы', description: 'Готовые стаки для разных проектов', href: '/free-steel', count: freeSteel.length },
      ],
    },
    en: {
      badge: 'Everything you need for vibe coding',
      title: 'RixHub',
      subtitle: 'AI tools, prompts and guides for vibe coders',
      typewriter: 'Built with love for solo builders and enthusiasts...',
      description: 'Curated AI tools, ready-made prompts, guides and resources.',
      primaryBtn: 'Get Started',
      secondaryBtn: 'Learn More',
      updates: 'Regular updates',
      footer: 'RixHub 2026',
      sections: [
        { Icon: Brain, title: 'AI Tier List', description: 'Ranking of the best AI tools for development', href: '/ai-tools', count: aiModels.length },
        { Icon: BookOpen, title: 'Prompts', description: 'Ready-made prompts for various tasks', href: '/prompts', count: prompts.length },
        { Icon: Code, title: 'Guides', description: 'Detailed guides and articles', href: '/docs', count: docs.length },
        { Icon: Layout, title: 'Services', description: 'Services for development and design', href: '/services', count: services.length },
        { Icon: Leaf, title: 'Free Resources', description: 'Ready stacks for different projects', href: '/free-steel', count: freeSteel.length },
      ],
    },
  }

  const current = t[lang]

  return (
    <div className="relative">
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center relative">
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
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mb-2 sm:mb-3 leading-relaxed">
            {current.subtitle}
          </p>
        </FadeInView>

        <FadeInView delay={0.15}>
          <div className="h-7 sm:h-8 mb-4 sm:mb-6">
            <TypewriterText
              text={current.typewriter}
              speed={45}
              delay={600}
              className="text-sm sm:text-base text-gray-500"
              showCursor={true}
            />
          </div>
        </FadeInView>

        <FadeInView delay={0.2}>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mb-8 sm:mb-10">
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
            <Link
              href="/ai-tools"
              className="inline-flex items-center gap-2.5 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium border border-white/20 text-white hover:bg-white/5 transition-colors"
            >
              {current.secondaryBtn}
            </Link>
          </div>
        </FadeInView>

        <FadeInView delay={0.3}>
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-gray-500 mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold text-foreground">{aiModels.length}</span>
              <span>AI {lang === 'ru' ? 'инструментов' : 'tools'}</span>
            </span>
            <span className="text-gray-700 mx-1.5 sm:mx-2">·</span>
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold text-foreground">{prompts.length}</span>
              <span>{lang === 'ru' ? 'промптов' : 'prompts'}</span>
            </span>
            <span className="text-gray-700 mx-1.5 sm:mx-2">·</span>
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold text-foreground">{docs.length}</span>
              <span>{lang === 'ru' ? 'гайдов' : 'guides'}</span>
            </span>
            <span className="text-gray-700 mx-1.5 sm:mx-2">·</span>
            <span className="inline-flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
              {current.updates}
            </span>
          </div>
        </FadeInView>
      </section>

      {/* Section Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {current.sections.map((section, index) => {
            const IconComp = section.Icon
            return (
              <FadeInView key={section.href} delay={index * 0.08}>
                <Link
                  href={section.href}
                  className="group block relative overflow-hidden transition-all duration-300"
                  style={{
                    border: '1px solid var(--accent, rgba(255,255,255,0.08))',
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '28px',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--accent)'
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--accent, rgba(255,255,255,0.08))'
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'var(--accent-bg, rgba(168,85,247,0.1))',
                      }}
                    >
                      <IconComp
                        className="w-6 h-6 transition-colors duration-300"
                        style={{ color: 'var(--accent)' }}
                      />
                    </div>
                    <ArrowRight
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0"
                      style={{ color: 'var(--accent)' }}
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1.5 transition-colors duration-300 group-hover:text-[var(--accent)]">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {section.description}
                  </p>
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'var(--accent)' }}
                  >
                    {section.count} {lang === 'ru' ? 'элементов' : 'items'}
                  </span>
                </Link>
              </FadeInView>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <FadeInView>
        <footer className="text-center pb-8 sm:pb-12">
          <p className="text-[11px] sm:text-xs text-gray-600 tracking-[0.25em] uppercase">
            {current.footer}
          </p>
        </footer>
      </FadeInView>
    </div>
  )
}
