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
    <section className="bg-[#08090C] py-8 sm:py-12 lg:py-16 border-b border-[#999999]/20 text-[#FAF7EE] relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-0 right-1/4 translate-x-1/2 w-96 h-96 bg-[#6EE7B7]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#D8C28A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11141E] border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-semibold tracking-[0.24em] uppercase mb-2.5 backdrop-blur-md shadow-sm">
            <Clock className="w-3 h-3 text-[#6EE7B7]" />
            <span>№ 04 • The Circadian Biological Timeline</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#FAF7EE] tracking-tight">
            The 30-Day Physiological Ritual
          </h2>

          <p className="text-xs sm:text-sm text-[#999999] mt-2.5 max-w-lg mx-auto leading-relaxed font-sans">
            How authentic Ayurvedic Rasayana works inside your biology over a consistent four-week protocol.
          </p>
        </div>

        {/* 3-Step Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {ritualPhases.map((phase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="p-5 sm:p-6 rounded-2xl bg-[#11141E] border border-[#999999]/20 hover:border-[#6EE7B7]/40 shadow-xl flex flex-col justify-between relative overflow-hidden hover:-translate-y-1.5 transition-all duration-300 ease-out group"
            >
              <div>
                {/* Phase Number & Timeline */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#999999]/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#151926] border border-[#999999]/25 flex items-center justify-center text-[#6EE7B7] group-hover:border-[#6EE7B7]/50 transition-colors">
                      <phase.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.22em] text-[#6EE7B7]">
                      {phase.phase}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#08090C] text-[11px] font-semibold text-[#D8C28A] border border-[#999999]/25">
                    {phase.days}
                  </span>
                </div>

                {/* Sanskrit Category */}
                <p className="text-xs font-serif text-[#D8C28A] mt-4 font-normal">
                  {phase.sanskrit}
                </p>

                {/* Title */}
                <h3 className="font-heading text-base sm:text-lg font-medium text-[#FAF7EE] mt-1.5 leading-snug group-hover:text-[#D8C28A] transition-colors">
                  {phase.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#999999] leading-relaxed mt-2.5 font-sans">
                  {phase.desc}
                </p>
              </div>

              {/* Verified Result Milestone */}
              <div className="mt-6 pt-4 border-t border-[#999999]/20">
                <span className="text-[10px] uppercase tracking-wider text-[#6EE7B7] font-semibold block mb-1">
                  Expected Physiological Landmark:
                </span>
                <p className="text-xs font-medium text-[#FAF7EE] leading-relaxed">
                  {phase.milestone}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Recommendation */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-xs text-[#999999] max-w-xl mx-auto">
            *Recommended protocol: 1 to 2 capsules of BODY Essential Nutrition twice daily after meals. Use STAYMAX+ spray 10–15 mins prior to intimate moments.
          </p>
        </div>

      </div>
    </section>
  )
}
