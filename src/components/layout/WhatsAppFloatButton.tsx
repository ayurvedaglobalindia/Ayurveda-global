'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { useWhatsAppStore } from '@/store/whatsappStore'
import { buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'

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
      enquiry: `Hi, I'm interested in your products. ${source === 'float' ? 'I saw your floating button.' : ''}`,
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
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ duration: 0.2, staggerChildren: 0.05 }}
            className="absolute bottom-16 right-0 w-64"
          >
            <div className="bg-white rounded-2xl shadow-strong border border-ayur-beige p-4 space-y-2">
              <button
                onClick={() => handleWhatsAppClick('float')}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-ayur-cream hover:bg-ayur-beige transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-ayur-black">General Enquiry</span>
              </button>
              <button
                onClick={() => handleWhatsAppClick('contact')}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-ayur-cream hover:bg-ayur-beige transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-ayur-forest/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-ayur-forest" />
                </div>
                <span className="font-medium text-ayur-black">Quick Question</span>
              </button>
              <button
                onClick={() => handleWhatsAppClick('float')}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-ayur-cream hover:bg-ayur-beige transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-ayur-gold/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-ayur-gold" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.52 3.48A9.89 9.89 0 0012 0C5.37 0 0 5.37 0 12c0 2.65 1.06 5.08 2.79 6.91l-1.97 5.91L12 21.75l5.91-1.97 5.91 1.97-1.97-5.91L21.75 12l1.97-5.91c1.83-1.73 2.79-4.16 2.79-6.91 0-6.63-5.37-12-12-12zm-4.54 11.46c-.28.13-.56.25-.85.36-.53.2-.97.17-1.35-.07-.39-.23-.75-.6-.98-1.05-.22-.46-.2-.95-.08-1.36.11-.4.3-.77.59-1.04.3-.26.63-.47 1.01-.58.41-.1.82-.14 1.24-.12.42.02.81.1 1.18.25.37.15.69.37.96.65.27.27.49.6.65.96.15.37.23.76.25 1.18-.02.42-.06.83-.12 1.24-.11.38-.32.71-.58 1.01-.27.27-.64.5-.99.59-.39.09-.76.05-1.15-.07-.44-.13-.8-.49-1.03-.98-.23-.38-.27-.82-.07-1.35.2-.52.33-1.05.36-1.62z" />
                  </svg>
                </div>
                <span className="font-medium text-ayur-black">Order Enquiry</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={classNames(
          'relative w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 focus-visible-ring',
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
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-ayur-copper flex items-center justify-center animate-pulse-gold"
        >
          <Zap className="w-3 h-3 text-ayur-black" />
        </motion.span>
      </button>

      {showTooltip && !isExpanded && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute bottom-20 right-0 bg-ayur-black text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
        >
          Chat with us on WhatsApp
        </motion.div>
      )}
    </div>
  )
}