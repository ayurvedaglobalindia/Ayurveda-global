import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      source,
      productId,
      productName,
      customerName,
      customerPhone,
      customerEmail,
      quantity,
      orderTotal,
      messagePreview,
      userAgent,
      referrer,
    } = body

    const stmt = db.prepare(`
      INSERT INTO whatsapp_leads (
        source, product_id, product_name, customer_name, customer_phone,
        customer_email, quantity, order_total, message_preview,
        user_agent, referrer
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      source,
      productId || null,
      productName || null,
      customerName || null,
      customerPhone || null,
      customerEmail || null,
      quantity || null,
      orderTotal || null,
      messagePreview || null,
      userAgent || '',
      referrer || ''
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking WhatsApp lead:', error)
    return NextResponse.json({ success: true }) // Don't fail the user experience
  }
}

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM whatsapp_leads ORDER BY created_at DESC LIMIT 100')
    const leads = stmt.all()
    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ leads: [] })
  }
}