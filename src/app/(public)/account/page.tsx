'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { User, Package, Heart, Truck, Shield, MessageCircle, ArrowRight, LogOut, LogIn } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { Button } from '@/components/ui/Button'

export default function AccountPage() {
  const [isMounted, setIsMounted] = useState(false)
  const { items: wishlistItems } = useWishlistStore()
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
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <div className="container py-6 sm:py-8 lg:py-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#E2DDD5]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FFFFFF] border border-[#E2DDD5] flex items-center justify-center text-[#4E5F52] shadow-xs flex-shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] block">
                {isMounted && isAuthenticated ? 'Authenticated Patron' : 'Apothecary Guest'}
              </span>
              <h1 className="font-heading text-xl sm:text-2xl font-normal text-[#1C1D1F]">
                {isMounted && isAuthenticated && user?.name ? user.name : 'My Account'}
              </h1>
              <p className="text-xs text-[#737373] mt-0.5 font-sans">
                {isMounted && isAuthenticated && user?.phone
                  ? `Registered Mobile: +91 ${user.phone}`
                  : 'Manage your formulations, saved favorites, and track parcels'}
              </p>
            </div>
          </div>

          {isMounted && isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E2DDD5] bg-[#FFFFFF] text-[#737373] hover:text-[#1C1D1F] hover:border-[#1C1D1F] text-xs font-mono uppercase tracking-wider transition-colors self-start sm:self-center"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenAuth}
              className="self-start sm:self-center text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-full bg-[#1C1D1F] text-[#FAF7F2]"
            >
              <LogIn className="w-3.5 h-3.5 mr-1.5" />
              <span>Sign In / Register</span>
            </Button>
          )}
        </div>

        {/* Guest Notice Banner if Not Authenticated */}
        {isMounted && !isAuthenticated && (
          <div className="mb-6 p-5 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-[#9E8047]">
                Patron Access
              </div>
              <p className="text-xs text-[#555555] leading-relaxed max-w-xl font-sans">
                Sign in with your mobile number to unlock saved cart items, real-time parcel dispatch tracking, and direct Ayurvedic consultation desk access.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenAuth}
              className="text-xs font-medium uppercase tracking-wider whitespace-nowrap px-4 py-2 rounded-full bg-[#1C1D1F] text-[#FAF7F2] flex-shrink-0"
            >
              Sign In with Mobile
            </Button>
          </div>
        )}

        {/* Navigation Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Link
            href="/orders"
            className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#1C1D1F] transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#4E5F52] flex items-center justify-center border border-[#E2DDD5]">
                <Package className="w-4 h-4" />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#1C1D1F] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h2 className="font-heading text-sm font-medium text-[#1C1D1F]">My Orders</h2>
              <p className="text-[11px] text-[#737373] mt-0.5 font-sans">View past orders and invoices</p>
            </div>
          </Link>

          <Link
            href="/track-order"
            className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#1C1D1F] transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#4E5F52] flex items-center justify-center border border-[#E2DDD5]">
                <Truck className="w-4 h-4" />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#1C1D1F] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h2 className="font-heading text-sm font-medium text-[#1C1D1F]">Track Delivery</h2>
              <p className="text-[11px] text-[#737373] mt-0.5 font-sans">Live parcel dispatch status</p>
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#1C1D1F] transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#4E5F52] flex items-center justify-center border border-[#E2DDD5]">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#1C1D1F] border border-[#E2DDD5]">
                {wishlistItems.length}
              </span>
            </div>
            <div>
              <h2 className="font-heading text-sm font-medium text-[#1C1D1F]">Saved Wishlist</h2>
              <p className="text-[11px] text-[#737373] mt-0.5 font-sans">Formulations saved for later</p>
            </div>
          </Link>
        </div>

        {/* Support Card */}
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] mb-6 shadow-xs">
          <h2 className="font-heading text-sm font-medium text-[#1C1D1F] mb-1.5 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#4E5F52]" />
            <span>Ayurvedic Guidance &amp; Support Desk</span>
          </h2>
          <p className="text-xs text-[#555555] leading-relaxed mb-3 font-sans">
            Need assistance with dosage recommendations, order delivery confirmation, or Cash on Delivery inquiries? Our team is available on WhatsApp.
          </p>
          <a
            href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20need%20help%20with%20my%20account%20or%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E2DDD5] bg-[#FFFFFF] text-[#1C1D1F] hover:border-[#1C1D1F] text-xs font-mono uppercase tracking-wider transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#4E5F52]" />
            <span>Chat on WhatsApp Support Desk</span>
          </a>
        </div>

      </div>
    </div>
  )
}
