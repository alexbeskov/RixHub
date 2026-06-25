'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Brain, BookOpen, Code, Layout, Leaf, RefreshCw, Sparkles, Rocket, Terminal, Cpu, Star } from 'lucide-react'
import FadeInView from '@/components/FadeInView'
import TypewriterText from '@/components/TypewriterText'
import CountUp from '@/components/CountUp'
import MarqueeText from '@/components/MarqueeText'
import { useLanguage } from '@/app/language-context'

export default function DashboardPage() {
  const { lang } = useLanguage()

  const t = {
    ru: {
      badge: 'Всё для вайбкодинга',
      title: 'RixHub',
      subtitle: 'AI-инструменты, промпты и гайды для вайбкодеров',
      typewriter: 'Собрано с любовью для соло-билдеров и энтузиастов...',
      description: 'Подборки лучших AI-инструментов, готовые промпты, гайды и ресурсы.',
      stats: [
        { label: 'AI инструментов', value: 100, Icon: Brain },
        { label: 'промптов', value: 500, Icon: Sparkles },
        { label: 'гайдов', value: 50, Icon: BookOpen },
      ],
      updates: 'Постоянные обновления',
      popularSections: 'Популярные разделы',
      sections: [
        { Icon: Brain, title: 'Тир-лист AI', description: 'Рейтинг лучших AI-инструментов для разработки', href: '/ai-tools', count: '33 модели' },
        { Icon: BookOpen, title: 'Промпты', description: 'Готовые промпты для разных задач', href: '/prompts', count: 'Скоро' },
        { Icon: Code, title: 'Гайды', description: 'Подробные руководства и статьи', href: '/docs', count: 'Скоро' },
        { Icon: Layout, title: 'Сервисы', description: 'Сервисы для разработки и дизайна', href: '/services', count: '5 сервисов' },
        { Icon: Leaf, title: 'Бесплатные ресурсы', description: 'Готовые стаки для разных проектов', href: '/free-steel', count: 'Скоро' },
      ],
      view: 'Смотреть',
      remark: 'RixHub — твое место начала!',
      footer: 'BY RixyHub 2026',
      marqueeItems: ['AI Tools', 'Prompts', 'Guides', 'Services', 'Free Resources', 'Vibe Coding', 'Solo Builders', 'Updates'],
      featureStrip: [
        { label: 'AI-powered', sub: 'Подборки' },
        { label: 'Для кода', sub: 'Промпты' },
        { label: 'Вайбкодинг', sub: 'Культура' },
        { label: 'Быстрый старт', sub: 'Гайды' },
      ],
    },
    en: {
      badge: 'Everything for vibe coding',
      title: 'RixHub',
      subtitle: 'AI tools, prompts and guides for vibe coders',
      typewriter: 'Built with love for solo builders and enthusiasts...',
      description: 'Curated AI tools, ready-made prompts, guides and resources.',
      stats: [
        { label: 'AI tools', value: 100, Icon: Brain },
        { label: 'prompts', value: 500, Icon: Sparkles },
        { label: 'guides', value: 50, Icon: BookOpen },
      ],
      updates: 'Regular updates',
      popularSections: 'Popular sections',
      sections: [
        { Icon: Brain, title: 'AI Tier List', description: 'Ranking of the best AI tools for development', href: '/ai-tools', count: '33 models' },
        { Icon: BookOpen, title: 'Prompts', description: 'Ready-made prompts for various tasks', href: '/prompts', count: 'Coming soon' },
        { Icon: Code, title: 'Guides', description: 'Detailed guides and articles', href: '/docs', count: 'Coming soon' },
        { Icon: Layout, title: 'Services', description: 'Services for development and design', href: '/services', count: '5 services' },
        { Icon: Leaf, title: 'Free Resources', description: 'Ready stacks for different projects', href: '/free-steel', count: 'Coming soon' },
      ],
      view: 'View',
      remark: 'RixHub — your place to start!',
      footer: 'BY RixyHub 2026',
      marqueeItems: ['AI Tools', 'Prompts', 'Guides', 'Services', 'Free Resources', 'Vibe Coding', 'Solo Builders', 'Updates'],
      featureStrip: [
        { label: 'AI-powered', sub: 'Curation' },
        { label: 'For coding', sub: 'Prompts' },
        { label: 'Vibe coding', sub: 'Culture' },
        { label: 'Quick start', sub: 'Guides' },
      ],
    },
  }

  const current = t[lang]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Hero Section */}
      <FadeInView>
        <section className="mb-8 sm:mb-12 relative">
          {/* Decorative grid lines */}
          <div className="absolute -top-4 -left-4 w-20 h-20 border-l border-t border-accent/20 pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r border-b border-accent/20 pointer-events-none" />

          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium theme-badge font-pixel-mono">
              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {current.badge}
            </span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4 pixel-glow">
            {current.title}
          </h1>

          <p className="text-base sm:text-lg text-foreground/70 max-w-xl mb-1 sm:mb-2 font-pixel-mono">
            {current.subtitle}
          </p>

          <div className="h-6 sm:h-7 mb-3 sm:mb-4">
            <TypewriterText
              text={current.typewriter}
              speed={50}
              delay={800}
              className="text-xs sm:text-sm text-foreground/50 font-pixel-mono"
              showCursor={true}
            />
          </div>

          <p className="text-xs sm:text-sm text-foreground/50 max-w-xl mb-4 sm:mb-6">
            {current.description}
          </p>

          {/* Animated Stats */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {current.stats.map((stat) => {
              const IconComp = stat.Icon
              return (
                <span key={stat.label} className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-foreground/70 bg-card/50">
                  <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/50" />
                  <CountUp end={stat.value} suffix="+" className="font-semibold text-foreground font-pixel-mono" />
                  <span>{stat.label}</span>
                </span>
              )
            })}
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-foreground/70 bg-card/50">
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/50" />
              {current.updates}
            </span>
          </div>
        </section>
      </FadeInView>

      {/* Marquee Ticker */}
      <FadeInView delay={0.1}>
        <div className="mb-8 sm:mb-10 border-y border-border/50 py-2.5 sm:py-3 bg-card/20">
          <MarqueeText speed={40} className="font-pixel-mono text-[10px] sm:text-xs text-foreground/30 uppercase tracking-widest">
            {current.marqueeItems.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent/50" />
                {item}
              </span>
            ))}
          </MarqueeText>
        </div>
      </FadeInView>

      {/* Popular Sections */}
      <FadeInView delay={0.15}>
        <section className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            <h2 className="text-sm sm:text-lg font-semibold font-pixel-mono">{current.popularSections}</h2>
            <div className="flex-1 h-px bg-border ml-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {current.sections.map((section, index) => {
              const IconComp = section.Icon
              return (
                <FadeInView key={section.href} delay={index * 0.08}>
                  <Link
                    href={section.href}
                    className="group block p-4 sm:p-5 rounded-lg border border-border bg-card/60 hover:border-accent hover:bg-card hover:shadow-[0_0_25px_color-mix(in_srgb,var(--accent)_12%,transparent)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2 sm:mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md border border-border/50 flex items-center justify-center group-hover:border-accent/30 transition-colors bg-background/50">
                          <IconComp className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/60 group-hover:text-accent transition-colors" />
                        </div>
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold mb-1 group-hover:text-accent transition-colors">{section.title}</h3>
                      <p className="text-xs sm:text-sm text-foreground/60 mb-2 sm:mb-3">{section.description}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-foreground/40 group-hover:text-foreground transition-colors font-pixel-mono">
                        {current.view} <ArrowRight className="w-3 h-3" />
                      </span>
                      <div className="h-4 overflow-hidden">
                        <span className="block text-[10px] text-accent/70 mt-1 font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          {section.count}
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeInView>
              )
            })}
          </div>
        </section>
      </FadeInView>

      {/* Feature Highlight Strip */}
      <FadeInView delay={0.2}>
        <section className="mb-8 sm:mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {current.featureStrip.map((item, i) => {
              const IconComp = [Cpu, Terminal, Sparkles, Rocket][i]
              return (
                <div key={i} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-colors">
                  <IconComp className="w-4 h-4 sm:w-5 sm:h-5 text-accent/70 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-medium truncate">{item.label}</p>
                    <p className="text-[9px] sm:text-[10px] text-foreground/40 font-pixel-mono">{item.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </FadeInView>

      {/* Remark + Footer */}
      <FadeInView delay={0.25}>
        <section className="mt-16 sm:mt-24 mb-10 sm:mb-12 text-center relative">
          {/* Decorative elements */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-px h-8 bg-gradient-to-b from-transparent to-accent/30" />

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 animate-float">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight font-pixel">
              {current.remark}
            </h2>
          </div>
          <div className="w-16 h-px bg-accent/30 mx-auto mb-6 sm:mb-8" />
          <p className="text-[10px] sm:text-xs text-foreground/40 tracking-widest uppercase font-pixel-mono">
            {current.footer}
          </p>
        </section>
      </FadeInView>
    </div>
  )
}
