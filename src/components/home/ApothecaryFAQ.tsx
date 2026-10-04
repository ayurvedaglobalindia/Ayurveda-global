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
    <section className="bg-[#0E1E14] py-8 sm:py-10 lg:py-12 border-b border-[#C2A265]/20 text-[#F5EFE6] relative">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#142A1D] border border-[#C2A265]/30 text-[#C2A265] text-[9.5px] font-semibold tracking-[0.22em] uppercase mb-2">
            <HelpCircle className="w-3 h-3" />
            <span>Common Inquiries</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#FAF7EE] tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-[11px] sm:text-xs text-[#C5BFB3] mt-2 max-w-lg mx-auto leading-relaxed font-sans">
            Transparent guidance regarding our ingredients, delivery discretion, payment methods, and usage regimens.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'bg-[#142A1D] border border-[#C2A265]/45 shadow-lg'
                    : 'bg-[#12241A] border border-[#C2A265]/20 hover:border-[#C2A265]/35'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm sm:text-base font-normal text-[#FAF7EE] group-hover:text-[#D4B678] transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#162D1F] border border-[#C2A265]/20 flex items-center justify-center text-[#C2A265] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#C2A265] text-[#0B150F]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-[13px] text-[#A8A295] leading-relaxed border-t border-[#C2A265]/10 pt-4 font-sans animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Contact Help */}
        <div className="mt-8 sm:mt-10 text-center text-xs text-[#A8A295]">
          <span>Still have an unanswered question? </span>
          <a
            href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20have%20a%20question%20regarding%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C2A265] hover:underline font-semibold"
          >
            Chat directly with our Ayurvedic Care Concierge on WhatsApp →
          </a>
        </div>

      </div>
    </section>
  )
}
