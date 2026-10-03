'use client'

import React from 'react'
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react'

const testimonials = [
  {
    initials: 'VS',
    name: 'Vikramaditya S.',
    location: 'South Delhi',
    verified: 'Verified Buyer (3-Month Regimen)',
    product: 'Vitality & Performance Power Combo',
    rating: 5,
    quote:
      'I was tired of synthetic supplements that caused palpitations and digestive acid. The Vitality Power Combo changed everything within three weeks. BODY Nutrition restored my daily physical stamina without any jittery feelings, and STAYMAX+ delivers calm, dependable endurance without artificial numbness. The discreet brown box delivery is genuinely confidential.',
  },
  {
    initials: 'RN',
    name: 'Rajesh Nair',
    location: 'Indiranagar, Bengaluru',
    verified: 'Verified Buyer (120 Caps Value Pack)',
    product: 'BODY Essential Nutrition',
    rating: 5,
    quote:
      'As a 42-year-old managing long corporate hours and daily gym sessions, my energy reserves were constantly depleted. Taking two capsules after dinner has noticeably improved morning recovery, joint flexibility, and focus. You can immediately feel the quality of pure Shilajit and Ashwagandha.',
  },
  {
    initials: 'AM',
    name: 'Amitabh M.',
    location: 'Bandra West, Mumbai',
    verified: 'Verified Buyer (Twin Pack)',
    product: 'STAYMAX+ Delay Spray',
    rating: 5,
    quote:
      'Unlike market alternatives that burn or make intimacy completely numb, STAYMAX+ is exceptionally smooth. It absorbs fully within 10 to 12 minutes and leaves no odor or sticky residue. My partner and I could not be happier. Highly recommended.',
  },
]

export function PatronTestimonials() {
  return (
    <section className="bg-[#0E1E14] py-8 sm:py-10 lg:py-12 border-b border-[#C2A265]/20 text-[#F5EFE6] relative">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#142A1D] border border-[#C2A265]/30 text-[#C2A265] text-[9.5px] font-semibold tracking-[0.22em] uppercase mb-2">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified Patron Accounts</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#FAF7EE] tracking-tight">
            Trusted by Discerning Patrons Across India
          </h2>

          <p className="text-[11px] sm:text-xs text-[#C5BFB3] mt-2 max-w-lg mx-auto leading-relaxed font-sans">
            Real experiences from individuals who chose Classical Ayurvedic Rasayana over synthetic temporary fixes.
          </p>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-7 rounded-2xl bg-[#12241A] border border-[#C2A265]/20 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <div>
                {/* Star Rating */}
                <div className="flex items-center justify-between pb-4 border-b border-[#C2A265]/15">
                  <div className="flex text-[#C2A265]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A8A295] font-medium">
                    {t.location}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-[13px] text-[#C5BFB3] leading-relaxed mt-4 italic font-serif">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info with Monogram Avatar */}
              <div className="mt-6 pt-4 border-t border-[#C2A265]/15">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#183525] border border-[#C2A265]/40 flex items-center justify-center text-xs font-semibold text-[#D4B678] font-serif flex-shrink-0">
                    {t.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-heading text-sm font-semibold text-[#FAF7EE] truncate">
                        {t.name}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-[#C2A265] truncate mt-0.5">
                      {t.product}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#A8A295] pt-6 border-t border-[#C2A265]/15">
          <div className="flex items-center gap-2">
            <span className="font-heading text-base font-bold text-[#FAF7EE]">4.9 / 5</span>
            <span>Average Patron Rating</span>
          </div>
          <span className="text-[#C2A265]/40">•</span>
          <div className="flex items-center gap-2">
            <span className="font-heading text-base font-bold text-[#FAF7EE]">94.2%</span>
            <span>Course Completion Rate</span>
          </div>
          <span className="text-[#C2A265]/40">•</span>
          <div className="flex items-center gap-2">
            <span className="font-heading text-base font-bold text-[#FAF7EE]">100%</span>
            <span>Confidential Delivery</span>
          </div>
        </div>

      </div>
    </section>
  )
}
