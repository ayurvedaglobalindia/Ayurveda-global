'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, Truck, Search, CheckCircle2, Clock, XCircle, MessageSquare } from 'lucide-react'
import { formatINR } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
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
      { status: 'delivered', date: '2024-12-18T11:30:00Z', note: 'Delivered securely to patron' },
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
      { status: 'processing', date: '2024-12-11T10:00:00Z', note: 'Formulation prepared in certified facility' },
      { status: 'shipped', date: '2024-12-12T10:00:00Z', note: 'Shipped via Express Logistics - AWB #EXP4928172' },
    ],
    trackingNumber: 'EXP4928172',
    carrier: 'Express Logistics',
  },
}

const statusConfig = {
  confirmed: { label: 'Confirmed', icon: CheckCircle2, color: 'text-[#4E5F52]' },
  processing: { label: 'In Preparation', icon: Clock, color: 'text-[#9E8047]' },
  shipped: { label: 'In Discreet Transit', icon: Truck, color: 'text-[#1C1D1F]' },
  delivered: { label: 'Delivered', icon: CheckCircle2, color: 'text-[#4E5F52]' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-rose-600' },
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
      setError('Please enter either your Order ID (e.g. AVG-123456) or registered Mobile Number.')
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
      setTrackedOrder(matched)
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
      <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] py-8 sm:py-12">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-6 text-center space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#737373]">Live Package Tracking</span>
            <h1 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">Order Status</h1>
            <p className="text-xs text-[#555555]">
              Reference #{trackedOrder.orderNumber || trackedOrder.id} is currently{' '}
              <strong className="text-[#1C1D1F] font-medium">{config.label}</strong>
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-[#999999]/30 bg-[#FFFFFF] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#999999]/30 gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#999999]/30 text-xs font-mono">
                <StatusIcon className={`w-3.5 h-3.5 ${config.color}`} />
                <span className="text-[#1C1D1F]">{config.label}</span>
              </div>
              <div className="sm:text-right">
                <p className="text-[11px] font-mono text-[#737373]">Total Amount</p>
                <p className="text-base font-medium text-[#1C1D1F]">{formatINR(trackedOrder.total)}</p>
                <p className="text-[11px] text-[#737373]">{trackedOrder.items?.length || 1} item(s)</p>
              </div>
            </div>

            {/* 4-Day Delivery Timeline */}
            <div className="my-6">
              <DeliveryTracker4Day
                orderNumber={trackedOrder.orderNumber || trackedOrder.id}
                createdAt={trackedOrder.timeline?.[0]?.date || trackedOrder.createdAt}
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

            <div className="pt-5 border-t border-[#999999]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setTrackedOrder(null); setOrderId(''); setContact('') }}
                className="w-full sm:w-auto text-xs border-[#1C1D1F] text-[#1C1D1F] hover:bg-[#FAF7F2]"
              >
                <Search className="w-3.5 h-3.5 mr-1.5" /> Track Another Order
              </Button>

              <a
                href={`https://wa.me/919123485451?text=${encodeURIComponent(`Hi Ayur Veda Global, I would like an update on my Order #${trackedOrder.orderNumber || trackedOrder.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] transition shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Dispatch Desk
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] py-8 sm:py-12">
      <div className="container max-w-md mx-auto">
        <div className="text-center mb-6 space-y-1">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#FFFFFF] border border-[#999999]/30 flex items-center justify-center text-[#4E5F52] shadow-xs mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-normal text-[#1C1D1F]">Track Your Order</h1>
          <p className="text-xs text-[#555555] leading-relaxed font-sans">
            Enter your Order ID (e.g. AVG-123456) or registered mobile number to track dispatch in real-time.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[#999999]/30 bg-[#FFFFFF] space-y-4 shadow-xs">
          <div>
            <Input
              label="Order ID / Reference Number"
              placeholder="e.g. AVG-123456"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>

          <div className="text-center text-[11px] font-mono text-[#737373]">— OR —</div>

          <div>
            <Input
              label="Registered Phone Number"
              placeholder="10-digit mobile number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 font-sans">{error}</p>
          )}

          <div className="pt-2">
            <Button
              variant="primary"
              onClick={handleTrack}
              disabled={loading}
              loading={loading}
              className="w-full py-2.5 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] text-xs font-medium uppercase tracking-wider shadow-xs"
            >
              <Search className="w-3.5 h-3.5 mr-2" />
              Check Delivery Status
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-[#737373] space-y-2">
          <p>Need urgent assistance with order modifications?</p>
          <a
            href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20need%20help%20tracking%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#1C1D1F] hover:text-[#9E8047] font-medium transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#4E5F52]" />
            <span>Connect with WhatsApp Dispatch Desk</span>
          </a>
        </div>
      </div>
    </div>
  )
}