'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Shield,
  Lock,
  KeyRound,
  ArrowRight,
  LogOut,
  Package,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  Sliders,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatINR, formatDate } from '@/lib/utils/formatters'
import { getAnalyticsSummary, type AnalyticsSummary } from '@/lib/analytics'
import { loginAdmin, isAdminAuthenticated, logoutAdmin, isLockedOut } from '@/lib/auth/adminAuth'
import { getAllProducts } from '@/lib/products/registry'
import { useUserStore } from '@/store/userStore'
import { buildWhatsAppUrl } from '@/store/whatsappStore'

const fallbackMockOrders = [
  {
    id: 'ORD-20241215-ABC1',
    orderNumber: 'ORD-20241215-ABC1',
    createdAt: '2024-12-15T10:30:00Z',
    customerName: 'Vikram Sharma',
    customerPhone: '+91 98765 43210',
    total: 149900,
    status: 'delivered' as const,
    paymentMethod: 'whatsapp' as const,
    shippingAddress: {
      firstName: 'Vikram',
      lastName: 'Sharma',
      addressLine1: 'Flat 402, Green Glen Layout',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      phone: '+91 98765 43210',
    },
    items: [
      { name: 'BODY Essential Nutrition', quantity: 1, price: 149900, image: '/images/products/body-essential-nutrition-thumb.jpg' },
    ],
  },
  {
    id: 'ORD-20241210-XYZ2',
    orderNumber: 'ORD-20241210-XYZ2',
    createdAt: '2024-12-10T14:20:00Z',
    customerName: 'Amit Patel',
    customerPhone: '+91 98765 12345',
    total: 94800,
    status: 'shipped' as const,
    paymentMethod: 'cod' as const,
    shippingAddress: {
      firstName: 'Amit',
      lastName: 'Patel',
      addressLine1: 'B-12, Shanti Kunj',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380009',
      phone: '+91 98765 12345',
    },
    items: [
      { name: 'STAYMAX+ Delay Spray', quantity: 1, price: 89900, image: '/images/products/staymax-delay-spray-thumb.jpg' },
    ],
  },
  {
    id: 'ORD-20241205-DEF3',
    orderNumber: 'ORD-20241205-DEF3',
    createdAt: '2024-12-05T09:15:00Z',
    customerName: 'Rahul Verma',
    customerPhone: '+91 98290 12345',
    total: 219800,
    status: 'processing' as const,
    paymentMethod: 'whatsapp' as const,
    shippingAddress: {
      firstName: 'Rahul',
      lastName: 'Verma',
      addressLine1: '15/A, Civil Lines',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302006',
      phone: '+91 98290 12345',
    },
    items: [
      { name: 'BODY Essential Nutrition', quantity: 2, price: 149900, image: '/images/products/body-essential-nutrition-thumb.jpg' },
    ],
  },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [pin, setPin] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'analytics' | 'settings'>('overview')

  // Dashboard Data
  const [orders, setOrders] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)

  useEffect(() => {
    setIsMounted(true)
    const authed = isAdminAuthenticated()
    setIsAuthenticated(authed)
    if (authed) {
      loadDashboardData()
    }
  }, [])

  const loadDashboardData = () => {
    // 1. Gather all client orders
    let allOrders: any[] = [...(useUserStore.getState().recentOrders || [])]
    try {
      if (typeof window !== 'undefined') {
        const local = JSON.parse(localStorage.getItem('ayur_orders') || '[]')
        allOrders = [...allOrders, ...local]
      }
    } catch {}

    const uniqueOrders = allOrders.filter((v, i, a) => a.findIndex(t => (t.id === v.id || t.orderNumber === v.orderNumber)) === i)
    const combined = [
      ...uniqueOrders,
      ...fallbackMockOrders.filter(fo => !uniqueOrders.some(uo => uo.id === fo.id || uo.orderNumber === fo.orderNumber)),
    ]
    setOrders(combined)

    // 2. Load analytics
    setAnalytics(getAnalyticsSummary())
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    const res = await loginAdmin(pin)
    setAuthLoading(false)

    if (res.success) {
      setIsAuthenticated(true)
      setPin('')
      loadDashboardData()
    } else {
      setAuthError(res.message)
    }
  }

  const handleLogout = () => {
    logoutAdmin()
    setIsAuthenticated(false)
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const updated = orders.map(o => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: newStatus } : o))
    setOrders(updated)

    // Persist change in localStorage
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('ayur_orders', JSON.stringify(updated.slice(0, 50)))
      }
    } catch {}

    if (selectedOrder && (selectedOrder.id === orderId || selectedOrder.orderNumber === orderId)) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  if (!isMounted) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen container py-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1C1D1F] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // 1. Login View
  if (!isAuthenticated) {
    const lockout = isLockedOut()
    return (
      <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#FFFFFF] border border-[#999999]/30 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#FAF7F2] border border-[#999999]/30 flex items-center justify-center text-[#4E5F52]">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold text-[#4E5F52] uppercase tracking-wider block">
              Ayurveda Global Concierge
            </span>
            <h1 className="font-heading text-xl sm:text-2xl font-normal text-[#1C1D1F] mt-1">
              Operations Terminal
            </h1>
            <p className="text-xs text-[#737373] mt-1">
              Restricted management portal for orders, stock &amp; dispatch tracking.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium text-[#737373] uppercase tracking-wider mb-1">
                Security PIN / Access Token
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  placeholder="Enter administrator PIN"
                  className="w-full pl-3 pr-10 py-2.5 bg-[#FAF7F2] border border-[#999999]/30 rounded-xl text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none focus:ring-1 focus:ring-[#1C1D1F]"
                  disabled={lockout.locked}
                  required
                  autoFocus
                />
                <KeyRound className="w-4 h-4 text-[#737373] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {authError && (
                <p className="text-rose-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{authError}</span>
                </p>
              )}
              {lockout.locked && (
                <p className="text-amber-700 text-xs mt-1.5 font-medium">
                  Lockout active. Please wait {lockout.remainingSeconds}s.
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={authLoading}
              disabled={lockout.locked || !pin.trim()}
              className="w-full py-2.5 rounded-full font-semibold text-xs shadow-xs"
            >
              <span>Unlock Terminal</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#999999]/20 text-center">
            <Link href="/" className="text-xs text-[#737373] hover:text-[#1C1D1F] transition-colors">
              ← Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0)
  const pendingOrders = orders.filter(o => o.status === 'confirmed' || o.status === 'processing').length
  const shippedOrders = orders.filter(o => o.status === 'shipped').length
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length

  const filteredOrders = orders.filter(order => {
    const matchSearch =
      !searchQuery.trim() ||
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress?.phone?.includes(searchQuery)
    const matchStatus = statusFilter === 'all' || order.status === statusFilter
    return matchSearch && matchStatus
  })

  const allProducts = getAllProducts()

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      {/* Top Header */}
      <header className="bg-[#FFFFFF] border-b border-[#999999]/30 sticky top-0 z-30">
        <div className="container py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#999999]/30 flex items-center justify-center text-[#4E5F52]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-sm sm:text-base font-semibold text-[#1C1D1F]">
                  Operations Terminal
                </h1>
                <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30 font-medium">
                  Verified Session
                </span>
              </div>
              <p className="text-[10px] text-[#737373] hidden sm:block">
                Ayurveda Global Commerce Operations &amp; Fulfillment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadDashboardData}
              className="p-2 rounded-lg text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors text-xs flex items-center gap-1.5"
              title="Refresh Terminal Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-lg text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors text-xs flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Store</span>
            </Link>
            <button
              onClick={handleLogout}
              className="py-1.5 px-3 rounded-full bg-[#FAF7F2] border border-[#999999]/30 hover:border-red-300 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Terminal</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="container overflow-x-auto">
          <div className="flex gap-2 border-t border-[#999999]/20 pt-2 pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#1C1D1F] text-[#FAF7F2]'
                  : 'text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2]'
              }`}
            >
              Overview &amp; KPIs
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-[#1C1D1F] text-[#FAF7F2]'
                  : 'text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2]'
              }`}
            >
              <span>Orders Ledger</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#EFF4F0] text-[#4E5F52] font-semibold">
                {orders.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'inventory'
                  ? 'bg-[#1C1D1F] text-[#FAF7F2]'
                  : 'text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2]'
              }`}
            >
              Inventory ({allProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-[#1C1D1F] text-[#FAF7F2]'
                  : 'text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2]'
              }`}
            >
              Traffic &amp; Funnel
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#1C1D1F] text-[#FAF7F2]'
                  : 'text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2]'
              }`}
            >
              Store Configuration
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container py-6 sm:py-8 space-y-6">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between text-[#737373] mb-2">
                  <span className="text-xs uppercase tracking-wider font-medium">Gross Revenue</span>
                  <DollarSign className="w-4 h-4 text-[#4E5F52]" />
                </div>
                <div className="font-heading text-lg sm:text-2xl font-semibold text-[#1C1D1F]">
                  {formatINR(totalRevenue)}
                </div>
                <p className="text-[11px] text-[#737373] mt-1">Across all order channels</p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between text-[#737373] mb-2">
                  <span className="text-xs uppercase tracking-wider font-medium">Total Orders</span>
                  <Package className="w-4 h-4 text-[#4E5F52]" />
                </div>
                <div className="font-heading text-lg sm:text-2xl font-semibold text-[#1C1D1F]">
                  {orders.length}
                </div>
                <p className="text-[11px] text-[#4E5F52] mt-1 font-medium">{pendingOrders} awaiting fulfillment</p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between text-[#737373] mb-2">
                  <span className="text-xs uppercase tracking-wider font-medium">Delivered / Shipped</span>
                  <Truck className="w-4 h-4 text-[#4E5F52]" />
                </div>
                <div className="font-heading text-lg sm:text-2xl font-semibold text-[#1C1D1F]">
                  {shippedOrders + deliveredOrders}
                </div>
                <p className="text-[11px] text-[#737373] mt-1">{deliveredOrders} verified delivered</p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-4 shadow-xs">
                <div className="flex items-center justify-between text-[#737373] mb-2">
                  <span className="text-xs uppercase tracking-wider font-medium">Store Conversion</span>
                  <TrendingUp className="w-4 h-4 text-[#4E5F52]" />
                </div>
                <div className="font-heading text-lg sm:text-2xl font-semibold text-[#1C1D1F]">
                  {analytics?.funnel.conversionRate || 0}%
                </div>
                <p className="text-[11px] text-[#737373] mt-1">{analytics?.funnel.ordersCompleted || 0} purchases recorded</p>
              </div>
            </div>

            {/* Quick Overview Section */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Latest Orders */}
              <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-base font-medium text-[#1C1D1F]">Recent Orders</h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#4E5F52] hover:underline font-medium"
                  >
                    View All ({orders.length}) →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {orders.slice(0, 5).map(order => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="p-3 rounded-lg bg-[#FAF7F2] border border-[#999999]/30 hover:border-[#1C1D1F] transition-colors flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#1C1D1F]">
                            #{order.orderNumber || order.id}
                          </span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full uppercase font-mono font-semibold bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/20">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#555555] mt-0.5">
                          {order.shippingAddress?.firstName ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName || ''}` : order.customerName || 'Customer Patron'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-xs text-[#1C1D1F] block">{formatINR(order.total)}</span>
                        <span className="text-[10px] text-[#737373]">{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formulation Inventory Health */}
              <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-5 shadow-xs space-y-4">
                <h2 className="font-heading text-base font-medium text-[#1C1D1F]">Inventory Status</h2>
                <div className="space-y-3">
                  {allProducts.map(p => (
                    <div key={p.id} className="flex items-center justify-between text-xs pb-2 border-b border-[#999999]/15">
                      <div className="min-w-0 pr-2">
                        <p className="font-medium text-[#1C1D1F] truncate">{p.name}</p>
                        <p className="text-[10.5px] text-[#737373]">{formatINR(p.price)}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#EFF4F0] text-[#4E5F52] font-semibold whitespace-nowrap">
                        {p.inventory.quantity} in stock
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Filters Bar */}
            <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by Order #, Name, Phone..."
                  className="w-full pl-9 pr-3 py-1.5 bg-[#FAF7F2] border border-[#999999]/30 rounded-lg text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none focus:ring-1 focus:ring-[#1C1D1F]"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['all', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-full text-xs capitalize transition-colors ${
                      statusFilter === st
                        ? 'bg-[#1C1D1F] text-[#FAF7F2] font-semibold'
                        : 'bg-[#FAF7F2] text-[#737373] hover:text-[#1C1D1F] border border-[#999999]/30'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#999999]/30 text-[#737373] uppercase tracking-wider text-[10.5px]">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Order ID</th>
                      <th className="py-3 px-4 font-semibold">Customer</th>
                      <th className="py-3 px-4 font-semibold">Date</th>
                      <th className="py-3 px-4 font-semibold">Payment</th>
                      <th className="py-3 px-4 font-semibold">Total</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#999999]/15">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-[#737373]">
                          No orders matched your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(order => (
                        <tr key={order.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                          <td className="py-3 px-4 font-mono font-semibold text-[#1C1D1F]">
                            #{order.orderNumber || order.id}
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-[#1C1D1F]">
                              {order.shippingAddress?.firstName ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName || ''}` : order.customerName || 'Customer'}
                            </p>
                            <p className="text-[10.5px] text-[#737373]">
                              {order.shippingAddress?.phone || order.customerPhone || 'N/A'}
                            </p>
                          </td>
                          <td className="py-3 px-4 text-[#737373]">{formatDate(order.createdAt)}</td>
                          <td className="py-3 px-4 uppercase font-mono text-[10.5px]">
                            {order.paymentMethod === 'cod' ? 'COD' : 'WhatsApp'}
                          </td>
                          <td className="py-3 px-4 font-semibold text-[#1C1D1F]">{formatINR(order.total)}</td>
                          <td className="py-3 px-4">
                            <select
                              value={order.status}
                              onChange={e => handleStatusChange(order.id, e.target.value)}
                              className="py-1 px-2 rounded-lg bg-[#FAF7F2] border border-[#999999]/30 text-xs text-[#1C1D1F] font-medium focus:outline-none cursor-pointer"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="p-1.5 rounded-lg text-[#4E5F52] hover:bg-[#EFF4F0] font-medium"
                              title="Inspect Order Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Inventory */}
        {activeTab === 'inventory' && (
          <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-base font-semibold text-[#1C1D1F]">Formulation Inventory</h2>
                <p className="text-xs text-[#737373] mt-0.5">Manage live stock counts and Ayurvedic apothecary catalog</p>
              </div>
              <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-[#EFF4F0] text-[#4E5F52]">
                6 Active SKU Formulations
              </span>
            </div>

            <div className="divide-y divide-[#999999]/20">
              {allProducts.map(product => (
                <div key={product.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#FAF7F2] border border-[#999999]/20 overflow-hidden relative flex-shrink-0">
                      <Image
                        src={product.images[0]?.src || '/images/products/body-essential-nutrition-thumb.jpg'}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-medium text-xs sm:text-sm text-[#1C1D1F]">{product.name}</h3>
                      <p className="text-[11px] font-mono text-[#737373]">SKU: {(product as any).sku || product.id} • {product.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-xs text-[#1C1D1F]">{formatINR(product.price)}</p>
                      <p className="text-[10px] text-[#737373]">MRP {formatINR(product.compareAtPrice || product.price)}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30 font-semibold">
                      {product.inventory.quantity} units
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Traffic & Funnel Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-4 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-[#737373] block mb-1">Page Views</span>
                <span className="font-heading text-xl sm:text-2xl font-semibold text-[#1C1D1F]">
                  {analytics?.totalPageViews || 0}
                </span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-4 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-[#737373] block mb-1">Add to Cart Actions</span>
                <span className="font-heading text-xl sm:text-2xl font-semibold text-[#1C1D1F]">
                  {analytics?.funnel.addToCart || 0}
                </span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-4 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-[#737373] block mb-1">Checkout Initiations</span>
                <span className="font-heading text-xl sm:text-2xl font-semibold text-[#1C1D1F]">
                  {analytics?.funnel.checkoutStarts || 0}
                </span>
              </div>
              <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-4 shadow-xs">
                <span className="text-[11px] uppercase tracking-wider text-[#737373] block mb-1">Orders Finalized</span>
                <span className="font-heading text-xl sm:text-2xl font-semibold text-[#4E5F52]">
                  {analytics?.funnel.ordersCompleted || 0}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Funnel Dropoff */}
              <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-5 shadow-xs space-y-4">
                <h3 className="font-heading text-base font-semibold text-[#1C1D1F]">E-Commerce Conversion Funnel</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-[#737373] mb-1">
                      <span>1. Formulation Views</span>
                      <span className="font-semibold text-[#1C1D1F]">{analytics?.funnel.productViews || 0}</span>
                    </div>
                    <div className="w-full bg-[#FAF7F2] rounded-full h-2 overflow-hidden border border-[#999999]/20">
                      <div className="bg-[#4E5F52] h-full rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#737373] mb-1">
                      <span>2. Added to Cart</span>
                      <span className="font-semibold text-[#1C1D1F]">{analytics?.funnel.addToCart || 0}</span>
                    </div>
                    <div className="w-full bg-[#FAF7F2] rounded-full h-2 overflow-hidden border border-[#999999]/20">
                      <div
                        className="bg-[#4E5F52] h-full rounded-full"
                        style={{
                          width: `${Math.min(100, Math.round(((analytics?.funnel.addToCart || 0) / Math.max(1, analytics?.funnel.productViews || 1)) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#737373] mb-1">
                      <span>3. Checkout Started</span>
                      <span className="font-semibold text-[#1C1D1F]">{analytics?.funnel.checkoutStarts || 0}</span>
                    </div>
                    <div className="w-full bg-[#FAF7F2] rounded-full h-2 overflow-hidden border border-[#999999]/20">
                      <div
                        className="bg-[#4E5F52] h-full rounded-full"
                        style={{
                          width: `${Math.min(100, Math.round(((analytics?.funnel.checkoutStarts || 0) / Math.max(1, analytics?.funnel.productViews || 1)) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#737373] mb-1">
                      <span>4. Order Confirmed</span>
                      <span className="font-semibold text-[#4E5F52]">{analytics?.funnel.ordersCompleted || 0}</span>
                    </div>
                    <div className="w-full bg-[#FAF7F2] rounded-full h-2 overflow-hidden border border-[#999999]/20">
                      <div
                        className="bg-[#4E5F52] h-full rounded-full"
                        style={{
                          width: `${Math.min(100, Math.round(((analytics?.funnel.ordersCompleted || 0) / Math.max(1, analytics?.funnel.productViews || 1)) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Breakdown */}
              <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-5 shadow-xs space-y-4">
                <h3 className="font-heading text-base font-semibold text-[#1C1D1F]">Visitor Device Mix</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#999999]/30">
                    <Smartphone className="w-5 h-5 mx-auto mb-1 text-[#4E5F52]" />
                    <span className="text-[11px] text-[#737373] block">Mobile</span>
                    <span className="font-heading text-base font-semibold text-[#1C1D1F]">
                      {analytics?.deviceBreakdown.mobile || 0}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#999999]/30">
                    <Tablet className="w-5 h-5 mx-auto mb-1 text-[#4E5F52]" />
                    <span className="text-[11px] text-[#737373] block">Tablet</span>
                    <span className="font-heading text-base font-semibold text-[#1C1D1F]">
                      {analytics?.deviceBreakdown.tablet || 0}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#999999]/30">
                    <Monitor className="w-5 h-5 mx-auto mb-1 text-[#4E5F52]" />
                    <span className="text-[11px] text-[#737373] block">Desktop</span>
                    <span className="font-heading text-base font-semibold text-[#1C1D1F]">
                      {analytics?.deviceBreakdown.desktop || 0}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#737373] mb-2">
                    Top Visited Pages
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {(analytics?.topPages || []).map((tp, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-[#999999]/15">
                        <span className="font-mono text-[#1C1D1F] truncate">{tp.path}</span>
                        <span className="text-[#737373] font-medium">{tp.count} views</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Settings */}
        {activeTab === 'settings' && (
          <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-xl p-5 shadow-xs space-y-6 max-w-2xl">
            <div>
              <h2 className="font-heading text-base font-semibold text-[#1C1D1F]">Apothecary Store Settings</h2>
              <p className="text-xs text-[#737373] mt-0.5">Configure fulfillment rules and concierge parameters</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#999999]/30 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1C1D1F]">Free Shipping Threshold</p>
                  <p className="text-[#737373]">Orders at or above ₹999 qualify for complimentary express courier.</p>
                </div>
                <span className="font-mono font-bold text-[#4E5F52] bg-[#FFFFFF] px-3 py-1 rounded-lg border border-[#999999]/30">
                  ₹999.00
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#999999]/30 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1C1D1F]">Doorstep Cash on Delivery (COD)</p>
                  <p className="text-[#737373]">Enabled across all serviceable Indian pincodes with OTP verification.</p>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30">
                  Active
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#999999]/30 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1C1D1F]">100% Confidential Packaging</p>
                  <p className="text-[#737373]">Plain brown corrugated shipper with neutral sender label.</p>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30">
                  Enforced
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Order Inspection Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#999999]/30 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#999999]/30 pb-3">
              <div>
                <h3 className="font-heading text-base font-semibold text-[#1C1D1F]">
                  Order #{selectedOrder.orderNumber || selectedOrder.id}
                </h3>
                <p className="text-[11px] text-[#737373] font-mono">Placed on {formatDate(selectedOrder.createdAt)}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-[#737373] hover:text-[#1C1D1F]"
              >
                ✕
              </button>
            </div>

            {/* Customer Details */}
            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#999999]/30 space-y-1.5 text-xs">
              <span className="font-semibold uppercase tracking-wider text-[10px] text-[#4E5F52] block">
                Patron &amp; Shipping Information
              </span>
              <p className="font-medium text-[#1C1D1F]">
                {selectedOrder.shippingAddress?.firstName ? `${selectedOrder.shippingAddress.firstName} ${selectedOrder.shippingAddress.lastName || ''}` : selectedOrder.customerName || 'Patron'}
              </p>
              <p className="text-[#555555]">
                {selectedOrder.shippingAddress?.addressLine1 || 'Direct order'}<br />
                {selectedOrder.shippingAddress?.city && `${selectedOrder.shippingAddress.city}, `}
                {selectedOrder.shippingAddress?.state && `${selectedOrder.shippingAddress.state} `}
                {selectedOrder.shippingAddress?.pincode && `- ${selectedOrder.shippingAddress.pincode}`}
              </p>
              <p className="font-mono text-[#737373] pt-1">
                Phone: {selectedOrder.shippingAddress?.phone || selectedOrder.customerPhone || 'N/A'}
              </p>
            </div>

            {/* Items */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-[10px] text-[#737373] block">
                Formulations
              </span>
              {(selectedOrder.items || []).map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center py-1.5 border-b border-[#999999]/15">
                  <div>
                    <p className="font-medium text-[#1C1D1F]">{item.name || item.productName}</p>
                    <p className="text-[10px] text-[#737373]">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-[#1C1D1F]">{formatINR((item.price || 0) * (item.quantity || 1))}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-semibold text-sm text-[#1C1D1F]">
                <span>Total Amount:</span>
                <span>{formatINR(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex gap-2">
              <Button
                variant="whatsapp"
                size="sm"
                className="w-full text-xs font-medium rounded-full"
                onClick={() => {
                  const phone = selectedOrder.shippingAddress?.phone || selectedOrder.customerPhone || ''
                  const msg = `Pranam ${selectedOrder.shippingAddress?.firstName || 'Patron'}, this is the Ayurveda Global Concierge desk regarding your order #${selectedOrder.orderNumber || selectedOrder.id}. We are preparing your discreet parcel for dispatch.`
                  window.open(buildWhatsAppUrl(msg, phone), '_blank')
                }}
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1" /> Contact Customer on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
