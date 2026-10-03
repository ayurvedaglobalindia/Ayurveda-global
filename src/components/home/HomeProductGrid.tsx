'use client'

import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShoppingBag,
  Star,
  Check,
  Sparkles,
  Shield,
  Truck,
  Tag,
  ArrowRight,
  Leaf,
  Zap,
  Flame,
  Award,
  Plus,
  Minus,
  MessageCircle,
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { products } from '@/lib/products/registry'
import type { Product } from '@/types'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const productMeta: Record<string, {
  categoryTab: string
  doctorTag: string
  badge: string
  badgeBg: string
  tagline: string
  ingredients: string[]
  highlights: string[]
  isCombo?: boolean
}> = {
  'body-essential-nutrition': {
    categoryTab: 'stamina',
    doctorTag: 'Doctor Recommended Daily Regimen',
    badge: 'Herbal Rasayana • 60 Veg Caps',
    badgeBg: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40',
    tagline: 'Internal Stamina, Muscle Strength & ATP Energy',
    ingredients: ['Ashwagandha 5%', 'Pure Shilajit', 'Safed Musli', 'Gokshura'],
    highlights: [
      'Standardized to 5% active Withanolides for stress reduction',
      'Purified Himalayan Shilajit (84+ trace minerals & Fulvic Acid)',
      'Bioactive Safed Musli & Gokshura for deep tissue nourishment',
      '100% Ayurvedic • Non-hormonal • Zero Side Effects',
    ],
  },
  'staymax-delay-spray': {
    categoryTab: 'endurance',
    doctorTag: 'Clinically Tested Topical Control',
    badge: 'Fast Action • 30 ml Spray',
    badgeBg: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40',
    tagline: 'Topical Intimate Endurance & Climax Control',
    ingredients: ['10-15 Min Delay', 'Aloe Vera Base', 'Non-Numbing', '75+ Sprays'],
    highlights: [
      'Extends intimate duration by 10-15 minutes',
      'Skin-calming Aloe Vera base prevents burning or redness',
      'Non-numbing, non-greasy & quick absorbing (10-15 mins)',
      'Discreet, pocket-friendly 30 ml bottle (approx. 75+ sprays)',
    ],
  },
  'vitality-power-combo': {
    categoryTab: 'combo',
    doctorTag: 'Master Inside-Out Synergy Kit',
    badge: '⭐ Best Value Kit • 29% OFF',
    badgeBg: 'bg-gradient-to-r from-amber-500/30 to-emerald-500/30 text-amber-300 border-amber-400/50',
    tagline: 'Complete Inside-Out Synergy (Capsules + Spray)',
    ingredients: ['BODY 60 Caps', 'STAYMAX+ 30ml', 'Save ₹799', 'Free Express Courier'],
    highlights: [
      'Includes 1× BODY Essential Nutrition (60 Capsules)',
      'Includes 1× STAYMAX+ Delay Spray (30 ml)',
      'Dual-action stamina: internal endurance + topical control',
      'Save ₹799 compared to purchasing individually',
    ],
    isCombo: true,
  },
}

export function HomeProductGrid() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'stamina' | 'endurance' | 'combo'>('all')
  const { addItem, isInCart, getItemQuantity, updateQuantity } = useCartStore()
  const { openModal, openCartDrawer, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  const handleAddToCart = (product: Product) => {
    if (product.ageRestricted) {
      openModal('age-gate', {
        productId: product.id,
        productName: product.name,
        onVerify: () => {
          addItem(product)
          openCartDrawer()
          showToast({
            type: 'success',
            title: 'Added to Cart!',
            message: `${product.name} added to your cart.`,
          })
        },
      })
    } else {
      addItem(product)
      openCartDrawer()
      showToast({
        type: 'success',
        title: 'Added to Cart!',
        message: `${product.name} added to your cart.`,
      })
    }
  }

  const handleWhatsAppOrder = (product: Product) => {
    const formattedPrice = (product.price / 100).toLocaleString('en-IN')
    const message = buildProductEnquiryMessage({
      customerName: '',
      productName: product.name,
      quantity: 1,
      enquiry: `Hi Ayur Veda Global, I want to order ${product.name} (Special Price: ₹${formattedPrice}). Please confirm Cash on Delivery (COD) to my pincode.`,
      source: 'product',
    })
    trackLead({
      source: 'product',
      productId: product.id,
      productName: product.name,
      quantity: 1,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: '',
      referrer: '',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  const filteredProducts = products.filter(p => {
    if (selectedFilter === 'all') return true
    const meta = productMeta[p.id]
    return meta?.categoryTab === selectedFilter
  })

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#010804] via-[#041B0E] to-[#010A05] border-b border-emerald-500/20">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-950/40 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[200px]" />
        </div>

        <div className="container relative z-10 py-10 sm:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto hero-reveal">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>100% Ayurvedic • AYUSH Approved • Discreet Delivery</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
              Ancient Ayurvedic Wisdom.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#D4AF37] to-amber-300">
                Peak Daily Performance.
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed">
              Standardized Himalayan Shilajit, Ashwagandha, and potent herbal actives engineered for sustained stamina, muscular recovery, and intimate control. Zero side effects.
            </p>

            {/* Hero Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6">
              <a
                href="#products-section"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/60 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  const message = buildProductEnquiryMessage({
                    customerName: '',
                    productName: 'Ayur Veda Formulations',
                    quantity: 1,
                    enquiry: 'Hi Ayur Veda Global, I would like a consultation / order assistance.',
                    source: 'hero',
                  })
                  window.open(buildWhatsAppUrl(message), '_blank')
                }}
                className="px-6 py-3.5 rounded-full bg-[#128C7E]/25 hover:bg-[#128C7E]/40 border border-[#25D366]/40 text-emerald-300 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Doctor Consultation on WhatsApp</span>
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-emerald-500/20 text-xs text-gray-300">
              <div className="flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span><strong className="text-white">4.9★</strong> (1.2k+ Reviews)</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span><strong className="text-white">100%</strong> Herbal Actives</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span><strong className="text-white">Discreet</strong> Plain Box</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span><strong className="text-white">Free COD</strong> All India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Catalog with Category Filter Tabs */}
        <div id="products-section" className="container relative z-10 pb-12 sm:pb-16 lg:pb-20">
          {/* Filter Tabs (Dr. Vaidya's style navigation) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-10">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedFilter === 'all'
                  ? 'bg-[#D4AF37] text-black shadow-md'
                  : 'bg-emerald-950/60 text-gray-300 hover:text-white border border-emerald-500/20'
              }`}
            >
              All Formulations
            </button>
            <button
              onClick={() => setSelectedFilter('combo')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedFilter === 'combo'
                  ? 'bg-[#D4AF37] text-black shadow-md'
                  : 'bg-emerald-950/60 text-gray-300 hover:text-white border border-emerald-500/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Power Combos (Best Value)</span>
            </button>
            <button
              onClick={() => setSelectedFilter('stamina')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedFilter === 'stamina'
                  ? 'bg-[#D4AF37] text-black shadow-md'
                  : 'bg-emerald-950/60 text-gray-300 hover:text-white border border-emerald-500/20'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              <span>Stamina &amp; Vigor</span>
            </button>
            <button
              onClick={() => setSelectedFilter('endurance')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedFilter === 'endurance'
                  ? 'bg-[#D4AF37] text-black shadow-md'
                  : 'bg-emerald-950/60 text-gray-300 hover:text-white border border-emerald-500/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Endurance &amp; Delay</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {filteredProducts.map((product) => {
              const meta = productMeta[product.id] || {
                categoryTab: 'all',
                doctorTag: 'Ayurvedic Formula',
                badge: 'Ayurvedic Formula',
                badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
                tagline: product.tagline || product.name,
                ingredients: [],
                highlights: [],
                isCombo: false,
              }
              const isCombo = meta.isCombo
              const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
              const discountPercentage = product.compareAtPrice
                ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
                : 0
              const savings = product.compareAtPrice
                ? (product.compareAtPrice - product.price) / 100
                : 0

              const itemInCart = isInCart(product.id)
              const qtyInCart = getItemQuantity(product.id)

              return (
                <div
                  key={product.id}
                  className={`rounded-3xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    isCombo
                      ? 'bg-gradient-to-b from-[#093520] via-[#052214] to-[#03150c] border-2 border-[#D4AF37]/60 shadow-2xl ring-1 ring-[#D4AF37]/30'
                      : 'bg-gradient-to-b from-[#062416] to-[#03150c] border border-emerald-500/30 shadow-xl hover:border-emerald-400/50'
                  }`}
                >
                  {/* Top Doctor Endorsement Banner */}
                  <div className="bg-[#031208] border-b border-emerald-500/20 px-4 py-2 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{meta.doctorTag}</span>
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Truck className="w-3 h-3 text-emerald-400" />
                      <span>Discreet Box</span>
                    </span>
                  </div>

                  {isCombo && (
                    <div className="bg-gradient-to-r from-amber-400 to-[#D4AF37] text-black text-center py-1.5 px-4 text-xs font-black tracking-wider uppercase shadow-md flex items-center justify-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-black" />
                      <span>Best Value Kit — Save ₹{savings.toLocaleString('en-IN')} (29% OFF)</span>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border uppercase ${meta.badgeBg}`}>
                        {meta.badge}
                      </span>
                      <span className="text-[11px] font-bold text-[#D4AF37] bg-black/40 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                        AYUSH Certified
                      </span>
                    </div>

                    {/* Image Stage */}
                    <Link
                      href={`/product/${product.slug}`}
                      className="relative block aspect-[4/3] w-full rounded-2xl bg-[#021007]/90 border border-emerald-500/20 overflow-hidden group mb-4 p-3"
                    >
                      <Image
                        src={primaryImage.src}
                        alt={primaryImage.alt || product.name}
                        fill
                        priority={isCombo}
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#021007]/60 via-transparent to-transparent pointer-events-none" />
                    </Link>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-white">4.9</span>
                      <span className="text-xs text-gray-400">• 1,200+ Verified Orders</span>
                    </div>

                    <Link href={`/product/${product.slug}`}>
                      <h2 className="font-heading text-lg sm:text-xl font-bold text-white hover:text-emerald-300 transition-colors leading-snug">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="text-xs text-emerald-300 font-medium mt-1 mb-3">
                      {meta.tagline}
                    </p>

                    {/* Botanical Actives Pill Strip */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {meta.ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold text-gray-200 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/20"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-1.5 my-3 pt-3 border-t border-emerald-500/20 text-xs text-gray-300 flex-grow">
                      {meta.highlights.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Pricing */}
                    <div className="pt-3 border-t border-emerald-500/20 mb-4">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-heading text-2xl sm:text-3xl font-bold text-white">
                          ₹{(product.price / 100).toLocaleString('en-IN')}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              ₹{(product.compareAtPrice / 100).toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                              Save ₹{savings.toLocaleString('en-IN')} ({discountPercentage}%)
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Inclusive of all taxes • Free express shipping above ₹999
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 mt-auto">
                      {itemInCart ? (
                        <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-950/90 border border-emerald-500/40">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(product.id, undefined, qtyInCart - 1)}
                              className="w-7 h-7 rounded-lg bg-black/40 text-emerald-300 flex items-center justify-center hover:bg-emerald-800 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-white px-2">
                              {qtyInCart} in Cart
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, undefined, qtyInCart + 1)}
                              className="w-7 h-7 rounded-lg bg-black/40 text-emerald-300 flex items-center justify-center hover:bg-emerald-800 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={openCartDrawer}
                            className="text-xs font-bold text-[#D4AF37] hover:underline pr-2"
                          >
                            View Cart →
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                            isCombo
                              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart — ₹{(product.price / 100).toLocaleString('en-IN')}</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleWhatsAppOrder(product)}
                        className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-emerald-300 bg-[#128C7E]/20 hover:bg-[#128C7E]/30 border border-[#25D366]/40 flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Instant COD Order on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}