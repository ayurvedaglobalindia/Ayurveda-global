'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Check,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Zap,
} from 'lucide-react'
import { getAllProducts } from '@/lib/products/registry'
import { formatINR as formatPrice } from '@/lib/utils/formatters'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import type { Product } from '@/types'

export function FeaturedApothecary() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'supplements' | 'personal-care' | 'combos'>('all')
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    'body-essential-nutrition': 'body-essential-nutrition-60',
    'staymax-delay-spray': 'staymax-delay-spray-30ml',
    'vitality-power-combo': 'vitality-power-combo-standard',
  })
  const [addedNotice, setAddedNotice] = useState<string | null>(null)

  const { addItem } = useCartStore()
  const { openCartDrawer } = useUIStore()
  const allProducts = getAllProducts()

  const filteredProducts = allProducts.filter((p) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'supplements') return p.category === 'supplements'
    if (activeCategory === 'personal-care') return p.category === 'personal-care'
    if (activeCategory === 'combos') return p.category === 'wellness'
    return true
  })

  const handleVariantChange = (productId: string, variantId: string) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: variantId }))
  }

  const handleAddToCart = (product: Product) => {
    const variantId = selectedVariants[product.id]
    addItem(product, variantId, 1)
    setAddedNotice(product.id)
    setTimeout(() => {
      setAddedNotice(null)
      openCartDrawer()
    }, 400)
  }

  const handleWhatsAppOrder = (product: Product) => {
    const variantId = selectedVariants[product.id]
    const variant = product.variants?.find((v) => v.id === variantId)
    const variantName = variant?.name || product.name

    const msg = buildProductEnquiryMessage({
      customerName: '',
      productName: `${product.name} (${variantName})`,
      quantity: 1,
      enquiry: `Hi Ayur Veda Global, I would like to order ${product.name} (${variantName}) with Cash on Delivery (COD). Please confirm my order.`,
      source: 'catalog',
    })
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <section id="apothecary" className="bg-[#0B150F] py-16 sm:py-24 border-b border-[#C2A265]/20 relative">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12241A] border border-[#C2A265]/30 text-[#C2A265] text-[10px] font-semibold tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Apothecary Catalog</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF7EE] tracking-tight">
            Targeted Ayurvedic Formulations
          </h2>

          <p className="text-xs sm:text-sm text-[#C5BFB3] mt-3 max-w-xl mx-auto leading-relaxed font-sans">
            Classical rasayanas refined with pharmaceutical HPLC precision. Standardized bioactives, 100% vegetarian capsules, zero synthetic chemicals.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-8">
            {[
              { id: 'all', label: 'All Master Formulations' },
              { id: 'supplements', label: 'Daily Stamina & Energy' },
              { id: 'personal-care', label: 'Intimate Control & Delay' },
              { id: 'combos', label: 'Master Synergy Kits' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#C2A265] text-[#0B150F] font-semibold shadow-md'
                    : 'bg-[#12241A] text-[#C5BFB3] hover:text-[#FAF7EE] hover:bg-[#162C20] border border-[#C2A265]/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map((product) => {
            const currentVariantId = selectedVariants[product.id] || product.variants?.[0]?.id
            const currentVariant = product.variants?.find((v) => v.id === currentVariantId) || product.variants?.[0]
            const activePrice = currentVariant?.price || product.price
            const activeComparePrice = currentVariant?.compareAtPrice || product.compareAtPrice
            const discountPercent = activeComparePrice
              ? Math.round(((activeComparePrice - activePrice) / activeComparePrice) * 100)
              : 0

            return (
              <div
                key={product.id}
                className="rounded-2xl bg-[#102016] border border-[#C2A265]/20 flex flex-col justify-between overflow-hidden group hover:border-[#C2A265]/50 transition-all duration-300 shadow-xl"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-square w-full bg-[#0D1B12] p-8 flex items-center justify-center border-b border-[#C2A265]/15">
                  {/* Subtle Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#12241A] border border-[#C2A265]/30 text-[#C2A265]">
                      {product.id === 'vitality-power-combo'
                        ? 'Master Synergy'
                        : product.id === 'body-essential-nutrition'
                        ? 'Flagship Rasayana'
                        : 'Topical Elixir'}
                    </span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#C2A265] text-[#0B150F]">
                        {discountPercent}% OFF
                      </span>
                    </div>
                  )}

                  <Link href={`/product/${product.slug}`} className="relative w-full h-full block">
                    <Image
                      src={product.images[0]?.src || '/images/products/vitality-power-combo.jpg'}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 300px, 400px"
                    />
                  </Link>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Rating & AYUSH Standard */}
                    <div className="flex items-center justify-between text-xs text-[#A8A295] mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-[#C2A265]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="font-semibold text-[#FAF7EE]">4.9★</span>
                      </div>
                      <span className="text-[11px] text-[#C2A265]">AYUSH Certified</span>
                    </div>

                    {/* Product Title */}
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-heading text-lg sm:text-xl font-normal text-[#FAF7EE] group-hover:text-[#D4B678] transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Short Description */}
                    <p className="text-xs text-[#A8A295] mt-2 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Key Ingredients Pill Strip */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {product.id === 'body-essential-nutrition' && (
                        <>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#162D1F] text-[#C5BFB3] border border-[#C2A265]/10">Ashwagandha 5%</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#162D1F] text-[#C5BFB3] border border-[#C2A265]/10">Shilajit 84+ Minerals</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#162D1F] text-[#C5BFB3] border border-[#C2A265]/10">Safed Musli</span>
                        </>
                      )}
                      {product.id === 'staymax-delay-spray' && (
                        <>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#162D1F] text-[#C5BFB3] border border-[#C2A265]/10">100+ Metered Sprays</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#162D1F] text-[#C5BFB3] border border-[#C2A265]/10">Aloe &amp; Vit E</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#162D1F] text-[#C5BFB3] border border-[#C2A265]/10">Non-Numbing</span>
                        </>
                      )}
                      {product.id === 'vitality-power-combo' && (
                        <>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#162D1F] text-[#C5BFB3] border border-[#C2A265]/10">Inside-Out Protocol</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#162D1F] text-[#C5BFB3] border border-[#C2A265]/10">60 Caps + 30ml Spray</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#162D1F] text-[#C5BFB3] border border-[#C2A265]/10">Free COD</span>
                        </>
                      )}
                    </div>

                    {/* Variant Selector (if product has multiple variants) */}
                    {product.variants && product.variants.length > 1 && (
                      <div className="mt-4 pt-3 border-t border-[#C2A265]/10">
                        <label className="text-[10px] uppercase tracking-wider text-[#A8A295] block mb-1.5 font-medium">
                          Select Course Pack:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {product.variants.map((v) => (
                            <button
                              key={v.id}
                              onClick={() => handleVariantChange(product.id, v.id)}
                              className={`px-2.5 py-1.5 rounded-lg text-left text-xs transition-all ${
                                currentVariantId === v.id
                                  ? 'bg-[#183525] border border-[#C2A265] text-[#FAF7EE]'
                                  : 'bg-[#12241A] border border-[#C2A265]/15 text-[#A8A295] hover:text-[#FAF7EE]'
                              }`}
                            >
                              <span className="block truncate font-medium text-[11px]">{v.name}</span>
                              <span className="text-[11px] text-[#D4B678] font-bold">{formatPrice(v.price)}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price & Action Area */}
                  <div className="mt-6 pt-4 border-t border-[#C2A265]/15">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading text-2xl font-semibold text-[#FAF7EE]">
                            {formatPrice(activePrice)}
                          </span>
                          {activeComparePrice && (
                            <span className="text-xs text-[#8A8478] line-through">
                              {formatPrice(activeComparePrice)}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#A8A295] mt-0.5">
                          Taxes included • Free Express Delivery
                        </p>
                      </div>

                      {discountPercent > 0 && (
                        <span className="text-[11px] text-[#C2A265] font-semibold bg-[#142A1D] px-2 py-0.5 rounded border border-[#C2A265]/20">
                          Save {formatPrice(activeComparePrice! - activePrice)}
                        </span>
                      )}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="py-3 px-3 rounded-xl bg-[#C2A265] hover:bg-[#D4B678] text-[#0B150F] font-semibold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        {addedNotice === product.id ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added ✓</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleWhatsAppOrder(product)}
                        className="py-3 px-3 rounded-xl bg-[#142A1D] hover:bg-[#183525] border border-[#C2A265]/30 text-[#FAF7EE] font-medium text-xs tracking-wide transition-all flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#C2A265]" />
                        <span>Order via COD</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Discreet Delivery Guarantee Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-[#0E1E14] border border-[#C2A265]/20 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A8A295]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C2A265] flex-shrink-0" />
            <span>
              <strong className="text-[#FAF7EE]">100% Confidential Delivery Guarantee:</strong> All orders are dispatched in unmarked, brown corrugated boxes without product names or sensitive labels.
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#C2A265] font-semibold">
            <span>Pay Cash on Delivery (COD)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>
    </section>
  )
}
