'use client'

import React, { useState, useMemo } from 'react'
import { Search, ChevronDown, MessageSquare, X } from 'lucide-react'
import { Accordion } from '@/components/ui/Accordion'

interface FAQCategory {
  category: string
  items: {
    question: string
    answer: string
  }[]
}

interface FAQClientProps {
  faqs: FAQCategory[]
}

export function FAQClient({ faqs }: FAQClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return faqs

    return faqs
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [faqs, searchQuery])

  const totalResults = useMemo(() => {
    return filteredFaqs.reduce((acc, cat) => acc + cat.items.length, 0)
  }, [filteredFaqs])

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <span className="text-[10px] font-bold text-[#C2A265] uppercase tracking-[0.2em] block mb-2">
          Knowledge Base &amp; Apothecary Guidance
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-[#FAF7EE] mb-2 sm:mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-[#C4BDA8] text-xs sm:text-sm max-w-xl mx-auto">
          Direct, honest answers regarding our classical formulations, discrete courier logistics, COD, and dosages.
        </p>
      </div>

      {/* Interactive Search Bar */}
      <div className="mb-6 max-w-lg mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-[#C2A265] pointer-events-none" />
          <input
            type="search"
            id="faq-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., Shilajit, COD, Delay Spray, dosage)..."
            className="w-full pl-12 pr-10 py-3.5 bg-[#0D1E13] border border-[#C2A265]/30 focus:border-[#C2A265] rounded-2xl text-sm text-[#FAF7EE] placeholder-[#8A8478] focus:outline-none focus:ring-1 focus:ring-[#C2A265] transition-all shadow-inner"
            aria-label="Search frequently asked questions"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 rounded-full text-[#8A8478] hover:text-[#FAF7EE] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {searchQuery.trim() && (
          <p className="text-xs text-[#A8A295] mt-2 px-1 text-center">
            Found <span className="text-[#D4B678] font-semibold">{totalResults}</span> matching {totalResults === 1 ? 'question' : 'questions'}
          </p>
        )}
      </div>

      {/* FAQ Categories Accordion */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-4 sm:space-y-5">
          {filteredFaqs.map((category) => (
            <section key={category.category} className="bg-[#09180E] border border-[#C2A265]/20 rounded-2xl p-4 sm:p-5 shadow-xl">
              <h2 className="font-heading text-base sm:text-lg font-normal text-[#FAF7EE] mb-3 flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#142E1E] border border-[#C2A265]/30 flex items-center justify-center text-[#C2A265]">
                  <ChevronDown className="w-3.5 h-3.5" />
                </span>
                <span>{category.category}</span>
                <span className="text-[11px] text-[#8A8478] font-sans font-normal ml-auto">
                  {category.items.length} {category.items.length === 1 ? 'topic' : 'topics'}
                </span>
              </h2>
              <Accordion
                items={category.items.map((item) => ({
                  title: item.question,
                  content: <p className="text-[#C4BDA8] leading-relaxed text-xs sm:text-sm">{item.answer}</p>,
                  defaultOpen: Boolean(searchQuery.trim()),
                }))}
                allowMultiple
              />
            </section>
          ))}
        </div>
      ) : (
        <div className="py-10 px-4 text-center rounded-2xl bg-[#09180E] border border-[#C2A265]/20 space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#12241A] border border-[#C2A265]/30 flex items-center justify-center mx-auto text-[#C2A265]">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-base font-medium text-[#FAF7EE]">
            No answers found for &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="text-xs text-[#A8A295] max-w-sm mx-auto">
            Have a specific clinical or order query? Our BAMS Ayurvedic Vaidya is available directly on WhatsApp for guidance.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 rounded-xl bg-[#142A1D] hover:bg-[#183222] border border-[#C2A265]/40 text-[#D4B678] text-xs font-semibold transition-all inline-block mt-2"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Concierge Help Callout */}
      <div className="mt-8 sm:mt-10 text-center p-4 sm:p-5 rounded-2xl bg-[#08150D] border border-[#C2A265]/20">
        <p className="text-xs sm:text-sm text-[#FAF7EE] font-medium mb-1">Still have questions or need personal wellness advice?</p>
        <p className="text-[11px] sm:text-xs text-[#A8A295] mb-3">Our Ayurvedic team responds promptly to all enquiries with 100% discretion.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/contact"
            className="px-5 py-2.5 rounded-full bg-[#142A1D] hover:bg-[#183525] border border-[#C2A265]/35 text-[#FAF7EE] text-xs font-semibold transition-all"
          >
            Contact Desk
          </a>
          <a
            href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20have%20a%20question%20regarding%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#C2A265] hover:bg-[#D4B678] text-[#0B150F] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
