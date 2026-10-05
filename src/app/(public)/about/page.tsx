import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Award, ShieldCheck, Heart, Users, Star, ArrowRight } from 'lucide-react'
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About Us | Classical Ayurvedic Apothecary',
  description: 'Ayur Veda Global honors centuries of Ayurvedic tradition. Learn about our lineage, botanical sourcing, Shodhana purification, and commitment to purity.',
}

const values = [
  {
    icon: Leaf,
    title: 'Botanical Authenticity',
    description: 'We source high-altitude Himalayan Shilajit, pure Nagori Ashwagandha, and classical herbs directly from their natural habitats.',
  },
  {
    icon: ShieldCheck,
    title: 'Analytical Purity',
    description: 'Every batch is tested in NABL-accredited third-party laboratories for heavy metals, pesticides, and microbial purity.',
  },
  {
    icon: Award,
    title: 'Classical Lineage',
    description: 'Our formulations adhere strictly to Charaka Samhita and Sushruta Samhita treatises, without synthetic chemical accelerators.',
  },
  {
    icon: Heart,
    title: 'Patron Confidentiality',
    description: 'We respect personal wellness choices with 100% plain, unmarked parcels and zero sensitive labels on billing slips.',
  },
]

const team = [
  {
    name: 'Mageesh',
    role: 'Brand Vision & Leadership',
    bio: 'Dedicated to preserving classical Ayurvedic Rasayana principles and providing reliable botanical wellness solutions across India.',
    image: '/images/team/mageesh.jpg',
  },
  {
    name: 'Umesh',
    role: 'Operations & Logistics',
    bio: 'Oversees tamper-evident packaging, express cold-chain logistics, and confidential dispatch coordination across 19,000+ pin codes.',
    image: '/images/team/umesh.jpg',
  },
]

const milestones = [
  { year: '2020', title: 'Apothecary Inception', desc: 'Ayur Veda Global established with a focus on classical Rasayana formulations.' },
  { year: '2021', title: 'Direct Himalayan Sourcing', desc: 'Formed direct partnerships with high-altitude botanical collectors in Himachal and Uttarakhand.' },
  { year: '2023', title: 'NABL & HPLC Validation', desc: 'Standardized analytical testing protocols ensuring 75%+ fulvic acid and 5% withanolides.' },
  { year: '2025', title: 'Pan-India Confidential Network', desc: 'Expanded discreet Cash on Delivery network to over 19,000 postal codes nationwide.' },
]

export default function AboutPage() {
  const structuredData = [
    generateWebsiteStructuredData(),
    generateOrganizationStructuredData(),
  ]

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container py-8 sm:py-12 lg:py-16">
        
        {/* Hero Section */}
        <section className="mb-12 sm:mb-16">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1">
              Lineage &amp; Heritage
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1D1F] tracking-tight mb-4">
              Classical Wisdom, Calibrated for Modern Life
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans max-w-2xl mx-auto">
              Ayur Veda Global was founded on an enduring conviction: genuine Ayurvedic Rasayana cannot be manufactured through industrial shortcuts. We bridge traditional compendia with modern laboratory verification.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F1EB] border border-[#E2DDD5] shadow-xs">
              <Image
                src="/images/products/vitality-power-combo-card.jpg"
                alt="Ayur Veda Global Botanical Heritage"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] block">
                Foundational Philosophy
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">
                Our Pharmacopeial Standard
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans">
                While commercial markets frequently rely on synthetic stimulants, animal gelatins, and artificial numbness chemicals, our apothecary adheres strictly to classical Charaka Samhita guidelines.
              </p>
              <div className="space-y-2 pt-1 text-xs text-[#1C1D1F]">
                {[
                  'Pure, standardized herbs from geographical origins',
                  'Classical Shodhana purification in Triphala decoctions',
                  'NABL laboratory assays for heavy metals & microbiology',
                  '100% plant cellulose vegetarian capsules & plain packaging',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <Star className="w-3.5 h-3.5 text-[#4E5F52] flex-shrink-0" />
                    <span className="text-[#333333] font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-14 sm:mb-18 border-t border-[#E2DDD5] pt-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1">
              Guiding Principles
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">
              Foundations of Formulation
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value) => (
              <div key={value.title} className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] border border-[#E2DDD5] flex items-center justify-center mb-3 text-[#4E5F52]">
                    <value.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading text-sm font-medium text-[#1C1D1F] mb-1.5">{value.title}</h3>
                  <p className="text-xs text-[#555555] leading-relaxed font-sans">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section className="mb-14 sm:mb-18 border-t border-[#E2DDD5] pt-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1">
              Administration
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">
              Apothecary Stewardship
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] shadow-xs text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-[#FAF7F2] relative border border-[#E2DDD5]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="font-heading text-base font-medium text-[#1C1D1F]">{member.name}</h3>
                <p className="text-xs font-mono text-[#9E8047] uppercase tracking-wider mt-0.5 mb-2">{member.role}</p>
                <p className="text-xs text-[#555555] leading-relaxed font-sans">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="mb-12 border-t border-[#E2DDD5] pt-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1">
              Historical Milestones
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">
              Chronicle of Growth
            </h2>
          </div>
          <div className="relative max-w-xl mx-auto pl-6 border-l border-[#E2DDD5] space-y-6">
            {milestones.map((m) => (
              <div key={m.year} className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#1C1D1F] border border-[#FFFFFF]" />
                <span className="text-[11px] font-mono text-[#9E8047] uppercase tracking-wider block">{m.year}</span>
                <h3 className="font-heading text-sm font-medium text-[#1C1D1F] mt-0.5">{m.title}</h3>
                <p className="text-xs text-[#555555] mt-1 leading-relaxed font-sans">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="rounded-2xl p-8 text-center bg-[#FFFFFF] border border-[#E2DDD5] shadow-xs max-w-3xl mx-auto mt-12">
          <h2 className="font-heading text-xl sm:text-2xl font-normal text-[#1C1D1F] mb-2">
            Explore Classical Formulations
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] mb-6 max-w-md mx-auto font-sans">
            Learn more about our standardized supplements, topical endurance sprays, and personalized routines.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/shop"
              className="px-6 py-2.5 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] text-xs font-medium uppercase tracking-wider transition-colors"
            >
              View Catalog
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full border border-[#1C1D1F] text-[#1C1D1F] text-xs font-medium uppercase tracking-wider hover:bg-[#FAF7F2] transition-colors"
            >
              Contact Concierge
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}