'use client'

import { useEffect, useRef } from 'react'
import { useCursor } from '@/app/cursor-context'

export default function CursorGlow() {
  const { enabled } = useCursor()
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const outerPos = useRef({ x: 0, y: 0 })
  const innerPos = useRef({ x: 0, y: 0 })
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
      const innerLerp = 0.18

      outerPos.current.x += (target.current.x - outerPos.current.x) * outerLerp
      outerPos.current.y += (target.current.y - outerPos.current.y) * outerLerp

      innerPos.current.x += (target.current.x - innerPos.current.x) * innerLerp
      innerPos.current.y += (target.current.y - innerPos.current.y) * innerLerp

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x - 300}px, ${outerPos.current.y - 300}px)`
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${innerPos.current.x - 75}px, ${innerPos.current.y - 75}px)`
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
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[9999] cursor-glow-outer"
      />
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-[150px] h-[150px] rounded-full pointer-events-none z-[9999] cursor-glow-inner"
      />
    </>
  )
}
