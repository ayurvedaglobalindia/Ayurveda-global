'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  showFirstLast?: boolean
  siblingCount?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showFirstLast = true,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = []
  const startPage = Math.max(2, currentPage - siblingCount)
  const endPage = Math.min(totalPages - 1, currentPage + siblingCount)

  if (showFirstLast) pages.push(1)
  if (startPage > 2) pages.push('...')
  for (let i = startPage; i <= endPage; i++) pages.push(i)
  if (endPage < totalPages - 1) pages.push('...')
  if (showFirstLast && totalPages > 1) pages.push(totalPages)

  return (
    <nav className={classNames('flex items-center justify-center gap-1', className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-ayur-forest hover:bg-ayur-beige disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible-ring"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-1">
        {pages.map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 text-ayur-stone">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={classNames(
                'w-10 h-10 rounded-lg font-medium transition-all focus-visible-ring',
                page === currentPage
                  ? 'bg-ayur-forest text-ayur-cream'
                  : 'text-ayur-forest hover:bg-ayur-beige'
              )}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-ayur-forest hover:bg-ayur-beige disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible-ring"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  )
}