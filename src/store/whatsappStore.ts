import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { WhatsAppLeadEvent } from '@/types'
import { useUserStore } from './userStore'

interface WhatsAppStore {
  leads: WhatsAppLeadEvent[]
  trackLead: (event: Omit<WhatsAppLeadEvent, 'id' | 'createdAt' | 'userAgent' | 'referrer'> & {
    userAgent?: string
    referrer?: string
  }) => void
  getLeads: () => WhatsAppLeadEvent[]
  clearLeads: () => void
}

const RAW_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919123485451'
const cleanDigits = RAW_WHATSAPP_NUMBER.replace(/\D/g, '')
const WHATSAPP_NUMBER = cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits

export const useWhatsAppStore = create<WhatsAppStore>()(
  persist(
    (set, get) => ({
      leads: [],

      trackLead: (eventData) => {
        const event: WhatsAppLeadEvent = {
          ...eventData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }

        set(state => ({
          leads: [event, ...state.leads].slice(0, 500),
        }))

        if (typeof window !== 'undefined') {
          fetch('/api/whatsapp/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
          }).catch(() => {})
        }
      },

      getLeads: () => {
        return get().leads
      },

      clearLeads: () => {
        set({ leads: [] })
      },
    }),
    {
      name: 'ayur-veda-whatsapp-leads',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export function buildWhatsAppUrl(message: string, overridePhone?: string): string {
  const encodedMessage = encodeURIComponent(message)
  const cleanOverride = overridePhone ? overridePhone.replace(/\D/g, '') : ''
  const targetPhone = cleanOverride.length >= 10
    ? (cleanOverride.length === 10 ? `91${cleanOverride}` : cleanOverride)
    : WHATSAPP_NUMBER
  return `https://wa.me/${targetPhone}?text=${encodedMessage}`
}

function formatPaiseToINR(amount: number | undefined): string {
  if (!amount || amount === 0) return '0'
  const rupees = amount >= 10000 ? Math.round(amount / 100) : Math.round(amount)
  return rupees.toLocaleString('en-IN')
}

export function buildOrderWhatsAppMessage(data: {
  orderId?: string
  orderNumber?: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  shippingAddress: {
    firstName: string
    lastName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    pincode: string
    phone: string
  }
  items: Array<{
    name?: string
    productName?: string
    variantName?: string
    quantity: number
    price: number
    total?: number
  }>
  subtotal: number
  shipping: number
  tax?: number
  discount: number
  total: number
  paymentMethod: string
  couponCode?: string
  notes?: string
}): string {
  const itemsList = data.items
    .map((item, index) => {
      const title = item.productName || item.name || 'Product'
      const variant = item.variantName ? ` (${item.variantName})` : ''
      const itemTotal = item.total !== undefined ? item.total : item.price * item.quantity
      return `• *${index + 1}. ${title}${variant}* x${item.quantity} — ₹${formatPaiseToINR(itemTotal)}`
    })
    .join('\n')

  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  let user: any = null
  if (typeof window !== 'undefined') {
    try {
      user = useUserStore.getState().user
    } catch {
      // ignore
    }
  }

  const customerName = (data.customerName && data.customerName !== 'Customer' ? data.customerName : '') || user?.name || 'Customer Patron'
  const customerPhone = data.customerPhone || user?.phone || data.shippingAddress.phone || ''
  const customerEmail = data.customerEmail || user?.email || ''

  const addressLine2Str = data.shippingAddress.addressLine2 ? `\n${data.shippingAddress.addressLine2}` : ''
  const emailStr = customerEmail ? `\n• *Email:* ${customerEmail}` : ''
  const phoneStr = customerPhone ? `\n• *Phone:* ${customerPhone}` : ''
  const discountStr = data.discount > 0 ? `\n• *Discount (${data.couponCode || 'Promo'}):* -₹${formatPaiseToINR(data.discount)}` : ''
  const notesStr = data.notes && data.notes.trim() ? `\n\n📝 *Delivery Note:* ${data.notes.trim()}` : ''

  const paymentLabels: Record<string, string> = {
    whatsapp: 'WhatsApp Direct Confirmation / Concierge',
    cod: 'Cash on Delivery (Doorstep COD)',
    upi: 'Instant UPI (PhonePe / GPay / Paytm)',
    card: 'Online / Card Payment',
  }
  const paymentLabel = paymentLabels[data.paymentMethod.toLowerCase()] || data.paymentMethod.toUpperCase()

  const hasSpecificAddress = Boolean(data.shippingAddress.addressLine1 && !data.shippingAddress.addressLine1.includes('will be shared'))
  const addressBlock = hasSpecificAddress
    ? `📍 *DELIVERY ADDRESS:*
${customerName}
${data.shippingAddress.addressLine1}${addressLine2Str}
${data.shippingAddress.city ? `${data.shippingAddress.city}, ` : ''}${data.shippingAddress.state || ''} ${data.shippingAddress.pincode ? `- ${data.shippingAddress.pincode}` : ''}
Contact: ${data.shippingAddress.phone || customerPhone || 'Via WhatsApp'}`
    : `📍 *DELIVERY ADDRESS:*
• Address to be confirmed via WhatsApp chat (COD Available across India)`

  return `🌿 *ORDER CONFIRMATION — AYUR VEDA GLOBAL*
━━━━━━━━━━━━━━━━━━━━━━━━━
📦 *Order ID:* ${data.orderNumber || data.orderId || 'AVG-DIRECT'}
📅 *Date:* ${dateStr}

👤 *CUSTOMER DETAILS:*
• *Name:* ${customerName}${phoneStr}${emailStr}

${addressBlock}

🛍️ *ORDERED ITEMS:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *ORDER SUMMARY:*
• *Subtotal:* ₹${formatPaiseToINR(data.subtotal)}
• *Shipping:* ${data.shipping === 0 ? 'FREE (Express Courier)' : `₹${formatPaiseToINR(data.shipping)}`}${discountStr}
• *Total Payable:* ₹${formatPaiseToINR(data.total)}
• *Payment Mode:* ${paymentLabel}${notesStr}

━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 *100% Confidential Delivery Guarantee*
Dispatched in plain unmarked packaging with zero product labels on exterior carton.
Please confirm and share tracking details. Pranam! 🌿`
}

export interface ProductEnquiryData {
  customerName?: string
  customerPhone?: string
  customerCity?: string
  customerEmail?: string
  productName: string
  quantity?: number
  price?: number
  enquiry: string
  source?: string
}

export function buildProductEnquiryMessage(data: ProductEnquiryData): string {
  let name = (data.customerName && data.customerName.trim()) || ''
  let phone = (data.customerPhone && data.customerPhone.trim()) || ''
  let city = (data.customerCity && data.customerCity.trim()) || ''
  let email = (data.customerEmail && data.customerEmail.trim()) || ''

  if (typeof window !== 'undefined') {
    try {
      const user = useUserStore.getState().user
      if (user) {
        if (!name && user.name) name = user.name
        if (!phone && user.phone) phone = user.phone
        if (!email && user.email) email = user.email
        if (!city && user.addresses?.[0]) {
          const addr = user.addresses[0]
          city = [addr.city, addr.state, addr.pincode].filter(Boolean).join(', ')
        }
      }
    } catch {
      // fallback
    }
  }

  const customerDisplay = name || 'Customer Patron'
  const contactLines: string[] = []
  if (name) contactLines.push(`• *Name:* ${name}`)
  if (phone) contactLines.push(`• *Phone:* ${phone}`)
  if (email) contactLines.push(`• *Email:* ${email}`)
  if (city) contactLines.push(`• *Location:* ${city}`)

  const customerBlock = contactLines.length > 0
    ? `👤 *CUSTOMER DETAILS:*\n${contactLines.join('\n')}`
    : `👤 *CUSTOMER:* ${customerDisplay}`

  const qty = data.quantity || 1
  const priceLine = data.price ? `\n• *Price:* ₹${formatPaiseToINR(data.price)}` : ''

  return `🌿 *AYUR VEDA GLOBAL — PRODUCT ENQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━━
${customerBlock}

📦 *FORMULATION INQUIRY:*
• *Product:* ${data.productName}
• *Quantity:* ${qty} Unit(s)${priceLine}

💬 *CUSTOMER MESSAGE:*
${data.enquiry}

━━━━━━━━━━━━━━━━━━━━━━━━━
🌿 100% Classical Rasayana • NABL Purity Tested
Discreet Packaging • Free Pan-India Delivery • Doorstep COD
Please share availability, guidance & confirm delivery timeline. Pranam! 🌿`
}

export interface VaidyaConsultationData {
  patientName?: string
  patientPhone?: string
  patientCity?: string
  patientAge?: string
  concern?: string
  enquiry?: string
  source?: string
}

export function buildVaidyaConsultationMessage(data: VaidyaConsultationData): string {
  let name = (data.patientName && data.patientName.trim()) || ''
  let phone = (data.patientPhone && data.patientPhone.trim()) || ''
  let city = (data.patientCity && data.patientCity.trim()) || ''

  if (typeof window !== 'undefined') {
    try {
      const user = useUserStore.getState().user
      if (user) {
        if (!name && user.name) name = user.name
        if (!phone && user.phone) phone = user.phone
        if (!city && user.addresses?.[0]) {
          const addr = user.addresses[0]
          city = [addr.city, addr.state, addr.pincode].filter(Boolean).join(', ')
        }
      }
    } catch {
      // fallback
    }
  }

  const patientDisplay = name || 'Patron'
  const contactLines: string[] = []
  if (name) contactLines.push(`• *Patient Name:* ${name}`)
  if (phone) contactLines.push(`• *Contact Number:* ${phone}`)
  if (city) contactLines.push(`• *City / Region:* ${city}`)
  if (data.patientAge) contactLines.push(`• *Age:* ${data.patientAge}`)

  const patientBlock = contactLines.length > 0
    ? `👤 *PATIENT / CUSTOMER DETAILS:*\n${contactLines.join('\n')}`
    : `👤 *PATIENT:* ${patientDisplay} (Details via WhatsApp)`

  const concern = data.concern || 'Classical Rasayana Regimen & Lifestyle Protocol'
  const note = data.enquiry || `Pranam Vaidya Ji. I would like confidential Ayurvedic guidance regarding: "${concern}". Please recommend the right herbal formulations, dosage, and dietary routine.`

  return `🌿 *AYURVEDIC VAIDYA TELECONSULTATION DESK*
━━━━━━━━━━━━━━━━━━━━━━━━━
${patientBlock}

🩺 *CLINICAL INQUIRY:*
• *Primary Health Focus:* ${concern}
• *Consultation Type:* BAMS Ayurvedic Physician Guidance

💬 *PATIENT NOTE:*
${note}

━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 100% Confidential Doctor-Patient Consultation
Ayur Veda Global • Certified BAMS / MD Vaidya Panel`
}