import { Suspense } from 'react'
import ProductPageClient from './ProductPageClient'
import { getAllProducts } from '@/lib/products/registry'

export function generateStaticParams() {
  const products = getAllProducts()
  return products.map(product => ({
    slug: product.slug,
  }))
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="container py-16 text-center text-[#D4AF37]">Loading product...</div>}>
      <ProductPageClient />
    </Suspense>
  )
}