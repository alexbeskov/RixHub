'use client'

import { useState, useEffect } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 400)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      data-text={text}
      className={`glitch-text ${glitching ? 'glitching' : ''} ${className}`}
      aria-label={text}
    >
      {text}
    </span>
  )
}
