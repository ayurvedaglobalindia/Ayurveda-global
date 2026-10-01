'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Truck, X, Sparkles, Zap, Leaf } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { FREE_SHIPPING_THRESHOLD, formatINR } from '@/lib/shipping'

const announcements = [
  {
    id: 1,
    text: '🔥 Vitality Power Combo: BODY Nutrition + STAYMAX+ Spray at ₹1,999 (Flat ₹799 OFF) • Free Delivery',
    icon: Sparkles,
    href: '/product/vitality-power-combo',
  },
  {
    id: 2,
    text: `Free confidential express delivery across India on orders above ${formatINR(FREE_SHIPPING_THRESHOLD)}`,
    icon: Truck,
    href: '/shop',
  },
  {
    id: 3,
    text: 'STAYMAX+ Delay Spray: 10-15 min climax delay • Non-numbing Aloe Vera formula',
    icon: Zap,
    href: '/product/staymax-delay-spray',
  },
  {
    id: 4,
    text: 'BODY Essential Nutrition: 60 Veg Capsules with Himalayan Shilajit & Ashwagandha',
    icon: Leaf,
    href: '/product/body-essential-nutrition',
  },
]

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const current = announcements[currentIndex]

  return (
    <div className="bg-gradient-to-r from-[#071d12] via-[#0d2d1d] to-[#071d12] text-ayur-cream py-2 px-3 text-xs sm:text-sm border-b border-ayur-gold/20 shadow-sm relative z-30">
      <div className="container flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center sm:justify-start min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-1.5 sm:gap-2 truncate"
            >
              {current.icon && (
                <current.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-ayur-gold animate-pulse" />
              )}
              <Link
                href={current.href}
                className="truncate hover:text-ayur-gold transition-colors font-medium flex items-center gap-1"
              >
                <span>{current.text}</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded text-ayur-cream/70 hover:text-ayur-cream hover:bg-white/10 transition-colors flex-shrink-0 ml-2"
          aria-label="Dismiss announcements"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  )
}