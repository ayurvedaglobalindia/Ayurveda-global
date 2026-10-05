import { Metadata } from 'next'
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo'
import { CleanHero } from '@/components/home/CleanHero'
import { QualityTrustLedger } from '@/components/home/QualityTrustLedger'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { BrandHeritageStory } from '@/components/home/BrandHeritageStory'
import { ApothecaryFAQ } from '@/components/home/ApothecaryFAQ'
import { VaidyaConsultationDesk } from '@/components/home/VaidyaConsultationDesk'

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

      {/* 1. Clean, Simple, Premium Hero with Strong Tagline */}
      <CleanHero />

      {/* 2. Sleek 1-Row Purity & Compliance Trust Bar */}
      <QualityTrustLedger />

      {/* 3. Products Early Position: Master Formulations Grid */}
      <FeaturedProducts />

      {/* 4. Quiet Classical Apothecary Heritage & Philosophy */}
      <BrandHeritageStory />

      {/* 5. Essential Logistics & Formulary FAQs */}
      <ApothecaryFAQ />

      {/* 6. Clean Resident Vaidya Consultation Invitation */}
      <VaidyaConsultationDesk />
    </>
  )
}