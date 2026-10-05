'use client'

import React from 'react'
import { ShieldCheck, FlaskConical, PackageCheck, Truck } from 'lucide-react'
import { motion } from 'framer-motion'

const trustPoints = [
  {
    icon: ShieldCheck,
    title: 'AYUSH Licensed',
    subtitle: 'GMP Certified Manufacturing',
  },
  {
    icon: FlaskConical,
    title: 'NABL Lab Tested',
    subtitle: 'Heavy Metal & Purity Screened',
  },
  {
    icon: PackageCheck,
    title: '100% Discreet Packaging',
    subtitle: 'Plain Unmarked Parcel Delivery',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery & COD',
    subtitle: '19,000+ Pin Codes Covered',
  },
]

export function QualityTrustLedger() {
  return (
    <section className="bg-[#FAF7F2] border-b border-[#999999]/30 py-3.5 sm:py-4" aria-label="Quality Standards">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#999999]/30">
          {trustPoints.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-4 first:pt-0 first:px-0"
            >
              <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#999999]/40 flex items-center justify-center text-[#4E5F52] flex-shrink-0">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#1C1D1F] leading-tight truncate font-sans">
                  {item.title}
                </p>
                <p className="text-[11px] text-[#737373] font-normal leading-tight mt-0.5 truncate font-sans">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
