'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, ShieldCheck, Sparkles, Flame, Zap, CheckCircle2 } from 'lucide-react'

const ritualPhases = [
  {
    phase: 'Phase 01',
    days: 'Days 1 – 7',
    icon: Flame,
    sanskrit: 'आम निर्हरण • Ama Nirharana',
    title: 'Cellular Detoxification & Agni Kindle',
    desc: 'Metabolic toxins (Ama) obstructing micro-circulatory channels (Srotas) are gently metabolized. Triphala and Shilajit activate natural digestive Agni, ensuring optimal uptake of bioactive herbs.',
    milestone: 'Initial bodily lightness, clearer mental focus, deeper nocturnal sleep.',
    color: 'border-[#C2A265]/30',
  },
  {
    phase: 'Phase 02',
    days: 'Days 8 – 20',
    icon: Zap,
    sanskrit: 'धातु पोषण • Dhatu Poshana',
    title: 'Deep Tissue Nourishment & Stamina',
    desc: 'Standardized Withanolides and Fulvic Acid penetrate cellular mitochondria, replenishing adenosine triphosphate (ATP) reserves across Mamsa (muscle) and Majja (bone marrow/nerve) tissues.',
    milestone: 'Significant uplift in physical stamina, reduced fatigue, enhanced daily drive.',
    color: 'border-[#C2A265]/50',
  },
  {
    phase: 'Phase 03',
    days: 'Days 21 – 30+',
    icon: Sparkles,
    sanskrit: 'ओजस वर्धन • Ojas Vardhana',
    title: 'Peak Intimate Vigor & Vital Equilibrium',
    desc: 'Safed Musli and Kaunch Beej synthesize vital essence (Ojas), providing balanced endocrine stability, profound intimate endurance, and effortless physical recovery.',
    milestone: 'Effortless intimate pacing, sustained peak performance, long-term constitutional balance.',
    color: 'border-[#C2A265]',
  },
]

export function TheThirtyDayRitual() {
  return (
    <section className="bg-[#090A0D] py-14 sm:py-20 lg:py-24 border-b border-[#999999]/20 text-[#FAF7EE] relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-[11px] font-mono tracking-[0.24em] text-[#999999] uppercase mb-2">
            Chronological Cellular Adaptation
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF7EE] tracking-tight">
            The Thirty-Day Protocol
          </h2>

          <p className="text-sm sm:text-[15px] text-[#999999] mt-3.5 max-w-xl mx-auto leading-relaxed font-sans font-normal">
            How authentic Ayurvedic Rasayana works inside your biology over a consistent four-week protocol.
          </p>
        </div>

        {/* 3-Step Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {ritualPhases.map((phase, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#0D0F15] border border-[#999999]/15 hover:border-[#999999]/35 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Phase Number & Timeline */}
                <div className="flex items-center justify-between pb-4 border-b border-[#999999]/15">
                  <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#D8C28A]">
                    {phase.phase}
                  </span>
                  <span className="text-xs font-mono text-[#999999]">
                    {phase.days}
                  </span>
                </div>

                {/* Sanskrit Category */}
                <p className="text-sm font-serif italic text-[#D8C28A] mt-5 font-normal tracking-wide">
                  {phase.sanskrit}
                </p>

                {/* Title */}
                <h3 className="font-heading text-lg sm:text-xl font-normal text-[#FAF7EE] mt-1.5 leading-snug">
                  {phase.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-[#999999] leading-relaxed mt-3 font-sans font-normal">
                  {phase.desc}
                </p>
              </div>

              {/* Verified Result Milestone */}
              <div className="mt-6 pt-4 border-t border-[#999999]/15">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#999999] block mb-1">
                  Physiological Landmark
                </span>
                <p className="text-xs text-[#FAF7EE] leading-relaxed font-normal">
                  {phase.milestone}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Recommendation */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#999999] max-w-xl mx-auto leading-relaxed">
            *Recommended regimen: 1 to 2 capsules of BODY Essential Nutrition twice daily after meals with lukewarm water. Apply STAYMAX+ spray 10–15 mins prior to intimate moments.
          </p>
        </div>

      </div>
    </section>
  )
}
