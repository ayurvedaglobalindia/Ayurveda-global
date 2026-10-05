'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Package, Heart, Truck, Shield, MessageCircle, ArrowRight, Clock, CheckCircle2, ChevronRight } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUserStore } from '@/store/userStore'
import { formatINR } from '@/lib/utils/formatters'

export default function AccountPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const { items: wishlistItems } = useWishlistStore()
  const { user } = useUserStore()

  useEffect(() => {
    setIsMounted(true)
    let allOrders: any[] = [...(useUserStore.getState().recentOrders || [])]
    try {
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('ayur_orders') || '[]')
        allOrders = [...allOrders, ...stored]
      }
    } catch {}

    const uniqueOrders = allOrders.filter(
      (v, i, a) => a.findIndex(t => (t.id === v.id || t.orderNumber === v.orderNumber)) === i
    )
    setOrders(uniqueOrders)
  }, [])

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <div className="container py-6 sm:py-8 lg:py-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#999999]/30">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FFFFFF] border border-[#999999]/30 flex items-center justify-center text-[#4E5F52] shadow-xs flex-shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] block">
                Apothecary Patron Desk
              </span>
              <h1 className="font-heading text-xl sm:text-2xl font-normal text-[#1C1D1F]">
                {user?.name ? user.name : 'Orders & Dispatch Hub'}
              </h1>
              <p className="text-xs text-[#737373] mt-0.5 font-sans">
                Real-time parcel tracking, order history, and direct Ayurvedic concierge guidance
              </p>
            </div>
          </div>

          <Link
            href="/track-order"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#4E5F52] bg-[#EFF4F0] text-[#4E5F52] text-xs font-medium uppercase tracking-wider hover:bg-[#4E5F52] hover:text-white transition-all self-start sm:self-center shadow-xs"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Track Any Parcel</span>
          </Link>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          <Link
            href="/track-order"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 hover:border-[#4E5F52] transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#4E5F52] flex items-center justify-center border border-[#999999]/30">
                <Truck className="w-4 h-4" />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#4E5F52] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <h2 className="font-heading text-xs sm:text-sm font-medium text-[#1C1D1F]">Live Parcel Tracking</h2>
              <p className="text-[11px] text-[#737373] mt-0.5 font-sans">Track BlueDart / Delhivery dispatch status</p>
            </div>
          </Link>

          <Link
            href="/orders"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 hover:border-[#4E5F52] transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#4E5F52] flex items-center justify-center border border-[#999999]/30">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#1C1D1F] border border-[#999999]/30">
                {isMounted ? orders.length : 0} Orders
              </span>
            </div>
            <div>
              <h2 className="font-heading text-xs sm:text-sm font-medium text-[#1C1D1F]">Order History</h2>
              <p className="text-[11px] text-[#737373] mt-0.5 font-sans">All orders placed from this device</p>
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="p-4 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 hover:border-[#4E5F52] transition-all group flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#4E5F52] flex items-center justify-center border border-[#999999]/30">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#1C1D1F] border border-[#999999]/30">
                {isMounted ? wishlistItems.length : 0}
              </span>
            </div>
            <div>
              <h2 className="font-heading text-xs sm:text-sm font-medium text-[#1C1D1F]">Saved Wishlist</h2>
              <p className="text-[11px] text-[#737373] mt-0.5 font-sans">Formulations saved for future orders</p>
            </div>
          </Link>
        </div>

        {/* Recent Orders Section */}
        <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#999999]/30 mb-6 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#999999]/30">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] block">
                Recent Dispatches
              </span>
              <h2 className="font-heading text-sm sm:text-base font-medium text-[#1C1D1F]">
                Orders on This Device
              </h2>
            </div>
            <Link
              href="/orders"
              className="text-xs font-medium text-[#4E5F52] hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isMounted && orders.length > 0 ? (
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => {
                const dateStr = order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Recent'
                const orderNum = order.orderNumber || order.id

                return (
                  <div
                    key={order.id}
                    className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#999999]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[#1C1D1F]">
                          #{orderNum}
                        </span>
                        <span className="text-[9.5px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30">
                          {order.status || 'Confirmed'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#737373]">
                        {dateStr} • {order.items?.length || 1} formulation(s) • Total: <strong className="text-[#1C1D1F]">{formatINR(order.total)}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <Link
                        href={`/orders/${order.id}`}
                        className="px-3 py-1.5 rounded-lg border border-[#999999]/30 bg-[#FFFFFF] text-[#1C1D1F] text-xs font-medium hover:border-[#1C1D1F] transition-colors"
                      >
                        Order Details
                      </Link>
                      <Link
                        href={`/track-order?order=${orderNum}`}
                        className="px-3 py-1.5 rounded-lg bg-[#4E5F52] hover:bg-[#3D4D40] text-white text-xs font-medium transition-colors inline-flex items-center gap-1 shadow-xs"
                      >
                        <Truck className="w-3 h-3" />
                        <span>Track</span>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-8 text-center space-y-2">
              <Package className="w-8 h-8 text-[#999999] mx-auto" />
              <p className="text-xs text-[#737373]">
                No recorded orders on this browser yet.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#4E5F52] hover:underline pt-1"
              >
                <span>Browse Classical Rasayana Formulations</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Support & WhatsApp Desk */}
        <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#EFF4F0] text-[#4E5F52] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield className="w-4 h-4" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h2 className="font-heading text-sm font-medium text-[#1C1D1F]">
                Direct Ayurvedic Concierge &amp; Order Support
              </h2>
              <p className="text-xs text-[#555555] leading-relaxed font-sans">
                Need urgent modifications to your delivery address, advice on herbal dosage protocols, or instant Cash on Delivery verification? Reach our senior Vaidya concierge directly on WhatsApp.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20need%20assistance%20with%20my%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] text-xs font-medium uppercase tracking-wider transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#4E5F52]" />
                  <span>Chat on WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
