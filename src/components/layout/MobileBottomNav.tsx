'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Sparkles, Heart, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'

export function MobileBottomNav() {
  const pathname = usePathname()
  const { getItemCount: getCartCount } = useCartStore()
  const { getItemCount: getWishlistCount } = useWishlistStore()
  const { openCartDrawer } = useUIStore()

  const cartCount = getCartCount()
  const wishlistCount = getWishlistCount()

  const handleWhatsApp = () => {
    const msg = buildProductEnquiryMessage({
      customerName: '',
      productName: 'General Enquiry',
      quantity: 1,
      enquiry: 'Hi Ayur Veda Global! I need assistance with an order.',
      source: 'float',
    })
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07130D]/95 backdrop-blur-md border-t border-[#D4AF37]/25 px-3 py-2"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-[11px] transition-colors ${
            pathname === '/' ? 'text-[#D4AF37] font-semibold' : 'text-[#C4BDA8] hover:text-[#D4AF37]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center gap-1 text-[11px] transition-colors ${
            pathname?.startsWith('/shop') ? 'text-[#D4AF37] font-semibold' : 'text-[#C4BDA8] hover:text-[#D4AF37]'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Shop</span>
        </Link>

        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center gap-1 text-[11px] text-[#25D366] hover:text-green-400 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1E7E34] to-[#25D366] flex items-center justify-center -mt-4 shadow-lg shadow-green-900/40 border border-[#D4AF37]/40">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-medium text-[#25D366]">WhatsApp</span>
        </button>

        <Link
          href="/wishlist"
          className={`flex flex-col items-center gap-1 text-[11px] relative transition-colors ${
            pathname === '/wishlist' ? 'text-[#D4AF37] font-semibold' : 'text-[#C4BDA8] hover:text-[#D4AF37]'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>Wishlist</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 right-2 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>

        <button
          onClick={openCartDrawer}
          className="flex flex-col items-center gap-1 text-[11px] relative text-[#C4BDA8] hover:text-[#D4AF37] transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 right-1 bg-[#D4AF37] text-[#07130D] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
