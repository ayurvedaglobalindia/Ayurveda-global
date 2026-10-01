'use client'

import React from 'react'
import { ProductVideoPlayer } from '@/components/ui/ProductVideoPlayer'
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react'

export function HomeVideoSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#07130D] via-[#0B1E14] to-[#07130D] border-y border-[#D4AF37]/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />

      <div className="container relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product In Action</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-4">
            Experience Pure Herbal Excellence
          </h2>
          <p className="text-[#C4BDA8] text-base sm:text-lg leading-relaxed">
            See our lab-certified formulations, authentic Himalayan Shilajit, and standardized herbal extracts in motion.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-[#030906]/80 p-2 sm:p-4">
          <ProductVideoPlayer
            videoSrc="/videos/ayur-veda-product-showcase.mp4"
            posterSrc="/images/products/body-essential-nutrition.png"
            title="Authentic Product Experience"
            subtitle="Laboratory tested purity, 100% natural formulation"
            hideHeader={false}
          />
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-[#0D2418]/60 border border-[#D4AF37]/15">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] mx-auto mb-1.5" />
            <span className="text-xs font-semibold text-white block">AYUSH Certified</span>
            <span className="text-[11px] text-[#A7B3A9]">Classical Rasayana</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0D2418]/60 border border-[#D4AF37]/15">
            <CheckCircle2 className="w-5 h-5 text-[#25D366] mx-auto mb-1.5" />
            <span className="text-xs font-semibold text-white block">100% Herbal</span>
            <span className="text-[11px] text-[#A7B3A9]">Zero harmful chemicals</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0D2418]/60 border border-[#D4AF37]/15">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] mx-auto mb-1.5" />
            <span className="text-xs font-semibold text-white block">Discreet Delivery</span>
            <span className="text-[11px] text-[#A7B3A9]">Confidential packaging</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0D2418]/60 border border-[#D4AF37]/15">
            <CheckCircle2 className="w-5 h-5 text-[#25D366] mx-auto mb-1.5" />
            <span className="text-xs font-semibold text-white block">Cash on Delivery</span>
            <span className="text-[11px] text-[#A7B3A9]">Available across India</span>
          </div>
        </div>
      </div>
    </section>
  )
}
