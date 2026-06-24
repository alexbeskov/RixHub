'use client'

import { useState } from 'react'
import FadeInView from '@/components/FadeInView'
import { ExternalLink, Sparkles } from 'lucide-react'
import { Icon } from '@iconify/react'

interface AIModel {
  name: string
  description: string
  price: string
  url: string
  icon: string | React.ReactNode
  customIcon?: boolean
}

interface Tier {
  label: string
  color: string
  glowColor: string
  models: AIModel[]
}

const tiers: Tier[] = [
  {
    label: 'S-tier',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    models: [
      {
        name: 'Claude Sonnet 4.5',
        description: 'Лучший для сложных задач. Понимает контекст всего проекта, отлично рефакторит и находит баги.',
        price: '$20/мес',
        url: 'https://claude.ai',
        icon: 'simple-icons:anthropic',
      },
      {
        name: 'Gemini 2.5 Pro',
        description: 'Огромный контекст окна, лучший когда нужно загрузить весь проект целиком. Отлично работает с Google стеком.',
        price: 'Бесплатный тир через AI Studio',
        url: 'https://aistudio.google.com',
        icon: 'simple-icons:google',
      },
    ],
  },
  {
    label: 'A-tier',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    models: [
      {
        name: 'Kimi k2',
        description: 'Сильная бесплатная модель, хороша для логики и алгоритмических задач.',
        price: 'Бесплатно',
        url: 'https://kimi.ai',
        icon: 'K',
        customIcon: true,
      },
      {
        name: 'DeepSeek V3',
        description: 'Лучшая бесплатная альтернатива, особенно сильна в бэкенде и алгоритмах.',
        price: 'Бесплатно',
        url: 'https://deepseek.com',
        icon: 'simple-icons:deepseek',
      },
      {
        name: 'GPT-4o',
        description: 'Универсальная модель, хороша для большинства задач.',
        price: '$20/мес',
        url: 'https://chat.openai.com',
        icon: 'simple-icons:openai',
      },
    ],
  },
  {
    label: 'B-tier',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    models: [
      {
        name: 'Qwen2.5 Coder',
        description: 'Специализирована именно под код, хороша для простых и средних задач.',
        price: 'Бесплатно',
        url: 'https://chat.qwen.ai',
        icon: 'simple-icons:alibabadotcom',
      },
      {
        name: 'Grok 3',
        description: 'Единственная модель с доступом к реальному времени, хороша для ресёрча.',
        price: 'Есть бесплатный тир',
        url: 'https://grok.com',
        icon: 'simple-icons:x',
      },
      {
        name: 'Mistral Large',
        description: 'Европейская альтернатива, хороша если важна приватность данных.',
        price: 'Есть бесплатный API',
        url: 'https://mistral.ai',
        icon: 'simple-icons:mistral',
      },
    ],
  },
  {
    label: 'C-tier',
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.15)',
    models: [
      {
        name: 'GitHub Copilot',
        description: 'Хорош только внутри IDE как автодополнение, в диалоге слабее конкурентов.',
        price: '$10/мес',
        url: 'https://github.com/features/copilot',
        icon: 'simple-icons:github',
      },
      {
        name: 'MiMo',
        description: 'Подходит только для простых небольших задач.',
        price: 'Бесплатно',
        url: 'https://mimo.org',
        icon: 'M',
        customIcon: true,
      },
    ],
  },
]

function CustomIcon({ letter, color }: { letter: string; color: string }) {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
      style={{ backgroundColor: color + '20', color, border: `1px solid ${color}40` }}
    >
      {letter}
    </div>
  )
}

function ModelCard({ model, tierColor }: { model: AIModel; tierColor: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={model.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-xl border border-border bg-card p-4 transition-all duration-300"
      style={{
        boxShadow: hovered ? `0 0 20px ${tierColor}20` : 'none',
        borderColor: hovered ? `${tierColor}40` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          {model.customIcon ? (
            <CustomIcon letter={model.icon as string} color={tierColor} />
          ) : (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: tierColor + '15' }}
            >
              <Icon
                icon={model.icon as string}
                className="w-5 h-5"
                style={{ color: tierColor }}
              />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm tracking-tight">{model.name}</h3>
            <ExternalLink className="w-3 h-3 text-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-xs text-foreground/60 leading-relaxed mb-2">{model.description}</p>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" style={{ color: tierColor }} />
            <span className="text-[11px] font-medium" style={{ color: tierColor }}>
              {model.price}
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function AIToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <FadeInView>
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Тир-лист AI для кода</h1>
          <p className="text-foreground/60 text-sm max-w-2xl">
            Проверенные лично модели, ранжированные по полезности для разработки. Обновляется по мере выхода новых версий.
          </p>
        </div>
      </FadeInView>

      <div className="space-y-10">
        {tiers.map((tier, tierIndex) => (
          <FadeInView key={tier.label} delay={tierIndex * 0.1}>
            <div className="relative">
              {/* Tier header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase"
                  style={{
                    backgroundColor: tier.color + '15',
                    color: tier.color,
                    border: `1px solid ${tier.color}30`,
                  }}
                >
                  {tier.label}
                </div>
                <div className="h-px flex-1" style={{ backgroundColor: tier.color + '15' }} />
              </div>

              {/* Models grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {tier.models.map((model) => (
                  <ModelCard key={model.name} model={model} tierColor={tier.color} />
                ))}
              </div>
            </div>
          </FadeInView>
        ))}
      </div>

      <FadeInView delay={0.5}>
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-foreground/40 text-center">
            Цены актуальны на момент создания. Модели развиваются быстро — проверяйте актуальность на официальных сайтах.
          </p>
        </div>
      </FadeInView>
    </div>
  )
}
