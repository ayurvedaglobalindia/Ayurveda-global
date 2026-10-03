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
        // Luxury Ayurvedic Color Palette
        ayur: {
          black: '#0A120D',
          // Deep Emerald Greens
          void: '#010804',
          obsidian: '#030F07',
          charcoal: '#061A10',
          forest: '#0A2E1E',
          'forest-deep': '#052014',
          'forest-dark': '#04180E',
          'forest-light': '#124A30',
          'emerald-dark': '#041C0F',
          'emerald-deep': '#082C1A',
          'emerald-card': '#0C3822',
          'emerald-glow': '#1A6B3A',
          sage: '#2E8B3A',
          'sage-light': '#4DB85E',
          'mint-soft': '#E8F5ED',
          'soft-green': '#D7E9DE',
          moss: '#4C8A3F',

          // Ivory & Cream Neutrals
          ivory: '#FAF7EF',
          cream: '#FFFDF5',
          beige: '#F5EFE1',
          sand: '#E8DCC8',
          stone: '#A89F91',
          'stone-light': '#C4BDB1',

          // Luxury Gold Accents
          gold: '#C9A84C',
          'gold-light': '#E8D4A0',
          'gold-bright': '#FFDF73',
          'gold-deep': '#B8963E',
          'gold-amber': '#D9A336',
          'gold-champagne': '#F0E6D0',
          copper: '#B87333',

          // Botanical Accents
          leaf: '#1A6B3A',
          herb: '#1B5E20',
          earth: '#8D6E63',

          // Semantic
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
        'wood-grain': "url('/images/textures/wood-grain.svg')",
        'stone-noise': "url('/images/textures/stone-noise.svg')",
        'botanical-lines': "url('/images/textures/botanical-lines.svg')",
        'hero-pattern': "url('/images/textures/botanical-lines.svg')",
        'gold-gradient': 'linear-gradient(135deg, #E8D4A0 0%, #C9A84C 50%, #B8963E 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #0A2E1E 0%, #052014 50%, #010804 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #FAF7EF 0%, #F5EFE1 100%)',
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
        'float-3d': 'float3D 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'scale-in': 'scaleIn 0.4s ease-out',
        'rotate-in': 'rotateIn 0.6s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'spin-360': 'spin360 15s linear infinite',
        'gold-glow': 'goldGlow 3s ease-in-out infinite alternate',
        'morph': 'morph 8s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
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
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.35)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201, 168, 76, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(0.8deg)' },
        },
        float3D: {
          '0%, 100%': { transform: 'translateY(0px) rotateY(0deg)' },
          '50%': { transform: 'translateY(-8px) rotateY(8deg)' },
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
        spin360: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        goldGlow: {
          '0%': { filter: 'drop-shadow(0 0 8px rgba(201, 168, 76, 0.25))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(201, 168, 76, 0.45))' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.2)',
        'strong': '0 16px 48px rgba(0, 0, 0, 0.35)',
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(201, 168, 76, 0.1)',
        'gold': '0 0 25px rgba(201, 168, 76, 0.3)',
        'gold-lg': '0 0 45px rgba(201, 168, 76, 0.2)',
        'inner-gold': 'inset 0 0 25px rgba(201, 168, 76, 0.12)',
        'emerald': '0 0 30px rgba(26, 107, 58, 0.3)',
        'card': '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'card-hover': '0 24px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(201, 168, 76, 0.15)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [],
}
export default config