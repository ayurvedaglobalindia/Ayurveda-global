'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const principles = [
  {
    num: '01',
    title: 'Classical Shodhana Purification',
    desc: 'Raw Himalayan Shilajit undergoes traditional decoction cycles in Triphala water to remove insoluble matter and amplify ionic bioavailability.',
  },
  {
    num: '02',
    title: 'Standardized Bioactive Concentrations',
    desc: 'Guaranteed 5% withanolides in Nagori Ashwagandha and 75%+ fulvic acid in Shilajit, verified through third-party chromatography.',
  },
  {
    num: '03',
    title: '100% Vegetarian Cellulose Delivery',
    desc: 'Formulations are enclosed in pure plant-cellulose capsules — completely free from animal gelatin, talc, artificial binders, or synthetic colors.',
  },
]

export function BrandHeritageStory() {
  return (
    <section className="bg-[#FAF7F2] py-8 sm:py-10 lg:py-12 border-b border-[#999999]/30" aria-label="Heritage & Philosophy">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Brand Philosophy */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block">
              Apothecary Heritage
            </span>

            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#1C1D1F] tracking-tight leading-snug">
              Classical Formulation, Prepared with Quiet Restraint
            </h2>

            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans">
              Ayur Veda Global adheres to classical Ayurvedic treatises rather than modern industrial shortcuts. Where conventional supplements rely on synthetic stimulants, our remedies depend on calibrated botanical chemistry for sustainable vitality.
            </p>

            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans">
              We harvest wildcrafted herbs from their native geography — high-altitude Himalayan ranges and arid Rajasthan plains — ensuring authentic biological affinity.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1C1D1F] hover:text-[#9E8047] transition-colors border-b border-[#1C1D1F] pb-0.5"
              >
                <span>Read Full Lineage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Clean Commitments */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {principles.map((item) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#999999]/35 space-y-1.5 shadow-xs hover:border-[#1C1D1F]/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#9E8047]">
                  <span>Pillar {item.num}</span>
                </div>
                <h3 className="font-heading text-sm sm:text-base font-medium text-[#1C1D1F]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed font-sans">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
