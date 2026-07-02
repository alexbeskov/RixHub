import Link from 'next/link'
import { ArrowRight, Bot, BookOpen, Gift, Sparkles, Wrench } from 'lucide-react'

const subtitle = 'AI-инструменты, промпты, лучшие нейросети бесплатно, сервисы и гайды для вайбкодеров'

const tags = [
  { title: 'AI-инструменты', href: '/ai-tools', icon: Bot },
  { title: 'Промпты', href: '/prompts', icon: Sparkles },
  { title: 'Нейросети бесплатно', href: '/free-steel', icon: Gift },
  { title: 'Сервисы', href: '/services', icon: Wrench },
  { title: 'Гайды', href: '/docs', icon: BookOpen },
]

export default function LandingPage() {
  return (
    <main
      className="relative min-h-[100dvh] overflow-hidden text-foreground"
      style={{
        background:
          'linear-gradient(135deg, rgba(4,7,13,0.98) 0%, rgba(3,14,16,0.98) 38%, rgba(10,5,17,0.98) 72%, rgba(4,5,10,0.98) 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, transparent 0%, rgba(34,211,238,0.10) 24%, transparent 45%, rgba(168,85,247,0.10) 68%, transparent 88%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.10) 0%, transparent 60%)',
        }}
      />

      <section className="relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col items-center justify-center px-4 py-12 text-center sm:px-8">
        <div className="mb-5 text-sm font-medium uppercase tracking-[0.28em] text-cyan-100/65">
          AI старт для билдеров
        </div>

        <h1 className="text-6xl font-black leading-none text-white sm:text-8xl">
          RixHub
        </h1>

        <h2 className="mx-auto mt-6 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-4xl">
          Твоя панель старта в AI-билдинг
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-foreground/65 sm:text-xl">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-black shadow-[0_0_28px_rgba(255,255,255,0.12)] transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-white/90 hover:shadow-[0_0_38px_rgba(255,255,255,0.22)] active:scale-[0.99]"
          >
            Начать
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <div className="text-sm text-foreground/40">
            Откроет основной каталог RixHub
          </div>
        </div>

        <div className="mt-9 flex max-w-4xl flex-wrap justify-center gap-3">
          {tags.map(({ title, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-3 text-sm text-foreground/80 backdrop-blur-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.04] hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-white hover:shadow-[0_0_26px_rgba(34,211,238,0.12)] active:scale-[0.99]"
            >
              <Icon className="h-4 w-4 text-cyan-300 transition duration-200 group-hover:scale-110 group-hover:text-cyan-200" />
              {title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
