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
      { name: 'BODY Essential Nutrition', quantity: 1, price: 149900, image: '/images/products/body-essential-nutrition-thumb.jpg' },
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
      { name: 'STAYMAX+ Delay Spray', quantity: 1, price: 89900, image: '/images/products/staymax-delay-spray-thumb.jpg' },
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
      { name: 'BODY Essential Nutrition', quantity: 2, price: 149900, image: '/images/products/body-essential-nutrition-thumb.jpg' },
    ],
  },
]

const statusConfig = {
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' },
  processing: { label: 'Processing', icon: Clock, color: 'bg-amber-950/80 text-[#D4B678] border border-[#C2A265]/40' },
  shipped: { label: 'Dispatched', icon: Truck, color: 'bg-[#18202C] text-[#FAF7EE] border border-[#C2A265]/30' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'bg-[#161B26] text-[#D4B678] border border-[#C2A265]/50' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-rose-950/80 text-rose-300 border border-rose-500/30' },
}


export default function OrdersPage() {
  return (
    <div className="container py-5 sm:py-7 lg:py-9">
      <div className="mb-5 sm:mb-6">
        <Link href="/account" className="inline-flex items-center gap-1.5 text-xs text-ayur-stone hover:text-ayur-gold transition-colors mb-3">
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </Link>
        <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-medium text-ayur-ivory">My Orders</h1>
        <p className="text-xs sm:text-sm text-[#C4BDA8] mt-1">Track and manage your orders</p>
      </div>

      <div className="space-y-4">
        {mockOrders.map(order => {
          const config = statusConfig[order.status]
          const StatusIcon = config.icon

          return (
            <Link key={order.id} href={`/orders/${order.id}`} className="block">
              <div className="bg-[#121622] border border-[#C2A265]/20 rounded-2xl overflow-hidden hover:border-[#C2A265]/50 transition-all shadow-lg">
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 mb-3.5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-16 rounded-xl bg-[#0D1017] border border-[#C2A265]/20 flex items-center justify-center flex-shrink-0">
                        {order.items[0] && (
                          <Image src={order.items[0].image} alt={order.items[0].name} width={64} height={64} className="w-full h-full object-cover rounded-lg" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-ayur-ivory text-sm sm:text-base">{order.items[0]?.name}</h3>
                        {order.items.length > 1 && (
                          <p className="text-xs text-[#C4BDA8]">+ {order.items.length - 1} more item{order.items.length - 1 !== 1 ? 's' : ''}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right md:text-left">
                      <div>
                        <p className="font-medium text-ayur-ivory text-sm sm:text-base">{formatPrice(order.total)}</p>
                        <p className="text-xs text-[#C4BDA8]">{formatDate(order.createdAt)}</p>
                      </div>
                      <Badge variant={order.status as any} className="whitespace-nowrap">
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#C2A265]/20">
                    <span className="text-xs text-[#C4BDA8]">Order #{order.orderNumber}</span>
                    <span className="text-xs text-ayur-gold font-medium">View Details →</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}

        {mockOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#121622] border border-[#C2A265]/20 flex items-center justify-center">
              <Package className="w-8 h-8 text-ayur-stone" />
            </div>
            <h2 className="font-heading text-xl font-medium text-ayur-ivory mb-1.5">No orders yet</h2>
            <p className="text-xs sm:text-sm text-[#C4BDA8] mb-5">When you place an order, it will appear here.</p>
            <Link href="/shop">
              <Button variant="gold" size="md" className="text-xs font-bold">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}