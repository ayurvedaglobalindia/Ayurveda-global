'use client'

import { classNames } from '@/lib/utils/formatters'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  columns?: { base: number; sm: number; md: number; lg: number; xl: number }
  variant?: 'default' | 'compact' | 'featured'
  showQuickActions?: boolean
  loading?: boolean
  emptyMessage?: string
  emptyAction?: React.ReactNode
}

export function ProductGrid({
  products,
  columns = { base: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  variant = 'default',
  showQuickActions = true,
  loading = false,
  emptyMessage = 'No products found',
  emptyAction,
}: ProductGridProps) {
  const gridClasses = classNames(
    'grid gap-6',
    `grid-cols-${columns.base}`,
    `sm:grid-cols-${columns.sm}`,
    `md:grid-cols-${columns.md}`,
    `lg:grid-cols-${columns.lg}`,
    `xl:grid-cols-${columns.xl}`
  )

  if (loading) {
    return (
      <div className={gridClasses} role="status" aria-label="Loading products">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#061A10] border border-[#C2A265]/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-ayur-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-ayur-ivory mb-2">{emptyMessage}</h3>
        <p className="text-[#C4BDA8] mb-6">Try adjusting your filters or search terms</p>
        {emptyAction}
      </div>
    )
  }

  return (
    <div className={gridClasses} role="list" aria-label="Products">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          variant={variant}
          showQuickActions={showQuickActions}
        />
      ))}
    </div>
  )
}