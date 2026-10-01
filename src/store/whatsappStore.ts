const RAW_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919123485451'
const cleanDigits = RAW_WHATSAPP_NUMBER.replace(/\D/g, '')
const WHATSAPP_NUMBER = cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits

export function buildWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export function buildOrderWhatsAppMessage(data: {
  orderId: string
  orderNumber: string
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
    quantity: number
    price: number
    total: number
  }>
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  paymentMethod: string
  notes?: string
}): string {
  const itemsList = data.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.productName || item.name || 'Product'} x${item.quantity} — ₹${(item.total / 100).toLocaleString('en-IN')}`
    )
    .join('\n')

  return `🌿 *New Order - Ayur Veda Global*

*Order ID:* ${data.orderNumber || data.orderId}

*Customer:* ${data.customerName}
*Phone:* ${data.customerPhone}
${data.customerEmail ? `*Email:* ${data.customerEmail}\n` : ''}
*Delivery Address:*
${data.shippingAddress.firstName} ${data.shippingAddress.lastName}
${data.shippingAddress.addressLine1}
${data.shippingAddress.addressLine2 || ''}
${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.pincode}

*Items:*
${itemsList}

*Subtotal:* ₹${(data.subtotal / 100).toLocaleString('en-IN')}
*Shipping:* ${data.shipping === 0 ? 'Free' : `₹${(data.shipping / 100).toLocaleString('en-IN')}`}
${data.discount > 0 ? `*Discount:* -₹${(data.discount / 100).toLocaleString('en-IN')}\n` : ''}*Total:* ₹${(data.total / 100).toLocaleString('en-IN')}
*Payment Method:* ${data.paymentMethod.toUpperCase()}
${data.notes ? `\n*Notes:* ${data.notes}` : ''}

---
Please confirm this order. Thank you! 🌿`
}

export function buildProductEnquiryMessage(data: {
  customerName: string
  productName: string
  quantity: number
  enquiry: string
  source: string
}): string {
  return `🌿 *Enquiry - Ayur Veda Global*

*Customer:* ${data.customerName || 'Not provided'}
*Product:* ${data.productName}
*Quantity:* ${data.quantity}

*Message:* ${data.enquiry}

---
Please share pricing and availability. Thank you! 🌿`
}