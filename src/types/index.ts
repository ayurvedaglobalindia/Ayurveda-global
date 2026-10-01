export interface ProductImage {
  src: string
  alt: string
  isPrimary: boolean
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  compareAtPrice?: number
  inventory: number
  sku: string
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  shortDescription: string
  category: 'supplements' | 'wellness' | 'personal-care'
  images: ProductImage[]
  price: number
  compareAtPrice?: number
  variants: ProductVariant[]
  inventory: {
    quantity: number
    trackQuantity: boolean
  }
  tags: string[]
  ingredients: string[]
  usage: string
  warnings: string[]
  ageRestricted?: boolean
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export interface CartItem {
  id: string
  productId: string
  variantId?: string
  quantity: number
  price: number
  product: Product
}

export interface CartState {
  items: CartItem[]
  couponCode?: string
  discount: number
  shipping: number
  tax: number
}

export interface WishlistItem {
  id: string
  productId: string
  variantId?: string
  product: Product
  addedAt: string
}

export interface Address {
  id?: string
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  phone: string
  email: string
  country: string
}

export interface OrderItem {
  id?: string
  productId?: string
  variantId?: string
  productName?: string
  productImage?: string
  name?: string
  image?: string
  quantity: number
  price: number
  total?: number
}

export interface Order {
  id: string
  orderNumber: string
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  shippingAddress: Address
  billingAddress?: Address
  items: OrderItem[]
  subtotal?: number
  shipping?: number
  tax?: number
  discount?: number
  total: number
  paymentMethod: 'whatsapp' | 'cod' | string
  paymentStatus?: 'pending' | 'confirmed' | 'failed' | 'refunded'
  orderStatus?: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  status?: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | string
  couponCode?: string
  notes?: string
  whatsappMessageSent?: boolean
  createdAt: string
  updatedAt?: string
}

export interface Coupon {
  code: string
  type: 'percentage' | 'fixed' | 'free_shipping'
  value: number
  minOrderAmount: number
  maxDiscountAmount?: number
  usageLimit: number
  usedCount: number
  expiresAt: string
  isActive: boolean
  applicableProducts: string[]
  applicableCategories: string[]
}

export interface WhatsAppLeadEvent {
  id?: number
  source: 'float' | 'product' | 'checkout' | 'contact' | 'admin' | '3d-showcase' | 'combo-spotlight' | 'video-player' | 'quick-view' | 'ag-mascot'
  productId?: string
  productName?: string
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  quantity?: number
  orderTotal?: number
  orderId?: string
  messagePreview?: string
  pageUrl?: string
  userAgent: string
  referrer: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  addresses: Address[]
  orders: any[]
  wishlist: string[]
  createdAt: string
}

export interface AdminUser {
  id: number
  username: string
  passwordHash: string
  role: string
  createdAt: string
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  ogType?: 'website' | 'product'
  structuredData?: Record<string, unknown>
}

export interface ShippingCalculation {
  cost: number
  freeShipping: boolean
  estimatedDays: string
}