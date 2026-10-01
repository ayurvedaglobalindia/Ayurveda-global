'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Zap, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'

export function WhatsAppFloatButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const { trackLead } = useWhatsAppStore()

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = (source: 'float' | 'product' | 'checkout' | 'contact') => {
    const message = buildProductEnquiryMessage({
      customerName: '',
      productName: source === 'product' ? 'Product Enquiry' : 'General Enquiry',
      quantity: 1,
      enquiry: `Hi Mageesh / Ayur Veda Global team! I would like to enquire about your products and Cash on Delivery.`,
      source,
    })

    trackLead({
      source,
      customerName: '',
      productName: source === 'product' ? 'Product Enquiry' : undefined,
      quantity: 1,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: '',
      referrer: '',
    })

    window.open(buildWhatsAppUrl(message), '_blank')
    setIsExpanded(false)
  }

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-[45]">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-64"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-ayur-beige p-3.5 space-y-2 backdrop-blur-md">
              <button
                onClick={() => handleWhatsAppClick('float')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-ayur-cream hover:bg-ayur-beige transition-colors text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-ayur-black block">General Enquiry</span>
                  <span className="text-[11px] text-ayur-stone">Chat with customer support</span>
                </div>
              </button>

              <button
                onClick={() => handleWhatsAppClick('contact')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-ayur-cream hover:bg-ayur-beige transition-colors text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-ayur-forest/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5 text-ayur-forest" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-ayur-black block">Direct Consultation</span>
                  <span className="text-[11px] text-ayur-stone">Herbal dosage & usage</span>
                </div>
              </button>

              <button
                onClick={() => handleWhatsAppClick('checkout')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-ayur-cream hover:bg-ayur-beige transition-colors text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-ayur-gold/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5 text-ayur-gold" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-ayur-black block">Quick Order / COD</span>
                  <span className="text-[11px] text-ayur-stone">Instant checkout support</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={classNames(
          'relative w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-600/30 transition-all duration-300 hover:scale-105 focus-visible-ring',
          isExpanded && 'rotate-45'
        )}
        aria-label={isExpanded ? 'Close WhatsApp options' : 'Open WhatsApp chat'}
        aria-expanded={isExpanded}
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X className="w-7 h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-ayur-copper flex items-center justify-center animate-pulse"
        >
          <Zap className="w-2.5 h-2.5 text-ayur-black" />
        </motion.span>
      </button>

      {showTooltip && !isExpanded && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute bottom-16 right-0 bg-ayur-black text-white px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shadow-xl border border-white/10"
        >
          Chat with Mageesh & Team
        </motion.div>
      )}
    </div>
  )
}