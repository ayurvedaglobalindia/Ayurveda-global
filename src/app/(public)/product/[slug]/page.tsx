'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetails } from '@/components/product/ProductDetails'
import { ProductCard } from '@/components/product/ProductCard'
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/lib/products/registry'
import { generateProductSEO } from '@/lib/seo'
import { Logo } from '@/components/ui/Logo'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { AgeVerificationGate } from '@/components/layout/AgeVerificationGate'
import { useUIStore } from '@/store/uiStore'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  const seo = generateProductSEO(product)
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'product',
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
    other: {
      'product:price:amount': (product.price / 100).toFixed(2),
      'product:price:currency': 'INR',
      'product:availability': product.inventory.quantity > 0 ? 'in stock' : 'out of stock',
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = useParams()
  const product = getProductBySlug(slug as string)
  const { openModal } = useUIStore()
  const [showAgeGate, setShowAgeGate] = useState(false)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.id, 4)
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: product.name, href: `/product/${product.slug}` },
  ]

  const handleAgeVerified = () => {
    setShowAgeGate(false)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSEO(product).structuredData) }}
      />

      <div className="container py-8 lg:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Logo variant="header" animate className="flex-shrink-0" />
          <div>
            <Breadcrumb items={breadcrumbItems} className="mb-0" />
          </div>
        </div>

        {product.ageRestricted && !showAgeGate && (
          <AgeVerificationGate
            productId={product.id}
            productName={product.name}
            isOpen={true}
            onClose={() => { }}
            onVerify={handleAgeVerified}
          />
        )}

        <div className="mb-8">
          <ProductDetails product={product} />
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-medium text-ayur-black mb-8">You May Also Like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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