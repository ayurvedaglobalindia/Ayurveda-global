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

      <div className="container py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black mb-4">Privacy Policy</h1>
            <p className="text-ayur-stone text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-ayur max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">1. Introduction</h2>
              <p>Ayur Veda Global ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ayurvedaglobal.com and use our services.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">2. Information We Collect</h2>
              <h3 className="font-medium text-ayur-forest mb-2">Personal Information</h3>
              <ul className="list-disc list-inside space-y-1 text-ayur-stone">
                <li>Name, email address, phone number</li>
                <li>Shipping and billing addresses</li>
                <li>Order history and preferences</li>
                <li>Account credentials (if you create an account)</li>
                <li>Communication records (WhatsApp, email, contact forms)</li>
              </ul>

              <h3 className="font-medium text-ayur-forest mb-2 mt-4">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-1 text-ayur-stone">
                <li>IP address, browser type, operating system</li>
                <li>Pages visited, time spent, referral source</li>
                <li>Device identifiers and cookies</li>
                <li>WhatsApp click tracking (source, product, timestamp)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-ayur-stone">
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
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">4. WhatsApp Communication</h2>
              <p>We use WhatsApp as our primary communication channel for order coordination, payment, and customer support. When you click WhatsApp buttons on our site, we track the source (floating button, product page, checkout, contact page) for analytics. Your phone number and message content are shared with WhatsApp per their privacy policy.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">5. Information Sharing</h2>
              <p>We do not sell your personal information. We may share information with:</p>
              <ul className="list-disc list-inside space-y-1 text-ayur-stone mt-2">
                <li>Shipping carriers for delivery</li>
                <li>WhatsApp for communication</li>
                <li>Legal authorities when required by law</li>
                <li>Service providers who assist our operations (under strict confidentiality)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">6. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements. Order records are kept for 7 years for tax and legal compliance.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">7. Your Rights</h2>
              <p>Under applicable data protection laws, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-1 text-ayur-stone mt-2">
                <li>Access your personal information</li>
                <li>Rectify inaccurate data</li>
                <li>Request deletion (subject to legal obligations)</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent for marketing</li>
              </ul>
              <p className="mt-3">To exercise these rights, contact us at privacy@ayurvedaglobal.com or via WhatsApp.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">8. Cookies and Tracking</h2>
              <p>We use essential cookies for site functionality (cart, wishlist, authentication). We also use analytics cookies to understand site usage. You can manage cookie preferences in your browser settings. WhatsApp click tracking uses localStorage for lead analytics.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">9. Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your information, including encryption, secure communication protocols, and access controls. However, no internet transmission is 100% secure.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">10. Children's Privacy</h2>
              <p>Our services are not directed to individuals under 18. STAYMAX+ Delay Spray is age-restricted (18+). We do not knowingly collect personal information from children under 18.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">11. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Material changes will be communicated via email or WhatsApp.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-medium text-ayur-black mb-3">12. Contact Us</h2>
              <p>For questions about this Privacy Policy or your data:</p>
              <ul className="list-disc list-inside space-y-1 text-ayur-stone mt-2">
                <li>Email: privacy@ayurvedaglobal.com</li>
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