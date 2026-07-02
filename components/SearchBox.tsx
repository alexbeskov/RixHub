'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useLanguage } from '@/app/language-context'

interface SearchItem {
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  url: string
  tags: string[]
  tagsEn: string[]
}

const searchIndex: SearchItem[] = [
  {
    title: 'Тир-лист AI',
    titleEn: 'AI Tier List',
    description: 'Рейтинг лучших AI-моделей для разработки: Claude, Gemini, GPT-4o, Kimi, DeepSeek и другие.',
    descriptionEn: 'Ranking of the best AI models for development: Claude, Gemini, GPT-4o, Kimi, DeepSeek and others.',
    url: '/ai-tools',
    tags: ['ai', 'gpt', 'claude', 'gemini', 'модели', 'нейросети', 'код', 'code'],
    tagsEn: ['ai', 'gpt', 'claude', 'gemini', 'models', 'neural', 'code'],
  },
  {
    title: 'Claude Sonnet 4.5',
    titleEn: 'Claude Sonnet 4.5',
    description: 'Лучший AI для сложных задач. Понимает контекст всего проекта, отлично рефакторит.',
    descriptionEn: 'Best AI for complex tasks. Understands entire project context, great refactoring.',
    url: '/ai-tools',
    tags: ['claude', 'anthropic', 'sonnet', 'рефакторинг', 'баги', 'backend'],
    tagsEn: ['claude', 'anthropic', 'sonnet', 'refactoring', 'bugs', 'backend'],
  },
  {
    title: 'Gemini 2.5 Pro',
    titleEn: 'Gemini 2.5 Pro',
    description: 'Огромный контекст окна, лучший для загрузки всего проекта целиком.',
    descriptionEn: 'Huge context window, best for uploading entire project at once.',
    url: '/ai-tools',
    tags: ['gemini', 'google', 'контекст', 'pro', 'бесплатно', 'aistudio'],
    tagsEn: ['gemini', 'google', 'context', 'pro', 'free', 'aistudio'],
  },
  {
    title: 'Kimi k2',
    titleEn: 'Kimi k2',
    description: 'Сильная бесплатная модель, хороша для логики и алгоритмических задач.',
    descriptionEn: 'Strong free model, good for logic and algorithmic tasks.',
    url: '/ai-tools',
    tags: ['kimi', 'бесплатно', 'алгоритмы', 'логика', 'китай'],
    tagsEn: ['kimi', 'free', 'algorithms', 'logic', 'china'],
  },
  {
    title: 'DeepSeek V3',
    titleEn: 'DeepSeek V3',
    description: 'Лучшая бесплатная альтернатива, сильна в бэкенде и алгоритмах.',
    descriptionEn: 'Best free alternative, strong in backend and algorithms.',
    url: '/ai-tools',
    tags: ['deepseek', 'бесплатно', 'бэкенд', 'backend', 'китай', 'v3'],
    tagsEn: ['deepseek', 'free', 'backend', 'v3', 'china'],
  },
  {
    title: 'GPT-4o',
    titleEn: 'GPT-4o',
    description: 'Универсальная модель от OpenAI, хороша для большинства задач.',
    descriptionEn: 'Universal model from OpenAI, good for most tasks.',
    url: '/ai-tools',
    tags: ['gpt', 'openai', 'chatgpt', '4o', 'универсальный'],
    tagsEn: ['gpt', 'openai', 'chatgpt', '4o', 'universal'],
  },
  {
    title: 'Qwen2.5 Coder',
    titleEn: 'Qwen2.5 Coder',
    description: 'Специализирована под код, хороша для простых и средних задач.',
    descriptionEn: 'Specialized for code, good for simple and medium tasks.',
    url: '/ai-tools',
    tags: ['qwen', 'coder', 'alibaba', 'код', 'специализация'],
    tagsEn: ['qwen', 'coder', 'alibaba', 'code', 'specialized'],
  },
  {
    title: 'Grok 3',
    titleEn: 'Grok 3',
    description: 'Единственная модель с доступом к реальному времени, хороша для ресёрча.',
    descriptionEn: 'Only model with real-time access, good for research.',
    url: '/ai-tools',
    tags: ['grok', 'x', 'twitter', 'реальное время', 'ресёрч', 'research'],
    tagsEn: ['grok', 'x', 'twitter', 'real-time', 'research'],
  },
  {
    title: 'Mistral Large',
    titleEn: 'Mistral Large',
    description: 'Европейская альтернатива, хороша если важна приватность данных.',
    descriptionEn: 'European alternative, good if data privacy is important.',
    url: '/ai-tools',
    tags: ['mistral', 'европа', 'приватность', 'privacy', 'api', 'европейский'],
    tagsEn: ['mistral', 'europe', 'privacy', 'api', 'european'],
  },
  {
    title: 'GitHub Copilot',
    titleEn: 'GitHub Copilot',
    description: 'AI-автодополнение в IDE. Хорош только внутри редактора, в диалоге слабее.',
    descriptionEn: 'AI autocomplete in IDE. Good only inside editor, weaker in chat.',
    url: '/ai-tools',
    tags: ['copilot', 'github', 'ide', 'автодополнение', 'vscode', 'autocomplete'],
    tagsEn: ['copilot', 'github', 'ide', 'autocomplete', 'vscode'],
  },
  {
    title: 'Промпты',
    titleEn: 'Prompts',
    description: 'Готовые промпты для разных задач: кодинг, дизайн, ресёрч, написание текста.',
    descriptionEn: 'Ready-made prompts for different tasks: coding, design, research, writing.',
    url: '/prompts',
    tags: ['промпты', 'prompts', 'запросы', 'инструкции', 'ai'],
    tagsEn: ['prompts', 'requests', 'instructions', 'ai'],
  },
  {
    title: 'Гайды',
    titleEn: 'Guides',
    description: 'Подробные руководства и статьи по разработке, AI-инструментам и вайбкодингу.',
    descriptionEn: 'Detailed guides and articles on development, AI tools and vibe coding.',
    url: '/docs',
    tags: ['гайды', 'guides', 'документация', 'docs', 'статьи', 'руководства', 'обучение'],
    tagsEn: ['guides', 'docs', 'articles', 'documentation', 'tutorials'],
  },
  {
    title: 'Сервисы',
    titleEn: 'Services',
    description: 'Сервисы для разработки и дизайна: хостинг, базы данных, CI/CD и другое.',
    descriptionEn: 'Services for development and design: hosting, databases, CI/CD and more.',
    url: '/services',
    tags: ['сервисы', 'services', 'хостинг', 'hosting', 'базы данных', 'database', 'ci/cd'],
    tagsEn: ['services', 'hosting', 'database', 'ci/cd', 'devops'],
  },
  {
    title: 'Бесплатные ресурсы',
    titleEn: 'Free Resources',
    description: 'Готовые стаки для разных проектов: шаблоны, библиотеки, инструменты.',
    descriptionEn: 'Ready stacks for different projects: templates, libraries, tools.',
    url: '/free-steel',
    tags: ['бесплатно', 'free', 'ресурсы', 'resources', 'стаки', 'stacks', 'шаблоны', 'templates'],
    tagsEn: ['free', 'resources', 'stacks', 'templates', 'libraries'],
  },
  {
    title: 'Главная',
    titleEn: 'Home',
    description: 'RixHub — AI-инструменты, промпты и гайды для вайбкодеров.',
    descriptionEn: 'RixHub — AI tools, prompts and guides for vibe coders.',
    url: '/',
    tags: ['главная', 'home', 'rixhub', 'вайбкодинг', 'vibe coding', 'start'],
    tagsEn: ['home', 'rixhub', 'vibe coding', 'start'],
  },
]

const placeholders = {
  ru: [
    'Найти AI модель...',
    'Поиск по промптам...',
    'Гайды по кодингу...',
    'Сервисы для разработки...',
    'Бесплатные ресурсы...',
    'Claude, GPT, Gemini...',
  ],
  en: [
    'Find AI model...',
    'Search prompts...',
    'Coding guides...',
    'Dev services...',
    'Free resources...',
    'Claude, GPT, Gemini...',
  ],
}

export default function SearchBox() {
  const { lang } = useLanguage()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentPlaceholders = placeholders[lang]

  // Cycle placeholders
  useEffect(() => {
    if (isFocused || query) return
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % currentPlaceholders.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [isFocused, query, currentPlaceholders.length])

  // Click outside to close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Keyboard shortcut: / to focus
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !isFocused && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isFocused])

  const getLangKey = (base: string, fallback: string = 'En') => {
    if (lang === 'ru') return base
    return `${base}${fallback}`
  }

  const getResults = useCallback((): SearchItem[] => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    const langKey = getLangKey('title')
    const descKey = getLangKey('description')
    const tagsKey = getLangKey('tags')

    return searchIndex
      .filter((item) => {
        const titleMatch = (item[langKey as keyof SearchItem] as string).toLowerCase().includes(q)
        const descMatch = (item[descKey as keyof SearchItem] as string).toLowerCase().includes(q)
        const tagMatch = (item[tagsKey as keyof SearchItem] as string[]).some((t) => t.toLowerCase().includes(q))
        return titleMatch || descMatch || tagMatch
      })
      .slice(0, 6)
  }, [query, lang])

  const results = getResults()

  const handleSelect = (url: string) => {
    setQuery('')
    setOpen(false)
    router.push(url)
  }

  return (
    <div ref={containerRef} className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/40" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => {
            setIsFocused(true)
            if (query) setOpen(true)
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? '' : currentPlaceholders[placeholderIndex]}
          className="w-full h-8 sm:h-9 pl-8 sm:pl-9 pr-8 rounded-md border border-border bg-transparent text-xs sm:text-sm placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        {!query && !isFocused && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-foreground/20 hidden sm:inline">
            /
          </span>
        )}
      </div>

      {/* Results dropdown */}
      {open && (query.trim() || results.length > 0) && (
        <div className="absolute top-10 left-0 right-0 z-50 rounded-lg border border-border bg-card shadow-lg overflow-hidden">
          {results.length > 0 ? (
            <div className="py-1">
              {results.map((item, index) => {
                const titleKey = getLangKey('title')
                const descKey = getLangKey('description')
                const title = item[titleKey as keyof SearchItem] as string
                const description = item[descKey as keyof SearchItem] as string
                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(item.url)}
                    className="w-full text-left px-3 py-2 hover:bg-muted transition-colors flex items-start gap-2"
                  >
                    <Search className="w-3.5 h-3.5 mt-0.5 text-foreground/30 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{title}</p>
                      <p className="text-[11px] text-foreground/50 leading-snug line-clamp-1">{description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : query.trim() ? (
            <div className="px-3 py-4 text-center">
              <p className="text-sm text-foreground/50">
                {lang === 'ru' ? 'Ничего не найдено' : 'Nothing found'}
              </p>
              <p className="text-[11px] text-foreground/30 mt-1">
                {lang === 'ru' ? 'Попробуйте другие слова' : 'Try different words'}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
