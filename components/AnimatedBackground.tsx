'use client'

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    const DOT_COUNT = 250
    const CONNECT_DIST = 120
    const dots: Dot[] = []

    for (let i = 0; i < DOT_COUNT; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() + 1,
        opacity: Math.random() * 0.3 + 0.3,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update positions
      for (const dot of dots) {
        dot.x += dot.vx
        dot.y += dot.vy

        if (dot.x < 0 || dot.x > width) dot.vx *= -1
        if (dot.y < 0 || dot.y > height) dot.vy *= -1
      }

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECT_DIST) {
            const opacity = (1 - dist / CONNECT_DIST) * 0.15
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(200, 200, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw dots
      for (const dot of dots) {
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`
        ctx.fill()
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #0d0d1a 0%, #050508 70%)',
      }}
    />
  )
}
