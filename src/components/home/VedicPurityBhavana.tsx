'use client'

import React from 'react'
import Image from 'next/image'
import {
  Award,
  FlaskConical,
  ShieldCheck,
  CheckCircle2,
  Leaf,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

const purityPillars = [
  {
    step: '०१. शोधन संस्कार',
    title: 'Classical Triphala Shodhana',
    desc: 'Raw mineral Shilajit from high Himalayan altitudes is meticulously purified through 7 stages of Triphala and warm herbal decoction baths to extract 100% pure bioactive resin.',
    icon: FlaskConical,
  },
  {
    step: '०२. भावना संस्कार',
    title: '21-Cycle Bhavana Extraction',
    desc: 'Botanical actives like Ashwagandha and Safed Musli undergo repeated Bhavana (infusion with fresh plant swarasa) to amplify potency and cellular bio-availability.',
    icon: Sparkles,
  },
  {
    step: '०३. मानक परीक्षण',
    title: 'HPLC & NABL Lab Certified',
    desc: 'Every production batch is tested via High-Performance Liquid Chromatography (HPLC) to guarantee exact 5% Withanolides and zero heavy metals (Lead, Mercury < 0.01 PPM).',
    icon: Award,
  },
  {
    step: '०४. शुद्ध शाकाहारी',
    title: '100% Plant Cellulose Shells',
    desc: 'Unlike commercial capsules utilizing animal gelatin shells, Ayur Veda Global uses pure vegetarian plant-derived cellulose that dissolves cleanly in the stomach within 15 minutes.',
    icon: Leaf,
  },
]

export function VedicPurityBhavana() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#010804] via-[#04160B] to-[#010804] border-b border-[#D4AF37]/25 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-wider uppercase mb-3 shadow-md">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>कोट्टक्कल व वैदिक परंपरा • Authentic Vedic Pharmacy</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            Sacred Vedic Extraction:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#D4AF37] to-yellow-200">
              Shodhana &amp; Bhavana Purity
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            In classical Ayurveda, raw herbs cannot be directly powdered and consumed. They must undergo sacred alchemy (Samskaras) to enhance potency and ensure complete bodily absorption.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {purityPillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-gradient-to-b from-[#051C10] to-[#020A05] border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 shadow-xl flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-[#D4AF37] bg-black/40 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                      {pillar.step}
                    </span>
                    <Icon className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-emerald-500/20 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Arya Shuddha Quality</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Lab Certification Banner */}
        <div className="mt-10 max-w-4xl mx-auto p-5 rounded-2xl bg-black/50 border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                NABL Accredited Heavy Metal Free Lab Certified
              </p>
              <p className="text-xs text-gray-400">
                Screened for Lead, Arsenic, Mercury &amp; Cadmium. 100% compliant with Ministry of AYUSH safety norms.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20please%20share%20the%20NABL%20lab%20test%20report."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-[#D4AF37] hover:from-amber-300 hover:to-yellow-300 text-black font-bold text-xs flex items-center gap-1.5 flex-shrink-0 transition-all shadow"
          >
            <span>Request Lab Report</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </a>
        </div>
      </div>
    </section>
  )
}
