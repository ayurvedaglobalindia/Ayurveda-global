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
    <section className="relative bg-[#0B150F] text-[#F5EFE6] pt-12 sm:pt-16 lg:pt-24 pb-16 sm:pb-20 lg:pb-28 border-b border-[#C2A265]/20 overflow-hidden">
      {/* Subtle Warm Atmospheric Lighting - Restrained, non-neon */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C2A265]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#1B3624]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Botanical Border Hairline */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Editorial Narrative & Clinical Authority) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Monogram Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#12241A] border border-[#C2A265]/30 text-[#C2A265] text-[11px] font-semibold tracking-[0.22em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C2A265]" />
              <span>Classical Ayurvedic Apothecary • AYUSH Standard</span>
            </div>

            {/* Regal Heading */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FAF7EE] leading-[1.15] tracking-tight">
              Sacred Botanical Science,{' '}
              <span className="italic font-serif text-[#D4B678]">
                Formulated for Sustained Vigor.
              </span>
            </h1>

            {/* Editorial Thesis Statement */}
            <p className="text-sm sm:text-base text-[#C5BFB3] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Rooted in the Charaka Samhita, Ayur Veda Global unites high-altitude Himalayan Shilajit, organically cultivated Ashwagandha, and sacred Rasayana botanicals—purified through 21 cycles of classical Shodhana. Engineered for cellular ATP energy, deep tissue rejuvenation, and natural endurance with zero side effects.
            </p>

            {/* Master Quality Pillars (3-Column Understated Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-left">
              <div className="p-3.5 rounded-xl bg-[#102016]/90 border border-[#C2A265]/15">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C2A265] font-semibold block mb-1">
                  01 / Bioactives
                </span>
                <p className="text-xs font-medium text-[#FAF7EE]">5% Withanolides</p>
                <p className="text-[11px] text-[#A6A094] mt-0.5">84+ Ionic Fulvic Minerals</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#102016]/90 border border-[#C2A265]/15">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C2A265] font-semibold block mb-1">
                  02 / Formulation
                </span>
                <p className="text-xs font-medium text-[#FAF7EE]">100% Plant Cellulose</p>
                <p className="text-[11px] text-[#A6A094] mt-0.5">Zero Gelatin or Binders</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#102016]/90 border border-[#C2A265]/15">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C2A265] font-semibold block mb-1">
                  03 / Verification
                </span>
                <p className="text-xs font-medium text-[#FAF7EE]">NABL Tested Purity</p>
                <p className="text-[11px] text-[#A6A094] mt-0.5">0% Heavy Metals &amp; Solvents</p>
              </div>
            </div>

            {/* Action CTAs & Concierge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#apothecary"
                className="px-8 py-3.5 rounded-full bg-[#C2A265] hover:bg-[#D4B678] text-[#0B150F] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Explore The Formulations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={handleVaidyaConsult}
                className="px-6 py-3.5 rounded-full bg-transparent hover:bg-[#12241A] border border-[#C2A265]/40 hover:border-[#C2A265] text-[#FAF7EE] font-medium text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-[#C2A265]" />
                <span>Consult Chief Vaidya</span>
              </button>
            </div>

            {/* Trust Proof Metrics Line */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-3 text-xs text-[#A6A094]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#C2A265]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[#FAF7EE] font-semibold">4.9 / 5</span>
                <span>(1,240+ Verified Patrons)</span>
              </div>

              <div className="h-3 w-px bg-[#C2A265]/20 hidden sm:block" />

              <div className="flex items-center gap-1.5 text-[#C5BFB3]">
                <ShieldCheck className="w-4 h-4 text-[#C2A265]" />
                <span>100% Discreet Unmarked Delivery</span>
              </div>

              <div className="h-3 w-px bg-[#C2A265]/20 hidden sm:block" />

              <div className="flex items-center gap-1.5 text-[#C5BFB3]">
                <Award className="w-4 h-4 text-[#C2A265]" />
                <span>AYUSH Ministry Certified</span>
              </div>
            </div>

          </div>

          {/* Right Column (Apothecary Arched Showcase & Product Pedestal) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/5] flex items-center justify-center">
              
              {/* Classical Arch Frame Background */}
              <div className="absolute inset-0 rounded-t-[140px] rounded-b-3xl bg-gradient-to-b from-[#13281C] via-[#0E1E14] to-[#0A160F] border border-[#C2A265]/25 shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
                
                {/* Arch Top Emblem */}
                <div className="text-center pt-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#C2A265]/30 text-[#C2A265] text-xs font-serif mb-2">
                    ॐ
                  </div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#C2A265] font-medium">
                    Master Rasayana Series
                  </p>
                </div>

                {/* Pedestal Base Mark */}
                <div className="border-t border-[#C2A265]/20 pt-3 flex items-center justify-between text-[11px] text-[#A6A094]">
                  <span>Vedic Shodhana Purified</span>
                  <span className="text-[#C2A265] font-semibold">Batch No. AVG-2026-R</span>
                </div>
              </div>

              {/* Product Photography on Architectural Pedestal */}
              <div className="relative z-10 w-64 sm:w-80 h-72 sm:h-96">
                <Image
                  src="/images/products/vitality-power-combo.jpg"
                  alt="Ayur Veda Global Vitality Power Combo - Ayurvedic Rasayana Capsules & Topical Elixir"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
                  sizes="(max-width: 768px) 280px, 400px"
                />
              </div>

              {/* Dignified Hallmark Seal (Bottom Right Corner) */}
              <div className="absolute -bottom-3 -right-2 sm:right-2 z-20 px-3.5 py-2 rounded-xl bg-[#12241A] border border-[#C2A265]/40 shadow-xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#C2A265]/15 border border-[#C2A265]/30 flex items-center justify-center text-[#C2A265]">
                  <Leaf className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-wider text-[#C2A265] font-bold">100% Herbal Actives</p>
                  <p className="text-xs font-semibold text-[#FAF7EE]">Non-Hormonal Formula</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
