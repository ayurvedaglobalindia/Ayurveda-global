"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Sparkles,
  HeartPulse,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useWhatsAppStore,
  buildWhatsAppUrl,
  buildVaidyaConsultationMessage,
  buildProductEnquiryMessage,
} from "@/store/whatsappStore";
import { useUserStore } from "@/store/userStore";

export function WhatsAppFloatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const { trackLead } = useWhatsAppStore();
  const { user } = useUserStore();

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleVaidyaConsult = () => {
    const message = buildVaidyaConsultationMessage();

    trackLead({
      source: "float-concierge",
      customerName: user?.name,
      customerPhone: user?.phone,
      productName: "Senior Vaidya Consultation",
      quantity: 1,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    });

    window.open(buildWhatsAppUrl(message), "_blank");
    setIsOpen(false);
  };

  const handleQuickOrder = () => {
    const message = buildProductEnquiryMessage({
      customerName: user?.name || "",
      customerPhone: user?.phone || "",
      productName: "Ayurveda Global Formulations",
      quantity: 1,
      enquiry:
        "Namaste! I would like to place an order via WhatsApp with Cash on Delivery (COD). Please assist with pricing, discounts, and dispatch.",
      source: "float-order",
    });

    trackLead({
      source: "float-order",
      customerName: user?.name,
      customerPhone: user?.phone,
      productName: "WhatsApp COD Order",
      quantity: 1,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    });

    window.open(buildWhatsAppUrl(message), "_blank");
    setIsOpen(false);
  };

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-[60]">
      {/* Expanded Glassmorphic Concierge Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="absolute bottom-20 right-0 w-[350px]"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#FAF7F2]/95 backdrop-blur-2xl border border-[#9E8047]/30 shadow-[0_20px_50px_rgba(31,51,42,0.25)] text-[#1C1D1F]">
              {/* Header */}
              <div className="p-5 pb-4 border-b border-[#9E8047]/20 bg-gradient-to-r from-[#2D4A3E] to-[#1F332A] text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-serif text-base font-medium tracking-tight">
                      Ayurveda Global Concierge
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full hover:bg-white/10 text-white/80 transition-colors"
                    aria-label="Close concierge"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-[#E8ECE9]/90 font-light leading-relaxed">
                  Connect directly with certified Ayurvedic Vaidyas (BAMS) or place Cash on Delivery orders instantly.
                </p>
              </div>

              {/* Actions List */}
              <div className="p-4 space-y-2.5">
                {/* 1. Doctor Consult */}
                <button
                  type="button"
                  onClick={handleVaidyaConsult}
                  className="w-full flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#9E8047]/25 hover:border-[#2D4A3E] hover:bg-[#EFF4F0]/60 transition-all text-left group shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#EFF4F0] border border-[#2D4A3E]/20 flex items-center justify-center flex-shrink-0 text-[#2D4A3E] group-hover:scale-105 transition-transform">
                    <HeartPulse className="w-5 h-5 text-[#2D4A3E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold text-[#1C1D1F] group-hover:text-[#2D4A3E] transition-colors">
                        Free Doctor Consultation
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#9E8047] group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[11px] text-[#737373] mt-0.5 block leading-tight">
                      Confidential BAMS Vaidya advice on stamina, hair &amp; wellness.
                    </span>
                  </div>
                </button>

                {/* 2. Direct Order via WhatsApp */}
                <button
                  type="button"
                  onClick={handleQuickOrder}
                  className="w-full flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#9E8047]/25 hover:border-[#2D4A3E] hover:bg-[#EFF4F0]/60 transition-all text-left group shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#EFF4F0] border border-[#2D4A3E]/20 flex items-center justify-center flex-shrink-0 text-[#2D4A3E] group-hover:scale-105 transition-transform">
                    <ShoppingBag className="w-5 h-5 text-[#2D4A3E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold text-[#1C1D1F] group-hover:text-[#2D4A3E] transition-colors">
                        Instant WhatsApp Order (COD)
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#9E8047] group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[11px] text-[#737373] mt-0.5 block leading-tight">
                      Order in 1 click with Cash on Delivery across 28,000+ pin codes.
                    </span>
                  </div>
                </button>

                {/* 3. Track Order */}
                <Link
                  href="/track-order"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-start gap-3.5 p-3 rounded-xl bg-[#FAF7F2] border border-gray-200 hover:border-gray-300 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 text-[#737373]">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-between pt-1">
                    <span className="text-xs font-medium text-[#555555]">
                      Track Active Shipment
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#737373] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Footer Trust Bar */}
              <div className="px-5 py-3 bg-[#FAF7F2] border-t border-[#9E8047]/20 flex items-center justify-between text-[10.5px] font-mono text-[#737373]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D4A3E]" />
                  100% Confidential
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#9E8047]" />
                  09:00–20:00 IST
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Button */}
      <div className="relative flex items-center gap-3">
        {/* Subtle Greeting Pill */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#9E8047]/30 shadow-md text-xs text-[#1C1D1F] flex items-center gap-2 whitespace-nowrap cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-serif">Doctor Online • Chat with Us</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 active:scale-95 outline-none"
          aria-label="Open WhatsApp Concierge"
          whileTap={{ scale: 0.92 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-ping" />
              </span>
              <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
