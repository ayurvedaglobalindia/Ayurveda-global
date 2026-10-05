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
    <div className="bg-[#07080C] border-y border-[#999999]/20 py-4 text-[#FAF7EE] relative z-20">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-[#999999]/20">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-4 lg:justify-center group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#11141E] border border-[#999999]/25 group-hover:border-[#6EE7B7]/50 flex items-center justify-center text-[#6EE7B7] flex-shrink-0 transition-colors shadow-sm">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-xs sm:text-[13px] font-medium text-[#FAF7EE] tracking-tight group-hover:text-[#D8C28A] transition-colors truncate">
                  {item.title}
                </p>
                <p className="text-[10.5px] text-[#999999] truncate mt-0.5">
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
