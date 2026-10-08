"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Truck,
  X,
  Sparkles,
  Zap,
  Leaf,
  Shield,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FREE_SHIPPING_THRESHOLD, formatINR } from "@/lib/shipping";

const announcements = [
  {
    id: 1,
    text: "Complimentary express delivery across India on orders above ₹999",
    badge: "Pan-India",
    href: "/shop",
  },
  {
    id: 2,
    text: "Discreet archival delivery guarantee — dispatched in plain, unmarked parcels",
    badge: "Confidentiality",
    href: "/legal/shipping",
  },
  {
    id: 3,
    text: "Privilege code AYUR10 — 10% courtesy on your initial apothecary order",
    badge: "AYUR10",
    href: "/shop",
  },
  {
    id: 4,
    text: "Classical Rasayana chemistry • Standardized botanical extracts screened for purity",
    badge: "Quality Standard",
    href: "/about",
  },
  {
    id: 5,
    text: "Complimentary Ayurvedic consultation with certified BAMS Senior Vaidyas",
    badge: "Consultation",
    href: "/consultation",
  },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const copyCoupon = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("AYUR10");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isVisible) return null;

  const current = announcements[currentIndex];

  return (
    <div className="bg-[#FAF7F2] text-[#1C1D1F] border-b border-[#9E8047]/25 py-2 px-3 text-xs relative z-30">
      <div className="container flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center sm:justify-start min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2.5 truncate"
            >
              <span className="hidden sm:inline-block text-[9.5px] uppercase tracking-[0.18em] font-medium text-[#737373] px-2 py-0.5 rounded-full border border-[#9E8047]/30 bg-[#FFFFFF]">
                {current.badge}
              </span>

              <Link
                href={current.href}
                className="truncate hover:text-[#9E8047] transition-colors text-xs text-[#1C1D1F] tracking-wide font-normal font-sans"
              >
                {current.text}
              </Link>

              {current.badge === "AYUR10" && (
                <button
                  onClick={copyCoupon}
                  className="hidden md:inline-flex items-center gap-1 text-[9.5px] uppercase tracking-wider font-semibold text-[#9E8047] hover:text-[#1C1D1F] border border-[#9E8047]/40 hover:border-[#9E8047] px-2 py-0.5 rounded-full transition-colors ml-1 bg-[#FFFFFF]"
                  title="Copy Privilege Code"
                >
                  {copied ? (
                    <Check className="w-2.5 h-2.5 text-[#4E5F52]" />
                  ) : (
                    <Copy className="w-2.5 h-2.5" />
                  )}
                  <span>{copied ? "Applied" : "Copy Code"}</span>
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded text-[#999999] hover:text-[#1C1D1F] transition-colors flex-shrink-0 ml-2"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
