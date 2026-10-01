'use client'

import { classNames } from '@/lib/utils/formatters'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'emerald' | 'age' | 'sale' | 'new' | 'low-stock' | 'out-of-stock' | string
  className?: string
  customClass?: string
}

export function Badge({ children, variant = 'gold', className, customClass }: BadgeProps) {
  const variantStyles: Record<string, string> = {
    gold: 'bg-ayur-gold/15 text-ayur-gold-light border border-ayur-gold/30',
    emerald: 'bg-ayur-sage/15 text-ayur-sage-light border border-ayur-sage/30',
    age: 'bg-ayur-crimson/15 text-ayur-crimson-light border border-ayur-crimson/30',
    sale: 'bg-ayur-gold/15 text-ayur-gold-light border border-ayur-gold/30',
    new: 'bg-ayur-emerald-glow/20 text-ayur-sage-light border border-ayur-emerald-glow/40',
    'low-stock': 'bg-ayur-copper/15 text-ayur-copper border border-ayur-copper/30',
    'out-of-stock': 'bg-ayur-stone/20 text-ayur-stone border border-ayur-stone/30',
  }

  return (
    <span className={classNames('badge', variantStyles[variant] || '', className, customClass)}>
      {children}
    </span>
  )
}