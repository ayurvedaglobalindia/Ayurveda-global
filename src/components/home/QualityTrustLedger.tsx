'use client'

import React from 'react'
import { ShieldCheck, FlaskConical, PackageCheck, Truck } from 'lucide-react'

const trustPoints = [
  {
    icon: ShieldCheck,
    title: 'AYUSH Licensed & GMP Certified',
    label: 'Regulatory Compliance',
    description:
      'Formulated strictly in compliance with Ministry of AYUSH standards and produced in an ISO & GMP-certified pharmaceutical manufacturing facility.',
  },
  {
    icon: FlaskConical,
    title: 'NABL Certified Purity Testing',
    label: 'Lab Verification',
    description:
      'Every production batch undergoes independent NABL-accredited laboratory assays for heavy metals (Lead, Mercury, Arsenic) and microbiological safety.',
  },
  {
    icon: PackageCheck,
    title: '100% Discreet Packaging',
    label: 'Privacy Assured',
    description:
      'Shipped in completely plain, tamper-evident outer parcels without any medical product descriptions or sensitive branding on shipping labels.',
  },
  {
    icon: Truck,
    title: 'Pan-India Delivery & Cash on Delivery',
    label: 'Nationwide Logistics',
    description:
      'Express courier delivery across 19,000+ Indian pin codes with full Cash on Delivery (COD) availability and direct real-time tracking.',
  },
]

export function QualityTrustLedger() {
  return (
    <section className="bg-[#FAF7F2] py-12 sm:py-16 lg:py-20 border-b border-[#E2DDD5]">
      <div className="container">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12 text-left">
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1.5">
            Purity &amp; Compliance Standards
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1D1F] tracking-tight">
            Quality Assurance &amp; Patron Trust
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] mt-2 font-sans leading-relaxed">
            Our commitment to purity is verified through rigorous analytical screening, standardized processes, and complete patron confidentiality.
          </p>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {trustPoints.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#1C1D1F] transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#F5F1EB] border border-[#E2DDD5] flex items-center justify-center text-[#4E5F52] mb-4">
                  <item.icon className="w-5 h-5" />
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] block mb-1">
                  {item.label}
                </span>

                <h3 className="font-heading text-base font-medium text-[#1C1D1F] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#555555] mt-2.5 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
