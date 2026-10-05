import { Metadata } from 'next'
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo'
import { CleanHero } from '@/components/home/CleanHero'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { CollectionStrip } from '@/components/home/CollectionStrip'
import { BrandHeritageStory } from '@/components/home/BrandHeritageStory'
import { QualityTrustLedger } from '@/components/home/QualityTrustLedger'
import { BotanicalIngredients } from '@/components/home/BotanicalIngredients'
import { PatronTestimonials } from '@/components/home/PatronTestimonials'
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

      {/* 1. Direct Brand & Natural Hero */}
      <CleanHero />

      {/* 2. Early Position Master Formulations Grid */}
      <FeaturedProducts />

      {/* 3. Curated Product Collections Strip */}
      <CollectionStrip />

      {/* 4. Classical Brand & Heritage Story */}
      <BrandHeritageStory />

      {/* 5. Key Trust & Quality Ledger (AYUSH, GMP, NABL, 100% Discreet) */}
      <QualityTrustLedger />

      {/* 6. Standardized Botanical Actives & Clinical Affinities */}
      <BotanicalIngredients />

      {/* 7. Documented Patron Reflections & Verified Accounts */}
      <PatronTestimonials />

      {/* 8. Formulary & Logistics FAQ */}
      <ApothecaryFAQ />

      {/* 9. Clean Resident Vaidya Consultation CTA Desk */}
      <VaidyaConsultationDesk />
    </>
  )
}