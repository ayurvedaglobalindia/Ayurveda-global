'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How discreet is the packaging and delivery?',
    answer:
      'All Ayur Veda Global shipments are dispatched in plain, unmarked brown cardboard boxes. There are zero brand logos, product names, or sensitive keywords printed on the exterior carton. Even the courier shipping slip states only a discreet warehouse sender name to safeguard your absolute privacy.',
  },
  {
    question: 'How do I use BODY Essential Nutrition and STAYMAX+ Spray together?',
    answer:
      'They are formulated to work as an inside-out synergistic protocol in our Vitality Power Combo. For daily constitutional stamina, take 1 to 2 capsules of BODY Essential Nutrition twice daily after meals with warm water or milk. For topical endurance, apply 2 to 3 metered sprays of STAYMAX+ 10 to 15 minutes prior to intimate moments and massage lightly into the dermal tissue until absorbed.',
  },
  {
    question: 'Is Cash on Delivery (COD) available across India?',
    answer:
      'Yes. We provide Cash on Delivery (COD) service across 19,000+ pin codes in India, covering all major metropolitan regions, Tier 2/3 cities, and towns. You can inspect the outer packaging and pay the courier executive via cash or UPI upon doorstep delivery.',
  },
  {
    question: 'Are these formulations safe for regular, daily use?',
    answer:
      'Yes. Our formulations are classical Ayurvedic Rasayanas prepared with standardized botanical extracts and purified minerals. They contain zero synthetic hormones, steroids, or chemical stimulants. Every batch is tested for heavy metals and produced in an AYUSH-licensed and GMP-certified facility.',
  },
  {
    question: 'When can I expect to feel noticeable results?',
    answer:
      'STAYMAX+ Delay Spray works topically within 10 to 15 minutes of application. For BODY Essential Nutrition capsules, most patrons observe improved daily energy, digestion, and reduced physical fatigue within 7 to 10 days, with deep stamina stabilizing across a 3 to 4 week routine.',
  },
]

export function ApothecaryFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-[#FAF7F2] py-12 sm:py-16 border-b border-[#E2DDD5]">
      <div className="container">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12 text-left">
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1.5">
            Apothecary Guidance
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1D1F] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] mt-2 font-sans leading-relaxed">
            Transparent guidance regarding botanical sources, discreet parcel protocols, Cash on Delivery, and daily usage.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`rounded-xl overflow-hidden transition-colors border ${
                  isOpen
                    ? 'bg-[#FFFFFF] border-[#1C1D1F]'
                    : 'bg-[#FFFFFF] border-[#E2DDD5] hover:border-[#1C1D1F]/50'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm sm:text-base font-medium text-[#1C1D1F] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 border ${
                      isOpen
                        ? 'rotate-180 bg-[#1C1D1F] border-[#1C1D1F] text-[#FAF7F2]'
                        : 'border-[#E2DDD5] text-[#737373]'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-[13px] text-[#555555] leading-relaxed border-t border-[#E2DDD5] pt-4 font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
