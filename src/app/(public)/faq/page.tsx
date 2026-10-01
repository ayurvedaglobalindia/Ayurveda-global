import { Metadata } from 'next'
import { Search, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'
import { Accordion } from '@/components/ui/Accordion'
import { generateFAQStructuredData, generateWebsiteStructuredData } from '@/lib/seo'
import { Logo } from '@/components/ui/Logo'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Ayur Veda Global products, shipping, returns, and more.',
}

const faqs = [
  {
    category: 'Products',
    items: [
      {
        question: 'Are your products 100% natural and authentic?',
        answer: 'Yes, all our products are made with 100% authentic Ayurvedic herbs sourced from trusted farms across India. We do not use any synthetic fillers, artificial colors, or harmful preservatives. Each batch is tested for identity, purity, and potency.',
      },
      {
        question: 'Are your products tested for quality and safety?',
        answer: 'Absolutely. Every batch undergoes rigorous third-party testing for heavy metals, microbial contamination, pesticide residues, and potency verification. We follow Good Manufacturing Practices (GMP) in our certified facility.',
      },
      {
        question: 'What is the difference between BODY Essential Nutrition and STAYMAX+ Delay Spray?',
        answer: 'BODY Essential Nutrition is a daily wellness supplement with 6 Ayurvedic herbs (Ashwagandha, Shatavari, Amla, Guduchi, Triphala, Brahmi) for overall vitality. STAYMAX+ Delay Spray is a topical spray for men\'s endurance support with Lidocaine and Ayurvedic herbs. They serve completely different purposes.',
      },
      {
        question: 'Can I take BODY Essential Nutrition with other medications?',
        answer: 'While our products are natural, we recommend consulting your healthcare practitioner before starting any new supplement, especially if you are pregnant, nursing, taking medications, or have any medical conditions.',
      },
      {
        question: 'Is STAYMAX+ Delay Spray safe to use?',
        answer: 'STAYMAX+ is formulated for external use only. It contains 10% Lidocaine USP for mild desensitization. Do not use if allergic to lidocaine. Discontinue if irritation occurs. Not for individuals under 18. Consult a doctor if you have medical conditions.',
      },
      {
        question: 'How long does one bottle of STAYMAX+ last?',
        answer: 'Each 30ml bottle provides approximately 100+ sprays. With 2-3 sprays per use, one bottle typically lasts 30-50 applications depending on usage.',
      },
    ],
  },
  {
    category: 'Orders & Payment',
    items: [
      {
        question: 'How do I place an order?',
        answer: 'Add products to your cart, proceed to checkout, fill in your details, and choose your payment method. We offer two options: WhatsApp Order (coordinate payment/delivery on WhatsApp) or Cash on Delivery (pay when you receive the package).',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept WhatsApp Orders (UPI, Card, Net Banking coordinated via WhatsApp) and Cash on Delivery (COD). We do not have direct online payment gateways - all payments are coordinated through WhatsApp for a personal touch.',
      },
      {
        question: 'Is Cash on Delivery available everywhere?',
        answer: 'COD is available in most major cities and towns across India. Availability will be confirmed at checkout based on your pincode. Some remote areas may not support COD.',
      },
      {
        question: 'How does WhatsApp Order work?',
        answer: 'After checkout, you\'ll be redirected to WhatsApp with a pre-filled message containing your order details. Our team will confirm the order and share payment options (UPI, Card, Net Banking). Once payment is confirmed, we process and ship your order.',
      },
      {
        question: 'Can I modify or cancel my order after placing it?',
        answer: 'You can modify or cancel your order before it ships by contacting us on WhatsApp (+91 91234 85451) with your order number. Once shipped, orders cannot be cancelled but can be returned under our return policy.',
      },
      {
        question: 'Do you offer invoices for my orders?',
        answer: 'Yes, we provide digital invoices for all orders. For WhatsApp orders, the invoice is shared via WhatsApp. For COD orders, a printed invoice is included in the package. GST invoices available on request.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      {
        question: 'What are your shipping charges?',
        answer: 'Flat ₹49 shipping on all orders. Free shipping on orders above ₹999.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Standard delivery takes 5-7 business days. Metro cities may receive orders in 3-5 days. Remote areas may take 7-10 days. You\'ll receive tracking details once your order ships.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within India. International shipping is not available at this time.',
      },
      {
        question: 'How can I track my order?',
        answer: 'Use our Track Order page with your Order ID and registered email/phone. You\'ll also receive WhatsApp notifications with tracking details once your order ships.',
      },
      {
        question: 'What if my package is damaged or lost?',
        answer: 'If your package arrives damaged, contact us on WhatsApp within 24 hours with photos. We\'ll arrange a replacement or refund. For lost packages, we investigate with the carrier and resolve within 7-10 business days.',
      },
      {
        question: 'Can I change my delivery address after ordering?',
        answer: 'Contact us on WhatsApp immediately with your order number. If the order hasn\'t shipped, we can update the address. Once shipped, address changes may not be possible.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 7-day return policy for unopened, unused products in their original packaging. Contact us on WhatsApp to initiate a return. Return shipping costs are covered by us for defective/incorrect items.',
      },
      {
        question: 'How do I return a product?',
        answer: 'Message us on WhatsApp (+91 91234 85451) with your order number and reason for return. We\'ll provide a return authorization and arrange pickup. Refunds are processed within 5-7 business days after we receive the returned item.',
      },
      {
        question: 'Can I return opened products?',
        answer: 'For hygiene and safety reasons, we cannot accept returns of opened or used personal care products (like STAYMAX+). Supplements (BODY Essential Nutrition) can be returned if the safety seal is intact.',
      },
      {
        question: 'How long do refunds take?',
        answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be issued to your original payment method. WhatsApp order refunds are coordinated via WhatsApp.',
      },
      {
        question: 'What if I receive the wrong product?',
        answer: 'We apologize for any error. Contact us on WhatsApp with photos within 24 hours. We\'ll send the correct product at no extra cost and arrange pickup of the incorrect item.',
      },
    ],
  },
  {
    category: 'Account & General',
    items: [
      {
        question: 'Do I need an account to place an order?',
        answer: 'No, you can place orders as a guest. However, creating an account allows you to track orders, view history, save addresses, and manage your wishlist.',
      },
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page. Enter your registered email and you\'ll receive a password reset link.',
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes, we take data privacy seriously. We use encryption for sensitive data and never share your information with third parties except for order fulfillment. See our Privacy Policy for details.',
      },
      {
        question: 'Do you offer wholesale or bulk pricing?',
        answer: 'Yes, we offer wholesale pricing for bulk orders (typically 50+ units). Contact us on WhatsApp or email wholesale@ayurvedaglobal.com with your requirements.',
      },
      {
        question: 'Are your products certified organic?',
        answer: 'Our herbs are sourced from farms following organic and sustainable practices. While not all carry formal organic certification, we prioritize pesticide-free, sustainably harvested ingredients.',
      },
      {
        question: 'How can I stay updated on new products and offers?',
        answer: 'Subscribe to our newsletter at the bottom of any page, or follow us on Instagram, Facebook, and YouTube for wellness tips, new launches, and exclusive offers.',
      },
    ],
  },
]

export default function FAQPage() {
  const structuredData = [
    generateWebsiteStructuredData(),
    generateFAQStructuredData(
      faqs.flatMap(cat => cat.items.map(item => ({ question: item.question, answer: item.answer })))
    ),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black mb-4">Frequently Asked Questions</h1>
            <p className="text-ayur-stone text-lg">Quick answers to common questions about our products, orders, and policies</p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ayur-stone" />
              <input
                type="search"
                id="faq-search"
                placeholder="Search questions..."
                className="w-full pl-12 pr-4 py-3 bg-ayur-cream border-0 rounded-xl text-ayur-black placeholder-ayur-stone focus:outline-none focus:ring-2 focus:ring-ayur-gold"
              />
            </div>
          </div>

          <div className="space-y-8">
            {faqs.map((category, catIndex) => (
              <section key={category.category}>
                <h2 className="font-heading text-2xl font-medium text-ayur-black mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-ayur-forest/10 flex items-center justify-center">
                    <ChevronDown className="w-5 h-5 text-ayur-forest" />
                  </span>
                  {category.category}
                </h2>
                <Accordion
                  items={category.items.map((item, idx) => ({
                    title: item.question,
                    content: <p className="text-ayur-stone leading-relaxed">{item.answer}</p>,
                    defaultOpen: false,
                  }))}
                  allowMultiple
                />
              </section>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-ayur-stone mb-4">Still have questions? We&apos;re here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">Contact Support</a>
              <a href="https://wa.me/919123485451" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}