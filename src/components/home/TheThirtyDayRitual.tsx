'use client'

import React from 'react'
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
    <section className="bg-[#0E1E14] py-6 sm:py-8 lg:py-10 border-b border-[#C2A265]/20 text-[#F5EFE6] relative">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#142A1D] border border-[#C2A265]/30 text-[#C2A265] text-[9.5px] font-semibold tracking-[0.22em] uppercase mb-1.5">
            <Clock className="w-3 h-3" />
            <span>The Biological Timeline</span>
          </div>

          <h2 className="font-heading text-lg sm:text-xl lg:text-2xl font-normal text-[#FAF7EE] tracking-tight">
            The 30-Day Physiological Ritual
          </h2>

          <p className="text-[11px] sm:text-xs text-[#C5BFB3] mt-1.5 max-w-lg mx-auto leading-relaxed font-sans">
            How authentic Ayurvedic Rasayana works inside your biology over a consistent four-week protocol.
          </p>
        </div>

        {/* 3-Step Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-4">
          {ritualPhases.map((phase, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-xl bg-[#12241A] border ${phase.color} shadow-lg flex flex-col justify-between relative overflow-hidden hover:-translate-y-0.5 transition-all duration-300 ease-out`}
            >
              <div>
                {/* Phase Number & Timeline */}
                <div className="flex items-center justify-between pb-3 border-b border-[#C2A265]/15">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#183525] border border-[#C2A265]/30 flex items-center justify-center text-[#C2A265]">
                      <phase.icon className="w-3 h-3" />
                    </div>
                    <span className="text-[9.5px] uppercase font-bold tracking-[0.2em] text-[#C2A265]">
                      {phase.phase}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#0E1E14] text-[10.5px] font-semibold text-[#D4B678] border border-[#C2A265]/20">
                    {phase.days}
                  </span>
                </div>

                {/* Sanskrit Category */}
                <p className="text-[11px] font-serif text-[#C2A265] mt-3">
                  {phase.sanskrit}
                </p>

                {/* Title */}
                <h3 className="font-heading text-sm sm:text-base font-medium text-[#FAF7EE] mt-1 leading-snug">
                  {phase.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] sm:text-xs text-[#A8A295] leading-relaxed mt-2 font-sans">
                  {phase.desc}
                </p>
              </div>

              {/* Verified Result Milestone */}
              <div className="mt-6 pt-4 border-t border-[#C2A265]/15">
                <span className="text-[10px] uppercase tracking-wider text-[#C2A265] font-semibold block mb-1">
                  Expected Physiological Landmark:
                </span>
                <p className="text-xs font-medium text-[#FAF7EE] leading-snug">
                  {phase.milestone}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Recommendation */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-[11px] sm:text-xs text-[#A8A295]">
            *Recommended protocol: 1 to 2 capsules of BODY Essential Nutrition twice daily after meals. Use STAYMAX+ spray 10–15 mins prior to intimate moments.
          </p>
        </div>

      </div>
    </section>
  )
}
