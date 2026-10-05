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
    <section className="bg-[#08090C] border-b border-[#999999]/20 py-8 sm:py-10 text-[#FAF7EE] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 bg-[#6EE7B7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8 pb-3 border-b border-[#999999]/20">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.24em] font-semibold text-[#6EE7B7] mb-1">
              <span>№ 03</span>
              <span className="text-[#999999]">•</span>
              <span>Classical Quality Standards</span>
            </div>
            <h2 className="font-heading text-lg sm:text-xl lg:text-2xl font-normal text-[#FAF7EE] tracking-tight">
              The Four Vedic Pillars of Potency
            </h2>
          </div>
          <p className="text-xs text-[#999999] max-w-md leading-relaxed font-sans">
            Every formulation is prepared under strict Charaka Samhita directives and validated by NABL-accredited laboratory assays.
          </p>
        </div>

        {/* Compact 4-Block Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-4 sm:p-5 rounded-2xl bg-[#11141E] border border-[#999999]/20 hover:border-[#6EE7B7]/40 hover:bg-[#151926] transition-all duration-300 shadow-md flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#151926] border border-[#999999]/25 group-hover:border-[#6EE7B7]/50 flex items-center justify-center text-[#6EE7B7] transition-colors shadow-sm">
                    <pillar.icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#D8C28A] group-hover:text-[#E6D5AC] transition-colors">
                    № {pillar.num}
                  </span>
                </div>

                <h3 className="font-heading text-base font-medium text-[#FAF7EE] tracking-tight group-hover:text-[#D8C28A] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-[#6EE7B7] font-semibold mt-1">
                  {pillar.subtitle}
                </p>
                <p className="text-xs text-[#999999] leading-relaxed mt-2.5 font-sans">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#999999]/20 flex items-center gap-1.5 text-[11px] text-[#6EE7B7]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6EE7B7]" />
                <span className="font-medium tracking-wide">Vedic Standard Verified</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
