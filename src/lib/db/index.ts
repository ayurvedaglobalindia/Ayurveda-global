import { join } from 'path'
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'

const dataDir = join(process.cwd(), 'data')
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

const dbPath = join(dataDir, 'ayurveda.json')

if (!existsSync(dbPath)) {
  writeFileSync(dbPath, JSON.stringify({
    products: [],
    orders: [],
    orderStatusHistory: [],
    coupons: [],
    whatsappLeads: [],
    adminUsers: [],
  }, null, 2))
}

function readDB() {
  try {
    return JSON.parse(readFileSync(dbPath, 'utf8'))
  } catch {
    return { products: [], orders: [], orderStatusHistory: [], coupons: [], whatsappLeads: [], adminUsers: [] }
  }
}

function writeDB(data: any) {
  writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

function createStatement(sql: string) {
  return {
    run: (...params: any[]) => {
      const db = readDB()
      
      if (sql.includes('INSERT INTO products') || sql.includes('INSERT OR REPLACE INTO products')) {
        const product = {
          id: params[0], slug: params[1], name: params[2], tagline: params[3],
          description: params[4], short_description: params[5], category: params[6],
          price: params[7], compare_at_price: params[8], inventory_quantity: params[9],
          track_inventory: params[10], age_restricted: params[11],
          images_json: params[12], variants_json: params[13], ingredients_json: params[14],
          usage: params[15], warnings_json: params[16], tags_json: params[17], seo_json: params[18],
          created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
        }
        const idx = db.products.findIndex((p: any) => p.id === product.id)
        if (idx >= 0) db.products[idx] = product
        else db.products.push(product)
        writeDB(db)
        return { changes: 1 }
      }
      
      if (sql.includes('INSERT INTO orders') || sql.includes('INSERT OR REPLACE INTO orders')) {
        const order = {
          id: params[0], order_number: params[1], customer_name: params[2], customer_phone: params[3],
          customer_email: params[4], shipping_address_json: params[5], billing_address_json: params[6],
          items_json: params[7], subtotal: params[8], shipping_cost: params[9], tax_amount: params[10],
          discount_amount: params[11], total_amount: params[12], payment_method: params[13],
          payment_status: params[14], order_status: params[15], coupon_code: params[16],
          notes: params[17], whatsapp_message_sent: params[18],
          created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
        }
        const idx = db.orders.findIndex((o: any) => o.id === order.id)
        if (idx >= 0) db.orders[idx] = order
        else db.orders.push(order)
        writeDB(db)
        return { changes: 1 }
      }
      
      if (sql.includes('INSERT INTO order_status_history')) {
        db.orderStatusHistory.push({
          id: Date.now(),
          order_id: params[0],
          status: params[1],
          note: params[2],
          created_at: new Date().toISOString(),
        })
        writeDB(db)
        return { changes: 1 }
      }
      
      if (sql.includes('INSERT INTO whatsapp_leads')) {
        db.whatsappLeads.push({
          id: Date.now(),
          source: params[0],
          product_id: params[1],
          product_name: params[2],
          customer_name: params[3],
          customer_phone: params[4],
          customer_email: params[5],
          quantity: params[6],
          order_total: params[7],
          message_preview: params[8],
          user_agent: params[9],
          referrer: params[10],
          created_at: new Date().toISOString(),
        })
        writeDB(db)
        return { changes: 1 }
      }
      
      if (sql.includes('UPDATE orders SET order_status')) {
        const order = db.orders.find((o: any) => o.id === params[1])
        if (order) {
          order.order_status = params[0]
          order.updated_at = new Date().toISOString()
          writeDB(db)
          return { changes: 1 }
        }
        return { changes: 0 }
      }
      
      if (sql.includes('UPDATE products SET inventory_quantity = inventory_quantity -')) {
        const product = db.products.find((p: any) => p.id === params[1])
        if (product && product.track_inventory) {
          product.inventory_quantity = Math.max(0, product.inventory_quantity - params[0])
          writeDB(db)
        }
        return { changes: 1 }
      }
      
      if (sql.includes('UPDATE products SET inventory_quantity = inventory_quantity +')) {
        const product = db.products.find((p: any) => p.id === params[1])
        if (product && product.track_inventory) {
          product.inventory_quantity += params[0]
          writeDB(db)
        }
        return { changes: 1 }
      }
      
      return { changes: 0 }
    },
    get: (...params: any[]) => {
      const db = readDB()
      if (sql.includes('SELECT * FROM orders WHERE id = ?')) {
        return db.orders.find((o: any) => o.id === params[0])
      }
      if (sql.includes('SELECT * FROM products WHERE id = ?')) {
        return db.products.find((p: any) => p.id === params[0])
      }
      if (sql.includes('SELECT * FROM products WHERE slug = ?')) {
        return db.products.find((p: any) => p.slug === params[0])
      }
      if (sql.includes('SELECT * FROM admin_users WHERE username = ?')) {
        return db.adminUsers.find((u: any) => u.username === params[0])
      }
      if (sql.includes('SELECT * FROM coupons WHERE code = ?')) {
        return db.coupons.find((c: any) => c.code === params[0].toUpperCase())
      }
      return undefined
    },
    all: (...params: any[]) => {
      const db = readDB()
      if (sql.includes('SELECT * FROM orders')) {
        let result = [...db.orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        const limitMatch = sql.match(/LIMIT (\d+)/)
        const offsetMatch = sql.match(/OFFSET (\d+)/)
        const limit = limitMatch ? parseInt(limitMatch[1]) : 20
        const offset = offsetMatch ? parseInt(offsetMatch[1]) : 0
        return result.slice(offset, offset + limit)
      }
      if (sql.includes('SELECT * FROM whatsapp_leads')) {
        return [...db.whatsappLeads].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 100)
      }
      if (sql.includes('SELECT * FROM products')) {
        return db.products
      }
      return []
    },
  }
}

export const db = {
  exec: (sql: string) => {
    console.log('SQL exec (no-op):', sql.substring(0, 100))
  },
  prepare: (sql: string) => createStatement(sql),
  transaction: (fn: Function) => {
    return fn
  },
}

export function getDb() {
  return db
}

export function initializeDatabase() {
  console.log('JSON database initialized successfully')
}

initializeDatabase()