'use client'

import { useEffect, useRef } from 'react'
import { useCursor } from '@/app/cursor-context'

export default function CursorGlow() {
  const { enabled } = useCursor()
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    let raf: number
    const animate = () => {
      const outerLerp = 0.06
      const innerLerp = 0.12

      pos.current.x += (target.current.x - pos.current.x) * outerLerp
      pos.current.y += (target.current.y - pos.current.y) * outerLerp

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${pos.current.x - 300}px, ${pos.current.y - 300}px)`
      }

      const innerX = target.current.x + (pos.current.x - target.current.x) * 0.5
      const innerY = target.current.y + (pos.current.y - target.current.y) * 0.5
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${innerX - 75}px, ${innerY - 75}px)`
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'radial-gradient(circle, rgba(120,80,255,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-[150px] h-[150px] rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'radial-gradient(circle, rgba(180,120,255,0.18) 0%, transparent 70%)',
          filter: 'blur(15px)',
          mixBlendMode: 'screen',
        }}
      />
    </>
  )
}
