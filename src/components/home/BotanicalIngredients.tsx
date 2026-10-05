'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

interface BotanicalSpecimen {
  id: string
  name: string
  latin: string
  sanskrit: string
  compounds: string
  primaryBenefit: string
  description: string
  productTitle: string
  productHref: string
  productImage: string
}

const specimens: BotanicalSpecimen[] = [
  {
    id: 'shilajit',
    name: 'Purified Himalayan Shilajit',
    latin: 'Asphaltum punjabianum',
    sanskrit: 'शिलाजतु • Rasayana',
    compounds: '75%+ Fulvic Acid • 84 Ionic Trace Minerals',
    primaryBenefit: 'Mitochondrial Cellular Energy & Daily Stamina',
    description:
      'Harvested from high-altitude Himalayan rock faces and purified via 21 traditional Shodhana cycles in Triphala water. Acts as an organic catalyst delivering trace minerals straight into cellular mitochondria.',
    productTitle: 'Vitality & Performance Power Combo',
    productHref: '/product/vitality-power-combo',
    productImage: '/images/products/vitality-power-combo-card.jpg',
  },
  {
    id: 'ashwagandha',
    name: 'Nagori Ashwagandha Root',
    latin: 'Withania somnifera',
    sanskrit: 'अश्वगंधा • Balya & Medhya',
    compounds: '5% Standardized Withanolides',
    primaryBenefit: 'Stress Modulation & Physical Endurance',
    description:
      'Revered adaptogenic root extract standardized for active withanolides. Helps regulate cortisol response under chronic physical stress while supporting neuromuscular stamina and restful sleep.',
    productTitle: 'BODY Essential Nutrition (60 Caps)',
    productHref: '/product/body-essential-nutrition',
    productImage: '/images/products/body-essential-nutrition-card.jpg',
  },
  {
    id: 'bhringraj',
    name: 'Bhringraj & Rosemary Taila',
    latin: 'Eclipta alba & Rosmarinus officinalis',
    sanskrit: 'केश संजीवनी • Keshya',
    compounds: 'Wedelolactone • Rosmarinic Bioactives',
    primaryBenefit: 'Scalp Micro-Circulation & Root Reinforcement',
    description:
      'Prepared through classical Kshir Pak decoction where active herbs are simmered in milk and pure sesame oil. Stimulates dormant hair follicles, reduces scalp dryness, and curbs hair fall naturally.',
    productTitle: 'HAIR RE-GROW Ayurvedic Scalp Oil (100 ml)',
    productHref: '/product/hair-regrow-oil',
    productImage: '/images/products/hair-regrow-oil-card.jpg',
  },
  {
    id: 'safed-musli',
    name: 'Wildcrafted Safed Musli & Kaunch Beej',
    latin: 'Chlorophytum borivilianum & Mucuna pruriens',
    sanskrit: 'श्वेत मूसली • Shukra Dhatu Poshana',
    compounds: 'Steroidal Saponins • Natural L-Dopa',
    primaryBenefit: 'Deep Tissue Replenishment & Vitality',
    description:
      'A synergistic combination documented in classical Ayurvedic compendia to nourish reproductive and muscular tissues. Provides clean, non-stimulant stamina and neurological focus.',
    productTitle: 'BODY Essential Nutrition',
    productHref: '/product/body-essential-nutrition',
    productImage: '/images/products/body-essential-nutrition-card.jpg',
  },
]

export function BotanicalIngredients() {
  const [activeHerb, setActiveHerb] = useState(0)
  const current = specimens[activeHerb]

  return (
    <section className="bg-[#FAF7F2] py-14 sm:py-20 lg:py-24 border-b border-[#E2DDD5]">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1.5">
              Therapeutic Botanicals
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1D1F] tracking-tight">
              Standardized Herbal Actives
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] mt-2 font-sans">
              Each botanical ingredient is chosen for its specific classical Ayurvedic affinity and tested for purity before formulation.
            </p>
          </div>

          {/* Quick Herb Selectors (Tabs) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {specimens.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveHerb(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-colors ${
                  activeHerb === idx
                    ? 'bg-[#1C1D1F] text-[#FAF7F2] font-medium'
                    : 'bg-[#FFFFFF] text-[#737373] hover:text-[#1C1D1F] border border-[#E2DDD5]'
                }`}
              >
                {item.name.split(' ')[0]} {item.name.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Botanical Card */}
        <div className="bg-[#FFFFFF] border border-[#E2DDD5] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Scientific and Classical Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#9E8047] uppercase tracking-wider">
                  Specimen 0{activeHerb + 1}
                </span>
                <span className="text-[#999999]/40">•</span>
                <span className="text-xs font-mono text-[#737373]">
                  {current.sanskrit}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-medium text-[#1C1D1F]">
                  {current.name}
                </h3>
                <p className="text-xs text-[#737373] italic font-serif mt-0.5">
                  {current.latin}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E2DDD5] text-xs">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#4E5F52] font-medium">
                  Active Compounds
                </div>
                <div className="text-[#1C1D1F] font-medium mt-0.5">
                  {current.compounds}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans pt-1">
                {current.description}
              </p>

              <div className="pt-3">
                <Link
                  href={current.productHref}
                  className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#1C1D1F] hover:text-[#9E8047] transition-colors border-b border-[#1C1D1F] pb-1"
                >
                  <span>Formulated in {current.productTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Associated Formulation Image */}
            <div className="lg:col-span-5 flex justify-center">
              <Link
                href={current.productHref}
                className="group relative block w-full max-w-[280px] aspect-[4/5] rounded-xl overflow-hidden bg-[#F5F1EB] border border-[#E2DDD5] shadow-inner"
              >
                <Image
                  src={current.productImage}
                  alt={current.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 280px, 320px"
                />
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-[#FAF7F2]/95 backdrop-blur-sm border border-[#E2DDD5] text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373] block">
                    Key Indication
                  </span>
                  <span className="text-xs font-medium text-[#1C1D1F]">
                    {current.primaryBenefit}
                  </span>
                </div>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
