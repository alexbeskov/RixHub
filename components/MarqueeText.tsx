'use client'

import { useEffect, useRef } from 'react'

interface MarqueeTextProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export default function MarqueeText({ children, speed = 30, className = '' }: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    let raf: number
    let offset = 0

    const animate = () => {
      offset -= speed / 60
      const contentWidth = content.scrollWidth / 2
      if (Math.abs(offset) >= contentWidth) {
        offset = 0
      }
      content.style.transform = `translateX(${offset}px)`
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [speed])

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={contentRef} className="inline-flex">
        <span className="inline-flex items-center gap-8 px-4">{children}</span>
        <span className="inline-flex items-center gap-8 px-4">{children}</span>
      </div>
    </div>
  )
}
