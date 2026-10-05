'use client'

import { classNames } from '@/lib/utils/formatters'
import { formatINR, calculateDiscountPercentage, calculateSavings } from '@/lib/utils/formatters'

interface PriceDisplayProps {
  price: number
  compareAtPrice?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showSavings?: boolean
  className?: string
}

export function PriceDisplay({ price, compareAtPrice, size = 'md', showSavings = false, className }: PriceDisplayProps) {
  const hasDiscount = Boolean(compareAtPrice && compareAtPrice > price)
  const discountPercentage = hasDiscount ? calculateDiscountPercentage(price, compareAtPrice!) : 0
  const savings = hasDiscount ? calculateSavings(price, compareAtPrice!) : 0

  const sizeStyles = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-xl font-bold',
    xl: 'text-2xl font-bold',
  }

  const compareStyles = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
  }

  return (
    <div className={classNames('inline-flex items-baseline gap-1.5 flex-wrap', className)}>
      <span className={classNames('font-sans text-[#1C1D1F] tracking-tight', sizeStyles[size])}>
        {formatINR(price)}
      </span>
      {hasDiscount && compareAtPrice && (
        <span className={classNames('text-[#999999] line-through font-normal font-sans', compareStyles[size])}>
          {formatINR(compareAtPrice)}
        </span>
      )}
      {hasDiscount && showSavings && (
        <span className="text-[11px] font-mono text-[#4E5F52] bg-[#FAF7F2] border border-[#999999]/30 px-1.5 py-0.5 rounded">
          {discountPercentage}% off
        </span>
      )}
    </div>
  )
}

export function PriceRangeDisplay({ minPrice, maxPrice, size = 'md' }: { minPrice: number; maxPrice: number; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizeStyles = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-xl font-bold',
    xl: 'text-2xl font-bold',
  }

  if (minPrice === maxPrice) {
    return <span className={classNames('font-sans text-[#1C1D1F] tracking-tight', sizeStyles[size])}>{formatINR(minPrice)}</span>
  }

  return (
    <span className={classNames('font-sans text-[#1C1D1F] tracking-tight', sizeStyles[size])}>
      {formatINR(minPrice)} – {formatINR(maxPrice)}
    </span>
  )
}