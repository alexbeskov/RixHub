'use client'

import FadeInView from '@/components/FadeInView'
import { useLanguage } from '@/app/language-context'

export default function PromptsPage() {
  const { lang } = useLanguage()
  const t = {
    ru: {
      title: 'Промпты',
      description: 'Готовые промпты для AI появятся здесь.',
    },
    en: {
      title: 'Prompts',
      description: 'Ready-made prompts for AI will appear here.',
    },
  }
  const current = t[lang]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <FadeInView>
        <h1 className="text-3xl font-bold tracking-tight mb-6">{current.title}</h1>
        <p className="text-foreground/70">{current.description}</p>
      </FadeInView>
    </div>
  )
}
