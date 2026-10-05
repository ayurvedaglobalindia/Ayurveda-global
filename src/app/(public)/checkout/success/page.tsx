'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Package, MessageSquare, ArrowRight, ShieldCheck, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useUIStore } from '@/store/uiStore'
import { useUserStore } from '@/store/userStore'
import { buildWhatsAppUrl, buildOrderWhatsAppMessage } from '@/store/whatsappStore'
import { formatINR } from '@/lib/utils/formatters'
import { DeliveryTracker4Day } from '@/components/checkout/DeliveryTracker4Day'

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#FAF7F2] min-h-screen container py-24 text-center">
        <div className="w-8 h-8 border-2 border-[#1C1D1F] border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}

function CheckoutSuccessContent() {
  const { closeCartDrawer } = useUIStore()
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order') || searchParams.get('orderNumber') || 'ORD-PROCESSING'
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    closeCartDrawer()
    let allOrders: any[] = [...(useUserStore.getState().recentOrders || [])]
    try {
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('ayur_orders') || '[]')
        allOrders = [...allOrders, ...stored]
      }
    } catch {}

    const found = allOrders.find(
      (o: any) => o.id === orderNumber || o.orderNumber === orderNumber
    )
    if (found) {
      setOrder(found)
    }
  }, [orderNumber, closeCartDrawer])

  const handleWhatsAppShare = () => {
    const customerName = order?.shippingAddress
      ? `${order.shippingAddress.firstName || ''} ${order.shippingAddress.lastName || ''}`.trim()
      : ''
    const message = buildOrderWhatsAppMessage({
      orderId: orderNumber || 'PENDING',
      orderNumber: orderNumber || 'PENDING',
      customerName: customerName || 'Valued Client',
      customerPhone: order?.shippingAddress?.phone || '',
      shippingAddress: order?.shippingAddress || {
        firstName: '',
        lastName: '',
        addressLine1: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
      },
      items: order?.items || [],
      subtotal: order?.subtotal || order?.total || 0,
      shipping: order?.shipping || 0,
      tax: 0,
      discount: order?.discount || 0,
      total: order?.total || 0,
      paymentMethod: order?.paymentMethod || 'whatsapp',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] py-8 sm:py-12 lg:py-16">
      <div className="container max-w-2xl mx-auto text-center">
        
        <div className="w-14 h-14 rounded-full bg-[#FFFFFF] border border-[#999999]/30 text-[#4E5F52] flex items-center justify-center mx-auto mb-4 shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-mono tracking-[0.2em] text-[#4E5F52] uppercase block mb-1">
          Order Recorded &amp; Scheduled
        </span>

        <h1 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F] mb-2 tracking-tight">
          Namaste, Your Order is Confirmed
        </h1>

        <p className="text-[#555555] text-xs sm:text-sm mb-6 leading-relaxed max-w-lg mx-auto font-sans">
          Thank you for choosing Ayur Veda Global. Your order reference is{' '}
          <span className="font-mono font-medium text-[#1C1D1F] bg-[#FFFFFF] px-2.5 py-0.5 rounded border border-[#999999]/30 inline-block ml-1">
            {orderNumber || 'ORD-PROCESSING'}
          </span>
        </p>

        {/* 4-Day Delivery Tracker */}
        <div className="mb-6">
          <DeliveryTracker4Day
            orderNumber={orderNumber}
            createdAt={order?.createdAt}
            currentDay={1}
            shippingCity={order?.shippingAddress?.city || 'Your City'}
          />
        </div>

        {order && (
          <div className="mb-6 p-5 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 text-left space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#999999]/30">
              <span className="text-xs font-mono uppercase tracking-wider text-[#737373]">Order Summary</span>
              <span className="text-sm font-medium text-[#1C1D1F]">{formatINR(order.total)}</span>
            </div>
            <div className="space-y-1.5 text-xs text-[#555555]">
              {(order.items || []).map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="text-[#1C1D1F] font-medium">{formatINR(item.total || item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            {order.shippingAddress && (
              <div className="pt-2.5 border-t border-[#999999]/30 flex items-center gap-1.5 text-xs text-[#737373]">
                <MapPin className="w-3.5 h-3.5 text-[#4E5F52] flex-shrink-0" />
                <span>
                  Delivering to: {order.shippingAddress.addressLine1}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-3.5 mb-8 text-left">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 shadow-xs">
            <Package className="w-5 h-5 text-[#4E5F52] mb-2" />
            <h3 className="font-heading text-sm font-medium text-[#1C1D1F]">Discreet Parcel</h3>
            <p className="text-[#737373] text-[11px] mt-1 leading-relaxed font-sans">Tamper-evident, plain brown box with zero outer labels</p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 shadow-xs">
            <MessageSquare className="w-5 h-5 text-[#4E5F52] mb-2" />
            <h3 className="font-heading text-sm font-medium text-[#1C1D1F]">WhatsApp Tracking</h3>
            <p className="text-[#737373] text-[11px] mt-1 leading-relaxed font-sans">Receive real-time courier dispatch status and updates</p>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#4E5F52] mb-2" />
            <h3 className="font-heading text-sm font-medium text-[#1C1D1F]">Verified Purity</h3>
            <p className="text-[#737373] text-[11px] mt-1 leading-relaxed font-sans">100% genuine Himalayan botanicals, AYUSH compliant</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleWhatsAppShare}
            className="flex-1 justify-center py-3 bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] text-xs font-medium uppercase tracking-wider"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Confirm via WhatsApp Concierge
          </Button>
          <Link href="/shop" className="flex-1">
            <Button variant="outline" size="lg" className="w-full justify-center py-3 border-[#1C1D1F] text-[#1C1D1F] text-xs font-medium uppercase tracking-wider">
              Browse Formulations
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 max-w-lg mx-auto text-xs text-[#737373] leading-relaxed">
          Need to monitor your parcel in real-time? Track anytime using your phone or order ID at{' '}
          <Link href="/track-order" className="text-[#1C1D1F] underline underline-offset-2 hover:text-[#9E8047] transition-colors">
            Order Tracking Portal
          </Link>
          .
        </div>
      </div>
    </div>
  )
}