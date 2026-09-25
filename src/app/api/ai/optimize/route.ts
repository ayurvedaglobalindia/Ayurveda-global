import { NextRequest, NextResponse } from 'next/server'
import { generateSeoMetadata, optimizeProductCopy, optimizeSearchQuery } from '@/lib/ai-service'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action, payload } = body

    if (action === 'seo') {
      const seo = await generateSeoMetadata(payload || {})
      return NextResponse.json({ success: true, data: seo })
    }

    if (action === 'copy') {
      const copy = await optimizeProductCopy(payload || {})
      return NextResponse.json({ success: true, data: copy })
    }

    if (action === 'search') {
      const expanded = await optimizeSearchQuery(payload?.query || '')
      return NextResponse.json({ success: true, data: expanded })
    }

    return NextResponse.json({ success: false, error: 'Unknown action specified' }, { status: 400 })
  } catch (error: any) {
    console.error('AI Optimize API error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
