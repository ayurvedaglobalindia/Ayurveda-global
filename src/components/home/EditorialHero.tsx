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
    <section className="relative bg-[#08090C] text-[#FAF7EE] py-10 sm:py-14 lg:py-20 border-b border-[#999999]/20 overflow-hidden">
      {/* Bespoke Dual Atmospheric Lighting: Soft Champagne Gold (Left) & Herbal Nature Green (Right) */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#D8C28A]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#6EE7B7]/7 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Subtle Grid Lines for Architectural Luxury Precision */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Editorial Narrative & Clinical Authority) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            {/* Atelier Hallmark Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#11141E]/95 border border-[#999999]/30 text-xs shadow-md mx-auto lg:mx-0 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6EE7B7] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6EE7B7]" />
              </span>
              <span className="text-[10px] font-mono tracking-[0.24em] text-[#999999] uppercase font-medium">
                № 01 • Rasayana Atelier
              </span>
              <span className="text-[#999999]/40">•</span>
              <span className="text-[10px] font-semibold text-[#E6D5AC] uppercase tracking-[0.16em]">
                100% Herbal Actives
              </span>
            </div>

            {/* Regal Heading - High-Precision Editorial Typography */}
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-5xl font-light text-[#FAF7EE] leading-[1.18] tracking-tight">
              Sacred Botanical Science,{' '}
              <span className="italic font-serif block sm:inline bg-gradient-to-r from-[#F4EBD0] via-[#D8C28A] to-[#6EE7B7] bg-clip-text text-transparent font-normal">
                Formulated for Sustained Vigor.
              </span>
            </h1>

            {/* Editorial Thesis Statement in Refined #999999 Gray */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-[#999999] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Rooted in classical Charaka Samhita texts. Formulated with high-altitude Himalayan Shilajit, pure organic Ashwagandha, and sacred Rasayana botanicals for cellular ATP vitality, endocrine balance, and enduring stamina.
            </p>

            {/* Master Quality Specifications (3-Column Atelier Specification Strip) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1 text-left max-w-xl mx-auto lg:mx-0">
              <div className="py-2.5 px-3 rounded-2xl bg-gradient-to-br from-[#11141E]/95 to-[#0B0D14]/95 border border-[#999999]/25 hover:border-[#6EE7B7]/40 transition-all duration-300 shadow-sm group">
                <span className="text-[9.5px] uppercase tracking-[0.18em] text-[#E6D5AC] font-semibold block truncate">
                  Ashwagandha
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#FAF7EE] mt-1">5% Withanolides</p>
                <p className="text-[10px] text-[#999999] hidden sm:block mt-0.5">KSM-66 Standard</p>
              </div>

              <div className="py-2.5 px-3 rounded-2xl bg-gradient-to-br from-[#11141E]/95 to-[#0B0D14]/95 border border-[#999999]/25 hover:border-[#D8C28A]/40 transition-all duration-300 shadow-sm group">
                <span className="text-[9.5px] uppercase tracking-[0.18em] text-[#E6D5AC] font-semibold block truncate">
                  Pure Shilajit
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#FAF7EE] mt-1">84+ Minerals</p>
                <p className="text-[10px] text-[#999999] hidden sm:block mt-0.5">16,000+ Ft Sourced</p>
              </div>

              <div className="py-2.5 px-3 rounded-2xl bg-gradient-to-br from-[#11141E]/95 to-[#0B0D14]/95 border border-[#999999]/25 hover:border-[#6EE7B7]/40 transition-all duration-300 shadow-sm group">
                <span className="text-[9.5px] uppercase tracking-[0.18em] text-[#E6D5AC] font-semibold block truncate">
                  Vedic Shodhana
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#FAF7EE] mt-1">21-Day Cycles</p>
                <p className="text-[10px] text-[#999999] hidden sm:block mt-0.5">Triphala Purified</p>
              </div>
            </div>

            {/* Action CTAs & Concierge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#apothecary"
                className="px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#E6D5AC] to-[#D8C28A] hover:from-[#F0E2C2] hover:to-[#E6D5AC] text-[#08090C] font-bold text-xs uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5 shadow-[0_6px_24px_rgba(216,194,138,0.25)] flex items-center gap-2 group"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={handleVaidyaConsult}
                className="px-6 py-3 sm:py-3.5 rounded-full bg-[#11141E]/95 hover:bg-[#151926] border border-[#6EE7B7]/40 hover:border-[#6EE7B7]/70 text-[#6EE7B7] font-semibold text-xs uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 shadow-[0_4px_16px_rgba(110,231,183,0.12)] backdrop-blur-md"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#6EE7B7]" />
                <span>Consult Chief Vaidya</span>
              </button>
            </div>

            {/* Trust Proof Metrics Line with #999999 Details */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 pt-1 text-xs text-[#999999]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#D8C28A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[#FAF7EE] font-semibold text-xs">4.9 / 5</span>
                <span>(1,240+ Verified Patrons)</span>
              </div>
              <span className="hidden sm:inline text-[#999999]/40">•</span>
              <span className="text-[#6EE7B7] font-medium flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7B7]" />
                Pan-India Free Express Delivery • COD Available
              </span>
            </div>

          </div>

          {/* Right Column (Apothecary Arched Showcase & Product Pedestal) */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Ambient Vitrine Glow */}
            <div className="absolute inset-0 max-w-[320px] aspect-[4/5] mx-auto bg-gradient-to-t from-[#D8C28A]/10 via-[#6EE7B7]/5 to-transparent rounded-t-[100px] rounded-b-3xl blur-2xl pointer-events-none" />

            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] flex flex-col justify-between items-center p-4 sm:p-5 rounded-t-[90px] rounded-b-3xl bg-gradient-to-b from-[#151926] via-[#10131B] to-[#08090C] border border-[#999999]/30 hover:border-[#D8C28A]/50 transition-all duration-500 shadow-2xl overflow-hidden group">
              
              {/* Arch Top Header */}
              <div className="text-center pt-1 z-10">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#08090C]/90 border border-[#6EE7B7]/35 text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-[#6EE7B7] font-bold shadow-sm backdrop-blur-md">
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
                  className="object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  sizes="(max-width: 768px) 280px, 320px"
                />
              </Link>

              {/* Pedestal Base Hallmark Strip */}
              <div className="w-full border-t border-[#999999]/20 pt-2.5 flex items-center justify-between text-xs z-10">
                <div className="flex items-center gap-1.5 text-[#E6D5AC] font-medium text-[10px] sm:text-[11px]">
                  <Leaf className="w-3.5 h-3.5 text-[#6EE7B7] flex-shrink-0" />
                  <span>100% Classical Actives</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#999999] uppercase tracking-wider font-mono">AVG-2026-R</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
