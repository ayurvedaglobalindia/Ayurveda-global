import { Metadata } from 'next'
import { generateWebsiteStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Ayur Veda Global Terms of Service - Rules and guidelines for using our website and services.',
}

const lastUpdated = 'December 15, 2024'

export default function TermsOfServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteStructuredData()) }}
      />

      <div className="container py-8 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold block mb-2">Legal Governance</span>
            <h1 className="font-serif text-3xl md:text-5xl font-normal text-white mb-3">Terms of Service</h1>
            <p className="text-[#8A9B8F] text-sm">Effective: {lastUpdated}</p>
          </div>

          <div className="glass-luxury-card border border-[#D4AF37]/25 rounded-2xl p-6 md:p-10 text-[#C4BDA8] leading-relaxed space-y-8 text-sm md:text-base">
            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                1. Acceptance of Terms
              </h2>
              <p>By accessing and using ayurvedaglobal.com (&quot;Website&quot;) and purchasing formulations from Ayur Veda Global (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; &quot;us&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part, you may not use our services.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                2. Products and Services
              </h2>
              <p>We offer authentic Ayurvedic wellness products including dietary supplements and personal care items. Product descriptions, imagery, and prices are subject to change without notice. We make reasonable efforts to display botanical ingredients and packaging accurately.</p>
              <p className="mt-3 text-[#F4E295] bg-[#061B12] p-3 rounded-lg border border-[#D4AF37]/30 text-xs">
                <strong>Age Restriction:</strong> STAYMAX+ Delay Spray is formulated for individuals 18 years and older only. By purchasing, you legally confirm you meet this requirement.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                3. Orders and Payment
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li>All orders are subject to acceptance and raw botanical availability</li>
                <li>We offer WhatsApp Concierge Order (coordinated payment via WhatsApp) and Cash on Delivery (COD)</li>
                <li>Prices are in Indian Rupees (INR) and include applicable taxes</li>
                <li>We reserve the right to decline or cancel any unverified order</li>
                <li>Order confirmation via WhatsApp constitutes mutual commercial agreement</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                4. Shipping and Delivery
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li>Complimentary express delivery on all orders above ₹999; flat ₹49 on orders below</li>
                <li>Standard delivery: 3-5 business days across Indian metros</li>
                <li>Discreet, tamper-evident protective outer packaging</li>
                <li>Real-time shipment tracking provided via SMS and WhatsApp</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                5. Returns and Refunds
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li>7-day return policy for unopened, uncompromised products with seals intact</li>
                <li>Original packaging and tamper-evident seals must be unbroken</li>
                <li>Personal care products (opened) cannot be returned due to Ayurvedic hygiene protocols</li>
                <li>Direct refund initiated within 2 business days of verified return receipt</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                6. Health and Wellness Disclaimer
              </h2>
              <p><strong>Traditional Lineage:</strong> Our formulations are dietary supplements and personal care preparations based on classical Ayurvedic treatises (Charaka Samhita, Sushruta Samhita). They are not intended to substitute professional medical diagnosis or clinical treatments.</p>
              <p className="mt-2">Always consult a qualified Ayurvedic physician or medical doctor before beginning any supplement routine, particularly if pregnant, lactating, or on prescription medication.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                7. Intellectual Property
              </h2>
              <p>All trademarks, logos, botanical iconography, text, and design motifs on this Website are proprietary property of Ayur Veda Global. Reproduction without express written consent is strictly prohibited.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                8. Governing Law
              </h2>
              <p>These Terms shall be governed and interpreted under the laws of the Republic of India. Any legal dispute shall fall under the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                9. Legal Inquiries
              </h2>
              <p>For inquiries regarding these Terms of Service:</p>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2 mt-2">
                <li>Email: <a href="mailto:legal@ayurvedaglobal.com" className="text-[#D4AF37] hover:underline">legal@ayurvedaglobal.com</a></li>
                <li>WhatsApp: <a href="https://wa.me/919123485451" className="text-[#D4AF37] hover:underline">+91 91234 85451</a></li>
                <li>Post: Ayur Veda Global, Mumbai, Maharashtra, India</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}