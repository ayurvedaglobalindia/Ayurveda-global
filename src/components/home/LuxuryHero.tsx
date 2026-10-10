"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, MessageCircle, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from "@/store/whatsappStore";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/images/campaigns/ayurveda-botanical-banner.webp",
    badge: "100% PURE BOTANICAL HARVEST",
    title: "Ancient Botanical Wisdom",
    subtitle: "Standardized Rasayana extracts: Pure Ashwagandha, Himalayan Shilajit & classical botanicals.",
    ctaText: "SHOP BEST SELLERS",
    ctaLink: "/shop",
  },
  {
    id: 2,
    image: "/images/editorial/doctor-consultation.webp",
    badge: "FREE VAIDYA TELE-CONSULTATION",
    title: "Certified BAMS Doctors",
    subtitle: "Confidential dosha evaluation & WhatsApp physician guidance at zero consultation fee.",
    ctaText: "CONSULT A DOCTOR",
    ctaLink: "/consultation",
  },
  {
    id: 3,
    image: "/images/products/body-essential-nutrition-card.jpg",
    badge: "CLINICAL BEST SELLER",
    title: "BODY Essential Nutrition",
    subtitle: "60 Veg Capsules engineered for peak muscle stamina, cellular Ojas & lasting vitality.",
    ctaText: "EXPLORE FORMULATION",
    ctaLink: "/product/body-essential-nutrition",
  },
];

export function LuxuryHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppConsultation = () => {
    const msg = buildVaidyaConsultationMessage();
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  const active = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full bg-[#FAF7F2] border-b border-[#9E8047]/20 pt-3 pb-3 sm:pt-6 sm:pb-6 overflow-hidden flex flex-col justify-center">
      {/* Background Subtle Linen Grain Accent */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/textures/linen-texture.webp')",
          backgroundSize: "400px 400px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full max-w-full box-border">
        {/* Banner Card: Aspect 16:9 on Mobile, 21:9 on Desktop, rounded-3xl, shadow-xl */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border border-[#9E8047]/30 bg-[#0B150F]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={active.image}
                alt={active.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />

              {/* Progressive Glass Gradient Overlay to eliminate text/image clashing */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 md:p-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 15%, rgba(10,25,18,0.55) 50%, rgba(10,25,18,0.92) 90%)",
                }}
              >
                <div className="max-w-xl space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#192D21]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[8.5px] sm:text-[10.5px] font-sans font-bold tracking-wider uppercase shadow-xs">
                      <Sparkles className="w-2.5 h-2.5" />
                      {active.badge}
                    </span>
                  </div>
                  <h2 className="font-heading text-lg sm:text-3xl lg:text-4xl text-white font-normal leading-tight drop-shadow-sm">
                    {active.title}
                  </h2>
                  <p className="text-[11px] sm:text-sm text-[#FAF7F2]/90 line-clamp-2 max-w-md font-sans leading-relaxed drop-shadow-xs">
                    {active.subtitle}
                  </p>

                  {/* Graceful in-banner pill CTA */}
                  <div className="pt-1.5 sm:pt-2">
                    <Link
                      href={active.ctaLink}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#D4AF37] hover:bg-[#C29D2C] text-[#122218] text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                    >
                      <span>{active.ctaText}</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Animated Pill Pagination Indicators */}
          <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  currentSlide === idx
                    ? "w-6 bg-[#D4AF37]"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrow Controls on desktop screens */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white items-center justify-center backdrop-blur-xs transition-colors z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white items-center justify-center backdrop-blur-xs transition-colors z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Dual CTA Buttons with sleek iconography */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full gap-2.5 sm:gap-3 px-4 mt-3 box-border">
          <Link
            href="/shop"
            className="w-full sm:w-auto sm:min-w-[200px] px-5 py-2.5 sm:py-3 bg-[#192D21] hover:bg-[#122218] text-white font-sans font-semibold text-xs uppercase tracking-[0.12em] transition-all rounded-xl shadow-sm hover:shadow-md text-center inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>SHOP BEST SELLERS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleWhatsAppConsultation}
            className="w-full sm:w-auto sm:min-w-[200px] px-5 py-2.5 sm:py-3 bg-white hover:bg-[#FAF7F2] border border-[#9E8047]/40 text-[#192D21] font-sans font-semibold text-xs uppercase tracking-[0.12em] transition-all rounded-xl shadow-2xs text-center inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>CONSULT DOCTOR</span>
          </button>
        </div>
      </div>
    </section>
  );
}
