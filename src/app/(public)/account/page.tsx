'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { User, Package, Heart, Truck, Shield, MessageCircle, ArrowRight, LogOut, Sparkles, LogIn } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { Button } from '@/components/ui/Button'

export default function AccountPage() {
  const [isMounted, setIsMounted] = useState(false)
  const { items: wishlistItems } = useWishlistStore()
  const { getItemCount: getCartCount } = useCartStore()
  const { user, isAuthenticated, logout } = useUserStore()
  const { openModal, showToast } = useUIStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    showToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been signed out of your account.',
    })
  }

  const handleOpenAuth = () => {
    openModal('auth-gate')
  }

  return (
    <div className="container py-5 sm:py-7 lg:py-9 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 mb-5 pb-4 sm:pb-5 border-b border-ayur-gold/20">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-950 to-emerald-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg flex-shrink-0">
            <User className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-ayur-gold uppercase tracking-wider">
              {isMounted && isAuthenticated ? 'Authenticated Patron' : 'Apothecary Member'}
            </span>
            <h1 className="font-heading text-lg sm:text-xl md:text-2xl font-semibold text-ayur-ivory">
              {isMounted && isAuthenticated && user?.name ? user.name : 'My Account'}
            </h1>
            <p className="text-xs text-ayur-stone mt-0.5">
              {isMounted && isAuthenticated && user?.phone
                ? `Registered Mobile: +91 ${user.phone}`
                : 'Manage your orders, saved favorites, and track parcels'}
            </p>
          </div>
        </div>

        {isMounted && isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs font-medium hover:bg-rose-900/30 transition-all self-start sm:self-center"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        ) : (
          <Button
            variant="gold"
            size="sm"
            onClick={handleOpenAuth}
            className="self-start sm:self-center text-xs font-bold shadow-md gold-shimmer"
          >
            <LogIn className="w-3.5 h-3.5 mr-1.5" />
            <span>Sign In / Register</span>
          </Button>
        )}
      </div>

      {/* Guest Notice Banner if Not Authenticated */}
      {isMounted && !isAuthenticated && (
        <div className="mb-5 sm:mb-6 p-4 sm:p-5 rounded-2xl bg-[#102016] border border-ayur-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-ayur-gold-light uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
              <span>Unlock Exclusive Member Benefits</span>
            </div>
            <p className="text-xs sm:text-[13px] text-ayur-cream/90 leading-relaxed max-w-xl">
              Sign in or create your member profile with your mobile number to unlock saved cart items, 4-Day BlueDart Express dispatch tracking, and direct Ayurvedic consultation desk access.
            </p>
          </div>
          <Button
            variant="gold"
            size="md"
            onClick={handleOpenAuth}
            className="text-xs font-bold whitespace-nowrap shadow-lg flex-shrink-0"
          >
            Sign In / Register Now
          </Button>
        </div>
      )}

      {/* Grid of Navigation Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-5 sm:mb-6">
        <Link
          href="/orders"
          className="card-luxury p-4 sm:p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center">
              <Package className="w-4.5 h-4.5" />
            </div>
            <ArrowRight className="w-4 h-4 text-ayur-stone group-hover:text-emerald-400 transition-colors" />
          </div>
          <div>
            <h2 className="font-semibold text-ayur-ivory text-sm sm:text-base">My Orders</h2>
            <p className="text-[11px] text-ayur-stone mt-0.5">View past orders and invoices</p>
          </div>
        </Link>

        <Link
          href="/track-order"
          className="card-luxury p-4 sm:p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center">
              <Truck className="w-4.5 h-4.5" />
            </div>
            <ArrowRight className="w-4 h-4 text-ayur-stone group-hover:text-emerald-400 transition-colors" />
          </div>
          <div>
            <h2 className="font-semibold text-ayur-ivory text-sm sm:text-base">Track Delivery</h2>
            <p className="text-[11px] text-ayur-stone mt-0.5">Live order dispatch status</p>
          </div>
        </Link>

        <Link
          href="/wishlist"
          className="card-luxury p-4 sm:p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center">
              <Heart className="w-4.5 h-4.5" />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-ayur-gold/20 text-ayur-gold-light border border-ayur-gold/30">
              {wishlistItems.length}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-ayur-ivory text-sm sm:text-base">Saved Wishlist</h2>
            <p className="text-[11px] text-ayur-stone mt-0.5">Products saved for later</p>
          </div>
        </Link>
      </div>

      <div className="card-luxury p-4 sm:p-5 rounded-2xl border border-emerald-500/20 mb-6">
        <h2 className="font-heading text-sm sm:text-base font-semibold text-ayur-ivory mb-2 flex items-center gap-2">
          <Shield className="w-4.5 h-4.5 text-emerald-400" />
          <span>Ayurvedic Wellness Support Desk</span>
        </h2>
        <p className="text-xs sm:text-[13px] text-ayur-stone leading-relaxed mb-3.5">
          Need assistance with dosage recommendations, order delivery confirmation, or Cash on Delivery inquiries? Our team is available on WhatsApp.
        </p>
        <a
          href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20need%20help%20with%20my%20account%20or%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-emerald-300 text-xs font-semibold hover:bg-[#25D366]/30 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          <span>Chat on WhatsApp Support Desk</span>
        </a>
      </div>
    </div>
  )
}
