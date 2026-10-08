"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are Ayur Veda Global formulations 100% herbal and free of chemicals?",
      a: "Yes. All our products are crafted strictly using classical Ayurvedic pharmacopeial guidelines and standardized herbal extracts. We never use synthetic steroids, heavy metals, parabens, or harmful fillers. All batches are tested in certified laboratories for microbiological purity and heavy metal compliance.",
    },
    {
      q: "How discreet is the packaging and delivery?",
      a: "We guarantee 100% discretion. All orders are packed inside completely plain, unmarked, tamper-evident corrugated boxes with no product names, logos, or sensitive descriptions printed on the outer label. The courier partner only sees standard shipping logistics information.",
    },
    {
      q: "How long does it take to experience visible results?",
      a: "Because authentic Ayurveda addresses root imbalances rather than offering artificial temporary suppression, herbal supplements typically demonstrate steady, progressive results within 3 to 6 weeks of disciplined daily use. Topical personal care products like STAYMAX+ work within 10 to 15 minutes of application.",
    },
    {
      q: "Can I pay using Cash on Delivery (COD) or WhatsApp?",
      a: "Yes! We support Cash on Delivery (COD) across 28,000+ Indian pincodes. In addition, you can choose WhatsApp Direct Checkout to place your order with a single click and receive real-time order confirmation from our customer desk.",
    },
    {
      q: "How do I track my delivery status?",
      a: "Upon dispatch, you will receive a tracking link via SMS and WhatsApp. You can also visit our Track Order page at any time and enter your Order ID or registered mobile number to see real-time 4-stage tracking.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-[#9E8047] block mb-2">
            Clear Answers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1D1F] tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#737373]">
            Common queries about our herbal remedies, quality checks, and discrete doorstep logistics.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#9E8047]/20 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                >
                  <span className="font-serif text-base sm:text-lg text-[#1C1D1F]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#9E8047] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-[#555555] leading-relaxed border-t border-gray-100 mt-2 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D4A3E] hover:underline"
          >
            <span>View Full Knowledge Base &amp; FAQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
