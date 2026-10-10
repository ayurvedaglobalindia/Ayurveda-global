"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Truck,
  ShoppingBag,
  MessageCircle,
  Calendar,
  Phone,
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import {
  buildWhatsAppUrl,
  buildVaidyaConsultationMessage,
} from "@/store/whatsappStore";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const { getItemCount: getCartCount } = useCartStore();
  const { openCartDrawer, openSearch, isSearchOpen } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = getCartCount();

  const handleDoctorWhatsApp = () => {
    const msg = buildVaidyaConsultationMessage();
    window.open(buildWhatsAppUrl(msg), "_blank");
    setIsConciergeOpen(false);
  };

  return (
    <>
      {/* iOS Floating Island Bottom Navigation Dock (12px elevation) */}
      <nav
        aria-label="Mobile Floating Navigation Dock"
        className="md:hidden fixed bottom-[12px] left-3.5 right-3.5 max-w-md mx-auto z-40 rounded-full backdrop-blur-2xl bg-white/90 dark:bg-stone-950/90 border border-white/40 shadow-[0_12px_40px_rgba(8,28,21,0.18)] px-2.5 transition-all"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 10px)",
        }}
      >
        <div className="flex items-center justify-around h-[56px] relative">
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors py-1 px-2.5 rounded-full ${
              pathname === "/"
                ? "text-[#071A12] font-bold"
                : "text-[#737373] hover:text-[#071A12]"
            }`}
            aria-label="Home"
          >
            <Home className="w-5 h-5" />
            <span className="leading-none">Home</span>
          </Link>

          {/* 2. Search Modal */}
          <button
            type="button"
            onClick={openSearch}
            className={`flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors py-1 px-2.5 rounded-full ${
              isSearchOpen
                ? "text-[#071A12] font-bold"
                : "text-[#737373] hover:text-[#071A12]"
            }`}
            aria-label="Search Formulations"
          >
            <Search className="w-5 h-5" />
            <span className="leading-none">Search</span>
          </button>

          {/* 3. Center Elevated Button: 58px Sphere with Razor-Sharp Rotating Neon Radar Ring */}
          <button
            type="button"
            onClick={() => setIsConciergeOpen(true)}
            className="flex flex-col items-center -translate-y-[20px] text-[#0E3924] group relative z-50 focus:outline-none"
            aria-label="Open Vaidya Consult"
          >
            <div className="relative w-[58px] h-[58px] rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-105 active:scale-95 transition-transform">
              {/* Seamless Rotating Neon Border: 2.5s linear infinite */}
              <span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  border: "2.5px solid transparent",
                  background:
                    "linear-gradient(#fff, #fff) padding-box, conic-gradient(from 0deg, #10B981, #34D399, transparent 60%, #10B981) border-box",
                  boxShadow: "0 0 16px rgba(16, 185, 129, 0.55)",
                  animation: "spin 2.5s linear infinite",
                }}
                aria-hidden="true"
              />

              {/* Minimalist Vaidya Heart & Pulse Icon */}
              <img
                src="/images/vaidya-icon.svg"
                alt="Vaidya Consult"
                className="w-8 h-8 object-contain relative z-10 drop-shadow-2xs"
              />
            </div>

            {/* Solid White Background Label to Prevent Text Bleed-Through */}
            <span className="text-[10px] font-semibold text-[#071A12] mt-[3px] px-1.5 py-0.5 rounded-full bg-white/95 shadow-2xs tracking-tight leading-none whitespace-nowrap">
              Vaidya Consult
            </span>
          </button>

          {/* 4. Cart */}
          <button
            type="button"
            onClick={openCartDrawer}
            className="flex flex-col items-center justify-center gap-0.5 text-[10px] relative text-[#737373] hover:text-[#081C15] transition-colors py-1 px-2.5 rounded-full"
            aria-label="Open Shopping Bag"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {isMounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#1B4332] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
            <span className="leading-none">Bag</span>
          </button>

          {/* 5. Track Order */}
          <Link
            href="/track-order"
            className={`flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors py-1 px-2.5 rounded-full ${
              pathname === "/track-order"
                ? "text-[#081C15] font-bold"
                : "text-[#737373] hover:text-[#081C15]"
            }`}
            aria-label="Track Order Status"
          >
            <Truck className="w-5 h-5" />
            <span className="leading-none">Track</span>
          </Link>
        </div>
      </nav>

      {/* iOS-Style "Vaidya Concierge" Bottom Sheet Modal */}
      <AnimatePresence>
        {isConciergeOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Frosted Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConciergeOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-t-3xl p-5 sm:p-6 shadow-2xl border-t border-[#D4AF37]/30 z-10 space-y-4 max-h-[85vh] overflow-y-auto"
              style={{
                paddingBottom: "max(env(safe-area-inset-bottom), 24px)",
              }}
            >
              {/* Pull Bar */}
              <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto" />

              {/* Header Stage */}
              <div className="flex items-start justify-between pt-1">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>CHIEF VAIDYA ON CALL</span>
                  </div>
                  <h3 className="font-editorial text-2xl text-[#081C15] font-semibold">
                    Vaidya Clinical Concierge
                  </h3>
                  <p className="text-xs text-[#555555]">
                    Direct consultation with certified BAMS Ayurvedic physicians.
                  </p>
                </div>
                <button
                  onClick={() => setIsConciergeOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Consultation Option Cards */}
              <div className="space-y-2.5 pt-2">
                {/* 1. Instant WhatsApp Consult */}
                <button
                  onClick={handleDoctorWhatsApp}
                  className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-[#FAF7F2] to-white border border-[#25D366]/40 hover:border-[#25D366] transition-all text-left shadow-xs hover:shadow-md group active:scale-98"
                >
                  <div className="w-11 h-11 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#081C15]">
                        WhatsApp Instant Connect
                      </span>
                      <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full">
                        FREE
                      </span>
                    </div>
                    <p className="text-[11px] text-[#737373] mt-0.5">
                      Fastest response • Ask dosage, formulation & symptoms
                    </p>
                  </div>
                </button>

                {/* 2. Book Full Dosha Nadi Analysis */}
                <Link
                  href="/consultation"
                  onClick={() => setIsConciergeOpen(false)}
                  className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all text-left shadow-xs hover:shadow-md group active:scale-98"
                >
                  <div className="w-11 h-11 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#081C15]">
                        Book In-Depth Dosha Evaluation
                      </span>
                      <span className="text-[10px] font-bold text-[#D4AF37] bg-amber-50 px-2 py-0.5 rounded-full">
                        SLOT APPOINTMENT
                      </span>
                    </div>
                    <p className="text-[11px] text-[#737373] mt-0.5">
                      Personalized diet chart, Prakriti analysis & doctor notes
                    </p>
                  </div>
                </Link>

                {/* 3. Direct Doctor Hotline */}
                <a
                  href="tel:+919820011223"
                  className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-[#1B4332] transition-all text-left shadow-xs hover:shadow-md group active:scale-98"
                >
                  <div className="w-11 h-11 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#081C15]">
                        Call Chief Vaidya Desk
                      </span>
                      <span className="text-[10px] font-medium text-stone-500">
                        10 AM - 8 PM IST
                      </span>
                    </div>
                    <p className="text-[11px] text-[#737373] mt-0.5">
                      Direct telephone support: +91 98200 11223
                    </p>
                  </div>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-stone-500 border-t border-stone-100">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  100% Confidential
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  BAMS Certified Doctors
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
