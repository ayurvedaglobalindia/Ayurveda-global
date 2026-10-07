"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Sparkles, Mic, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { classNames } from "@/lib/utils/formatters";
import {
  useWhatsAppStore,
  buildWhatsAppUrl,
  buildProductEnquiryMessage,
} from "@/store/whatsappStore";
import { useUserStore } from "@/store/userStore";

export function WhatsAppFloatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const { trackLead } = useWhatsAppStore();
  const { user } = useUserStore();

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleConsult = (type: "general" | "expert") => {
    const primaryAddr = user?.addresses?.[0];
    const userCity = primaryAddr
      ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(", ")
      : "";
    const message = buildProductEnquiryMessage({
      customerName: user?.name || "",
      customerPhone: user?.phone || "",
      customerCity: userCity,
      productName: type === "expert" ? "Expert AI Vaidya Consult" : "General Enquiry",
      quantity: 1,
      enquiry: type === "expert" 
        ? "Pranam. I would like an expert Ayurvedic consultation." 
        : "Hi, I have a general query about Ayurveda Global products.",
      source: "float",
    });

    trackLead({
      source: "float",
      customerName: user?.name,
      customerPhone: user?.phone,
      productName: "AI Vaidya Consult",
      quantity: 1,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      userAgent: "",
      referrer: "",
    });

    window.open(buildWhatsAppUrl(message), "_blank");
    setIsOpen(false);
  };

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-[60]">
      {/* Expanded Glassmorphic Chat/AI Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-[340px]"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#0a0f0d]/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(45,74,62,0.5)]">
              {/* Astra Fluid Background inside card */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-[#9E8047] rounded-full blur-[50px] -z-10 mix-blend-screen"
              />
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-20 -left-20 w-52 h-52 bg-[#2d4a3e] rounded-full blur-[60px] -z-10 mix-blend-screen"
              />

              {/* Header */}
              <div className="p-6 pb-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#9E8047]" />
                    <h3 className="font-heading text-lg text-white font-medium">Astra Vaidya</h3>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-white/70 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-[#a3b3aa] font-sans font-light">
                  Your intelligent Ayurvedic assistant. Powered by ancient wisdom & modern AI.
                </p>
              </div>

              {/* Actions */}
              <div className="p-4 space-y-3">
                <button
                  onClick={() => handleConsult("expert")}
                  className="group relative w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center gap-4 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#2d4a3e] to-[#9E8047] flex items-center justify-center flex-shrink-0">
                    <BrainCircuit className="w-5 h-5 text-white" />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border border-white/30"
                    />
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-white block mb-0.5 group-hover:text-[#9E8047] transition-colors">
                      AI Diagnostic Consult
                    </span>
                    <span className="text-[11px] text-[#8a9992] leading-tight block">
                      Connect with our expert Vaidya panel for deep analysis.
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handleConsult("general")}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-white block mb-0.5">
                      General Support
                    </span>
                    <span className="text-[11px] text-[#8a9992] leading-tight block">
                      Order updates & quick product questions.
                    </span>
                  </div>
                </button>
              </div>

              {/* Bottom mic indicator */}
              <div className="px-6 py-4 bg-black/20 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                  Listening...
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ["4px", "12px", "4px"] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1 bg-[#9E8047] rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Glowing Orb Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-16 h-16 rounded-full outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Outer glowing aura */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className={classNames(
            "absolute -inset-6 rounded-full blur-[20px] transition-opacity duration-700",
            isOpen ? "opacity-100 bg-gradient-to-tr from-[#9E8047] via-[#2d4a3e] to-[#0a0f0d]" : "opacity-40 group-hover:opacity-70 bg-gradient-to-tr from-[#4E5F52] via-[#9E8047] to-[#2d4a3e]"
          )}
        />
        
        {/* Inner fluid orb */}
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_20px_rgba(45,74,62,0.8)] border border-white/30 bg-[#0a0f0d] flex items-center justify-center">
           {/* Animated gradient blob */}
           <motion.div
              animate={{
                x: ["0%", "30%", "-30%", "0%"],
                y: ["0%", "30%", "-30%", "0%"],
                scale: [1, 1.3, 1.1, 1],
                rotate: 360
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-10 bg-gradient-to-r from-[#9E8047] to-[#2d4a3e] opacity-90 blur-lg rounded-full mix-blend-screen"
           />
           <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
           
           <AnimatePresence mode="wait">
             {isOpen ? (
               <motion.div
                 key="close"
                 initial={{ opacity: 0, rotate: -90 }}
                 animate={{ opacity: 1, rotate: 0 }}
                 exit={{ opacity: 0, rotate: 90 }}
                 className="relative z-10"
               >
                 <X className="w-7 h-7 text-white" />
               </motion.div>
             ) : (
               <motion.div
                 key="sparkles"
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.5 }}
                 className="relative z-10"
               >
                 <Sparkles className="w-7 h-7 text-white" />
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </motion.button>

      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute bottom-4 right-20 bg-[#0a0f0d]/90 backdrop-blur-md text-white/90 px-4 py-2 rounded-2xl text-xs font-medium whitespace-nowrap shadow-xl border border-white/10"
        >
          <span className="text-[#9E8047] mr-1">✦</span> Try AI Vaidya
        </motion.div>
      )}
    </div>
  );
}
