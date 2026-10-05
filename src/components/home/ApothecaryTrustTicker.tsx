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
    <div className="bg-[#090A0D] border-y border-[#999999]/15 py-4 sm:py-4.5 text-[#FAF7EE] relative z-20">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-[#999999]/15">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-2 sm:px-6 lg:justify-center group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#12141A] border border-[#999999]/20 group-hover:border-[#D8C28A]/40 flex items-center justify-center text-[#D8C28A] flex-shrink-0 transition-colors">
                <item.icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-xs sm:text-[13px] font-normal text-[#FAF7EE] tracking-wide group-hover:text-[#D8C28A] transition-colors truncate">
                  {item.title}
                </p>
                <p className="text-[10.5px] text-[#999999] truncate mt-0.5 font-normal">
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
