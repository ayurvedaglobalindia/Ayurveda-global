'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Package, Truck, Search, CheckCircle, Clock, XCircle, ArrowRight } from 'lucide-react'
import { formatDateTime, formatINR } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

const mockTrackingData = {
  'ORD-20241215-ABC1': {
    orderNumber: 'ORD-20241215-ABC1',
    status: 'delivered',
    items: [{ name: 'BODY Essential Nutrition', quantity: 1, total: 149900 }],
    total: 149900,
    timeline: [
      { status: 'confirmed', date: '2024-12-15T10:30:00Z', note: 'Order confirmed via WhatsApp' },
      { status: 'processing', date: '2024-12-16T09:00:00Z', note: 'Order being prepared' },
      { status: 'shipped', date: '2024-12-17T14:00:00Z', note: 'Shipped via BlueDart - Tracking: BD123456789' },
      { status: 'delivered', date: '2024-12-18T11:30:00Z', note: 'Delivered to customer' },
    ],
    trackingNumber: 'BD123456789',
    carrier: 'BlueDart',
  },
  'ORD-20241210-XYZ2': {
    orderNumber: 'ORD-20241210-XYZ2',
    status: 'shipped',
    items: [{ name: 'STAYMAX+ Delay Spray', quantity: 1, total: 89900 }],
    total: 94800,
    timeline: [
      { status: 'confirmed', date: '2024-12-10T14:20:00Z', note: 'Order confirmed - Cash on Delivery' },
      { status: 'processing', date: '2024-12-11T10:00:00Z', note: 'Order being prepared' },
      { status: 'shipped', date: '2024-12-12T10:00:00Z', note: 'Shipped via DTDC - Tracking: DTDC987654321' },
    ],
    trackingNumber: 'DTDC987654321',
    carrier: 'DTDC',
  },
}

const statusConfig = {
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'bg-blue-100 text-blue-700', lineColor: 'bg-blue-500' },
  processing: { label: 'Processing', icon: Clock, color: 'bg-amber-100 text-amber-700', lineColor: 'bg-amber-500' },
  shipped: { label: 'Shipped', icon: Truck, color: 'bg-purple-100 text-purple-700', lineColor: 'bg-purple-500' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'bg-green-100 text-green-700', lineColor: 'bg-green-500' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-red-100 text-red-700', lineColor: 'bg-red-500' },
}


export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [contact, setContact] = useState('')
  const [trackedOrder, setTrackedOrder] = useState<typeof mockTrackingData[keyof typeof mockTrackingData] | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTrack = async () => {
    setError('')
    if (!orderId.trim() || !contact.trim()) {
      setError('Please enter both Order ID and email/phone')
      return
    }

    setLoading(true)
    const trimmedId = orderId.trim()
    const trimmedContact = contact.trim().toLowerCase()

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(trimmedId)}`)
      if (res.ok) {
        const order = await res.json()
        const orderPhone = (order.customer_phone || '').toLowerCase()
        const orderEmail = (order.customer_email || '').toLowerCase()

        if (orderPhone.includes(trimmedContact) || orderEmail.includes(trimmedContact) || trimmedContact.includes(orderPhone)) {
          let items = []
          try {
            items = typeof order.items_json === 'string' ? JSON.parse(order.items_json) : (order.items || [])
          } catch {
            items = []
          }

          const status = (order.order_status || 'confirmed') as keyof typeof statusConfig
          const statusKeys: Array<keyof typeof statusConfig> = ['confirmed', 'processing', 'shipped', 'delivered']
          const currentIndex = statusKeys.indexOf(status)

          const timeline = statusKeys
            .filter((_, idx) => idx <= (currentIndex >= 0 ? currentIndex : 0))
            .map((s, idx) => ({
              status: s,
              date: idx === 0 ? order.created_at : order.updated_at,
              note: s === 'confirmed' ? `Order confirmed (${order.payment_method === 'whatsapp' ? 'WhatsApp' : 'Cash on Delivery'})` :
                    s === 'processing' ? 'Order is being packaged and prepared for dispatch' :
                    s === 'shipped' ? 'Dispatched via express courier' : 'Successfully delivered',
            }))

          setTrackedOrder({
            orderNumber: order.order_number || order.id,
            status,
            items: items.map((i: any) => ({
              name: i.name || i.productName || 'Ayurvedic Wellness Product',
              quantity: i.quantity || 1,
              total: i.total || i.price || order.total_amount,
            })),
            total: order.total_amount,
            timeline,
            trackingNumber: `EXP-${(order.order_number || order.id).slice(-8)}`,
            carrier: 'BlueDart / Express Logistics',
          })
          setLoading(false)
          return
        }
      }
    } catch {
      // Continue to mock fallback
    }

    // Fallback to sample mock data if matching
    const mockOrder = mockTrackingData[trimmedId as keyof typeof mockTrackingData]
    if (mockOrder) {
      setTrackedOrder(mockOrder)
      setError('')
    } else {
      setTrackedOrder(null)
      setError('Order not found. Please verify your Order ID and contact details.')
    }
    setLoading(false)
  }

  if (trackedOrder) {
    const config = statusConfig[trackedOrder.status]
    const StatusIcon = config.icon

    return (
      <div className="container py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black mb-4">Order Tracking</h1>
            <p className="text-ayur-stone">Your order #{trackedOrder.orderNumber} is currently <strong className="text-ayur-black">{config.label}</strong></p>
          </div>

          <div className="bg-white border border-ayur-beige rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Badge variant={trackedOrder.status as any} className="text-base px-4 py-2">
                  <StatusIcon className="w-4 h-4 mr-2" />
                  {config.label}
                </Badge>
              </div>
              <div className="text-right">
                <p className="font-medium text-ayur-black">{formatINR(trackedOrder.total)}</p>
                <p className="text-sm text-ayur-stone">{trackedOrder.items.length} item{trackedOrder.items.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            {trackedOrder.trackingNumber && (
              <div className="bg-ayur-cream rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ayur-stone">Tracking Number</p>
                    <p className="font-mono font-medium text-ayur-black">{trackedOrder.trackingNumber}</p>
                  </div>
                  <p className="text-sm text-ayur-stone">Carrier: {trackedOrder.carrier}</p>
                </div>
              </div>
            )}

            <h2 className="font-heading text-xl font-medium text-ayur-black mb-6">Delivery Timeline</h2>
            <div className="relative pl-6 border-l-2 border-ayur-beige">
              {trackedOrder.timeline.map((event, index) => {
                const eventConfig = statusConfig[event.status as keyof typeof statusConfig]
                const EventIcon = eventConfig?.icon || Clock
                const isLast = index === trackedOrder.timeline.length - 1
                const isCurrent = event.status === trackedOrder.status

                return (
                  <div key={event.date} className="relative pb-8 last:pb-0">
                    <div className="absolute left-[-14px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white z-10">
                      <div className={classNames(
                        'w-2.5 h-2.5 rounded-full',
                        isCurrent ? eventConfig.lineColor.replace('bg-', 'bg-') : 'bg-ayur-beige'
                      )} />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-start gap-3">
                        <div className={classNames(
                          'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                          isCurrent ? eventConfig.lineColor.replace('bg-', 'bg-') : 'bg-ayur-beige'
                        )}>
                          <EventIcon className={classNames('w-5 h-5', isCurrent ? 'text-white' : 'text-ayur-stone')} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-ayur-black">{eventConfig?.label || event.status}</p>
                          <p className="text-sm text-ayur-stone">{event.note}</p>
                          <p className="text-xs text-ayur-sand mt-1">{formatDateTime(event.date)}</p>
                        </div>
                      </div>
                      {!isLast && (
                        <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-ayur-beige" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" onClick={() => { setTrackedOrder(null); setOrderId(''); setContact('') }}>
                <Search className="w-4 h-4 mr-2" />
                Track Another Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 lg:py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-ayur-cream flex items-center justify-center">
            <Package className="w-10 h-10 text-ayur-forest" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black mb-4">Track Your Order</h1>
          <p className="text-ayur-stone">Enter your Order ID and registered email or phone number to track your delivery</p>
        </div>

        <div className="bg-white border border-ayur-beige rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <Input
              label="Order ID"
              value={orderId}
              onChange={e => setOrderId(e.target.value.toUpperCase())}
              placeholder="ORD-20241215-ABC1"
              error={error && !trackedOrder ? error : undefined}
              autoFocus
            />
          </div>
          <div>
            <Input
              label="Email or Phone"
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="john@example.com or +91 98765 43210"
              type="text"
            />
          </div>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleTrack}
            loading={loading}
          >
            <Search className="w-5 h-5 mr-2" />
            Track Order
          </Button>

          {error && !trackedOrder && (
            <p className="text-center text-ayur-copper text-sm" role="alert">{error}</p>
          )}

          <div className="pt-6 border-t border-ayur-beige">
            <p className="text-center text-sm text-ayur-stone">
              Can't find your order?{' '}
              <a href="/contact" className="text-ayur-forest hover:text-ayur-gold underline font-medium">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}