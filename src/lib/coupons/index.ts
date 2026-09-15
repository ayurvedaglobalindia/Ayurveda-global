import { db } from '@/lib/db'
import type { Coupon } from '@/types'

export function validateCoupon(
  code: string,
  subtotal: number,
  productIds: string[],
  categories: string[]
): { valid: boolean; coupon?: Coupon; discount: number; error?: string } {
  const stmt = db.prepare('SELECT * FROM coupons WHERE code = ? AND is_active = 1')
  const coupon = stmt.get(code.toUpperCase()) as Coupon | undefined

  if (!coupon) {
    return { valid: false, discount: 0, error: 'Invalid coupon code' }
  }

  const now = new Date()
  const expiresAt = new Date(coupon.expires_at)

  if (now > expiresAt) {
    return { valid: false, discount: 0, error: 'Coupon has expired' }
  }

  if (coupon.used_count >= coupon.usage_limit) {
    return { valid: false, discount: 0, error: 'Coupon usage limit reached' }
  }

  if (subtotal < coupon.min_order_amount) {
    return {
      valid: false,
      discount: 0,
      error: `Minimum order amount of ${formatINR(coupon.min_order_amount)} required`,
    }
  }

  const applicableProducts = JSON.parse(coupon.applicable_products_json || '[]')
  const applicableCategories = JSON.parse(coupon.applicable_categories_json || '[]')

  if (applicableProducts.length > 0 && !productIds.some(id => applicableProducts.includes(id))) {
    return { valid: false, discount: 0, error: 'Coupon not applicable to items in cart' }
  }

  if (applicableCategories.length > 0 && !categories.some(cat => applicableCategories.includes(cat))) {
    return { valid: false, discount: 0, error: 'Coupon not applicable to items in cart' }
  }

  let discount = 0
  switch (coupon.type) {
    case 'percentage':
      discount = Math.round((subtotal * coupon.value) / 100)
      if (coupon.max_discount_amount && discount > coupon.max_discount_amount) {
        discount = coupon.max_discount_amount
      }
      break
    case 'fixed':
      discount = Math.min(coupon.value, subtotal)
      break
    case 'free_shipping':
      discount = 0
      break
  }

  return { valid: true, coupon, discount }
}

export function applyCoupon(code: string): Coupon | null {
  const stmt = db.prepare('UPDATE coupons SET used_count = used_count + 1 WHERE code = ?')
  stmt.run(code.toUpperCase())
  return getCoupon(code)
}

export function getCoupon(code: string): Coupon | null {
  const stmt = db.prepare('SELECT * FROM coupons WHERE code = ?')
  return stmt.get(code.toUpperCase()) as Coupon | null
}

export function getActiveCoupons(): Coupon[] {
  const stmt = db.prepare('SELECT * FROM coupons WHERE is_active = 1 AND expires_at > datetime("now")')
  return stmt.all() as Coupon[]
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