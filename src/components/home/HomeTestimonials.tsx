import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";

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
    <section className="py-16 sm:py-20 bg-white border-b border-[#9E8047]/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-[#9E8047] block mb-2">
            Real Customer Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1D1F] tracking-tight mb-3">
            Trusted by Thousands Across India
          </h2>
          <p className="text-sm text-[#737373]">
            Read unfiltered feedback from verified patrons who rely on Ayur Veda Global for daily revitalization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F2] rounded-2xl border border-[#9E8047]/20 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#D4AF37]">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm font-semibold text-[#1C1D1F]">
                    {rev.name}
                  </h4>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-[#2D4A3E]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {rev.date}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#737373] mt-1">
                  <span>{rev.location}</span>
                  <span className="font-medium text-[#9E8047]">{rev.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
