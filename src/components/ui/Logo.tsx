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
    default: { icon: 32, text: 'text-base' },
    header: { icon: 28, text: 'text-base md:text-lg' },
    footer: { icon: 34, text: 'text-lg' },
    compact: { icon: 22, text: 'text-sm' },
  }

  const { icon, text } = sizes[variant]

  return (
    <div className={classNames('flex items-center gap-2.5', animate && 'group', className)}>
      <div className={classNames(
        'relative flex items-center justify-center bg-transparent',
        animate && 'group-hover:scale-105 transition-transform duration-500',
        variant === 'compact' && 'w-6 h-6',
        variant === 'header' && 'w-7 h-7 sm:w-8 sm:h-8',
        variant === 'footer' && 'w-8 h-8 sm:w-9 sm:h-9',
        variant === 'default' && 'w-8 h-8'
      )}>
        <Image
          src="/images/logo.png"
          alt="Ayur Veda Global"
          width={icon}
          height={icon}
          className={classNames(
            'relative object-contain filter drop-shadow-[0_2px_6px_rgba(194,162,101,0.25)]',
            variant === 'compact' && 'w-6 h-6',
            variant === 'header' && 'w-7 h-7 sm:w-8 sm:h-8',
            variant === 'footer' && 'w-8 h-8 sm:w-9 sm:h-9',
            variant === 'default' && 'w-8 h-8'
          )}
          priority={variant === 'header'}
        />
      </div>
      {showText && (
        <span className={classNames(
          'font-heading font-medium text-ayur-cream tracking-tight',
          text,
          variant === 'header' && 'hidden sm:block text-ayur-cream'
        )}>
          Ayur Veda Global
        </span>
      )}
    </div>
  )
}