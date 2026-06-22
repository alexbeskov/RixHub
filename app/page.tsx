import GlitchText from '@/components/GlitchText'
import FadeInView from '@/components/FadeInView'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

const stats = [
  { label: '100+ AI инструментов', icon: '🤖' },
  { label: '500+ промптов', icon: '✨' },
  { label: '50+ гайдов', icon: '📚' },
  { label: 'Постоянные обновления', icon: '🔄' },
]

const sections = [
  { emoji: '🤖', title: 'Тир-лист AI', description: 'Рейтинг лучших AI-инструментов для разработки', href: '/ai-tools' },
  { emoji: '✨', title: 'Промпты', description: 'Готовые промпты для разных задач', href: '/prompts' },
  { emoji: '📚', title: 'Гайды', description: 'Подробные руководства и статьи', href: '/docs' },
  { emoji: '🛠️', title: 'Сервисы', description: 'Сервисы для разработки и дизайна', href: '/services' },
  { emoji: '🆓', title: 'Бесплатные ресурсы', description: 'Готовые стаки для разных проектов', href: '/free-steel' },
]

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <FadeInView>
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
              <Zap className="w-3 h-3" />
              Всё, что нужно для вайбкодинга
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <GlitchText text="RixHub" />
          </h1>
          <p className="text-lg text-foreground/70 max-w-xl mb-2">
            AI-инструменты, промпты и гайды для вайбкодеров
          </p>
          <p className="text-sm text-foreground/50 max-w-xl mb-6">
            Подборки лучших AI-инструментов, готовые промпты, гайды и ресурсы. Собрано с любовью для соло-билдеров и энтузиастов.
          </p>

          <div className="flex flex-wrap gap-3">
            {stats.map((stat) => (
              <span
                key={stat.label}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-foreground/70"
              >
                <span>{stat.icon}</span>
                {stat.label}
              </span>
            ))}
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
                  className="group block p-5 rounded-lg border border-border hover:border-accent transition-colors duration-150"
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
