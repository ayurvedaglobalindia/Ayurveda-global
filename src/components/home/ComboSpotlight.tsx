'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Check, Shield, Truck, Zap, ShoppingBag, ArrowRight, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { getProductBySlug } from '@/lib/products/registry'

export function ComboSpotlight() {
  const combo = getProductBySlug('vitality-power-combo')
  const { addItem } = useCartStore()
  const { openModal, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  if (!combo) return null

  const handleAddComboToCart = () => {
    openModal('age-gate', {
      productId: combo.id,
      productName: combo.name,
      onVerify: () => {
        addItem(combo)
        openModal('cart')
        showToast({
          type: 'success',
          title: 'Combo Added to Cart!',
          message: 'Vitality & Performance Power Combo has been added with 29% discount.',
        })
      },
    })
  }

  const handleWhatsAppOrder = () => {
    const message = buildProductEnquiryMessage({
      customerName: '',
      productName: combo.name,
      quantity: 1,
      enquiry: `Hi Ayur Veda Global! I want to order the Vitality & Performance Power Combo (Special Deal: ₹1,999 / Save ₹799). Please confirm COD availability to my pincode.`,
      source: 'combo-spotlight',
    })
    trackLead({
      source: 'combo-spotlight',
      productId: combo.id,
      productName: combo.name,
      quantity: 1,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: '',
      referrer: '',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#091f14] via-[#0d2a1b] to-[#08170f] text-ayur-cream relative overflow-hidden">
      {/* 3D Radial Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-ayur-gold/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ayur-gold/20 border border-ayur-gold/40 text-ayur-gold text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
            Special Dual-Action Kit • Save 29% Today
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
            The Ultimate Inside-Out{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ayur-gold to-yellow-200">
              Vitality & Performance Combo
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ayur-sand/90 max-w-2xl mx-auto leading-relaxed">
            Why treat only half the problem? Build sustained internal stamina, energy, and muscle vigor from within while mastering instantaneous topical control.
          </p>
        </div>

        {/* 3D Spotlight Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column: 3D Floating Combo Box Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg group">
              {/* Glowing Aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-ayur-gold/30 via-emerald-500/20 to-ayur-gold/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* 3D Image Card */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-[#163827] to-[#0a1b12] border-2 border-ayur-gold/40 shadow-2xl p-2.5">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/products/vitality-power-combo.jpg"
                    alt="Vitality & Performance Power Combo with Red Ribbon on Natural Slate Stone"
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 550px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold text-black bg-gradient-to-r from-ayur-gold to-yellow-300 shadow-xl flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-black" />
                      COMPLETE 30-DAY PACK
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-red-600/90 shadow-lg border border-red-400/50 backdrop-blur-md">
                      SAVE FLAT ₹799
                    </span>
                  </div>

                  {/* Bottom Image Overlay Tag */}
                  <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-ayur-gold font-bold uppercase tracking-wider">Dual Action Regimen</p>
                      <p className="text-sm font-semibold text-white">BODY Nutrition (60 Caps) + STAYMAX+ (30 ml)</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-ayur-sand/70 line-through">₹2,798</div>
                      <div className="text-lg font-bold text-ayur-gold font-heading">₹1,999</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Combo Breakdown & Direct Purchase */}
          <div className="lg:col-span-6 space-y-6">
            {/* The 2 Core Products Inside Breakdown */}
            <div className="space-y-3.5">
              {/* Product 1 Inside Combo */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-ayur-gold/50 transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xl">🌿</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading font-semibold text-base text-white">Bottle 1: BODY Essential Nutrition</h3>
                    <span className="text-xs text-ayur-gold font-medium bg-ayur-gold/10 px-2 py-0.5 rounded-md">Worth ₹1,499</span>
                  </div>
                  <p className="text-xs text-ayur-sand/90 mt-1 leading-relaxed">
                    60 vegetarian capsules with standardized Ashwagandha, Shilajit, Safed Musli & Gokshura. Builds daily stamina, physical strength, and hormonal vitality from the root.
                  </p>
                </div>
              </div>

              {/* Product 2 Inside Combo */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-ayur-gold/50 transition-all duration-300 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-ayur-gold/20 border border-ayur-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xl">⚡</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading font-semibold text-base text-white">Bottle 2: STAYMAX+ Delay Spray</h3>
                    <span className="text-xs text-ayur-gold font-medium bg-ayur-gold/10 px-2 py-0.5 rounded-md">Worth ₹899</span>
                  </div>
                  <p className="text-xs text-ayur-sand/90 mt-1 leading-relaxed">
                    30 ml metered spray (100+ sprays) with Lidocaine USP 10%, Aloe Vera & Vitamin E. Fast action in 10-15 minutes for extended endurance and confidence without numbness.
                  </p>
                </div>
              </div>

              {/* Bonus Included */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-ayur-gold/15 to-transparent border border-ayur-gold/30 flex items-center gap-3">
                <Shield className="w-5 h-5 text-ayur-gold flex-shrink-0" />
                <p className="text-xs text-ayur-cream/90">
                  <strong className="text-ayur-gold">FREE Bonus:</strong> Ayurvedic Lifestyle Protocol Guide + Guaranteed 100% Discreet Confidential Plain Brown Box Delivery.
                </p>
              </div>
            </div>

            {/* Savings & Price Banner */}
            <div className="p-4 rounded-2xl bg-black/40 border border-ayur-gold/40 flex items-center justify-between">
              <div>
                <p className="text-xs text-ayur-sand uppercase tracking-wider font-semibold">Special Bundle Price</p>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-white">₹1,999</span>
                  <span className="text-sm text-ayur-sand/70 line-through">₹2,798</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40">
                    SAVE ₹799
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block text-[11px] font-semibold text-emerald-300 bg-emerald-900/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  ⚡ Free Express Delivery
                </span>
                <p className="text-[10px] text-ayur-sand/80 mt-1">Cash on Delivery Available</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <Button
                onClick={handleAddComboToCart}
                variant="gold"
                size="lg"
                className="w-full text-sm font-bold py-3.5 rounded-2xl shadow-xl shadow-ayur-gold/20 flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Claim Combo — ₹1,999</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={handleWhatsAppOrder}
                variant="whatsapp"
                size="lg"
                className="w-full text-sm font-bold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2"
              >
                <span>WhatsApp Order (COD)</span>
              </Button>
            </div>

            {/* Micro Trust Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-ayur-sand/80 border-t border-white/10">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-ayur-gold" /> Ayush Approved
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-ayur-gold" /> 100% Herbal Active
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-ayur-gold" /> Zero Chemical Side Effects
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-ayur-gold" /> Plain Brown Box
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
