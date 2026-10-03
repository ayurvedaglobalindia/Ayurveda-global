'use client'

import React from 'react'
import { Check, X, ShieldAlert, Sparkles, HeartPulse, Leaf, Award } from 'lucide-react'

const comparisonPoints = [
  {
    feature: 'Approach to Health',
    allopathy: 'Temporary symptom suppression without addressing root cause',
    ayurveda: 'Deep Dhatu Poshana (nourishes all 7 bodily tissues from within)',
  },
  {
    feature: 'Chemical Side Effects',
    allopathy: 'Can cause headaches, skin redness, liver strain & dependency',
    ayurveda: '100% Natural, non-hormonal, non-habit forming & zero side effects',
  },
  {
    feature: 'Longevity of Results',
    allopathy: 'Effects wear off within hours; requires repeated pill intake',
    ayurveda: 'Sustained cellular ATP energy, stamina & enduring vitality',
  },
  {
    feature: 'Formulation Origin',
    allopathy: 'Synthesized in chemical reactors with artificial preservatives',
    ayurveda: 'Classical Shodhana-purified Himalayan Shilajit & Ashwagandha',
  },
  {
    feature: 'Holistic Mind & Body',
    allopathy: 'No mental calm; can trigger cardiac palpitations or anxiety',
    ayurveda: 'Standardized Withanolides calm cortisol & elevate mental focus',
  },
]

export function AyurvedaVsModernScience() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#010904] via-[#04190D] to-[#010904] border-b border-[#D4AF37]/25 relative overflow-hidden">
      {/* Background Vedic Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-950/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-wider uppercase mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>मूल कारण चिकित्सा • Root Cause Ayurvedic Science</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            Why Ayurveda?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#D4AF37] to-yellow-200">
              Chemical Quick-Fixes vs Pure Rasayana
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            In the tradition of <em>Arya Vaidya Sala</em> and <em>Charaka Samhita</em>, true stamina cannot be built through synthetic pills that numb the body. Discover why authentic herbal rejuvenation is permanent and safe.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#061F12] via-[#031309] to-[#010A05] border-2 border-[#D4AF37]/30 rounded-3xl p-4 sm:p-8 shadow-2xl overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 sm:gap-4 pb-4 border-b border-[#D4AF37]/20 items-center">
            <div className="col-span-4 sm:col-span-4 font-bold text-xs sm:text-sm text-[#D4AF37] uppercase tracking-wider">
              Health Parameter
            </div>
            <div className="col-span-4 sm:col-span-4 text-center">
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-red-400 bg-red-950/60 px-2.5 py-1 rounded-full border border-red-500/30">
                <X className="w-3 h-3 text-red-400" />
                <span>Synthetic Pills</span>
              </span>
            </div>
            <div className="col-span-4 sm:col-span-4 text-center">
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-[#D4AF37] px-3 py-1 rounded-full shadow-md">
                <Check className="w-3 h-3 text-black" />
                <span>Ayur Veda Global</span>
              </span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-emerald-500/15">
            {comparisonPoints.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-2 sm:gap-4 py-4 sm:py-5 items-center hover:bg-emerald-950/20 transition-colors rounded-xl px-2"
              >
                {/* Parameter */}
                <div className="col-span-4 sm:col-span-4">
                  <p className="font-semibold text-xs sm:text-sm text-white">{item.feature}</p>
                </div>

                {/* Allopathy / Synthetic */}
                <div className="col-span-4 sm:col-span-4 text-center px-1">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-400">
                    <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    <span className="line-through opacity-85 leading-tight">{item.allopathy}</span>
                  </div>
                </div>

                {/* Ayurveda Global */}
                <div className="col-span-4 sm:col-span-4 text-center px-1">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-[11px] sm:text-xs text-emerald-300 font-medium">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span className="leading-tight">{item.ayurveda}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Seal Strip */}
          <div className="mt-6 pt-5 border-t border-[#D4AF37]/25 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-semibold text-white">Shuddha Ayurvedic Chikitsa Guarantee</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-emerald-400">✓ AYUSH Ministry Approved</span>
              <span className="text-emerald-400">✓ 100% Herbal Rasayana</span>
              <span className="text-emerald-400">✓ Zero Heavy Metals (HPLC Tested)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
