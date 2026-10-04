import { Metadata } from 'next'
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo'
import { EditorialHero } from '@/components/home/EditorialHero'
import { ApothecaryTrustTicker } from '@/components/home/ApothecaryTrustTicker'
import { FeaturedApothecary } from '@/components/home/FeaturedApothecary'
import { ApothecaryPillars } from '@/components/home/ApothecaryPillars'
import { BotanicalPharmacopeia } from '@/components/home/BotanicalPharmacopeia'
import { TheThirtyDayRitual } from '@/components/home/TheThirtyDayRitual'
import { VaidyaConsultationDesk } from '@/components/home/VaidyaConsultationDesk'
import { PatronTestimonials } from '@/components/home/PatronTestimonials'
import { ApothecaryFAQ } from '@/components/home/ApothecaryFAQ'

export const metadata: Metadata = {
  title: 'Ayur Veda Global | Classical Ayurvedic Formulations & Vitality Rasayana',
  description:
    'Authentic Ayurvedic apothecary specializing in classical Rasayana formulations. Featuring BODY Essential Nutrition (60 Capsules), STAYMAX+ Delay Spray (30 ml), and the Vitality Power Combo. Standardized Himalayan herbs, NABL purity tested, 100% discreet delivery across India.',
  openGraph: {
    title: 'Ayur Veda Global | Classical Ayurvedic Formulations & Vitality Rasayana',
    description:
      'Time-honored Rasayana chemistry formulated for modern vitality. 100% herbal botanicals, NABL lab tested purity, discreet delivery nationwide.',
    type: 'website',
  },
}

export default function HomePage() {
  const structuredData = [
    generateWebsiteStructuredData(),
    generateOrganizationStructuredData(),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 1. Stately Magazine Editorial Hero */}
      <EditorialHero />

      {/* 2. Sleek Four-Point Trust Ribbon (AYUSH, HPLC, Discreet, COD) */}
      <ApothecaryTrustTicker />

      {/* 3. Master Formulations Showcase & Dynamic Catalog */}
      <FeaturedApothecary />

      {/* 4. Four Vedic Pillars of Classical Quality */}
      <ApothecaryPillars />

      {/* 5. The Sacred Pharmacopeia: Interactive Botanical Explorer */}
      <BotanicalPharmacopeia />

      {/* 6. The 30-Day Physiological Rejuvenation Ritual */}
      <TheThirtyDayRitual />

      {/* 7. Confidential Ayurvedic Vaidya Consultation Desk */}
      <VaidyaConsultationDesk />

      {/* 8. Verified Patron Experiences & Real Accounts */}
      <PatronTestimonials />

      {/* 9. Apothecary Guidance & Frequently Asked Questions */}
      <ApothecaryFAQ />
    </>
  )
}