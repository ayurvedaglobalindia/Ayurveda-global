'use client'

import React from 'react'
import { ShieldCheck, FlaskConical, PackageCheck, Truck } from 'lucide-react'

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'AYUSH Licensed',
    subtitle: '100% Classical Rasayana',
  },
  {
    icon: FlaskConical,
    title: 'HPLC Calibrated',
    subtitle: 'Standardized Bioactives',
  },
  {
    icon: PackageCheck,
    title: '100% Discreet Delivery',
    subtitle: 'Zero Sensitive Labels',
  },
  {
    icon: Truck,
    title: 'Doorstep Cash on Delivery',
    subtitle: 'Free Shipping Across India',
  },
]

export function ApothecaryTrustTicker() {
  return (
    <div className="bg-[#07080C] border-y border-slate-800 py-3.5 sm:py-4 text-[#F5EFE6] relative z-20">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-slate-800">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-4 lg:justify-center group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#121622] border border-slate-800 group-hover:border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 transition-colors">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-xs sm:text-[13px] font-medium text-[#FAF7EE] tracking-tight group-hover:text-[#D4B678] transition-colors truncate">
                  {item.title}
                </p>
                <p className="text-[10px] text-[#A8A295] truncate">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
