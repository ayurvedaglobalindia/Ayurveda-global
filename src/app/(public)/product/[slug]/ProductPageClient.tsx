'use client'

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

      <div className="container py-6 sm:py-8 lg:py-10">
        <div className="mb-6 sm:mb-8 pb-3.5 border-b border-[#D4AF37]/20">
          <Breadcrumb items={breadcrumbItems} className="mb-0 text-xs sm:text-sm text-[#A7B3A9]" />
        </div>

        {product.ageRestricted && (
          <AgeVerificationGate
            productId={product.id}
            productName={product.name}
            isOpen={true}
          />
        )}

        <div className="mb-12">
          <ProductDetails product={product} />
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#D4AF37]/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Synergistic Pairings</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-medium text-white mt-1">Complete Your Ayurvedic Regimen</h2>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
