import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 })
    }

    try {
      db.prepare(`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run()

      db.prepare(`
        INSERT OR IGNORE INTO newsletter_subscribers (email) VALUES (?)
      `).run(email.trim().toLowerCase())
    } catch (dbErr) {
      console.warn('Newsletter DB insert note:', dbErr)
    }

    return NextResponse.json({
      success: true,
      couponCode: 'AYUR10',
      discountPercent: 10,
      message: 'Welcome to Ayur Veda Global! Use coupon AYUR10 for 10% off your order.',
    })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 })
  }
}
