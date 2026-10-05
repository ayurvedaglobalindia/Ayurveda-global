'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { getAllProducts } from '@/lib/products/registry'
import { ProductCard } from '@/components/product/ProductCard'

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'supplements' | 'personal-care' | 'combos'>('all')
  const allProducts = getAllProducts()

  const filteredProducts = allProducts.filter((p) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'supplements') return p.category === 'supplements'
    if (activeCategory === 'personal-care') return p.category === 'personal-care'
    if (activeCategory === 'combos') return p.category === 'wellness'
    return true
  })

  return (
    <section id="products" className="bg-[#FAF7F2] py-12 sm:py-16 lg:py-20 border-b border-[#E2DDD5]">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1.5">
              Formulary Catalog
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1D1F] tracking-tight">
              Master Formulations
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] mt-2 font-sans">
              Prepared from standardized botanical extracts. Free from synthetic hormones, artificial numbness agents, or mineral oil fillers.
            </p>
          </div>

          {/* Clean Category Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Formulations' },
              { id: 'supplements', label: 'Supplements' },
              { id: 'personal-care', label: 'Topical Care' },
              { id: 'combos', label: 'Power Kits' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-[#1C1D1F] text-[#FAF7F2] font-medium'
                    : 'bg-[#FFFFFF] text-[#737373] hover:text-[#1C1D1F] border border-[#E2DDD5]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: Real Images, Clear Purpose, Simple Price & Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Catalog Link */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#1C1D1F] text-[#1C1D1F] hover:bg-[#1C1D1F] hover:text-[#FAF7F2] transition-colors text-xs font-medium uppercase tracking-wider"
          >
            View Complete Formulary Catalog
          </Link>
        </div>

      </div>
    </section>
  )
}
