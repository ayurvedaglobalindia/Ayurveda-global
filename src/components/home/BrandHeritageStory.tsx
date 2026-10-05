'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function BrandHeritageStory() {
  return (
    <section className="bg-[#FAF7F2] py-14 sm:py-18 lg:py-24 border-b border-[#E2DDD5]">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Brand Philosophy */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block">
              Our Lineage &amp; Philosophy
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1D1F] tracking-tight leading-snug">
              Classical Formulation, Prepared with Uncompromising Restraint
            </h2>

            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans">
              Ayur Veda Global was founded on a singular principle: authentic Ayurvedic Rasayana cannot be manufactured through shortcuts. While modern markets are saturated with synthetic stimulants and fillers, our apothecary adheres to classical Charaka Samhita treatises.
            </p>

            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans">
              We select botanicals from their natural geographical habitats — high-altitude Himalayan Shilajit and Nagori Ashwagandha — and purify them through traditional Shodhana. The result is a line of calm, dependable remedies engineered for biological balance.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1C1D1F] hover:text-[#9E8047] transition-colors border-b border-[#1C1D1F] pb-0.5"
              >
                <span>Read Our Full Botanical Heritage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Classical Pharmacopeia Tenets */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 sm:p-6 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] block">
                Principle 01
              </span>
              <h3 className="font-heading text-base font-medium text-[#1C1D1F]">
                Classical Shodhana Purification
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed font-sans">
                Dense organic minerals such as raw Shilajit undergo 21 iterative decoction cycles in Triphala water to remove insoluble matter and amplify ionic bioavailability.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] block">
                Principle 02
              </span>
              <h3 className="font-heading text-base font-medium text-[#1C1D1F]">
                Standardized Bioactive Extracts
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed font-sans">
                We utilize standardized botanical concentrates — guaranteeing 5% withanolides in Ashwagandha and 75%+ fulvic acid in Shilajit — verified via laboratory chromatography.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] block">
                Principle 03
              </span>
              <h3 className="font-heading text-base font-medium text-[#1C1D1F]">
                100% Plant Cellulose Delivery
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed font-sans">
                All oral formulations are enclosed in plant-based vegetarian cellulose shells. Free from animal gelatin, talc, artificial colorants, and synthetic binders.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
