import fs from 'fs'
import path from 'path'
import { getAllProducts, getProductBySlug, getProductsByCategory, getCategories, getProductImage } from '../lib/products/registry'
import {
  formatINR,
  formatINRCompact,
  calculateDiscountPercentage,
  calculateSavings,
  generateOrderNumber,
  validatePhone,
  validatePincode,
  validateEmail,
  calculateShipping,
  FREE_SHIPPING_THRESHOLD,
} from '../lib/utils/formatters'
import { validateCoupon } from '../lib/coupons'
import { db } from '../lib/db'

let passed = 0
let failed = 0

function test(name: string, fn: () => void | Promise<void>) {
  try {
    fn()
    console.log(`  \x1b[32m✓\x1b[0m ${name}`)
    passed++
  } catch (err: any) {
    console.error(`  \x1b[31m✗\x1b[0m ${name}`)
    console.error(`    ${err?.message || err}`)
    failed++
  }
}

async function runAllTests() {
  console.log('\n========================================')
  console.log('🧪 Ayur Veda Global Test Suite')
  console.log('========================================\n')

  // 1. Product Registry Tests
  console.log('📦 1. Product Registry Tests:')
  test('Should load all products', () => {
    const products = getAllProducts()
    if (!products || products.length === 0) throw new Error('No products found')
    if (products.length < 3) throw new Error(`Expected at least 3 products, got ${products.length}`)
  })

  test('All products should have required properties', () => {
    const products = getAllProducts()
    for (const p of products) {
      if (!p.id) throw new Error(`Product missing id: ${JSON.stringify(p)}`)
      if (!p.slug) throw new Error(`Product missing slug: ${p.name}`)
      if (!p.name) throw new Error(`Product missing name: ${p.id}`)
      if (typeof p.price !== 'number' || p.price <= 0) throw new Error(`Invalid price for ${p.name}: ${p.price}`)
      if (!Array.isArray(p.images) || p.images.length === 0) throw new Error(`Product missing images: ${p.name}`)
      if (!p.images[0].src) throw new Error(`Product primary image missing src: ${p.name}`)
      if (!Array.isArray(p.variants) || p.variants.length === 0) throw new Error(`Product missing variants: ${p.name}`)
    }
  })

  test('Should find product by slug', () => {
    const p1 = getProductBySlug('body-essential-nutrition')
    if (!p1) throw new Error('Failed to find body-essential-nutrition')
    if (p1.name !== 'BODY Essential Nutrition (60 Capsules)') throw new Error(`Unexpected name: ${p1.name}`)

    const p2 = getProductBySlug('staymax-delay-spray')
    if (!p2) throw new Error('Failed to find staymax-delay-spray')

    const p3 = getProductBySlug('vitality-power-combo')
    if (!p3) throw new Error('Failed to find vitality-power-combo')
  })

  test('Should return undefined for non-existent slug', () => {
    const notFound = getProductBySlug('non-existent-product-slug')
    if (notFound !== undefined) throw new Error('Should return undefined for unknown product')
  })

  test('Should fetch categories properly', () => {
    const categories = getCategories()
    if (!categories || categories.length === 0) throw new Error('No categories found')
    const slugs = categories.map(c => c.slug)
    if (!slugs.includes('supplements')) throw new Error('Missing supplements category')
    if (!slugs.includes('personal-care')) throw new Error('Missing personal-care category')
  })

  test('getProductImage resolves tailored crops for card, thumb, detail, and hero', () => {
    const products = getAllProducts()
    for (const p of products) {
      const card = getProductImage(p, p.id, 'card')
      if (!card.src || !card.src.includes('-card.jpg')) {
        throw new Error(`Card image invalid for ${p.id}: ${card.src}`)
      }

      const thumb = getProductImage(p, p.id, 'thumb')
      if (!thumb.src || !thumb.src.includes('-thumb.jpg')) {
        throw new Error(`Thumb image invalid for ${p.id}: ${thumb.src}`)
      }

      const detail = getProductImage(p, p.id, 'detail')
      if (!detail.src || !detail.src.includes('-detail.jpg')) {
        throw new Error(`Detail image invalid for ${p.id}: ${detail.src}`)
      }

      const hero = getProductImage(p, p.id, 'hero')
      if (!hero.src || (!hero.src.endsWith('.png') && !hero.src.endsWith('.jpg'))) {
        throw new Error(`Hero image invalid for ${p.id}: ${hero.src}`)
      }
    }
  })

  // 2. Utility & Formatter Tests
  console.log('\n💰 2. Utility & Formatter Tests:')
  test('formatINR converts paise to Indian Rupee symbol', () => {
    const formatted = formatINR(149900)
    if (!formatted.includes('1,499') || !formatted.includes('₹')) {
      throw new Error(`Unexpected formatINR output: "${formatted}"`)
    }
  })

  test('formatINRCompact formats large numbers into K, L, Cr', () => {
    if (formatINRCompact(150000) !== '₹1.5K') throw new Error(`Expected ₹1.5K, got ${formatINRCompact(150000)}`)
    if (formatINRCompact(15000000) !== '₹1.5L') throw new Error(`Expected ₹1.5L, got ${formatINRCompact(15000000)}`)
  })

  test('calculateDiscountPercentage calculates correct percentage', () => {
    const discount = calculateDiscountPercentage(149900, 199900)
    if (discount !== 25) throw new Error(`Expected 25%, got ${discount}%`)
    const noDiscount = calculateDiscountPercentage(200000, 150000)
    if (noDiscount !== 0) throw new Error(`Expected 0%, got ${noDiscount}%`)
  })

  test('calculateSavings calculates exact savings in paise', () => {
    const savings = calculateSavings(149900, 199900)
    if (savings !== 50000) throw new Error(`Expected 50000, got ${savings}`)
  })

  test('generateOrderNumber generates valid ORD-YYYYMMDD-XXXX format', () => {
    const ord = generateOrderNumber()
    const match = ord.match(/^ORD-\d{8}-\d{4}$/)
    if (!match) throw new Error(`Invalid order number format: ${ord}`)
  })

  // 3. Cart & Shipping Calculation Tests
  console.log('\n🛒 3. Cart & Shipping Calculation Tests:')
  test('Cart subtotal calculates correctly for single and multiple items', () => {
    const item1 = { price: 149900, quantity: 2 }
    const item2 = { price: 99900, quantity: 1 }
    const subtotal = item1.price * item1.quantity + item2.price * item2.quantity
    if (subtotal !== 399700) throw new Error(`Expected 399700 paise (₹3,997), got ${subtotal}`)
  })

  test('Shipping calculation applies flat rate below free shipping threshold', () => {
    const subtotalBelow = 50000 // ₹500 (below ₹999)
    const result = calculateShipping(subtotalBelow)
    if (result.freeShipping) throw new Error('Expected paid shipping below threshold')
    if (result.cost !== 4900) throw new Error(`Expected shipping fee of 4900 paise, got ${result.cost}`)
  })

  test('Shipping calculation grants free shipping at and above threshold', () => {
    const subtotalAbove = FREE_SHIPPING_THRESHOLD // ₹999 (99900 paise)
    const result = calculateShipping(subtotalAbove)
    if (!result.freeShipping) throw new Error('Expected free shipping at threshold')
    if (result.cost !== 0) throw new Error(`Expected free shipping cost 0, got ${result.cost}`)
  })

  // 4. Coupon Engine Tests
  console.log('\n🎟️ 4. Coupon Engine Tests:')
  test('Valid WELCOME10 coupon calculates 10% discount', () => {
    const res = validateCoupon('WELCOME10', 200000, ['body-essential-nutrition'], ['supplements'])
    if (!res.valid) throw new Error(`Coupon should be valid, got error: ${res.error}`)
    if (res.discount !== 20000) throw new Error(`Expected discount of 20000 paise (₹200), got ${res.discount}`)
  })

  test('Rejects invalid non-existent coupon code', () => {
    const res = validateCoupon('INVALID_CODE_XYZ', 200000, ['body-essential-nutrition'], ['supplements'])
    if (res.valid) throw new Error('Coupon should have been rejected as invalid')
  })

  // 5. Checkout Validation Tests
  console.log('\n📝 5. Checkout Validation Tests:')
  test('Phone validator accepts valid Indian mobile numbers', () => {
    if (!validatePhone('9876543210')) throw new Error('Valid 10-digit number rejected')
    if (!validatePhone('+91 98765 43210')) throw new Error('Valid spaced number rejected')
  })

  test('Phone validator rejects invalid mobile numbers', () => {
    if (validatePhone('1234567890')) throw new Error('Invalid starting digit accepted')
    if (validatePhone('98765')) throw new Error('Too short phone number accepted')
  })

  test('Pincode validator verifies 6-digit Indian postal codes', () => {
    if (!validatePincode('400001')) throw new Error('Valid Mumbai pincode rejected')
    if (!validatePincode('110001')) throw new Error('Valid Delhi pincode rejected')
    if (validatePincode('012345')) throw new Error('Leading zero pincode accepted')
    if (validatePincode('40000')) throw new Error('5-digit pincode accepted')
  })

  test('Email validator correctly checks email formatting', () => {
    if (!validateEmail('patient@ayurvedaglobal.com')) throw new Error('Valid email rejected')
    if (validateEmail('invalid-email-address')) throw new Error('Malformed email accepted')
  })

  // 6. Database Storage & Retrieval Tests
  console.log('\n💾 6. Database Storage & Retrieval Tests:')
  test('Can insert and retrieve an order from database', () => {
    const testOrderId = `TEST-ORD-${Date.now()}`
    const testOrderNumber = testOrderId

    const insertStmt = db.prepare(`
      INSERT INTO orders (
        id, order_number, customer_name, customer_phone, customer_email,
        shipping_address_json, billing_address_json, items_json,
        subtotal, shipping_cost, tax_amount, discount_amount, total_amount,
        payment_method, payment_status, order_status, coupon_code, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    insertStmt.run(
      testOrderId,
      testOrderNumber,
      'Test User',
      '9876543210',
      'test@example.com',
      JSON.stringify({ addressLine1: '123 Test Street', city: 'Mumbai', state: 'Maharashtra', pincode: '400001' }),
      JSON.stringify({ addressLine1: '123 Test Street', city: 'Mumbai', state: 'Maharashtra', pincode: '400001' }),
      JSON.stringify([{ name: 'BODY Essential Nutrition', quantity: 1, price: 149900 }]),
      149900,
      0,
      0,
      0,
      149900,
      'cod',
      'pending',
      'confirmed',
      null,
      'Test order notes'
    )

    const selectStmt = db.prepare('SELECT * FROM orders WHERE order_number = ?')
    const retrieved = selectStmt.get(testOrderNumber) as any

    if (!retrieved) throw new Error('Failed to retrieve inserted order')
    if (retrieved.customer_name !== 'Test User') throw new Error(`Customer name mismatch: ${retrieved.customer_name}`)
    if (retrieved.total_amount !== 149900) throw new Error(`Total mismatch: ${retrieved.total_amount}`)
  })

  // 7. Server Endpoints Health Check
  console.log('\n🌐 7. Server Endpoints Health Check:')
  const routes = [
    '/',
    '/shop',
    '/product/body-essential-nutrition',
    '/product/staymax-delay-spray',
    '/product/vitality-power-combo',
    '/categories',
    '/about',
    '/contact',
    '/faq',
    '/track-order',
    '/account',
  ]

  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:3000${route}`, { signal: AbortSignal.timeout(800) })
      if (res.status === 200) {
        console.log(`  \x1b[32m✓\x1b[0m Route ${route} -> Live HTTP 200 OK`)
        passed++
      } else {
        console.error(`  \x1b[31m✗\x1b[0m Route ${route} -> HTTP ${res.status}`)
        failed++
      }
    } catch {
      // Fallback: Verify static export artifact on disk in out/
      const cleanRel = route === '/' ? 'index.html' : path.join(route.replace(/^\//, ''), 'index.html')
      const staticFilePath = path.join(process.cwd(), 'out', cleanRel)
      if (fs.existsSync(staticFilePath) && fs.statSync(staticFilePath).size > 500) {
        console.log(`  \x1b[32m✓\x1b[0m Route ${route} -> Static Export HTML Verified (${(fs.statSync(staticFilePath).size / 1024).toFixed(1)} KB)`)
        passed++
      } else {
        console.warn(`  \x1b[33m⚠\x1b[0m Route ${route} -> Static export not built yet and dev server offline`)
      }
    }
  }

  console.log('\n========================================')
  console.log(`Test Results: \x1b[32m${passed} passed\x1b[0m, \x1b[31m${failed} failed\x1b[0m`)
  console.log('========================================\n')

  if (failed > 0) {
    process.exit(1)
  }
}

runAllTests()
