import { Metadata } from 'next'
import { generateWebsiteStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Ayur Veda Global Privacy Policy - How we collect, use, and protect your personal information.',
}

const lastUpdated = 'December 15, 2024'

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteStructuredData()) }}
      />

      <div className="container py-5 sm:py-7 lg:py-9">
        <div className="max-w-3xl mx-auto">
          <div className="mb-5 sm:mb-6">
            <span className="text-[#D4AF37] text-[10px] sm:text-xs uppercase tracking-widest font-semibold block mb-1.5">Legal Transparency</span>
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white mb-2">Privacy Policy</h1>
            <p className="text-[#8A9B8F] text-xs sm:text-sm">Effective: {lastUpdated}</p>
          </div>

          <div className="glass-luxury-card border border-[#D4AF37]/25 rounded-2xl p-5 sm:p-7 text-[#C4BDA8] leading-relaxed space-y-6 text-xs sm:text-sm">
            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                1. Introduction
              </h2>
              <p>Ayur Veda Global (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ayurvedaglobal.com and use our services.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                2. Information We Collect
              </h2>
              <h3 className="font-medium text-[#F4E295] mb-2">Personal Information</h3>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li>Name, email address, phone number</li>
                <li>Shipping and billing addresses</li>
                <li>Order history and preferences</li>
                <li>Account credentials (if you create an account)</li>
                <li>Communication records (WhatsApp, email, contact forms)</li>
              </ul>

              <h3 className="font-medium text-[#F4E295] mb-2 mt-4">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li>IP address, browser type, operating system</li>
                <li>Pages visited, time spent, referral source</li>
                <li>Device identifiers and cookies</li>
                <li>WhatsApp click tracking (source, product, timestamp)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                3. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2">
                <li>Process and fulfill orders</li>
                <li>Coordinate delivery and payments via WhatsApp</li>
                <li>Send order confirmations, updates, and tracking</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Improve our website, products, and services</li>
                <li>Send promotional communications (with consent)</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                4. WhatsApp Communication
              </h2>
              <p>We use WhatsApp as our primary communication channel for order coordination, payment, and customer support. When you click WhatsApp buttons on our site, we track the source (floating button, product page, checkout, contact page) for analytics. Your phone number and message content are shared with WhatsApp per their privacy policy.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                5. Information Sharing
              </h2>
              <p>We do not sell your personal information. We may share information with:</p>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2 mt-2">
                <li>Shipping carriers for delivery</li>
                <li>WhatsApp for communication</li>
                <li>Legal authorities when required by law</li>
                <li>Service providers who assist our operations (under strict confidentiality)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                6. Data Retention
              </h2>
              <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements. Order records are kept for 7 years for tax and legal compliance.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                7. Your Rights
              </h2>
              <p>Under applicable data protection laws, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2 mt-2">
                <li>Access your personal information</li>
                <li>Rectify inaccurate data</li>
                <li>Request deletion (subject to legal obligations)</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent for marketing</li>
              </ul>
              <p className="mt-3">To exercise these rights, contact us at <a href="mailto:privacy@ayurvedaglobal.com" className="text-[#D4AF37] hover:underline">privacy@ayurvedaglobal.com</a> or via WhatsApp.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                8. Cookies and Tracking
              </h2>
              <p>We use essential cookies for site functionality (cart, wishlist, authentication). We also use analytics cookies to understand site usage. You can manage cookie preferences in your browser settings. WhatsApp click tracking uses localStorage for lead analytics.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                9. Security
              </h2>
              <p>We implement appropriate technical and organizational measures to protect your information, including encryption, secure communication protocols, and access controls. However, no internet transmission is 100% secure.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                10. Children&apos;s Privacy
              </h2>
              <p>Our services are not directed to individuals under 18. STAYMAX+ Delay Spray is age-restricted (18+). We do not knowingly collect personal information from children under 18.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                11. Changes to This Policy
              </h2>
              <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Material changes will be communicated via email or WhatsApp.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                12. Contact Us
              </h2>
              <p>For questions about this Privacy Policy or your data:</p>
              <ul className="list-disc list-inside space-y-1.5 text-[#C4BDA8] pl-2 mt-2">
                <li>Email: <a href="mailto:privacy@ayurvedaglobal.com" className="text-[#D4AF37] hover:underline">privacy@ayurvedaglobal.com</a></li>
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