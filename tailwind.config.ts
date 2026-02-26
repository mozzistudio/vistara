import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-ibm-mono)', 'monospace'],
      },
      colors: {
        forest: {
          DEFAULT: '#2D7A4F',
          dark: '#1E5C3A',
          light: '#3A9462',
        },
        deep: {
          DEFAULT: '#0D2818',
          mid: '#132F1E',
        },
        mint: {
          paper: '#F4F9F4',
          light: '#E8F3E8',
          bg: '#EEF5EE',
        },
        neon: {
          mint: '#6EE7A0',
        },
        leaf: '#A3D9B5',
        border: '#D4E8D4',
        'border-light': '#E0EDE0',
        'text-dark': '#0D2818',
        'text-mid': '#1B2E1B',
        'text-muted': '#4A6B4A',
        'text-light': '#5A7A5A',
        'text-faint': '#6B8A6B',
        success: '#16A34A',
        alert: '#EF4444',
        warning: '#F59E0B',
        'wa-green': '#25D366',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
    },
  },
  plugins: [],
}

export default config
