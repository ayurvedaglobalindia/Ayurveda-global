'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const collections = [
  {
    title: 'Herbal Supplements',
    description: 'Internal Dhatu nourishment to replenish daily physical stamina, metabolic vigor, and cognitive focus.',
    href: '/categories/supplements',
    count: '3 Formulations',
    badge: 'Rasayana Nutrition',
  },
  {
    title: 'Topical Personal Care',
    description: 'Calibrated topical applications including fast-acting endurance sprays and herbal Kshir Pak scalp tailas.',
    href: '/categories/personal-care',
    count: '2 Formulations',
    badge: 'Dermal & Scalp Care',
  },
  {
    title: 'Synergistic Kits & Combos',
    description: 'Inside-out combination therapies pairing internal capsules with external applications for compounded efficacy.',
    href: '/categories/wellness',
    count: '2 Formulations',
    badge: 'Complete Routines',
  },
]

export function CollectionStrip() {
  return (
    <section className="bg-[#F5F1EB] py-12 sm:py-16 border-b border-[#E2DDD5]">
      <div className="container">
        
        <div className="max-w-xl mb-8 sm:mb-10 text-left">
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1.5">
            Apothecary Categories
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F] tracking-tight">
            Curated Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] mt-1.5 font-sans">
            Explore targeted solutions arranged by therapeutic application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className="group p-6 sm:p-7 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#1C1D1F] transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] mb-3">
                  <span className="uppercase tracking-wider text-[#9E8047]">{col.badge}</span>
                  <span>{col.count}</span>
                </div>

                <h3 className="font-heading text-lg font-medium text-[#1C1D1F] group-hover:text-[#9E8047] transition-colors">
                  {col.title}
                </h3>

                <p className="text-xs text-[#555555] mt-2.5 leading-relaxed font-sans">
                  {col.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2DDD5] flex items-center justify-between text-xs font-medium text-[#1C1D1F]">
                <span>Browse Collection</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
