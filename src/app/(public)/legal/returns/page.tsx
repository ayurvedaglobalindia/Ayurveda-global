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

      <div className="container py-8 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-semibold block mb-2">Customer Assurance</span>
            <h1 className="font-serif text-3xl md:text-5xl font-normal text-white mb-3">Returns & Refunds Policy</h1>
            <p className="text-[#8A9B8F] text-sm">Effective: {lastUpdated}</p>
          </div>

          <div className="glass-luxury-card border border-[#D4AF37]/25 rounded-2xl p-6 md:p-10 text-[#C4BDA8] leading-relaxed space-y-8 text-sm md:text-base">
            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                1. Return Eligibility
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li><strong className="text-white">Timeframe:</strong> 7 days from verified courier delivery date</li>
                <li><strong className="text-white">Condition:</strong> Unopened, unused, in original tamper-evident packaging with holographic seals intact</li>
                <li><strong className="text-white">Eligible Formulations:</strong> BODY Essential Nutrition & unopened Vitality Combos (with tamper seals intact)</li>
                <li><strong className="text-white">Non-Returnable:</strong> STAYMAX+ Delay Spray (opened/used) and broken-seal personal wellness items due to Ayurvedic sanitary standards</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                2. How to Initiate a Return
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-[#C4BDA8] pl-2">
                <li>Reach our Concierge directly on WhatsApp at <a href="https://wa.me/919123485451" className="text-[#D4AF37] hover:underline">+91 91234 85451</a> with your Order ID</li>
                <li>Provide the specific reason for return and clear photos of unopened tamper seals</li>
                <li>Our quality team verifies eligibility and issues an official Return Authorization (RA)</li>
                <li>Pack the formulation in its protective outer box</li>
                <li>Our express courier partner will arrange doorstep reverse pickup</li>
              </ol>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                3. Return Shipping & Transit
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li><strong className="text-white">Defective/Damaged in Transit:</strong> Ayur Veda Global covers 100% of reverse courier costs</li>
                <li><strong className="text-white">Change of Mind:</strong> Nominal standard return fee (₹49) deducted from refund balance</li>
                <li><strong className="text-white">Complimentary Orders:</strong> If returned item reduces total order value below ₹999, original shipping is factored</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                4. Refund Process
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li>Refunds processed within 2 business days of verified warehouse receipt & inspection</li>
                <li><strong className="text-white">WhatsApp Orders:</strong> Direct refund via instant UPI or IMPS bank transfer</li>
                <li><strong className="text-white">Cash on Delivery Orders:</strong> Direct NEFT/IMPS transfer to verified account details provided to concierge</li>
                <li>Standard bank processing takes 2-4 banking days to reflect on your statement</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                5. Damaged or Incorrect Dispatches
              </h2>
              <p>In the rare event your order arrives with courier damage or dispatch discrepancy:</p>
              <ol className="list-decimal list-inside space-y-1.5 text-[#C4BDA8] pl-2 mt-2">
                <li>Notify WhatsApp concierge within 24 hours of package delivery</li>
                <li>Share an unboxing photograph or short video showing the outer label and damage</li>
                <li>An immediate complimentary replacement will be dispatched via priority express</li>
              </ol>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                6. Direct Returns Concierge
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li><strong className="text-white">WhatsApp Concierge:</strong> <a href="https://wa.me/919123485451" className="text-[#D4AF37] hover:underline">+91 91234 85451</a></li>
                <li><strong className="text-white">Email Desk:</strong> <a href="mailto:returns@ayurvedaglobal.com" className="text-[#D4AF37] hover:underline">returns@ayurvedaglobal.com</a></li>
                <li>Hours: Monday – Saturday, 9:00 AM – 7:00 PM IST</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}