'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    let raf: number
    const animate = () => {
      const lerp = 0.08
      pos.current.x += (target.current.x - pos.current.x) * lerp
      pos.current.y += (target.current.y - pos.current.y) * lerp

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 200}px, ${pos.current.y - 200}px)`
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[9999]"
      style={{
        background: 'radial-gradient(circle, var(--glow-color) 0%, transparent 70%)',
      }}
    />
  )
}
