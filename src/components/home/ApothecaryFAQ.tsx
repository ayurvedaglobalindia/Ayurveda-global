'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react'

const faqs = [
  {
    question: 'How discreet is the packaging and delivery?',
    answer:
      'We understand that intimate wellness and health products require absolute privacy. All Ayur Veda Global shipments are dispatched in plain, unmarked brown corrugated boxes. There are zero brand logos, product names, or sensitive keywords printed on the exterior carton. Even the courier shipping slip states only a discreet warehouse sender name.',
  },
  {
    question: 'How do I use BODY Essential Nutrition and STAYMAX+ Spray together?',
    answer:
      'They are formulated to work as an inside-out synergistic protocol in our Vitality Power Combo. For daily constitutional vitality, take 1 to 2 capsules of BODY Essential Nutrition twice daily after meals with warm water or lukewarm milk. For topical endurance, apply 2 to 3 metered sprays of STAYMAX+ 10 to 15 minutes prior to intimate moments and massage lightly into the dermal tissue until absorbed.',
  },
  {
    question: 'Is Cash on Delivery (COD) available in my area?',
    answer:
      'Yes. We provide Cash on Delivery (COD) service across 25,000+ pin codes across India, covering all major metropolitan regions, Tier 2/3 cities, and towns. You can inspect the outer packaging and pay the courier executive via cash or UPI upon doorstep delivery.',
  },
  {
    question: 'Are these formulations safe for regular, long-term use?',
    answer:
      'Yes, 100%. Our formulations are classical Ayurvedic Rasayanas prepared with standardized herbal extracts and purified minerals. They contain zero synthetic hormones, steroids, or chemical stimulants. They are screened for heavy metals and produced under strict AYUSH and GMP certifications, making them safe, non-habit forming, and non-addictive.',
  },
  {
    question: 'When can I expect to feel noticeable results?',
    answer:
      'STAYMAX+ Delay Spray works topically within 10 to 15 minutes of application. For BODY Essential Nutrition capsules, most patrons report enhanced digestion, deeper sleep, and reduced fatigue within 7 to 10 days, with deep muscular stamina and intimate endurance reaching peak levels between days 21 and 30.',
  },
]

export function ApothecaryFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-[#08090C] py-8 sm:py-12 lg:py-16 border-b border-[#999999]/20 text-[#FAF7EE] relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-96 h-96 bg-[#6EE7B7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11141E] border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-semibold tracking-[0.24em] uppercase mb-2.5 backdrop-blur-md shadow-sm">
            <HelpCircle className="w-3 h-3 text-[#6EE7B7]" />
            <span>№ 08 • Formulation &amp; Delivery Inquiries</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#FAF7EE] tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-xs sm:text-sm text-[#999999] mt-2.5 max-w-lg mx-auto leading-relaxed font-sans">
            Transparent guidance regarding our ingredients, delivery discretion, payment methods, and usage regimens.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'bg-[#151926] border border-[#6EE7B7]/40 shadow-lg'
                    : 'bg-[#11141E] border border-[#999999]/20 hover:border-[#999999]/40'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm sm:text-base font-medium text-[#FAF7EE] group-hover:text-[#D8C28A] transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-[#D8C28A] text-[#08090C]'
                        : 'bg-[#151926] border border-[#999999]/25 text-[#6EE7B7]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-[13px] text-[#999999] leading-relaxed border-t border-[#999999]/20 pt-3.5 font-sans animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Contact Help */}
        <div className="mt-8 sm:mt-10 text-center text-xs text-[#999999]">
          <span>Still have an unanswered question? </span>
          <a
            href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20have%20a%20question%20regarding%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D8C28A] hover:text-[#E6D5AC] hover:underline font-semibold"
          >
            Chat directly with our Ayurvedic Care Concierge on WhatsApp →
          </a>
        </div>

      </div>
    </section>
  )
}
