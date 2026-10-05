import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Leaf, Sparkles, Shield, ArrowRight } from 'lucide-react'
import { getCategories, getProductsByCategory } from '@/lib/products/registry'
import { generateWebsiteStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Categories | Ayur Veda Global',
  description: 'Browse our classical Ayurvedic collections: Herbal Supplements, Topical Personal Care, and Synergistic Regimen Kits.',
}

const categoryIcons = {
  supplements: Leaf,
  'personal-care': Sparkles,
  wellness: Shield,
}

const categoryImages: Record<string, string> = {
  supplements: '/images/products/body-essential-nutrition-card.jpg',
  'personal-care': '/images/products/staymax-delay-spray-card.jpg',
  wellness: '/images/products/vitality-power-combo-card.jpg',
}

export default function CategoriesPage() {
  const categories = getCategories()

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteStructuredData()) }}
      />

      <div className="container py-6 sm:py-8 lg:py-10">
        <div className="mb-6 sm:mb-8 pb-4 border-b border-[#999999]/30">
          <nav className="flex items-center gap-2 text-xs text-[#737373] mb-2 font-mono" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#1C1D1F] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#1C1D1F]">Collections</span>
          </nav>
          <h1 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">Curated Collections</h1>
          <p className="text-[#555555] text-xs sm:text-sm mt-1 font-sans">
            Explore targeted formulations organized by therapeutic application and dosage routine.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => {
            const products = getProductsByCategory(category.slug)
            const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Leaf

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group block rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#999999]/30 hover:border-[#1C1D1F] transition-all p-5 shadow-xs hover:shadow-md"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F1EB] mb-4">
                  {categoryImages[category.slug] && (
                    <Image
                      src={categoryImages[category.slug]}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#999999]/30 flex items-center justify-center text-[#4E5F52]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#737373] mb-1">
                    <span className="uppercase tracking-wider text-[#9E8047]">Apothecary Collection</span>
                    <span>{products.length} {products.length === 1 ? 'Formulation' : 'Formulations'}</span>
                  </div>

                  <h2 className="font-heading text-lg font-medium text-[#1C1D1F] group-hover:text-[#9E8047] transition-colors">
                    {category.name}
                  </h2>

                  <p className="text-xs text-[#555555] mt-1.5 line-clamp-2 leading-relaxed font-sans">
                    {category.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#999999]/30 flex items-center justify-between text-xs font-medium text-[#1C1D1F]">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <section className="mt-14 sm:mt-16 pt-8 border-t border-[#999999]/30">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1">
              Quality Assurance
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-normal text-[#1C1D1F]">
              Our Classical Commitment
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 text-center shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#999999]/30 flex items-center justify-center mx-auto text-[#4E5F52] mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-sm font-medium text-[#1C1D1F]">Pure Botanicals</h3>
              <p className="text-xs text-[#555555] mt-1.5 leading-relaxed font-sans">
                Standardized herbal extracts without animal gelatin, talc, or synthetic additives.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 text-center shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#999999]/30 flex items-center justify-center mx-auto text-[#4E5F52] mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-sm font-medium text-[#1C1D1F]">NABL Tested</h3>
              <p className="text-xs text-[#555555] mt-1.5 leading-relaxed font-sans">
                Every batch is analytically assayed for heavy metals and microbiological safety.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 text-center shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#999999]/30 flex items-center justify-center mx-auto text-[#4E5F52] mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-sm font-medium text-[#1C1D1F]">Discreet Parcels</h3>
              <p className="text-xs text-[#555555] mt-1.5 leading-relaxed font-sans">
                Plain cardboard packaging with zero product descriptors on the outer carton.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}