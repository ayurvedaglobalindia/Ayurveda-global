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

      <div className="container py-8 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold block mb-2">Logistics & Dispatches</span>
            <h1 className="font-serif text-3xl md:text-5xl font-normal text-white mb-3">Shipping Policy</h1>
            <p className="text-[#8A9B8F] text-sm">Effective: {lastUpdated}</p>
          </div>

          <div className="glass-luxury-card border border-[#D4AF37]/25 rounded-2xl p-6 md:p-10 text-[#C4BDA8] leading-relaxed space-y-8 text-sm md:text-base">
            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                1. Shipping Rates & Thresholds
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li><strong className="text-white">Complimentary Express Shipping:</strong> Available on all orders above ₹999 across all serviceable PIN codes in India.</li>
                <li><strong className="text-white">Standard Delivery Fee:</strong> Flat ₹49 on orders below ₹999.</li>
                <li><strong className="text-white">Zero Hidden Charges:</strong> All prices shown at checkout include GST and handling fees.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                2. Delivery Timelines
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li><strong className="text-white">Metro Hubs (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2–4 business days</li>
                <li><strong className="text-white">Tier-II & Tier-III Cities:</strong> 3–5 business days</li>
                <li><strong className="text-white">Rest of India & Remote Outposts:</strong> 5–7 business days</li>
              </ul>
              <p className="mt-3 text-xs text-[#8A9B8F]">Orders confirmed before 2:00 PM IST Monday through Saturday are dispatched the same calendar day.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                3. Discreet Packaging Protocol
              </h2>
              <p>We respect customer confidentiality. All products, particularly STAYMAX+ Delay Spray and Vitality Combos, are shipped in plain, tamper-evident corrugated boxes with zero external product markings or descriptions, bearing only discreet logistics labels.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                4. Courier Partners
              </h2>
              <p>We ship through premium air express networks including BlueDart, DTDC Apex, Delhivery Express, and Speed Post for remote regions. Airway Bill (AWB) numbers are assigned immediately upon packaging.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                5. Live Order Tracking
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li>Tracking links are dispatched via automated WhatsApp and SMS upon courier scan</li>
                <li>Track anytime via our live portal at <a href="/track-order" className="text-[#D4AF37] hover:underline">ayurvedaglobal.com/track-order</a></li>
                <li>Direct assistance available from our logistics desk via WhatsApp</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                6. Shipping Assistance
              </h2>
              <p>For inquiries regarding dispatch status, PIN code serviceability, or delivery scheduling:</p>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2 mt-2">
                <li><strong className="text-white">WhatsApp Dispatch Desk:</strong> <a href="https://wa.me/919123485451" className="text-[#D4AF37] hover:underline">+91 91234 85451</a></li>
                <li><strong className="text-white">Email:</strong> <a href="mailto:shipping@ayurvedaglobal.com" className="text-[#D4AF37] hover:underline">shipping@ayurvedaglobal.com</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}