'use client'

import React from 'react'
import {
  Calendar,
  Sparkles,
  Zap,
  Flame,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'

const stages = [
  {
    phase: 'Days 1 – 7',
    sanskritName: 'आम निर्हरण (Ama Nirharana)',
    title: 'Metabolic Detox & Readiness',
    desc: 'Purified Shilajit and Amla flush accumulated metabolic toxins (Ama) from cellular pathways, preparing bodily tissues for optimal nutrient absorption.',
    badge: 'Stage 1: Detoxification',
    icon: Sparkles,
  },
  {
    phase: 'Days 8 – 14',
    sanskritName: 'धातु पोषण (Dhatu Poshana)',
    title: 'Cellular ATP Energy & Fatigue Relief',
    desc: 'Ashwagandha Withanolides calm elevated stress hormones (cortisol). Morning fatigue begins to dissipate, and physical stamina and workout recovery surge.',
    badge: 'Stage 2: Cellular Energy',
    icon: Flame,
  },
  {
    phase: 'Days 15 – 21',
    sanskritName: 'ओजस वर्धन (Ojas Vardhana)',
    title: 'Peak Muscle Vigor & Circulation',
    desc: 'Bioactive Safed Musli and Gokshura optimize blood flow and nitric oxide circulation. Natural vigor, endurance, and deep tissue nourishment become visibly noticeable.',
    badge: 'Stage 3: Peak Stamina',
    icon: Zap,
  },
  {
    phase: 'Days 22 – 30',
    sanskritName: 'स्थिर स्तम्भन (Sthira Stambhana)',
    title: 'Enduring Control & Lasting Vitality',
    desc: 'The full inside-out synergy reaches equilibrium. Complete mastery of stamina and intimate endurance, delivering unshakeable confidence without dependency.',
    badge: 'Stage 4: Complete Vitality',
    icon: Award,
  },
]

export function AyurvedicTransformationTimeline() {
  return (
    <section className="py-14 sm:py-20 bg-[#020E07] border-b border-[#D4AF37]/25 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-wider uppercase mb-3 shadow-md">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>३० दिवसीय कायाकल्प यात्रा • 30-Day Transformation Journey</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            How Ayurveda Transforms Your Body:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#D4AF37] to-amber-300">
              The 30-Day Dhatu Regimen
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            Unlike synthetic pills that provide artificial stimulation for a few hours, classical Ayurvedic Rasayana systematically rebuilds all seven vital tissues (Saptadhatus) step-by-step.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stages.map((stage, i) => {
            const Icon = stage.icon
            return (
              <div
                key={i}
                className="relative rounded-3xl bg-gradient-to-b from-[#051E11] to-[#020B05] border border-emerald-500/25 hover:border-[#D4AF37]/60 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Step Number Aura */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-[#D4AF37] px-3 py-1 rounded-full shadow">
                    {stage.phase}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                    {stage.sanskritName}
                  </p>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-emerald-500/20 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{stage.badge}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Doctor's Advice Box */}
        <div className="mt-10 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#04170C]/90 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
            <p className="text-xs sm:text-sm text-gray-200">
              <strong className="text-[#D4AF37]">वैद्य परामर्श (Doctor&apos;s Guideline):</strong> For maximum efficacy, take capsules consistently with lukewarm water or warm milk after dinner. Avoid excessive oily or acidic foods.
            </p>
          </div>
          <a
            href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20please%20guide%20me%20on%20the%2030-day%20regimen."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 flex-shrink-0 transition-colors shadow"
          >
            <span>Ask a Vaidya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
