import { Metadata } from 'next'
import Link from 'next/link'
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

export default function CategoriesPage() {
  const categories = getCategories()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteStructuredData()) }}
      />

      <div className="container py-8 lg:py-12">
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-xs text-[#C4BDA8] mb-3" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ayur-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-ayur-ivory font-medium">Categories</span>
          </nav>
          <h1 className="font-heading text-3xl md:text-4xl font-normal text-ayur-ivory">Shop by Category</h1>
          <p className="text-[#C4BDA8] text-sm mt-1.5">Explore our curated collections of authentic Ayurvedic formulations</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => {
            const products = getProductsByCategory(category.slug)
            const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Leaf

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#061A10] border border-[#C2A265]/20 hover:border-[#C2A265]/50 transition-all shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A2E1E]/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Icon className="w-16 h-16 text-[#C2A265]/40" />
                </div>
                <div className="relative p-6 h-full flex flex-col justify-end">
                  <h2 className="font-heading text-2xl font-medium text-ayur-ivory group-hover:text-ayur-gold transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-[#C4BDA8] mt-2 line-clamp-2">{category.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-ayur-gold font-medium group-hover:gap-4 transition-all">
                    <span>{products.length} product{products.length !== 1 ? 's' : ''}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <section className="mt-24">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-ayur-ivory text-center mb-12">
            Our Commitment
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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