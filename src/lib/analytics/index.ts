'use client'

/**
 * Privacy-Conscious Ayurvedic Apothecary Analytics Engine
 * Tracks zero-PII metrics locally and calculates real funnel, marketing UTMs,
 * traffic sources, and conversion rates for the Admin Control Panel.
 */

export type AnalyticsEventType =
  | 'page_view'
  | 'product_view'
  | 'search'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'checkout_start'
  | 'order_conversion'
  | 'whatsapp_click'
  | 'phone_click'
  | 'share'

export interface AnalyticsEvent {
  id: string
  type: AnalyticsEventType
  timestamp: string
  path: string
  referrer?: string
  device: 'mobile' | 'tablet' | 'desktop'
  utm?: {
    source?: string
    medium?: string
    campaign?: string
    term?: string
    content?: string
  }
  metadata?: Record<string, any>
}

export type DateRange = 'today' | 'yesterday' | '7d' | '30d' | 'all'

export interface ProductPerformance {
  id: string
  name: string
  views: number
  addToCart: number
  orders: number
  revenue: number
}

export interface AnalyticsSummary {
  totalPageViews: number
  totalImpressions: number
  totalClicks: number
  uniqueSessions: number
  totalSearches: number
  whatsappClicks: number
  phoneClicks: number
  topPages: { path: string; count: number }[]
  topProductsViewed: { id: string; name: string; views: number }[]
  productPerformance: ProductPerformance[]
  funnel: {
    visitors: number
    productViews: number
    addToCartOrWhatsApp: number
    checkoutStarts: number
    ordersCompleted: number
    conversionRate: number
  }
  deviceBreakdown: {
    mobile: number
    tablet: number
    desktop: number
  }
  trafficSources: { source: string; count: number }[]
  campaigns: { campaign: string; source: string; count: number }[]
  geoBreakdown: { region: string; count: number }[]
  recentEvents: AnalyticsEvent[]
}

const STORAGE_KEY = 'ayur_analytics_events'
const SESSION_KEY = 'ayur_session_id'
const UTM_STORAGE_KEY = 'ayur_utm_params'

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width < 640) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

export function captureUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const params = new URLSearchParams(window.location.search)
    const utm: Record<string, string> = {}
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    let hasUTM = false
    keys.forEach(k => {
      const val = params.get(k)
      if (val) {
        utm[k.replace('utm_', '')] = val
        hasUTM = true
      }
    })
    if (hasUTM) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm))
      return utm
    }
    const saved = sessionStorage.getItem(UTM_STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

export function trackEvent(type: AnalyticsEventType, metadata?: Record<string, any>) {
  if (typeof window === 'undefined') return

  try {
    const utm = captureUTMParams()
    const referrerHostname = document.referrer
      ? new URL(document.referrer, window.location.href).hostname
      : undefined

    const event: AnalyticsEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      referrer: referrerHostname,
      device: getDeviceType(),
      utm: Object.keys(utm).length > 0 ? utm : undefined,
      metadata,
    }

    const existing: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    existing.unshift(event)
    // Keep up to 500 events
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 500)))

    // Optional environment-configured endpoint
    const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT
    if (endpoint) {
      navigator.sendBeacon?.(endpoint, JSON.stringify(event))
    }
  } catch {}
}

export function filterEventsByDate(events: AnalyticsEvent[], range: DateRange): AnalyticsEvent[] {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()

  return events.filter(e => {
    const time = new Date(e.timestamp).getTime()
    if (range === 'today') {
      return time >= startOfDay
    }
    if (range === 'yesterday') {
      const startOfYesterday = startOfDay - 86400000
      return time >= startOfYesterday && time < startOfDay
    }
    if (range === '7d') {
      return time >= now.getTime() - 7 * 86400000
    }
    if (range === '30d') {
      return time >= now.getTime() - 30 * 86400000
    }
    return true
  })
}

export function getAnalyticsSummary(range: DateRange = 'all'): AnalyticsSummary {
  if (typeof window === 'undefined') {
    return {
      totalPageViews: 0,
      totalImpressions: 0,
      totalClicks: 0,
      uniqueSessions: 0,
      totalSearches: 0,
      whatsappClicks: 0,
      phoneClicks: 0,
      topPages: [],
      topProductsViewed: [],
      productPerformance: [],
      funnel: {
        visitors: 0,
        productViews: 0,
        addToCartOrWhatsApp: 0,
        checkoutStarts: 0,
        ordersCompleted: 0,
        conversionRate: 0,
      },
      deviceBreakdown: { mobile: 0, tablet: 0, desktop: 0 },
      trafficSources: [],
      campaigns: [],
      geoBreakdown: [],
      recentEvents: [],
    }
  }

  try {
    const rawEvents: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const events = filterEventsByDate(rawEvents, range)

    // Also pull recorded orders from localStorage for cross-matching
    const orders: any[] = JSON.parse(localStorage.getItem('ayur_orders') || '[]')

    const pageViews = events.filter(e => e.type === 'page_view')
    const productViews = events.filter(e => e.type === 'product_view')
    const searches = events.filter(e => e.type === 'search')
    const addCartEvents = events.filter(e => e.type === 'add_to_cart')
    const whatsappClicks = events.filter(e => e.type === 'whatsapp_click')
    const phoneClicks = events.filter(e => e.type === 'phone_click')
    const checkoutStarts = events.filter(e => e.type === 'checkout_start')
    const orderConversions = events.filter(e => e.type === 'order_conversion')

    // Top pages
    const pageCounts: Record<string, number> = {}
    pageViews.forEach(e => {
      pageCounts[e.path] = (pageCounts[e.path] || 0) + 1
    })
    const topPages = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Top products viewed
    const productMap: Record<string, ProductPerformance> = {}
    productViews.forEach(e => {
      const pid = e.metadata?.productId || 'unknown'
      const name = e.metadata?.productName || pid
      if (!productMap[pid]) {
        productMap[pid] = { id: pid, name, views: 0, addToCart: 0, orders: 0, revenue: 0 }
      }
      productMap[pid].views += 1
    })

    addCartEvents.forEach(e => {
      const pid = e.metadata?.productId || 'unknown'
      if (productMap[pid]) {
        productMap[pid].addToCart += 1
      }
    })

    // Process actual orders into product performance & geo
    const geoMap: Record<string, number> = {}
    orders.forEach(o => {
      const state = o.shippingAddress?.state || o.shippingAddress?.city || 'India'
      geoMap[state] = (geoMap[state] || 0) + 1

      if (Array.isArray(o.items)) {
        o.items.forEach((it: any) => {
          const pid = it.productId || it.id || 'unknown'
          const name = it.name || it.productName || pid
          if (!productMap[pid]) {
            productMap[pid] = { id: pid, name, views: 0, addToCart: 0, orders: 0, revenue: 0 }
          }
          productMap[pid].orders += it.quantity || 1
          productMap[pid].revenue += (it.price || 0) * (it.quantity || 1)
        })
      }
    })

    const productPerformance = Object.values(productMap).sort((a, b) => b.views - a.views)
    const topProductsViewed = productPerformance.slice(0, 5).map(p => ({
      id: p.id,
      name: p.name,
      views: p.views,
    }))

    // Device breakdown
    const devices = { mobile: 0, tablet: 0, desktop: 0 }
    events.forEach(e => {
      if (devices[e.device] !== undefined) {
        devices[e.device] += 1
      }
    })

    // Traffic sources & campaigns
    const sourceMap: Record<string, number> = {}
    const campaignMap: Record<string, { source: string; count: number }> = {}

    events.forEach(e => {
      const src = e.utm?.source || e.referrer || 'Direct / Organic'
      sourceMap[src] = (sourceMap[src] || 0) + 1

      if (e.utm?.campaign) {
        const cKey = e.utm.campaign
        if (!campaignMap[cKey]) {
          campaignMap[cKey] = { source: e.utm.source || 'ad', count: 0 }
        }
        campaignMap[cKey].count += 1
      }
    })

    const trafficSources = Object.entries(sourceMap)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)

    const campaigns = Object.entries(campaignMap)
      .map(([campaign, data]) => ({ campaign, source: data.source, count: data.count }))
      .sort((a, b) => b.count - a.count)

    const geoBreakdown = Object.entries(geoMap)
      .map(([region, count]) => ({ region, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)

    // Funnel calculations
    const visitors = Math.max(1, new Set(events.map(e => e.timestamp.slice(0, 13))).size)
    const addToCartOrWhatsApp = addCartEvents.length + whatsappClicks.length
    const ordersCompleted = Math.max(orderConversions.length, orders.length)
    const conversionRate = productViews.length > 0
      ? Number(((ordersCompleted / productViews.length) * 100).toFixed(1))
      : 0

    return {
      totalPageViews: pageViews.length,
      totalImpressions: pageViews.length + productViews.length,
      totalClicks: addCartEvents.length + whatsappClicks.length + phoneClicks.length,
      uniqueSessions: visitors,
      totalSearches: searches.length,
      whatsappClicks: whatsappClicks.length,
      phoneClicks: phoneClicks.length,
      topPages,
      topProductsViewed,
      productPerformance,
      funnel: {
        visitors,
        productViews: productViews.length,
        addToCartOrWhatsApp,
        checkoutStarts: checkoutStarts.length,
        ordersCompleted,
        conversionRate,
      },
      deviceBreakdown: devices,
      trafficSources,
      campaigns,
      geoBreakdown,
      recentEvents: events.slice(0, 20),
    }
  } catch {
    return {
      totalPageViews: 0,
      totalImpressions: 0,
      totalClicks: 0,
      uniqueSessions: 0,
      totalSearches: 0,
      whatsappClicks: 0,
      phoneClicks: 0,
      topPages: [],
      topProductsViewed: [],
      productPerformance: [],
      funnel: {
        visitors: 0,
        productViews: 0,
        addToCartOrWhatsApp: 0,
        checkoutStarts: 0,
        ordersCompleted: 0,
        conversionRate: 0,
      },
      deviceBreakdown: { mobile: 0, tablet: 0, desktop: 0 },
      trafficSources: [],
      campaigns: [],
      geoBreakdown: [],
      recentEvents: [],
    }
  }
}

export function downloadOrdersCSV(orders: any[]) {
  if (typeof window === 'undefined') return
  const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'City', 'State', 'Pincode', 'Items', 'Payment Method', 'Status', 'Total (INR)']
  const rows = orders.map(o => {
    const itemsStr = (o.items || []).map((i: any) => `${i.name || i.productName} (x${i.quantity})`).join('; ')
    const totalINR = o.total >= 10000 ? Math.round(o.total / 100) : Math.round(o.total)
    return [
      `"${o.orderNumber || o.id}"`,
      `"${o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN') : ''}"`,
      `"${o.customerName || `${o.shippingAddress?.firstName || ''} ${o.shippingAddress?.lastName || ''}`.trim()}"`,
      `"${o.customerPhone || o.shippingAddress?.phone || ''}"`,
      `"${o.shippingAddress?.city || ''}"`,
      `"${o.shippingAddress?.state || ''}"`,
      `"${o.shippingAddress?.pincode || ''}"`,
      `"${itemsStr.replace(/"/g, '""')}"`,
      `"${o.paymentMethod || 'whatsapp'}"`,
      `"${o.status || 'confirmed'}"`,
      totalINR,
    ].join(',')
  })

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n')
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `ayurveda_global_orders_${Date.now()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function downloadAnalyticsCSV(summary: AnalyticsSummary) {
  if (typeof window === 'undefined') return
  const lines = [
    'Metric,Value',
    `Total Page Views,${summary.totalPageViews}`,
    `Total Impressions,${summary.totalImpressions}`,
    `Unique Visitors/Sessions,${summary.uniqueSessions}`,
    `Product Views,${summary.funnel.productViews}`,
    `Add to Cart & WhatsApp Leads,${summary.funnel.addToCartOrWhatsApp}`,
    `Checkout Starts,${summary.funnel.checkoutStarts}`,
    `Orders Completed,${summary.funnel.ordersCompleted}`,
    `Conversion Rate %,${summary.funnel.conversionRate}%`,
    `WhatsApp Concierge Clicks,${summary.whatsappClicks}`,
    `Phone Clicks,${summary.phoneClicks}`,
    `Mobile Visitors,${summary.deviceBreakdown.mobile}`,
    `Desktop Visitors,${summary.deviceBreakdown.desktop}`,
    '',
    'Product Performance:',
    'Product Name,Views,Add to Cart,Orders,Revenue (INR)',
    ...summary.productPerformance.map(p =>
      `"${p.name}",${p.views},${p.addToCart},${p.orders},${p.revenue >= 10000 ? Math.round(p.revenue / 100) : p.revenue}`
    ),
    '',
    'Top Traffic Sources:',
    'Source,Hits',
    ...summary.trafficSources.map(s => `"${s.source}",${s.count}`),
  ]

  const csvContent = 'data:text/csv;charset=utf-8,' + lines.join('\n')
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `ayurveda_global_analytics_${Date.now()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function clearAllAnalyticsData(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem('ayur_orders')
    localStorage.removeItem('ayur-veda-whatsapp-leads')
  } catch {}
}

