'use client'

interface PillProps {
  children: React.ReactNode
  className?: string
}

export default function Pill({ children, className = '' }: PillProps) {
  return (
    <span className={`pill ${className}`}>
      {children}
    </span>
  )
}
