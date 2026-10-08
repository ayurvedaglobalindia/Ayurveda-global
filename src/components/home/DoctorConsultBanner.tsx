"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, HeartPulse, CheckCircle2, Shield, ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/store/whatsappStore";

export function DoctorConsultBanner() {
  const handleDirectWhatsApp = () => {
    const msg = `🌿 *AYURVEDA GLOBAL — FREE DOCTOR CONSULTATION*
Hello Doctor, I would like to consult with a certified Ayurvedic Vaidya regarding personalized formulation recommendations.`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-gradient-to-br from-[#2D4A3E] via-[#233B31] to-[#172620] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9E8047]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#2D4A3E]/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E8047]/30 border border-[#9E8047]/40 text-[#E8ECE9] text-xs font-mono uppercase tracking-wider mb-4">
              <HeartPulse className="w-3.5 h-3.5 text-[#D4AF37]" />
              Free Vaidya Guidance
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
              Unsure Which Formulation Is Right For You?
            </h2>

            <p className="text-sm sm:text-base text-[#E8ECE9]/90 font-light leading-relaxed mb-8 max-w-2xl">
              Connect with our certified BAMS Ayurvedic physicians on WhatsApp. Get answers to dosage questions, discuss private health concerns, and receive tailored lifestyle advice at zero cost.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 text-xs font-mono text-[#E8ECE9]/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9E8047]" />
                100% Confidential WhatsApp Chat
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#9E8047]" />
                Zero Consultation Charges
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9E8047]" />
                BAMS Certified Ayurvedic Doctors
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Chat with Doctor on WhatsApp</span>
              </button>

              <Link
                href="/consultation"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-colors text-center"
              >
                <span>Book Detailed Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
