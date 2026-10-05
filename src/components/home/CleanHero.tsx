'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
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
    <section className="bg-[#FAF7F2] text-[#1C1D1F] pt-6 pb-8 sm:pt-8 sm:pb-10 lg:pt-10 lg:pb-12 border-b border-[#999999]/30">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Tagline & Direct Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-3.5 sm:space-y-4 text-left"
          >
            {/* Heritage Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#737373]">
                Ayur Veda Global
              </span>
              <span className="text-[#999999]">•</span>
              <span className="text-[10.5px] font-mono tracking-[0.16em] uppercase text-[#9E8047]">
                Classical Pharmacopeia
              </span>
            </div>

            {/* Tagline / Main Title */}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-normal text-[#1C1D1F] leading-[1.2] tracking-tight">
              Classical Rasayana Chemistry for Modern Vitality
            </h1>

            {/* Supporting Tagline */}
            <p className="text-xs sm:text-[13.5px] text-[#555555] max-w-lg leading-relaxed font-sans font-normal">
              Authentic Ayurvedic formulations crafted with standardized Himalayan Shilajit, pure Ashwagandha, and classical botanical extracts. Tested for purity and delivered nationwide in 100% confidential unmarked parcels.
            </p>

            {/* Clean Direct CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="#products"
                className="px-5 py-2.5 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] font-medium text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-xs"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleVaidyaConsult}
                className="px-4.5 py-2.5 rounded-full bg-[#FFFFFF] border border-[#999999]/40 hover:border-[#1C1D1F] text-[#1C1D1F] font-medium text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#4E5F52] animate-pulse" />
                <span>Vaidya Consult</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Clean Product Spotlight Vitrine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="lg:col-span-5 flex justify-center"
          >
            <Link
              href="/product/vitality-power-combo"
              className="group block relative w-full max-w-[290px] rounded-2xl bg-[#FFFFFF] border border-[#999999]/35 hover:border-[#1C1D1F] transition-all p-3 shadow-xs hover:shadow-md"
              aria-label="View Vitality & Performance Power Combo"
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#FAF7F2] mb-2.5">
                <Image
                  src="/images/products/vitality-power-combo-card.jpg"
                  alt="Vitality & Performance Power Combo"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 90vw, 290px"
                />
              </div>

              <div className="flex items-center justify-between text-xs px-0.5 pt-0.5">
                <div>
                  <h2 className="font-heading font-medium text-[13px] text-[#1C1D1F] group-hover:text-[#9E8047] transition-colors leading-snug">
                    Vitality &amp; Performance Power Combo
                  </h2>
                  <p className="text-[10.5px] text-[#737373] mt-0.5 font-sans">
                    BODY Nutrition (60 Caps) + STAYMAX+ Spray (30ml)
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <span className="font-semibold text-xs text-[#1C1D1F] block font-sans">₹1,999</span>
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
