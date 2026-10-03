'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShieldCheck,
  Star,
  ArrowRight,
  Leaf,
  Sparkles,
  CheckCircle2,
  Clock,
  Award,
  PhoneCall,
  MessageCircle,
} from 'lucide-react'
import { buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'

export function EditorialHero() {
  const handleVaidyaConsult = () => {
    const message = buildProductEnquiryMessage({
      customerName: '',
      productName: 'Ayurvedic Formulations & Regimen',
      quantity: 1,
      enquiry: 'Pranam. I would like a confidential consultation with your Chief Ayurvedic Vaidya regarding physical stamina and intimate wellness.',
      source: 'hero',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  return (
    <section className="relative bg-[#0B150F] text-[#F5EFE6] pt-10 sm:pt-14 lg:pt-20 pb-12 sm:pb-16 lg:pb-24 border-b border-[#C2A265]/20 overflow-hidden">
      {/* Subtle Warm Atmospheric Lighting - Restrained, non-neon */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C2A265]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#1B3624]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Botanical Border Hairline */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (Editorial Narrative & Clinical Authority) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
            
            {/* Regal Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF7EE] leading-[1.14] tracking-tight">
              Sacred Botanical Science,{' '}
              <span className="italic font-serif text-[#D4B678] block sm:inline">
                Formulated for Sustained Vigor.
              </span>
            </h1>

            {/* Editorial Thesis Statement */}
            <p className="text-sm sm:text-base text-[#C5BFB3] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Rooted in the Charaka Samhita, Ayur Veda Global unites high-altitude Himalayan Shilajit, organically cultivated Ashwagandha, and sacred Rasayana botanicals—purified through 21 cycles of classical Shodhana. Engineered for cellular ATP energy, deep tissue rejuvenation, and natural endurance with zero side effects.
            </p>

            {/* Master Quality Specifications (3-Column Clean Stat Strip) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1 text-left">
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#12241A]/90 border border-[#C2A265]/20">
                <span className="text-[10px] uppercase tracking-wider text-[#C2A265] font-semibold block">
                  Ashwagandha
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-0.5">5% Withanolides</p>
                <p className="text-[10px] text-[#A6A094] hidden sm:block mt-0.5">Pure Root Extract</p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#12241A]/90 border border-[#C2A265]/20">
                <span className="text-[10px] uppercase tracking-wider text-[#C2A265] font-semibold block">
                  Himalayan Shilajit
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-0.5">84+ Fulvic Minerals</p>
                <p className="text-[10px] text-[#A6A094] hidden sm:block mt-0.5">16,000+ Ft Sourced</p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#12241A]/90 border border-[#C2A265]/20">
                <span className="text-[10px] uppercase tracking-wider text-[#C2A265] font-semibold block">
                  Vedic Shodhana
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-0.5">21-Day Purification</p>
                <p className="text-[10px] text-[#A6A094] hidden sm:block mt-0.5">Triphala Decoctions</p>
              </div>
            </div>

            {/* Action CTAs & Concierge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <a
                href="#apothecary"
                className="px-8 py-3.5 rounded-full bg-[#C2A265] hover:bg-[#D4B678] text-[#0B150F] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Explore The Formulations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={handleVaidyaConsult}
                className="px-6 py-3.5 rounded-full bg-[#12241A] hover:bg-[#183222] border border-[#C2A265]/40 hover:border-[#C2A265] text-[#FAF7EE] font-medium text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-[#C2A265]" />
                <span>Consult Chief Vaidya</span>
              </button>
            </div>

            {/* Trust Proof Metrics Line */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-1 text-xs text-[#A6A094]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#C2A265]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[#FAF7EE] font-semibold">4.9 / 5</span>
                <span>(1,240+ Verified Patrons)</span>
              </div>
            </div>

          </div>

          {/* Right Column (Apothecary Arched Showcase & Product Pedestal) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">
              
              {/* Classical Arch Frame Background */}
              <div className="absolute inset-0 rounded-t-[140px] rounded-b-3xl bg-gradient-to-b from-[#13281C] via-[#0E1E14] to-[#0A160F] border border-[#C2A265]/25 shadow-2xl p-6 sm:p-7 flex flex-col justify-between">
                
                {/* Arch Top Header */}
                <div className="text-center pt-2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#162D1F] border border-[#C2A265]/30 text-[10px] tracking-[0.22em] uppercase text-[#D4B678] font-semibold">
                    Master Rasayana Series
                  </span>
                </div>

                {/* Pedestal Base Hallmark Strip - Neatly integrated inside card */}
                <div className="border-t border-[#C2A265]/20 pt-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#D4B678] font-medium text-[11px]">
                    <Leaf className="w-3.5 h-3.5 text-[#C2A265] flex-shrink-0" />
                    <span>100% Herbal Actives • Non-Hormonal</span>
                  </div>
                  <span className="text-[10px] text-[#A6A094] uppercase tracking-wider font-mono">AVG-2026-R</span>
                </div>
              </div>

              {/* Product Photography on Architectural Pedestal */}
              <div className="relative z-10 w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-92">
                <Image
                  src="/images/products/vitality-power-combo.jpg"
                  alt="Ayur Veda Global Vitality Power Combo - Ayurvedic Rasayana Capsules & Topical Elixir"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                  sizes="(max-width: 768px) 280px, 400px"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
