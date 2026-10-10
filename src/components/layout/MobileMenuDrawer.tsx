"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Sparkles,
  ShoppingBag,
  Package,
  Truck,
  Heart,
  MessageCircle,
  HelpCircle,
  Info,
  ChevronRight,
  Shield,
  Tag,
  Leaf,
  HeartPulse,
} from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from "@/store/whatsappStore";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const { openSearch } = useUIStore();

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="w-screen max-w-sm bg-[#FAF7F2] border-l border-[#9E8047]/25 flex flex-col shadow-2xl text-[#1C1D1F]"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#9E8047]/25 bg-[#FAF7F2]">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 relative flex-shrink-0">
                    <Image
                      src="/images/brand-logo.png"
                      alt="Ayur Veda Global"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-heading text-sm font-medium text-[#1C1D1F] block">
                      Ayur Veda Global
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[#737373] block -mt-0.5 font-sans">
                      Classical Apothecary
                    </span>
                  </div>
                </Link>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-[#737373] hover:text-[#1C1D1F] hover:bg-[#F4EFEA] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                {/* Mobile Drawer Search Bar Button */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openSearch();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#FFFFFF] border border-[#9E8047]/25 text-xs text-[#737373] transition-colors text-left"
                  aria-label="Search catalog"
                >
                  <Search className="w-3.5 h-3.5 text-[#737373]" />
                  <span className="truncate">Search catalog...</span>
                </button>

                {/* Main Links */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#737373] mb-2 px-1">
                    Navigation
                  </p>
                  <div className="space-y-1">
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F4EFEA] text-sm text-[#1C1D1F] transition-colors"
                    >
                      <span>Shop All Formulations</span>
                      <ChevronRight className="w-4 h-4 text-[#999999]" />
                    </Link>

                    <Link
                      href="/categories"
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F4EFEA] text-sm text-[#1C1D1F] transition-colors"
                    >
                      <span>Formulation Collections</span>
                      <ChevronRight className="w-4 h-4 text-[#999999]" />
                    </Link>

                    <Link
                      href="/about"
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F4EFEA] text-sm text-[#1C1D1F] transition-colors"
                    >
                      <span>Ayurvedic Heritage &amp; Science</span>
                      <ChevronRight className="w-4 h-4 text-[#999999]" />
                    </Link>

                    <Link
                      href="/faq"
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F4EFEA] text-sm text-[#1C1D1F] transition-colors"
                    >
                      <span>Frequently Asked Questions</span>
                      <ChevronRight className="w-4 h-4 text-[#999999]" />
                    </Link>

                    <Link
                      href="/contact"
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F4EFEA] text-sm text-[#1C1D1F] transition-colors"
                    >
                      <span>Contact Concierge</span>
                      <ChevronRight className="w-4 h-4 text-[#999999]" />
                    </Link>
                  </div>
                </div>

                {/* Formulations Quick List */}
                <div className="pt-2 border-t border-[#9E8047]/25">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#737373] mb-2 px-1">
                    Key Formulations
                  </p>
                  <div className="space-y-1">
                    <Link
                      href="/product/body-essential-nutrition"
                      onClick={onClose}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F4EFEA] text-xs text-[#1C1D1F] transition-colors"
                    >
                      <span>BODY Essential Nutrition</span>
                      <span className="text-[10px] text-[#737373] font-mono">
                        60 Caps
                      </span>
                    </Link>

                    <Link
                      href="/product/staymax-delay-spray"
                      onClick={onClose}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F4EFEA] text-xs text-[#1C1D1F] transition-colors"
                    >
                      <span>STAYMAX+ Delay Spray</span>
                      <span className="text-[10px] text-[#737373] font-mono">
                        30 ml
                      </span>
                    </Link>

                    <Link
                      href="/product/vitality-power-combo"
                      onClick={onClose}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F4EFEA] text-xs text-[#1C1D1F] transition-colors"
                    >
                      <span>Vitality &amp; Performance Combo</span>
                      <span className="text-[10px] text-[#9E8047] font-mono">
                        Combo
                      </span>
                    </Link>

                    <Link
                      href="/product/hair-regrow-kit"
                      onClick={onClose}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F4EFEA] text-xs text-[#1C1D1F] transition-colors"
                    >
                      <span>HAIR RE-GROW Complete Kit</span>
                      <span className="text-[10px] text-[#4E5F52] font-mono">
                        Kit
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Orders & Tracking */}
                <div className="pt-2 border-t border-[#9E8047]/25">
                  <div className="space-y-1">
                    <Link
                      href="/track-order"
                      onClick={onClose}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F4EFEA] text-xs text-[#1C1D1F] transition-colors"
                    >
                      <span>Track Shipment Status</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#999999]" />
                    </Link>

                    <Link
                      href="/orders"
                      onClick={onClose}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F4EFEA] text-xs text-[#1C1D1F] transition-colors"
                    >
                      <span>Order History</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#999999]" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-[#9E8047]/25 bg-[#FAF7F2] space-y-2">
                <a
                  href={buildWhatsAppUrl(buildVaidyaConsultationMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-full bg-[#1C1D1F] text-[#FAF7F2] hover:bg-[#333333] font-medium text-xs flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Vaidya Desk</span>
                </a>

                <p className="text-[10.5px] text-center text-[#737373] font-mono">
                  100% Confidential Unmarked Parcels
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
