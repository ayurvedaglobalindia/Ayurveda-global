'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Loader2, Grid, List } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductSort } from '@/components/product/ProductSort'
import { Pagination } from '@/components/ui/Pagination'
import { getProductsByCategory, getCategoryBySlug } from '@/lib/products/registry'
import { Logo } from '@/components/ui/Logo'
import type { Product, Category } from '@/types'

const ITEMS_PER_PAGE = 12

export default function CategoryPageClient() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = (params?.slug as string) || ''

  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState(searchParams?.get('sort') || 'featured')

  useEffect(() => {
    if (!slug) return
    const cat = getCategoryBySlug(slug)
    const prods = getProductsByCategory(slug)

    setCategory(cat || null)
    setProducts(prods)
    setFilteredProducts(prods)
    setLoading(false)
  }, [slug])

  useEffect(() => {
    let result = [...products]

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.variants[0]?.price || a.price) - (b.variants[0]?.price || b.price))
        break
      case 'price-desc':
        result.sort((a, b) => (b.variants[0]?.price || b.price) - (a.variants[0]?.price || a.price))
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    setFilteredProducts(result)
    setTotalPages(Math.ceil(result.length / ITEMS_PER_PAGE) || 1)
    setCurrentPage(1)
  }, [sortBy, products])

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  if (!category) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-heading text-3xl font-medium text-ayur-ivory mb-4">Category not found</h1>
        <p className="text-[#C4BDA8]">The category you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    )
  }

  return (
    <div className="container py-4 sm:py-6 lg:py-8">
      <div className="mb-4 sm:mb-5">
        <nav className="flex items-center gap-2 text-xs text-[#C4BDA8] mb-2" aria-label="Breadcrumb">
          <a href="/" className="hover:text-ayur-gold transition-colors">Home</a>
          <span>/</span>
          <a href="/categories" className="hover:text-ayur-gold transition-colors">Categories</a>
          <span>/</span>
          <span className="text-ayur-ivory font-medium">{category.name}</span>
        </nav>
        <h1 className="font-heading text-xl sm:text-2xl font-normal text-ayur-ivory">{category.name}</h1>
        <p className="text-[#C4BDA8] text-xs sm:text-sm mt-1">{category.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-[#C4BDA8] text-sm">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} in this category
          </span>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <ProductSort selectedSort={sortBy} onSortChange={setSortBy} />
          <div className="flex items-center gap-1 bg-[#121622] border border-[#C2A265]/20 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={classNames('p-2 rounded transition-colors', viewMode === 'grid' ? 'bg-ayur-gold text-[#08090C] shadow-sm' : 'text-[#C4BDA8] hover:text-white')}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={classNames('p-2 rounded transition-colors', viewMode === 'list' ? 'bg-ayur-gold text-[#08090C] shadow-sm' : 'text-[#C4BDA8] hover:text-white')}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <ProductGrid products={[]} loading={true} />
      ) : filteredProducts.length === 0 ? (
        <ProductGrid products={[]} emptyMessage="No products in this category" />
      ) : (
        <>
          <ProductGrid
            products={paginatedProducts}
            columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
            variant={viewMode === 'list' ? 'compact' : 'default'}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-8"
            />
          )}
        </>
      )}
    </div>
  )
}
