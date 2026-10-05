'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from '@/store/whatsappStore'
import { useUserStore } from '@/store/userStore'

export function CleanHero() {
  const { user } = useUserStore()

  const handleVaidyaConsult = () => {
    const primaryAddr = user?.addresses?.[0]
    const userCity = primaryAddr ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(', ') : ''
    const message = buildVaidyaConsultationMessage({
      patientName: user?.name || '',
      patientPhone: user?.phone || '',
      patientCity: userCity,
      concern: 'Daily Stamina & Ayurvedic Rasayana Protocol',
      enquiry: 'Pranam Vaidya Ji. I would like confidential guidance regarding recommended Ayurvedic herbal formulations and daily dosage.',
      source: 'hero',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  return (
    <section className="bg-[#FAF7F2] text-[#1C1D1F] pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-16 border-b border-[#E2DDD5]">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Tagline & Direct Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Heritage Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#737373]">
                Ayur Veda Global
              </span>
              <span className="text-[#999999]/50">•</span>
              <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#9E8047]">
                Classical Pharmacopeia
              </span>
            </div>

            {/* Tagline / Main Title */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[44px] xl:text-[46px] font-normal text-[#1C1D1F] leading-[1.18] tracking-tight">
              Classical Rasayana Chemistry for Modern Vitality
            </h1>

            {/* Supporting Tagline */}
            <p className="text-sm sm:text-[15px] text-[#555555] max-w-xl leading-relaxed font-sans font-normal">
              Authentic Ayurvedic formulations crafted with standardized Himalayan Shilajit, pure Ashwagandha, and classical botanical extracts. Tested for purity and delivered nationwide in 100% confidential unmarked parcels.
            </p>

            {/* Clean Direct CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#products"
                className="px-6 py-3 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] font-medium text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleVaidyaConsult}
                className="px-5 py-3 rounded-full bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#1C1D1F] text-[#1C1D1F] font-medium text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#4E5F52]" />
                <span>Consult Vaidya</span>
              </button>
            </div>

          </div>

          {/* Right Column: Clean Product Spotlight Vitrine */}
          <div className="lg:col-span-5 flex justify-center">
            <Link
              href="/product/vitality-power-combo"
              className="group block relative w-full max-w-[340px] rounded-2xl bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#1C1D1F] transition-all p-3.5 shadow-sm hover:shadow-md"
              aria-label="View Vitality & Performance Power Combo"
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F4EFEA] mb-3">
                <Image
                  src="/images/products/vitality-power-combo-card.jpg"
                  alt="Vitality & Performance Power Combo"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 90vw, 340px"
                />
              </div>

              <div className="flex items-center justify-between text-xs px-1 pt-0.5">
                <div>
                  <h2 className="font-heading font-medium text-sm text-[#1C1D1F] group-hover:text-[#9E8047] transition-colors">
                    Vitality &amp; Performance Power Combo
                  </h2>
                  <p className="text-[11px] text-[#737373] mt-0.5 font-sans">
                    BODY Nutrition (60 Caps) + STAYMAX+ Spray (30ml)
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <span className="font-medium text-sm text-[#1C1D1F] block font-sans">₹1,999</span>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
