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
    <section className="relative bg-[#0B150F] text-[#F5EFE6] pt-3.5 sm:pt-4 lg:pt-5 pb-4 sm:pb-5 lg:pb-6 border-b border-[#C2A265]/20 overflow-hidden">
      {/* Subtle Warm Atmospheric Lighting - Restrained, non-neon */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-[#C2A265]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-[#1B3624]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Botanical Border Hairline */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          
          {/* Left Column (Editorial Narrative & Clinical Authority) */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-3 text-center lg:text-left">
            
            {/* Regal Heading - Balanced Compact Scale */}
            <h1 className="font-heading text-lg sm:text-xl lg:text-2xl xl:text-[26px] font-normal text-[#FAF7EE] leading-snug tracking-tight">
              Sacred Botanical Science,{' '}
              <span className="italic font-serif text-[#D4B678] block sm:inline">
                Formulated for Sustained Vigor.
              </span>
            </h1>

            {/* Editorial Thesis Statement - Crisp & Compact */}
            <p className="text-[11px] sm:text-xs text-[#C5BFB3] max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Rooted in the Charaka Samhita. Formulated with high-altitude Himalayan Shilajit, organic Ashwagandha, and sacred Rasayana botanicals for cellular ATP stamina, deep tissue rejuvenation, and natural endurance.
            </p>

            {/* Master Quality Specifications (3-Column Clean Stat Strip) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-0.5 text-left max-w-lg mx-auto lg:mx-0">
              <div className="py-1.5 px-2 sm:py-2 sm:px-2.5 rounded-lg bg-[#12241A]/90 border border-[#C2A265]/20">
                <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#C2A265] font-semibold block truncate">
                  Ashwagandha
                </span>
                <p className="text-xs sm:text-[13px] font-medium text-[#FAF7EE] mt-0.5">5% Withanolides</p>
                <p className="text-[9.5px] text-[#A6A094] hidden sm:block mt-0.5">Pure Root Extract</p>
              </div>

              <div className="py-1.5 px-2 sm:py-2 sm:px-2.5 rounded-lg bg-[#12241A]/90 border border-[#C2A265]/20">
                <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#C2A265] font-semibold block truncate">
                  Himalayan Shilajit
                </span>
                <p className="text-xs sm:text-[13px] font-medium text-[#FAF7EE] mt-0.5">84+ Minerals</p>
                <p className="text-[9.5px] text-[#A6A094] hidden sm:block mt-0.5">16,000+ Ft Sourced</p>
              </div>

              <div className="py-1.5 px-2 sm:py-2 sm:px-2.5 rounded-lg bg-[#12241A]/90 border border-[#C2A265]/20">
                <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#C2A265] font-semibold block truncate">
                  Vedic Shodhana
                </span>
                <p className="text-xs sm:text-[13px] font-medium text-[#FAF7EE] mt-0.5">21-Day Cycles</p>
                <p className="text-[9.5px] text-[#A6A094] hidden sm:block mt-0.5">Triphala Decoctions</p>
              </div>
            </div>

            {/* Action CTAs & Concierge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-0.5">
              <a
                href="#apothecary"
                className="px-5 sm:px-6 py-2.5 rounded-full bg-[#C2A265] hover:bg-[#D4B678] text-[#0B150F] font-semibold text-xs sm:text-[13px] tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-md flex items-center gap-1.5 group"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={handleVaidyaConsult}
                className="px-4 sm:px-5 py-2.5 rounded-full bg-[#12241A] hover:bg-[#183222] border border-[#C2A265]/40 hover:border-[#C2A265] text-[#FAF7EE] font-medium text-xs sm:text-[13px] tracking-wide transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C2A265]" />
                <span>Consult Chief Vaidya</span>
              </button>
            </div>

            {/* Trust Proof Metrics Line */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 pt-0.5 text-[11px] text-[#A8A295]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#C2A265]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-[#FAF7EE] font-semibold">4.9 / 5</span>
                <span>(1,240+ Patrons)</span>
              </div>
              <span className="hidden sm:inline text-[#C2A265]/40">•</span>
              <span className="text-[#D4B678] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#C2A265]" />
                Pan-India Free Express Delivery
              </span>
            </div>

          </div>

          {/* Right Column (Apothecary Arched Showcase & Product Pedestal) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[260px] sm:max-w-[290px] aspect-[4/5] flex flex-col justify-between items-center p-3.5 sm:p-4 rounded-t-[80px] rounded-b-2xl bg-gradient-to-b from-[#13281C] via-[#0E1E14] to-[#0A160F] border border-[#C2A265]/30 shadow-2xl overflow-hidden group">
              
              {/* Arch Top Header */}
              <div className="text-center pt-1 z-10">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#162D1F] border border-[#C2A265]/40 text-[8.5px] sm:text-[9.5px] tracking-[0.2em] uppercase text-[#D4B678] font-bold">
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
                  className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  sizes="(max-width: 768px) 240px, 280px"
                />
              </Link>

              {/* Pedestal Base Hallmark Strip */}
              <div className="w-full border-t border-[#C2A265]/20 pt-2 flex items-center justify-between text-xs z-10">
                <div className="flex items-center gap-1.5 text-[#D4B678] font-medium text-[9.5px] sm:text-[10.5px]">
                  <Leaf className="w-3 h-3 text-[#C2A265] flex-shrink-0" />
                  <span>100% Classical Actives</span>
                </div>
                <span className="text-[8.5px] sm:text-[9.5px] text-[#A6A094] uppercase tracking-wider font-mono">AVG-2026-R</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
