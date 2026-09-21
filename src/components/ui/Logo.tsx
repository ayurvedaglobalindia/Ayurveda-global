'use client'

import Image from 'next/image'
import { classNames } from '@/lib/utils/formatters'

interface LogoProps {
  variant?: 'default' | 'header' | 'footer' | 'compact'
  className?: string
  showText?: boolean
  animate?: boolean
}

export function Logo({ variant = 'default', className, showText = true, animate = false }: LogoProps) {
  const sizes = {
    default: { icon: 48, text: 'text-xl' },
    header: { icon: 40, text: 'text-xl md:text-2xl' },
    footer: { icon: 56, text: 'text-2xl lg:text-3xl' },
    compact: { icon: 32, text: 'text-lg' },
  }

  const { icon, text } = sizes[variant]

  return (
    <div className={classNames('flex items-center gap-3', animate && 'group', className)}>
      <div className={classNames(
        'relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-br from-ayur-forest via-ayur-sage to-ayur-moss',
        animate && 'group-hover:scale-105 transition-transform duration-500',
        variant === 'compact' && 'w-8 h-8',
        variant === 'header' && 'w-10 h-10 md:w-12 md:h-12',
        variant === 'footer' && 'w-14 h-14 lg:w-16 lg:h-16',
        variant === 'default' && 'w-12 h-12'
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-ayur-gold/20 to-ayur-copper/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Image
          src="/images/logo.png"
          alt="Ayur Veda Global"
          width={icon}
          height={icon}
          className={classNames(
            'relative object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]',
            variant === 'compact' && 'w-6 h-6',
            variant === 'header' && 'w-8 h-8 md:w-9 md:h-9',
            variant === 'footer' && 'w-10 h-10 lg:w-12 lg:h-12',
            variant === 'default' && 'w-9 h-9'
          )}
          priority={variant === 'header'}
        />
        {variant !== 'compact' && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-ayur-gold flex items-center justify-center border-2 border-ayur-black/20 animate-pulse-gold">
            <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-ayur-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
        )}
      </div>
      {showText && (
        <span className={classNames(
          'font-heading font-medium text-ayur-cream tracking-tight',
          text,
          variant === 'header' && 'hidden sm:block text-ayur-black'
        )}>
          Ayur Veda Global
        </span>
      )}
    </div>
  )
}