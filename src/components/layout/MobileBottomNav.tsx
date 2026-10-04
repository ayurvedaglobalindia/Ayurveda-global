'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Search, User, ShoppingBag, HeartPulse } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from '@/store/whatsappStore'

export function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { getItemCount: getCartCount } = useCartStore()
  const { user, isAuthenticated } = useUserStore()
  const { openCartDrawer, openSearch, openModal, isSearchOpen } = useUIStore()

  const cartCount = getCartCount()

  const handleDoctorWhatsApp = () => {
    const primaryAddr = user?.addresses?.[0]
    const userCity = primaryAddr ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(', ') : ''
    
    const msg = buildVaidyaConsultationMessage({
      patientName: user?.name || '',
      patientPhone: user?.phone || '',
      patientCity: userCity,
      concern: 'Personalized Rasayana Regimen & Stamina Guidance',
      source: 'bottom-nav',
    })
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push('/account')
    } else {
      openModal('auth-gate')
    }
  }

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08120C]/98 backdrop-blur-2xl border-t border-[#C2A265]/25 px-2 py-1.5 shadow-2xl safe-area-pb"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors py-1 px-2 ${
            pathname === '/' ? 'text-[#D4B678] font-bold' : 'text-[#A8A295] hover:text-[#D4B678]'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        {/* 2. Live Search Modal */}
        <button
          type="button"
          onClick={openSearch}
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors py-1 px-2 ${
            isSearchOpen ? 'text-[#D4B678] font-bold' : 'text-[#A8A295] hover:text-[#D4B678]'
          }`}
          aria-label="Search Formulations"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        {/* 3. Center Action: Vaidya Doctor Desk */}
        <button
          type="button"
          onClick={handleDoctorWhatsApp}
          className="flex flex-col items-center gap-0.5 text-[10px] text-[#C2A265] hover:text-[#D4B678] transition-colors -mt-4 group"
          aria-label="Consult Chief Vaidya on WhatsApp"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#1A3827] to-[#0A160F] border-2 border-[#C2A265] flex items-center justify-center shadow-[0_4px_16px_rgba(194,162,101,0.35)] text-[#FAF7EE] group-hover:scale-105 transition-transform">
            <HeartPulse className="w-5 h-5 text-[#C2A265]" />
          </div>
          <span className="text-[9.5px] font-semibold text-[#D4B678] mt-0.5 tracking-wide">
            Vaidya Desk
          </span>
        </button>

        {/* 4. Cart */}
        <button
          type="button"
          onClick={openCartDrawer}
          className="flex flex-col items-center gap-0.5 text-[10px] relative text-[#A8A295] hover:text-[#C2A265] transition-colors py-1 px-2"
          aria-label="Open Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#C2A265] text-[#0B150F] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-scale-in">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        {/* 5. Dynamic Profile / Sign In */}
        <button
          type="button"
          onClick={handleProfileClick}
          className={`flex flex-col items-center gap-0.5 text-[10px] transition-colors py-1 px-2 ${
            pathname?.startsWith('/account') ? 'text-[#D4B678] font-bold' : 'text-[#A8A295] hover:text-[#D4B678]'
          }`}
          aria-label={isAuthenticated ? 'View Account' : 'Sign In'}
        >
          <User className="w-5 h-5" />
          <span className="truncate max-w-[52px]">
            {isAuthenticated ? (user?.name?.split(' ')[0] || 'Account') : 'Sign In'}
          </span>
        </button>
      </div>
    </nav>
  )
}
