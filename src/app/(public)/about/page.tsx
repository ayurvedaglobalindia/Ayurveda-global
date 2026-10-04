import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Leaf, Sparkles, Shield, RotateCcw, Users, Award, Truck, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Ayur Veda Global - our mission to bring authentic Ayurvedic wellness to the world through pure herbs and traditional formulations.',
}

const values = [
  {
    icon: Leaf,
    title: 'Purity First',
    description: 'We source only the finest, sustainably harvested herbs. No fillers, no artificial additives, no compromises.',
  },
  {
    icon: Sparkles,
    title: 'Traditional Wisdom',
    description: 'Our formulations are rooted in classical Ayurvedic texts, adapted for modern wellness needs.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Every batch undergoes rigorous testing for identity, purity, potency, and safety.',
  },
  {
    icon: RotateCcw,
    title: 'Sustainable Practices',
    description: 'Eco-friendly packaging, ethical sourcing, and carbon-conscious operations.',
  },
]

const team = [
  {
    name: 'Mageesh',
    role: 'Owner',
    image: '/images/team/mageesh.jpg',
    bio: 'Founder and brand owner driving authentic Ayurvedic wellness, sustainable herbal sourcing, and quality excellence across India.',
  },
  {
    name: 'Umesh',
    role: 'Manager',
    image: '/images/team/umesh.jpg',
    bio: 'Overseeing brand operations, product quality compliance, nationwide delivery, and customer experience excellence.',
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Chief Ayurvedic Formulator',
    bio: '20+ years of classical Ayurvedic clinical research and traditional herbal pharmacopoeia adaptation.',
  },
  {
    name: 'Dr. Anjali Mehta',
    role: 'Head of Botanical R&D',
    bio: 'PhD botanist leading purity testing, potency standardization, and laboratory safety certifications.',
  },
  {
    name: 'Vikram Singh',
    role: 'Supply Chain Director',
    bio: 'Ensuring sustainable ethical sourcing, farmer partnerships, and highest quality natural herbs.',
  },
]

const milestones = [
  { year: '2020', title: 'Founded', desc: 'Started with a vision to bring authentic Ayurveda to modern homes' },
  { year: '2021', title: 'First Product Launch', desc: 'BODY Essential Nutrition - our flagship daily wellness supplement' },
  { year: '2022', title: 'GMP Certification', desc: 'Achieved Good Manufacturing Practice certification for our facility' },
  { year: '2023', title: 'Expanded Range', desc: 'Launched STAYMAX+ Delay Spray for men\'s wellness' },
  { year: '2024', title: '10,000+ Customers', desc: 'Served wellness seekers across India with 98% satisfaction' },
]

export default function AboutPage() {
  const structuredData = [generateWebsiteStructuredData(), generateOrganizationStructuredData()]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container py-4 sm:py-6 lg:py-8">
        <section className="mb-8 sm:mb-10">
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
            <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[10.5px] uppercase tracking-wider font-semibold mb-2 inline-block">
              Our Story
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-3">
              Ancient Wisdom for Modern Wellness
            </h1>
            <p className="text-[#C4BDA8] text-xs sm:text-sm leading-relaxed mb-3">
              Ayur Veda Global was born from a simple belief: the ancient science of Ayurveda holds
              the key to holistic wellness in today&apos;s fast-paced world. We saw a gap between
              traditional herbal wisdom and modern lifestyle needs, and set out to bridge it.
            </p>
            <p className="text-[#C4BDA8] text-xs sm:text-sm leading-relaxed mb-3">
              Our journey began in 2020 with a dedicated team of Ayurvedic practitioners, botanists,
              and wellness enthusiasts. We traveled across India - from the Himalayan foothills to
              the Western Ghats - to source the purest herbs directly from farmers who share our
              commitment to sustainable, ethical cultivation.
            </p>
            <p className="text-[#C4BDA8] text-xs sm:text-sm leading-relaxed">
              Today, we&apos;re proud to offer formulations that honor centuries of Ayurvedic knowledge
              while meeting contemporary standards of quality, safety, and efficacy. Every product
              we create is a testament to our belief that true wellness comes from harmony with nature.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#061B12] border border-[#D4AF37]/30 relative shadow-xl group max-w-md mx-auto w-full">
              <Image
                src="/images/products/vitality-power-combo-card.jpg"
                alt="Ayur Veda Global Botanical Formulations & Heritage"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061B12]/85 via-[#061B12]/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-[#061B12]/90 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-[10.5px] backdrop-blur-md">
                  Vedic Botanical Science
                </span>
                <span className="text-[#FAF7EE]/80 text-[10px] font-mono">EST. 2020</span>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-medium text-white mb-3">Our Mission</h2>
              <p className="text-[#C4BDA8] text-xs sm:text-sm leading-relaxed mb-4">
                To make authentic Ayurvedic wellness accessible to everyone, everywhere -
                through pure herbs, transparent practices, and sustainable sourcing.
              </p>
              <div className="space-y-2.5">
                {['Pure, potent herbs from trusted sources', 'Formulations based on classical texts', 'Third-party tested for quality & safety', 'Sustainable & ethical practices'].map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                      <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </div>
                    <span className="text-[#FAF7EE] text-xs sm:text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
            <h2 className="font-heading text-xl sm:text-2xl font-medium text-white mb-1.5">Our Core Values</h2>
            <p className="text-[#C4BDA8] text-xs sm:text-sm">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value) => (
              <div key={value.title} className="p-4 sm:p-5 rounded-2xl glass-luxury-card border border-[#D4AF37]/20 shadow-md hover:border-[#D4AF37]/50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-3 text-[#D4AF37]">
                  <value.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="font-heading text-base font-medium text-white mb-1">{value.title}</h3>
                <p className="text-[#C4BDA8] text-xs leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 sm:mb-10">
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
            <h2 className="font-heading text-xl sm:text-2xl font-medium text-white mb-1.5">Meet Our Team</h2>
            <p className="text-[#C4BDA8] text-xs sm:text-sm">Experts dedicated to your wellness journey</p>
          </div>
          {/* Executive Leadership */}
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-4">
            {team.slice(0, 2).map((member) => (
              <div key={member.name} className="text-center p-4 sm:p-5 rounded-2xl glass-luxury-card border border-[#D4AF37]/30 shadow-md hover:border-[#D4AF37]/60 transition-all duration-300 group">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-[#061B12] flex items-center justify-center relative border-2 border-[#D4AF37]/50 shadow-md group-hover:scale-105 transition-transform duration-300">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <Users className="w-9 h-9 text-[#D4AF37]" />
                  )}
                </div>
                <h3 className="font-heading text-base font-medium text-white mb-0.5">{member.name}</h3>
                <p className="text-[#D4AF37] text-xs font-semibold mb-1">{member.role}</p>
                <p className="text-[#C4BDA8] text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

          {/* Clinical & Botanical Specialists */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {team.slice(2).map((member) => (
              <div key={member.name} className="text-center p-3.5 sm:p-4 rounded-xl glass-luxury-card border border-[#D4AF37]/20 shadow-sm hover:border-[#D4AF37]/50 transition-all duration-300 group">
                <div className="w-14 h-14 mx-auto mb-2.5 rounded-full overflow-hidden bg-[#061B12] flex items-center justify-center relative border border-[#D4AF37]/30 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Users className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-heading text-sm font-medium text-white mb-0.5">{member.name}</h3>
                <p className="text-[#D4AF37] text-[11px] font-semibold mb-1">{member.role}</p>
                <p className="text-[#C4BDA8] text-[11px] leading-relaxed line-clamp-3">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 sm:mb-8">
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
            <h2 className="font-heading text-xl sm:text-2xl font-medium text-white mb-1.5">Our Journey</h2>
            <p className="text-[#C4BDA8] text-xs sm:text-sm">Milestones that define our path</p>
          </div>
          <div className="relative max-w-xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#D4AF37]/25" />
            {milestones.map((milestone) => (
              <div key={milestone.year} className="relative pb-6 flex items-start gap-4">
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#0D2B1E] border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="font-heading font-bold text-[#F4E295] text-xs">{milestone.year}</span>
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-heading text-sm sm:text-base font-medium text-white">{milestone.title}</h3>
                  <p className="text-[#C4BDA8] text-xs mt-0.5 leading-relaxed">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-luxury rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden border border-[#D4AF37]/30 shadow-xl">
          <div className="relative max-w-xl mx-auto">
            <h2 className="font-heading text-xl sm:text-2xl font-medium text-white mb-2">Ready to Begin Your Wellness Journey?</h2>
            <p className="text-[#C4BDA8] text-xs sm:text-sm mb-5">Join thousands who have discovered the transformative power of authentic Ayurvedic wellness.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/shop">
                <button className="btn-gold px-6 py-2.5 rounded-xl font-bold text-xs shadow-md">Shop Collection</button>
              </Link>
              <Link href="/contact">
                <button className="btn-outline-gold px-6 py-2.5 rounded-xl font-semibold text-xs">Contact Us</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}