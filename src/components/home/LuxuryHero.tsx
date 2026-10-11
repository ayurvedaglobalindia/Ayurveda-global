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

              {/* 55% / 45% Split Layout Stage (Editorial Luxury Ayurveda) */}
              <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-between p-5 sm:p-8 md:p-10 lg:p-12 gap-3 sm:gap-6">
                {/* Left Side: Typography & Action Elements */}
                <div className="w-full md:w-[60%] flex flex-col justify-end md:justify-center space-y-2.5 sm:space-y-3.5 pt-1 md:pt-0">
                  {/* Classical Gold Badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071A12]/90 border border-[#D4AF37]/50 text-[#D4AF37] text-[9.5px] sm:text-[10.5px] font-sans font-semibold tracking-[0.16em] uppercase shadow-xs">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      {active.badge}
                    </span>
                  </div>

                  {/* Headline with Authoritative Editorial Serif */}
                  <h1 className="font-editorial text-2xl sm:text-3xl lg:text-[40px] text-[#FDFBF7] font-normal leading-[1.18] tracking-tight drop-shadow-sm">
                    {active.titlePrefix}
                    <span className="italic text-[#D4AF37] font-normal">
                      {active.titleEmphasis}
                    </span>
                    {active.titleSuffix}
                  </h1>

                  {/* Clean, Non-Clipped Subheadline */}
                  <p className="text-[12px] sm:text-[13px] lg:text-sm text-[#FDFBF7]/90 max-w-lg font-sans leading-relaxed tracking-normal">
                    {active.subtitle}
                  </p>

                  {/* Clinical Accreditation Pill */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FDFBF7]/95 text-[9.5px] sm:text-[11px] font-sans">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>{active.specs}</span>
                    </div>
                  </div>

                  {/* In-Banner Dual CTAs */}
                  <div className="pt-2 sm:pt-3 flex items-center gap-3 flex-wrap">
                    <Link
                      href={active.primaryCtaLink}
                      className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] active:scale-95 text-[#071A12] text-xs font-sans font-bold tracking-wider uppercase transition-all shadow-md"
                    >
                      <span>{active.primaryCtaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {active.secondaryCtaType === "whatsapp" ? (
                      <button
                        type="button"
                        onClick={handleWhatsAppConsultation}
                        className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/30 text-white text-xs font-sans font-semibold tracking-wider uppercase transition-all shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>{active.secondaryCtaText}</span>
                      </button>
                    ) : (
                      <Link
                        href={active.secondaryCtaLink || "/consultation"}
                        className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/30 text-white text-xs font-sans font-semibold tracking-wider uppercase transition-all shadow-xs"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{active.secondaryCtaText}</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right Side: Authentic Studio Product Shot */}
                <div className="hidden md:flex md:w-[40%] h-full items-center justify-center relative">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-56 h-72 lg:w-64 lg:h-80 rounded-2xl p-3 bg-white/10 border border-white/20 shadow-2xl flex items-center justify-center group"
                  >
                    <Image
                      src={active.productImage}
                      alt={active.titleEmphasis}
                      fill
                      className="object-contain p-3 drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                      sizes="320px"
                    />

                    {/* Floating Botanical Leaf Pill */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#071A12] border border-[#D4AF37]/50 text-[#D4AF37] text-[9.5px] font-sans font-semibold whitespace-nowrap shadow-md flex items-center gap-1.5">
                      <Leaf className="w-3 h-3 text-[#10B981]" />
                      <span>100% SHUDDHA HERBS</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators: Clean expanding pill indicators */}
          <div className="absolute bottom-3 right-4 z-30 flex items-center gap-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  currentSlide === idx
                    ? "w-7 bg-[#D4AF37] shadow-xs"
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
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#071A12]/70 hover:bg-[#071A12] text-white items-center justify-center border border-white/20 transition-all z-30 shadow-md active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
            }
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#071A12]/70 hover:bg-[#071A12] text-white items-center justify-center border border-white/20 transition-all z-30 shadow-md active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </section>
  );
}
