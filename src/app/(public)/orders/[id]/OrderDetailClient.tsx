'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Package, Truck, CheckCircle2, Clock, XCircle, ArrowLeft, MapPin, Search } from 'lucide-react'
import { formatDate, formatINR as formatPrice } from '@/lib/utils/formatters'
import { useUserStore } from '@/store/userStore'

const mockOrderDetails: Record<string, any> = {
  'ORD-20241215-ABC1': {
    id: 'ORD-20241215-ABC1',
    orderNumber: 'ORD-20241215-ABC1',
    createdAt: '2024-12-15T10:30:00Z',
    status: 'delivered' as const,
    paymentMethod: 'whatsapp' as const,
    subtotal: 149900,
    shipping: 0,
    discount: 0,
    total: 149900,
    items: [
      {
        id: '1',
        name: 'BODY Essential Nutrition',
        quantity: 1,
        price: 149900,
        image: '/images/products/body-essential-nutrition-thumb.jpg',
      },
    ],
    shippingAddress: {
      firstName: 'Vikram',
      lastName: 'Sharma',
      addressLine1: 'Flat 402, Green Glen Layout',
      addressLine2: 'Outer Ring Road, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      phone: '+91 98765 43210',
    },
    timeline: [
      { status: 'confirmed', date: '2024-12-15T10:30:00Z', note: 'Order confirmed via WhatsApp Concierge' },
      { status: 'processing', date: '2024-12-15T14:00:00Z', note: 'Formulation batch inspected and sealed' },
      { status: 'shipped', date: '2024-12-16T09:00:00Z', note: 'Dispatched in plain unmarked parcel - BlueDart Tracking: BD123456789' },
      { status: 'delivered', date: '2024-12-18T15:30:00Z', note: 'Delivered securely to patron' },
    ],
  },
  'ORD-20241210-XYZ2': {
    id: 'ORD-20241210-XYZ2',
    orderNumber: 'ORD-20241210-XYZ2',
    createdAt: '2024-12-10T14:20:00Z',
    status: 'shipped' as const,
    paymentMethod: 'cod' as const,
    subtotal: 89900,
    shipping: 4900,
    discount: 0,
    total: 94800,
    items: [
      {
        id: '2',
        name: 'STAYMAX+ Delay Spray',
        quantity: 1,
        price: 89900,
        image: '/images/products/staymax-delay-spray-thumb.jpg',
      },
    ],
    shippingAddress: {
      firstName: 'Amit',
      lastName: 'Patel',
      addressLine1: 'B-12, Shanti Kunj',
      addressLine2: 'Navrangpura',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380009',
      phone: '+91 98765 12345',
    },
    timeline: [
      { status: 'confirmed', date: '2024-12-10T14:20:00Z', note: 'Order confirmed - Cash on Delivery' },
      { status: 'processing', date: '2024-12-11T10:00:00Z', note: 'Order packaged in discreet brown box' },
      { status: 'shipped', date: '2024-12-12T10:00:00Z', note: 'Dispatched via Express Courier - Tracking: DTDC987654321' },
    ],
  },
  'ORD-20241205-DEF3': {
    id: 'ORD-20241205-DEF3',
    orderNumber: 'ORD-20241205-DEF3',
    createdAt: '2024-12-05T09:15:00Z',
    status: 'processing' as const,
    paymentMethod: 'whatsapp' as const,
    subtotal: 239800,
    shipping: 0,
    discount: 20000,
    total: 219800,
    items: [
      {
        id: '1',
        name: 'BODY Essential Nutrition',
        quantity: 2,
        price: 149900,
        image: '/images/products/body-essential-nutrition-thumb.jpg',
      },
    ],
    shippingAddress: {
      firstName: 'Rahul',
      lastName: 'Verma',
      addressLine1: '15/A, Civil Lines',
      addressLine2: 'Near High Court',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302006',
      phone: '+91 98290 12345',
    },
    timeline: [
      { status: 'confirmed', date: '2024-12-05T09:15:00Z', note: 'Order confirmed' },
      { status: 'processing', date: '2024-12-05T11:00:00Z', note: 'Standardized batch preparation underway' },
    ],
  },
}

const statusConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
  confirmed: { label: 'Confirmed', icon: CheckCircle2, color: 'text-[#4E5F52]', bg: 'bg-[#EFF4F0]' },
  processing: { label: 'Processing', icon: Clock, color: 'text-[#9E8047]', bg: 'bg-[#FAF7F2]' },
  shipped: { label: 'Dispatched', icon: Truck, color: 'text-[#1C1D1F]', bg: 'bg-[#FAF7F2]' },
  delivered: { label: 'Delivered', icon: CheckCircle2, color: 'text-[#4E5F52]', bg: 'bg-[#EFF4F0]' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-rose-700', bg: 'bg-rose-50' },
}

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = (params?.id as string) || ''
  const [order, setOrder] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!orderId) {
      setIsLoaded(true)
      return
    }

    // 1. Direct mock lookup
    if (mockOrderDetails[orderId]) {
      setOrder(mockOrderDetails[orderId])
      setIsLoaded(true)
      return
    }

    // 2. Client stored order lookup (userStore + localStorage)
    let allOrders: any[] = [...(useUserStore.getState().recentOrders || [])]
    try {
      if (typeof window !== 'undefined') {
        const local = JSON.parse(localStorage.getItem('ayur_orders') || '[]')
        allOrders = [...allOrders, ...local]
      }
    } catch {}

    const found = allOrders.find(
      (o: any) =>
        o.id === orderId ||
        o.orderNumber === orderId ||
        o.id?.toUpperCase() === orderId.toUpperCase() ||
        o.orderNumber?.toUpperCase() === orderId.toUpperCase()
    )

    if (found) {
      const orderDate = found.createdAt || new Date().toISOString()
      const formatted = {
        id: found.id || orderId,
        orderNumber: found.orderNumber || found.id || orderId,
        createdAt: orderDate,
        status: found.status || 'confirmed',
        paymentMethod: found.paymentMethod || 'cod',
        subtotal: found.subtotal || found.total,
        shipping: found.shipping || 0,
        discount: found.discount || 0,
        total: found.total,
        items: (found.items || []).map((it: any, idx: number) => ({
          id: it.id || it.productId || String(idx),
          name: it.name || it.productName || 'Ayurvedic Formulation',
          quantity: it.quantity || 1,
          price: it.price || 0,
          image: it.image || '/images/products/body-essential-nutrition-thumb.jpg',
        })),
        shippingAddress: found.shippingAddress || {
          firstName: 'Customer',
          lastName: 'Patron',
          addressLine1: 'Address provided during order',
          city: 'India',
          state: '',
          pincode: '',
          phone: found.customerPhone || '',
        },
        timeline: found.timeline || [
          {
            status: 'confirmed',
            date: orderDate,
            note: `Order confirmed via ${found.paymentMethod === 'cod' ? 'Cash on Delivery (Doorstep COD)' : 'WhatsApp Concierge'}`,
          },
          {
            status: 'processing',
            date: new Date(Date.parse(orderDate) + 15 * 60 * 1000).toISOString(),
            note: 'Standardized batch inspection & discreet sealing underway',
          },
        ],
      }
      setOrder(formatted)
    }

    setIsLoaded(true)
  }, [orderId])

  if (!isLoaded) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen container py-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1C1D1F] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
        <div className="container py-12 sm:py-16 max-w-lg mx-auto text-center">
          <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-2xl p-8 shadow-xs space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF7F2] border border-[#999999]/30 flex items-center justify-center text-[#9E8047]">
              <Search className="w-6 h-6" />
            </div>
            <h1 className="font-heading text-xl font-normal text-[#1C1D1F]">Order Reference Not Found</h1>
            <p className="text-xs text-[#737373] leading-relaxed">
              We could not find active records for reference <strong className="font-mono text-[#1C1D1F]">{orderId}</strong> in your current browser session.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
              <Link
                href="/track-order"
                className="py-2.5 px-5 rounded-full bg-[#1C1D1F] text-[#FAF7F2] text-xs font-medium hover:bg-[#333333] transition-colors"
              >
                Track by Phone Number
              </Link>
              <Link
                href="/orders"
                className="py-2.5 px-5 rounded-full bg-[#FAF7F2] border border-[#999999]/40 text-[#1C1D1F] text-xs font-medium hover:bg-[#EAE4DC] transition-colors"
              >
                View Order History
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const config = statusConfig[order.status] || statusConfig.processing
  const StatusIcon = config.icon

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <div className="container py-6 sm:py-8 lg:py-10">
        
        <div className="mb-6 pb-4 border-b border-[#999999]/30">
          <Link href="/orders" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#737373] hover:text-[#1C1D1F] transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Orders</span>
          </Link>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">Order #{order.orderNumber}</h1>
              <p className="text-xs text-[#737373] mt-1 font-mono">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-[#999999]/30 ${config.bg} ${config.color}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{config.label}</span>
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column: Timeline & Items */}
          <div className="lg:col-span-2 space-y-5">
            
            {/* Timeline */}
            <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-5 shadow-xs">
              <h2 className="font-heading text-base font-medium text-[#1C1D1F] mb-4">Tracking History</h2>
              <div className="relative pl-6 border-l border-[#999999]/30 space-y-6">
                {(order.timeline || []).map((event: any, index: number) => {
                  const evConfig = statusConfig[event.status] || statusConfig.processing
                  const EvIcon = evConfig?.icon || Clock

                  return (
                    <div key={`${event.date}-${index}`} className="relative">
                      <div className="absolute -left-[31px] top-0.5 w-5 h-5 rounded-full bg-[#FFFFFF] border border-[#999999]/30 flex items-center justify-center text-[#4E5F52]">
                        <EvIcon className="w-3 h-3" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-xs text-[#1C1D1F] capitalize">{event.status}</span>
                          <span className="text-[10px] font-mono text-[#737373]">{formatDate(event.date)}</span>
                        </div>
                        <p className="text-xs text-[#555555] mt-0.5 leading-relaxed font-sans">{event.note}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Items */}
            <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-5 shadow-xs">
              <h2 className="font-heading text-base font-medium text-[#1C1D1F] mb-3">Formulations in Parcel</h2>
              <div className="space-y-3">
                {order.items.map((item: any, idx: number) => (
                  <div key={item.id || idx} className="flex gap-3 p-3 bg-[#FAF7F2] border border-[#999999]/30 rounded-lg items-center">
                    <div className="w-12 h-12 rounded-lg bg-[#FFFFFF] border border-[#999999]/30 flex-shrink-0 overflow-hidden relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-xs sm:text-sm font-medium text-[#1C1D1F] truncate">{item.name}</h3>
                      <p className="text-[11px] text-[#737373]">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-xs text-[#1C1D1F]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Address & Payment Summary */}
          <div className="space-y-5">
            
            {/* Shipping Address */}
            <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#4E5F52]" />
                <h2 className="font-heading text-sm font-medium text-[#1C1D1F]">Delivery Address</h2>
              </div>
              <p className="text-xs text-[#1C1D1F] font-medium">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p className="text-xs text-[#555555] mt-1 leading-relaxed font-sans">
                {order.shippingAddress.addressLine1}<br />
                {order.shippingAddress.addressLine2 && <>{order.shippingAddress.addressLine2}<br /></>}
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p className="text-[11px] font-mono text-[#737373] mt-2">
                Phone: {order.shippingAddress.phone}
              </p>
            </div>

            {/* Payment Summary */}
            <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-5 shadow-xs">
              <h2 className="font-heading text-sm font-medium text-[#1C1D1F] mb-3">Payment Ledger</h2>
              <div className="space-y-2 text-xs text-[#555555] pb-3 border-b border-[#999999]/30">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1C1D1F]">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#1C1D1F]">{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-[#4E5F52]">
                    <span>Discount</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between pt-3 font-medium text-xs sm:text-sm text-[#1C1D1F]">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#999999]/30 text-[11px] font-mono text-[#737373]">
                Payment Mode: {order.paymentMethod === 'cod' ? 'Cash on Delivery (Doorstep COD)' : 'WhatsApp Direct Concierge'}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
