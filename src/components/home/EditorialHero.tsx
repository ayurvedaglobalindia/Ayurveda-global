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
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from '@/store/whatsappStore'
import { useUserStore } from '@/store/userStore'

export function EditorialHero() {
  const { user } = useUserStore()

  const handleVaidyaConsult = () => {
    const primaryAddr = user?.addresses?.[0]
    const userCity = primaryAddr ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(', ') : ''
    const message = buildVaidyaConsultationMessage({
      patientName: user?.name || '',
      patientPhone: user?.phone || '',
      patientCity: userCity,
      concern: 'Sustained Stamina & Classical Rasayana Regimen',
      enquiry: 'Pranam Chief Vaidya Ji. I would like a confidential consultation regarding physical stamina, wellness, and dosage guidelines for your formulations.',
      source: 'hero',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  return (
    <section className="relative bg-[#090A0D] text-[#FAF7EE] py-12 sm:py-16 lg:py-24 border-b border-[#999999]/20 overflow-hidden">
      {/* Subtle organic warmth */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (Editorial Narrative & Classical Authority) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Atelier Heritage Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#999999] uppercase">
              <span>Ayur Veda Global</span>
              <span className="text-[#999999]/40">•</span>
              <span className="text-[#D8C28A] tracking-[0.18em]">Charaka Samhita Classical Pharmacopeia</span>
            </div>

            {/* Regal Heading - High-Precision Editorial Typography */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-normal text-[#FAF7EE] leading-[1.14] tracking-tight">
              Classical Botanical Chemistry.{' '}
              <span className="italic font-serif text-[#D8C28A] font-normal block sm:inline">
                Formulated for Sustained Vigor.
              </span>
            </h1>

            {/* Editorial Thesis Statement in Refined #999999 Gray */}
            <p className="text-sm sm:text-[15px] text-[#999999] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Rooted in centuries of classical Ayurvedic compendia. We harvest high-altitude Himalayan Shilajit, pure organic Ashwagandha, and sacred adaptogenic botanicals to restore cellular ATP energy, endocrine balance, and enduring constitutional vitality.
            </p>

            {/* Master Quality Specifications (3-Column Minimalist Ledger) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 text-left max-w-xl mx-auto lg:mx-0 border-y border-[#999999]/20 py-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#999999] font-mono block">
                  01 / Ashwagandha
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-1">5% Standardized</p>
                <p className="text-[11px] text-[#999999] mt-0.5">HPLC Withanolides</p>
              </div>

              <div className="border-l border-[#999999]/20 pl-3 sm:pl-4">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#999999] font-mono block">
                  02 / Himalayan Shilajit
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-1">84+ Ionic Minerals</p>
                <p className="text-[11px] text-[#999999] mt-0.5">75%+ Fulvic Acid</p>
              </div>

              <div className="border-l border-[#999999]/20 pl-3 sm:pl-4">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#999999] font-mono block">
                  03 / Vedic Shodhana
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-1">21 Purification Cycles</p>
                <p className="text-[11px] text-[#999999] mt-0.5">Triphala Decoctions</p>
              </div>
            </div>

            {/* Action CTAs & Concierge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <a
                href="#apothecary"
                className="px-8 py-3.5 rounded-full bg-[#D8C28A] hover:bg-[#E6D5AC] text-[#090A0D] font-semibold text-xs uppercase tracking-[0.14em] transition-all duration-300 hover:scale-[1.02] shadow-sm flex items-center gap-2 group"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={handleVaidyaConsult}
                className="px-7 py-3.5 rounded-full bg-transparent hover:bg-[#141720] border border-[#999999]/30 hover:border-[#D8C28A]/50 text-[#FAF7EE] font-medium text-xs uppercase tracking-[0.14em] transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#6EE7B7]" />
                <span>Consult Chief Vaidya</span>
              </button>
            </div>

            {/* Quiet Hallmark Footnote */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 pt-2 text-xs text-[#999999]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#FAF7EE] font-serif text-sm">4.9 / 5</span>
                <span>• 1,240+ verified patrons across India</span>
              </div>
              <span className="hidden sm:inline text-[#999999]/40">•</span>
              <div className="flex items-center gap-1.5 text-[#999999]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7B7]" />
                <span>AYUSH Licensed • 100% Confidential Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column (Archival Product Vitrine Presentation) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] p-5 sm:p-6 rounded-3xl bg-[#0D0F15] border border-[#999999]/20 hover:border-[#999999]/40 transition-all duration-500 shadow-xl overflow-hidden group">
              
              {/* Monograph Index Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#999999]/15 text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                <span>Formulation: Power Combo</span>
                <span className="text-[#D8C28A]">Batch № 24-AVG</span>
              </div>

              {/* Product Photography Showcase with Direct Link */}
              <Link
                href="/product/vitality-power-combo"
                className="relative w-full aspect-[4/5] block my-3 overflow-hidden rounded-2xl bg-[#090A0D]"
                aria-label="View Vitality & Performance Power Combo"
              >
                <Image
                  src="/images/products/vitality-power-combo-card.jpg"
                  alt="Ayur Veda Global Vitality Power Combo - Ayurvedic Rasayana Capsules & Topical Elixir"
                  fill
                  priority
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                  sizes="(max-width: 768px) 340px, 380px"
                />
              </Link>

              {/* Archival Monograph Details */}
              <div className="pt-3 border-t border-[#999999]/15 space-y-1.5 text-[11px] text-[#999999]">
                <div className="flex justify-between">
                  <span className="font-mono uppercase text-[9.5px]">Composition</span>
                  <span className="text-[#FAF7EE] text-right font-medium">Shilajit + Ashwagandha + Delay Spray</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono uppercase text-[9.5px]">Standardization</span>
                  <span className="text-[#6EE7B7] text-right">HPLC Tested &amp; Heavy Metal Screened</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono uppercase text-[9.5px]">Discretion</span>
                  <span className="text-[#FAF7EE] text-right">Plain Unmarked Box • COD Available</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
