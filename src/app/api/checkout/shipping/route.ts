import { NextRequest, NextResponse } from 'next/server'
import { calculateShipping } from '@/lib/shipping'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subtotal, address } = body

    const shipping = calculateShipping(subtotal, address)

    return NextResponse.json(shipping)
  } catch (error) {
    console.error('Error calculating shipping:', error)
    return NextResponse.json({ error: 'Failed to calculate shipping' }, { status: 500 })
  }
}