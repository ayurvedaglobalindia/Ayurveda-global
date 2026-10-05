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
    <section className="bg-[#08090C] py-12 sm:py-16 lg:py-20 border-b border-[#999999]/20 text-[#FAF7EE] relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[450px] h-[450px] bg-[#D8C28A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11141E] border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-semibold tracking-[0.24em] uppercase mb-3 backdrop-blur-md shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7B7]" />
            <span>№ 07 • Verified Patron Accounts</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-light text-[#FAF7EE] tracking-tight">
            Trusted by Discerning Patrons Across India
          </h2>

          <p className="text-xs sm:text-sm text-[#999999] mt-3 max-w-xl mx-auto leading-relaxed font-sans font-normal">
            Real experiences from individuals who chose Classical Ayurvedic Rasayana over synthetic temporary fixes.
          </p>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#131722] via-[#0E1118] to-[#0A0C11] border border-[#999999]/25 hover:border-[#D8C28A]/45 shadow-2xl flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 ease-out group"
            >
              <div>
                {/* Star Rating & Location */}
                <div className="flex items-center justify-between pb-4 border-b border-[#999999]/20">
                  <div className="flex text-[#D8C28A] gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#999999] font-medium">
                    {t.location}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-[13.5px] text-[#FAF7EE]/90 leading-relaxed mt-4 italic font-serif">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info with Monogram Avatar */}
              <div className="mt-6 pt-4 border-t border-[#999999]/20">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#151926] border border-[#D8C28A]/40 flex items-center justify-center text-xs font-semibold text-[#D8C28A] font-serif flex-shrink-0 shadow-sm">
                    {t.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-heading text-sm font-semibold text-[#FAF7EE] truncate">
                        {t.name}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#6EE7B7] font-medium flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#6EE7B7]" />
                        <span>Verified</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-[#D8C28A] truncate mt-0.5 font-medium">
                      {t.product}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#999999] pt-8 border-t border-[#999999]/20">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold text-[#FAF7EE]">4.9 / 5</span>
            <span>Average Patron Rating</span>
          </div>
          <span className="text-[#999999]/40">•</span>
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold text-[#FAF7EE]">94.2%</span>
            <span>Course Completion Rate</span>
          </div>
          <span className="text-[#999999]/40">•</span>
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold text-[#FAF7EE]">100%</span>
            <span>Confidential Delivery</span>
          </div>
        </div>

      </div>
    </section>
  )
}
