'use client'

import React from 'react'
import Link from 'next/link'
import {
  Flame,
  Zap,
  Sparkles,
  HeartPulse,
  Leaf,
  ShieldCheck,
  ArrowRight,
  Droplets,
  Activity,
} from 'lucide-react'

interface CategoryItem {
  id: string
  name: string
  hindiName: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description: string
  color: string
}

const categories: CategoryItem[] = [
  {
    id: 'stamina-vitality',
    name: 'Stamina & Vigor',
    hindiName: 'बल एवं वीर्य वर्धक',
    href: '/shop?category=supplements',
    icon: Flame,
    badge: 'Bestseller',
    description: 'Himalayan Shilajit & Ashwagandha Rasayana for cellular energy',
    color: 'from-amber-500/20 to-emerald-950/80',
  },
  {
    id: 'endurance-delay',
    name: 'Endurance & Control',
    hindiName: 'स्तम्भन एवं नियंत्रण',
    href: '/shop?category=personal-care',
    icon: Zap,
    badge: 'Fast Acting',
    description: 'STAYMAX+ Spray with soothing botanical Aloe Vera base',
    color: 'from-emerald-900/40 to-[#041F10]',
  },
  {
    id: 'power-combos',
    name: 'Power Combos',
    hindiName: 'सम्पूर्ण योग किट',
    href: '/product/vitality-power-combo',
    badge: 'Save 29%',
    icon: Sparkles,
    description: 'Inside-Out complete synergy (Capsules + Topical Spray)',
    color: 'from-amber-600/30 to-[#072414]',
  },
  {
    id: 'immunity-detox',
    name: 'Immunity & Detox',
    hindiName: 'रोग प्रतिरोधक क्षमता',
    href: '/shop?category=wellness',
    icon: ShieldCheck,
    description: 'Purifies Ama toxins and fortifies innate bodily defense',
    color: 'from-emerald-950/60 to-[#031309]',
  },
  {
    id: 'hair-scalp',
    name: 'Hair & Scalp Health',
    hindiName: 'केश एवं शिरो पोषण',
    href: '/shop?category=supplements',
    badge: 'Classical',
    icon: Droplets,
    description: 'Amla, Bhringraj & Brahmi for roots nourishment',
    color: 'from-emerald-950/50 to-[#020F07]',
  },
  {
    id: 'deep-tissue',
    name: 'Joint & Muscle Relief',
    hindiName: 'अस्थि एवं संधि पोषण',
    href: '/shop?category=wellness',
    icon: HeartPulse,
    description: 'Nourishes Majja Dhatu, reduces inflammation naturally',
    color: 'from-amber-950/40 to-[#031409]',
  },
]

export function CircularCategoryShowcase() {
  return (
    <section className="py-12 sm:py-16 bg-[#020E06] border-b border-[#D4AF37]/25 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
              श्रेणी वार चिकित्सा • Shop By Category
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
              Targeted Ayurvedic Collections
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
              Authentic classical formulations classified according to Ayurvedic texts and specific health goals.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-[#D4AF37] hover:text-amber-300 flex items-center gap-1.5 transition-colors group flex-shrink-0"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Circular / App-Style Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative rounded-2xl bg-gradient-to-b from-[#051E11] to-[#020C06] border border-emerald-500/25 hover:border-[#D4AF37]/60 p-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
              >
                {/* Badge if present */}
                {cat.badge && (
                  <span className="absolute top-2 right-2 text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-[#D4AF37] text-black px-1.5 py-0.5 rounded shadow">
                    {cat.badge}
                  </span>
                )}

                {/* Circular Icon Stage with Gold Halo */}
                <div className="relative my-2">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-emerald-950 via-[#072916] to-[#0D3820] border-2 border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:border-[#D4AF37] transition-all duration-300 shadow-inner group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                </div>

                {/* Names & Description */}
                <h3 className="font-heading text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors mt-2 leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-[#D4AF37] font-medium mt-0.5">
                  {cat.hindiName}
                </p>
                <p className="text-[10px] text-gray-400 line-clamp-2 mt-1 leading-snug">
                  {cat.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
