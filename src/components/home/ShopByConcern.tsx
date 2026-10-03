'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Flame,
  Zap,
  Sparkles,
  ShieldCheck,
  Activity,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Leaf,
  Clock,
  Award,
} from 'lucide-react'

interface HealthConcern {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
  description: string
  recommendedProduct: {
    name: string
    slug: string
    price: string
    originalPrice: string
    savings: string
    image: string
    features: string[]
  }
}

const healthConcerns: HealthConcern[] = [
  {
    id: 'stamina-energy',
    title: 'Daily Stamina & Vigor',
    subtitle: 'Internal Strength & ATP Energy',
    icon: Flame,
    badge: 'Herbal Rasayana',
    description: 'Combats daily fatigue, restores peak cellular energy, and accelerates muscle recovery using ancient Rasayana herbs.',
    recommendedProduct: {
      name: 'BODY Essential Nutrition',
      slug: 'body-essential-nutrition',
      price: '₹1,299',
      originalPrice: '₹1,599',
      savings: 'Save ₹300 (19% OFF)',
      image: '/images/products/body-essential-nutrition-front.jpg',
      features: ['Himalayan Shilajit (84+ Minerals)', 'Ashwagandha (5% Withanolides)', 'Safed Musli & Gokshura', '60 Veg Capsules'],
    },
  },
  {
    id: 'intimate-endurance',
    title: 'Intimate Endurance & Control',
    subtitle: 'Topical Climax Delay & Confidence',
    icon: Zap,
    badge: 'Fast Acting (15 Mins)',
    description: 'Clinically formulated topical spray to extend intimacy by 10-15 minutes without numbness or skin irritation.',
    recommendedProduct: {
      name: 'STAYMAX+ Delay Spray',
      slug: 'staymax-delay-spray',
      price: '₹1,199',
      originalPrice: '₹1,499',
      savings: 'Save ₹300 (20% OFF)',
      image: '/images/products/staymax-delay-spray-front.jpg',
      features: ['Extends duration by 10-15 min', 'Skin-calming Aloe Vera base', 'Non-greasy & quick absorbing', 'Discreet 30 ml bottle (75+ sprays)'],
    },
  },
  {
    id: 'inside-out-combo',
    title: 'Inside-Out Vitality Combo',
    subtitle: 'Dual-Action Synergistic System',
    icon: Sparkles,
    badge: 'Doctor Recommended • 29% OFF',
    description: 'The ultimate power system: build sustained stamina internally while gaining instant topical control during intimate moments.',
    recommendedProduct: {
      name: 'Vitality & Performance Power Combo',
      slug: 'vitality-power-combo',
      price: '₹1,999',
      originalPrice: '₹2,798',
      savings: 'Save ₹799 (29% OFF)',
      image: '/images/products/vitality-power-combo.jpg',
      features: ['1× BODY Nutrition (60 Caps)', '1× STAYMAX+ Delay Spray (30 ml)', 'Complete inside-out synergy', 'Free Discreet Courier Delivery'],
    },
  },
  {
    id: 'holistic-wellness',
    title: 'Immunity & Deep Tissue Health',
    subtitle: 'Ayurvedic Dhatu Nourishment',
    icon: HeartPulse,
    badge: '100% Ayurvedic & Safe',
    description: 'Nourishes the 7 Dhatus (vital tissues) to bolster innate immunity, mental focus, and stress resistance naturally.',
    recommendedProduct: {
      name: 'BODY Nutrition (Double Pack - 120 Caps)',
      slug: 'body-essential-nutrition?variant=120',
      price: '₹2,399',
      originalPrice: '₹3,198',
      savings: 'Save ₹799 (25% OFF)',
      image: '/images/products/body-essential-nutrition-front.jpg',
      features: ['Full 60-day Ayurvedic regimen', 'Promotes deep tissue recovery', 'Non-hormonal & non-addictive', 'Zero chemical side effects'],
    },
  },
]

export function ShopByConcern() {
  const [activeConcernId, setActiveConcernId] = useState<string>('inside-out-combo')
  const activeConcern = healthConcerns.find(c => c.id === activeConcernId) || healthConcerns[2]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#010804] via-[#03150A] to-[#010804] border-b border-emerald-500/20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-950/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3 shadow-sm">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Targeted Health Regimens • Dr. Vaidya&apos;s Standard</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            Shop By Health Concern
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-xl mx-auto leading-relaxed">
            Choose your wellness goal. Every formulation is crafted by Ayurvedic doctors with clinically standardized botanical extracts.
          </p>
        </div>

        {/* Concern Selector Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-10">
          {healthConcerns.map(concern => {
            const Icon = concern.icon
            const isSelected = concern.id === activeConcernId

            return (
              <button
                key={concern.id}
                onClick={() => setActiveConcernId(concern.id)}
                className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-900/60 to-[#0A2E1A] border-[#D4AF37] shadow-lg shadow-emerald-950/60 ring-1 ring-[#D4AF37]/50 scale-[1.02]'
                    : 'bg-[#04150B]/80 hover:bg-[#072012]/80 border-emerald-500/20 text-gray-300 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#D4AF37] text-black shadow-md'
                        : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-black/40 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                      Active
                    </span>
                  )}
                </div>
                <div>
                  <h3
                    className={`font-semibold text-xs sm:text-sm leading-snug ${
                      isSelected ? 'text-white font-bold' : 'text-gray-200'
                    }`}
                  >
                    {concern.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">
                    {concern.subtitle}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Concern Solution Showcase Card */}
        <div className="bg-gradient-to-br from-[#061F12] via-[#04150B] to-[#020A05] border border-[#D4AF37]/30 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left: Product Visual with Badges */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-[#010904] border border-emerald-500/30 shadow-inner group p-4 flex items-center justify-center">
                <Image
                  src={activeConcern.recommendedProduct.image}
                  alt={activeConcern.recommendedProduct.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-[#D4AF37] text-black px-2.5 py-1 rounded-full shadow">
                    {activeConcern.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Formulation Details & Purchase Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    Recommended Formulation
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-emerald-400 font-medium">AYUSH Approved Regimen</span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-snug">
                  {activeConcern.recommendedProduct.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 mb-5 leading-relaxed">
                  {activeConcern.description}
                </p>

                {/* Key Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {activeConcern.recommendedProduct.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-gray-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Savings */}
                <div className="flex items-baseline gap-3 mb-6 p-3 rounded-2xl bg-black/40 border border-emerald-500/20 w-fit">
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-white">
                    {activeConcern.recommendedProduct.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {activeConcern.recommendedProduct.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {activeConcern.recommendedProduct.savings}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-emerald-500/20">
                <Link
                  href={`/product/${activeConcern.recommendedProduct.slug}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all"
                >
                  <span>View Product Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/shop"
                  className="px-5 py-3 rounded-xl bg-transparent hover:bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 font-semibold text-xs sm:text-sm transition-colors"
                >
                  Browse All Formulations
                </Link>

                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 sm:ml-auto">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Discreet Packaging Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
