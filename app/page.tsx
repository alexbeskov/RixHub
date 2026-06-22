import GlitchText from '@/components/GlitchText'
import FadeInView from '@/components/FadeInView'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const sections = [
  { emoji: '🤖', title: 'AI Tools', description: 'Нейросети и инструменты для кода', href: '/ai-tools' },
  { emoji: '📚', title: 'Docs', description: 'Документация и шпаргалки', href: '/docs' },
  { emoji: '🛠️', title: 'Services', description: 'Сервисы для разработки', href: '/services' },
  { emoji: '✨', title: 'Prompts', description: 'Готовые промпты для AI', href: '/prompts' },
  { emoji: '🆓', title: 'Free Steel', description: 'Бесплатные ресурсы и стартовые наборы', href: '/free-steel' },
]

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          <GlitchText text="[RixyHub]" />
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 max-w-md">
          Всё для вайбкодера в одном месте
        </p>
      </section>

      <section className="pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <FadeInView key={section.href} delay={index * 0.1}>
              <Link
                href={section.href}
                className="group block p-6 rounded-lg border border-border hover:border-accent transition-colors duration-150"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl mb-3">{section.emoji}</div>
                    <h3 className="text-lg font-semibold mb-1">{section.title}</h3>
                    <p className="text-sm text-foreground/60">{section.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 mt-1 text-foreground/40 group-hover:text-foreground transition-colors duration-150" />
                </div>
              </Link>
            </FadeInView>
          ))}
        </div>
      </section>
    </div>
  )
}
