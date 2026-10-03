'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, User, ShoppingBag, HeartPulse } from 'lucide-react'
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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B150F]/95 backdrop-blur-xl border-t border-[#C2A265]/25 px-2 py-2 shadow-2xl"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors py-1 px-2 ${
            pathname === '/' ? 'text-[#D4B678] font-bold' : 'text-[#A8A295] hover:text-[#D4B678]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        {/* 2. Search / Catalog (Nykaa / Purplle style) */}
        <Link
          href="/shop"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors py-1 px-2 ${
            pathname?.startsWith('/shop') ? 'text-[#D4B678] font-bold' : 'text-[#A8A295] hover:text-[#D4B678]'
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </Link>

        {/* 3. Center Action: Free Doctor Consult on WhatsApp */}
        <button
          onClick={handleDoctorWhatsApp}
          className="flex flex-col items-center gap-0.5 text-[10px] text-[#C2A265] hover:text-[#D4B678] transition-colors -mt-4"
          aria-label="Free Doctor Consultation"
        >
          <div className="w-11 h-11 rounded-full bg-[#142A1D] border border-[#C2A265]/50 flex items-center justify-center shadow-xl text-[#D4B678]">
            <HeartPulse className="w-5 h-5 text-[#C2A265]" />
          </div>
          <span className="text-[9px] font-medium text-[#C2A265] mt-0.5">Vaidya</span>
        </button>

        {/* 4. Cart */}
        <button
          onClick={openCartDrawer}
          className="flex flex-col items-center gap-0.5 text-[10px] relative text-[#A8A295] hover:text-[#C2A265] transition-colors py-1 px-2"
          aria-label="Open Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#C2A265] text-[#0B150F] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
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
            pathname?.startsWith('/account') ? 'text-[#D4B678] font-bold' : 'text-[#A8A295] hover:text-[#D4B678]'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  )
}
