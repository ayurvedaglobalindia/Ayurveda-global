'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { formatINR, calculateShipping } from '@/lib/utils/formatters'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore } from '@/store/whatsappStore'
import { buildWhatsAppUrl, buildOrderWhatsAppMessage } from '@/store/whatsappStore'
import type { CartItem, Address } from '@/types'

const steps = [
  { id: 'info', label: 'Information', number: 1 },
  { id: 'shipping', label: 'Shipping', number: 2 },
  { id: 'payment', label: 'Payment', number: 3 },
  { id: 'review', label: 'Review', number: 4 },
]

export function CheckoutForm() {
  const { items, couponCode, discount, shipping: shippingCost, tax, getSubtotal, getTotal, clearCart } = useCartStore()
  const { openModal, closeModal, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Information step
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    // Shipping step
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    // Payment step
    paymentMethod: 'whatsapp' as 'whatsapp' | 'cod',
    // Review step
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const subtotal = getSubtotal()
  const total = getTotal()
  const shippingCalc = calculateShipping(subtotal)

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (stepIndex === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
      else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid Indian phone number'
    }

    if (stepIndex === 1) {
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required'
      if (!formData.city.trim()) newErrors.city = 'City is required'
      if (!formData.state.trim()) newErrors.state = 'State is required'
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'
      else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    const orderData = {
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        phone: formData.phone,
      },
      items: items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      subtotal,
      shipping: shippingCalc.cost,
      tax,
      discount,
      total,
      paymentMethod: formData.paymentMethod,
      couponCode,
      notes: formData.notes,
    }

    if (formData.paymentMethod === 'whatsapp') {
      const orderId = `ORD-${Date.now()}`
      const orderNumber = orderId

      const message = buildOrderWhatsAppMessage({
        orderId,
        orderNumber,
        ...orderData,
      })

      trackLead({
        source: 'checkout',
        productName: items.map(i => i.product.name).join(', '),
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        customerEmail: orderData.customerEmail,
        quantity: items.reduce((sum, i) => sum + i.quantity, 0),
        orderTotal: total,
        orderId,
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: '',
        referrer: '',
      })

      window.open(buildWhatsAppUrl(message), '_blank')

      clearCart()
      openModal('checkout-success', { orderNumber })
    } else {
      // COD - would create order via API
      showToast({ type: 'success', title: 'Order placed!', message: 'Your Cash on Delivery order has been confirmed.' })
      clearCart()
      openModal('checkout-success', { orderNumber: `COD-${Date.now()}` })
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="container py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-medium text-ayur-black mb-2">Checkout</h1>
          <p className="text-ayur-stone">Complete your purchase in a few simple steps</p>
        </div>

        <div className="mb-8" role="navigation" aria-label="Checkout progress">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1 relative">
                <div className={classNames(
                  'w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all z-10',
                  index < currentStep
                    ? 'bg-ayur-forest text-ayur-cream'
                    : index === currentStep
                    ? 'bg-ayur-gold text-ayur-black ring-4 ring-ayur-gold/20'
                    : 'bg-ayur-beige text-ayur-stone'
                )}>
                  {index < currentStep ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span className={classNames(
                  'mt-2 text-sm text-center',
                  index <= currentStep ? 'font-medium text-ayur-black' : 'text-ayur-stone'
                )}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={classNames(
                    'absolute top-5 left-1/2 w-full h-0.5 -ml-px',
                    index < currentStep ? 'bg-ayur-forest' : 'bg-ayur-beige'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepData.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === 0 && <InformationStep formData={formData} setFormData={setFormData} errors={errors} />}
            {currentStep === 1 && <ShippingStep formData={formData} setFormData={setFormData} errors={errors} />}
            {currentStep === 2 && <PaymentStep formData={formData} setFormData={setFormData} />}
            {currentStep === 3 && <ReviewStep formData={formData} items={items} subtotal={subtotal} shipping={shippingCalc.cost} tax={tax} discount={discount} total={total} />}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            Back
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button variant="primary" size="lg" onClick={handleSubmit} className="min-w-[200px]">
              Place Order
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={handleNext} className="min-w-[200px]">
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function InformationStep({ formData, setFormData, errors }: { formData: any; setFormData: any; errors: any }) {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-medium text-ayur-black">Contact Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={e => setFormData({ ...formData, firstName: e.target.value })}
          error={errors.firstName}
          required
          autoComplete="given-name"
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={e => setFormData({ ...formData, lastName: e.target.value })}
          error={errors.lastName}
          required
          autoComplete="family-name"
        />
      </div>
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
        autoComplete="email"
      />
      <Input
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={e => setFormData({ ...formData, phone: e.target.value })}
        error={errors.phone}
        required
        autoComplete="tel"
        placeholder="+91 98765 43210"
      />
    </div>
  )
}

function ShippingStep({ formData, setFormData, errors }: { formData: any; setFormData: any; errors: any }) {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-medium text-ayur-black">Shipping Address</h2>
      <Input
        label="Address Line 1"
        value={formData.addressLine1}
        onChange={e => setFormData({ ...formData, addressLine1: e.target.value })}
        error={errors.addressLine1}
        required
        placeholder="House/Flat No., Building, Street"
        autoComplete="street-address"
      />
      <Input
        label="Address Line 2 (Optional)"
        value={formData.addressLine2}
        onChange={e => setFormData({ ...formData, addressLine2: e.target.value })}
        placeholder="Landmark, Area, Sector"
        autoComplete="address-line2"
      />
      <div className="grid md:grid-cols-3 gap-4">
        <Input
          label="City"
          value={formData.city}
          onChange={e => setFormData({ ...formData, city: e.target.value })}
          error={errors.city}
          required
          autoComplete="address-level2"
        />
        <Input
          label="State"
          value={formData.state}
          onChange={e => setFormData({ ...formData, state: e.target.value })}
          error={errors.state}
          required
          autoComplete="address-level1"
        />
        <Input
          label="Pincode"
          value={formData.pincode}
          onChange={e => setFormData({ ...formData, pincode: e.target.value })}
          error={errors.pincode}
          required
          placeholder="110001"
          autoComplete="postal-code"
          maxLength={6}
        />
      </div>
    </div>
  )
}

function PaymentStep({ formData, setFormData }: { formData: any; setFormData: any }) {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-medium text-ayur-black">Payment Method</h2>
      <p className="text-ayur-stone">Choose how you'd like to pay for your order</p>

      <div className="space-y-4">
        <label className={classNames(
          'relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer',
          formData.paymentMethod === 'whatsapp'
            ? 'border-ayur-forest bg-ayur-forest/5'
            : 'border-ayur-sand hover:border-ayur-forest'
        )}>
          <input
            type="radio"
            name="paymentMethod"
            value="whatsapp"
            checked={formData.paymentMethod === 'whatsapp'}
            onChange={e => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
            className="sr-only"
          />
          <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5">
            {formData.paymentMethod === 'whatsapp' && (
              <div className="w-2.5 h-2.5 rounded-full bg-ayur-forest" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 9.86 9.86 0 01-.473-.288 10.3 10.3 0 01-.438-.343c-.172-.214-.35-.44-.556-.684-.228-.268-.46-.578-.693-.89-.234-.312-.42-.614-.53-.75a16.577 16.577 0 01-.203-.587c-.038-.129-.075-.259-.077-.297a.32.32 0 01.12-.22c.153-.118.36-.18.582-.18.143 0 .267.016.39.026.113.012.166.133.108.288-.043.132-.095.306-.14.478-.05.174-.1.41-.12.544-.018.113-.02.153-.02.233 0 .099.02.22.04.443.038.38.22.762.57 1.08.33.295.705.533 1.102.708.43.187.872.279 1.316.279.345 0 .676-.037.986-.11.31-.073.62-.186.92-.32.285-.133.54-.293.785-.477.245-.184.468-.387.658-.588.19-.2.352-.4.472-.588.12-.187.207-.355.25-.47.043-.115.068-.158.068-.334 0-.153-.042-.294-.085-.392-.068-.156-.19-.337-.35-.538-.173-.214-.4-.44-.64-.684-.24-.244-.5-.48-.745-.693-.258-.213-.52-.404-.785-.572a10.6 10.6 0 01-.558-.424 11.18 11.18 0 01-.48-.47c-.15-.15-.28-.28-.44-.44a11.31 11.31 0 01-.4-.44c-.11-.11-.19-.2-.3-.32a.89.89 0 00-.44-.4c-.13-.1-.24-.17-.37-.22a11.5 11.5 0 01-.42-.25 11.88 11.88 0 01-.37-.23c-.12-.07-.21-.1-.32-.14-.1-.04-.2-.06-.3-.06h-.004zm1.71-12.858c.242-.008.497-.008.75-.025.248-.017.51-.04.75-.05.248-.01.488-.025.74-.025.248 0 .498.008.748.033.272.025.506.074.708.149.213.074.398.173.558.3.16.133.272.28.33.448.067.173.108.372.11.558.008.213-.008.418-.008.608 0 .19 0 .372-.017.544-.025.19-.017.373-.04.535-.075.16-.025.308-.058.438-.075.13-.017.24-.025.36-.033a4.5 4.5 0 01.592-.033c.129 0 .258.008.378.017.12.01.24.025.35.04.11.017.213.04.3.074.107.033.207.083.297.14.09.057.17.117.24.183.15.15.287.316.41.506.12.183.208.367.26.545.052.179.075.353.075.525 0 .179-.023.343-.058.49-.025.113-.058.213-.108.3-.05.083-.116.158-.19.213-.083.05-.173.083-.272.108-.1.025-.207.04-.31.05-.103.008-.203.008-.304.008-.1 0-.198-.008-.287-.017-.1-.008-.19-.017-.272-.033-.083-.017-.15-.04-.208-.075-.058-.025-.108-.058-.15-.09-.1-.05-.19-.1-.272-.167-.1-.075-.198-.15-.28-.233-.083-.083-.142-.173-.19-.272-.042-.1-.068-.207-.083-.31-.025-.11-.04-.22-.04-.33 0-.108.008-.216.025-.325.025-.117.05-.225.092-.325.042-.1.085-.19.133-.272.05-.09.1-.183.167-.267.067-.083.142-.15.225-.2.083-.05.167-.09.25-.125.083-.033.167-.058.25-.083.083-.025.167-.042.25-.058.1-.025.2-.033.305-.042.1-.008.2-.008.3-.008.1 0 .197.008.29.025.1.017.19.033.28.05.08.025.158.05.225.083.133.058.257.125.39.217.227.15.438.325.628.53.19.208.367.42.525.64.16.213.308.427.438.645.129.213.233.427.32.64.092.213.158.418.2.625.042.207.067.414.075.62.008.208-.008.414-.025.606-.017.19-.04.373-.075.535-.033.16-.074.31-.116.448-.042.14-.083.268-.133.387-.05.117-.1.225-.158.325-.05.1-.108.19-.167.272-.067.09-.142.167-.225.233-.092.074-.19.142-.29.19-.1.05-.207.083-.317.1-.11.017-.213.025-.325.025-.107 0-.207-.008-.31-.025-.092-.017-.17-.033-.24-.058-.074-.025-.14-.05-.2-.083-.067-.033-.133-.067-.198-.108-.068-.042-.134-.09-.198-.14-.074-.058-.133-.116-.19-.183-.057-.067-.11-.133-.167-.2-.05-.067-.092-.125-.133-.192-.042-.067-.083-.133-.125-.2-.042-.067-.075-.125-.11-.183-.033-.058-.05-.117-.067-.175-.017-.058-.025-.117-.033-.175-.008-.058-.008-.108-.008-.175 0-.067-.008-.117-.008-.175" />
              </svg>
              <span className="font-medium text-ayur-black">WhatsApp Order (Recommended)</span>
            </div>
            <p className="text-sm text-ayur-stone ml-9">Coordinate payment & delivery directly on WhatsApp</p>
          </div>
        </label>

        <label className={classNames(
          'relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer',
          formData.paymentMethod === 'cod'
            ? 'border-ayur-forest bg-ayur-forest/5'
            : 'border-ayur-sand hover:border-ayur-forest'
        )}>
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={formData.paymentMethod === 'cod'}
            onChange={e => setFormData({ ...formData, paymentMethod: 'cod' })}
            className="sr-only"
          />
          <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5">
            {formData.paymentMethod === 'cod' && (
              <div className="w-2.5 h-2.5 rounded-full bg-ayur-forest" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 text-ayur-gold">₹</span>
              <span className="font-medium text-ayur-black">Cash on Delivery</span>
            </div>
            <p className="text-sm text-ayur-stone ml-9">Pay when your order arrives at your doorstep</p>
          </div>
        </label>
      </div>
    </div>
  )
}

function ReviewStep({
  formData,
  items,
  subtotal,
  shipping,
  tax,
  discount,
  total,
}: {
  formData: any
  items: any[]
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
}) {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-medium text-ayur-black">Review Your Order</h2>

      <div className="bg-white border border-ayur-beige rounded-2xl p-6 space-y-4">
        <h3 className="font-medium text-ayur-black">Order Items</h3>
        <div className="space-y-3">
          {items.map(item => {
            const primaryImage = item.product?.images?.find((img: any) => img.isPrimary) || item.product?.images?.[0]
            return (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-ayur-cream/70 rounded-xl border border-ayur-sand/30">
                <div className="w-12 h-12 rounded-lg bg-white overflow-hidden relative flex-shrink-0 border border-ayur-sand/40">
                  {primaryImage?.src ? (
                    <img src={primaryImage.src} alt={item.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-ayur-beige" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ayur-black text-sm line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-ayur-stone">Qty: {item.quantity}</p>
                </div>
                <PriceDisplay price={item.price * item.quantity} size="sm" />
              </div>
            )
          })}
        </div>

        <div className="border-t border-ayur-beige pt-4 space-y-2">
          <h3 className="font-medium text-ayur-black">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-ayur-forest">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-ayur-sage">
                <span>Discount</span>
                <span>-{formatINR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-ayur-forest">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
            </div>
            {tax > 0 && (
              <div className="flex justify-between text-ayur-forest">
                <span>Tax</span>
                <span>{formatINR(tax)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-ayur-beige pt-3">
              <span className="font-medium text-ayur-black text-lg">Total</span>
              <span className="font-medium text-ayur-black text-xl">{formatINR(total)}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-ayur-beige pt-4 space-y-4">
          <h3 className="font-medium text-ayur-black">Shipping Address</h3>
          <address className="text-ayur-forest not-italic">
            {formData.firstName} {formData.lastName}<br />
            {formData.addressLine1}<br />
            {formData.addressLine2 && `${formData.addressLine2}<br />`}
            {formData.city}, {formData.state} {formData.pincode}<br />
            {formData.phone}
          </address>
        </div>

        <div className="border-t border-ayur-beige pt-4">
          <h3 className="font-medium text-ayur-black">Payment Method</h3>
          <p className="text-ayur-forest">
            {formData.paymentMethod === 'whatsapp' ? 'WhatsApp Order (Coordinate payment on WhatsApp)' : 'Cash on Delivery'}
          </p>
        </div>

        {formData.notes && (
          <div className="border-t border-ayur-beige pt-4">
            <h3 className="font-medium text-ayur-black">Order Notes</h3>
            <p className="text-ayur-forest">{formData.notes}</p>
          </div>
        )}
      </div>

      <div className="bg-ayur-cream rounded-xl p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" required className="w-4 h-4 mt-0.5 text-ayur-forest border-ayur-sand focus:ring-ayur-gold rounded" />
          <span className="text-sm text-ayur-forest">
            I agree to the <a href="/legal/terms" className="underline hover:text-ayur-gold">Terms of Service</a> and <a href="/legal/privacy" className="underline hover:text-ayur-gold">Privacy Policy</a>
          </span>
        </label>
      </div>
    </div>
  )
}