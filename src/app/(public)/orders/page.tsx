'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Package, Truck, CheckCircle, Clock, XCircle, ArrowLeft } from 'lucide-react'
import { formatDate, formatINR, generateId } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatINR as formatPrice } from '@/lib/utils/formatters'

const mockOrders = [
  {
    id: 'ORD-20241215-ABC1',
    orderNumber: 'ORD-20241215-ABC1',
    createdAt: '2024-12-15T10:30:00Z',
    total: 149900,
    status: 'delivered' as const,
    paymentMethod: 'whatsapp' as const,
    items: [
      { name: 'BODY Essential Nutrition', quantity: 1, price: 149900, image: '/images/products/body-nutrition/01-primary.svg' },
    ],
  },
  {
    id: 'ORD-20241210-XYZ2',
    orderNumber: 'ORD-20241210-XYZ2',
    createdAt: '2024-12-10T14:20:00Z',
    total: 89900,
    status: 'shipped' as const,
    paymentMethod: 'cod' as const,
    items: [
      { name: 'STAYMAX+ Delay Spray', quantity: 1, price: 89900, image: '/images/products/staymax/01-primary.svg' },
    ],
  },
  {
    id: 'ORD-20241205-DEF3',
    orderNumber: 'ORD-20241205-DEF3',
    createdAt: '2024-12-05T09:15:00Z',
    total: 239800,
    status: 'processing' as const,
    paymentMethod: 'whatsapp' as const,
    items: [
      { name: 'BODY Essential Nutrition', quantity: 2, price: 149900, image: '/images/products/body-nutrition/01-primary.svg' },
    ],
  },
]

const statusConfig = {
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'bg-blue-100 text-blue-700' },
  processing: { label: 'Processing', icon: Clock, color: 'bg-amber-100 text-amber-700' },
  shipped: { label: 'Shipped', icon: Truck, color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-red-100 text-red-700' },
}


export default function OrdersPage() {
  return (
    <div className="container py-8 lg:py-12">
      <div className="mb-8">
        <Link href="/account" className="inline-flex items-center gap-2 text-ayur-stone hover:text-ayur-gold transition-colors mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back to Account
        </Link>
        <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-ivory">My Orders</h1>
        <p className="text-[#C4BDA8] mt-2">Track and manage your orders</p>
      </div>

      <div className="space-y-6">
        {mockOrders.map(order => {
          const config = statusConfig[order.status]
          const StatusIcon = config.icon

          return (
            <Link key={order.id} href={`/orders/${order.id}`} className="block">
              <div className="bg-[#061A10] border border-[#C2A265]/20 rounded-2xl overflow-hidden hover:border-[#C2A265]/50 transition-all shadow-lg">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl bg-[#0B150F] border border-[#C2A265]/20 flex items-center justify-center flex-shrink-0">
                        {order.items[0] && (
                          <Image src={order.items[0].image} alt={order.items[0].name} width={80} height={80} className="w-full h-full object-cover rounded-lg" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-ayur-ivory">{order.items[0]?.name}</h3>
                        {order.items.length > 1 && (
                          <p className="text-sm text-[#C4BDA8]">+ {order.items.length - 1} more item{order.items.length - 1 !== 1 ? 's' : ''}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right md:text-left">
                      <div>
                        <p className="font-medium text-ayur-ivory">{formatPrice(order.total)}</p>
                        <p className="text-sm text-[#C4BDA8]">{formatDate(order.createdAt)}</p>
                      </div>
                      <Badge variant={order.status as any} className="whitespace-nowrap">
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#C2A265]/20">
                    <span className="text-sm text-[#C4BDA8]">Order #{order.orderNumber}</span>
                    <span className="text-sm text-ayur-gold font-medium">View Details →</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}

        {mockOrders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#061A10] border border-[#C2A265]/20 flex items-center justify-center">
              <Package className="w-12 h-12 text-ayur-stone" />
            </div>
            <h2 className="font-heading text-2xl font-medium text-ayur-ivory mb-2">No orders yet</h2>
            <p className="text-[#C4BDA8] mb-6">When you place an order, it will appear here.</p>
            <Link href="/shop">
              <Button variant="gold">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}