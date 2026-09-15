'use client'

import { classNames } from '@/lib/utils/formatters'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'sage' | 'age' | 'sale' | 'new' | 'low-stock' | 'out-of-stock'
  className?: string
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const variantStyles = {
    gold: 'bg-ayur-gold/10 text-ayur-gold border border-ayur-gold/20',
    sage: 'bg-ayur-sage/10 text-ayur-sage border border-ayur-sage/20',
    age: 'bg-red-50 text-red-700 border border-red-200',
    sale: 'bg-ayur-copper/10 text-ayur-copper border border-ayur-copper/20',
    new: 'bg-ayur-forest/10 text-ayur-forest border border-ayur-forest/20',
    'low-stock': 'bg-amber-50 text-amber-700 border border-amber-200',
    'out-of-stock': 'bg-gray-100 text-gray-500 border border-gray-200',
  }

  return (
    <span className={classNames('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variantStyles[variant], className)}>
      {children}
    </span>
  )
}