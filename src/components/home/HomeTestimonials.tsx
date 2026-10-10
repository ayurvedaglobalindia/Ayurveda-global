"use client";

import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";
import { motion } from "framer-motion";

export function HomeTestimonials() {
  const reviews = [
    {
      name: "Vikram S.",
      location: "Bengaluru, Karnataka",
      product: "BODY Essential Nutrition (120 Caps)",
      rating: 5,
      date: "Verified Buyer",
      comment:
        "Been taking this for 6 weeks now. Unlike caffeine or synthetic gym boosters, there is no sudden energy crash or heart palpitations. Natural stamina has improved noticeably through 12-hour workdays. Highly recommend!",
    },
    {
      name: "Amit K.",
      location: "New Delhi",
      product: "STAYMAX+ Delay Spray",
      rating: 5,
      date: "Verified Buyer",
      comment:
        "Completely discreet packaging, zero markings on the box which I deeply appreciated. The spray works within 10-15 minutes without making everything totally numb. Restored immense confidence.",
    },
    {
      name: "Pooja & Rohan M.",
      location: "Pune, Maharashtra",
      product: "HAIR RE-GROW Complete Kit",
      rating: 5,
      date: "Verified Buyer",
      comment:
        "The combination of the pure herbal oil and Ayurvedic capsules stopped my severe post-monsoon hair shedding in less than a month. Scalp feels cool and healthy with noticeable baby hair growth.",
    },
  ];

  return (
    <section className="py-5 sm:py-10 lg:py-14 bg-white border-b border-[#9E8047]/20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
            <span className="w-4 sm:w-5 h-px bg-[#9E8047]" />
            <span className="text-[10px] sm:text-[10.5px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8C703D]">
              Verified Patron Experiences
            </span>
            <span className="w-4 sm:w-5 h-px bg-[#9E8047]" />
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl text-[#1C1D1F] tracking-tight mb-2 sm:mb-3">
            Real Stories of <span className="italic font-normal text-[#8C703D]">Restored Vitality</span>
          </h2>
          <p className="text-[11.5px] sm:text-sm text-[#737373]">
            Unfiltered testimonials from verified individuals across India who integrated our classical formulations into their daily regimen.
          </p>
        </div>

        {/* Reviews: Horizontal Swipeable Cards on Mobile, 3-Col Grid on Desktop */}
        <div
          className="whitespace-nowrap overflow-x-auto no-scrollbar md:grid md:grid-cols-3 gap-3.5 sm:gap-8 -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 sm:pb-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="inline-block md:flex align-top whitespace-normal w-[84vw] sm:w-auto shrink-0 bg-[#FAF7F2] rounded-2xl border border-[#9E8047]/20 p-4 sm:p-6 flex-col justify-between shadow-2xs hover:shadow-md transition-shadow mr-3.5 sm:mr-0 last:mr-0"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3 sm:mb-4 text-[#B38E46]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#B38E46]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-4 sm:mb-6 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-gray-200/60">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#1C1D1F]">
                    {rev.name}
                  </h4>
                  <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-[#2D4A3E]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {rev.date}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-[#737373] mt-1">
                  <span>{rev.location}</span>
                  <span className="font-medium text-[#9E8047]">{rev.product}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
