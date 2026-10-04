import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Leaf, Sparkles, Shield } from 'lucide-react'
import { getCategories, getProductsByCategory } from '@/lib/products/registry'
import { generateWebsiteStructuredData } from '@/lib/seo'
import { Logo } from '@/components/ui/Logo'
import type { Category } from '@/types'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse our Ayurvedic wellness products by category. Supplements, Personal Care, and Wellness collections.',
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteStructuredData()) }}
      />

      <div className="container py-4 sm:py-6 lg:py-8">
        <div className="mb-5">
          <nav className="flex items-center gap-2 text-xs text-[#C4BDA8] mb-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ayur-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ayur-ivory font-medium">Categories</span>
          </nav>
          <h1 className="font-heading text-xl sm:text-2xl font-normal text-ayur-ivory">Shop by Category</h1>
          <p className="text-[#C4BDA8] text-xs sm:text-sm mt-1">Explore our curated collections of authentic Ayurvedic formulations</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => {
            const products = getProductsByCategory(category.slug)
            const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Leaf

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#061A10] border border-[#C2A265]/25 hover:border-[#C2A265]/60 transition-all shadow-xl"
              >
                {categoryImages[category.slug] && (
                  <Image
                    src={categoryImages[category.slug]}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A10] via-[#061A10]/75 to-[#061A10]/30 transition-opacity group-hover:opacity-90" />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0E1E14]/80 border border-[#C2A265]/30 flex items-center justify-center backdrop-blur-sm group-hover:border-[#C2A265] transition-colors z-10">
                  <Icon className="w-4.5 h-4.5 text-[#C2A265]" />
                </div>
                <div className="relative p-5 h-full flex flex-col justify-end z-10">
                  <h2 className="font-heading text-lg sm:text-xl font-medium text-ayur-ivory group-hover:text-ayur-gold transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-[#C4BDA8] mt-1 text-xs line-clamp-2 leading-relaxed">{category.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-ayur-gold text-xs font-semibold group-hover:gap-3 transition-all">
                    <span>{products.length} formulation{products.length !== 1 ? 's' : ''}</span>
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <section className="mt-10 sm:mt-12">
          <h2 className="font-heading text-lg sm:text-xl font-medium text-ayur-ivory text-center mb-6">
            Our Classical Commitment
          </h2>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Leaf,
                title: 'Pure Ingredients',
                desc: 'Only authentic, sustainably sourced Ayurvedic herbs in every formulation',
              },
              {
                icon: Sparkles,
                title: 'Traditional Wisdom',
                desc: 'Formulations based on centuries-old Ayurvedic texts and practices',
              },
              {
                icon: Shield,
                title: 'Quality Guaranteed',
                desc: 'Rigorous testing for purity, potency, and safety in every batch',
              },
            ].map((item, index) => (
              <div key={item.title} className="text-center p-6 rounded-2xl bg-[#061A10] border border-[#C2A265]/20 shadow-md">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#0A2E1E]/50 border border-[#C2A265]/20 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-ayur-gold" />
                </div>
                <h3 className="font-heading text-xl font-medium text-ayur-ivory mb-2">{item.title}</h3>
                <p className="text-[#C4BDA8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}