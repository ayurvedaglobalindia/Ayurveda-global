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
        // Authentic Ayurvedic Apothecary Palette — Warm Ivory/Off-White, Deep Charcoal, #999999 Neutral Gray, Muted Earthy Sage & Antique Gold
        ayur: {
          black: '#1C1D1F',
          void: '#FAF7F2',
          obsidian: '#F5F1EB',
          charcoal: '#EFEAE2',
          forest: '#F2EDE5',
          'forest-deep': '#FFFFFF',
          'forest-dark': '#FAF7F2',
          'forest-light': '#FBF9F5',
          'emerald-dark': '#E9EFEA',
          'emerald-deep': '#F1F6F2',
          'emerald-card': '#FFFFFF',

          // Explicit #999999 Neutral Gray
          gray: '#999999',
          'gray-soft': '#999999',
          'gray-light': '#737373',
          'gray-deep': '#404040',
          'gray-muted': '#999999',

          // Muted Earthy Nature Green (Soft Sage / Olive, Zero Neon)
          herbal: '#4E5F52',
          'herbal-soft': '#586D5E',
          'herbal-glow': '#445347',
          'herbal-light': '#EBF1EC',
          'herbal-dew': '#F2F6F3',
          sage: '#4E5F52',
          'sage-light': '#EBF1EC',
          'mint-soft': '#F4F8F5',
          'soft-green': '#DDE7E0',
          moss: '#4E5F52',
          leaf: '#586D5E',
          herb: '#445347',

          // Warm Ivory & Soft Light Surfaces
          ivory: '#FAF7F2',
          cream: '#1C1D1F',
          beige: '#F4EFEA',
          sand: '#666666',
          stone: '#737373',
          'stone-light': '#E2DDD5',

          // Muted Warm Antique Gold (Micro-Accents Only)
          gold: '#9E8047',
          'gold-light': '#B39255',
          'gold-soft': '#C4A66B',
          'gold-bright': '#9E8047',
          'gold-deep': '#856A35',
          'gold-amber': '#9E8047',
          'gold-champagne': '#F7F3EB',
          copper: '#B87A44',
          earth: '#7A6258',

          // Semantic
          crimson: '#9E2A2B',
          'crimson-light': '#C84B4C',
          'crimson-deep': '#701D1E',
          ruby: '#9E2A2B',
          'ruby-light': '#C84B4C',
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
        'emerald-gradient': 'linear-gradient(135deg, #181D26 0%, #10131A 50%, #080A0D 100%)',
        'light-green-gradient': 'linear-gradient(135deg, #34D399 0%, #10B981 50%, #059669 100%)',
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
        'emerald': '0 0 30px rgba(52, 211, 153, 0.25)',
        'card': '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'card-hover': '0 24px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(52, 211, 153, 0.15)',
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