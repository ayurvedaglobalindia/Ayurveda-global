"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  buildWhatsAppUrl,
  buildVaidyaConsultationMessage,
} from "@/store/whatsappStore";

interface HeroSlide {
  id: number;
  badge: string;
  titlePrefix: string;
  titleEmphasis: string;
  titleSuffix: string;
  subtitle: string;
  specs: string;
  productImage: string;
  bgImage: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaType: "whatsapp" | "link";
  secondaryCtaLink?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: "CLINICAL GOLD STANDARD",
    titlePrefix: "Ancient Botanical Wisdom, ",
    titleEmphasis: "Refined For Ojas",
    titleSuffix: "",
    subtitle:
      "Standardized Rasayana bio-actives: Himalayan Shilajit, KSM Ashwagandha & classical forest botanicals.",
    specs: "100% Ayurvedic • NABL Lab Verified • BAMS Formulated",
    productImage: "/images/products/body-essential-nutrition-card.jpg",
    bgImage: "/images/campaigns/ayurveda-botanical-banner.webp",
    primaryCtaText: "EXPLORE COLLECTION",
    primaryCtaLink: "/shop",
    secondaryCtaText: "TALK TO VAIDYA",
    secondaryCtaType: "whatsapp",
  },
  {
    id: 2,
    badge: "CHIEF VAIDYA CONCIERGE",
    titlePrefix: "Certified BAMS Doctors, ",
    titleEmphasis: "Zero Consultation Fee",
    titleSuffix: "",
    subtitle:
      "Confidential Dosha Nadi evaluation & tailored formulation regimen with senior Ayurvedic physicians.",
    specs: "Instant WhatsApp Access • 100% Free • Certified Doctors",
    productImage: "/images/editorial/doctor-consultation.webp",
    bgImage: "/images/editorial/doctor-consultation.webp",
    primaryCtaText: "CONSULT ON WHATSAPP",
    primaryCtaLink: "/consultation",
    secondaryCtaText: "BOOK EVALUATION",
    secondaryCtaType: "link",
    secondaryCtaLink: "/consultation",
  },
  {
    id: 3,
    badge: "ROYAL VAJIKARA & BALA",
    titlePrefix: "Peak Cellular Stamina, ",
    titleEmphasis: "Vajikara Potency",
    titleSuffix: "",
    subtitle:
      "Clinically engineered for lasting vitality, endurance, and cellular rejuvenation without chemicals.",
    specs: "100% Herbal Actives • Discreet Packaging • Express Dispatch",
    productImage: "/images/products/staymax-delay-spray-card.jpg",
    bgImage: "/images/products/vitality-power-combo-card.jpg",
    primaryCtaText: "SHOP FORMULATIONS",
    primaryCtaLink: "/shop",
    secondaryCtaText: "ORDER VIA COD",
    secondaryCtaType: "whatsapp",
  },
];

export function LuxuryHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500); // 4.5s autoplay as specified
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleWhatsAppConsultation = () => {
    const msg = buildVaidyaConsultationMessage();
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next slide
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      } else {
        // Swiped right -> prev slide
        setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
      }
    }
    touchStartX.current = null;
  };

  const active = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full bg-[#FAF7F2] border-b border-[#D4AF37]/25 pt-3 pb-3 sm:pt-6 sm:pb-6 overflow-hidden flex flex-col justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Subtle Linen Grain Accent */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/textures/linen-texture.webp')",
          backgroundSize: "400px 400px",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full max-w-full box-border">
        {/* Cinematic 3D Parallax Banner Canvas */}
        <div className="relative w-full min-h-[360px] sm:min-h-[420px] md:min-h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 bg-[#081C15]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Cinematic Background Image Layer */}
              <Image
                src={active.bgImage}
                alt={active.badge}
                fill
                priority
                className="object-cover opacity-45 mix-blend-luminosity filter blur-[1px] scale-105"
                sizes="(max-width: 768px) 100vw, 1200px"
              />

              {/* Progressive Scrim Gradient: bottom-to-top progressive darkening ensuring zero text clashing */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,28,21,0.95) 0%, rgba(8,28,21,0.72) 45%, rgba(8,28,21,0.3) 100%)",
                }}
              />

              {/* 60/40 Split Canvas Content Stage */}
              <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-between p-5 sm:p-8 md:p-10 lg:p-12 gap-4">
                {/* Left 60%: High-fashion Editorial Typography & Shimmering Gold */}
                <div className="w-full md:w-[62%] flex flex-col justify-end md:justify-center space-y-2.5 sm:space-y-3.5 pt-2 md:pt-0">
                  {/* Glassmorphic Badge: CLINICAL GOLD STANDARD */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#081C15]/80 backdrop-blur-xl border border-[#D4AF37]/50 text-[#D4AF37] text-[9px] sm:text-[11px] font-sans font-bold tracking-[0.16em] uppercase shadow-[0_4px_16px_rgba(212,175,55,0.2)]">
                      <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
                      {active.badge}
                    </span>
                  </div>

                  {/* Editorial Heading with 24k Shimmering Gold Gradient Accent */}
                  <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-white font-normal leading-[1.15] tracking-tight drop-shadow-sm">
                    {active.titlePrefix}
                    <span className="italic text-gold-shimmer font-medium">
                      {active.titleEmphasis}
                    </span>
                    {active.titleSuffix}
                  </h2>

                  {/* Subtitle / Botanical Description */}
                  <p className="text-[12px] sm:text-sm text-[#FDFBF7]/85 line-clamp-2 sm:line-clamp-3 max-w-lg font-sans leading-relaxed tracking-tight">
                    {active.subtitle}
                  </p>

                  {/* Key Specs Pill */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FDFBF7]/90 text-[9.5px] sm:text-[11px] font-sans">
                      <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                      <span>{active.specs}</span>
                    </div>
                  </div>

                  {/* Integrated Interactive Dual Glassmorphic CTAs */}
                  <div className="pt-2 sm:pt-3 flex items-center gap-2.5 sm:gap-3 flex-wrap">
                    {/* Primary Button */}
                    <Link
                      href={active.primaryCtaLink}
                      className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] active:scale-95 text-[#081C15] text-[11px] sm:text-xs font-sans font-bold tracking-[0.12em] uppercase transition-all duration-200 shadow-[0_8px_24px_rgba(212,175,55,0.35)]"
                    >
                      <span>{active.primaryCtaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Secondary Glassmorphic Button */}
                    {active.secondaryCtaType === "whatsapp" ? (
                      <button
                        type="button"
                        onClick={handleWhatsAppConsultation}
                        className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-xl border border-white/30 text-white text-[11px] sm:text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-200 shadow-md"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>{active.secondaryCtaText}</span>
                      </button>
                    ) : (
                      <Link
                        href={active.secondaryCtaLink || "/consultation"}
                        className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-xl border border-white/30 text-white text-[11px] sm:text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-200 shadow-md"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{active.secondaryCtaText}</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right 38%: Isolated Ultra-Sharp Product Stage with Floating Motion */}
                <div className="hidden md:flex md:w-[38%] h-full items-center justify-center relative">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-56 h-72 lg:w-64 lg:h-80 rounded-2xl p-3 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center group"
                  >
                    <Image
                      src={active.productImage}
                      alt={active.titleEmphasis}
                      fill
                      className="object-contain p-4 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                      sizes="300px"
                    />

                    {/* Floating Botanical Pill Accent */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#081C15]/90 border border-[#D4AF37]/50 text-[#D4AF37] text-[9.5px] font-sans font-bold whitespace-nowrap shadow-lg flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                      <span>CLINICALLY PROVEN</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Animated Pill Pagination Indicators */}
          <div className="absolute bottom-3 right-4 z-30 flex items-center gap-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  currentSlide === idx
                    ? "w-7 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrow Controls on desktop screens */}
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? HERO_SLIDES.length - 1 : prev - 1
              )
            }
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#081C15]/70 hover:bg-[#081C15] text-white items-center justify-center backdrop-blur-md border border-white/20 transition-all z-30 shadow-lg active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
            }
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#081C15]/70 hover:bg-[#081C15] text-white items-center justify-center backdrop-blur-md border border-white/20 transition-all z-30 shadow-lg active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>

        {/* Dynamic Dual CTA Action Bar on Mobile Viewports */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full gap-2.5 sm:gap-3 px-1 mt-3 box-border">
          <Link
            href="/shop"
            className="w-full sm:w-auto sm:min-w-[210px] px-5 py-2.5 sm:py-3 bg-[#1B4332] hover:bg-[#081C15] active:scale-98 text-white font-sans font-semibold text-xs uppercase tracking-[0.12em] transition-all rounded-xl shadow-md text-center inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>SHOP BEST SELLERS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </Link>
          <button
            type="button"
            onClick={handleWhatsAppConsultation}
            className="w-full sm:w-auto sm:min-w-[210px] px-5 py-2.5 sm:py-3 bg-white hover:bg-[#FAF7F2] active:scale-98 border border-[#D4AF37]/50 text-[#1B4332] font-sans font-semibold text-xs uppercase tracking-[0.12em] transition-all rounded-xl shadow-xs text-center inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>CONSULT CHIEF VAIDYA</span>
          </button>
        </div>
      </div>
    </section>
  );
}
