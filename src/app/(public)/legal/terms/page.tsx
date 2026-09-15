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

      <div className="container py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black mb-4">Terms of Service</h1>
            <p className="text-ayur-stone text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-ayur max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using ayurvedaglobal.com ("Website") and purchasing products from Ayur Veda Global ("Company," "we," "our," "us"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part, you may not use our services.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">2. Products and Services</h2>
              <p>We offer Ayurvedic wellness products including dietary supplements and personal care items. Product descriptions, images, and prices are subject to change without notice. We make reasonable efforts to display colors and packaging accurately, but cannot guarantee your screen's display matches the actual product.</p>
              <p><strong>Age Restriction:</strong> STAYMAX+ Delay Spray is for individuals 18 years and older only. By purchasing, you confirm you meet this requirement.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">3. Orders and Payment</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li>All orders are subject to acceptance and availability</li>
                <li>We offer WhatsApp Order (coordinated payment via WhatsApp) and Cash on Delivery (COD)</li>
                <li>Prices are in Indian Rupees (INR) and include applicable taxes</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Order confirmation via WhatsApp constitutes acceptance</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">4. Shipping and Delivery</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li>Flat ₹49 shipping; free on orders above ₹999</li>
                <li>Standard delivery: 5-7 business days</li>
                <li>Risk passes to you upon delivery</li>
                <li>We are not liable for carrier delays</li>
                <li>Provide accurate shipping information</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">5. Returns and Refunds</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li>7-day return policy for unopened, unused products</li>
                <li>Original packaging and safety seals must be intact</li>
                <li>Personal care products (opened) cannot be returned for hygiene</li>
                <li>Refunds within 5-7 business days of receiving return</li>
                <li>Return shipping covered for defective/incorrect items</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">6. Health and Wellness Disclaimer</h2>
              <p><strong>Important:</strong> Our products are dietary supplements and personal care items, not medications. They are not intended to diagnose, treat, cure, or prevent any disease. Statements about product benefits are based on traditional Ayurvedic use and general wellness support, not clinical trials or medical claims.</p>
              <p>Consult a healthcare professional before use if pregnant, nursing, taking medications, or have medical conditions. Individual results may vary. Discontinue use if adverse reactions occur.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">7. Intellectual Property</h2>
              <p>All content on this Website (text, images, logos, designs, trademarks) is owned by or licensed to Ayur Veda Global. You may not reproduce, distribute, or create derivative works without written permission.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">8. User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 text-ayur-stone mt-2">
                <li>Use the Website for unlawful purposes</li>
                <li>Interfere with site security or functionality</li>
                <li>Scrape, crawl, or extract data without permission</li>
                <li>Post false, misleading, or harmful content</li>
                <li>Attempt to gain unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">9. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Ayur Veda Global shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill. Our total liability shall not exceed the amount paid for the relevant product.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">10. Indemnification</h2>
              <p>You agree to indemnify and hold harmless Ayur Veda Global from any claims, damages, losses, or expenses arising from your use of the Website, violation of these Terms, or infringement of any rights.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">11. Governing Law and Disputes</h2>
              <p>These Terms are governed by the laws of India. Disputes shall be resolved through good-faith negotiation, failing which by arbitration in Mumbai under the Arbitration and Conciliation Act, 1996. Courts in Mumbai shall have exclusive jurisdiction.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">12. Changes to Terms</h2>
              <p>We may modify these Terms at any time. Changes take effect upon posting. Continued use constitutes acceptance. Material changes will be communicated via email or WhatsApp.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">13. Contact Information</h2>
              <p>For questions about these Terms:</p>
              <ul className="list-disc list-inside space-y-1 text-ayur-stone mt-2">
                <li>Email: legal@ayurvedaglobal.com</li>
                <li>WhatsApp: +91 91234 85451</li>
                <li>Post: Ayur Veda Global, Mumbai, Maharashtra, India</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}