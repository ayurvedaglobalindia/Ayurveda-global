'use client'

import React from 'react'
import { FlaskConical, Shield, PackageCheck, Truck } from 'lucide-react'

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
    desc: 'Nutrients calibrated to nourish Rasa, Rakta, Mamsa, Meda, Asthi, Majja, and Shukra for lasting vigor.',
  },
  {
    num: '03',
    icon: PackageCheck,
    title: '100% Discreet Packaging',
    subtitle: 'Absolute Privacy Guaranteed',
    desc: 'Dispatched in plain unmarked brown boxes with zero product names or sensitive indicators on the label.',
  },
  {
    num: '04',
    icon: Truck,
    title: 'Doorstep Cash on Delivery',
    subtitle: '25,000+ Pincodes Covered',
    desc: 'Pay safely upon doorstep arrival via cash or UPI. Free express pan-India shipping on all qualifying orders.',
  },
]

export function ApothecaryPillars() {
  return (
    <section className="bg-[#0E1E14] border-b border-[#C2A265]/20 py-10 sm:py-14 text-[#F5EFE6] relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#C2A265]/15">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between pt-6 sm:pt-0 ${
                idx !== 0 ? 'sm:pl-6 lg:pl-8' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#142A1D] border border-[#C2A265]/25 flex items-center justify-center text-[#C2A265]">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-xs font-semibold tracking-widest text-[#C2A265]/60">
                    {pillar.num}
                  </span>
                </div>

                <h3 className="font-heading text-base sm:text-lg font-medium text-[#FAF7EE] tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-[#C2A265] font-semibold mt-0.5">
                  {pillar.subtitle}
                </p>
                <p className="text-xs text-[#A8A295] leading-relaxed mt-2.5 font-sans">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#C2A265]/10 flex items-center gap-1.5 text-[11px] text-[#D4B678]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C2A265]" />
                <span className="font-medium">Vedic Standard Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
