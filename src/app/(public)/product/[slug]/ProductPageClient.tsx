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
    <div className="bg-[#FAF7F2] text-[#1C1D1F] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSEO(product).structuredData) }}
      />

      <div className="container py-4 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6 pb-3 border-b border-[#E2DDD5]">
          <Breadcrumb items={breadcrumbItems} className="mb-0 text-xs sm:text-sm text-[#737373]" />
        </div>

        {product.ageRestricted && (
          <AgeVerificationGate
            productId={product.id}
            productName={product.name}
            isOpen={true}
          />
        )}

        <div className="mb-8 sm:mb-12">
          <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-[#737373]">Loading formulation details...</div>}>
            <ProductDetails product={product} />
          </Suspense>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-[#E2DDD5]">
            <div className="mb-6">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block">
                Complementary Formulations
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-normal text-[#1C1D1F] mt-1">
                Complete Your Ayurvedic Regimen
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
