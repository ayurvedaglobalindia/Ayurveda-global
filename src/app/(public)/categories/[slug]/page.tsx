import { Suspense } from 'react'
import CategoryPageClient from './CategoryPageClient'
import { getCategories } from '@/lib/products/registry'

export function generateStaticParams() {
  const categories = getCategories()
  return categories.map(cat => ({
    slug: cat.slug,
  }))
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="container py-16 text-center">Loading category...</div>}>
      <CategoryPageClient />
    </Suspense>
  )
}