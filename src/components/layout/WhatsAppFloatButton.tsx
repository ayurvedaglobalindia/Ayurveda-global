'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Zap, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'

export function WhatsAppFloatButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const { trackLead } = useWhatsAppStore()
  const { user } = useUserStore()
  const { openModal } = useUIStore()

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = (source: 'float' | 'product' | 'checkout' | 'contact') => {
    if (source === 'checkout' && !user?.phone) {
      openModal('auth-gate')
      setIsExpanded(false)
      return
    }

    const primaryAddr = user?.addresses?.[0]
    const userCity = primaryAddr ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(', ') : ''
    const message = buildProductEnquiryMessage({
      customerName: user?.name || '',
      customerPhone: user?.phone || '',
      customerCity: userCity,
      productName: source === 'product' ? 'Product Enquiry' : 'Customer Support & Guidance',
      quantity: 1,
      enquiry: `Hi Mageesh / Ayur Veda Global team! I would like to enquire about your products, recommended dosage, and Cash on Delivery.`,
      source,
    })

    trackLead({
      source,
      customerName: user?.name,
      customerPhone: user?.phone,
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
            <div className="bg-[#0C0E14]/95 rounded-2xl shadow-2xl border border-[#999999]/25 p-3.5 space-y-2 backdrop-blur-xl">
              <button
                onClick={() => handleWhatsAppClick('float')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-[#11141E] hover:bg-[#151926] border border-[#999999]/20 transition-colors text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#6EE7B7]/15 border border-[#6EE7B7]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5 text-[#6EE7B7]" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-[#FAF7EE] block">General Enquiry</span>
                  <span className="text-[11px] text-[#999999]">Chat with customer support</span>
                </div>
              </button>

              <button
                onClick={() => handleWhatsAppClick('contact')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-[#11141E] hover:bg-[#151926] border border-[#999999]/20 transition-colors text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#151926] border border-[#D8C28A]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5 text-[#D8C28A]" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-[#FAF7EE] block">Direct Consultation</span>
                  <span className="text-[11px] text-[#999999]">Herbal dosage &amp; usage</span>
                </div>
              </button>

              <button
                onClick={() => handleWhatsAppClick('checkout')}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-[#11141E] hover:bg-[#151926] border border-[#999999]/20 transition-colors text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#D8C28A]/15 border border-[#D8C28A]/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5 text-[#D8C28A]" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-[#FAF7EE] block">Quick Order / COD</span>
                  <span className="text-[11px] text-[#999999]">Instant checkout support</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={classNames(
          'relative w-14 h-14 rounded-full bg-gradient-to-br from-[#34D399] to-[#059669] flex items-center justify-center shadow-lg shadow-[#34D399]/25 transition-all duration-300 hover:scale-105 focus-visible-ring',
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
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#D8C28A] flex items-center justify-center animate-pulse shadow-sm"
        >
          <Zap className="w-2.5 h-2.5 text-[#08090C]" />
        </motion.span>
      </button>

      {showTooltip && !isExpanded && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute bottom-16 right-0 bg-[#0C0E14] text-[#FAF7EE] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shadow-xl border border-[#999999]/30"
        >
          Chat with Mageesh &amp; Team
        </motion.div>
      )}
    </div>
  )
}