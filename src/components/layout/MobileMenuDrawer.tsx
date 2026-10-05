'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
} from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

interface MobileMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const { openSearch } = useUIStore()

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="w-screen max-w-sm bg-[#0B0D13] border-l border-slate-700/60 flex flex-col shadow-2xl text-white"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#08090E]">
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src="/images/brand-logo.png"
                    alt="Ayur Veda Global"
                    width={32}
                    height={32}
                    className="object-contain filter drop-shadow-[0_2px_8px_rgba(194,162,101,0.25)]"
                  />
                </div>
                <div>
                  <span className="font-heading text-base font-bold text-white block">
                    Ayur Veda Global
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-emerald-400 block -mt-0.5">
                    Authentic Herbal Wellness
                  </span>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#161B26] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {/* Mobile Drawer Search Bar Button */}
              <button
                type="button"
                onClick={() => {
                  onClose()
                  openSearch()
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#121622] hover:bg-[#181D2C] border border-slate-700/60 text-xs text-[#FAF7EE] shadow-inner transition-all group"
                aria-label="Search apothecary catalog"
              >
                <Search className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[#A8A295] group-hover:text-[#FAF7EE] transition-colors">Search formulations, herbs...</span>
                <span className="ml-auto text-[10px] font-mono text-emerald-400 bg-[#0D1017] px-1.5 py-0.5 rounded border border-slate-700/50">
                  ⌘K
                </span>
              </button>

              {/* Highlighted Banner */}
              <Link
                href="/product/vitality-power-combo"
                onClick={onClose}
                className="block p-3.5 rounded-2xl bg-gradient-to-r from-[#161B26] to-[#0E121A] border border-slate-700/60 shadow-md group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-[#D4AF37] text-black px-2 py-0.5 rounded shadow">
                    Best Value • 29% OFF
                  </span>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <p className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                  Vitality Power Combo
                </p>
                <p className="text-xs text-gray-300 mt-0.5">
                  BODY Nutrition + STAYMAX+ Spray
                </p>
              </Link>

              {/* Doctor Consultation Banner */}
              <a
                href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20would%20like%20to%20consult%20with%20an%20Ayurvedic%20doctor."
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#131B24] border border-emerald-500/40 text-emerald-300 hover:bg-[#182330] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Free Doctor Consult</span>
                    <span className="text-[10px] text-emerald-400 block">Talk to BAMS Ayurvedic Doctor</span>
                  </div>
                </div>
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </a>

              {/* Shop Section */}
              <div>
                <p className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-2 px-1">
                  Shop Formulations
                </p>
                <div className="space-y-1">
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151924] text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <ShoppingBag className="w-4 h-4 text-emerald-400" />
                      Browse Full Catalog
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>

                  <Link
                    href="/product/body-essential-nutrition"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151924] text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Leaf className="w-4 h-4 text-emerald-400" />
                      BODY Essential Nutrition
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">60 Caps</span>
                  </Link>

                  <Link
                    href="/product/staymax-delay-spray"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151924] text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      STAYMAX+ Delay Spray
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">30 ml</span>
                  </Link>
                </div>
              </div>

              {/* Order & Support */}
              <div>
                <p className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-2 px-1">
                  Orders &amp; Account
                </p>
                <div className="space-y-1">
                  <Link
                    href="/track-order"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151924] text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-emerald-400" />
                      Track Delivery Status
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>

                  <Link
                    href="/orders"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151924] text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Package className="w-4 h-4 text-emerald-400" />
                      Order History
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>

                  <Link
                    href="/wishlist"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151924] text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Heart className="w-4 h-4 text-emerald-400" />
                      Saved Wishlist
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>
                </div>
              </div>

              {/* Information */}
              <div>
                <p className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-2 px-1">
                  Information
                </p>
                <div className="space-y-1">
                  <Link
                    href="/about"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151924] text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Info className="w-4 h-4 text-emerald-400" />
                      About Ayur Veda Global
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>

                  <Link
                    href="/faq"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151924] text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-emerald-400" />
                      FAQs &amp; Shipping Policy
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-800 bg-[#08090E] space-y-3">
              <a
                href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20have%20an%20enquiry%20about%20ordering."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-black" />
                <span>WhatsApp Order Desk (COD)</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>100% Discreet Packaging Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  )
}
