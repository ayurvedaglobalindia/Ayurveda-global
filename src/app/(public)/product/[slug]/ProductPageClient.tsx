'use client'

import { Suspense } from 'react'
import { useParams, notFound } from 'next/navigation'
import { ProductDetails } from '@/components/product/ProductDetails'
import { ProductCard } from '@/components/product/ProductCard'
import { getProductBySlug, getRelatedProducts } from '@/lib/products/registry'
import { generateProductSEO } from '@/lib/seo'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { AgeVerificationGate } from '@/components/layout/AgeVerificationGate'

export default function ProductPageClient() {
  const params = useParams()
  const slug = (params?.slug as string) || ''
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.id, 4)
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: product.name, href: `/product/${product.slug}` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSEO(product).structuredData) }}
      />

      <div className="container py-4 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-5 pb-2.5 border-b border-[#D4AF37]/20">
          <Breadcrumb items={breadcrumbItems} className="mb-0 text-xs sm:text-sm text-[#A7B3A9]" />
        </div>

        {product.ageRestricted && (
          <AgeVerificationGate
            productId={product.id}
            productName={product.name}
            isOpen={true}
          />
        )}

        <div className="mb-6 sm:mb-8">
          <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-[#D4AF37]">Loading details...</div>}>
            <ProductDetails product={product} />
          </Suspense>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#D4AF37]/20">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Synergistic Pairings</span>
                <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-medium text-white mt-0.5">Complete Your Ayurvedic Regimen</h2>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
