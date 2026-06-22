'use client'

import { useState, useEffect } from 'react'

interface NeonLogoProps {
  text: string
  size?: 'lg' | 'md'
  className?: string
}

export default function NeonLogo({ text, size = 'lg', className = '' }: NeonLogoProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className={className}>{text}</span>
  }

  const shadowIntensity = size === 'lg' ? 1 : 0.5

  return (
    <span
      className={`neon-logo neon-logo-${size} ${className}`}
      style={{
        textShadow: `
          0 0 ${7 * shadowIntensity}px #fff,
          0 0 ${10 * shadowIntensity}px #fff,
          0 0 ${21 * shadowIntensity}px #fff,
          0 0 ${42 * shadowIntensity}px #a855f7,
          0 0 ${82 * shadowIntensity}px #a855f7,
          0 0 ${92 * shadowIntensity}px #a855f7
        `,
      }}
    >
      {text}
    </span>
  )
}
