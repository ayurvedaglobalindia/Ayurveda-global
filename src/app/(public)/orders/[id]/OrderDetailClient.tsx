'use client'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Package, Truck, CheckCircle, Clock, XCircle, MapPin, Phone, Mail, ArrowLeft, ChevronDown, ChevronUp, Download, MessageSquare } from 'lucide-react'
import { formatDate, formatDateTime, formatINR, classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'

const mockOrderDetails = {
  'ORD-20241215-ABC1': {
    id: 'ORD-20241215-ABC1',
    orderNumber: 'ORD-20241215-ABC1',
    createdAt: '2024-12-15T10:30:00Z',
    updatedAt: '2024-12-18T14:20:00Z',
    total: 149900,
    subtotal: 149900,
    shipping: 0,
    tax: 0,
    discount: 0,
    status: 'delivered' as const,
    paymentMethod: 'whatsapp' as const,
    paymentStatus: 'confirmed' as const,
    customerName: 'John Doe',
    customerPhone: '+91 98765 43210',
    customerEmail: 'john@example.com',
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 98765 43210',
    },
    items: [
      { name: 'BODY Essential Nutrition', variant: '60 Capsules', quantity: 1, price: 149900, total: 149900, image: '/images/products/body-essential-nutrition-thumb.jpg' },
    ],
    timeline: [
      { status: 'confirmed', date: '2024-12-15T10:30:00Z', note: 'Order confirmed via WhatsApp' },
      { status: 'processing', date: '2024-12-16T09:00:00Z', note: 'Order being prepared' },
      { status: 'shipped', date: '2024-12-17T14:00:00Z', note: 'Shipped via BlueDart - Tracking: BD123456789' },
      { status: 'delivered', date: '2024-12-18T11:30:00Z', note: 'Delivered to customer' },
    ],
  },
  'ORD-20241210-XYZ2': {
    id: 'ORD-20241210-XYZ2',
    orderNumber: 'ORD-20241210-XYZ2',
    createdAt: '2024-12-10T14:20:00Z',
    updatedAt: '2024-12-12T10:00:00Z',
    total: 89900,
    subtotal: 89900,
    shipping: 4900,
    tax: 0,
    discount: 0,
    status: 'shipped' as const,
    paymentMethod: 'cod' as const,
    paymentStatus: 'pending' as const,
    customerName: 'Jane Smith',
    customerPhone: '+91 87654 32109',
    customerEmail: 'jane@example.com',
    shippingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      addressLine1: '456 Park Avenue',
      addressLine2: '',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      phone: '+91 87654 32109',
    },
    items: [
      { name: 'STAYMAX+ Delay Spray', variant: '30 ml', quantity: 1, price: 89900, total: 89900, image: '/images/products/staymax-delay-spray-thumb.jpg' },
    ],
    timeline: [
      { status: 'confirmed', date: '2024-12-10T14:20:00Z', note: 'Order confirmed - Cash on Delivery' },
      { status: 'processing', date: '2024-12-11T10:00:00Z', note: 'Order being prepared' },
      { status: 'shipped', date: '2024-12-12T10:00:00Z', note: 'Shipped via DTDC - Tracking: DTDC987654321' },
    ],
  },
}

const statusConfig = {
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30', lineColor: 'bg-emerald-500' },
  processing: { label: 'Processing', icon: Clock, color: 'bg-amber-950/80 text-[#D4B678] border border-[#C2A265]/40', lineColor: 'bg-[#C2A265]' },
  shipped: { label: 'Dispatched', icon: Truck, color: 'bg-[#18202C] text-[#FAF7EE] border border-[#C2A265]/30', lineColor: 'bg-[#C2A265]' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'bg-[#161B26] text-[#D4B678] border border-[#C2A265]/50', lineColor: 'bg-[#D4B678]' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-rose-950/80 text-rose-300 border border-rose-500/30', lineColor: 'bg-rose-500' },
}


export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const order = mockOrderDetails[orderId as keyof typeof mockOrderDetails]

  if (!order) {
    notFound()
  }

  const config = statusConfig[order.status]
  const StatusIcon = config.icon

  return (
    <div className="container py-5 sm:py-7 lg:py-9">
      <div className="mb-5 sm:mb-6">
        <Link href="/orders" className="inline-flex items-center gap-1.5 text-xs text-ayur-stone hover:text-ayur-gold transition-colors mb-3">
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-medium text-ayur-ivory">Order #{order.orderNumber}</h1>
            <p className="text-xs text-[#C4BDA8] mt-1">Placed on {formatDate(order.createdAt)}</p>
          </div>
          <Badge variant={order.status as any} className="whitespace-nowrap">
            <StatusIcon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
        <div className="lg:col-span-2 space-y-4">
          <section className="bg-[#121622] border border-[#C2A265]/20 rounded-2xl p-4 sm:p-5 shadow-lg">
            <h2 className="font-heading text-base sm:text-lg font-medium text-ayur-ivory mb-4">Order Timeline</h2>
            <div className="relative pl-6 border-l-2 border-[#C2A265]/20">
              {order.timeline.map((event, index) => {
                const eventConfig = statusConfig[event.status as keyof typeof statusConfig]
                const EventIcon = eventConfig?.icon || Clock
                const isLast = index === order.timeline.length - 1

                return (
                  <div key={event.date} className="relative pb-6 last:pb-0">
                    <div className="absolute left-[-14px] top-1 w-6 h-6 rounded-full border-2 border-[#C2A265]/40 flex items-center justify-center bg-[#08090C] z-10">
                      <div className={classNames(
                        'w-2.5 h-2.5 rounded-full',
                        event.status === order.status || index < order.timeline.findIndex(e => e.status === order.status)
                          ? eventConfig.lineColor.replace('bg-', 'bg-')
                          : 'bg-[#121622]'
                      )} />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-start gap-3">
                        <div className={classNames(
                          'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0',
                          event.status === order.status || index < order.timeline.findIndex(e => e.status === order.status)
                            ? eventConfig.lineColor.replace('bg-', 'bg-')
                            : 'bg-[#18202C] border border-[#C2A265]/20'
                        )}>
                          <EventIcon className={classNames('w-4.5 h-4.5', event.status === order.status || index < order.timeline.findIndex(e => e.status === order.status) ? 'text-white' : 'text-ayur-stone')} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-ayur-ivory text-sm">{eventConfig?.label || event.status}</p>
                          <p className="text-xs text-[#C4BDA8]">{event.note}</p>
                          <p className="text-[11px] text-[#C4BDA8]/70 mt-0.5">{formatDateTime(event.date)}</p>
                        </div>
                      </div>
                      {!isLast && (
                        <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-[#C2A265]/20" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="bg-[#121622] border border-[#C2A265]/20 rounded-2xl p-4 sm:p-5 shadow-lg">
            <h2 className="font-heading text-base sm:text-lg font-medium text-ayur-ivory mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-3.5 p-3 sm:p-3.5 bg-[#0D1017] border border-[#C2A265]/15 rounded-xl items-center">
                  <div className="w-14 h-14 rounded-lg bg-[#08090C] border border-[#C2A265]/20 flex-shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} width={56} height={56} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-ayur-ivory text-sm">{item.name}</h3>
                    {item.variant && <p className="text-xs text-[#C4BDA8]">{item.variant}</p>}
                    <p className="text-xs text-ayur-gold font-medium">{formatINR(item.total)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#C4BDA8]">Qty: {item.quantity}</p>
                    <p className="font-medium text-ayur-ivory text-xs sm:text-sm">{formatINR(item.price)} each</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-[#C2A265]/20 space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between text-[#C4BDA8]">
                <span>Subtotal</span>
                <span>{formatINR(order.subtotal)}</span>
              </div>
              {order.shipping > 0 && (
                <div className="flex justify-between text-[#C4BDA8]">
                  <span>Shipping</span>
                  <span>{formatINR(order.shipping)}</span>
                </div>
              )}
              {order.tax > 0 && (
                <div className="flex justify-between text-[#C4BDA8]">
                  <span>Tax</span>
                  <span>{formatINR(order.tax)}</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span>
                  <span>-{formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#C2A265]/20 pt-2.5 text-base font-semibold text-ayur-ivory">
                <span>Total</span>
                <span>{formatINR(order.total)}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="bg-[#121622] border border-[#C2A265]/20 rounded-2xl p-4 sm:p-5 shadow-lg">
            <h2 className="font-heading text-base sm:text-lg font-medium text-ayur-ivory mb-3">Shipping Address</h2>
            <address className="text-[#C4BDA8] not-italic space-y-1.5 text-xs sm:text-sm">
              <p className="font-medium text-ayur-ivory">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {Boolean((order.shippingAddress as any).addressLine2) && <p>{(order.shippingAddress as any).addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
              <div className="flex items-center gap-2 text-xs pt-1">
                <Phone className="w-3.5 h-3.5 text-ayur-gold" />
                <a href={`tel:${order.shippingAddress.phone}`} className="hover:text-ayur-gold transition-colors">{order.shippingAddress.phone}</a>
              </div>
              {order.customerEmail && (
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="w-3.5 h-3.5 text-ayur-gold" />
                  <a href={`mailto:${order.customerEmail}`} className="hover:text-ayur-gold transition-colors">{order.customerEmail}</a>
                </div>
              )}
            </address>
          </section>

          <section className="bg-[#121622] border border-[#C2A265]/20 rounded-2xl p-4 sm:p-5 shadow-lg">
            <h2 className="font-heading text-base sm:text-lg font-medium text-ayur-ivory mb-3">Payment Details</h2>
            <dl className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <dt className="text-ayur-stone">Payment Method</dt>
                <dd className="font-medium text-ayur-ivory">
                  {order.paymentMethod === 'whatsapp' ? 'WhatsApp Order' : 'Cash on Delivery'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ayur-stone">Payment Status</dt>
                <dd className={classNames('font-medium', order.paymentStatus === 'confirmed' ? 'text-green-400' : 'text-amber-400')}>
                  {order.paymentStatus === 'confirmed' ? 'Paid' : 'Pending'}
                </dd>
              </div>
            </dl>
          </section>

          <section className="bg-[#121622] border border-[#C2A265]/20 rounded-2xl p-4 sm:p-5 shadow-lg">
            <h2 className="font-heading text-base sm:text-lg font-medium text-ayur-ivory mb-2">Need Help?</h2>
            <p className="text-xs text-[#C4BDA8] mb-3.5">Contact us for any questions about your order.</p>
            <div className="flex gap-2.5">
              <Button variant="whatsapp" size="sm" className="flex-1 text-xs" onClick={() => window.open('https://wa.me/919123485451', '_blank')}>
                <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                WhatsApp Support
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => window.location.href = 'mailto:support@ayurvedaglobal.com'}>
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                Email Us
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

