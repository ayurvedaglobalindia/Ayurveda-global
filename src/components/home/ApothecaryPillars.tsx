'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FlaskConical, Shield, PackageCheck, Leaf, CheckCircle2 } from 'lucide-react'

const pillars = [
  {
    num: '01',
    icon: FlaskConical,
    title: 'Classical Shodhana',
    subtitle: 'Vedic Purification Alchemy',
    desc: 'Purified through 21 cycles of Bhavana decoction extraction for rapid cellular assimilation without gastric distress.',
  },
  {
    num: '02',
    icon: Shield,
    title: 'Saptadhatu Poshana',
    subtitle: 'Deep Tissue Vitality',
    desc: 'Calibrated to nourish Rasa, Rakta, Mamsa, Meda, Asthi, Majja, and Shukra tissues for sustained biological vigor.',
  },
  {
    num: '03',
    icon: PackageCheck,
    title: 'Standardized Bioactives',
    subtitle: 'HPLC Lab Calibrated',
    desc: 'Every botanical batch is assayed for active withanolides, fulvic acid, and saponins with zero synthetic fillers.',
  },
  {
    num: '04',
    icon: Leaf,
    title: '100% Plant Cellulose',
    subtitle: 'Zero Synthetic Binders',
    desc: 'Formulated in pure vegetarian capsules with zero animal gelatin, byproducts, talc, or synthetic chemical glazes.',
  },
]

export function ApothecaryPillars() {
  return (
    <section className="bg-[#08090C] border-b border-[#C2A265]/20 py-5 sm:py-7 text-[#F5EFE6] relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4 sm:mb-5 pb-2.5 border-b border-slate-800">
          <div>
            <span className="text-[9px] uppercase tracking-[0.22em] font-semibold text-emerald-400 block">
              Classical Quality Standards
            </span>
            <h2 className="font-heading text-base sm:text-lg font-medium text-[#FAF7EE] tracking-tight mt-0.5">
              The Four Vedic Pillars of Potency
            </h2>
          </div>
          <p className="text-[11px] text-[#94A3B8] max-w-md leading-relaxed font-sans">
            Every formulation is prepared under strict Charaka Samhita directives and validated by NABL-accredited laboratory assays.
          </p>
        </div>

        {/* Compact 4-Block Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-3 sm:p-3.5 rounded-xl bg-[#121622]/90 border border-slate-800 hover:border-emerald-500/40 hover:bg-[#161B28] transition-all duration-300 shadow-sm flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#18202C] border border-slate-700 group-hover:border-emerald-500/40 flex items-center justify-center text-emerald-400 transition-colors">
                    <pillar.icon className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-xs font-semibold tracking-widest text-[#C2A265]/70 group-hover:text-[#D4B678] transition-colors">
                    {pillar.num}
                  </span>
                </div>

                <h3 className="font-heading text-sm sm:text-base font-medium text-[#FAF7EE] tracking-tight group-hover:text-[#D4B678] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mt-0.5">
                  {pillar.subtitle}
                </p>
                <p className="text-[11px] sm:text-xs text-[#94A3B8] leading-relaxed mt-2 font-sans">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-800 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium">Vedic Standard Verified</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
