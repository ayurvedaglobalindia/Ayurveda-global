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
        'relative flex items-center justify-center bg-transparent',
        animate && 'group-hover:scale-105 transition-transform duration-500',
        variant === 'compact' && 'w-8 h-8',
        variant === 'header' && 'w-10 h-10 md:w-12 md:h-12',
        variant === 'footer' && 'w-14 h-14 lg:w-16 lg:h-16',
        variant === 'default' && 'w-12 h-12'
      )}>
        <Image
          src="/images/logo.png"
          alt="Ayur Veda Global"
          width={icon}
          height={icon}
          className={classNames(
            'relative object-contain',
            variant === 'compact' && 'w-8 h-8',
            variant === 'header' && 'w-10 h-10 md:w-12 md:h-12',
            variant === 'footer' && 'w-14 h-14 lg:w-16 lg:h-16',
            variant === 'default' && 'w-12 h-12'
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