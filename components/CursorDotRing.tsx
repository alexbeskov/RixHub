'use client'

import { useEffect, useRef, useState } from 'react'
import { useCursor } from '@/app/cursor-context'

export default function CursorDotRing() {
  const { enabled } = useCursor()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>()

  // Toggle system cursor visibility based on enabled state
  useEffect(() => {
    if (isTouchDevice) return
    if (enabled) {
      document.body.classList.add('custom-cursor-active')
    } else {
      document.body.classList.remove('custom-cursor-active')
    }
    return () => {
      document.body.classList.remove('custom-cursor-active')
    }
  }, [enabled, isTouchDevice])

  useEffect(() => {
    if (!enabled) return

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouch)
    if (isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%) scale(${isHovering ? 0 : 1})`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('button, a, [role="button"], input, textarea, select, label')
      if (interactive) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const related = e.relatedTarget as HTMLElement | null
      // Only clear if moving outside the interactive element entirely
      const interactive = target.closest('button, a, [role="button"], input, textarea, select, label')
      if (interactive && related && !interactive.contains(related)) {
        setIsHovering(false)
      }
    }

    const animate = () => {
      const lerp = 0.12
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp

      if (ringRef.current) {
        const scale = isHovering ? 2.5 : 1
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${scale})`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled, isHovering])

  // Update dot scale when hover changes without mousemove
  useEffect(() => {
    if (!enabled || isTouchDevice) return
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%) scale(${isHovering ? 0 : 1})`
    }
  }, [isHovering, enabled, isTouchDevice])

  if (!enabled || isTouchDevice) return null

  return (
    <>
      {/* Dot — follows instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none hidden lg:block"
        style={{
          width: 6,
          height: 6,
          backgroundColor: 'var(--accent)',
          borderRadius: '50%',
          zIndex: 9999,
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'transform 200ms ease, opacity 200ms ease',
          willChange: 'transform',
        }}
      />
      {/* Ring — follows with lerp */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none hidden lg:block"
        style={{
          width: 36,
          height: 36,
          backgroundColor: 'transparent',
          border: '1.5px solid var(--accent)',
          borderRadius: '50%',
          zIndex: 9998,
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: isHovering ? 1 : 0.6,
          transition: 'transform 200ms ease, opacity 200ms ease, border-color 200ms ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
