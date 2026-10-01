'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
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
} from 'lucide-react'

interface MobileMenuDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="w-screen max-w-sm bg-[#06150C] border-l border-[#D4AF37]/25 flex flex-col shadow-2xl text-white"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4AF37]/20 bg-[#040F08]">
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Ayur Veda Global"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-heading text-base font-bold text-white block">
                    Ayur Veda Global
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] block -mt-0.5">
                    Authentic Herbal Wellness
                  </span>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-emerald-950/60 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* Highlighted Banner */}
              <Link
                href="/product/vitality-power-combo"
                onClick={onClose}
                className="block p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 to-[#0A2E1A] border border-[#D4AF37]/30 shadow-md group"
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

              {/* Shop Section */}
              <div>
                <p className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-2 px-1">
                  Shop Formulations
                </p>
                <div className="space-y-1">
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-950/50 text-sm font-medium text-gray-200 hover:text-white transition-colors"
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
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-950/50 text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Leaf className="w-4 h-4 text-emerald-400" />
                      BODY Essential Nutrition
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/20">60 Caps</span>
                  </Link>

                  <Link
                    href="/product/staymax-delay-spray"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-950/50 text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      STAYMAX+ Delay Spray
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/20">30 ml</span>
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
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-950/50 text-sm font-medium text-gray-200 hover:text-white transition-colors"
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
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-950/50 text-sm font-medium text-gray-200 hover:text-white transition-colors"
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
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-950/50 text-sm font-medium text-gray-200 hover:text-white transition-colors"
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
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-950/50 text-sm font-medium text-gray-200 hover:text-white transition-colors"
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
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-950/50 text-sm font-medium text-gray-200 hover:text-white transition-colors"
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
            <div className="p-4 border-t border-[#D4AF37]/20 bg-[#040F08] space-y-3">
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
    </AnimatePresence>
  )
}
