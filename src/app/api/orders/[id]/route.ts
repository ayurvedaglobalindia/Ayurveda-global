import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id
    const stmt = db.prepare('SELECT * FROM orders WHERE id = ?')
    const order = stmt.get(id)

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id
    const body = await request.json()
    const { status, note } = body

    const validStatuses = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const stmt = db.prepare('UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
    const result = stmt.run(status, id)

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Add to history
    const historyStmt = db.prepare(`
      INSERT INTO order_status_history (order_id, status, note)
      VALUES (?, ?, ?)
    `)
    historyStmt.run(id, status, note || `Status updated to ${status}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}