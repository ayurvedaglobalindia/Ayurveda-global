'use client'

import React from 'react'
import Image from 'next/image'
import { Sparkles, Scroll, Award, Leaf, ShieldCheck } from 'lucide-react'

export function EditorialBrandStory() {
  return (
    <section className="bg-[#0B150F] py-12 sm:py-16 lg:py-20 border-b border-[#C2A265]/20 text-[#F5EFE6] relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Heritage Shloka Frame */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="font-serif text-xs sm:text-sm text-[#C2A265] italic tracking-wide block mb-1.5">
              ॐ चरक संहिता • Charaka Samhita
            </span>
            <p className="font-heading text-base sm:text-lg text-[#FAF7EE] font-normal leading-relaxed italic">
              &ldquo;प्रयोजनं चास्य स्वस्थस्य स्वास्थ्यरक्षणमातुरस्य विकारप्रशमनं च॥&rdquo;
            </p>
            <p className="text-[11px] sm:text-xs text-[#A8A295] mt-1.5 font-sans">
              &ldquo;The sacred purpose of Ayurveda is twofold: to preserve the constitutional vitality of the healthy, and to eradicate root imbalances in the afflicted.&rdquo;
            </p>
          </div>

          {/* Magazine Split Story Block */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Lineage Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12241A] border border-[#C2A265]/30 text-[#C2A265] text-[10px] font-semibold tracking-[0.22em] uppercase">
                <Scroll className="w-3.5 h-3.5" />
                <span>The Classical Apothecary Tradition</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#FAF7EE] tracking-tight leading-snug">
                Where Ancient Shodhana Meets{' '}
                <span className="italic font-serif text-[#D4B678]">
                  Pharmaceutical Purity.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#C5BFB3] leading-relaxed font-sans font-normal">
                Ayur Veda Global was founded on an unyielding principle: Classical Ayurvedic Rasayana must never be compromised by commercial shortcuts. While the modern market is saturated with synthetic stimulants and under-dosed herb powders, our apothecary adheres strictly to authentic decoction chemistry.
              </p>

              <p className="text-xs sm:text-sm text-[#C5BFB3] leading-relaxed font-sans font-normal">
                Our raw Shilajit is hand-harvested from Himalayan altitudes exceeding 16,000 feet, then subjected to 21 cycles of Shodhana purification using Triphala decoctions. Our Ashwagandha is standardized strictly to 5% withanolides. The result is pure physiological potency that your biology recognizes and utilizes effortlessly.
              </p>

              {/* 3 Core Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 text-xs">
                <div className="p-4 rounded-xl bg-[#12241A] border border-[#C2A265]/15">
                  <span className="text-[10px] uppercase font-bold text-[#C2A265] tracking-wider block mb-1">
                    01 / Sourcing
                  </span>
                  <p className="text-[#FAF7EE] font-medium">Himalayan Altitudes</p>
                  <p className="text-[11px] text-[#A8A295] mt-0.5">Ethically wildcrafted &amp; organic</p>
                </div>

                <div className="p-4 rounded-xl bg-[#12241A] border border-[#C2A265]/15">
                  <span className="text-[10px] uppercase font-bold text-[#C2A265] tracking-wider block mb-1">
                    02 / Capsule Shells
                  </span>
                  <p className="text-[#FAF7EE] font-medium">100% Plant Cellulose</p>
                  <p className="text-[11px] text-[#A8A295] mt-0.5">Zero animal gelatin or starch</p>
                </div>

                <div className="p-4 rounded-xl bg-[#12241A] border border-[#C2A265]/15">
                  <span className="text-[10px] uppercase font-bold text-[#C2A265] tracking-wider block mb-1">
                    03 / Screening
                  </span>
                  <p className="text-[#FAF7EE] font-medium">NABL Accredited</p>
                  <p className="text-[11px] text-[#A8A295] mt-0.5">Zero heavy metals or pesticides</p>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Frame */}
            <div className="lg:col-span-5">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#12241A] border border-[#C2A265]/30 shadow-2xl relative space-y-6">
                
                <div className="w-12 h-12 rounded-2xl bg-[#183525] border border-[#C2A265]/30 flex items-center justify-center text-[#C2A265]">
                  <Leaf className="w-6 h-6" />
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-normal text-[#FAF7EE]">
                  The Trisutra Chikitsa Framework
                </h3>

                <p className="text-xs text-[#C5BFB3] leading-relaxed">
                  In classical Ayurveda, authentic healing operates through the Trisutra triad: identifying constitutional root causes, diagnosing cellular fatigue patterns, and administering calibrated herbal alchemy to restore total homeostasis.
                </p>

                {/* Trisutra 3 Pillars */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2.5 rounded-lg bg-[#0D1B12] border border-[#C2A265]/15">
                    <span className="text-[10px] font-serif text-[#C2A265] block">हेतु • Hetu</span>
                    <span className="text-[9px] text-[#A8A295] block mt-0.5">Root Etiology</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0D1B12] border border-[#C2A265]/15">
                    <span className="text-[10px] font-serif text-[#C2A265] block">लिङ्ग • Linga</span>
                    <span className="text-[9px] text-[#A8A295] block mt-0.5">Symptomology</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0D1B12] border border-[#C2A265]/15">
                    <span className="text-[10px] font-serif text-[#C2A265] block">औषध • Aushadha</span>
                    <span className="text-[9px] text-[#A8A295] block mt-0.5">Vedic Alchemy</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0D1B12] border border-[#C2A265]/20 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#C2A265] flex-shrink-0" />
                  <p className="text-xs text-[#FAF7EE]">
                    Manufactured in a certified GMP, ISO 9001:2015, and AYUSH-licensed botanical facility.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
