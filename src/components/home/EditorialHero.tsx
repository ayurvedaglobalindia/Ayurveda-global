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
    <section className="relative bg-[#0B150F] text-[#F5EFE6] pt-6 sm:pt-8 lg:pt-12 pb-8 sm:pb-10 lg:pb-14 border-b border-[#C2A265]/20 overflow-hidden">
      {/* Subtle Warm Atmospheric Lighting - Restrained, non-neon */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#C2A265]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-[#1B3624]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Botanical Border Hairline */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Editorial Narrative & Clinical Authority) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            
            {/* Regal Heading - Balanced Scale */}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-normal text-[#FAF7EE] leading-snug tracking-tight">
              Sacred Botanical Science,{' '}
              <span className="italic font-serif text-[#D4B678] block sm:inline">
                Formulated for Sustained Vigor.
              </span>
            </h1>

            {/* Editorial Thesis Statement - Crisp & Concise */}
            <p className="text-xs sm:text-sm text-[#C5BFB3] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Rooted in the Charaka Samhita. Formulated with high-altitude Himalayan Shilajit, organic Ashwagandha, and sacred Rasayana botanicals for cellular ATP stamina, deep tissue rejuvenation, and natural endurance.
            </p>

            {/* Master Quality Specifications (3-Column Clean Stat Strip) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3.5 pt-1 text-left max-w-lg mx-auto lg:mx-0">
              <div className="py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl bg-[#12241A]/90 border border-[#C2A265]/20">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C2A265] font-semibold block truncate">
                  Ashwagandha
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-0.5">5% Withanolides</p>
                <p className="text-[10px] text-[#A6A094] hidden sm:block mt-0.5">Pure Root Extract</p>
              </div>

              <div className="py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl bg-[#12241A]/90 border border-[#C2A265]/20">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C2A265] font-semibold block truncate">
                  Himalayan Shilajit
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-0.5">84+ Minerals</p>
                <p className="text-[10px] text-[#A6A094] hidden sm:block mt-0.5">16,000+ Ft Sourced</p>
              </div>

              <div className="py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl bg-[#12241A]/90 border border-[#C2A265]/20">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C2A265] font-semibold block truncate">
                  Vedic Shodhana
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-0.5">21-Day Cycles</p>
                <p className="text-[10px] text-[#A6A094] hidden sm:block mt-0.5">Triphala Decoctions</p>
              </div>
            </div>

            {/* Action CTAs & Concierge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <a
                href="#apothecary"
                className="px-6 sm:px-8 py-3 rounded-full bg-[#C2A265] hover:bg-[#D4B678] text-[#0B150F] font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-md flex items-center gap-2 group"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={handleVaidyaConsult}
                className="px-5 sm:px-6 py-3 rounded-full bg-[#12241A] hover:bg-[#183222] border border-[#C2A265]/40 hover:border-[#C2A265] text-[#FAF7EE] font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#C2A265]" />
                <span>Consult Chief Vaidya</span>
              </button>
            </div>

            {/* Trust Proof Metrics Line */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 pt-1 text-xs text-[#A6A094]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#C2A265]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[#FAF7EE] font-semibold">4.9 / 5</span>
                <span>(1,240+ Patrons)</span>
              </div>
              <span className="hidden sm:inline text-[#C2A265]/40">•</span>
              <span className="text-[#D4B678] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C2A265]" />
                AYUSH Licensed
              </span>
              <span className="hidden sm:inline text-[#C2A265]/40">•</span>
              <span>100% Discreet Packaging</span>
            </div>

          </div>

          {/* Right Column (Apothecary Arched Showcase & Product Pedestal) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[340px] sm:max-w-sm aspect-[4/5] flex items-center justify-center">
              
              {/* Classical Arch Frame Background */}
              <div className="absolute inset-0 rounded-t-[120px] rounded-b-2xl bg-gradient-to-b from-[#13281C] via-[#0E1E14] to-[#0A160F] border border-[#C2A265]/25 shadow-2xl p-5 sm:p-6 flex flex-col justify-between">
                
                {/* Arch Top Header */}
                <div className="text-center pt-1.5">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-[#162D1F] border border-[#C2A265]/30 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[#D4B678] font-semibold">
                    Master Rasayana Series
                  </span>
                </div>

                {/* Pedestal Base Hallmark Strip - Neatly integrated inside card */}
                <div className="border-t border-[#C2A265]/20 pt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#D4B678] font-medium text-[10px] sm:text-[11px]">
                    <Leaf className="w-3.5 h-3.5 text-[#C2A265] flex-shrink-0" />
                    <span>100% Herbal Actives • Non-Hormonal</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-[#A6A094] uppercase tracking-wider font-mono">AVG-2026-R</span>
                </div>
              </div>

              {/* Product Photography on Architectural Pedestal */}
              <div className="relative z-10 w-52 sm:w-60 md:w-68 h-60 sm:h-68 md:h-76">
                <Image
                  src="/images/products/vitality-power-combo.jpg"
                  alt="Ayur Veda Global Vitality Power Combo - Ayurvedic Rasayana Capsules & Topical Elixir"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.85)]"
                  sizes="(max-width: 768px) 240px, 320px"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
