'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Filter, X, Grid, List, Search, Sparkles, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilters } from '@/components/product/ProductFilters'
import { ProductSort } from '@/components/product/ProductSort'
import { Pagination } from '@/components/ui/Pagination'
import { getAllProducts, getCategories } from '@/lib/products/registry'
import type { Product, Category } from '@/types'

const ITEMS_PER_PAGE = 12

function matchesProductSearch(p: Product, query: string): boolean {
  if (!query) return true
  const q = query.toLowerCase().trim()
  const cleanQ = q.replace(/[^a-z0-9\s]/g, ' ')
  const terms = cleanQ.split(/\s+/).filter(t => t.length > 0)

  const allText = [
    p.name,
    p.tagline,
    p.description,
    p.shortDescription || '',
    p.category,
    ...(p.tags || []),
    ...(p.ingredients || []),
  ].join(' ').toLowerCase()

  // 1. Direct substring match
  if (allText.includes(q)) return true

  // 2. Keyword/token-based match
  if (terms.length > 0) {
    const isMatch = terms.every(term => {
      if (term === 'caps' || term === 'capsule' || term === 'capsules') {
        return allText.includes('capsule') || allText.includes('caps')
      }
      if (term === 'spray' || term === 'delay') {
        return allText.includes('staymax') || allText.includes('spray') || allText.includes('delay')
      }
      if (term === 'combo' || term === 'kit') {
        return allText.includes('combo') || allText.includes('power')
      }
      return allText.includes(term)
    })
    if (isMatch) return true
  }

  return false
}

function ShopContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories] = useState<Category[]>(getCategories())
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('q') || '',
    priceRange: [0, 500000] as [number, number],
    tags: [] as string[],
    inStockOnly: searchParams.get('in_stock') === 'true',
    sort: searchParams.get('sort') || 'featured',
  })

  const availableTags = [
    'daily-wellness',
    'immunity',
    'energy',
    'ayurvedic',
    'herbal-supplement',
    'mens-wellness',
    'endurance',
    'personal-care',
    'topical-spray',
  ]

  useEffect(() => {
    const allProducts = getAllProducts()
    setProducts(allProducts)
    setLoading(false)
  }, [])

  useEffect(() => {
    const q = searchParams.get('q') || ''
    const cat = searchParams.get('category') || ''
    const inStock = searchParams.get('in_stock') === 'true'
    const sort = searchParams.get('sort') || 'featured'

    setFilters(prev => ({
      ...prev,
      search: q,
      category: cat,
      inStockOnly: inStock,
      sort: sort,
    }))
  }, [searchParams])

  const applyFilters = useCallback((productList: Product[]) => {
    let result = [...productList]

    if (filters.category) {
      result = result.filter(p => p.category === filters.category)
    }

    if (filters.search) {
      result = result.filter(p => matchesProductSearch(p, filters.search))
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500000) {
      result = result.filter(p => {
        const price = p.variants[0]?.price || p.price
        return price >= filters.priceRange[0] && price <= filters.priceRange[1]
      })
    }

    if (filters.tags.length > 0) {
      result = result.filter(p => filters.tags.some(tag => p.tags.includes(tag)))
    }

    if (filters.inStockOnly) {
      result = result.filter(p => p.inventory.quantity > 0)
    }

    // Sort
    switch (filters.sort) {
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
      default:
        // featured - keep original order
        break
    }

    setFilteredProducts(result)
    setTotalPages(Math.ceil(result.length / ITEMS_PER_PAGE))
    setCurrentPage(1)
  }, [filters])

  useEffect(() => {
    if (products.length > 0) {
      applyFilters(products)
    }
  }, [applyFilters, products])

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    const params = new URLSearchParams(searchParams.toString())
    Object.entries({ ...filters, ...newFilters }).forEach(([key, value]) => {
      if (value === '' || value === false || (Array.isArray(value) && value.length === 0)) {
        params.delete(key)
      } else if (Array.isArray(value)) {
        params.set(key, value.join(','))
      } else {
        params.set(key, String(value))
      }
    })
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      search: '',
      priceRange: [0, 500000] as [number, number],
      tags: [] as string[],
      inStockOnly: false,
      sort: 'featured',
    }
    setFilters(clearedFilters)
    router.push(pathname, { scroll: false })
  }

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const hasActiveFilters = Boolean(
    filters.category ||
    filters.search ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500000 ||
    filters.tags.length > 0 ||
    filters.inStockOnly
  )

  return (
    <div className="container py-4 sm:py-6 lg:py-8 pb-16">
      
      {/* Compact Page Header (Fixed layout stability - No disappearing bug) */}
      <div className="pb-3.5 mb-5 border-b border-[#C2A265]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[9.5px] font-semibold text-[#C2A265] uppercase tracking-[0.2em] block">
            Authentic Ayurvedic Apothecary
          </span>
          <h1 className="font-heading text-lg sm:text-xl md:text-2xl font-medium text-[#FAF7EE] tracking-tight mt-0.5">
            {filters.search ? `Search Results: "${filters.search}"` : 'Shop All Formulations'}
          </h1>
          <p className="text-[#A8A295] text-xs sm:text-[13px] mt-0.5">
            Lab-certified classical Rasayana formulations, standardized bioactives &amp; 100% discreet packaging.
          </p>
        </div>

        {/* Active Search / Filter Pill */}
        {filters.search && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-2.5 py-1 rounded-full bg-[#142A1D] border border-[#C2A265]/35 text-[#D4B678] text-xs font-medium flex items-center gap-1.5 shadow-sm">
              <Search className="w-3 h-3 text-[#C2A265]" />
              <span>&ldquo;{filters.search}&rdquo;</span>
              <button
                onClick={() => updateFilters({ search: '' })}
                className="ml-1 p-0.5 hover:text-white rounded-full"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:w-60 flex-shrink-0">
          <div className="sticky top-20">
            <ProductFilters
              categories={categories}
              selectedCategory={filters.category || undefined}
              onCategoryChange={category => updateFilters({ category: category || '' })}
              priceRange={filters.priceRange}
              onPriceRangeChange={range => updateFilters({ priceRange: range })}
              selectedTags={filters.tags}
              onTagsChange={tags => updateFilters({ tags })}
              availableTags={availableTags}
              inStockOnly={filters.inStockOnly}
              onInStockChange={value => updateFilters({ inStockOnly: value })}
              sortBy={filters.sort}
              onSortChange={sort => updateFilters({ sort })}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
              isMobile={false}
            />
          </div>
        </aside>

        {/* Main Products Area */}
        <div className="flex-1 w-full min-w-0">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#102016] border border-[#C2A265]/20 mb-4">
            <div className="flex items-center gap-2.5">
              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <ProductFilters
                  categories={categories}
                  selectedCategory={filters.category || undefined}
                  onCategoryChange={category => updateFilters({ category: category || '' })}
                  priceRange={filters.priceRange}
                  onPriceRangeChange={range => updateFilters({ priceRange: range })}
                  selectedTags={filters.tags}
                  onTagsChange={tags => updateFilters({ tags })}
                  availableTags={availableTags}
                  inStockOnly={filters.inStockOnly}
                  onInStockChange={value => updateFilters({ inStockOnly: value })}
                  sortBy={filters.sort}
                  onSortChange={sort => updateFilters({ sort })}
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={handleClearFilters}
                  isMobile={true}
                />
              </div>

              <span className="text-[#FAF7EE] text-xs font-medium">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Formulation' : 'Formulations'} Available
              </span>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-[11px] text-[#C2A265] hover:underline flex items-center gap-1 font-medium ml-1"
                >
                  <X className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 ml-auto">
              <ProductSort selectedSort={filters.sort} onSortChange={sort => updateFilters({ sort })} />
              
              <div className="flex items-center gap-1 bg-[#0D1B12] border border-[#C2A265]/25 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={classNames(
                    'p-1.5 rounded transition-colors',
                    viewMode === 'grid' ? 'bg-[#C2A265] text-[#0B150F]' : 'text-[#8A8478] hover:text-[#FAF7EE]'
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={classNames(
                    'p-1.5 rounded transition-colors',
                    viewMode === 'list' ? 'bg-[#C2A265] text-[#0B150F]' : 'text-[#8A8478] hover:text-[#FAF7EE]'
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Cards Stream */}
          {loading ? (
            <ProductGrid products={[]} loading={true} />
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 px-4 text-center rounded-2xl bg-[#102016] border border-[#C2A265]/20 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#142A1D] border border-[#C2A265]/30 flex items-center justify-center mx-auto text-[#C2A265]">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-sm sm:text-base font-medium text-[#FAF7EE]">
                No formulations found {filters.search && `for "${filters.search}"`}
              </h3>
              <p className="text-xs text-[#A8A295] max-w-sm mx-auto">
                Try searching for &ldquo;Ashwagandha&rdquo;, &ldquo;Shilajit&rdquo;, &ldquo;Delay Spray&rdquo;, or &ldquo;Power Combo&rdquo;.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-2 px-4 py-2 rounded-xl bg-[#142A1D] hover:bg-[#183525] border border-[#C2A265]/40 text-[#FAF7EE] text-xs font-semibold transition-all inline-block"
              >
                Browse All Products
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <ProductGrid
                products={paginatedProducts}
                columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
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

    </div>
  )
}

export default function ShopPage() {
  return (
    <div className="bg-[#0B150F] min-h-screen text-[#F5EFE6]">
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-[#D4B678] text-xs">
          Loading catalog...
        </div>
      }>
        <ShopContent />
      </Suspense>
    </div>
  )
}