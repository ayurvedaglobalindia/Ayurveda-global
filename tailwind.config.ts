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
          charcoal: '#1A1A1A',
          forest: '#1B3A2F',
          sage: '#4A7C59',
          moss: '#6B8E6E',
          cream: '#F5F0E8',
          beige: '#E8DCC8',
          sand: '#D4C4A8',
          stone: '#A89B8A',
          gold: '#C9A84C',
          'gold-light': '#E8D4A0',
          copper: '#B87333',
          leaf: '#2D5A3D',
          herb: '#5D8A6E',
          earth: '#8B7355',
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
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(201, 168, 76, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
