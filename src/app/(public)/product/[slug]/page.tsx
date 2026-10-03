import ProductPageClient from './ProductPageClient'
import { getAllProducts } from '@/lib/products/registry'

export function generateStaticParams() {
  const products = getAllProducts()
  return products.map(product => ({
    slug: product.slug,
  }))
}

export default function ProductPage() {
  return <ProductPageClient />
}