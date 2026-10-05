'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Grid, List } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductSort } from '@/components/product/ProductSort'
import { Pagination } from '@/components/ui/Pagination'
import { getProductsByCategory, getCategoryBySlug } from '@/lib/products/registry'
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
      <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] py-16 text-center">
        <div className="container">
          <h1 className="font-heading text-2xl font-normal text-[#1C1D1F] mb-3">Collection Not Found</h1>
          <p className="text-xs text-[#737373] mb-6">The category requested does not exist in our formulary.</p>
          <Link
            href="/categories"
            className="px-5 py-2.5 rounded-full border border-[#1C1D1F] text-xs font-medium uppercase tracking-wider text-[#1C1D1F] hover:bg-[#1C1D1F] hover:text-[#FAF7F2] transition-colors"
          >
            View All Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <div className="container py-6 sm:py-8 lg:py-10">
        <div className="mb-6 pb-4 border-b border-[#999999]/30">
          <nav className="flex items-center gap-2 text-xs text-[#737373] mb-2 font-mono" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#1C1D1F] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-[#1C1D1F] transition-colors">Collections</Link>
            <span>/</span>
            <span className="text-[#1C1D1F]">{category.name}</span>
          </nav>
          <h1 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">{category.name}</h1>
          <p className="text-[#555555] text-xs sm:text-sm mt-1 font-sans">{category.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 p-3 rounded-xl bg-[#FFFFFF] border border-[#999999]/30">
          <div>
            <span className="text-xs font-sans text-[#737373]">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Formulation' : 'Formulations'} in this collection
            </span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <ProductSort selectedSort={sortBy} onSortChange={setSortBy} />
            <div className="flex items-center gap-1 bg-[#FAF7F2] border border-[#999999]/30 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={classNames(
                  'p-1.5 rounded transition-colors',
                  viewMode === 'grid' ? 'bg-[#1C1D1F] text-[#FAF7F2]' : 'text-[#737373] hover:text-[#1C1D1F]'
                )}
                aria-label="Grid view"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={classNames(
                  'p-1.5 rounded transition-colors',
                  viewMode === 'list' ? 'bg-[#1C1D1F] text-[#FAF7F2]' : 'text-[#737373] hover:text-[#1C1D1F]'
                )}
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <ProductGrid products={[]} loading={true} />
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center bg-[#FFFFFF] rounded-xl border border-[#999999]/30">
            <p className="text-xs text-[#737373]">No formulations available in this collection.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <ProductGrid
              products={paginatedProducts}
              columns={{ base: 1, sm: 2, md: 3, lg: 3 }}
              variant={viewMode === 'list' ? 'compact' : 'default'}
            />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-6"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
