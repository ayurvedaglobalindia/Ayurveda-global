'use client'

import { useState, useEffect } from 'react'
import { Truck, X, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { FREE_SHIPPING_THRESHOLD, formatINR } from '@/lib/shipping'

const announcements = [
  {
    id: 1,
    text: `Free shipping on orders above ${formatINR(FREE_SHIPPING_THRESHOLD)}`,
    icon: Truck,
  },
  {
    id: 2,
    text: 'New arrival: STAYMAX+ Delay Spray - Natural endurance support',
    icon: RotateCcw,
  },
  {
    id: 3,
    text: 'Authentic Ayurvedic herbs • Sustainable sourcing • Lab tested',
    icon: null,
  },
]

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="bg-ayur-forest text-ayur-cream py-2 px-3 text-xs sm:text-sm"
        role="status"
        aria-live="polite"
      >
        <div className="container flex items-center justify-between gap-2">
          <div className="flex-1 flex items-center justify-center sm:justify-start min-w-0">
            {announcements.map((announcement, index) => (
              <span
                key={announcement.id}
                className={classNames(
                  'flex items-center gap-1.5 sm:gap-2 truncate',
                  index === currentIndex ? 'inline-flex' : 'hidden'
                )}
              >
                {announcement.icon && <announcement.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-ayur-gold" />}
                <span className="truncate">{announcement.text}</span>
              </span>
            ))}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded text-ayur-cream/70 hover:text-ayur-cream hover:bg-white/10 transition-colors flex-shrink-0 ml-2"
            aria-label="Dismiss announcements"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}