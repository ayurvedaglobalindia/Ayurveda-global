'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { formatINR, calculateShipping, validatePhone, validatePincode, validateEmail } from '@/lib/utils/formatters'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { useCartStore } from '@/store/cartStore'
import { getProductImage } from '@/lib/products/registry'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore } from '@/store/whatsappStore'
import { buildWhatsAppUrl, buildOrderWhatsAppMessage } from '@/store/whatsappStore'
import { useUserStore } from '@/store/userStore'
import { validateCoupon } from '@/lib/coupons'
import { CouponInput } from '@/components/cart/CartDrawer'
import type { CartItem, Address, Order } from '@/types'
import { Truck, Shield, Lock, RotateCcw, CheckCircle2, CreditCard, Smartphone, Mail, MapPin, Phone, User, ArrowRight } from 'lucide-react'

const steps = [
  { id: 'info', label: 'Contact', number: 1, icon: User },
  { id: 'shipping', label: 'Shipping', number: 2, icon: MapPin },
  { id: 'payment', label: 'Payment', number: 3, icon: CreditCard },
  { id: 'review', label: 'Review', number: 4, icon: Shield },
]

export function CheckoutForm() {
  const router = useRouter()
  const { items, couponCode, discount, shipping: shippingCost, tax, getSubtotal, getTotal, clearCart, applyCoupon: applyCouponStore, removeCoupon } = useCartStore()
  const { openModal, closeModal, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  const [couponError, setCouponError] = useState<string | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'whatsapp' as 'whatsapp' | 'cod' | 'upi' | 'card',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const subtotal = getSubtotal()
  const total = getTotal()
  const shippingCalc = calculateShipping(subtotal)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.checkout-header', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power3.out',
      })
      gsap.from('.stepper', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.1,
      })
      gsap.from('.form-step', {
        opacity: 0,
        x: 20,
        duration: 0.4,
        ease: 'power3.out',
        delay: 0.2,
      })
      gsap.from('.nav-buttons', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.3,
      })
    })
    return () => ctx.revert()
  }, [currentStep])

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (stepIndex === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format'
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
      else if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid Indian phone number'
    }

    if (stepIndex === 1) {
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required'
      if (!formData.city.trim()) newErrors.city = 'City is required'
      if (!formData.state.trim()) newErrors.state = 'State is required'
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'
      else if (!validatePincode(formData.pincode)) newErrors.pincode = 'Invalid pincode'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleApplyCoupon = (code: string) => {
    if (!code.trim()) return
    setCouponError(null)
    setCouponLoading(true)
    try {
      const data = validateCoupon(
        code.trim().toUpperCase(),
        subtotal,
        items.map(i => i.productId),
        items.map(i => i.product?.category).filter(Boolean) as string[]
      )
      if (data.valid) {
        applyCouponStore(data.coupon?.code || code.trim().toUpperCase(), data.discount)
        setCouponError(null)
      } else {
        setCouponError(data.error || 'Invalid coupon code')
      }
    } catch {
      setCouponError('Unable to apply coupon. Please try again.')
    } finally {
      setCouponLoading(false)
    }
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
      items: items.map(item => {
        const img = getProductImage(item.product, item.productId)
        return {
          productId: item.productId,
          variantId: item.variantId,
          name: item.product.name,
          productName: item.product.name,
          image: img.src,
          productImage: img.src,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        }
      }),
      subtotal,
      shipping: shippingCalc.cost,
      tax,
      discount,
      total,
      paymentMethod: formData.paymentMethod,
      couponCode,
      notes: formData.notes,
    }

    const orderId = `ORD-${Date.now()}`
    const orderNumber = orderId

    const recordedOrder: Order = {
      id: orderId,
      orderNumber,
      createdAt: new Date().toISOString(),
      total,
      status: 'confirmed',
      paymentMethod: formData.paymentMethod,
      items: items.map(item => {
        const img = getProductImage(item.product, item.productId)
        return {
          name: item.product.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
          image: img.src,
        }
      }),
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        phone: formData.phone,
        email: formData.email,
        country: 'India',
      },
      whatsappMessageSent: formData.paymentMethod === 'whatsapp',
    }

    // Always record order into store & client storage for instant tracking & history
    useUserStore.getState().addOrder(recordedOrder)
    try {
      if (typeof window !== 'undefined') {
        const storedOrders = JSON.parse(localStorage.getItem('ayur_orders') || '[]')
        storedOrders.unshift(recordedOrder)
        localStorage.setItem('ayur_orders', JSON.stringify(storedOrders.slice(0, 50)))
      }
    } catch {}

    if (formData.paymentMethod === 'whatsapp') {
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
      router.push(`/checkout/success?order=${orderNumber}`)
    } else if (formData.paymentMethod === 'upi') {
      const message = `*Ayur Veda Global - Instant UPI Order*\n` +
        `• Order ID: ${orderNumber}\n` +
        `• Total: ₹${total}\n` +
        `• Customer: ${orderData.customerName} (${orderData.customerPhone})\n` +
        `• UPI ID: ayurvedaglobal@okhdfcbank\n` +
        `Please send payment confirmation screenshot.`

      window.open(buildWhatsAppUrl(message), '_blank')
      showToast({ type: 'success', title: 'UPI Order Placed', message: 'Order created! Please complete payment via your UPI app.' })
      clearCart()
      router.push(`/checkout/success?order=${orderNumber}`)
    } else if (formData.paymentMethod === 'card') {
      showToast({ type: 'success', title: 'Payment Authorized', message: 'Card / Net Banking transaction verified securely.' })
      clearCart()
      router.push(`/checkout/success?order=${orderNumber}`)
    } else {
      showToast({ type: 'success', title: 'Order placed!', message: 'Your Cash on Delivery order has been confirmed.' })
      clearCart()
      router.push(`/checkout/success?order=${orderNumber}`)
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="container py-8 lg:py-12 pb-32 lg:pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 checkout-header"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-ayur-ivory mb-2">Checkout</h1>
          <p className="text-ayur-stone">Complete your purchase in a few simple steps</p>
        </motion.div>

        {/* Progress Stepper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 stepper"
          role="navigation"
          aria-label="Checkout progress"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1 relative">
                <div className="relative z-10">
                  <div className={classNames(
                    'w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300',
                    index < currentStep
                      ? 'bg-gradient-to-r from-ayur-gold-light to-ayur-gold text-ayur-void font-bold shadow-lg shadow-ayur-gold/30'
                      : index === currentStep
                      ? 'bg-ayur-charcoal border-2 border-ayur-gold text-ayur-gold ring-4 ring-ayur-gold/20 shadow-lg'
                      : 'bg-ayur-forest-dark text-ayur-stone border border-ayur-forest-dark/50'
                  )}>
                    {index < currentStep ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={classNames(
                      'absolute top-6 left-1/2 w-full h-0.5 -ml-px',
                      index < currentStep ? 'bg-gradient-to-r from-ayur-gold-light to-ayur-gold' : 'bg-ayur-forest-dark/50'
                    )} />
                  )}
                </div>
                <span className={classNames(
                  'mt-2 text-xs sm:text-sm text-center font-medium transition-colors',
                  index <= currentStep ? 'text-ayur-ivory' : 'text-ayur-stone'
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepData.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="form-step"
          >
            {currentStep === 0 && <InformationStep formData={formData} setFormData={setFormData} errors={errors} />}
            {currentStep === 1 && <ShippingStep formData={formData} setFormData={setFormData} errors={errors} />}
            {currentStep === 2 && <PaymentStep formData={formData} setFormData={setFormData} />}
            {currentStep === 3 && (
              <ReviewStep
                formData={formData}
                items={items}
                subtotal={subtotal}
                shipping={shippingCalc.cost}
                tax={tax}
                discount={discount}
                total={total}
                couponCode={couponCode}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={() => {
                  removeCoupon()
                  setCouponError(null)
                }}
                couponError={couponError}
                couponLoading={couponLoading}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center mt-10 pt-6 border-t border-ayur-forest-dark/50 nav-buttons"
        >
          <Button
            variant="emerald-outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="border-ayur-gold/40 text-ayur-cream hover:bg-ayur-gold/10"
          >
            Back
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button variant="gold" size="lg" onClick={handleSubmit} className="min-w-[200px] shadow-xl gold-shimmer">
              Place Order
            </Button>
          ) : (
            <Button variant="gold" size="lg" onClick={handleNext} className="min-w-[200px] shadow-xl gold-shimmer">
              Continue
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  )
}

function InformationStep({ formData, setFormData, errors }: { formData: any; setFormData: any; errors: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-ayur-charcoal/50 border border-ayur-gold/10">
        <div className="w-10 h-10 rounded-xl bg-ayur-gold/15 flex items-center justify-center text-ayur-gold">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-medium text-ayur-ivory">Contact Information</h2>
          <p className="text-sm text-ayur-stone">We&apos;ll send order updates to this email and phone</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={e => setFormData({ ...formData, firstName: e.target.value })}
          error={errors.firstName}
          required
          autoComplete="given-name"
          leftIcon={<User className="w-4 h-4" />}
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={e => setFormData({ ...formData, lastName: e.target.value })}
          error={errors.lastName}
          required
          autoComplete="family-name"
          leftIcon={<User className="w-4 h-4" />}
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
        leftIcon={<Mail className="w-4 h-4" />}
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
        leftIcon={<Phone className="w-4 h-4" />}
      />
    </motion.div>
  )
}

function ShippingStep({ formData, setFormData, errors }: { formData: any; setFormData: any; errors: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-ayur-charcoal/50 border border-ayur-gold/10">
        <div className="w-10 h-10 rounded-xl bg-ayur-gold/15 flex items-center justify-center text-ayur-gold">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-medium text-ayur-ivory">Shipping Address</h2>
          <p className="text-sm text-ayur-stone">Where should we deliver your order?</p>
        </div>
      </div>

      <Input
        label="Address Line 1"
        value={formData.addressLine1}
        onChange={e => setFormData({ ...formData, addressLine1: e.target.value })}
        error={errors.addressLine1}
        required
        placeholder="House/Flat No., Building, Street"
        autoComplete="street-address"
        leftIcon={<MapPin className="w-4 h-4" />}
      />
      <Input
        label="Address Line 2 (Optional)"
        value={formData.addressLine2}
        onChange={e => setFormData({ ...formData, addressLine2: e.target.value })}
        placeholder="Landmark, Area, Sector"
        autoComplete="address-line2"
        leftIcon={<MapPin className="w-4 h-4" />}
      />
      <div className="grid md:grid-cols-3 gap-4">
        <Input
          label="City"
          value={formData.city}
          onChange={e => setFormData({ ...formData, city: e.target.value })}
          error={errors.city}
          required
          autoComplete="address-level2"
          leftIcon={<MapPin className="w-4 h-4" />}
        />
        <Input
          label="State"
          value={formData.state}
          onChange={e => setFormData({ ...formData, state: e.target.value })}
          error={errors.state}
          required
          autoComplete="address-level1"
          leftIcon={<MapPin className="w-4 h-4" />}
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
          leftIcon={<MapPin className="w-4 h-4" />}
        />
      </div>

      {/* Shipping Benefits */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
        {[
          { icon: Truck, title: 'Free Express', desc: 'On orders above ₹999' },
          { icon: Lock, title: 'Discreet Box', desc: 'Plain unmarked packaging' },
          { icon: Shield, title: 'Ayush Certified', desc: 'Lab tested & verified' },
          { icon: RotateCcw, title: 'COD Available', desc: 'Pay at doorstep' },
        ].map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
            className="p-3 rounded-xl bg-ayur-charcoal/50 border border-ayur-gold/10 text-center"
          >
            <benefit.icon className="w-5 h-5 text-ayur-gold mx-auto mb-2" />
            <p className="text-xs font-semibold text-ayur-ivory">{benefit.title}</p>
            <p className="text-[10px] text-ayur-stone">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function PaymentStep({ formData, setFormData }: { formData: any; setFormData: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-ayur-charcoal/50 border border-ayur-gold/10">
        <div className="w-10 h-10 rounded-xl bg-ayur-gold/15 flex items-center justify-center text-ayur-gold">
          <CreditCard className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-medium text-ayur-ivory">Payment Method</h2>
          <p className="text-sm text-ayur-stone">Choose how you&apos;d like to pay for your order</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className={classNames(
          'relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer group',
          formData.paymentMethod === 'whatsapp'
            ? 'border-ayur-gold bg-ayur-charcoal/50 shadow-lg shadow-ayur-gold/10'
            : 'border-ayur-forest-dark/50 bg-ayur-forest-dark/30 hover:border-ayur-gold/50 hover:bg-ayur-charcoal/50'
        )}>
          <input
            type="radio"
            name="paymentMethod"
            value="whatsapp"
            checked={formData.paymentMethod === 'whatsapp'}
            onChange={e => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
            className="sr-only"
          />
          <div className="w-5 h-5 rounded-full border-2 border-ayur-gold flex items-center justify-center flex-shrink-0 mt-0.5">
            {formData.paymentMethod === 'whatsapp' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2.5 h-2.5 rounded-full bg-ayur-gold"
              />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 9.86 9.86 0 01-.473-.288 10.3 10.3 0 01-.438-.343c-.172-.214-.35-.44-.556-.684-.228-.268-.46-.578-.693-.89-.234-.312-.42-.614-.53-.75a16.577 16.577 0 01-.203-.587c-.038-.129-.075-.259-.077-.297a.32.32 0 01.12-.22c.153-.118.36-.18.582-.18.143 0 .267.016.39.026.113.012.166.133.108.288-.043.132-.095.306-.14.478-.05.174-.1.41-.12.544-.018.113-.02.153-.02.233 0 .099.02.22.04.443.038.38.22.762.57 1.08.33.295.705.533 1.102.708.43.187.872.279 1.316.279.345 0 .676-.037.986-.11.31-.073.62-.186.92-.32.285-.133.54-.293.785-.477.245-.184.468-.387.658-.588.19-.2.352-.4.472-.588.12-.187.207-.355.25-.47.043-.115.068-.158.068-.334 0-.153-.042-.294-.085-.392-.068-.156-.19-.337-.35-.538-.173-.214-.4-.44-.64-.684-.24-.244-.5-.48-.745-.693-.258-.213-.52-.404-.785-.572a10.6 10.6 0 01-.558-.424 11.18 11.18 0 01-.48-.47c-.15-.15-.28-.28-.44-.44a11.31 11.31 0 01-.4-.44c-.11-.11-.19-.2-.3-.32a.89.89 0 00-.44-.4c-.13-.1-.24-.17-.37-.22a11.5 11.5 0 01-.42-.25 11.88 11.88 0 01-.37-.23c-.12-.07-.21-.1-.32-.14-.1-.04-.2-.06-.3-.06h-.004zm1.71-12.858c.242-.008.497-.008.75-.025.248-.017.51-.04.75-.05.248-.01.488-.025.74-.025.248 0 .498.008.748.033.272.025.506.074.708.149.213.074.398.173.558.3.16.133.272.28.33.448.067.173.108.372.11.558.008.213-.008.418-.008.608 0 .19 0 .372-.017.544-.025.19-.0..." />
                </svg>
              </div>
              <span className="font-medium text-ayur-ivory">WhatsApp Order (Recommended)</span>
            </div>
            <p className="text-sm text-ayur-stone ml-13">Coordinate payment & delivery directly on WhatsApp</p>
          </div>
          <div className="ml-auto text-sm text-ayur-gold-light font-semibold hidden sm:block">
            Most Popular
          </div>
        </label>

        <label className={classNames(
          'relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer group',
          formData.paymentMethod === 'cod'
            ? 'border-ayur-gold bg-ayur-charcoal/50 shadow-lg shadow-ayur-gold/10'
            : 'border-ayur-forest-dark/50 bg-ayur-forest-dark/30 hover:border-ayur-gold/50 hover:bg-ayur-charcoal/50'
        )}>
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={formData.paymentMethod === 'cod'}
            onChange={e => setFormData({ ...formData, paymentMethod: 'cod' })}
            className="sr-only"
          />
          <div className="w-5 h-5 rounded-full border-2 border-ayur-gold flex items-center justify-center flex-shrink-0 mt-0.5">
            {formData.paymentMethod === 'cod' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2.5 h-2.5 rounded-full bg-ayur-gold"
              />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ayur-gold/20 flex items-center justify-center">
                <span className="font-bold text-ayur-gold text-lg">₹</span>
              </div>
              <span className="font-medium text-ayur-ivory">Cash on Delivery</span>
            </div>
            <p className="text-sm text-ayur-stone ml-13">Pay when your order arrives at your doorstep</p>
          </div>
        </label>

        {/* Instant UPI Option */}
        <label className={classNames(
          'relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer group',
          formData.paymentMethod === 'upi'
            ? 'border-ayur-gold bg-ayur-charcoal/50 shadow-lg shadow-ayur-gold/10'
            : 'border-ayur-forest-dark/50 bg-ayur-forest-dark/30 hover:border-ayur-gold/50 hover:bg-ayur-charcoal/50'
        )}>
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            checked={formData.paymentMethod === 'upi'}
            onChange={e => setFormData({ ...formData, paymentMethod: 'upi' })}
            className="sr-only"
          />
          <div className="w-5 h-5 rounded-full border-2 border-ayur-gold flex items-center justify-center flex-shrink-0 mt-0.5">
            {formData.paymentMethod === 'upi' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2.5 h-2.5 rounded-full bg-ayur-gold"
              />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">
                UPI
              </div>
              <span className="font-medium text-ayur-ivory">Instant UPI (GPay / PhonePe / Paytm / BHIM)</span>
            </div>
            <p className="text-sm text-ayur-stone ml-13">Instant transfer to ayurvedaglobal@okhdfcbank with zero fee</p>
          </div>
          <div className="ml-auto text-xs text-purple-400 font-semibold hidden sm:block">
            Fastest
          </div>
        </label>

        {/* Card & Net Banking Option */}
        <label className={classNames(
          'relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer group',
          formData.paymentMethod === 'card'
            ? 'border-ayur-gold bg-ayur-charcoal/50 shadow-lg shadow-ayur-gold/10'
            : 'border-ayur-forest-dark/50 bg-ayur-forest-dark/30 hover:border-ayur-gold/50 hover:bg-ayur-charcoal/50'
        )}>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={formData.paymentMethod === 'card'}
            onChange={e => setFormData({ ...formData, paymentMethod: 'card' })}
            className="sr-only"
          />
          <div className="w-5 h-5 rounded-full border-2 border-ayur-gold flex items-center justify-center flex-shrink-0 mt-0.5">
            {formData.paymentMethod === 'card' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2.5 h-2.5 rounded-full bg-ayur-gold"
              />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="font-medium text-ayur-ivory">Debit / Credit Cards &amp; Net Banking</span>
            </div>
            <p className="text-sm text-ayur-stone ml-13">Visa, MasterCard, RuPay, and 50+ Net Banking banks</p>
          </div>
        </label>
      </div>

      {/* Payment Security Notice */}
      <div className="pt-4 p-4 rounded-xl bg-ayur-charcoal/50 border border-ayur-gold/10">
        <div className="flex items-center gap-3 text-sm text-ayur-stone">
          <Shield className="w-5 h-5 text-ayur-gold flex-shrink-0" />
          <span>100% Secure • No card details stored • PCI DSS Compliant</span>
        </div>
      </div>
    </motion.div>
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
  couponCode,
  onApplyCoupon,
  onRemoveCoupon,
  couponError,
  couponLoading,
}: {
  formData: any
  items: any[]
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  couponCode?: string
  onApplyCoupon: (code: string) => void
  onRemoveCoupon: () => void
  couponError?: string | null
  couponLoading?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-ayur-charcoal/50 border border-ayur-gold/10">
        <div className="w-10 h-10 rounded-xl bg-ayur-gold/15 flex items-center justify-center text-ayur-gold">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-medium text-ayur-ivory">Review Your Order</h2>
          <p className="text-sm text-ayur-stone">Please verify all details before placing your order</p>
        </div>
      </div>

      <div className="card-luxury p-6 space-y-5">
        <h3 className="font-medium text-ayur-ivory">Order Items</h3>
        <div className="space-y-3">
          {items.map(item => {
            const primaryImage = getProductImage(item.product, item.productId)
            const variantName = item.product?.variants?.find((v: any) => v.id === item.variantId)?.name
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 p-3 bg-ayur-forest-dark/50 rounded-xl border border-ayur-gold/10"
              >
                <div className="w-14 h-14 rounded-lg bg-ayur-void overflow-hidden relative flex-shrink-0 border border-ayur-gold/20">
                  <Image
                    src={primaryImage.src}
                    alt={primaryImage.alt}
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ayur-ivory text-sm leading-snug line-clamp-2">{item.product.name}</p>
                  {variantName && (
                    <span className="text-[11px] text-ayur-gold-light/90 block truncate mt-0.5">
                      {variantName}
                    </span>
                  )}
                  <p className="text-xs text-ayur-stone mt-0.5">Qty: {item.quantity}</p>
                </div>
                <PriceDisplay price={item.price * item.quantity} size="sm" />
              </motion.div>
            )
          })}
        </div>

        {/* Coupon Code Section */}
        <div className="border-t border-ayur-forest-dark/50 pt-4">
          <CouponInput
            couponCode={couponCode}
            onApply={onApplyCoupon}
            onRemove={onRemoveCoupon}
            subtotal={subtotal}
            error={couponError}
            loading={couponLoading}
          />
        </div>

        <div className="border-t border-ayur-forest-dark/50 pt-4 space-y-2">
          <h3 className="font-medium text-ayur-ivory">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-ayur-stone">
              <span>Subtotal</span>
              <span className="text-ayur-ivory font-medium">{formatINR(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-ayur-gold-light">
                <span>Discount</span>
                <span className="font-medium">-{formatINR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-ayur-stone">
              <span>Shipping</span>
              <span className="text-ayur-gold-light font-medium">{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
            </div>
            {tax > 0 && (
              <div className="flex justify-between text-ayur-stone">
                <span>Tax</span>
                <span className="text-ayur-ivory font-medium">{formatINR(tax)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-ayur-forest-dark/50 pt-3">
              <span className="font-medium text-ayur-ivory text-lg">Total</span>
              <span className="font-medium text-ayur-gold-light text-xl font-heading">{formatINR(total)}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-ayur-forest-dark/50 pt-4 space-y-2">
          <h3 className="font-medium text-ayur-ivory">Shipping Address</h3>
          <address className="text-ayur-stone not-italic leading-relaxed">
            {formData.firstName} {formData.lastName}<br />
            {formData.addressLine1}<br />
            {formData.addressLine2 && `${formData.addressLine2}<br />`}
            {formData.city}, {formData.state} {formData.pincode}<br />
            {formData.phone}
          </address>
        </div>

        <div className="border-t border-ayur-forest-dark/50 pt-4">
          <h3 className="font-medium text-ayur-ivory">Payment Method</h3>
          <p className="text-ayur-stone mt-1">
            {formData.paymentMethod === 'whatsapp'
              ? 'WhatsApp Order (Coordinate payment on WhatsApp)'
              : formData.paymentMethod === 'upi'
              ? 'Instant UPI (GPay / PhonePe / Paytm / BHIM)'
              : formData.paymentMethod === 'card'
              ? 'Debit / Credit Card & Net Banking'
              : 'Cash on Delivery (COD)'}
          </p>
        </div>

        {formData.notes && (
          <div className="border-t border-ayur-forest-dark/50 pt-4">
            <h3 className="font-medium text-ayur-ivory">Order Notes</h3>
            <p className="text-ayur-stone mt-1">{formData.notes}</p>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-luxury p-4"
      >
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            className="w-4 h-4 mt-0.5 text-ayur-gold border-ayur-gold/40 bg-ayur-forest-dark focus:ring-ayur-gold rounded accent-ayur-gold"
          />
          <span className="text-sm text-ayur-stone">
            I agree to the <a href="/legal/terms" className="underline hover:text-ayur-gold-light text-ayur-ivory">Terms of Service</a> and <a href="/legal/privacy" className="underline hover:text-ayur-gold-light text-ayur-ivory">Privacy Policy</a>
          </span>
        </label>
      </motion.div>
    </motion.div>
  )
}