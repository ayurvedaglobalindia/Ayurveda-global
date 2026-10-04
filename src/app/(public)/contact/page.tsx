'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { formatINR } from '@/lib/utils/formatters'
import { buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { useWhatsAppStore } from '@/store/whatsappStore'
import { useUIStore } from '@/store/uiStore'


const contactInfo = [
  {
    icon: MessageSquare,
    title: 'WhatsApp (Fastest)',
    value: '+91 91234 85451',
    desc: 'Mon-Sat 9AM-7PM IST',
    action: 'Chat on WhatsApp',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'support@ayurvedaglobal.com',
    desc: 'Reply within 24 hours',
    action: 'Send Email',
    color: 'text-ayur-forest',
    bgColor: 'bg-ayur-cream',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+91 91234 85451',
    desc: 'Mon-Fri 10AM-6PM IST',
    action: 'Call Now',
    color: 'text-ayur-gold',
    bgColor: 'bg-amber-50',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: 'Ayur Veda Global HQ',
    desc: 'Mumbai, Maharashtra, India',
    action: 'Get Directions',
    color: 'text-ayur-forest',
    bgColor: 'bg-ayur-cream',
  },
]

const enquiryTypes = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'product', label: 'Product Question' },
  { value: 'order', label: 'Order Support' },
  { value: 'wholesale', label: 'Wholesale/B2B' },
  { value: 'careers', label: 'Careers' },
  { value: 'press', label: 'Press/Media' },
  { value: 'other', label: 'Other' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    enquiryType: 'general',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { trackLead } = useWhatsAppStore()
  const { showToast } = useUIStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid Indian phone number'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    trackLead({
      source: 'contact',
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      quantity: 1,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: '',
      referrer: '',
    })

    setIsSubmitting(false)
    setSubmitStatus('success')
    setFormData({ enquiryType: 'general', firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
    showToast({ type: 'success', title: 'Message sent!', message: 'We\'ll get back to you within 24 hours.' })
  }

  const handleWhatsAppClick = (type: string) => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim()
    const message = buildProductEnquiryMessage({
      customerName: fullName,
      customerPhone: formData.phone.trim(),
      customerEmail: formData.email.trim(),
      productName: type,
      quantity: 1,
      enquiry: formData.message || 'Hi, I have an enquiry regarding your Ayurvedic formulations.',
      source: 'contact',
    })
    trackLead({
      source: 'contact',
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      productName: type,
      quantity: 1,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: '',
      referrer: '',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  return (
    <div className="container py-8 lg:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            We Are Here To Assist
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-3">Contact Us</h1>
          <p className="text-[#C4BDA8] text-base sm:text-lg">We&apos;d love to hear from you. Choose your preferred way to get in touch with our Ayurvedic team.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <button
              key={info.title}
              onClick={() => handleWhatsAppClick(info.title)}
              className={index === 0 ? 'lg:col-span-2 text-left' : 'text-left'}
            >
              <div className={index === 0 ? 'h-full' : ''}>
                <div className="glass-luxury-card border border-[#D4AF37]/25 rounded-2xl p-6 h-full hover:border-[#D4AF37]/60 transition-all shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                      <info.icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{info.title}</h3>
                      <p className="text-[#F4E295] font-semibold mt-1">{info.value}</p>
                      <p className="text-[#C4BDA8] text-sm mt-1">{info.desc}</p>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 mt-2">
                      {info.action}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}

          <div className="glass-luxury border border-[#D4AF37]/30 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-xl font-medium mb-3 text-white">Quick WhatsApp Desk</h3>
              <p className="text-[#C4BDA8] text-sm mb-6">Skip the form — chat directly with our specialists on WhatsApp for instant guidance & order assistance.</p>
            </div>
            <div>
              <button
                className="btn-gold w-full py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2"
                onClick={() => window.open('https://wa.me/919123485451', '_blank')}
              >
                <MessageSquare className="w-5 h-5" />
                Start WhatsApp Chat
              </button>
              <p className="text-xs text-[#8A9B8F] mt-3 text-center">Available Mon-Sat 9AM-7PM IST</p>
            </div>
          </div>
        </div>

        {/* Executive Management Desk */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
              Direct Contact
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-white">Owner & Management Desk</h2>
            <p className="text-[#C4BDA8] text-sm mt-1">Direct communication with our brand owner and operations manager</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Owner Mageesh */}
            <div className="glass-luxury-card border border-[#D4AF37]/25 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-lg">
              <div className="w-24 h-24 rounded-2xl overflow-hidden relative border-2 border-[#D4AF37]/40 flex-shrink-0 shadow-md">
                <Image
                  src="/images/team/mageesh.jpg"
                  alt="Mageesh"
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-[#D4AF37]/30">
                  Owner
                </span>
                <h3 className="font-heading text-xl font-medium text-white">Mageesh</h3>
                <p className="text-[#C4BDA8] text-sm mt-1">Brand vision, partnerships & executive leadership</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <a
                    href="tel:+919123485451"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FAF7EE] bg-[#061B12] hover:bg-[#0A261A] border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    +91 91234 85451
                  </a>
                  <button
                    onClick={() => handleWhatsAppClick('Executive Inquiry - Owner Mageesh')}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#25D366] bg-[#061B12] hover:bg-[#0A261A] border border-[#25D366]/40 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Direct WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Manager Umesh */}
            <div className="glass-luxury-card border border-[#D4AF37]/25 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-lg">
              <div className="w-24 h-24 rounded-2xl overflow-hidden relative border-2 border-[#D4AF37]/40 flex-shrink-0 shadow-md">
                <Image
                  src="/images/team/umesh.jpg"
                  alt="Umesh"
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-[#D4AF37]/30">
                  Manager
                </span>
                <h3 className="font-heading text-xl font-medium text-white">Umesh</h3>
                <p className="text-[#C4BDA8] text-sm mt-1">Brand operations, logistics & direct customer satisfaction</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <a
                    href="mailto:umesh@ayurvedaglobal.com"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FAF7EE] bg-[#061B12] hover:bg-[#0A261A] border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    umesh@ayurvedaglobal.com
                  </a>
                  <button
                    onClick={() => handleWhatsAppClick('Operations Support - Manager Umesh')}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#25D366] bg-[#061B12] hover:bg-[#0A261A] border border-[#25D366]/40 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp Desk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="glass-luxury border border-[#D4AF37]/25 rounded-2xl p-6 md:p-8 shadow-2xl">
            <h2 className="font-heading text-2xl font-medium text-white mb-2">Send Us a Message</h2>
            <p className="text-[#C4BDA8] mb-8">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-[#09261A] border border-[#D4AF37]/40 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#FAF7EE]">Message Sent Successfully!</p>
                  <p className="text-[#C4BDA8] text-sm">We&apos;ll respond to your enquiry within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <Select
                label="Enquiry Type"
                value={formData.enquiryType}
                onChange={e => setFormData({ ...formData, enquiryType: e.target.value })}
                options={enquiryTypes}
                placeholder="Select enquiry type"
                required
              />

              <div className="grid md:grid-cols-2 gap-6">
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

              <div className="grid md:grid-cols-2 gap-6">
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
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                />
              </div>

              <Input
                label="Subject"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief summary of your enquiry"
              />

              <Textarea
                label="Message"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                error={errors.message}
                required
                placeholder="Tell us more about your enquiry..."
                rows={5}
              />

              <Button variant="gold" size="lg" className="w-full sm:w-auto shadow-xl" disabled={isSubmitting} loading={isSubmitting}>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-heading text-2xl font-medium text-white mb-8 text-center">Frequently Asked</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { q: 'What is your shipping policy?', a: 'We offer free shipping on orders above ₹999. Standard shipping is ₹49 and takes 5-7 business days.' },
              { q: 'How can I track my order?', a: 'Use our Track Order page with your Order ID and registered email/phone. You\'ll also receive WhatsApp updates.' },
              { q: 'What is your return policy?', a: 'We offer a 7-day return policy for unopened products. Contact us via WhatsApp to initiate a return.' },
              { q: 'Are your products authentic?', a: 'Yes, all our products are 100% genuine with sustainably sourced herbs. Each batch is tested for quality.' },
            ].map((faq, index) => (
              <div key={index} className="p-6 rounded-2xl glass-luxury-card border border-[#D4AF37]/20 shadow-md">
                <h3 className="font-medium text-white mb-2">{faq.q}</h3>
                <p className="text-[#C4BDA8] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}