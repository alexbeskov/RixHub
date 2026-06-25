'use client'

import Link from 'next/link'
import { ChevronDown, ArrowRight, Zap, Brain, BookOpen, Code, Layout, Leaf, RefreshCw, Star } from 'lucide-react'
import FadeInView from '@/components/FadeInView'
import TypewriterText from '@/components/TypewriterText'
import CountUp from '@/components/CountUp'
import MarqueeText from '@/components/MarqueeText'
import { useLanguage } from '@/app/language-context'

export default function HomePage() {
  const { lang } = useLanguage()

  const t = {
    ru: {
      badge: 'Всё, что нужно для вайбкодинга',
      title: 'RixHub',
      subtitle: 'AI-инструменты, промпты и гайды для вайбкодеров',
      typewriter: 'Собрано с любовью для соло-билдеров и энтузиастов...',
      description:
        'Подборки лучших AI-инструментов, готовые промпты, гайды и ресурсы.',
      stats: [
        { label: 'AI инструментов', value: 100 },
        { label: 'промптов', value: 500 },
        { label: 'гайдов', value: 50 },
      ],
      updates: 'Постоянные обновления',
      scroll: 'Листай вниз',
      getStarted: 'Начать',
      popularSections: 'Популярные разделы',
      sections: [
        { title: 'Тир-лист AI', description: 'Рейтинг лучших AI-инструментов для разработки', href: '/ai-tools', count: '33 модели' },
        { title: 'Промпты', description: 'Готовые промпты для разных задач', href: '/prompts', count: 'Скоро' },
        { title: 'Гайды', description: 'Подробные руководства и статьи', href: '/docs', count: 'Скоро' },
        { title: 'Сервисы', description: 'Сервисы для разработки и дизайна', href: '/services', count: '5 сервисов' },
        { title: 'Бесплатные ресурсы', description: 'Готовые стаки для разных проектов', href: '/free-steel', count: 'Скоро' },
      ],
      view: 'Смотреть',
      remark: 'RixHub — твое место начала!',
      footer: 'RixHub 2026',
      marqueeItems: ['AI Tools', 'Prompts', 'Guides', 'Services', 'Free Resources', 'Vibe Coding', 'Solo Builders', 'Updates'],
    },
    en: {
      badge: 'Everything you need for vibe coding',
      title: 'RixHub',
      subtitle: 'AI tools, prompts and guides for vibe coders',
      typewriter: 'Built with love for solo builders and enthusiasts...',
      description:
        'Curated AI tools, ready-made prompts, guides and resources.',
      stats: [
        { label: 'AI tools', value: 100 },
        { label: 'prompts', value: 500 },
        { label: 'guides', value: 50 },
      ],
      updates: 'Regular updates',
      scroll: 'Scroll down',
      getStarted: 'Get Started',
      popularSections: 'Popular sections',
      sections: [
        { title: 'AI Tier List', description: 'Ranking of the best AI tools for development', href: '/ai-tools', count: '33 models' },
        { title: 'Prompts', description: 'Ready-made prompts for various tasks', href: '/prompts', count: 'Coming soon' },
        { title: 'Guides', description: 'Detailed guides and articles', href: '/docs', count: 'Coming soon' },
        { title: 'Services', description: 'Services for development and design', href: '/services', count: '5 services' },
        { title: 'Free Resources', description: 'Ready stacks for different projects', href: '/free-steel', count: 'Coming soon' },
      ],
      view: 'View',
      remark: 'RixHub — your place to start!',
      footer: 'RixHub 2026',
      marqueeItems: ['AI Tools', 'Prompts', 'Guides', 'Services', 'Free Resources', 'Vibe Coding', 'Solo Builders', 'Updates'],
    },
  }

  const current = t[lang]

  return (
    <div className="relative">
      {/* ─── HERO — full-screen, centered ─── */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 text-center relative">
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
                {i < current.stats.length && (
                  <span className="text-foreground/20 mx-1.5 sm:mx-2">·</span>
                )}
              </span>
            ))}
            <span className="inline-flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/30" />
              {current.updates}
            </span>
          </div>
        </FadeInView>

        {/* Scroll-down arrow */}
        <FadeInView delay={0.35}>
          <a
            href="#get-started"
            className="flex flex-col items-center gap-2 text-foreground/30 hover:text-foreground/60 transition-colors group cursor-pointer"
          >
            <span className="text-[11px] sm:text-xs uppercase tracking-widest">{current.scroll}</span>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
          </a>
        </FadeInView>
      </section>

      {/* ─── GET STARTED — transition ─── */}
      <section id="get-started" className="min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center relative">
        <FadeInView>
          <div className="w-px h-16 sm:h-20 bg-gradient-to-b from-transparent via-accent/30 to-transparent mb-8 sm:mb-12" />
        </FadeInView>
        <FadeInView delay={0.1}>
          <Link
            href="/ai-tools"
            className="inline-flex items-center gap-2.5 rounded-full px-7 sm:px-9 py-3 sm:py-3.5 text-sm sm:text-base font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.08)]"
          >
            {current.getStarted}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeInView>
      </section>

      {/* ─── MARQUEE TICKER ─── */}
      <FadeInView>
        <div className="border-y border-border/40 py-3 sm:py-4 bg-foreground/[0.02]">
          <MarqueeText speed={35} className="text-[10px] sm:text-xs text-foreground/25 uppercase tracking-[0.2em]">
            {current.marqueeItems.map((item, i) => (
              <span key={i} className="flex items-center gap-6">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent/30" />
                {item}
              </span>
            ))}
          </MarqueeText>
        </div>
      </FadeInView>

      {/* ─── POPULAR SECTIONS — cards reveal on scroll ─── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
        <FadeInView>
          <div className="flex items-center gap-3 mb-10 sm:mb-14">
            <h2 className="text-sm sm:text-base font-medium tracking-wide uppercase text-foreground/50">{current.popularSections}</h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {current.sections.map((section, index) => (
            <FadeInView key={section.href} delay={index * 0.08}>
              <Link
                href={section.href}
                className="group block p-5 sm:p-6 rounded-xl border border-border/60 bg-card/40 hover:border-accent/40 hover:bg-card/60 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-medium mb-2 group-hover:text-accent transition-colors">{section.title}</h3>
                  <p className="text-sm text-foreground/50 mb-3 sm:mb-4">{section.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-foreground/30 group-hover:text-foreground/60 transition-colors">
                    {current.view} <ArrowRight className="w-3 h-3" />
                  </span>
                  <div className="h-4 overflow-hidden">
                    <span className="block text-[10px] text-accent/60 mt-1 font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {section.count}
                    </span>
                  </div>
                </div>
              </Link>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* ─── REMARK + FOOTER ─── */}
      <FadeInView>
        <section className="py-20 sm:py-28 text-center relative border-t border-border/30">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              {current.remark}
            </h2>
          </div>
          <div className="w-12 h-px bg-accent/20 mx-auto mb-6 sm:mb-8" />
          <p className="text-[11px] sm:text-xs text-foreground/30 tracking-[0.25em] uppercase">
            {current.footer}
          </p>
        </section>
      </FadeInView>
    </div>
  )
}
