import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body // [{ productId, variantId, quantity }]

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ success: false, error: 'Invalid items' }, { status: 400 })
    }

    // Check stock for all items
    const checkStmt = db.prepare('SELECT id, inventory_quantity, track_inventory FROM products WHERE id = ?')
    
    for (const item of items) {
      const product = checkStmt.get(item.productId)
      if (!product) {
        return NextResponse.json({ success: false, error: `Product ${item.productId} not found` }, { status: 404 })
      }
      if (product.track_inventory && product.inventory_quantity < item.quantity) {
        return NextResponse.json({ 
          success: false, 
          error: `Insufficient stock for ${item.productId}. Available: ${product.inventory_quantity}` 
        }, { status: 400 })
      }
    }

    // Reserve stock (decrement)
    const updateStmt = db.prepare('UPDATE products SET inventory_quantity = inventory_quantity - ? WHERE id = ? AND track_inventory = 1')
    
    const transaction = db.transaction((items: any[]) => {
      for (const item of items) {
        updateStmt.run(item.quantity, item.productId)
      }
    })

    transaction(items)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reserving stock:', error)
    return NextResponse.json({ success: false, error: 'Failed to reserve stock' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ success: false, error: 'Invalid items' }, { status: 400 })
    }

    // Release stock (increment back)
    const updateStmt = db.prepare('UPDATE products SET inventory_quantity = inventory_quantity + ? WHERE id = ? AND track_inventory = 1')
    
    const transaction = db.transaction((items: any[]) => {
      for (const item of items) {
        updateStmt.run(item.quantity, item.productId)
      }
    })

    transaction(items)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error releasing stock:', error)
    return NextResponse.json({ success: false, error: 'Failed to release stock' }, { status: 500 })
  }
}