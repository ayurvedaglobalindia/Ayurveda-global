import { Metadata } from 'next'
import { generateWebsiteStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Ayur Veda Global Shipping Policy - Delivery times, charges, tracking, and international shipping information.',
}

const lastUpdated = 'December 15, 2024'

export default function ShippingPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteStructuredData()) }}
      />

      <div className="container py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black mb-4">Shipping Policy</h1>
            <p className="text-ayur-stone text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-ayur max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">1. Shipping Charges</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li><strong>Standard Shipping:</strong> ₹49 flat rate on all orders</li>
                <li><strong>Free Shipping:</strong> On orders above ₹999</li>
                <li>No hidden fees or surcharges</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">2. Delivery Timelines</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li><strong>Metro Cities:</strong> 3-5 business days</li>
                <li><strong>Major Cities:</strong> 4-6 business days</li>
                <li><strong>Standard Areas:</strong> 5-7 business days</li>
                <li><strong>Remote Areas:</strong> 7-10 business days</li>
              </ul>
              <p className="mt-3">Business days exclude weekends and public holidays. Timelines start from order confirmation, not order placement.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">3. Order Processing</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li>Orders confirmed via WhatsApp are processed within 24 hours</li>
                <li>COD orders are processed immediately upon placement</li>
                <li>Orders placed after 2 PM may be processed the next business day</li>
                <li>No processing on Sundays and public holidays</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">4. Shipping Carriers</h2>
              <p>We partner with trusted carriers including BlueDart, DTDC, Delhivery, and India Post. Carrier selection is based on your location and service availability.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">5. Order Tracking</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li>Tracking details sent via WhatsApp once shipped</li>
                <li>Track on our Track Order page with Order ID + email/phone</li>
                <li>Carrier tracking links provided when available</li>
                <li>Delivery notifications via WhatsApp</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">6. Delivery Issues</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li><strong>Failed Delivery:</strong> Carrier typically attempts 2-3 times. Contact us if delivery fails</li>
                <li><strong>Damaged Package:</strong> Report within 24 hours with photos for replacement</li>
                <li><strong>Lost Package:</strong> We investigate with carrier (7-10 days) and arrange replacement/refund</li>
                <li><strong>Wrong Address:</strong> Contact us immediately; changes may not be possible after dispatch</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">7. International Shipping</h2>
              <p>Currently, we only ship within India. International shipping is not available at this time. For wholesale inquiries from outside India, contact us at wholesale@ayurvedaglobal.com.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">8. Shipping Restrictions</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
                <li>STAYMAX+ Delay Spray (18+) requires age verification at delivery in some states</li>
                <li>Certain pincodes may have restricted COD availability</li>
                <li>We comply with all local regulations and carrier restrictions</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">9. Contact Us</h2>
              <p>For shipping-related questions:</p>
              <ul className="list-disc list-inside space-y-1 text-ayur-stone mt-2">
                <li>WhatsApp: +91 91234 85451</li>
                <li>Email: shipping@ayurvedaglobal.com</li>
                <li>Track Order: <a href="/track-order" className="underline hover:text-ayur-gold">/track-order</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}