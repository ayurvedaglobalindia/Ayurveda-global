'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, Truck, Search, CheckCircle, Clock, XCircle, ArrowRight, Shield, MessageSquare, MapPin } from 'lucide-react'
import { formatDateTime, formatINR, classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useUserStore } from '@/store/userStore'
import { DeliveryTracker4Day } from '@/components/checkout/DeliveryTracker4Day'

const mockTrackingData = {
  'ORD-20241215-ABC1': {
    orderNumber: 'ORD-20241215-ABC1',
    status: 'delivered',
    items: [{ name: 'BODY Essential Nutrition (60 Caps)', quantity: 1, total: 149900 }],
    total: 149900,
    timeline: [
      { status: 'confirmed', date: '2024-12-15T10:30:00Z', note: 'Order confirmed via WhatsApp' },
      { status: 'processing', date: '2024-12-16T09:00:00Z', note: 'Order inspected & packed in discreet unmarked packaging' },
      { status: 'shipped', date: '2024-12-17T14:00:00Z', note: 'Dispatched via BlueDart Express - AWB #BD88920194' },
      { status: 'delivered', date: '2024-12-18T11:30:00Z', note: 'Delivered securely to customer' },
    ],
    trackingNumber: 'BD88920194',
    carrier: 'BlueDart Express',
  },
  'ORD-20241210-XYZ2': {
    orderNumber: 'ORD-20241210-XYZ2',
    status: 'shipped',
    items: [{ name: 'STAYMAX+ Delay Spray (30ml)', quantity: 1, total: 89900 }],
    total: 94800,
    timeline: [
      { status: 'confirmed', date: '2024-12-10T14:20:00Z', note: 'Order confirmed - Cash on Delivery' },
      { status: 'processing', date: '2024-12-11T10:00:00Z', note: 'Formulation prepared in sterile facility' },
      { status: 'shipped', date: '2024-12-12T10:00:00Z', note: 'Shipped via Express Logistics - AWB #EXP4928172' },
    ],
    trackingNumber: 'EXP4928172',
    carrier: 'Express Logistics',
  },
}

const statusConfig = {
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/30', lineColor: 'bg-emerald-500' },
  processing: { label: 'Apothecary Processing', icon: Clock, color: 'text-amber-300 bg-amber-950/80 border border-amber-500/30', lineColor: 'bg-amber-500' },
  shipped: { label: 'In Discreet Transit', icon: Truck, color: 'text-blue-300 bg-blue-950/80 border border-blue-500/30', lineColor: 'bg-blue-500' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'text-ayur-gold-bright bg-ayur-emerald-card border border-ayur-gold/40', lineColor: 'bg-ayur-gold' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-rose-400 bg-rose-950/80 border border-rose-500/30', lineColor: 'bg-rose-500' },
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [contact, setContact] = useState('')
  const [trackedOrder, setTrackedOrder] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTrack = () => {
    setError('')
    const trimmedId = orderId.trim().toUpperCase()
    const trimmedContact = contact.trim().toLowerCase()

    if (!trimmedId && !trimmedContact) {
      setError('Please enter either your Order ID (e.g. ORD-...) or registered Phone/Email.')
      return
    }

    setLoading(true)

    // 1. Gather all stored client orders (userStore + localStorage)
    let allOrders: any[] = [...(useUserStore.getState().recentOrders || [])]
    try {
      if (typeof window !== 'undefined') {
        const localOrders = JSON.parse(localStorage.getItem('ayur_orders') || '[]')
        allOrders = [...allOrders, ...localOrders]
      }
    } catch {}

    // Deduplicate by ID
    const uniqueOrders = allOrders.filter((v, i, a) => a.findIndex(t => (t.id === v.id || t.orderNumber === v.orderNumber)) === i)

    const matched = uniqueOrders.find((o: any) => {
      const idMatch = trimmedId && (
        o.id?.toUpperCase() === trimmedId ||
        o.orderNumber?.toUpperCase() === trimmedId ||
        o.id?.toUpperCase().includes(trimmedId) ||
        o.orderNumber?.toUpperCase().includes(trimmedId)
      )
      const contactMatch = trimmedContact && (
        o.shippingAddress?.phone?.includes(trimmedContact) ||
        o.shippingAddress?.email?.toLowerCase().includes(trimmedContact) ||
        o.customerPhone?.includes(trimmedContact) ||
        o.customerEmail?.toLowerCase().includes(trimmedContact)
      )
      if (trimmedId && trimmedContact) return idMatch || contactMatch
      if (trimmedId) return idMatch
      return contactMatch
    })

    if (matched) {
      setTrackedOrder({
        orderNumber: matched.orderNumber || matched.id,
        status: matched.status || 'confirmed',
        items: (matched.items || []).map((i: any) => ({
          name: i.name || 'Ayurvedic Wellness Product',
          quantity: i.quantity || 1,
          total: i.total || i.price || matched.total,
        })),
        total: matched.total,
        timeline: [
          { status: 'confirmed', date: matched.createdAt, note: `Order confirmed via ${matched.paymentMethod === 'whatsapp' ? 'WhatsApp Concierge' : matched.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Prepaid Express'}` },
          { status: 'processing', date: matched.createdAt, note: 'Formulation authenticated & sealed in tamper-proof discreet box' },
        ],
        trackingNumber: `EXP-${(matched.orderNumber || matched.id).slice(-8)}`,
        carrier: 'BlueDart / Express Logistics India',
      })
      setError('')
      setLoading(false)
      return
    }

    // 2. Check mock orders
    const mockOrder = mockTrackingData[trimmedId as keyof typeof mockTrackingData]
    if (mockOrder) {
      setTrackedOrder(mockOrder)
      setError('')
    } else {
      setTrackedOrder(null)
      setError('Order not found. Please verify your reference number or contact our WhatsApp Concierge desk.')
    }
    setLoading(false)
  }

  if (trackedOrder) {
    const config = statusConfig[trackedOrder.status as keyof typeof statusConfig] || statusConfig.processing
    const StatusIcon = config.icon

    return (
      <div className="container py-5 sm:py-7 lg:py-9">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4 sm:mb-5 text-center space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C2A265]">Live Package Tracking</span>
            <h1 className="font-heading text-lg sm:text-xl md:text-2xl font-medium text-[#FAF7EE]">Order Status</h1>
            <p className="text-xs sm:text-sm text-[#A8A295]">
              Reference #{trackedOrder.orderNumber} is currently{' '}
              <strong className="text-[#D4B678] font-semibold">{config.label}</strong>
            </p>
          </div>

          <div className="card-luxury p-5 sm:p-6 rounded-2xl border border-ayur-gold/30 bg-ayur-charcoal/95 shadow-luxury">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 border-b border-ayur-forest-dark/50 gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold shadow-inner" style={{ background: 'rgba(12, 56, 34, 0.6)' }}>
                <StatusIcon className="w-4 h-4 text-ayur-gold" />
                <span className="text-ayur-ivory">{config.label}</span>
              </div>
              <div className="sm:text-right">
                <p className="text-[11px] text-ayur-stone">Total Amount</p>
                <p className="text-lg sm:text-xl font-bold text-ayur-gold">{formatINR(trackedOrder.total)}</p>
                <p className="text-[11px] text-ayur-stone/80">{trackedOrder.items.length} item{trackedOrder.items.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* 4-Day Animated Delivery Timeline */}
            <div className="my-5">
              <DeliveryTracker4Day
                orderNumber={trackedOrder.orderNumber}
                createdAt={trackedOrder.timeline?.[0]?.date}
                carrier={trackedOrder.carrier}
                trackingNumber={trackedOrder.trackingNumber}
                currentDay={
                  trackedOrder.status === 'delivered'
                    ? 4
                    : trackedOrder.status === 'shipped'
                    ? 3
                    : trackedOrder.status === 'processing'
                    ? 2
                    : 1
                }
              />
            </div>

            <div className="pt-5 border-t border-ayur-forest-dark/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setTrackedOrder(null); setOrderId(''); setContact('') }}
                className="w-full sm:w-auto text-xs border-ayur-gold/40 text-ayur-gold-light"
              >
                <Search className="w-3.5 h-3.5 mr-1.5" /> Track Another Order
              </Button>

              <a
                href={`https://wa.me/919123485451?text=${encodeURIComponent(`Hi Ayur Veda Global, I would like an update on my Order #${trackedOrder.orderNumber}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-500 text-white transition shadow-lg"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Dispatch Support
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5 sm:py-7 lg:py-9">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-4 sm:mb-5 space-y-1.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-ayur-emerald-card border border-ayur-gold/30 flex items-center justify-center shadow-luxury">
            <Package className="w-6 h-6 sm:w-7 sm:h-7 text-ayur-gold" />
          </div>
          <h1 className="font-heading text-lg sm:text-xl md:text-2xl font-medium text-ayur-ivory">Track Your Order</h1>
          <p className="text-xs sm:text-[13px] text-ayur-sand/80 leading-relaxed">
            Enter your Order ID (e.g. AVG-123456) or registered phone number to track your package in real-time.
          </p>
        </div>

        <div className="card-luxury p-5 sm:p-6 rounded-2xl border border-ayur-gold/25 bg-ayur-charcoal/95 space-y-4 shadow-luxury">
          <div>
            <label className="block text-xs font-semibold text-ayur-sand mb-1.5 uppercase tracking-wider">
              Order ID
            </label>
            <Input
              value={orderId}
              onChange={e => setOrderId(e.target.value.toUpperCase())}
              placeholder="ORD-..."
              className="font-mono text-sm"
              autoFocus
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ayur-forest-dark/60" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-ayur-charcoal px-3 text-ayur-stone font-semibold">Or</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ayur-sand mb-1.5 uppercase tracking-wider">
              Registered Phone or Email
            </label>
            <Input
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="e.g. 9123485451 or client@example.com"
              type="text"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs text-center" role="alert">
              {error}
            </div>
          )}

          <Button
            variant="gold"
            size="lg"
            className="w-full font-bold shadow-xl gold-shimmer py-3.5"
            onClick={handleTrack}
            loading={loading}
          >
            <Search className="w-4 h-4 mr-2" /> Track Shipment
          </Button>

          <div className="pt-4 border-t border-ayur-forest-dark/40 text-center space-y-2">
            <p className="text-xs text-ayur-stone">
              Need immediate assistance?{' '}
              <a
                href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20need%20help%20tracking%20my%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="text-ayur-gold hover:underline font-semibold"
              >
                Chat on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}