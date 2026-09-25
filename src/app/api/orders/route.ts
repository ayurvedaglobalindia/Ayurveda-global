import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const payment = searchParams.get('payment') || ''
    const date = searchParams.get('date') || ''

    const offset = (page - 1) * limit

    let whereClause = 'WHERE 1=1'
    const params: any[] = []

    if (search) {
      whereClause += ' AND (customer_name LIKE ? OR customer_phone LIKE ? OR customer_email LIKE ? OR id LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm, searchTerm, searchTerm)
    }

    if (status) {
      whereClause += ' AND order_status = ?'
      params.push(status)
    }

    if (payment) {
      whereClause += ' AND payment_method = ?'
      params.push(payment)
    }

    if (date) {
      whereClause += ' AND date(created_at) = ?'
      params.push(date)
    }

    const countStmt = db.prepare(`SELECT COUNT(*) as total FROM orders ${whereClause}`)
    const countRes = countStmt.get(...params)
    const total = countRes ? (countRes.total ?? 0) : 0
    const totalPages = Math.ceil(total / limit)

    const ordersStmt = db.prepare(`
      SELECT * FROM orders ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `)
    params.push(limit, offset)
    const orders = ordersStmt.all(...params)

    return NextResponse.json({ orders, totalPages, total })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      billingAddress,
      items,
      subtotal,
      shipping,
      tax,
      discount,
      total,
      paymentMethod,
      couponCode,
      notes,
    } = body

    const orderId = body.id || body.orderId || body.orderNumber || `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    const orderNumber = body.orderNumber || orderId

    const stmt = db.prepare(`
      INSERT INTO orders (
        id, order_number, customer_name, customer_phone, customer_email,
        shipping_address_json, billing_address_json, items_json,
        subtotal, shipping_cost, tax_amount, discount_amount, total_amount,
        payment_method, payment_status, order_status, coupon_code, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      orderId,
      orderNumber,
      customerName,
      customerPhone,
      customerEmail || null,
      JSON.stringify(shippingAddress),
      JSON.stringify(billingAddress || shippingAddress),
      JSON.stringify(items),
      subtotal,
      shipping,
      tax,
      discount,
      total,
      paymentMethod,
      paymentMethod === 'whatsapp' ? 'pending' : 'pending',
      'confirmed',
      couponCode || null,
      notes || null
    )

    // Add initial status history
    const historyStmt = db.prepare(`
      INSERT INTO order_status_history (order_id, status, note)
      VALUES (?, ?, ?)
    `)
    historyStmt.run(orderId, 'confirmed', 'Order confirmed')

    return NextResponse.json({ success: true, orderId, orderNumber })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}