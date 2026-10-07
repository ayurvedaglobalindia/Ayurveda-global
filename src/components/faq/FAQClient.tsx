"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown, MessageSquare, X } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";

interface FAQCategory {
  category: string;
  items: {
    question: string;
    answer: string;
  }[];
}

interface FAQClientProps {
  faqs: FAQCategory[];
}

export function FAQClient({ faqs }: FAQClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return faqs;

    return faqs
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [faqs, searchQuery]);

  const totalResults = useMemo(() => {
    return filteredFaqs.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredFaqs]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1">
          Apothecary Guidance
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#1C1D1F] mb-2 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#555555] max-w-xl mx-auto font-sans leading-relaxed">
          Transparent answers regarding classical formulations, discreet courier
          logistics, Cash on Delivery, and daily dosages.
        </p>
      </div>

      {/* Interactive Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-4 h-4 text-[#737373] pointer-events-none" />
          <input
            type="search"
            id="faq-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. Shilajit, COD, Dosage)..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#FFFFFF] border border-[#9E8047]/25 focus:border-[#1C1D1F] rounded-full text-xs sm:text-sm text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-colors"
            aria-label="Search frequently asked questions"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 p-1 rounded-full text-[#737373] hover:text-[#1C1D1F] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {searchQuery.trim() && (
          <p className="text-xs font-mono text-[#737373] mt-2 px-1 text-center">
            Found{" "}
            <span className="text-[#1C1D1F] font-medium">{totalResults}</span>{" "}
            matching {totalResults === 1 ? "question" : "questions"}
          </p>
        )}
      </div>

      {/* FAQ Categories Accordion */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-5">
          {filteredFaqs.map((category) => (
            <section
              key={category.category}
              className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-xl p-5 sm:p-6 shadow-xs"
            >
              <h2 className="font-heading text-base sm:text-lg font-medium text-[#1C1D1F] mb-4 flex items-center gap-2.5 pb-3 border-b border-[#9E8047]/25">
                <span className="w-6 h-6 rounded-md bg-[#FAF7F2] border border-[#9E8047]/25 flex items-center justify-center text-[#4E5F52]">
                  <ChevronDown className="w-3.5 h-3.5" />
                </span>
                <span>{category.category}</span>
                <span className="text-[11px] font-mono text-[#737373] font-normal ml-auto">
                  {category.items.length}{" "}
                  {category.items.length === 1 ? "topic" : "topics"}
                </span>
              </h2>
              <Accordion
                items={category.items.map((item) => ({
                  title: item.question,
                  content: (
                    <p className="text-[#555555] leading-relaxed text-xs sm:text-sm font-sans">
                      {item.answer}
                    </p>
                  ),
                  defaultOpen: Boolean(searchQuery.trim()),
                }))}
                allowMultiple
              />
            </section>
          ))}
        </div>
      ) : (
        <div className="py-12 px-4 text-center rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#9E8047]/25 flex items-center justify-center mx-auto text-[#737373]">
            <Search className="w-4 h-4" />
          </div>
          <h3 className="font-heading text-base font-normal text-[#1C1D1F]">
            No answers found for &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="text-xs text-[#555555] max-w-sm mx-auto font-sans">
            Have a specific clinical or order query? Our resident Vaidya panel
            is available directly on WhatsApp for guidance.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="px-4 py-2 rounded-full border border-[#1C1D1F] text-[#1C1D1F] text-xs font-medium uppercase tracking-wider hover:bg-[#FAF7F2] transition-colors inline-block mt-1"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Concierge Help Callout */}
      <div className="mt-10 text-center p-6 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
        <p className="text-xs sm:text-sm text-[#1C1D1F] font-medium mb-1 font-heading">
          Still have questions or need personalized botanical advice?
        </p>
        <p className="text-xs text-[#555555] mb-4 font-sans">
          Our Ayurvedic team responds promptly to all enquiries with 100%
          discretion.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="/contact"
            className="px-5 py-2.5 rounded-full border border-[#1C1D1F] text-[#1C1D1F] text-xs font-medium uppercase tracking-wider hover:bg-[#FAF7F2] transition-colors"
          >
            Contact Desk
          </a>
          <a
            href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20have%20a%20question%20regarding%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
