'use client'

import { Star } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'

interface RatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  reviewsCount?: number
  interactive?: boolean
  onChange?: (rating: number) => void
}

export function Rating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  reviewsCount,
  interactive = false,
  onChange,
}: RatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const filledStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="inline-flex items-center gap-1" role="img" aria-label={`${rating} out of ${maxRating} stars`}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        let fill: 'full' | 'half' | 'empty' = 'empty'

        if (starValue <= filledStars) fill = 'full'
        else if (starValue === filledStars + 1 && hasHalfStar) fill = 'half'

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            onKeyDown={e => {
              if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                onChange?.(starValue)
              }
            }}
            className={classNames(
              'p-0.5 transition-transform hover:scale-110',
              interactive && 'cursor-pointer focus-visible-ring rounded',
              !interactive && 'cursor-default'
            )}
            aria-label={interactive ? `Rate ${starValue} stars` : undefined}
          >
            <Star
              className={classNames(
                sizeClasses[size],
                fill === 'full' && 'text-ayur-gold',
                fill === 'half' && 'text-ayur-gold/50',
                fill === 'empty' && 'text-ayur-sand'
              )}
              fill={fill === 'full' ? 'currentColor' : fill === 'half' ? 'currentColor' : 'none'}
              strokeWidth={2}
            >
              {fill === 'half' && (
                <defs>
                  <linearGradient id={`half-star-${index}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
            </Star>
          </button>
        )
      })}
      {showValue && (
        <span className="ml-2 text-sm font-medium text-ayur-forest">
          {rating.toFixed(1)}
          {reviewsCount && ` (${reviewsCount})`}
        </span>
      )}
    </div>
  )
}