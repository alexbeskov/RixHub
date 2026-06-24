'use client'

import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  showCursor?: boolean
}

export default function TypewriterText({
  text,
  speed = 60,
  delay = 0,
  className = '',
  showCursor = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [showTypeCursor, setShowTypeCursor] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true)
      setShowTypeCursor(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      const hideTimer = setTimeout(() => setShowTypeCursor(false), 2000)
      return () => clearTimeout(hideTimer)
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(timer)
  }, [displayed, started, speed, text])

  return (
    <span className={className}>
      {displayed}
      {showCursor && showTypeCursor && (
        <span className="typewriter-cursor" />
      )}
    </span>
  )
}
