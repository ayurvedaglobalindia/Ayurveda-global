'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
    <section id="products" className="bg-[#FAF7F2] py-7 sm:py-9 lg:py-11 border-b border-[#999999]/30">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-6 gap-3">
          <div className="max-w-xl">
            <span className="text-[10.5px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1">
              Formulary Catalog
            </span>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-[28px] font-normal text-[#1C1D1F] tracking-tight">
              Master Formulations
            </h2>
            <p className="text-xs text-[#555555] mt-1.5 font-sans leading-relaxed">
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
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-[#1C1D1F] text-[#FAF7F2] font-medium'
                    : 'bg-[#FAF7F2] text-[#737373] hover:text-[#1C1D1F] border border-[#999999]/40'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: Real Images, Clear Purpose, Simple Price & Actions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Catalog Link */}
        <div className="mt-7 sm:mt-9 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-[#1C1D1F] bg-[#FAF7F2] text-[#1C1D1F] hover:bg-[#1C1D1F] hover:text-[#FAF7F2] transition-colors text-xs font-medium uppercase tracking-wider shadow-xs"
          >
            View Complete Formulary Catalog
          </Link>
        </div>

      </div>
    </section>
  )
}
