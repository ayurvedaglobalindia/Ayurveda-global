'use client'

import { classNames } from '@/lib/utils/formatters'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'product'
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-[#E2DDD5]/60 border border-[#E2DDD5]/40 rounded'

  const variantStyles = {
    text: 'h-4 w-full',
    circular: 'h-10 w-10 rounded-full',
    rectangular: 'h-20 w-full rounded-lg',
    card: 'aspect-square rounded-xl',
    product: 'aspect-square rounded-xl',
  }

  return (
    <div className={classNames(baseStyles, variantStyles[variant], className)} aria-hidden="true" />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="card-luxury rounded-2xl overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
        <Skeleton variant="product" />
      </div>
      <div className="p-4 space-y-3">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-1/4" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton variant="text" className="w-20 h-6" />
          <Skeleton variant="circular" className="h-10 w-10" />
        </div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Skeleton variant="product" className="aspect-square" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} variant="product" className="aspect-square" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
          <Skeleton variant="text" className="w-1/3" />
        </div>
        <div className="space-y-3">
          <Skeleton variant="text" className="w-1/4" />
          <Skeleton variant="text" className="w-1/4" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton variant="rectangular" className="w-32" />
          <Skeleton variant="rectangular" className="w-32" />
        </div>
        <Skeleton variant="rectangular" className="w-full h-12" />
      </div>
    </div>
  )
}

export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 p-4 bg-[#FFFFFF] rounded-xl border border-[#E2DDD5]">
      <Skeleton variant="product" className="w-20 h-20 flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-1/4" />
        <div className="flex items-center gap-4">
          <Skeleton variant="rectangular" className="w-24 h-10" />
          <Skeleton variant="text" className="w-20" />
        </div>
      </div>
    </div>
  )
}

export function CheckoutStepSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} variant="rectangular" className="w-full" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} variant="rectangular" className="w-full" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton key={i} variant="rectangular" className="w-full" />
        ))}
      </div>
    </div>
  )
}