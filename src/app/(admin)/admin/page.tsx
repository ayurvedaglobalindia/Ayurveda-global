'use client'

import { useState, useEffect } from 'react'
import { Package, Truck, CheckCircle, Clock, XCircle, Search, Filter, Download, ChevronLeft, ChevronRight, MessageSquare, Eye, Edit } from 'lucide-react'
import { formatDate, formatDateTime, formatINR, generateId } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Pagination } from '@/components/ui/Pagination'

const statusConfig = {
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'bg-blue-100 text-blue-700' },
  processing: { label: 'Processing', icon: Clock, color: 'bg-amber-100 text-amber-700' },
  shipped: { label: 'Shipped', icon: Truck, color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-red-100 text-red-700' },
}

const paymentStatusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-700' },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-700' },
  refunded: { label: 'Refunded', color: 'bg-blue-100 text-blue-700' },
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showLeads, setShowLeads] = useState(false)

  useEffect(() => {
    fetchOrders()
    fetchLeads()
  }, [currentPage, search, statusFilter, paymentFilter, dateFilter])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        search,
        status: statusFilter,
        payment: paymentFilter,
        date: dateFilter,
      })
      const res = await fetch(`/api/orders?${params}`)
      const data = await res.json()
      setOrders(data.orders)
      setTotalPages(data.totalPages)
    } catch (e) {
      console.error('Failed to fetch orders:', e)
    }
    setLoading(false)
  }

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/whatsapp/lead')
      const data = await res.json()
      setLeads(data.leads)
    } catch (e) {
      console.error('Failed to fetch leads:', e)
    }
  }

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      fetchOrders()
      setShowOrderModal(false)
    } catch (e) {
      console.error('Failed to update order:', e)
    }
  }

  const exportOrders = () => {
    const csv = [
      ['Order ID', 'Customer', 'Phone', 'Email', 'Total', 'Status', 'Payment', 'Date', 'Items'],
      ...orders.map(o => [
        o.id,
        o.customer_name,
        o.customer_phone,
        o.customer_email || '',
        formatINR(o.total_amount),
        o.order_status,
        o.payment_method,
        formatDate(o.created_at),
        o.items_json ? JSON.parse(o.items_json).map((i: any) => `${i.name} x${i.quantity}`).join('; ') : '',
      ]),
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="container py-8 lg:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-medium text-ayur-black">Admin Dashboard</h1>
          <p className="text-ayur-stone">Manage orders and track WhatsApp leads</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={exportOrders}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="secondary" onClick={() => setShowLeads(true)}>
            <MessageSquare className="w-4 h-4 mr-2" />
            WhatsApp Leads ({leads.length})
          </Button>
        </div>
      </div>

      <div className="bg-white border border-ayur-beige rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
            className="md:col-span-2"
          />
          <Select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1) }}
            options={[{ value: '', label: 'All Status' }, ...Object.entries(statusConfig).map(([k, v]) => ({ value: k, label: v.label }))]}
            placeholder="Filter by status"
          />
          <Select
            value={paymentFilter}
            onChange={e => { setPaymentFilter(e.target.value); setCurrentPage(1) }}
            options={[{ value: '', label: 'All Payment' }, { value: 'whatsapp', label: 'WhatsApp' }, { value: 'cod', label: 'COD' }]}
            placeholder="Payment method"
          />
          <Input
            type="date"
            value={dateFilter}
            onChange={e => { setDateFilter(e.target.value); setCurrentPage(1) }}
            placeholder="Date"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white border border-ayur-beige rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-ayur-beige rounded w-3/4 mb-4" />
              <div className="h-4 bg-ayur-beige rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-16 h-16 mx-auto mb-4 text-ayur-stone" />
          <h3 className="font-medium text-ayur-black mb-2">No orders found</h3>
          <p className="text-ayur-stone">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ayur-beige text-left text-sm text-ayur-stone">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Payment</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const status = statusConfig[order.order_status as keyof typeof statusConfig]
                  const payment = paymentStatusConfig[order.payment_status as keyof typeof paymentStatusConfig]
                  const StatusIcon = status?.icon
                  const PaymentIcon = order.payment_method === 'whatsapp' ? MessageSquare : (Truck)

                  return (
                    <tr key={order.id} className="border-b border-ayur-beige/50 hover:bg-ayur-cream/50">
                      <td className="py-4 font-mono text-sm text-ayur-black">{order.id}</td>
                      <td className="py-4">
                        <p className="font-medium text-ayur-black">{order.customer_name}</p>
                        <p className="text-sm text-ayur-stone">{order.customer_phone}</p>
                      </td>
                      <td className="py-4 font-medium text-ayur-black">{formatINR(order.total_amount)}</td>
                      <td className="py-4">
                        {status && (
                          <Badge variant={order.order_status as any}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                        )}
                      </td>
                      <td className="py-4">
                        <span className="flex items-center gap-1 text-sm">
                          <PaymentIcon className="w-4 h-4" />
                          {order.payment_method === 'whatsapp' ? 'WhatsApp' : 'COD'}
                          {payment && (
                            <Badge variant={order.payment_status as any} className="ml-2 text-xs">
                              {payment.label}
                            </Badge>
                          )}
                        </span>
                      </td>
                      <td className="py-4 text-ayur-stone">{formatDate(order.created_at)}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => { setSelectedOrder(order); setShowOrderModal(true) }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-6"
            />
          )}
        </>
      )}

      <Modal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title={`Order ${selectedOrder?.id}`}
        size="xl"
      >
        {selectedOrder && (
          <OrderDetailModal order={selectedOrder} onStatusUpdate={handleStatusUpdate} onClose={() => setShowOrderModal(false)} />
        )}
      </Modal>

      <Modal
        isOpen={showLeads}
        onClose={() => setShowLeads(false)}
        title="WhatsApp Leads"
        size="xl"
      >
        <LeadsTable leads={leads} onClose={() => setShowLeads(false)} />
      </Modal>
    </div>
  )
}

function OrderDetailModal({ order, onStatusUpdate, onClose }: { order: any; onStatusUpdate: (id: string, status: string) => void; onClose: () => void }) {
  const items = order.items_json ? JSON.parse(order.items_json) : []
  const shipping = order.shipping_address_json ? JSON.parse(order.shipping_address_json) : {}
  const billing = order.billing_address_json ? JSON.parse(order.billing_address_json) : null
  const status = statusConfig[order.order_status as keyof typeof statusConfig]

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-ayur-black mb-3">Order Details</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-ayur-stone">Order ID</dt><dd className="font-medium text-ayur-black">{order.id}</dd></div>
            <div className="flex justify-between"><dt className="text-ayur-stone">Customer</dt><dd className="font-medium text-ayur-black">{order.customer_name}</dd></div>
            <div className="flex justify-between"><dt className="text-ayur-stone">Phone</dt><dd className="font-medium text-ayur-black">{order.customer_phone}</dd></div>
            <div className="flex justify-between"><dt className="text-ayur-stone">Email</dt><dd className="font-medium text-ayur-black">{order.customer_email || 'N/A'}</dd></div>
            <div className="flex justify-between"><dt className="text-ayur-stone">Payment</dt><dd className="font-medium text-ayur-black">{order.payment_method === 'whatsapp' ? 'WhatsApp' : 'COD'}</dd></div>
            <div className="flex justify-between"><dt className="text-ayur-stone">Payment Status</dt><dd className="font-medium text-ayur-black">{paymentStatusConfig[order.payment_status as keyof typeof paymentStatusConfig]?.label}</dd></div>
            <div className="flex justify-between"><dt className="text-ayur-stone">Created</dt><dd className="font-medium text-ayur-black">{formatDateTime(order.created_at)}</dd></div>
            <div className="flex justify-between"><dt className="text-ayur-stone">Updated</dt><dd className="font-medium text-ayur-black">{formatDateTime(order.updated_at)}</dd></div>
          </dl>
        </div>
        <div>
          <h3 className="font-medium text-ayur-black mb-3">Update Status</h3>
          <div className="space-y-2">
            {Object.entries(statusConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => onStatusUpdate(order.id, key)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${order.order_status === key ? `border-${config.color.split(' ')[0].replace('bg-', '')}-500 bg-${config.color.split(' ')[0].replace('bg-', '')}-50` : 'border-ayur-beige hover:border-ayur-forest'}`}
              >
                <div className="flex items-center gap-3">
                  <config.icon className="w-5 h-5" style={{ color: config.color.split(' ')[1].replace('text-', '') }} />
                  <span className="font-medium text-ayur-black">{config.label}</span>
                  {order.order_status === key && <span className="ml-auto text-green-600 font-medium">Current</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-ayur-black mb-3">Items</h3>
        <div className="space-y-3">
          {items.map((item: any, index: number) => (
            <div key={index} className="flex gap-3 p-3 bg-ayur-cream rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-white flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ayur-black">{item.name}</p>
                <p className="text-sm text-ayur-stone">Qty: {item.quantity} × {formatINR(item.price)}</p>
              </div>
              <p className="font-medium text-ayur-black">{formatINR(item.total)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-ayur-black mb-3">Shipping Address</h3>
          <address className="text-ayur-forest not-italic space-y-1">
            <p>{shipping.firstName} {shipping.lastName}</p>
            <p>{shipping.addressLine1}</p>
            {shipping.addressLine2 && <p>{shipping.addressLine2}</p>}
            <p>{shipping.city}, {shipping.state} {shipping.pincode}</p>
            <p>{shipping.phone}</p>
          </address>
        </div>
        {billing && (
          <div>
            <h3 className="font-medium text-ayur-black mb-3">Billing Address</h3>
            <address className="text-ayur-forest not-italic space-y-1">
              <p>{billing.firstName} {billing.lastName}</p>
              <p>{billing.addressLine1}</p>
              {billing.addressLine2 && <p>{billing.addressLine2}</p>}
              <p>{billing.city}, {billing.state} {billing.pincode}</p>
            </address>
          </div>
        )}
      </div>
    </div>
  )
}

function LeadsTable({ leads, onClose }: { leads: any[]; onClose: () => void }) {
  if (leads.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-ayur-stone" />
        <h3 className="font-medium text-ayur-black mb-2">No leads yet</h3>
        <p className="text-ayur-stone">WhatsApp leads will appear here</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto max-h-[70vh]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-ayur-beige text-left text-sm text-ayur-stone">
            <th className="pb-3 font-medium">Source</th>
            <th className="pb-3 font-medium">Customer</th>
            <th className="pb-3 font-medium">Product</th>
            <th className="pb-3 font-medium">Quantity</th>
            <th className="pb-3 font-medium">Order Total</th>
            <th className="pb-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.slice(0, 100).map((lead, index) => (
            <tr key={index} className="border-b border-ayur-beige/50">
              <td className="py-3">
                <Badge variant={lead.source as any}>{lead.source}</Badge>
              </td>
              <td className="py-3">
                <p className="font-medium text-ayur-black">{lead.customer_name || 'Anonymous'}</p>
                <p className="text-sm text-ayur-stone">{lead.customer_phone || lead.customer_email || 'N/A'}</p>
              </td>
              <td className="py-3 text-ayur-forest">{lead.product_name || 'General'}</td>
              <td className="py-3 text-ayur-stone">{lead.quantity || 1}</td>
              <td className="py-3 text-ayur-stone">{lead.order_total ? formatINR(lead.order_total) : 'N/A'}</td>
              <td className="py-3 text-ayur-stone">{formatDateTime(lead.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}