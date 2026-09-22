'use client'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Package, Truck, CheckCircle, Clock, XCircle, MapPin, Phone, Mail, ArrowLeft, ChevronDown, ChevronUp, Download } from 'lucide-react'
import { formatDate, formatDateTime, formatINR } from '@/lib/utils/formatters'
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
      { name: 'BODY Essential Nutrition', variant: '60 Capsules', quantity: 1, price: 149900, total: 149900, image: '/images/products/body-nutrition/01-primary.svg' },
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
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      phone: '+91 87654 32109',
    },
    items: [
      { name: 'STAYMAX+ Delay Spray', variant: '30 ml', quantity: 1, price: 89900, total: 89900, image: '/images/products/staymax/01-primary.svg' },
    ],
    timeline: [
      { status: 'confirmed', date: '2024-12-10T14:20:00Z', note: 'Order confirmed - Cash on Delivery' },
      { status: 'processing', date: '2024-12-11T10:00:00Z', note: 'Order being prepared' },
      { status: 'shipped', date: '2024-12-12T10:00:00Z', note: 'Shipped via DTDC - Tracking: DTDC987654321' },
    ],
  },
}

const statusConfig = {
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'bg-blue-100 text-blue-700', lineColor: 'bg-blue-500' },
  processing: { label: 'Processing', icon: Clock, color: 'bg-amber-100 text-amber-700', lineColor: 'bg-amber-500' },
  shipped: { label: 'Shipped', icon: Truck, color: 'bg-purple-100 text-purple-700', lineColor: 'bg-purple-500' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'bg-green-100 text-green-700', lineColor: 'bg-green-500' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-red-100 text-red-700', lineColor: 'bg-red-500' },
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
    <div className="container py-8 lg:py-12">
      <div className="mb-8">
        <Link href="/orders" className="inline-flex items-center gap-2 text-ayur-stone hover:text-ayur-forest transition-colors mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back to Orders
        </Link>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black">Order #{order.orderNumber}</h1>
            <p className="text-ayur-stone mt-1">Placed on {formatDate(order.createdAt)}</p>
          </div>
          <Badge variant={order.status as any} className="whitespace-nowrap">
            <StatusIcon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-ayur-beige rounded-2xl p-6">
            <h2 className="font-heading text-xl font-medium text-ayur-black mb-6">Order Timeline</h2>
            <div className="relative pl-6 border-l-2 border-ayur-beige">
              {order.timeline.map((event, index) => {
                const eventConfig = statusConfig[event.status as keyof typeof statusConfig]
                const EventIcon = eventConfig?.icon || Clock
                const isLast = index === order.timeline.length - 1

                return (
                  <div key={event.date} className="relative pb-8 last:pb-0">
                    <div className="absolute left-[-14px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white z-10">
                      <div className={classNames(
                        'w-2.5 h-2.5 rounded-full',
                        event.status === order.status || index < order.timeline.findIndex(e => e.status === order.status)
                          ? eventConfig.lineColor.replace('bg-', 'bg-')
                          : 'bg-ayur-beige'
                      )} />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-start gap-3">
                        <div className={classNames(
                          'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                          event.status === order.status || index < order.timeline.findIndex(e => e.status === order.status)
                            ? eventConfig.lineColor.replace('bg-', 'bg-')
                            : 'bg-ayur-beige'
                        )}>
                          <EventIcon className={classNames('w-5 h-5', event.status === order.status || index < order.timeline.findIndex(e => e.status === order.status) ? 'text-white' : 'text-ayur-stone')} />
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
          </section>

          <section className="bg-white border border-ayur-beige rounded-2xl p-6">
            <h2 className="font-heading text-xl font-medium text-ayur-black mb-6">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-ayur-cream rounded-xl">
                  <div className="w-16 h-16 rounded-lg bg-white flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-ayur-black">{item.name}</h3>
                    {item.variant && <p className="text-sm text-ayur-stone">{item.variant}</p>}
                    <p className="text-sm text-ayur-forest font-medium">{formatINR(item.total)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-ayur-stone">Qty: {item.quantity}</p>
                    <p className="font-medium text-ayur-black">{formatINR(item.price)} each</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-ayur-beige space-y-2 text-sm">
              <div className="flex justify-between text-ayur-forest">
                <span>Subtotal</span>
                <span>{formatINR(order.subtotal)}</span>
              </div>
              {order.shipping > 0 && (
                <div className="flex justify-between text-ayur-forest">
                  <span>Shipping</span>
                  <span>{formatINR(order.shipping)}</span>
                </div>
              )}
              {order.tax > 0 && (
                <div className="flex justify-between text-ayur-forest">
                  <span>Tax</span>
                  <span>{formatINR(order.tax)}</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between text-ayur-sage">
                  <span>Discount</span>
                  <span>-{formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-ayur-beige pt-3 text-lg font-medium text-ayur-black">
                <span>Total</span>
                <span>{formatINR(order.total)}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white border border-ayur-beige rounded-2xl p-6">
            <h2 className="font-heading text-xl font-medium text-ayur-black mb-6">Shipping Address</h2>
            <address className="text-ayur-forest not-italic space-y-2">
              <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                <a href={`tel:${order.shippingAddress.phone}`} className="hover:text-ayur-gold transition-colors">{order.shippingAddress.phone}</a>
              </div>
              {order.customerEmail && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${order.customerEmail}`} className="hover:text-ayur-gold transition-colors">{order.customerEmail}</a>
                </div>
              )}
            </address>
          </section>

          <section className="bg-white border border-ayur-beige rounded-2xl p-6">
            <h2 className="font-heading text-xl font-medium text-ayur-black mb-6">Payment Details</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ayur-stone">Payment Method</dt>
                <dd className="font-medium text-ayur-black">
                  {order.paymentMethod === 'whatsapp' ? 'WhatsApp Order' : 'Cash on Delivery'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ayur-stone">Payment Status</dt>
                <dd className={classNames('font-medium', order.paymentStatus === 'confirmed' ? 'text-green-600' : 'text-amber-600')}>
                  {order.paymentStatus === 'confirmed' ? 'Paid' : 'Pending'}
                </dd>
              </div>
            </dl>
          </section>

          <section className="bg-white border border-ayur-beige rounded-2xl p-6">
            <h2 className="font-heading text-xl font-medium text-ayur-black mb-4">Need Help?</h2>
            <p className="text-ayur-stone mb-4">Contact us for any questions about your order.</p>
            <div className="flex gap-3">
              <Button variant="whatsapp" className="flex-1" onClick={() => window.open('https://wa.me/9123485451', '_blank')}>
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp Support
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => window.location.href = 'mailto:support@ayurvedaglobal.com'}>
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

