'use client'

import { useEffect, useRef, useState } from 'react'
import { useCursor } from '@/app/cursor-context'

export default function CursorDotRing() {
  const { enabled } = useCursor()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>()
  const hasInitPos = useRef(false)

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

    // Capture initial mouse position so cursor doesn't fly in from corner
    const initFromMouse = (e: MouseEvent) => {
      if (!hasInitPos.current) {
        mousePos.current = { x: e.clientX, y: e.clientY }
        ringPos.current = { x: e.clientX, y: e.clientY }
        hasInitPos.current = true
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    const animate = () => {
      const lerp = 0.15
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', initFromMouse, { once: true })
    document.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', initFromMouse)
      document.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled])

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
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      {/* Ring — follows with lerp */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none hidden lg:block"
        style={{
          width: 32,
          height: 32,
          backgroundColor: 'transparent',
          border: '1.5px solid var(--accent)',
          borderRadius: '50%',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: 0.8,
          willChange: 'transform',
        }}
      />
    </>
  )
}
