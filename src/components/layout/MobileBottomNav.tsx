'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, User, ShoppingBag, MessageCircle, HeartPulse } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'

export function MobileBottomNav() {
  const pathname = usePathname()
  const { getItemCount: getCartCount } = useCartStore()
  const { openCartDrawer } = useUIStore()

  const cartCount = getCartCount()

  const handleDoctorWhatsApp = () => {
    const msg = buildProductEnquiryMessage({
      customerName: '',
      productName: 'Doctor Consultation',
      quantity: 1,
      enquiry: 'Hi Ayur Veda Global! I would like a free doctor consultation / advice on choosing the right Ayurvedic regimen.',
      source: 'float',
    })
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#04120A]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 px-2 py-2 shadow-2xl"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors py-1 px-2 ${
            pathname === '/' ? 'text-[#D4AF37] font-bold' : 'text-gray-400 hover:text-[#D4AF37]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        {/* 2. Categories */}
        <Link
          href="/categories"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors py-1 px-2 ${
            pathname?.startsWith('/categories') ? 'text-[#D4AF37] font-bold' : 'text-gray-400 hover:text-[#D4AF37]'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Categories</span>
        </Link>

        {/* 3. Center Action: Doctor Consult on WhatsApp */}
        <button
          onClick={handleDoctorWhatsApp}
          className="flex flex-col items-center gap-0.5 text-[10px] text-[#25D366] hover:text-green-300 transition-colors -mt-4"
          aria-label="Free Doctor Consultation"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#126827] via-[#1EBE5B] to-[#25D366] flex items-center justify-center shadow-lg shadow-green-950/80 border-2 border-[#D4AF37] text-white">
            <HeartPulse className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-[9px] font-bold text-emerald-400 mt-0.5">Doctor Consult</span>
        </button>

        {/* 4. Cart */}
        <button
          onClick={openCartDrawer}
          className="flex flex-col items-center gap-0.5 text-[10px] relative text-gray-400 hover:text-[#D4AF37] transition-colors py-1 px-2"
          aria-label="Open Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-amber-400 to-[#D4AF37] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        {/* 5. Profile */}
        <Link
          href="/account"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors py-1 px-2 ${
            pathname?.startsWith('/account') ? 'text-[#D4AF37] font-bold' : 'text-gray-400 hover:text-[#D4AF37]'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  )
}
