'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { ArrowRight, Zap } from 'lucide-react'
import FadeInView from '@/components/FadeInView'

const stats = [
  { label: 'AI инструментов', value: 100, icon: 'noto:robot-face' },
  { label: 'промптов', value: 500, icon: 'noto:sparkles' },
  { label: 'гайдов', value: 50, icon: 'noto:books' },
]

const sections = [
  { icon: 'noto:robot-face', title: 'Тир-лист AI', description: 'Рейтинг лучших AI-инструментов для разработки', href: '/ai-tools' },
  { icon: 'noto:sparkles', title: 'Промпты', description: 'Готовые промпты для разных задач', href: '/prompts' },
  { icon: 'noto:books', title: 'Гайды', description: 'Подробные руководства и статьи', href: '/docs' },
  { icon: 'noto:toolbox', title: 'Сервисы', description: 'Сервисы для разработки и дизайна', href: '/services' },
  { icon: 'noto:free-button', title: 'Бесплатные ресурсы', description: 'Готовые стаки для разных проектов', href: '/free-steel' },
]

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <FadeInView>
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium theme-badge">
              <Zap className="w-3 h-3" />
              Всё, что нужно для вайбкодинга
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            RixHub
          </h1>
          <p className="text-lg text-foreground/70 max-w-xl mb-2">
            AI-инструменты, промпты и гайды для вайбкодеров
          </p>
          <p className="text-sm text-foreground/50 max-w-xl mb-6">
            Подборки лучших AI-инструментов, готовые промпты, гайды и ресурсы. Собрано с любовью для соло-билдеров и энтузиастов.
          </p>

          <div className="flex flex-wrap gap-3">
            {stats.map((stat) => (
              <span key={stat.label} className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-foreground/70">
                <Icon icon={stat.icon} className="w-4 h-4" />
                <span className="font-semibold text-foreground">{stat.value}+</span> {stat.label}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-foreground/70">
              <Icon icon="noto:counterclockwise-arrows-button" className="w-4 h-4" />
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
              <FadeInView key={section.href} delay={index * 0.08}>
                <Link
                  href={section.href}
                  className="group block p-5 rounded-lg border border-border bg-card hover:border-accent hover:shadow-[0_0_20px_color-mix(in_srgb,var(--accent)_15%,transparent)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon icon={section.icon} className="w-8 h-8 mb-3" />
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
