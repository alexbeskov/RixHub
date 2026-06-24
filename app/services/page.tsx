'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ExternalLink,
  Server,
  CreditCard,
  Bot,
  Wrench,
  Zap,
} from 'lucide-react'
import FadeInView from '@/components/FadeInView'

// ============================
// DATA
// ============================

const categories = [
  { id: 'all', label: 'Все', icon: Wrench },
  { id: 'vps', label: 'VPS / Хостинг', icon: Server },
  { id: 'pay', label: 'Pay / Оплата', icon: CreditCard },
  { id: 'agent', label: 'Agent', icon: Bot },
  { id: 'useful', label: 'Полезно', icon: Zap },
]

interface Service {
  id: string
  name: string
  description: string
  fullDescription: string
  category: string
  website: string
  icon: React.ReactNode
}

const services: Service[] = [
  {
    id: 'claude-reg',
    name: 'Claude Reg',
    description: 'Тг бот для оплаты подписок клода и других ИИ.',
    fullDescription:
      'Удобный тг бот для оплаты подписок клода и других ИИ. Маленький % комиссии, очень удобен если ты новичок. Сам лично покупал тут подписку на клод — всё прошло топчик.',
    category: 'pay',
    website: 'https://t.me/claude_reg_bot?start=r_10517931',
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: 'zarub',
    name: 'Zarub',
    description: 'Виртуальные карты EU стран без KYC.',
    fullDescription:
      'Удобнейший сервис для выпуска виртуальных карт EU стран, не нужен KYC. Из минусов — очень много комиссий: при пополнении баланса, потом комиссия при пополнении выпущенной карты. Но тем не менее штука удобная, пользуюсь на постоянке.',
    category: 'pay',
    website: 'https://t.me/zarub_robot?start=ref_Xnbo8f',
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: 'mira',
    name: 'Mira',
    description: 'AI агент внутри Telegram.',
    fullDescription:
      'Древний, но надёжный AI агент внутри вашего Telegram. Сделан в виде аппа. Может давать вам разные напоминалки, скидывать новости по нужным дедлайнам и многое другое. Вы с ней можете просто чатиться, а ещё при покупке подписки по СБП можно клод код получить.',
    category: 'agent',
    website: 'https://t.me/mira',
    icon: <Bot className="w-5 h-5" />,
  },
  {
    id: 'asati-kyc',
    name: 'Asati KYC',
    description: 'Тг бот для верификации KYC на Web3 биржах.',
    fullDescription:
      'Тг бот для прохождения верификации KYC на разных Web3 биржах. Ценники не кусаются и очень быстро всё делают. В своё время покупал у них KYC для BingX.',
    category: 'useful',
    website: 'https://t.me/asati_KYC_bot?start=ref_1196974146',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 'n8n-automatisation',
    name: 'Автоматизация в N8N',
    description: 'Подборка автоматизаций для n8n.',
    fullDescription:
      'Подборка из разных автоматизаций для n8n. Считаю, что по сути этот сервис ещё жив, и если вдруг заходите его постигнуть — данный канал будет крайне удобен.',
    category: 'useful',
    website: 'https://t.me/N8N_automatisation',
    icon: <Zap className="w-5 h-5" />,
  },
]

// ============================
// DIALOG COMPONENT
// ============================

function ServiceDialog({ service, onClose }: { service: Service; onClose: () => void }) {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow-2xl"
        style={{ boxShadow: '0 0 60px rgba(168, 85, 247, 0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/50 border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent/10 border border-accent/20 text-accent">
              {service.icon}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-tight">{service.name}</h2>
              <p className="text-sm text-foreground/50 mt-0.5">{service.description}</p>
            </div>
          </div>

          {/* Full description */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/40 mb-2">Описание</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">{service.fullDescription}</p>
          </div>

          {/* Website button */}
          <a
            href={service.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-90 bg-accent text-black"
          >
            <ExternalLink className="w-4 h-4" />
            Открыть
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================
// SERVICE CARD
// ============================

function ServiceCard({ service, onClick }: { service: Service; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      layout
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-full text-left rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 transition-all duration-300"
      style={{
        boxShadow: hovered
          ? '0 0 30px rgba(168, 85, 247, 0.1), 0 4px 20px rgba(0,0,0,0.2)'
          : '0 2px 8px rgba(0,0,0,0.08)',
        borderColor: hovered ? 'rgba(168, 85, 247, 0.25)' : undefined,
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative flex items-center gap-3">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent/10 border border-accent/15 text-accent shrink-0">
          {service.icon}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm tracking-tight truncate">{service.name}</h3>
          <p className="text-[11px] text-foreground/50 mt-0.5 line-clamp-1">{service.description}</p>
        </div>

        {/* Arrow */}
        <ExternalLink className="w-3.5 h-3.5 text-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </div>
    </motion.button>
  )
}

// ============================
// MAIN PAGE
// ============================

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return services
    return services.filter((s) => s.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12">
      <FadeInView>
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Сервисы</h1>
          <p className="text-sm text-foreground/50 max-w-xl">
            Проверенные сервисы, которые использую лично. Каждый протестирован — рекомендую с чистой совестью.
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

      {/* Services grid */}
      <FadeInView delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ServiceCard service={service} onClick={() => setSelectedService(service)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </FadeInView>

      {filteredServices.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-foreground/40">Нет сервисов в этой категории</p>
        </div>
      )}

      {/* Dialog */}
      <AnimatePresence>
        {selectedService && (
          <ServiceDialog service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <FadeInView delay={0.3}>
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-foreground/30 text-center">
            Все сервисы проверены лично. Переходите по ссылкам на свой страх и риск, но я доверяю.
          </p>
        </div>
      </FadeInView>
    </div>
  )
}
