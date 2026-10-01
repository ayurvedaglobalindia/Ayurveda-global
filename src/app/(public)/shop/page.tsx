'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Loader2, Filter, X, Grid, List, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilters } from '@/components/product/ProductFilters'
import { ProductSort } from '@/components/product/ProductSort'
import { Pagination } from '@/components/ui/Pagination'
import { getAllProducts, getProductsByCategory, searchProducts, getCategories } from '@/lib/products/registry'
import type { Product, Category } from '@/types'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
]

const ITEMS_PER_PAGE = 12

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
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('q') || '',
    priceRange: [0, 500000] as [number, number],
    tags: [] as string[],
    inStockOnly: searchParams.get('in_stock') === 'true',
    sort: searchParams.get('sort') || 'featured',
  })

  const availableTags = ['daily-wellness', 'immunity', 'energy', 'ayurvedic', 'herbal-supplement', 'mens-wellness', 'endurance', 'personal-care', 'topical-spray']

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
      result = result.filter(p =>
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.tagline.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      )
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

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.shop-header', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      })
      gsap.from('.filter-sidebar', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.1,
      })
      gsap.from('.product-grid-item', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 80%',
        },
      })
    })
    return () => ctx.revert()
  }, [filteredProducts])

  return (
    <div className="container py-8 lg:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="shop-header mb-8 pb-4 border-b border-ayur-gold/20"
      >
        <div>
          <span className="text-xs font-bold text-ayur-gold uppercase tracking-wider">Ayurvedic Formulations</span>
          <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-ivory mt-1">Shop All Products</h1>
          <p className="text-ayur-stone mt-2 text-sm sm:text-base">Discover our complete range of authentic Ayurvedic wellness & performance products</p>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block lg:w-64 flex-shrink-0 filter-sidebar"
        >
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
        </motion.aside>

        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
          >
            <div className="flex items-center gap-3">
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

              <span className="text-ayur-stone text-sm">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </span>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-ayur-gold hover:bg-ayur-gold/10">
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <ProductSort selectedSort={filters.sort} onSortChange={sort => updateFilters({ sort })} />
              <div className="flex items-center gap-1 bg-ayur-charcoal border border-ayur-gold/30 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={classNames('p-2 rounded transition-colors', viewMode === 'grid' ? 'bg-ayur-gold text-ayur-void font-bold shadow-sm' : 'text-ayur-stone hover:text-ayur-ivory')}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={classNames('p-2 rounded transition-colors', viewMode === 'list' ? 'bg-ayur-gold text-ayur-void font-bold shadow-sm' : 'text-ayur-stone hover:text-ayur-ivory')}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <ProductGrid products={[]} loading={true} />
          ) : filteredProducts.length === 0 ? (
            <ProductGrid products={[]} emptyMessage={filters.search ? `No products found for "${filters.search}"` : 'No products match your filters'} />
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
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <div className="bg-ayur-void min-h-screen">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#D4AF37]">Loading catalog...</div>}>
        <ShopContent />
      </Suspense>
    </div>
  )
}