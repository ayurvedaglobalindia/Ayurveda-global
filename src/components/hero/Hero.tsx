'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Leaf, Sparkles, Shield, Truck, RotateCcw, Check, ShoppingBag, Eye, Star } from 'lucide-react'
import { motion, useMotionValue, useTransform, useSpring, useScroll, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { useScrollReveal, useReducedMotion } from '@/hooks/useScrollReveal'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { products } from '@/lib/products/registry'

const trustIndicators = [
  { icon: Truck, label: 'Free Express Shipping', desc: 'All India orders above ₹999' },
  { icon: Shield, label: '100% Herbal & Authentic', desc: 'Ayush & GMP certified purity' },
  { icon: RotateCcw, label: 'Discreet Plain Packaging', desc: 'Confidential & zero exterior branding' },
  { icon: Sparkles, label: 'Dual-Action Synergy', desc: 'Internal stamina + external endurance' },
]

export function Hero() {
  const { scrollY } = useScroll()
  const { addItem } = useCartStore()
  const { openModal, showToast } = useUIStore()

  const [activeProductIndex, setActiveProductIndex] = useState(2) // Defaults to combo (index 2)
  const activeProduct = products[activeProductIndex] || products[0]

  const { ref: heroRef } = useScrollReveal({ delay: 100 })
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal({ delay: 300 })

  const handleHeroQuickBuy = (product: typeof activeProduct) => {
    if (product.ageRestricted) {
      openModal('age-gate', {
        productId: product.id,
        productName: product.name,
        onVerify: () => {
          addItem(product)
          openModal('cart')
        },
      })
    } else {
      addItem(product)
      openModal('cart')
      showToast({ type: 'success', title: 'Added to cart', message: `${product.name} added to cart` })
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-center py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-[#0a1f14] via-[#103423] to-[#06120b]"
      aria-labelledby="hero-title"
    >
      {/* 3D Ambient Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-ayur-gold/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />

      {/* Decorative Gold Leaf Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url('/images/textures/botanical-lines.svg')" }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Benefits */}
          <div className="lg:col-span-7 text-left space-y-5 sm:space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-ayur-gold/15 border border-ayur-gold/30 text-ayur-gold text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
              <span>Ayush Approved • 100% Herbal Formulations</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-title"
              className="font-heading text-3xl sm:text-5xl md:text-6xl font-medium text-ayur-cream leading-[1.12] tracking-tight"
            >
              Ancient Ayurvedic Secrets for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ayur-gold via-[#e6c670] to-ayur-copper relative inline-block font-semibold">
                Peak Vitality & Control
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-ayur-sand/90 leading-relaxed max-w-xl">
              Elevate your daily stamina and intimate endurance with clinical-grade, time-honored Ayurvedic botanicals. Powered by standardized Ashwagandha, Shilajit, Safed Musli, and cooling Aloe Vera.
            </p>

            {/* Fast Bullet Points */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm text-ayur-cream/90 max-w-lg">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-ayur-gold/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-ayur-gold" />
                </div>
                <span>Zero Side Effects • Non-Hormonal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-ayur-gold/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-ayur-gold" />
                </div>
                <span>Fast Action in 10-15 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-ayur-gold/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-ayur-gold" />
                </div>
                <span>100% Discreet Packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-ayur-gold/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-ayur-gold" />
                </div>
                <span>Cash on Delivery (COD) Available</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link href="/shop">
                <Button variant="gold" size="lg" className="group shadow-xl shadow-ayur-gold/10 text-sm sm:text-base font-semibold px-6 py-3.5 rounded-2xl">
                  <span className="flex items-center gap-2">
                    Explore All Products
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <Link href="/product/vitality-power-combo">
                <Button variant="outline" size="lg" className="border-ayur-gold/50 text-ayur-gold hover:bg-ayur-gold/10 text-sm sm:text-base font-semibold px-5 py-3.5 rounded-2xl backdrop-blur-sm">
                  View Power Combo (Save 29%)
                </Button>
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-ayur-sand/80">
              <div className="flex items-center gap-1.5">
                <div className="flex text-ayur-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-ayur-cream">4.9/5</span>
                <span>(1,200+ Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-ayur-cream font-medium">In Stock & Ready to Ship</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Floating Product Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* 3D Glass Card Container */}
              <div className="relative rounded-3xl bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-ayur-gold/30 p-4 sm:p-5 shadow-2xl shadow-black/60 group hover:border-ayur-gold/70 transition-all duration-500">
                {/* 3D Glow Backlight */}
                <div className="absolute -inset-1 bg-gradient-to-r from-ayur-gold/20 via-emerald-500/20 to-ayur-gold/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Floating Top Header on 3D Card */}
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ayur-gold opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-ayur-gold"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-ayur-gold">
                      {activeProduct.id === 'vitality-power-combo' ? '🔥 Most Popular Combo' : 'Featured Product'}
                    </span>
                  </div>
                  <span className="text-xs text-ayur-cream/80 font-medium">
                    Save up to 29%
                  </span>
                </div>

                {/* Product Image Stage with 3D Depth */}
                <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-black/20 to-black/60 border border-white/10 shadow-inner">
                  <Image
                    src={activeProduct.images[0]?.src || '/images/products/vitality-power-combo.jpg'}
                    alt={activeProduct.name}
                    fill
                    priority
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />

                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-ayur-gold to-ayur-copper shadow-lg backdrop-blur-md">
                      {activeProduct.id === 'vitality-power-combo' ? '👑 Best Value Kit' : activeProduct.id === 'body-essential-nutrition' ? '🌿 60 Capsules' : '⚡ 30 ml Spray'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 bg-black/60 backdrop-blur-md rounded-xl p-2.5 text-center border border-white/10">
                    <p className="text-xs font-semibold text-ayur-cream truncate">{activeProduct.name}</p>
                    <p className="text-[11px] text-ayur-gold font-medium mt-0.5">{activeProduct.tagline}</p>
                  </div>
                </div>

                {/* Switcher Pills (Toggle between 3 Products) */}
                <div className="relative z-10 grid grid-cols-3 gap-1.5 my-3.5 bg-black/30 p-1 rounded-2xl border border-white/10">
                  {products.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveProductIndex(idx)}
                      className={classNames(
                        'py-1.5 px-2 rounded-xl text-[11px] font-semibold transition-all duration-300 text-center truncate',
                        activeProductIndex === idx
                          ? 'bg-gradient-to-r from-ayur-gold to-[#c59d43] text-black shadow-md'
                          : 'text-ayur-sand/80 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {p.id === 'vitality-power-combo' ? '👑 Combo' : p.id === 'body-essential-nutrition' ? '🌿 Nutrition' : '⚡ StayMax+'}
                    </button>
                  ))}
                </div>

                {/* Price and CTA inside 3D Hero Card */}
                <div className="relative z-10 flex items-center justify-between gap-3 pt-2">
                  <div>
                    <div className="text-xs text-ayur-sand/80">Special Offer Price:</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-bold text-ayur-cream font-heading">
                        ₹{(activeProduct.price / 100).toLocaleString('en-IN')}
                      </span>
                      {activeProduct.compareAtPrice && (
                        <span className="text-xs text-ayur-sand/60 line-through">
                          ₹{(activeProduct.compareAtPrice / 100).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleHeroQuickBuy(activeProduct)}
                    variant="gold"
                    size="sm"
                    className="px-4 py-2.5 text-xs font-bold shadow-lg shadow-ayur-gold/20 rounded-xl"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                    Quick Buy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Bottom Trust Cards */}
      <div ref={statsRef} className={classNames('container relative z-10 mt-10 sm:mt-14', statsVisible ? 'opacity-100' : 'opacity-0')}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {trustIndicators.map((item, index) => (
            <div
              key={item.label}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-ayur-gold/40 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-ayur-gold/15 border border-ayur-gold/25 flex items-center justify-center mb-2.5">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-ayur-gold" />
              </div>
              <p className="font-heading text-xs sm:text-sm md:text-base font-semibold text-ayur-cream mb-0.5">{item.label}</p>
              <p className="text-[11px] sm:text-xs text-ayur-sand/80 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}