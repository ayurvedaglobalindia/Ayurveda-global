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
    <section className="bg-[#08090C] py-12 sm:py-16 lg:py-20 border-b border-[#999999]/20 text-[#FAF7EE] relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-0 right-1/4 translate-x-1/2 w-[450px] h-[450px] bg-[#6EE7B7]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -translate-x-1/2 w-[450px] h-[450px] bg-[#D8C28A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11141E] border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-semibold tracking-[0.24em] uppercase mb-3 backdrop-blur-md shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#6EE7B7]" />
            <span>№ 04 • The Circadian Biological Timeline</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-light text-[#FAF7EE] tracking-tight">
            The 30-Day Physiological Ritual
          </h2>

          <p className="text-xs sm:text-sm text-[#999999] mt-3 max-w-xl mx-auto leading-relaxed font-sans font-normal">
            How authentic Ayurvedic Rasayana works inside your biology over a consistent four-week protocol.
          </p>
        </div>

        {/* 3-Step Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {ritualPhases.map((phase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.12 }}
              className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#131722] via-[#0E1118] to-[#0A0C11] border border-[#999999]/25 hover:border-[#D8C28A]/45 shadow-2xl flex flex-col justify-between relative overflow-hidden hover:-translate-y-2 transition-all duration-300 ease-out group"
            >
              <div>
                {/* Phase Number & Timeline */}
                <div className="flex items-center justify-between pb-4 border-b border-[#999999]/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#151926] border border-[#999999]/25 flex items-center justify-center text-[#6EE7B7] group-hover:border-[#6EE7B7]/50 group-hover:shadow-[0_0_12px_rgba(110,231,183,0.25)] transition-all">
                      <phase.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#6EE7B7]">
                      {phase.phase}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#08090C] text-xs font-semibold text-[#D8C28A] border border-[#D8C28A]/30 shadow-inner">
                    {phase.days}
                  </span>
                </div>

                {/* Sanskrit Category */}
                <p className="text-sm font-serif italic text-[#D8C28A] mt-5 font-normal tracking-wide">
                  {phase.sanskrit}
                </p>

                {/* Title */}
                <h3 className="font-heading text-lg sm:text-xl font-normal text-[#FAF7EE] mt-1.5 leading-snug group-hover:text-[#D8C28A] transition-colors">
                  {phase.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-[#999999] leading-relaxed mt-3 font-sans font-normal">
                  {phase.desc}
                </p>
              </div>

              {/* Verified Result Milestone */}
              <div className="mt-6 pt-4 border-t border-[#999999]/20">
                <div className="p-3.5 rounded-2xl bg-[#090C12]/90 border border-[#999999]/20 group-hover:border-[#6EE7B7]/30 transition-colors">
                  <span className="text-[10px] uppercase tracking-wider text-[#6EE7B7] font-semibold block mb-1">
                    Expected Physiological Landmark:
                  </span>
                  <p className="text-xs font-medium text-[#FAF7EE] leading-relaxed">
                    {phase.milestone}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Recommendation */}
        <div className="mt-10 sm:mt-14 text-center">
          <div className="inline-block p-4 sm:px-6 rounded-2xl bg-[#11141E]/80 border border-[#999999]/25 backdrop-blur-md max-w-2xl mx-auto shadow-md">
            <p className="text-xs text-[#999999] leading-relaxed">
              <strong className="text-[#FAF7EE] font-semibold">Recommended Clinical Regimen:</strong> 1 to 2 capsules of BODY Essential Nutrition twice daily after meals with lukewarm water. Use STAYMAX+ spray 10–15 mins prior to intimate moments.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
