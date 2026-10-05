'use client'

import React from 'react'
import { Star, ShieldCheck } from 'lucide-react'

const testimonials = [
  {
    initials: 'VS',
    name: 'Vikramaditya S.',
    location: 'Delhi',
    verified: 'Verified Buyer',
    product: 'Vitality & Performance Power Combo',
    rating: 5,
    quote:
      'The Vitality Power Combo delivered noticeable changes within three weeks. BODY Nutrition restored my daily physical stamina without any jittery feelings, and STAYMAX+ provides calm, dependable endurance without artificial numbness. The discreet brown parcel packaging is genuinely confidential.',
  },
  {
    initials: 'RN',
    name: 'Rajesh Nair',
    location: 'Bengaluru',
    verified: 'Verified Buyer',
    product: 'BODY Essential Nutrition (60 Caps)',
    rating: 5,
    quote:
      'Working long corporate hours and training regularly left me drained by evening. Taking two capsules after dinner has helped with morning recovery and everyday focus. You can tell this is pure Shilajit and Ashwagandha without fillers.',
  },
  {
    initials: 'AM',
    name: 'Amitabh M.',
    location: 'Mumbai',
    verified: 'Verified Buyer',
    product: 'STAYMAX+ Delay Spray (30 ml)',
    rating: 5,
    quote:
      'Unlike standard market options that cause severe numbness or tingling, STAYMAX+ is smooth and plant-based. It absorbs cleanly within 10 to 15 minutes and leaves no greasy residue. Exactly what an Ayurvedic formulation should be.',
  },
]

export function PatronTestimonials() {
  return (
    <section className="bg-[#F5F1EB] py-14 sm:py-20 lg:py-24 border-b border-[#E2DDD5]">
      <div className="container">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12 text-left">
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1.5">
            Patron Reflections
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1D1F] tracking-tight">
            Documented Patron Experiences
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] mt-2 font-sans leading-relaxed">
            Unfiltered accounts from patrons across India who incorporate our classical formulations into their daily wellness routines.
          </p>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Rating & Location */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#E2DDD5]">
                  <div className="flex text-[#9E8047] gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#737373]">
                    {t.location}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-[13px] text-[#333333] leading-relaxed mt-4 italic font-serif">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-[#E2DDD5]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E2DDD5] flex items-center justify-center text-xs font-mono font-medium text-[#1C1D1F] flex-shrink-0">
                    {t.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-heading text-xs sm:text-sm font-medium text-[#1C1D1F] truncate">
                        {t.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#4E5F52] flex-shrink-0">
                        <ShieldCheck className="w-3 h-3 text-[#4E5F52]" />
                        <span>{t.verified}</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-[#737373] truncate mt-0.5 font-sans">
                      {t.product}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
