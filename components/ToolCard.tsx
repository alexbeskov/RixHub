'use client'

import Link from 'next/link'

interface ToolCardProps {
  href: string
  icon: string
  title: string
  type: string
  description: string
  delay?: number
}

export default function ToolCard({ href, icon, title, type, description, delay = 0 }: ToolCardProps) {
  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {}

  return (
    <Link href={href} className="tool-card-wrap block" style={delayStyle}>
      <div className="card-glow-outer" />
      <div className="card-glow-border" />
      <div className="tool-card group">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-[12px] overflow-hidden bg-card-hover flex items-center justify-center shrink-0">
            <span className="text-xl">{icon}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-accent transition-colors">
              {title}
            </h3>
            <div className="mt-0.5 text-[12px] leading-tight">
              <span className="text-foreground-dim">Тип: </span>
              <span className="font-semibold text-accent text-[13px]">{type}</span>
            </div>
          </div>
        </div>
        <p className="text-[12px] text-foreground-muted leading-relaxed line-clamp-2 mt-2">
          {description}
        </p>
      </div>
    </Link>
  )
}
