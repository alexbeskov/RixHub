'use client'

import FadeInView from '@/components/FadeInView'
import { useLanguage } from '@/app/language-context'

export default function FreeSteelPage() {
  const { lang } = useLanguage()
  const t = {
    ru: {
      title: 'Бесплатные ресурсы',
      description: 'Бесплатные ресурсы и стартовые наборы появятся здесь.',
    },
    en: {
      title: 'Free Resources',
      description: 'Free resources and starter kits will appear here.',
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
