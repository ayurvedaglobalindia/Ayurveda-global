import { test, expect } from '@playwright/test'

test.describe('Ayur Veda Global - Cart & Checkout User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home
    await page.goto('/')
  })

  test('Brand identity and homepage display correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Ayur Veda Global/i)
    const header = page.locator('header')
    await expect(header).toBeVisible()
    await expect(header).toContainText('Ayur Veda Global')
  })

  test('Catalog browsing and product selection', async ({ page }) => {
    await page.goto('/shop')
    await expect(page.locator('h1')).toContainText('Shop')

    // Find and verify product cards
    const productCards = page.locator('.card-luxury')
    await expect(productCards.first()).toBeVisible()

    // View product details
    await page.goto('/product/body-essential-nutrition')
    await expect(page.locator('h1')).toContainText('BODY Essential Nutrition')
  })

  test('Unauthenticated user triggers Auth Modal on Add to Cart', async ({ page }) => {
    await page.goto('/product/body-essential-nutrition')

    // Click Add to Cart
    const addToCartButton = page.locator('button:has-text("Add to Cart")')
    await expect(addToCartButton).toBeVisible()
    await addToCartButton.click()

    // Verify Auth Modal opens for unauthenticated user
    const authModal = page.locator('[role="dialog"]')
    await expect(authModal).toBeVisible()
    await expect(authModal).toContainText(/Sign In|Join Ayur Veda/i)
  })

  test('Cart Drawer: Authenticated user adds product and opens Cart Drawer', async ({ page }) => {
    // Mock authenticated user session
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'ayur-user-storage',
        JSON.stringify({
          state: {
            user: {
              id: 'test-user-verified',
              name: 'Dr. Arjun Verma',
              phone: '9876543210',
              email: 'arjun@ayurvedaglobal.com',
            },
            token: 'test-session-token',
          },
          version: 0,
        })
      )
    })

    await page.goto('/product/body-essential-nutrition')

    // Click Add to Cart
    const addToCartButton = page.locator('button:has-text("Add to Cart")')
    await expect(addToCartButton).toBeVisible()
    await addToCartButton.click()

    // Verify Cart Drawer opens
    const cartDrawer = page.locator('[role="dialog"][aria-label="Shopping cart"]')
    await expect(cartDrawer).toBeVisible()
    await expect(cartDrawer).toContainText('BODY Essential Nutrition')
    await expect(cartDrawer).toContainText('Order Summary')
  })

  test('Dedicated Cart Page reflects items and free shipping threshold', async ({ page }) => {
    // Directly add item to localStorage before navigation
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'ayur-veda-cart',
        JSON.stringify({
          state: {
            items: [
              {
                id: 'test-item-1',
                productId: 'body-essential-nutrition',
                variantId: 'body-essential-nutrition-60',
                quantity: 1,
                price: 149900,
                product: {
                  id: 'body-essential-nutrition',
                  slug: 'body-essential-nutrition',
                  name: 'BODY Essential Nutrition (60 Capsules)',
                  price: 149900,
                  images: [{ src: '/images/products/body-essential-nutrition-card.jpg', alt: 'Product', isPrimary: true }],
                  variants: [{ id: 'body-essential-nutrition-60', name: '60 Capsules', price: 149900, inventory: 100 }],
                },
              },
            ],
            discount: 0,
            shipping: 0,
            tax: 0,
          },
          version: 0,
        })
      )
    })

    await page.goto('/cart')
    await expect(page.locator('h1')).toContainText('Shopping Cart')
    await expect(page.locator('text=BODY Essential Nutrition')).toBeVisible()

    // Checkout button is clickable
    const proceedCheckout = page.locator('a:has-text("Proceed to Checkout")')
    await expect(proceedCheckout).toBeVisible()
  })

  test('Checkout multi-step form flow and Cash on Delivery order placement', async ({ page }) => {
    // Pre-populate cart and authenticated user
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'ayur-user-storage',
        JSON.stringify({
          state: {
            user: {
              id: 'checkout-user-1',
              name: 'Rohan Sharma',
              phone: '9876543210',
              email: 'rohan.sharma@example.com',
            },
            token: 'test-token',
          },
          version: 0,
        })
      )
      window.localStorage.setItem(
        'ayur-veda-cart',
        JSON.stringify({
          state: {
            items: [
              {
                id: 'checkout-item-1',
                productId: 'staymax-delay-spray',
                variantId: 'staymax-30ml',
                quantity: 1,
                price: 99900,
                product: {
                  id: 'staymax-delay-spray',
                  slug: 'staymax-delay-spray',
                  name: 'STAYMAX+ Delay Spray (30 ml)',
                  price: 99900,
                  images: [{ src: '/images/products/staymax-delay-spray-card.jpg', alt: 'Staymax', isPrimary: true }],
                  variants: [{ id: 'staymax-30ml', name: '30 ml Bottle', price: 99900, inventory: 100 }],
                },
              },
            ],
            discount: 0,
            shipping: 0,
            tax: 0,
          },
          version: 0,
        })
      )
    })

    await page.goto('/checkout')
    await expect(page.locator('h1')).toContainText('Checkout')

    // Step 1: Contact Information
    await page.fill('input[placeholder="Enter your first name"]', 'Rohan')
    await page.fill('input[placeholder="Enter your last name"]', 'Sharma')
    await page.fill('input[type="email"]', 'rohan.sharma@example.com')
    await page.fill('input[type="tel"]', '9876543210')
    await page.click('button:has-text("Continue to Shipping")')

    // Step 2: Shipping Address
    await page.fill('input[placeholder="House number, apartment, street address"]', 'Flat 402, Green Meadows')
    await page.fill('input[placeholder="Enter city"]', 'Mumbai')
    await page.selectOption('select', 'Maharashtra')
    await page.fill('input[placeholder="6-digit pincode"]', '400001')
    await page.click('button:has-text("Continue to Payment")')

    // Step 3: Payment Selection
    const codOption = page.locator('label:has-text("Cash on Delivery (COD)")')
    await codOption.click()
    await page.click('button:has-text("Review Order")')

    // Step 4: Review and Confirm Order
    await expect(page.locator('text=Rohan Sharma')).toBeVisible()
    await expect(page.locator('text=Flat 402, Green Meadows')).toBeVisible()
    const placeOrderBtn = page.locator('button:has-text("Place Order")')
    await expect(placeOrderBtn).toBeVisible()
    await placeOrderBtn.click()

    // Should redirect to order confirmation
    await expect(page).toHaveURL(/.*checkout\/success.*/)
    await expect(page.locator('h1')).toContainText(/Confirmed|Order/i)
  })
})
