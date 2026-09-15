'use client'

import { useState } from 'react'
import { Filter, X, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Accordion } from '@/components/ui/Accordion'
import type { Category } from '@/types'

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory?: string
  onCategoryChange: (category: string | undefined) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  availableTags: string[]
  inStockOnly: boolean
  onInStockChange: (value: boolean) => void
  sortBy: string
  onSortChange: (sort: string) => void
  hasActiveFilters: boolean
  onClearFilters: () => void
  isMobile?: boolean
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedTags,
  onTagsChange,
  availableTags,
  inStockOnly,
  onInStockChange,
  sortBy,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
  isMobile = false,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(!isMobile)
  const [priceMin, setPriceMin] = useState(priceRange[0])
  const [priceMax, setPriceMax] = useState(priceRange[1])

  const handlePriceApply = () => {
    onPriceRangeChange([priceMin, priceMax])
  }

  const formatPrice = (paise: number) => `₹${(paise / 100).toLocaleString()}`

  const filterContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-medium text-ayur-black">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <Accordion allowMultiple items={[
        {
          title: 'Categories',
          content: (
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={!selectedCategory}
                  onChange={() => onCategoryChange(undefined)}
                  className="w-4 h-4 text-ayur-forest border-ayur-sand focus:ring-ayur-gold"
                />
                <span className="text-ayur-forest">All Categories</span>
              </label>
              {categories.map(category => (
                <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.slug}
                    onChange={() => onCategoryChange(category.slug)}
                    className="w-4 h-4 text-ayur-forest border-ayur-sand focus:ring-ayur-gold"
                  />
                  <span className="text-ayur-forest">{category.name}</span>
                  <span className="text-ayur-sand text-sm">({category.productCount})</span>
                </label>
              ))}
            </div>
          ),
          defaultOpen: true,
        },
        {
          title: 'Price Range',
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  label="Min"
                  value={priceMin}
                  onChange={e => setPriceMin(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="0"
                />
                <Input
                  type="number"
                  label="Max"
                  value={priceMax}
                  onChange={e => setPriceMax(Math.max(priceMin, parseInt(e.target.value) || priceMin))}
                  placeholder="5000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-ayur-stone">
                  ₹{priceMin.toLocaleString()} - ₹{priceMax.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  value={priceMin}
                  onChange={e => setPriceMin(Math.min(priceMax, parseInt(e.target.value)))}
                  className="w-full h-2 bg-ayur-beige rounded-lg appearance-none cursor-pointer accent-ayur-forest"
                />
                <input
                  type="range"
                  min="0"
                  max="500000"
                  value={priceMax}
                  onChange={e => setPriceMax(Math.max(priceMin, parseInt(e.target.value)))}
                  className="w-full h-2 bg-ayur-beige rounded-lg appearance-none cursor-pointer accent-ayur-forest"
                />
              </div>
              <Button size="sm" onClick={handlePriceApply} className="w-full">Apply</Button>
            </div>
          ),
          defaultOpen: true,
        },
        {
          title: 'Tags',
          content: (
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <label key={tag} className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={e => {
                      const newTags = e.target.checked
                        ? [...selectedTags, tag]
                        : selectedTags.filter(t => t !== tag)
                      onTagsChange(newTags)
                    }}
                    className="sr-only peer"
                  />
                  <span className={classNames(
                    'px-3 py-1.5 rounded-full text-sm border transition-colors',
                    selectedTags.includes(tag)
                      ? 'bg-ayur-forest text-ayur-cream border-ayur-forest'
                      : 'bg-white text-ayur-forest border-ayur-sand hover:border-ayur-forest'
                  )}>
                    {tag.replace(/-/g, ' ')}
                  </span>
                </label>
              ))}
            </div>
          ),
          defaultOpen: true,
        },
        {
          title: 'Availability',
          content: (
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => onInStockChange(e.target.checked)}
                className="w-4 h-4 text-ayur-forest border-ayur-sand focus:ring-ayur-gold rounded"
              />
              <span className="text-ayur-forest">In stock only</span>
            </label>
          ),
        },
      ]} />
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          className="w-full sm:w-auto gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-ayur-gold text-ayur-black text-xs font-medium flex items-center justify-center">
              {availableTags.filter(t => selectedTags.includes(t)).length +
                (selectedCategory ? 1 : 0) +
                (inStockOnly ? 1 : 0) +
                (priceRange[0] > 0 || priceRange[1] < 500000 ? 1 : 0)}
            </span>
          )}
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ayur-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 bottom-0 w-[300px] max-w-[90vw] bg-white shadow-strong z-50 overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-4 border-b border-ayur-beige flex items-center justify-between">
                  <h2 className="font-heading text-lg font-medium text-ayur-black">Filters</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-ayur-stone hover:text-ayur-black hover:bg-ayur-beige transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">{filterContent}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-ayur-beige p-6 sticky top-24">
      {filterContent}
    </div>
  )
}