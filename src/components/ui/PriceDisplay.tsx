'use client'

import { classNames } from '@/lib/utils/formatters'
import { formatINR, calculateDiscountPercentage, calculateSavings } from '@/lib/utils/formatters'
import { Badge } from '@/components/ui/Badge'

interface PriceDisplayProps {
  price: number
  compareAtPrice?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showSavings?: boolean
  className?: string
}

export function PriceDisplay({ price, compareAtPrice, size = 'md', showSavings = true, className }: PriceDisplayProps) {
  const hasDiscount = compareAtPrice && compareAtPrice > price
  const discountPercentage = hasDiscount ? calculateDiscountPercentage(price, compareAtPrice) : 0
  const savings = hasDiscount ? calculateSavings(price, compareAtPrice) : 0

  const sizeStyles = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  }

  return (
    <div className={classNames('flex items-baseline gap-2 flex-wrap', className)}>
      <span className={classNames('font-semibold text-ayur-black', sizeStyles[size])}>
        {formatINR(price)}
      </span>
      {hasDiscount && compareAtPrice && (
        <span className={classNames('text-ayur-stone line-through', sizeStyles[size])}>
          {formatINR(compareAtPrice)}
        </span>
      )}
      {hasDiscount && showSavings && (
        <Badge variant="sale" className="ml-1">
          {discountPercentage}% OFF
        </Badge>
      )}
      {hasDiscount && showSavings && (
        <span className="text-sm text-ayur-sage font-medium">
          Save {formatINR(savings)}
        </span>
      )}
    </div>
  )
}

export function PriceRangeDisplay({ minPrice, maxPrice, size = 'md' }: { minPrice: number; maxPrice: number; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizeStyles = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  }

  if (minPrice === maxPrice) {
    return <span className={classNames('font-semibold text-ayur-black', sizeStyles[size])}>{formatINR(minPrice)}</span>
  }

  return (
    <span className={classNames('font-semibold text-ayur-black', sizeStyles[size])}>
      {formatINR(minPrice)} - {formatINR(maxPrice)}
    </span>
  )
}