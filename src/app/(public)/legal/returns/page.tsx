import { Metadata } from 'next'
import { generateWebsiteStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Returns & Refunds Policy',
  description: 'Ayur Veda Global Returns & Refunds Policy - How to return products, eligibility, timelines, and refund process.',
}

const lastUpdated = 'December 15, 2024'

export default function ReturnsPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteStructuredData()) }}
      />

      <div className="container py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black mb-4">Returns & Refunds Policy</h1>
            <p className="text-ayur-stone text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-ayur max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">1. Return Eligibility</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li><strong>Timeframe:</strong> 7 days from delivery date</li>
                <li><strong>Condition:</strong> Unopened, unused, in original packaging with safety seals intact</li>
                <li><strong>Products Eligible:</strong> BODY Essential Nutrition (if seal unbroken)</li>
                <li><strong>Products NOT Eligible:</strong> STAYMAX+ Delay Spray (opened/used), any personal care product with broken seal</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">2. How to Initiate a Return</h2>
              <ol className="list-decimal list-inside space-y-3 text-ayur-stone">
                <li>Contact us on WhatsApp (+91 91234 85451) with your order number</li>
                <li>Provide reason for return and photos of the product</li>
                <li>We'll verify eligibility and issue a Return Authorization (RA) number</li>
                <li>Pack the product securely in original packaging</li>
                <li>We'll arrange pickup or provide return shipping label</li>
              </ol>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">3. Return Shipping Costs</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li><strong>Defective/Incorrect/Damaged Items:</strong> We cover all return shipping costs</li>
                <li><strong>Change of Mind/Incorrect Order:</strong> Customer bears return shipping (₹49 deducted from refund)</li>
                <li><strong>Free Shipping Orders:</strong> If return makes order value drop below ₹999, original shipping (₹49) is deducted</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">4. Refund Process</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li>Refunds initiated within 2 business days of receiving returned item</li>
                <li>Inspection takes 1-2 business days upon receipt</li>
                <li>Refund issued to original payment method</li>
                <li><strong>WhatsApp Orders:</strong> Refund coordinated via WhatsApp (UPI/bank transfer)</li>
                <li><strong>COD Orders:</strong> Refund via bank transfer (provide account details)</li>
                <li>Refund timeline: 5-7 business days to reflect in your account</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">5. Partial Refunds</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li>Opened/damaged packaging: Up to 50% refund</li>
                <li>Missing accessories/literature: Proportional deduction</li>
                <li>Used personal care products: No refund (hygiene policy)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">6. Exchanges</h2>
              <p>We do not offer direct exchanges. Please return the original item for a refund and place a new order for the desired product.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">7. Non-Returnable Items</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li>STAYMAX+ Delay Spray (once opened - hygiene product)</li>
                <li>Products with broken safety seals</li>
                <li>Gift cards (if offered in future)</li>
                <li>Products damaged due to customer misuse</li>
                <li>Items returned without RA number</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">8. Damaged or Incorrect Items</h2>
              <p>If you receive a damaged or incorrect item:</p>
              <ol className="list-decimal list-inside space-y-2 text-ayur-stone mt-2">
                <li>Contact us on WhatsApp within 24 hours of delivery</li>
                <li>Provide clear photos of the damage/incorrect item and packaging</li>
                <li>We'll arrange immediate replacement at no cost</li>
                <li>No need to return the damaged item (we'll guide disposal)</li>
              </ol>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">9. Refund Exceptions</h2>
              <p>We reserve the right to refuse refunds if:</p>
              <ul className="list-disc list-inside space-y-1 text-ayur-stone mt-2">
                <li>Return request is beyond 7 days</li>
                <li>Product shows signs of use or tampering</li>
                <li>Safety seals are broken (supplements) or opened (personal care)</li>
                <li>Returned without prior authorization</li>
                <li>Item returned incomplete (missing parts, literature, packaging)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">10. Contact for Returns</h2>
              <ul className="list-disc list-inside space-y-1 text-ayur-stone">
                <li><strong>WhatsApp (Fastest):</strong> +91 91234 85451</li>
                <li><strong>Email:</strong> returns@ayurvedaglobal.com</li>
                <li>Include: Order number, reason, photos, preferred resolution</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}