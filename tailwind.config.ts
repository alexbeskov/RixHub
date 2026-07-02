import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'foreground-dim': 'var(--foreground-dim)',
        'foreground-muted': 'var(--foreground-muted)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        'accent-light': 'var(--accent-light)',
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
        muted: 'var(--muted)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        success: 'var(--success)',
      },
      borderRadius: {
        'rix': '0.5rem',
        'rix-lg': '0.75rem',
        'rix-xl': '1rem',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
