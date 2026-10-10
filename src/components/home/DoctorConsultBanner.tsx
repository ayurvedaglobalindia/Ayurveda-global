"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, HeartPulse, CheckCircle2, Shield, ArrowRight, Award } from "lucide-react";
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from "@/store/whatsappStore";

export function DoctorConsultBanner() {
  const handleDirectWhatsApp = () => {
    const msg = buildVaidyaConsultationMessage();
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  return (
    <section className="py-8 sm:py-14 lg:py-20 bg-[#FAF7F2] border-b border-[#9E8047]/20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-[#1F3D2B] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#9E8047]/30 text-white shadow-xl grid lg:grid-cols-12 items-stretch">
          {/* Left Column: Editorial Consultation Copy */}
          <div className="lg:col-span-7 p-4 sm:p-8 lg:p-12 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FAF7F2] text-xs font-sans font-medium tracking-[0.16em] backdrop-blur-xs">
                <img src="/images/vaidya-icon.svg" alt="Vaidya Icon" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />
                <span className="uppercase text-[9.5px] sm:text-[11px] font-semibold text-[#D4AF37]">Private Vaidya Concierge</span>
              </div>

              <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#FAF7F2] leading-tight">
                Tailored Dosha Evaluation &amp; <span className="italic font-normal text-[#D4AF37]">Physician Guidance</span>
              </h2>

              <p className="text-[11.5px] sm:text-sm text-[#FAF7F2]/85 font-light leading-relaxed max-w-xl">
                Consult directly with accredited BAMS Ayurvedic doctors on WhatsApp. Receive personalized advice on dosha balancing, herb synergy, and lifestyle regimens at zero consultation fee.
              </p>

              {/* Visually Distinct Trust Cards: Clean 2x2 Grid on Mobile & Desktop */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] sm:text-xs font-mono text-[#FAF7F2]">
                <div className="flex items-center gap-1.5 sm:gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="leading-tight">100% Confidential Chat</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="leading-tight">Zero Consultation Fee</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="leading-tight">BAMS Certified Vaidyas</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="leading-tight">Free Follow-up Advice</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="px-5 py-3 sm:py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat with Doctor on WhatsApp</span>
              </button>

              <Link
                href="/consultation"
                className="px-5 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-[#FAF7F2] text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-colors text-center"
              >
                <span>Book Detailed Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Authentic Editorial Photo */}
          <div className="lg:col-span-5 relative min-h-[160px] sm:min-h-[280px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-white/10">
            <Image
              src="/images/editorial/doctor-consultation.webp"
              alt="Authentic Ayurvedic doctor and clinic consultation setting"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F3D2B]/80 via-transparent to-transparent pointer-events-none lg:bg-gradient-to-l lg:from-transparent lg:to-[#1F3D2B]/30" />

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-xl bg-[#1C1D1F]/80 backdrop-blur-xs border border-white/15 text-white">
              <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                Nadi Pariksha &amp; Dosha Balancing
              </span>
              <p className="text-[10.5px] sm:text-[11px] text-[#FAF7F2]/90 mt-0.5 leading-snug">
                Experienced Ayurvedic practitioners adhering to classical Charaka &amp; Sushruta principles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
