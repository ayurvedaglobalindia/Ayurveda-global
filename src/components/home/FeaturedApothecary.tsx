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
import { getAllProducts, getProductImage } from '@/lib/products/registry'
import { formatINR as formatPrice } from '@/lib/utils/formatters'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import type { Product } from '@/types'

export function FeaturedApothecary() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'supplements' | 'personal-care' | 'combos'>('all')
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    'body-essential-nutrition': 'body-essential-nutrition-60',
    'staymax-delay-spray': 'staymax-delay-spray-30ml',
    'vitality-power-combo': 'vitality-power-combo-standard',
    'himalayan-shilajit-resin': 'himalayan-shilajit-resin-20g',
    'ksm66-ashwagandha-root-extract': 'ksm66-ashwagandha-60',
    'vajikara-gold-vitality-oil': 'vajikara-gold-vitality-oil-50ml',
  })
  const [addedNotice, setAddedNotice] = useState<string | null>(null)

  const { addItem } = useCartStore()
  const { user, isAuthenticated } = useUserStore()
  const { openCartDrawer, openModal } = useUIStore()
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
    const variantId = selectedVariants[product.id] || product.variants?.[0]?.id || ''
    if (!isAuthenticated) {
      openModal('auth-gate', {
        product,
        variantId,
        quantity: 1,
        mode: 'add-to-cart',
      })
      return
    }
    addItem(product, variantId, 1)
    setAddedNotice(product.id)
    setTimeout(() => {
      setAddedNotice(null)
      openCartDrawer()
    }, 400)
  }

  const handleWhatsAppOrder = (product: Product) => {
    const variantId = selectedVariants[product.id] || product.variants?.[0]?.id
    const variant = product.variants?.find((v) => v.id === variantId) || product.variants?.[0]
    const variantName = variant?.name || product.name
    const primaryAddr = user?.addresses?.[0]
    const userCity = primaryAddr ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(', ') : ''

    const msg = buildProductEnquiryMessage({
      customerName: user?.name || '',
      customerPhone: user?.phone || '',
      customerCity: userCity,
      productName: `${product.name} (${variantName})`,
      quantity: 1,
      price: variant?.price || product.price,
      enquiry: `Hi Ayur Veda Global, I would like to order ${product.name} (${variantName}) with Cash on Delivery (COD). Please confirm my order and delivery timeline.`,
      source: 'catalog',
    })
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <section id="apothecary" className="bg-[#0B150F] py-6 sm:py-8 lg:py-10 border-b border-[#C2A265]/20 relative">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#12241A] border border-[#C2A265]/30 text-[#C2A265] text-[9.5px] font-semibold tracking-[0.22em] uppercase mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Master Apothecary Catalog</span>
          </div>

          <h2 className="font-heading text-lg sm:text-xl lg:text-2xl font-normal text-[#FAF7EE] tracking-tight">
            Targeted Ayurvedic Formulations
          </h2>

          <p className="text-[11px] sm:text-xs text-[#C5BFB3] mt-2 max-w-lg mx-auto leading-relaxed font-sans">
            Classical rasayanas refined with pharmaceutical HPLC precision. Standardized bioactives, 100% vegetarian capsules, zero synthetic chemicals.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mt-5">
            {[
              { id: 'all', label: 'All Formulations', count: allProducts.length },
              { id: 'supplements', label: 'Daily Stamina & Energy', count: allProducts.filter(p => p.category === 'supplements').length },
              { id: 'personal-care', label: 'Intimate Control & Delay', count: allProducts.filter(p => p.category === 'personal-care').length },
              { id: 'combos', label: 'Master Synergy Kits', count: allProducts.filter(p => p.category === 'wellness').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs transition-all duration-200 flex items-center gap-1.5 ${
                  activeCategory === tab.id
                    ? 'bg-[#C2A265] text-[#0B150F] font-semibold shadow-md'
                    : 'bg-[#12241A] text-[#C5BFB3] hover:text-[#FAF7EE] hover:bg-[#162C20] border border-[#C2A265]/15'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-semibold ${
                    activeCategory === tab.id
                      ? 'bg-[#0B150F]/20 text-[#0B150F]'
                      : 'bg-[#183525] text-[#D4B678]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - Dynamic centering so filtered categories never show empty columns */}
        <div
          className={`gap-6 lg:gap-8 ${
            filteredProducts.length === 1
              ? 'max-w-md mx-auto w-full'
              : filteredProducts.length === 2
              ? 'grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredProducts.map((product) => {
            const currentVariantId = selectedVariants[product.id] || product.variants?.[0]?.id
            const currentVariant = product.variants?.find((v) => v.id === currentVariantId) || product.variants?.[0]
            const activePrice = currentVariant?.price || product.price
            const activeComparePrice = currentVariant?.compareAtPrice || product.compareAtPrice
            const discountPercent = activeComparePrice
              ? Math.round(((activeComparePrice - activePrice) / activeComparePrice) * 100)
              : 0
            const cardImage = getProductImage(product, product.id, 'card')

            const bioactivesSnippet =
              product.id === 'body-essential-nutrition'
                ? 'Pure Himalayan Shilajit • Ashwagandha 5% • 60 Vegetarian Capsules'
                : product.id === 'staymax-delay-spray'
                ? 'Calibrated Topical Delay Spray • Non-Numbing Intimate Control • 30ml'
                : 'Inside-Out Synergy Kit • Cellular Stamina + Instant Endurance'

            return (
              <div
                key={product.id}
                className="rounded-2xl bg-[#102016] border border-[#C2A265]/20 flex flex-col justify-between overflow-hidden group hover:border-[#C2A265]/60 hover:-translate-y-1.5 transition-all duration-300 ease-out shadow-lg hover:shadow-[0_16px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(194,162,101,0.12)] max-w-sm md:max-w-none mx-auto w-full"
              >
                {/* Product Image Stage (Tailored 4:5 Aspect Ratio) */}
                <div className="relative aspect-[4/5] w-full bg-[#0D1B12] overflow-hidden border-b border-[#C2A265]/15">
                  {/* Subtle Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold bg-[#0B150F]/90 backdrop-blur-md border border-[#C2A265]/40 text-[#FAF7EE] shadow-md">
                      {product.id === 'vitality-power-combo'
                        ? 'Master Synergy'
                        : product.id === 'body-essential-nutrition'
                        ? 'Flagship Rasayana'
                        : 'Topical Elixir'}
                    </span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-[#C2A265] text-[#0B150F] shadow-md">
                        {discountPercent}% OFF
                      </span>
                    </div>
                  )}

                  <Link href={`/product/${product.slug}`} className="relative w-full h-full block">
                    <Image
                      src={cardImage.src}
                      alt={cardImage.alt || product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      priority={product.id === 'vitality-power-combo'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102016]/80 via-transparent to-transparent pointer-events-none" />
                  </Link>
                </div>

                {/* Card Body - Streamlined & High-Converting */}
                <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Rating & AYUSH Standard */}
                    <div className="flex items-center justify-between text-xs text-[#A8A295] mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-[#C2A265]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="font-semibold text-[#FAF7EE] text-[11px]">4.9★</span>
                        <span className="text-[10px] text-[#A8A295]">(1.2k+)</span>
                      </div>
                      <span className="text-[9.5px] font-semibold text-[#C2A265] bg-[#162D1F] px-2 py-0.5 rounded border border-[#C2A265]/20">
                        AYUSH Certified
                      </span>
                    </div>

                    {/* Product Title */}
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-heading text-base sm:text-lg font-medium text-[#FAF7EE] group-hover:text-[#D4B678] transition-colors leading-snug line-clamp-1 mt-1">
                        {product.name}
                      </h3>
                    </Link>

                    {/* 1-Line Concentrated Bioactives Subtitle */}
                    <p className="text-[11px] text-[#C5BFB3] mt-1 line-clamp-1 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#C2A265] flex-shrink-0" />
                      <span>{bioactivesSnippet}</span>
                    </p>

                    {/* Compact Course Pack Pills (if multiple variants) */}
                    {product.variants && product.variants.length > 1 && (
                      <div className="flex items-center gap-1.5 mt-2.5">
                        <span className="text-[9.5px] uppercase tracking-wider text-[#A8A295] font-semibold">
                          Pack:
                        </span>
                        <div className="flex gap-1.5 flex-1">
                          {product.variants.map((v) => (
                            <button
                              key={v.id}
                              onClick={() => handleVariantChange(product.id, v.id)}
                              className={`px-2 py-1 rounded-md text-[10.5px] transition-all font-medium truncate flex-1 text-center ${
                                currentVariantId === v.id
                                  ? 'bg-[#183525] border border-[#C2A265] text-[#FAF7EE] shadow-sm'
                                  : 'bg-[#0D1B12] border border-[#C2A265]/15 text-[#A8A295] hover:text-[#FAF7EE]'
                              }`}
                            >
                              {v.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price & Action Area */}
                  <div className="mt-3 pt-2.5 border-t border-[#C2A265]/15">
                    <div className="flex items-baseline justify-between mb-2.5">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading text-lg sm:text-xl font-bold text-[#FAF7EE]">
                            {formatPrice(activePrice)}
                          </span>
                          {activeComparePrice && (
                            <span className="text-[11px] text-[#8A8478] line-through">
                              {formatPrice(activeComparePrice)}
                            </span>
                          )}
                        </div>
                        <p className="text-[9.5px] text-[#A8A295] mt-0.5">
                          Free Express Delivery • COD Available
                        </p>
                      </div>

                      {discountPercent > 0 && (
                        <span className="text-[9.5px] text-[#C2A265] font-semibold bg-[#142A1D] px-2 py-0.5 rounded border border-[#C2A265]/20">
                          Save {formatPrice(activeComparePrice! - activePrice)}
                        </span>
                      )}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="py-2.5 px-2 rounded-xl bg-[#C2A265] hover:bg-[#D4B678] text-[#0B150F] font-bold text-xs tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
                      >
                        {addedNotice === product.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added ✓</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleWhatsAppOrder(product)}
                        className="py-2.5 px-2 rounded-xl bg-[#142A1D] hover:bg-[#183525] border border-[#C2A265]/30 text-[#FAF7EE] font-medium text-xs tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#C2A265]" />
                        <span>Quick COD</span>
                      </button>
                    </div>

                    {/* Direct PDP Dossier Link */}
                    <div className="mt-2.5 text-center">
                      <Link
                        href={`/product/${product.slug}`}
                        className="inline-flex items-center gap-1 text-[10.5px] text-[#A8A295] hover:text-[#D4B678] transition-colors font-medium"
                      >
                        <span>View Formulation Dossier</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
