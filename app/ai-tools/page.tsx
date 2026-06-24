'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ExternalLink,
  Check,
  XCircle,
  Layers,
  Globe,
  Bot,
  Hexagon,
  Code2,
  Server,
  Brain,
  Bug,
  Crown,
  Zap,
  Paintbrush,
  DollarSign,
  Star,
  Search,
  Code,
  FlaskConical,
  Rocket,
} from 'lucide-react'
import { Icon } from '@iconify/react'
import FadeInView from '@/components/FadeInView'

// ============================
// DATA
// ============================

const categories = [
  { id: 'all', label: 'All Models', icon: Layers },
  { id: 'web', label: 'Web', icon: Globe },
  { id: 'telegram', label: 'Telegram Bots', icon: Bot },
  { id: 'web3', label: 'Web3', icon: Hexagon },
  { id: 'frontend', label: 'Frontend', icon: Code2 },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'agents', label: 'Agents', icon: Brain },
  { id: 'debugging', label: 'Debugging', icon: Bug },
  { id: 'free', label: 'Free Models', icon: DollarSign },
  { id: 'research', label: 'Research', icon: FlaskConical },
  { id: 'open-source', label: 'Open Source', icon: Code },
  { id: 'speed', label: 'Speed', icon: Zap },
  { id: 'general', label: 'General', icon: Rocket },
]

const tierOrder = ['S+', 'S', 'A', 'B'] as const

type Tier = (typeof tierOrder)[number]

interface Model {
  id: string
  name: string
  company: string
  tier: Tier
  price: string
  context: string
  bestFor: string[]
  pros: string[]
  cons: string[]
  description: string
  website: string
  icon: string
  badges: string[]
}

const models: Model[] = [
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    company: 'Anthropic',
    tier: 'S+',
    price: '$20/month',
    context: '200k',
    bestFor: ['Web', 'Backend', 'Telegram Bots', 'Architecture', 'Debugging'],
    pros: ['Лучший для архитектуры', 'Отличный рефакторинг', 'Хорошо держит большой контекст', 'Очень качественный код'],
    cons: ['Иногда слишком многословный', 'Есть лимиты'],
    description: 'Лучший выбор для сложных задач. Понимает контекст всего проекта, отлично рефакторит и находит баги.',
    website: 'https://claude.ai',
    icon: 'simple-icons:anthropic',
    badges: ['🏆 Architecture King', '🌐 Web3 King', '⭐ Overall Best'],
  },
  {
    id: 'codex',
    name: 'Codex',
    company: 'OpenAI',
    tier: 'S+',
    price: 'ChatGPT Plus',
    context: '128k',
    bestFor: ['Refactoring', 'Debugging', 'Backend'],
    pros: ['Очень сильный в кодинге', 'Отличный дебаг', 'Хорошо понимает существующий код'],
    cons: ['Иногда излишне усложняет решения'],
    description: 'Специализированная модель для кодинга. Отлично справляется с рефакторингом и дебагом.',
    website: 'https://openai.com',
    icon: 'simple-icons:openai',
    badges: ['🐛 Debugging King'],
  },
  {
    id: 'claude-opus',
    name: 'Claude Opus',
    company: 'Anthropic',
    tier: 'S+',
    price: 'Max Plan',
    context: '200k',
    bestFor: ['Large Projects', 'Architecture'],
    pros: ['Один из лучших кодеров', 'Огромный контекст', 'Премиум качество'],
    cons: ['Дорогой', 'Медленнее Sonnet'],
    description: 'Флагманская модель Anthropic. Лучший выбор для огромных проектов и сложной архитектуры.',
    website: 'https://claude.ai',
    icon: 'simple-icons:anthropic',
    badges: [],
  },
  {
    id: 'gemini-25-pro',
    name: 'Gemini 2.5 Pro',
    company: 'Google',
    tier: 'S+',
    price: '$20',
    context: '1M',
    bestFor: ['Frontend', 'Web', 'Long context'],
    pros: ['Огромный контекст', 'Отличный для React', 'Хороший UI код'],
    cons: ['Иногда допускает ошибки'],
    description: 'Огромное контекстное окно — лучший выбор, когда нужно загрузить весь проект целиком. Отлично работает с Google стеком.',
    website: 'https://gemini.google.com',
    icon: 'simple-icons:google',
    badges: ['🎨 UI Master'],
  },
  {
    id: 'gpt-5',
    name: 'GPT-5',
    company: 'OpenAI',
    tier: 'S',
    price: '$20',
    context: '256k',
    bestFor: ['General coding', 'Brainstorming'],
    pros: ['Универсальный', 'Хороший reasoning'],
    cons: ['Не всегда лучший для сложной архитектуры'],
    description: 'Универсальная модель, хороша для большинства задач — от написания кода до генерации идей.',
    website: 'https://chatgpt.com',
    icon: 'simple-icons:openai',
    badges: [],
  },
  {
    id: 'o3',
    name: 'o3',
    company: 'OpenAI',
    tier: 'S',
    price: 'ChatGPT Plus',
    context: '200k',
    bestFor: ['Reasoning', 'Complex tasks'],
    pros: ['Сильное мышление', 'Отлично справляется с логикой'],
    cons: ['Медленный', 'Ограниченный доступ'],
    description: 'Модель с усиленным reasoning. Лучший выбор для задач, требующих глубокого анализа.',
    website: 'https://openai.com',
    icon: 'simple-icons:openai',
    badges: ['🧠 Reasoning King'],
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    company: 'DeepSeek',
    tier: 'S',
    price: 'Free',
    context: '64k',
    bestFor: ['Budget coding', 'Backend', 'Algorithms'],
    pros: ['Бесплатный', 'Отличное соотношение цена/качество', 'Хорош в бэкенде'],
    cons: ['Иногда хуже Claude', 'Ограниченный контекст'],
    description: 'Лучшая бесплатная альтернатива. Особенно сильна в бэкенде и алгоритмических задачах.',
    website: 'https://deepseek.com',
    icon: 'simple-icons:deepseek',
    badges: ['💰 Best Free'],
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    company: 'DeepSeek',
    tier: 'S',
    price: 'Free',
    context: '64k',
    bestFor: ['Reasoning'],
    pros: ['Очень хорошее мышление', 'Бесплатный', 'Open source'],
    cons: ['Медленнее V3', 'Требует больше токенов'],
    description: 'Reasoning-модель с открытым исходным кодом. Отличное качество мышления бесплатно.',
    website: 'https://deepseek.com',
    icon: 'simple-icons:deepseek',
    badges: [],
  },
  {
    id: 'gemini-flash',
    name: 'Gemini Flash',
    company: 'Google',
    tier: 'A',
    price: 'Free',
    context: '1M',
    bestFor: ['Speed'],
    pros: ['Очень быстрый', 'Огромный контекст', 'Бесплатный'],
    cons: ['Иногда теряет качество'],
    description: 'Сверхбыстрая модель от Google. Идеален, когда нужен результат моментально.',
    website: 'https://gemini.google.com',
    icon: 'simple-icons:google',
    badges: ['⚡ Fastest'],
  },
  {
    id: 'qwen-3',
    name: 'Qwen 3',
    company: 'Alibaba',
    tier: 'A',
    price: 'Free',
    context: '128k',
    bestFor: ['Open source'],
    pros: ['Бесплатный', 'Хорошая производительность', 'Open source'],
    cons: ['Не лидер рынка', 'Меньше интеграций'],
    description: 'Мощная open-source модель от Alibaba. Хороший баланс производительности и доступности.',
    website: 'https://qwenlm.ai',
    icon: 'simple-icons:alibabadotcom',
    badges: [],
  },
  {
    id: 'kimi-k2',
    name: 'Kimi K2',
    company: 'Moonshot AI',
    tier: 'A',
    price: 'Free',
    context: '256k',
    bestFor: ['Research'],
    pros: ['Хорошее качество', 'Большой контекст', 'Бесплатно'],
    cons: ['Не всегда стабилен', 'Редко обновляется'],
    description: 'Сильная бесплатная модель с огромным контекстом. Хороша для логики и алгоритмических задач.',
    website: 'https://kimi.ai',
    icon: 'K',
    badges: [],
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    company: 'Mistral AI',
    tier: 'A',
    price: 'Free/API',
    context: '128k',
    bestFor: ['General coding'],
    pros: ['Быстрый', 'Европейский (GDPR)', 'Хороший API'],
    cons: ['Уступает лидерам', 'Меньше экосистема'],
    description: 'Европейская альтернатива с отличным API. Хороша, если важна приватность данных и GDPR.',
    website: 'https://mistral.ai',
    icon: 'simple-icons:mistral',
    badges: [],
  },
  {
    id: 'glm',
    name: 'GLM',
    company: 'Zhipu AI',
    tier: 'A',
    price: 'Free/API',
    context: '128k',
    bestFor: ['Open source'],
    pros: ['Очень сильный среди open-source', 'Бесплатный API', 'Многоязычный'],
    cons: ['Меньшая популярность', 'Меньше документации'],
    description: 'Очень сильная open-source модель из Китая. Недооцененный игрок с отличными результатами.',
    website: 'https://z.ai',
    icon: 'Z',
    badges: [],
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    company: 'OpenAI',
    tier: 'A',
    price: '$20',
    context: '128k',
    bestFor: ['General coding'],
    pros: ['Универсальность', 'Быстрый', 'Отличная мультимодальность'],
    cons: ['Уступает новым моделям', 'Ограниченный контекст'],
    description: 'Универсальная модель для большинства задач. Хороший баланс скорости и качества.',
    website: 'https://chatgpt.com',
    icon: 'simple-icons:openai',
    badges: [],
  },
  {
    id: 'grok',
    name: 'Grok',
    company: 'xAI',
    tier: 'A',
    price: 'X Premium+',
    context: '128k',
    bestFor: ['Fast answers', 'Research'],
    pros: ['Быстрый', 'Доступ к реальному времени', 'Минимальные ограничения'],
    cons: ['Качество кода нестабильно', 'Требует подписку'],
    description: 'Единственная модель с доступом к реальному времени через X. Хорош для ресёрча и новостей.',
    website: 'https://grok.com',
    icon: 'simple-icons:x',
    badges: [],
  },
  {
    id: 'llama-4',
    name: 'Llama 4',
    company: 'Meta',
    tier: 'B',
    price: 'Free',
    context: '128k',
    bestFor: ['Open source'],
    pros: ['Open Source', 'Можно запустить локально', 'Большое сообщество'],
    cons: ['Качество ниже лидеров', 'Требует мощного железа'],
    description: 'Флагманская open-source модель от Meta. Отличный выбор для локального запуска и экспериментов.',
    website: 'https://ai.meta.com',
    icon: 'simple-icons:meta',
    badges: [],
  },
  // ============================
  // NEW MODELS — S TIER
  // ============================
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    company: 'Anthropic',
    tier: 'S',
    price: 'Max Plan',
    context: '200k',
    bestFor: ['Web', 'Backend', 'Architecture', 'Research'],
    pros: ['Отлично работает с большими проектами', 'Очень сильный reasoning', 'Хороший рефакторинг'],
    cons: ['Высокая стоимость', 'Медленнее Sonnet'],
    description: 'Флагманская модель Anthropic. Премиум качество для огромных проектов и сложной архитектуры.',
    website: 'https://claude.ai',
    icon: 'simple-icons:anthropic',
    badges: [],
  },
  {
    id: 'deepseek-v3-1',
    name: 'DeepSeek V3.1',
    company: 'DeepSeek',
    tier: 'S',
    price: 'Free / OpenRouter',
    context: '128k',
    bestFor: ['Free', 'Web', 'Backend', 'Open source'],
    pros: ['Отличное соотношение цена/качество', 'Быстрый', 'Хорошо пишет код'],
    cons: ['Уступает Claude'],
    description: 'Обновлённая версия V3. Ещё лучше баланс скорости и качества для бесплатной модели.',
    website: 'https://deepseek.com',
    icon: 'simple-icons:deepseek',
    badges: [],
  },
  {
    id: 'gpt-o3',
    name: 'GPT-o3',
    company: 'OpenAI',
    tier: 'S',
    price: 'ChatGPT Plus',
    context: '200k',
    bestFor: ['Agents', 'Research', 'Debugging'],
    pros: ['Лучший reasoning', 'Сложные задачи'],
    cons: ['Медленный'],
    description: 'Модель с усиленным reasoning от OpenAI. Лучший выбор для агентов и сложных задач.',
    website: 'https://chatgpt.com',
    icon: 'simple-icons:openai',
    badges: [],
  },
  // ============================
  // NEW MODELS — A TIER
  // ============================
  {
    id: 'qwen-coder',
    name: 'Qwen Coder',
    company: 'Alibaba',
    tier: 'A',
    price: 'Free',
    context: '128k',
    bestFor: ['Backend', 'Web'],
    pros: ['Специализация на коде'],
    cons: ['Не лидер рынка'],
    description: 'Специализированная версия Qwen для кодинга. Хороша для бэкенда и веб-разработки.',
    website: 'https://qwenlm.ai',
    icon: 'simple-icons:alibabadotcom',
    badges: [],
  },
  {
    id: 'grok-4',
    name: 'Grok 4',
    company: 'xAI',
    tier: 'A',
    price: 'Premium+',
    context: '128k',
    bestFor: ['Research'],
    pros: ['Быстрый', 'Хороший reasoning'],
    cons: ['Качество кода нестабильно'],
    description: 'Обновлённая версия Grok. Улучшенное мышление и доступ к реальному времени.',
    website: 'https://grok.com',
    icon: 'simple-icons:x',
    badges: [],
  },
  {
    id: 'glm-4-5',
    name: 'GLM-4.5',
    company: 'Zhipu AI',
    tier: 'A',
    price: 'Free/API',
    context: '128k',
    bestFor: ['Research', 'Open source'],
    pros: ['Сильный open-source', 'Хороший reasoning'],
    cons: ['Менее популярен'],
    description: 'Обновлённая версия GLM. Один из сильнейших open-source моделей из Китая.',
    website: 'https://z.ai',
    icon: 'Z',
    badges: [],
  },
  {
    id: 'command-r-plus',
    name: 'Command R+',
    company: 'Cohere',
    tier: 'A',
    price: 'API',
    context: '128k',
    bestFor: ['Research'],
    pros: ['Хороший RAG', 'Отличная работа с документами'],
    cons: ['Слабее Claude'],
    description: 'Мощная модель от Cohere с отличным RAG. Хороша для работы с документами и ресёрча.',
    website: 'https://cohere.com',
    icon: 'C',
    badges: [],
  },
  {
    id: 'perplexity-sonar',
    name: 'Perplexity Sonar',
    company: 'Perplexity',
    tier: 'A',
    price: 'Free',
    context: '128k',
    bestFor: ['Research'],
    pros: ['Отличный поиск', 'Доступ к интернету'],
    cons: ['Не лучший кодинг'],
    description: 'Модель с интегрированным поиском. Лучший выбор для ресёрча с доступом к актуальным данным.',
    website: 'https://perplexity.ai',
    icon: 'P',
    badges: [],
  },
  {
    id: 'deepseek-coder',
    name: 'DeepSeek Coder',
    company: 'DeepSeek',
    tier: 'A',
    price: 'Free',
    context: '64k',
    bestFor: ['Backend', 'Open source'],
    pros: ['Хороший кодинг', 'Специализирован на коде'],
    cons: ['Уступает Claude'],
    description: 'Специализированная модель для кодинга от DeepSeek. Отличное качество для бесплатной модели.',
    website: 'https://deepseek.com',
    icon: 'simple-icons:deepseek',
    badges: [],
  },
  // ============================
  // NEW MODELS — B TIER
  // ============================
  {
    id: 'gemma-3',
    name: 'Gemma 3',
    company: 'Google',
    tier: 'B',
    price: 'Free',
    context: '128k',
    bestFor: ['Open source', 'Free'],
    pros: ['Легкая модель', 'Можно запустить локально'],
    cons: ['Ограниченные возможности'],
    description: 'Лёгкая open-source модель от Google. Хороший выбор для локального запуска на слабом железе.',
    website: 'https://ai.google.dev',
    icon: 'simple-icons:google',
    badges: [],
  },
  {
    id: 'phi-4',
    name: 'Phi-4',
    company: 'Microsoft',
    tier: 'B',
    price: 'Free',
    context: '128k',
    bestFor: ['Open source', 'Free'],
    pros: ['Компактная', 'Хорошая производительность'],
    cons: ['Слабее больших моделей'],
    description: 'Компактная open-source модель от Microsoft. Хороший баланс размера и качества.',
    website: 'https://microsoft.com',
    icon: 'simple-icons:microsoft',
    badges: [],
  },
  {
    id: 'yi-lightning',
    name: 'Yi Lightning',
    company: '01.AI',
    tier: 'B',
    price: 'Free',
    context: '128k',
    bestFor: ['Open source'],
    pros: ['Быстрая', 'Хорошая производительность'],
    cons: ['Меньшая популярность'],
    description: 'Быстрая open-source модель от 01.AI. Хороший выбор для задач, где важна скорость.',
    website: 'https://01.ai',
    icon: 'Y',
    badges: [],
  },
  {
    id: 'minimax-m1',
    name: 'MiniMax M1',
    company: 'MiniMax',
    tier: 'B',
    price: 'API',
    context: '256k',
    bestFor: ['Agents'],
    pros: ['Хорошо подходит для агентов', 'Большой контекст'],
    cons: ['Небольшая экосистема'],
    description: 'Модель от MiniMax, специализированная на агентных задачах. Большое контекстное окно.',
    website: 'https://minimax.io',
    icon: 'M',
    badges: [],
  },
  {
    id: 'nemotron',
    name: 'Nemotron',
    company: 'NVIDIA',
    tier: 'B',
    price: 'Free',
    context: '128k',
    bestFor: ['Open source'],
    pros: ['Хороший reasoning', 'Оптимизирован для GPU'],
    cons: ['Пока редко используется'],
    description: 'Open-source модель от NVIDIA. Оптимизирована для запуска на GPU и хорошо справляется с reasoning.',
    website: 'https://nvidia.com',
    icon: 'simple-icons:nvidia',
    badges: [],
  },
  {
    id: 'openchat',
    name: 'OpenChat',
    company: 'OpenChat',
    tier: 'B',
    price: 'Free',
    context: '8k',
    bestFor: ['Open source', 'Free'],
    pros: ['Полностью открытый', 'Простой в развёртывании'],
    cons: ['Уступает лидерам'],
    description: 'Полностью открытая модель с простым развёртыванием. Хороший выбор для экспериментов.',
    website: 'https://openchat.team',
    icon: 'O',
    badges: [],
  },
  {
    id: 'dolphin',
    name: 'Dolphin',
    company: 'Hugging Face',
    tier: 'B',
    price: 'Free',
    context: '32k',
    bestFor: ['Open source'],
    pros: ['Популярен в сообществе', 'Хорошая документация'],
    cons: ['Нестабильное качество'],
    description: 'Популярная community модель на Hugging Face. Хорошо документирована и активно развивается.',
    website: 'https://huggingface.co',
    icon: 'simple-icons:huggingface',
    badges: [],
  },
  {
    id: 'nous-hermes',
    name: 'Nous Hermes',
    company: 'Nous Research',
    tier: 'B',
    price: 'Free',
    context: '32k',
    bestFor: ['Open source'],
    pros: ['Хорошая community модель', 'Активно развивается'],
    cons: ['Уступает S-tier'],
    description: 'Модель от Nous Research с активным сообществом. Хороший выбор для экспериментов и open-source проектов.',
    website: 'https://nousresearch.com',
    icon: 'N',
    badges: [],
  },
]

// ============================
// HELPERS
// ============================

const tierColor: Record<Tier, string> = {
  'S+': '#f59e0b',
  S: '#10b981',
  A: '#3b82f6',
  B: '#8b5cf6',
}

const categoryIcons: Record<string, React.ReactNode> = {
  Web: <Globe className="w-3 h-3" />,
  Frontend: <Code2 className="w-3 h-3" />,
  Backend: <Server className="w-3 h-3" />,
  'Telegram Bots': <Bot className="w-3 h-3" />,
  Web3: <Hexagon className="w-3 h-3" />,
  Agents: <Brain className="w-3 h-3" />,
  Debugging: <Bug className="w-3 h-3" />,
  Architecture: <Crown className="w-3 h-3" />,
  Reasoning: <Brain className="w-3 h-3" />,
  'Long context': <Layers className="w-3 h-3" />,
  'Large Projects': <Layers className="w-3 h-3" />,
  'General coding': <Code2 className="w-3 h-3" />,
  Brainstorming: <Brain className="w-3 h-3" />,
  Speed: <Zap className="w-3 h-3" />,
  'Complex tasks': <Brain className="w-3 h-3" />,
  'Budget coding': <DollarSign className="w-3 h-3" />,
  'Fast answers': <Zap className="w-3 h-3" />,
  Research: <Brain className="w-3 h-3" />,
  'Open source': <Code2 className="w-3 h-3" />,
  Refactoring: <Code2 className="w-3 h-3" />,
  Algorithms: <Brain className="w-3 h-3" />,
  Free: <DollarSign className="w-3 h-3" />,
}

// ============================
// DIALOG COMPONENT
// ============================

function ModelDialog({ model, onClose }: { model: Model; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const color = tierColor[model.tier]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow-2xl"
        style={{ boxShadow: `0 0 60px ${color}15` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header glow */}
        <div
          className="absolute top-0 left-0 right-0 h-32 rounded-t-2xl opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}40 0%, transparent 70%)` }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/50 border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: color + '15', border: `1px solid ${color}30` }}
            >
              {model.icon.length === 1 ? (
                <span className="text-xl font-bold" style={{ color }}>
                  {model.icon}
                </span>
              ) : (
                <Icon icon={model.icon} className="w-7 h-7" style={{ color }} />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-xl font-bold tracking-tight">{model.name}</h2>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase"
                  style={{ backgroundColor: color + '15', color, border: `1px solid ${color}30` }}
                >
                  {model.tier}
                </span>
              </div>
              <p className="text-sm text-foreground/50">{model.company}</p>
            </div>
          </div>

          {/* Badges */}
          {model.badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {model.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium border"
                  style={{
                    backgroundColor: color + '10',
                    borderColor: color + '25',
                    color: color + 'cc',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mb-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2">Описание</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">{model.description}</p>
          </div>

          {/* Price & Context */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="rounded-lg border border-border/50 bg-background/50 p-3">
              <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Цена</p>
              <p className="text-sm font-semibold">{model.price}</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-background/50 p-3">
              <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Context Window</p>
              <p className="text-sm font-semibold">{model.context}</p>
            </div>
          </div>

          {/* Best For */}
          <div className="mb-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2">Лучшее применение</h3>
            <div className="flex flex-wrap gap-1.5">
              {model.bestFor.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] border border-border/50 bg-background/30"
                >
                  {categoryIcons[item] || <Star className="w-3 h-3" />}
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Pros */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2">Плюсы</h3>
            <ul className="space-y-1.5">
              {model.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                  <Check className="w-3.5 h-3.5 mt-0.5 text-emerald-400 shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2">Минусы</h3>
            <ul className="space-y-1.5">
              {model.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                  <XCircle className="w-3.5 h-3.5 mt-0.5 text-red-400 shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>

          {/* Website button */}
          <a
            href={model.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: color, color: '#000' }}
          >
            <ExternalLink className="w-4 h-4" />
            Visit Website
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================
// MODEL CARD
// ============================

function ModelCard({ model, onClick }: { model: Model; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const color = tierColor[model.tier]

  return (
    <motion.button
      layout
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-full text-left rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 transition-all duration-300 flex flex-col justify-between items-start h-[148px]"
      style={{
        boxShadow: hovered ? `0 0 30px ${color}15, 0 4px 20px rgba(0,0,0,0.2)` : '0 2px 8px rgba(0,0,0,0.1)',
        borderColor: hovered ? `${color}40` : undefined,
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}08 0%, transparent 70%)` }}
      />

      <div className="relative w-full h-full flex flex-col justify-between">
        {/* Top row: icon + name + tier */}
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: color + '12', border: `1px solid ${color}20` }}
          >
            {model.icon.length === 1 ? (
              <span className="text-sm font-bold" style={{ color }}>
                {model.icon}
              </span>
            ) : (
              <Icon icon={model.icon} className="w-5 h-5" style={{ color }} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-semibold text-sm tracking-tight truncate">{model.name}</h3>
              <span
                className="px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase shrink-0"
                style={{ backgroundColor: color + '15', color, border: `1px solid ${color}25` }}
              >
                {model.tier}
              </span>
            </div>
            <p className="text-[11px] text-foreground/40">{model.company}</p>
          </div>
        </div>

        {/* Badges — always takes space */}
        <div className="flex flex-wrap gap-1 min-h-[22px]">
          {model.badges.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium border"
              style={{
                backgroundColor: color + '08',
                borderColor: color + '20',
                color: color + 'bb',
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom row: price + context */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-foreground/50 font-medium">{model.price}</span>
          <span className="text-foreground/20">·</span>
          <span className="text-[11px] text-foreground/40">{model.context}</span>
        </div>
      </div>
    </motion.button>
  )
}

// ============================
// MAIN PAGE
// ============================

export default function AIToolsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)

  const filteredModels = useMemo(() => {
    if (activeCategory === 'all') return models
    if (activeCategory === 'free') return models.filter((m) => m.price.toLowerCase().includes('free'))
    if (activeCategory === 'open-source') return models.filter((m) => m.bestFor.some((b) => b.toLowerCase().includes('open source')))
    if (activeCategory === 'general') return models.filter((m) => m.bestFor.some((b) => b.toLowerCase().includes('general')))
    return models.filter((m) => m.bestFor.some((b) => b.toLowerCase().includes(activeCategory)))
  }, [activeCategory])

  const groupedByTier = useMemo(() => {
    const grouped: Record<Tier, Model[]> = { 'S+': [], S: [], A: [], B: [] }
    for (const model of filteredModels) {
      grouped[model.tier].push(model)
    }
    return grouped
  }, [filteredModels])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
      <FadeInView>
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">AI Tier List</h1>
          <p className="text-sm text-foreground/50 max-w-xl">
            Ранжированные AI-модели для разработки. Проверены лично, обновляются по мере выхода новых версий.
          </p>
        </div>
      </FadeInView>

      {/* Category pills */}
      <FadeInView delay={0.1}>
        <div className="flex flex-wrap gap-1.5 mb-8 sm:mb-10">
          {categories.map((cat) => {
            const IconComp = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border"
                style={{
                  backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? '#000' : 'var(--foreground)',
                  borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                <IconComp className="w-3 h-3" />
                {cat.label}
              </button>
            )
          })}
        </div>
      </FadeInView>

      {/* Models by tier */}
      <div className="space-y-8 sm:space-y-10">
        {tierOrder.map(
          (tier) =>
            groupedByTier[tier].length > 0 && (
              <FadeInView key={tier} delay={0.15}>
                <div>
                  {/* Tier header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase"
                      style={{
                        backgroundColor: tierColor[tier] + '15',
                        color: tierColor[tier],
                        border: `1px solid ${tierColor[tier]}30`,
                      }}
                    >
                      {tier}
                    </div>
                    <div
                      className="h-px flex-1"
                      style={{ backgroundColor: tierColor[tier] + '15' }}
                    />
                    <span className="text-[11px] text-foreground/30">
                      {groupedByTier[tier].length} models
                    </span>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    <AnimatePresence mode="popLayout">
                      {groupedByTier[tier].map((model) => (
                        <motion.div
                          key={model.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="h-full"
                        >
                          <ModelCard model={model} onClick={() => setSelectedModel(model)} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </FadeInView>
            )
        )}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-foreground/40">Нет моделей в этой категории</p>
        </div>
      )}

      {/* Dialog */}
      <AnimatePresence>
        {selectedModel && (
          <ModelDialog model={selectedModel} onClose={() => setSelectedModel(null)} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <FadeInView delay={0.3}>
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-foreground/30 text-center">
            Цены актуальны на момент создания. Модели развиваются быстро — проверяйте актуальность на официальных сайтах.
          </p>
        </div>
      </FadeInView>
    </div>
  )
}
