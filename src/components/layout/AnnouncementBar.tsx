'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Truck, X, Sparkles, Zap, Leaf, Shield, MessageCircle, Copy, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FREE_SHIPPING_THRESHOLD, formatINR } from '@/lib/shipping'

const announcements = [
  {
    id: 1,
    text: '🔥 Use Code AYUR10 at checkout for an extra 10% OFF on all orders!',
    badge: 'AYUR10',
    icon: Sparkles,
    href: '/shop',
  },
  {
    id: 2,
    text: '📦 100% Discreet Delivery Guarantee: Plain unmarked boxes, no product names outside',
    badge: 'Discreet Box',
    icon: Shield,
    href: '/legal/shipping',
  },
  {
    id: 3,
    text: '⭐ Vitality Power Combo (Capsules + Spray): Only ₹1,999 (Save ₹799 • 29% OFF)',
    badge: 'Best Value',
    icon: Zap,
    href: '/product/vitality-power-combo',
  },
  {
    id: 4,
    text: `🚚 Free Express Delivery across 25,000+ Indian pincodes on orders above ${formatINR(FREE_SHIPPING_THRESHOLD)}`,
    badge: 'Free Shipping',
    icon: Truck,
    href: '/shop',
  },
  {
    id: 5,
    text: '👨‍⚕️ Free Doctor Consultation: Speak with an in-house BAMS Ayurvedic Vaidya on WhatsApp',
    badge: 'Free Consult',
    icon: MessageCircle,
    href: 'https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20would%20like%20a%20free%20doctor%20consultation.',
  },
]

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  const copyCoupon = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('AYUR10')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isVisible) return null

  const current = announcements[currentIndex]

  return (
    <div className="bg-[#08090C] text-[#FAF7EE] py-2 px-3 text-xs sm:text-sm border-b border-[#999999]/20 shadow-sm relative z-30">
      <div className="container flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center sm:justify-start min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 truncate"
            >
              <current.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-[#E6D5AC]" />

              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-[#131722] text-[#E6D5AC] px-2 py-0.5 rounded border border-[#999999]/30">
                {current.badge}
              </span>

              <Link
                href={current.href}
                className="truncate hover:text-[#6EE7B7] transition-colors font-medium text-xs sm:text-sm text-[#FAF7EE]"
              >
                {current.text}
              </Link>

              {current.badge === 'AYUR10' && (
                <button
                  onClick={copyCoupon}
                  className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold text-[#08090C] bg-[#D8C28A] hover:bg-[#E6D5AC] px-2 py-0.5 rounded shadow transition-colors ml-1"
                  title="Copy Coupon"
                >
                  {copied ? <Check className="w-3 h-3 text-[#08090C]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded text-[#999999] hover:text-[#FAF7EE] transition-colors flex-shrink-0 ml-2"
          aria-label="Dismiss announcements"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  )
}