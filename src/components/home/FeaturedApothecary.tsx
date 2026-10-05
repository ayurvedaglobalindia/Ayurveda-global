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
  const [activeCategory, setActiveCategory] = useState<'all' | 'supplements' | 'personal-care' | 'combos' | 'hair-regrow'>('all')
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    'body-essential-nutrition': 'body-essential-nutrition-60',
    'staymax-delay-spray': 'staymax-delay-spray-30ml',
    'vitality-power-combo': 'vitality-power-combo-standard',
    'hair-regrow-kit': 'hair-regrow-kit-standard',
    'hair-regrow-capsules': 'hair-regrow-capsules-60',
    'hair-regrow-oil': 'hair-regrow-oil-100ml',
  })
  const [addedNotice, setAddedNotice] = useState<string | null>(null)

  const { addItem } = useCartStore()
  const { user, isAuthenticated } = useUserStore()
  const { openCartDrawer, openModal } = useUIStore()
  const allProducts = getAllProducts()

  const filteredProducts = allProducts.filter((p) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'hair-regrow') return p.id.includes('hair') || p.tags?.some((t) => t.includes('hair'))
    if (activeCategory === 'supplements') return p.category === 'supplements' && !p.id.includes('hair')
    if (activeCategory === 'personal-care') return p.category === 'personal-care' && !p.id.includes('hair')
    if (activeCategory === 'combos') return p.category === 'wellness' && !p.id.includes('hair')
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
    if (!isAuthenticated) {
      openModal('auth-gate', {
        product,
        variantId,
        mode: 'buy-now',
        quantity: 1,
      })
      return
    }

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
    <section id="apothecary" className="bg-[#08090C] py-8 sm:py-12 lg:py-16 border-b border-[#999999]/20 relative overflow-hidden">
      {/* Subtle dual atmospheric ambient glow */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#D8C28A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-96 h-96 bg-[#6EE7B7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11141E]/90 border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-semibold tracking-[0.24em] uppercase mb-2.5 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3 h-3 text-[#6EE7B7]" />
            <span>Master Pharmacopeia Catalog • № 02</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#FAF7EE] tracking-tight">
            Targeted Ayurvedic Formulations
          </h2>

          <p className="text-xs sm:text-sm text-[#999999] mt-2.5 max-w-lg mx-auto leading-relaxed font-sans">
            Classical rasayanas refined with pharmaceutical HPLC precision. Standardized bioactives, 100% vegetarian capsules, zero synthetic chemicals.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mt-6">
            {[
              { id: 'all', label: 'All Formulations', count: allProducts.length },
              { id: 'supplements', label: 'Daily Stamina & Energy', count: allProducts.filter(p => p.category === 'supplements' && !p.id.includes('hair')).length },
              { id: 'personal-care', label: 'Intimate Control & Delay', count: allProducts.filter(p => p.category === 'personal-care' && !p.id.includes('hair')).length },
              { id: 'combos', label: 'Master Synergy Kits', count: allProducts.filter(p => p.category === 'wellness' && !p.id.includes('hair')).length },
              { id: 'hair-regrow', label: 'Hair Re-Grow Line', count: allProducts.filter(p => p.id.includes('hair')).length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs transition-all duration-200 flex items-center gap-1.5 ${
                  activeCategory === tab.id
                    ? 'bg-[#D8C28A] text-[#08090C] font-semibold shadow-md shadow-[#D8C28A]/20'
                    : 'bg-[#11141E] text-[#999999] hover:text-[#FAF7EE] hover:bg-[#151926] border border-[#999999]/20'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-semibold ${
                    activeCategory === tab.id
                      ? 'bg-[#08090C]/20 text-[#08090C]'
                      : 'bg-[#151926] text-[#6EE7B7]'
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

            const badgeLabel =
              product.id === 'vitality-power-combo'
                ? 'Master Synergy'
                : product.id === 'body-essential-nutrition'
                ? 'Flagship Rasayana'
                : product.id === 'hair-regrow-kit'
                ? 'Dual Therapy Kit'
                : product.id === 'hair-regrow-oil'
                ? 'Ayurvedic Scalp Oil'
                : product.id === 'hair-regrow-capsules'
                ? 'Hair Nutrients'
                : product.id === 'staymax-delay-spray'
                ? 'Topical Delay Elixir'
                : 'Pure Classical'

            const bioactivesSnippet =
              product.shortDescription ||
              (product.ingredients && product.ingredients.length > 0
                ? product.ingredients.slice(0, 3).map((i) => i.split('(')[0].trim()).join(' • ')
                : product.tagline)

            return (
              <div
                key={product.id}
                className="rounded-2xl bg-[#11141E] border border-[#999999]/20 flex flex-col justify-between overflow-hidden group hover:border-[#6EE7B7]/40 hover:-translate-y-1.5 transition-all duration-300 ease-out shadow-xl hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(110,231,183,0.1)] max-w-sm md:max-w-none mx-auto w-full"
              >
                {/* Product Image Stage (Tailored 4:5 Aspect Ratio) */}
                <div className="relative aspect-[4/5] w-full bg-[#0C0E14] overflow-hidden border-b border-[#999999]/20">
                  {/* Subtle Hallmark Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold bg-[#08090C]/90 backdrop-blur-md border border-[#999999]/30 text-[#FAF7EE] shadow-md">
                      {badgeLabel}
                    </span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-[#D8C28A] text-[#08090C] shadow-md">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11141E]/95 via-transparent to-transparent pointer-events-none" />
                  </Link>
                </div>

                {/* Card Body - Streamlined & High-Converting */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Rating & AYUSH Standard */}
                    <div className="flex items-center justify-between text-xs text-[#999999] mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-[#D8C28A]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="font-semibold text-[#FAF7EE] text-[11px]">4.9★</span>
                        <span className="text-[10px] text-[#999999]">(1.2k+ reviews)</span>
                      </div>
                      <span className="text-[9.5px] font-semibold text-[#6EE7B7] bg-[#151926] px-2 py-0.5 rounded border border-[#6EE7B7]/30">
                        AYUSH Standard
                      </span>
                    </div>

                    {/* Product Title */}
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-heading text-base sm:text-lg font-medium text-[#FAF7EE] group-hover:text-[#D8C28A] transition-colors leading-snug line-clamp-1 mt-1">
                        {product.name}
                      </h3>
                    </Link>

                    {/* 1-Line Concentrated Bioactives Subtitle */}
                    <p className="text-[11px] text-[#999999] mt-1.5 line-clamp-1 font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#6EE7B7] flex-shrink-0" />
                      <span>{bioactivesSnippet}</span>
                    </p>

                    {/* Compact Course Pack Pills (if multiple variants) */}
                    {product.variants && product.variants.length > 1 && (
                      <div className="flex items-center gap-1.5 mt-3">
                        <span className="text-[9.5px] uppercase tracking-wider text-[#999999] font-semibold">
                          Course:
                        </span>
                        <div className="flex gap-1.5 flex-1">
                          {product.variants.map((v) => (
                            <button
                              key={v.id}
                              onClick={() => handleVariantChange(product.id, v.id)}
                              className={`px-2 py-1 rounded-md text-[10.5px] transition-all font-medium truncate flex-1 text-center ${
                                currentVariantId === v.id
                                  ? 'bg-[#151926] border border-[#6EE7B7]/50 text-[#6EE7B7] shadow-sm'
                                  : 'bg-[#0D1017] border border-[#999999]/20 text-[#999999] hover:text-[#FAF7EE]'
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
                  <div className="mt-4 pt-3 border-t border-[#999999]/20">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading text-lg sm:text-xl font-bold text-[#FAF7EE]">
                            {formatPrice(activePrice)}
                          </span>
                          {activeComparePrice && (
                            <span className="text-[11px] text-[#999999] line-through">
                              {formatPrice(activeComparePrice)}
                            </span>
                          )}
                        </div>
                        <p className="text-[9.5px] text-[#999999] mt-0.5">
                          Free Express Delivery • COD Available
                        </p>
                      </div>

                      {discountPercent > 0 && (
                        <span className="text-[9.5px] text-[#6EE7B7] font-semibold bg-[#151926] px-2 py-0.5 rounded border border-[#6EE7B7]/30">
                          Save {formatPrice(activeComparePrice! - activePrice)}
                        </span>
                      )}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="py-2.5 px-2 rounded-xl bg-[#D8C28A] hover:bg-[#E6D5AC] text-[#08090C] font-bold text-xs tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#D8C28A]/20 flex items-center justify-center gap-1.5"
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
                        className="py-2.5 px-2 rounded-xl bg-[#151926] hover:bg-[#1E2536] border border-[#999999]/25 hover:border-[#6EE7B7]/40 text-[#FAF7EE] font-medium text-xs tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#6EE7B7]" />
                        <span>Quick COD</span>
                      </button>
                    </div>

                    {/* Direct PDP Dossier Link */}
                    <div className="mt-3 text-center">
                      <Link
                        href={`/product/${product.slug}`}
                        className="inline-flex items-center gap-1 text-[10.5px] text-[#999999] hover:text-[#D8C28A] transition-colors font-medium"
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
