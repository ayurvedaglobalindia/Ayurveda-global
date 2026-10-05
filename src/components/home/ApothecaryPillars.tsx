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
    <section className="bg-[#090A0D] border-b border-[#999999]/20 py-14 sm:py-20 lg:py-24 text-[#FAF7EE] relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#999999]/15">
          <div>
            <p className="text-[11px] font-mono tracking-[0.24em] text-[#999999] uppercase mb-2">
              Foundational Principles
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[#FAF7EE] tracking-tight">
              The Principles of Formulation
            </h2>
          </div>
          <p className="text-sm text-[#999999] max-w-md leading-relaxed font-sans font-normal">
            Every creation is prepared under strict Charaka Samhita directives and validated through modern NABL-accredited chromatography.
          </p>
        </div>

        {/* 4-Block Architectural Ledger Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0D0F15] border border-[#999999]/15 hover:border-[#999999]/35 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-[#D8C28A] tracking-wider">
                    {pillar.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#12141A] border border-[#999999]/20 flex items-center justify-center text-[#D8C28A]">
                    <pillar.icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="font-heading text-lg font-normal text-[#FAF7EE] tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#999999] mt-1">
                  {pillar.subtitle}
                </p>
                <p className="text-xs sm:text-[13px] text-[#999999] leading-relaxed mt-3.5 font-normal">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
