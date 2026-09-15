import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { validateCoupon } from '@/lib/coupons'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, subtotal, productIds, categories } = body

    if (!code) {
      return NextResponse.json({ valid: false, error: 'Coupon code required' }, { status: 400 })
    }

    const result = validateCoupon(code.toUpperCase(), subtotal, productIds || [], categories || [])

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error validating coupon:', error)
    return NextResponse.json({ valid: false, error: 'Failed to validate coupon' }, { status: 500 })
  }
}