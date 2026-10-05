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
    <section className="relative bg-[#08090C] text-[#F5EFE6] pt-4 sm:pt-6 lg:pt-8 pb-5 sm:pb-7 lg:pb-8 border-b border-[#999999]/20 overflow-hidden">
      {/* Bespoke Dual Atmospheric Lighting: Soft Champagne Gold (Left) & Herbal Nature Green (Right) */}
      <div className="absolute top-0 -left-10 w-[420px] h-[420px] bg-[#D8C28A]/7 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[380px] h-[380px] bg-[#6EE7B7]/8 rounded-full blur-[130px] pointer-events-none" />

      {/* Decorative Atelier Hairline */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          
          {/* Left Column (Editorial Narrative & Clinical Authority) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-3.5 text-center lg:text-left">
            
            {/* Atelier Hallmark Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11141E] border border-[#999999]/30 text-xs shadow-sm mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6EE7B7] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6EE7B7]" />
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#999999] uppercase">
                № 01 • Rasayana Atelier
              </span>
              <span className="text-[#999999]/40">•</span>
              <span className="text-[10px] font-semibold text-[#E6D5AC] uppercase tracking-wider">
                100% Herbal Actives
              </span>
            </div>

            {/* Regal Heading - Balanced Compact Scale with Soft Dual Gold & Herbal Gradient */}
            <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl xl:text-[32px] font-normal text-[#FAF7EE] leading-tight tracking-tight">
              Sacred Botanical Science,{' '}
              <span className="italic font-serif block sm:inline bg-gradient-to-r from-[#EFE2C2] via-[#D8C28A] to-[#6EE7B7] bg-clip-text text-transparent">
                Formulated for Sustained Vigor.
              </span>
            </h1>

            {/* Editorial Thesis Statement in Refined #999999 Gray */}
            <p className="text-xs sm:text-[13px] text-[#999999] max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Rooted in classical Charaka Samhita texts. Formulated with high-altitude Himalayan Shilajit, pure organic Ashwagandha, and sacred Rasayana botanicals for cellular ATP vitality, endocrine balance, and enduring stamina.
            </p>

            {/* Master Quality Specifications (3-Column Atelier Specification Strip) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-0.5 text-left max-w-lg mx-auto lg:mx-0">
              <div className="py-2 px-2.5 rounded-xl bg-gradient-to-br from-[#121622]/95 to-[#0D1018]/95 border border-[#999999]/25 hover:border-[#6EE7B7]/40 transition-all duration-300 shadow-sm group">
                <span className="text-[9px] uppercase tracking-wider text-[#E6D5AC] font-semibold block truncate">
                  Ashwagandha
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-0.5">5% Withanolides</p>
                <p className="text-[10px] text-[#999999] hidden sm:block mt-0.5">Pure Root Extract</p>
              </div>

              <div className="py-2 px-2.5 rounded-xl bg-gradient-to-br from-[#121622]/95 to-[#0D1018]/95 border border-[#999999]/25 hover:border-[#D8C28A]/40 transition-all duration-300 shadow-sm group">
                <span className="text-[9px] uppercase tracking-wider text-[#E6D5AC] font-semibold block truncate">
                  Himalayan Shilajit
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-0.5">84+ Bio Minerals</p>
                <p className="text-[10px] text-[#999999] hidden sm:block mt-0.5">16,000+ Ft Sourced</p>
              </div>

              <div className="py-2 px-2.5 rounded-xl bg-gradient-to-br from-[#121622]/95 to-[#0D1018]/95 border border-[#999999]/25 hover:border-[#6EE7B7]/40 transition-all duration-300 shadow-sm group">
                <span className="text-[9px] uppercase tracking-wider text-[#E6D5AC] font-semibold block truncate">
                  Vedic Shodhana
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#FAF7EE] mt-0.5">21-Day Cycles</p>
                <p className="text-[10px] text-[#999999] hidden sm:block mt-0.5">Triphala Purified</p>
              </div>
            </div>

            {/* Action CTAs & Concierge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
              <a
                href="#apothecary"
                className="px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E6D5AC] to-[#D8C28A] hover:from-[#F0E2C2] hover:to-[#E6D5AC] text-[#08090C] font-semibold text-xs sm:text-[13px] tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(216,194,138,0.22)] flex items-center gap-1.5 group"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={handleVaidyaConsult}
                className="px-4 sm:px-5 py-2.5 rounded-full bg-[#121622] hover:bg-[#161B28] border border-[#6EE7B7]/30 hover:border-[#6EE7B7]/60 text-[#6EE7B7] font-medium text-xs sm:text-[13px] tracking-wide transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-1.5 shadow-[0_4px_16px_rgba(110,231,183,0.1)]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#6EE7B7]" />
                <span>Consult Chief Vaidya</span>
              </button>
            </div>

            {/* Trust Proof Metrics Line with #999999 Details */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 pt-0.5 text-[11px] text-[#999999]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#D8C28A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-[#FAF7EE] font-semibold">4.9 / 5</span>
                <span>(1,240+ Patrons)</span>
              </div>
              <span className="hidden sm:inline text-[#999999]/40">•</span>
              <span className="text-[#6EE7B7] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#6EE7B7]" />
                Pan-India Free Express Delivery
              </span>
            </div>

          </div>

          {/* Right Column (Apothecary Arched Showcase & Product Pedestal) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[270px] sm:max-w-[300px] aspect-[4/5] flex flex-col justify-between items-center p-3.5 sm:p-4 rounded-t-[80px] rounded-b-2xl bg-gradient-to-b from-[#161A26] via-[#10131B] to-[#0A0C11] border border-[#999999]/30 hover:border-[#D8C28A]/45 transition-all duration-500 shadow-2xl overflow-hidden group">
              
              {/* Arch Top Header */}
              <div className="text-center pt-1 z-10">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#111622] border border-[#6EE7B7]/35 text-[8.5px] sm:text-[9.5px] tracking-[0.2em] uppercase text-[#6EE7B7] font-bold">
                  Master Rasayana Series
                </span>
              </div>

              {/* Product Photography Showcase with Direct Link */}
              <Link
                href="/product/vitality-power-combo"
                className="relative z-10 w-full h-[72%] block my-auto"
                aria-label="View Vitality & Performance Power Combo"
              >
                <Image
                  src="/images/products/vitality-power-combo-card.jpg"
                  alt="Ayur Veda Global Vitality Power Combo - Ayurvedic Rasayana Capsules & Topical Elixir"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  sizes="(max-width: 768px) 250px, 300px"
                />
              </Link>

              {/* Pedestal Base Hallmark Strip */}
              <div className="w-full border-t border-[#999999]/20 pt-2 flex items-center justify-between text-xs z-10">
                <div className="flex items-center gap-1.5 text-[#E6D5AC] font-medium text-[9.5px] sm:text-[10.5px]">
                  <Leaf className="w-3 h-3 text-[#6EE7B7] flex-shrink-0" />
                  <span>100% Classical Actives</span>
                </div>
                <span className="text-[8.5px] sm:text-[9.5px] text-[#999999] uppercase tracking-wider font-mono">AVG-2026-R</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
