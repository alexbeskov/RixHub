'use client'

interface RixHubLogoProps {
  size?: number
  className?: string
}

export default function RixHubLogo({ size = 28, className = '' }: RixHubLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <path
        d="M16 5L23 9V17L16 21L9 17V9L16 5Z"
        stroke="#22E7C4"
        strokeWidth="2"
      />
      <path
        d="M9 17L16 13L23 17"
        stroke="#22E7C4"
        strokeWidth="2"
      />
      <circle cx="16" cy="13" r="2.2" fill="#22E7C4" />
    </svg>
  )
}
