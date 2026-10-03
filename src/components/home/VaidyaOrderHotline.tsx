'use client'

import React from 'react'
import { PhoneCall, MessageCircle, Truck, Shield, Lock, ArrowRight } from 'lucide-react'
import { buildWhatsAppUrl } from '@/store/whatsappStore'

export function VaidyaOrderHotline() {
  const handleWhatsAppOrder = () => {
    const msg = `*Ayur Veda Global - Instant Phone / WhatsApp Order Desk*\n\n` +
      `नमस्ते! मुझे आयुर्वेद ग्लोबल के उत्पाद ऑर्डर करने हैं। कृपया कैश ऑन डिलीवरी (COD) उपलब्ध कराएं।\n` +
      `• नाम:\n` +
      `• पता:\n` +
      `• पिनकोड:`

    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <section className="bg-gradient-to-r from-[#03150A] via-[#082E19] to-[#03150A] border-y-2 border-[#D4AF37]/40 py-6 sm:py-8 text-white relative z-20 shadow-2xl">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
          {/* Left Text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>सीधे ऑर्डर हॉटलाइन • Direct Phone &amp; WhatsApp Order Desk</span>
            </div>
            <h3 className="font-heading text-lg sm:text-2xl font-bold text-white leading-tight">
              Order Directly on Call or WhatsApp —{' '}
              <span className="text-[#D4AF37]">Cash on Delivery (COD)</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              No complicated website checkout needed. Give your address on WhatsApp, pay cash when the parcel reaches your door.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            {/* WhatsApp Direct Order Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5B] text-black font-extrabold text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-green-950/60 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 text-black" />
              <span>WhatsApp पर ऑर्डर करें (COD)</span>
            </button>

            {/* Direct Phone Call Button */}
            <a
              href="tel:+919123485451"
              className="px-5 py-3.5 rounded-2xl bg-black/50 hover:bg-black/80 border border-[#D4AF37]/50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
              <span>Call: +91 91234 85451</span>
            </a>
          </div>
        </div>

        {/* Micro Guarantee Strip */}
        <div className="mt-5 pt-4 border-t border-emerald-500/20 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-gray-300">
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            <span>१००% गुप्त पार्सल (100% Discreet Plain Box)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>२५,०००+ पिनकोड पर डिलीवरी (All India Delivery)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span>ओरिजिनल जड़ी-बूटी गारंटी (Ayush Approved)</span>
          </span>
        </div>
      </div>
    </section>
  )
}
