'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Package, MessageSquare, ArrowRight, ShieldCheck, Compass, MapPin } from 'lucide-react'
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
      <div className="container py-24 text-center">
        <div className="w-10 h-10 border-2 border-ayur-gold border-t-transparent rounded-full animate-spin mx-auto" />
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
    <div className="container py-8 sm:py-12 lg:py-14">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-[#1A4D36]/80 border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center relative"
        >
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#F4E295]" />
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/40 animate-ping opacity-25" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#F4E295] text-xs font-medium uppercase tracking-widest mb-4"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Order Authenticated & Recorded
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-heading text-xl sm:text-2xl md:text-3xl font-medium text-[#FAF7EE] mb-2 tracking-tight"
        >
          Namaste, Your Order is Confirmed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[#C5BFB3] text-xs sm:text-sm mb-6 leading-relaxed max-w-lg mx-auto"
        >
          Thank you for choosing Ayur Veda Global. Your confidential order reference is{' '}
          <span className="font-mono font-bold text-[#D4B678] bg-[#0E1E14] px-2.5 py-0.5 rounded-md border border-[#C2A265]/35 inline-block ml-1">
            {orderNumber || 'ORD-PROCESSING'}
          </span>
        </motion.p>

        {/* 4-Day Animated Delivery Tracking Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6"
        >
          <DeliveryTracker4Day
            orderNumber={orderNumber}
            createdAt={order?.createdAt}
            currentDay={1}
            shippingCity={order?.shippingAddress?.city || 'Your City'}
          />
        </motion.div>

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 p-4 rounded-2xl bg-[#102016] border border-[#C2A265]/25 text-left space-y-2.5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#C2A265]/15">
              <span className="text-[11px] uppercase tracking-wider text-[#C2A265] font-semibold">Order Summary</span>
              <span className="text-xs font-bold text-[#FAF7EE]">{formatINR(order.total)}</span>
            </div>
            <div className="space-y-1.5 text-xs text-[#A8A295]">
              {(order.items || []).map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="text-[#FAF7EE]">{formatINR(item.total || item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            {order.shippingAddress && (
              <div className="pt-2 border-t border-[#C2A265]/15 flex items-center gap-1.5 text-[11px] text-[#D4B678]">
                <MapPin className="w-3.5 h-3.5 text-[#C2A265] flex-shrink-0" />
                <span>
                  Delivering to: {order.shippingAddress.addressLine1}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                </span>
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-4 mb-10 text-left"
        >
          <div className="p-5 rounded-2xl glass-luxury-card border border-[#D4AF37]/25 flex flex-col justify-between">
            <Package className="w-8 h-8 text-[#D4AF37] mb-3" />
            <div>
              <h3 className="font-serif text-base font-medium text-white mb-1">Apothecary Prepared</h3>
              <p className="text-[#8A9B8F] text-xs leading-relaxed">Formulation being inspected & securely packaged</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl glass-luxury-card border border-[#D4AF37]/25 flex flex-col justify-between">
            <MessageSquare className="w-8 h-8 text-emerald-400 mb-3" />
            <div>
              <h3 className="font-serif text-base font-medium text-white mb-1">WhatsApp Concierge</h3>
              <p className="text-[#8A9B8F] text-xs leading-relaxed">Coordinate dispatch, tracking, and live updates</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl glass-luxury-card border border-[#D4AF37]/25 flex flex-col justify-between">
            <Compass className="w-8 h-8 text-[#F4E295] mb-3" />
            <div>
              <h3 className="font-serif text-base font-medium text-white mb-1">Discreet Express</h3>
              <p className="text-[#8A9B8F] text-xs leading-relaxed">Tamper-evident, 100% confidential courier transit</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="whatsapp"
            size="lg"
            onClick={handleWhatsAppShare}
            className="flex-1 justify-center py-3.5 shadow-lg shadow-[#25D366]/10"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Open WhatsApp Concierge
          </Button>
          <Link href="/shop" className="flex-1">
            <Button variant="outline" size="lg" className="w-full justify-center py-3.5 border-[#D4AF37]/40 text-[#FAF7EE] hover:bg-[#D4AF37]/10">
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 p-4 rounded-xl bg-[#061B12]/80 border border-[#D4AF37]/20 max-w-lg mx-auto text-xs text-[#8A9B8F] leading-relaxed"
        >
          Need to monitor your package in real-time? Track anytime using your phone or order ID at{' '}
          <Link href="/track-order" className="text-[#F4E295] underline underline-offset-4 hover:text-white transition-colors">
            Order Tracking Portal
          </Link>
          .
        </motion.div>
      </div>
    </div>
  )
}