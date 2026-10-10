"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

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
    <section className="py-5 sm:py-10 lg:py-14 bg-[#FAF7F2] overflow-hidden border-b border-[#9E8047]/20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-6 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
            <span className="w-4 sm:w-5 h-px bg-[#9E8047]" />
            <span className="text-[10px] sm:text-[10.5px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8C703D]">
              Clinical Purity &amp; Logistics
            </span>
            <span className="w-4 sm:w-5 h-px bg-[#9E8047]" />
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl text-[#1C1D1F] tracking-tight mb-2 sm:mb-3">
            Frequently Asked <span className="italic font-normal text-[#8C703D]">Questions</span>
          </h2>
          <p className="text-[11.5px] sm:text-sm text-[#737373]">
            Essential answers regarding our botanical sourcing, lab verification, discrete packaging, and doorstep logistics.
          </p>
        </div>

        <div className="space-y-2.5 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-[#9E8047]/20 overflow-hidden shadow-2xs transition-all hover:border-[#1F3D2B]/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-3.5 sm:p-5 lg:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-hidden"
                >
                  <span className="font-serif text-sm sm:text-base lg:text-lg text-[#1C1D1F] leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#9E8047] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-[#1F3D2B]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-3.5 sm:px-5 lg:px-6 pb-4 sm:pb-5 text-[11.5px] sm:text-sm text-[#555555] leading-relaxed border-t border-[#9E8047]/10 pt-3 sm:pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-8 text-center">
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
