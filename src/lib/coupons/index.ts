import type { Coupon } from '@/types'

function getDbSafe() {
  if (typeof window === 'undefined') {
    try {
      return require('@/lib/db').db
    } catch {
      return null
    }
  }
  return null
}

interface DbCoupon {
  code: string
  type: 'percentage' | 'fixed' | 'free_shipping'
  value: number
  min_order_amount: number
  max_discount_amount?: number
  usage_limit: number
  used_count: number
  expires_at: string
  is_active: number | boolean
  applicable_products_json?: string
  applicable_categories_json?: string
}

function mapDbCoupon(row: DbCoupon): Coupon {
  return {
    code: row.code,
    type: row.type,
    value: row.value,
    minOrderAmount: row.min_order_amount,
    maxDiscountAmount: row.max_discount_amount,
    usageLimit: row.usage_limit,
    usedCount: row.used_count,
    expiresAt: row.expires_at,
    isActive: Boolean(row.is_active),
    applicableProducts: JSON.parse(row.applicable_products_json || '[]'),
    applicableCategories: JSON.parse(row.applicable_categories_json || '[]'),
  }
}

const defaultCoupons: Record<string, DbCoupon> = {
  AYUR10: {
    code: 'AYUR10',
    type: 'percentage',
    value: 10,
    min_order_amount: 0,
    max_discount_amount: 100000,
    usage_limit: 10000,
    used_count: 0,
    expires_at: '2028-12-31T23:59:59Z',
    is_active: 1,
    applicable_products_json: '[]',
    applicable_categories_json: '[]',
  },
  WELCOME10: {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    min_order_amount: 0,
    max_discount_amount: 100000,
    usage_limit: 10000,
    used_count: 0,
    expires_at: '2028-12-31T23:59:59Z',
    is_active: 1,
    applicable_products_json: '[]',
    applicable_categories_json: '[]',
  },
  AYUR20: {
    code: 'AYUR20',
    type: 'percentage',
    value: 20,
    min_order_amount: 250000,
    max_discount_amount: 150000,
    usage_limit: 5000,
    used_count: 0,
    expires_at: '2028-12-31T23:59:59Z',
    is_active: 1,
    applicable_products_json: '[]',
    applicable_categories_json: '[]',
  },
}

export function validateCoupon(
  code: string,
  subtotal: number,
  productIds: string[],
  categories: string[]
): { valid: boolean; coupon?: Coupon; discount: number; error?: string } {
  const dbInstance = getDbSafe()
  let row: DbCoupon | undefined
  if (dbInstance) {
    try {
      const stmt = dbInstance.prepare('SELECT * FROM coupons WHERE code = ? AND is_active = 1')
      row = stmt.get(code.toUpperCase()) as DbCoupon | undefined
    } catch {}
  }

  if (!row && defaultCoupons[code.toUpperCase()]) {
    row = defaultCoupons[code.toUpperCase()]
  }

  if (!row) {
    return { valid: false, discount: 0, error: 'Invalid coupon code' }
  }

  const now = new Date()
  const expiresAt = new Date(row.expires_at)

  if (now > expiresAt) {
    return { valid: false, discount: 0, error: 'Coupon has expired' }
  }

  if (row.used_count >= row.usage_limit) {
    return { valid: false, discount: 0, error: 'Coupon usage limit reached' }
  }

  if (subtotal < row.min_order_amount) {
    return {
      valid: false,
      discount: 0,
      error: `Minimum order amount of ${formatINR(row.min_order_amount)} required`,
    }
  }

  const applicableProducts = JSON.parse(row.applicable_products_json || '[]')
  const applicableCategories = JSON.parse(row.applicable_categories_json || '[]')

  if (applicableProducts.length > 0 && !productIds.some(id => applicableProducts.includes(id))) {
    return { valid: false, discount: 0, error: 'Coupon not applicable to items in cart' }
  }

  if (applicableCategories.length > 0 && !categories.some(cat => applicableCategories.includes(cat))) {
    return { valid: false, discount: 0, error: 'Coupon not applicable to items in cart' }
  }

  let discount = 0
  switch (row.type) {
    case 'percentage':
      discount = Math.round((subtotal * row.value) / 100)
      if (row.max_discount_amount && discount > row.max_discount_amount) {
        discount = row.max_discount_amount
      }
      break
    case 'fixed':
      discount = Math.min(row.value, subtotal)
      break
    case 'free_shipping':
      discount = 0
      break
  }

  const coupon = mapDbCoupon(row)
  return { valid: true, coupon, discount }
}

export function applyCoupon(code: string): Coupon | null {
  const dbInstance = getDbSafe()
  if (dbInstance) {
    try {
      const stmt = dbInstance.prepare('UPDATE coupons SET used_count = used_count + 1 WHERE code = ?')
      stmt.run(code.toUpperCase())
    } catch {}
  }
  return getCoupon(code)
}

export function getCoupon(code: string): Coupon | null {
  const dbInstance = getDbSafe()
  let row: DbCoupon | undefined
  if (dbInstance) {
    try {
      const stmt = dbInstance.prepare('SELECT * FROM coupons WHERE code = ?')
      row = stmt.get(code.toUpperCase()) as DbCoupon | undefined
    } catch {}
  }
  if (!row && defaultCoupons[code.toUpperCase()]) {
    row = defaultCoupons[code.toUpperCase()]
  }
  return row ? mapDbCoupon(row) : null
}

export function getActiveCoupons(): Coupon[] {
  const dbInstance = getDbSafe()
  if (dbInstance) {
    try {
      const stmt = dbInstance.prepare('SELECT * FROM coupons WHERE is_active = 1 AND expires_at > datetime("now")')
      const rows = stmt.all() as DbCoupon[]
      return rows.map(mapDbCoupon)
    } catch {}
  }
  return Object.values(defaultCoupons).map(mapDbCoupon)
}

function formatINR(paise: number): string {
  const rupees = paise / 100
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(rupees)
}