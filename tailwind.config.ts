import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ayur: {
          black: '#0A0A0A',
          charcoal: '#121212',
          forest: '#1B3A2F',
          'forest-deep': '#0B211A',
          sage: '#2E7D32',
          'sage-light': '#529E65',
          'mint-soft': '#E8F3ED',
          'soft-green': '#D7E9DE',
          moss: '#558B2F',
          cream: '#FFFDF8',
          beige: '#F5F0E1',
          sand: '#E8DCC8',
          stone: '#BCAA95',
          gold: '#C9A84C',
          'gold-light': '#E8D4A0',
          'gold-deep': '#B8963E',
          copper: '#B87333',
          leaf: '#1B5E20',
          herb: '#2E7D32',
          earth: '#8D6E63',
          crimson: '#8B0000',
          'crimson-light': '#B71C1C',
          'crimson-deep': '#5D0000',
          ruby: '#C0392B',
          'ruby-light': '#E74C3C',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'wood-grain': "url('/images/textures/wood-grain.png')",
        'stone-noise': "url('/images/textures/stone-noise.png')",
        'botanical-lines': "url('/images/textures/botanical-lines.svg')",
        'hero-pattern': "url('/images/textures/botanical-lines.svg')",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.4s ease-out',
        'rotate-in': 'rotateIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.4)' },
          '50%': { boxShadow: '0 0 0 15px rgba(201, 168, 76, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-5deg) scale(0.95)' },
          '100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(10, 10, 10, 0.06)',
        'medium': '0 8px 24px rgba(10, 10, 10, 0.1)',
        'strong': '0 16px 48px rgba(10, 10, 10, 0.14)',
        'gold': '0 0 30px rgba(201, 168, 76, 0.35)',
        'gold-lg': '0 0 60px rgba(201, 168, 76, 0.25)',
        'crimson': '0 0 30px rgba(139, 0, 0, 0.3)',
        'inner-gold': 'inset 0 0 30px rgba(201, 168, 76, 0.15)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}
export default config
