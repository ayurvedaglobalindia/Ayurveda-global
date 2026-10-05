'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      trackEvent('page_view', { path: pathname })
    }
  }, [pathname])

  return null
}
