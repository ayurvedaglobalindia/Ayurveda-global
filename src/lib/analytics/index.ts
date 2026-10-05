'use client'

/**
 * Privacy-Conscious Ayurvedic Apothecary Analytics Engine
 * Stores zero-PII anonymous metrics locally and optionally dispatches to
 * configured analytics endpoints (Cloudflare Web Analytics / Plausible / custom webhook).
 */

export type AnalyticsEventType =
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'checkout_start'
  | 'order_conversion'
  | 'whatsapp_consult'

export interface AnalyticsEvent {
  id: string
  type: AnalyticsEventType
  timestamp: string
  path: string
  referrer?: string
  device: 'mobile' | 'tablet' | 'desktop'
  metadata?: Record<string, any>
}

export interface AnalyticsSummary {
  totalPageViews: number
  uniqueSessions: number
  topPages: { path: string; count: number }[]
  topProductsViewed: { id: string; name: string; views: number }[]
  funnel: {
    productViews: number
    addToCart: number
    checkoutStarts: number
    ordersCompleted: number
    conversionRate: number
  }
  deviceBreakdown: {
    mobile: number
    tablet: number
    desktop: number
  }
  recentEvents: AnalyticsEvent[]
}

const STORAGE_KEY = 'ayur_analytics_events'
const SESSION_KEY = 'ayur_session_id'

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width < 640) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

function getSessionId(): string {
  if (typeof window === 'undefined') return 'srv'
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

export function trackEvent(type: AnalyticsEventType, metadata?: Record<string, any>) {
  if (typeof window === 'undefined') return

  try {
    const event: AnalyticsEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      referrer: document.referrer ? new URL(document.referrer, window.location.href).hostname : undefined,
      device: getDeviceType(),
      metadata,
    }

    // Persist in local events log (max 200 events to respect storage)
    const existing: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    existing.unshift(event)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 200)))

    // Optional environment-configured endpoint
    const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT
    if (endpoint) {
      navigator.sendBeacon?.(endpoint, JSON.stringify(event))
    }
  } catch {}
}

export function getAnalyticsSummary(): AnalyticsSummary {
  if (typeof window === 'undefined') {
    return {
      totalPageViews: 0,
      uniqueSessions: 0,
      topPages: [],
      topProductsViewed: [],
      funnel: { productViews: 0, addToCart: 0, checkoutStarts: 0, ordersCompleted: 0, conversionRate: 0 },
      deviceBreakdown: { mobile: 0, tablet: 0, desktop: 0 },
      recentEvents: [],
    }
  }

  try {
    const events: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const pageViewEvents = events.filter(e => e.type === 'page_view')

    // Top pages
    const pageCounts: Record<string, number> = {}
    pageViewEvents.forEach(e => {
      pageCounts[e.path] = (pageCounts[e.path] || 0) + 1
    })
    const topPages = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Top products
    const productViewCounts: Record<string, { name: string; views: number }> = {}
    events.filter(e => e.type === 'product_view').forEach(e => {
      const pid = e.metadata?.productId || 'unknown'
      const name = e.metadata?.productName || pid
      if (!productViewCounts[pid]) {
        productViewCounts[pid] = { name, views: 0 }
      }
      productViewCounts[pid].views += 1
    })
    const topProductsViewed = Object.entries(productViewCounts)
      .map(([id, data]) => ({ id, name: data.name, views: data.views }))
      .sort((a, b) => b.views - a.views)

    // Device breakdown
    const devices = { mobile: 0, tablet: 0, desktop: 0 }
    events.forEach(e => {
      if (devices[e.device] !== undefined) {
        devices[e.device] += 1
      }
    })

    // Funnel counts
    const productViews = events.filter(e => e.type === 'product_view').length
    const addToCart = events.filter(e => e.type === 'add_to_cart').length
    const checkoutStarts = events.filter(e => e.type === 'checkout_start').length
    const ordersCompleted = events.filter(e => e.type === 'order_conversion').length
    const conversionRate = productViews > 0 ? Number(((ordersCompleted / productViews) * 100).toFixed(1)) : 0

    return {
      totalPageViews: pageViewEvents.length,
      uniqueSessions: Math.max(1, new Set(events.map(e => e.timestamp.slice(0, 13))).size),
      topPages,
      topProductsViewed,
      funnel: {
        productViews,
        addToCart,
        checkoutStarts,
        ordersCompleted,
        conversionRate,
      },
      deviceBreakdown: devices,
      recentEvents: events.slice(0, 15),
    }
  } catch {
    return {
      totalPageViews: 0,
      uniqueSessions: 0,
      topPages: [],
      topProductsViewed: [],
      funnel: { productViews: 0, addToCart: 0, checkoutStarts: 0, ordersCompleted: 0, conversionRate: 0 },
      deviceBreakdown: { mobile: 0, tablet: 0, desktop: 0 },
      recentEvents: [],
    }
  }
}
