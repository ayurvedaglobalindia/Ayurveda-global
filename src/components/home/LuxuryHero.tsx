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
  Leaf,
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
    badge: "CLINICAL BEST SELLER",
    titlePrefix: "Himalayan Shilajit & ",
    titleEmphasis: "Standardized Ashwagandha",
    titleSuffix: "",
    subtitle:
      "Inside-out Rasayana formulation engineered for peak muscle stamina, cellular energy (Ojas), and tissue vitality.",
    specs: "NABL Lab Certified • 100% Shuddha • AYUSH Approved",
    productImage: "/images/products/body-essential-nutrition-card.jpg",
    bgImage: "/images/campaigns/ayurveda-botanical-banner.webp",
    primaryCtaText: "SHOP BEST SELLER",
    primaryCtaLink: "/product/body-essential-nutrition",
    secondaryCtaText: "CONSULT VAIDYA",
    secondaryCtaType: "whatsapp",
  },
  {
    id: 2,
    badge: "TARGETED ENDURANCE",
    titlePrefix: "STAYMAX+ Delay Spray & ",
    titleEmphasis: "Vajikara Potency",
    titleSuffix: "",
    subtitle:
      "Topical herbal delay formulation with Aloe Vera, Vitamin E, and classical cooling botanicals. Zero synthetic numbing.",
    specs: "100% Herbal Actives • Discreet Delivery • Instant Effect",
    productImage: "/images/products/staymax-delay-spray-card.jpg",
    bgImage: "/images/products/vitality-power-combo-card.jpg",
    primaryCtaText: "DISCOVER STAYMAX+",
    primaryCtaLink: "/product/staymax-delay-spray",
    secondaryCtaText: "ORDER COD ON WHATSAPP",
    secondaryCtaType: "whatsapp",
  },
  {
    id: 3,
    badge: "FREE TELE-CONSULTATION",
    titlePrefix: "Certified BAMS Doctors, ",
    titleEmphasis: "Zero Consultation Fee",
    titleSuffix: "",
    subtitle:
      "Personalized dosha evaluation, root-cause diagnosis, and custom herbal regimen guidance on WhatsApp.",
    specs: "1-on-1 Confidential • Verified Doctors • Free Follow-Up",
    productImage: "/images/editorial/doctor-consultation.webp",
    bgImage: "/images/editorial/doctor-consultation.webp",
    primaryCtaText: "CONSULT ON WHATSAPP",
    primaryCtaLink: "/consultation",
    secondaryCtaText: "BOOK APPOINTMENT",
    secondaryCtaType: "link",
    secondaryCtaLink: "/consultation",
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
    }, 4000); // 4s smooth autoplay as specified (Ayuvya & Krishna style)
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
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      } else {
        setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
      }
    }
    touchStartX.current = null;
  };

  const active = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative w-full bg-[#FDFBF7] border-b border-[#0E3924]/10 pt-2 pb-2.5 sm:pt-4 sm:pb-4 overflow-hidden flex flex-col justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Subtle Linen Grain Accent */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/textures/linen-texture.webp')",
          backgroundSize: "400px 400px",
        }}
      />

      <div className="container mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full max-w-full box-border">
        {/* High-Impact Split-Card 3D Banner Carousel: 16:9 responsive on mobile */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[340px] sm:min-h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 bg-[#071A12]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Atmospheric Background Image Layer */}
              <Image
                src={active.bgImage}
                alt={active.badge}
                fill
                priority
                className="object-cover opacity-40 mix-blend-luminosity filter blur-[0.5px] scale-105"
                sizes="(max-width: 768px) 100vw, 1200px"
              />

              {/* Linear Gradient Scrim ensuring text NEVER clashes with images */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,26,18,0.05) 15%, rgba(7,26,18,0.7) 50%, rgba(7,26,18,0.96) 92%)",
                }}
              />

              {/* 55% / 45% Split Layout Stage (Ayuvya & Krishna Style) */}
              <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-between p-4 sm:p-8 md:p-10 lg:p-12 gap-3 sm:gap-4">
                {/* Left Side (55%): Typography & Action Elements */}
                <div className="w-full md:w-[55%] flex flex-col justify-end md:justify-center space-y-2 sm:space-y-3 pt-1 md:pt-0">
                  {/* Gold Badge: CLINICAL BEST SELLER */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071A12]/85 backdrop-blur-xl border border-[#D4AF37]/50 text-[#D4AF37] text-[9px] sm:text-[10.5px] font-sans font-bold tracking-[0.16em] uppercase shadow-[0_4px_16px_rgba(212,175,55,0.25)]">
                      <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
                      {active.badge}
                    </span>
                  </div>

                  {/* Headline with 24K Shimmering Gold Emphasis */}
                  <h2 className="font-editorial text-xl sm:text-3xl lg:text-4xl text-white font-normal leading-[1.15] tracking-tight drop-shadow-sm">
                    {active.titlePrefix}
                    <span className="italic text-gold-shimmer font-medium">
                      {active.titleEmphasis}
                    </span>
                    {active.titleSuffix}
                  </h2>

                  {/* Punchy Subheadline */}
                  <p className="text-[11.5px] sm:text-xs lg:text-sm text-[#FDFBF7]/85 line-clamp-2 max-w-lg font-sans leading-relaxed tracking-tight">
                    {active.subtitle}
                  </p>

                  {/* Clinical Specs Row */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FDFBF7]/90 text-[9px] sm:text-[10.5px] font-sans">
                      <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                      <span>{active.specs}</span>
                    </div>
                  </div>

                  {/* Dual In-Banner CTA Buttons */}
                  <div className="pt-1.5 sm:pt-2 flex items-center gap-2.5 flex-wrap">
                    <Link
                      href={active.primaryCtaLink}
                      className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] active:scale-95 text-[#071A12] text-[10.5px] sm:text-xs font-sans font-bold tracking-[0.1em] uppercase transition-all duration-200 shadow-[0_8px_20px_rgba(212,175,55,0.35)]"
                    >
                      <span>{active.primaryCtaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {active.secondaryCtaType === "whatsapp" ? (
                      <button
                        type="button"
                        onClick={handleWhatsAppConsultation}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-xl border border-white/30 text-white text-[10.5px] sm:text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-200 shadow-md"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>{active.secondaryCtaText}</span>
                      </button>
                    ) : (
                      <Link
                        href={active.secondaryCtaLink || "/consultation"}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-xl border border-white/30 text-white text-[10.5px] sm:text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-200 shadow-md"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{active.secondaryCtaText}</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right Side (45%): 3D Isolated Product Bottle Render with Ambient Backlight Glow */}
                <div className="hidden md:flex md:w-[45%] h-full items-center justify-center relative">
                  {/* Ambient Soft Gold Backlight */}
                  <div
                    className="absolute w-56 h-56 rounded-full opacity-40 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(16,185,129,0.15) 45%, transparent 70%)",
                      filter: "blur(20px)",
                    }}
                  />

                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-52 h-64 lg:w-60 lg:h-76 rounded-2xl p-2.5 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.55)] flex items-center justify-center group"
                  >
                    <Image
                      src={active.productImage}
                      alt={active.titleEmphasis}
                      fill
                      className="object-contain p-3 drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500"
                      sizes="300px"
                    />

                    {/* Floating Botanical Particle Leaf Badge */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#071A12]/95 border border-[#D4AF37]/50 text-[#D4AF37] text-[9px] font-sans font-bold whitespace-nowrap shadow-lg flex items-center gap-1">
                      <Leaf className="w-2.5 h-2.5 text-[#10B981]" />
                      <span>100% SHUDDHA HERBS</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators: Animated expanding pill dots */}
          <div className="absolute bottom-3 right-4 z-30 flex items-center gap-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  currentSlide === idx
                    ? "w-8 bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Desktop Arrow Controls */}
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? HERO_SLIDES.length - 1 : prev - 1
              )
            }
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#071A12]/70 hover:bg-[#071A12] text-white items-center justify-center backdrop-blur-md border border-white/20 transition-all z-30 shadow-lg active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
            }
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#071A12]/70 hover:bg-[#071A12] text-white items-center justify-center backdrop-blur-md border border-white/20 transition-all z-30 shadow-lg active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>

        {/* Dual action CTAs: full width, vertically stacked on small mobile with zero horizontal overflow */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full gap-2 sm:gap-3 px-0 mt-2.5 box-border">
          <Link
            href="/shop"
            className="w-full sm:w-auto sm:min-w-[210px] px-5 py-2.5 sm:py-3 bg-[#0E3924] hover:bg-[#071A12] active:scale-98 text-white font-sans font-semibold text-xs uppercase tracking-[0.12em] transition-all rounded-xl shadow-md text-center inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>SHOP BEST SELLERS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </Link>
          <button
            type="button"
            onClick={handleWhatsAppConsultation}
            className="w-full sm:w-auto sm:min-w-[210px] px-5 py-2.5 sm:py-3 bg-white hover:bg-[#FDFBF7] active:scale-98 border border-[#D4AF37]/50 text-[#0E3924] font-sans font-semibold text-xs uppercase tracking-[0.12em] transition-all rounded-xl shadow-xs text-center inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>CONSULT CHIEF VAIDYA</span>
          </button>
        </div>
      </div>
    </section>
  );
}
