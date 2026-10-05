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
    <section id="apothecary" className="bg-[#090A0D] py-14 sm:py-20 lg:py-28 border-b border-[#999999]/20 relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-[11px] font-mono tracking-[0.24em] text-[#999999] uppercase mb-3">
            Classical Botanical Formulations
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF7EE] tracking-tight leading-[1.16]">
            The Apothecary Catalog
          </h2>

          <p className="text-sm sm:text-[15px] text-[#999999] mt-3.5 max-w-xl mx-auto leading-relaxed font-sans font-normal">
            Targeted Rasayana protocols prepared in strict accordance with the Charaka Samhita. Standardized bioactives, 100% vegetarian capsules, zero synthetic chemical additives.
          </p>

          {/* Filter Tabs - Quiet Minimalist Architecture */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mt-8">
            {[
              { id: 'all', label: 'All Formulations' },
              { id: 'supplements', label: 'Daily Stamina & Energy' },
              { id: 'personal-care', label: 'Intimate Control & Delay' },
              { id: 'combos', label: 'Master Synergy Kits' },
              { id: 'hair-regrow', label: 'Hair Re-Grow Line' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs transition-all duration-300 ${
                  activeCategory === tab.id
                    ? 'bg-[#FAF7EE] text-[#090A0D] font-medium shadow-sm'
                    : 'bg-[#12141A] text-[#999999] hover:text-[#FAF7EE] border border-[#999999]/20'
                }`}
              >
                <span className="tracking-wide">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
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

            const classificationLabel =
              product.id === 'vitality-power-combo'
                ? 'Synergistic Protocol • Capsules & Topical'
                : product.id === 'body-essential-nutrition'
                ? 'Daily Rasayana • 60 Vegetarian Capsules'
                : product.id === 'hair-regrow-kit'
                ? 'Dual Follicular Therapy • 100ml Oil & 60 Caps'
                : product.id === 'hair-regrow-oil'
                ? 'Classical Scalp Taila • 100 ml'
                : product.id === 'hair-regrow-capsules'
                ? 'Follicle Bioactives • 60 Vegetarian Capsules'
                : product.id === 'staymax-delay-spray'
                ? 'Topical Herbal Spray • 30 ml'
                : 'Classical Rasayana Formulation'

            const bioactivesSnippet =
              product.shortDescription ||
              (product.ingredients && product.ingredients.length > 0
                ? product.ingredients.slice(0, 3).map((i) => i.split('(')[0].trim()).join(' • ')
                : product.tagline)

            return (
              <div
                key={product.id}
                className="rounded-2xl bg-[#0D0F15] border border-[#999999]/20 flex flex-col justify-between overflow-hidden group hover:border-[#999999]/40 transition-all duration-500 ease-out shadow-lg max-w-sm md:max-w-none mx-auto w-full"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-[4/5] w-full bg-[#08090C] overflow-hidden border-b border-[#999999]/15">
                  {discountPercent > 0 && (
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-mono tracking-wider text-[#D8C28A] bg-[#090A0D]/90 border border-[#D8C28A]/30">
                        {discountPercent}% OFF
                      </span>
                    </div>
                  )}

                  <Link href={`/product/${product.slug}`} className="relative w-full h-full block">
                    <Image
                      src={cardImage.src}
                      alt={cardImage.alt || product.name}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      priority={product.id === 'vitality-power-combo'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F15]/80 via-transparent to-transparent pointer-events-none" />
                  </Link>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    {/* Archival Classification */}
                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#999999] mb-1.5">
                      {classificationLabel}
                    </p>

                    {/* Product Title */}
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-heading text-lg sm:text-xl font-normal text-[#FAF7EE] group-hover:text-[#D8C28A] transition-colors leading-snug line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Bioactives Monograph Subtitle */}
                    <p className="text-xs text-[#999999] mt-2 line-clamp-2 font-normal leading-relaxed">
                      {bioactivesSnippet}
                    </p>

                    {/* Course Variants (if applicable) */}
                    {product.variants && product.variants.length > 1 && (
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#999999]/15">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[#999999]">
                          Size:
                        </span>
                        <div className="flex gap-1.5 flex-1">
                          {product.variants.map((v) => (
                            <button
                              key={v.id}
                              onClick={() => handleVariantChange(product.id, v.id)}
                              className={`px-2.5 py-1 rounded-md text-[10.5px] transition-all font-medium truncate flex-1 text-center ${
                                currentVariantId === v.id
                                  ? 'bg-[#181C26] border border-[#D8C28A]/50 text-[#FAF7EE]'
                                  : 'bg-[#090A0D] border border-[#999999]/20 text-[#999999] hover:text-[#FAF7EE]'
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
                  <div className="pt-4 border-t border-[#999999]/15">
                    <div className="flex items-baseline justify-between mb-3.5">
                      <div>
                        <div className="flex items-baseline gap-2.5">
                          <span className="font-serif text-xl sm:text-2xl font-normal text-[#FAF7EE]">
                            {formatPrice(activePrice)}
                          </span>
                          {activeComparePrice && (
                            <span className="text-xs text-[#999999] line-through">
                              {formatPrice(activeComparePrice)}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#999999] mt-0.5">
                          Doorstep Cash on Delivery Available
                        </p>
                      </div>

                      <span className="text-[10px] text-[#6EE7B7] font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7B7]" />
                        <span>AYUSH Certified</span>
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="py-3 px-3 rounded-full bg-[#D8C28A] hover:bg-[#E6D5AC] text-[#090A0D] font-semibold text-xs uppercase tracking-[0.12em] transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        {addedNotice === product.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
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
                        className="py-3 px-3 rounded-full bg-transparent hover:bg-[#141720] border border-[#999999]/30 hover:border-[#6EE7B7]/50 text-[#FAF7EE] font-medium text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#6EE7B7]" />
                        <span>Quick COD</span>
                      </button>
                    </div>

                    {/* Direct Monograph Link */}
                    <div className="mt-3 text-center">
                      <Link
                        href={`/product/${product.slug}`}
                        className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-wider text-[#999999] hover:text-[#D8C28A] transition-colors font-medium"
                      >
                        <span>View Formulation Details</span>
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
