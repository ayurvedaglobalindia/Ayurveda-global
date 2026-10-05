'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Truck, CheckCircle2, Clock, XCircle, ArrowLeft } from 'lucide-react'
import { formatDate, formatINR as formatPrice } from '@/lib/utils/formatters'
import { Badge } from '@/components/ui/Badge'

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
  confirmed: { label: 'Confirmed', icon: CheckCircle2, color: 'bg-[#F5F1EB] text-[#4E5F52] border border-[#999999]/30' },
  processing: { label: 'Processing', icon: Clock, color: 'bg-[#FAF7F2] text-[#9E8047] border border-[#999999]/30' },
  shipped: { label: 'Dispatched', icon: Truck, color: 'bg-[#FAF7F2] text-[#1C1D1F] border border-[#999999]/30' },
  delivered: { label: 'Delivered', icon: CheckCircle2, color: 'bg-[#F5F1EB] text-[#4E5F52] border border-[#999999]/30' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-rose-50 text-rose-700 border border-rose-200' },
}

export default function OrdersPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <div className="container py-6 sm:py-8 lg:py-10">
        
        <div className="mb-6 pb-4 border-b border-[#999999]/30">
          <Link href="/account" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#737373] hover:text-[#1C1D1F] transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Account</span>
          </Link>
          <h1 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">Order History</h1>
          <p className="text-xs text-[#555555] mt-1 font-sans">Track shipments and view formulation orders</p>
        </div>

        <div className="space-y-3.5 max-w-4xl">
          {mockOrders.map(order => {
            const config = statusConfig[order.status]
            const StatusIcon = config.icon

            return (
              <Link key={order.id} href={`/orders/${order.id}`} className="block">
                <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-4 sm:p-5 hover:border-[#1C1D1F] transition-colors shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-[#F5F1EB] border border-[#999999]/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {order.items[0] && (
                          <Image
                            src={order.items[0].image}
                            alt={order.items[0].name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-medium text-[#1C1D1F]">{order.items[0]?.name}</h3>
                        <p className="text-[11px] font-mono text-[#737373] mt-0.5">Order #{order.orderNumber}</p>
                        {order.items.length > 1 && (
                          <p className="text-[11px] text-[#737373]">+ {order.items.length - 1} more item{order.items.length - 1 !== 1 ? 's' : ''}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between md:justify-end">
                      <div className="text-left md:text-right">
                        <p className="font-medium text-[#1C1D1F] text-xs sm:text-sm">{formatPrice(order.total)}</p>
                        <p className="text-[11px] text-[#737373]">{formatDate(order.createdAt)}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono ${config.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span>{config.label}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}