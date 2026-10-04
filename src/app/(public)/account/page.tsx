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
    <div className="container py-8 sm:py-14 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-ayur-gold/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-950 to-emerald-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
            <User className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-ayur-gold uppercase tracking-wider">
              {isMounted && isAuthenticated ? 'Authenticated Patron' : 'Apothecary Member'}
            </span>
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-ayur-ivory">
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs font-medium hover:bg-rose-900/30 transition-all self-start sm:self-center"
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
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#102016] border border-ayur-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-ayur-gold-light uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
              <span>Unlock Exclusive Member Benefits</span>
            </div>
            <p className="text-xs sm:text-sm text-ayur-cream/90 leading-relaxed max-w-xl">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link
          href="/orders"
          className="card-luxury p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-ayur-stone group-hover:text-emerald-400 transition-colors" />
          </div>
          <div>
            <h2 className="font-semibold text-ayur-ivory text-base">My Orders</h2>
            <p className="text-xs text-ayur-stone mt-1">View past orders and invoices</p>
          </div>
        </Link>

        <Link
          href="/track-order"
          className="card-luxury p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-ayur-stone group-hover:text-emerald-400 transition-colors" />
          </div>
          <div>
            <h2 className="font-semibold text-ayur-ivory text-base">Track Delivery</h2>
            <p className="text-xs text-ayur-stone mt-1">Live order dispatch status</p>
          </div>
        </Link>

        <Link
          href="/wishlist"
          className="card-luxury p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-ayur-gold/20 text-ayur-gold-light border border-ayur-gold/30">
              {wishlistItems.length}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-ayur-ivory text-base">Saved Wishlist</h2>
            <p className="text-xs text-ayur-stone mt-1">Products saved for later</p>
          </div>
        </Link>
      </div>

      <div className="card-luxury p-5 sm:p-6 rounded-3xl border border-emerald-500/20 mb-8">
        <h2 className="font-heading text-base sm:text-lg font-semibold text-ayur-ivory mb-2.5 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span>Ayurvedic Wellness Support Desk</span>
        </h2>
        <p className="text-xs sm:text-sm text-ayur-stone leading-relaxed mb-4">
          Need assistance with dosage recommendations, order delivery confirmation, or Cash on Delivery inquiries? Our team is available on WhatsApp.
        </p>
        <a
          href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20need%20help%20with%20my%20account%20or%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-emerald-300 text-xs font-semibold hover:bg-[#25D366]/30 transition-all"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span>Chat on WhatsApp Support Desk</span>
        </a>
      </div>
    </div>
  )
}
