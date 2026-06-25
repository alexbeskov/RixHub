'use client'

import FadeInView from '@/components/FadeInView'
import { useLanguage } from '@/app/language-context'

export default function DocsPage() {
  const { lang } = useLanguage()
  const t = {
    ru: {
      title: 'Гайды',
      description: 'Документация и шпаргалки появятся здесь.',
    },
    en: {
      title: 'Guides',
      description: 'Documentation and cheat sheets will appear here.',
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
