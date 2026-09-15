import type { Product, Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'supplements',
    name: 'Supplements',
    slug: 'supplements',
    description: 'Daily wellness support with authentic Ayurvedic herbs',
    image: '/images/categories/supplements.jpg',
    productCount: 1,
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Natural personal care solutions rooted in Ayurvedic wisdom',
    image: '/images/categories/personal-care.jpg',
    productCount: 1,
  },
  {
    id: 'wellness',
    name: 'Wellness',
    slug: 'wellness',
    description: 'Holistic wellness formulations for modern living',
    image: '/images/categories/wellness.jpg',
    productCount: 0,
  },
]

export const products: Product[] = [
  {
    id: 'body-essential-nutrition',
    slug: 'body-essential-nutrition',
    name: 'BODY Essential Nutrition',
    tagline: 'Daily wellness support with Ayurvedic herbs',
    description: 'BODY Essential Nutrition is a thoughtfully crafted blend of six potent Ayurvedic herbs traditionally used to support overall vitality and well-being. Each capsule delivers a harmonious combination of time-tested botanicals that work synergistically to help maintain your body\'s natural balance.\n\nOur formulation draws from centuries of Ayurvedic knowledge, bringing together herbs that have been valued for their supportive properties. This supplement is designed for those seeking to incorporate traditional wisdom into their daily wellness routine.\n\nEach batch is prepared with attention to quality, ensuring you receive authentic herbal support in every capsule.',
    shortDescription: 'A blend of 6 potent Ayurvedic herbs for daily wellness support',
    category: 'supplements',
    images: [
      { src: '/images/products/body-nutrition/01-primary.jpg', alt: 'BODY Essential Nutrition 60 Capsules - Front view', isPrimary: true },
      { src: '/images/products/body-nutrition/02-angle.jpg', alt: 'BODY Essential Nutrition - Angled view', isPrimary: false },
      { src: '/images/products/body-nutrition/03-packaging.jpg', alt: 'BODY Essential Nutrition - Packaging detail', isPrimary: false },
      { src: '/images/products/body-nutrition/04-ingredients.jpg', alt: 'BODY Essential Nutrition - Ingredients panel', isPrimary: false },
      { src: '/images/products/body-nutrition/05-lifestyle.jpg', alt: 'BODY Essential Nutrition - Lifestyle shot', isPrimary: false },
    ],
    price: 149900,
    compareAtPrice: 179900,
    variants: [
      {
        id: 'body-essential-nutrition-60',
        name: '60 Capsules',
        price: 149900,
        compareAtPrice: 179900,
        inventory: 100,
        sku: 'BODY-EN-60',
      },
    ],
    inventory: {
      quantity: 100,
      trackQuantity: true,
    },
    tags: ['daily-wellness', 'immunity', 'energy', 'ayurvedic', 'herbal-supplement'],
    ingredients: [
      'Ashwagandha (Withania somnifera) - Root extract',
      'Shatavari (Asparagus racemosus) - Root extract',
      'Amla (Emblica officinalis) - Fruit extract',
      'Guduchi (Tinospora cordifolia) - Stem extract',
      'Triphala - Blend of three fruits (Amla, Haritaki, Bibhitaki)',
      'Brahmi (Bacopa monnieri) - Whole plant extract',
    ],
    usage: 'Take 2 capsules daily with warm water after meals, or as directed by your healthcare practitioner.',
    warnings: [
      'Consult a healthcare professional before use if pregnant, nursing, or on medication.',
      'Keep out of reach of children.',
      'Store in a cool, dry place away from direct sunlight.',
      'Do not exceed recommended dosage.',
      'This product is not intended to diagnose, treat, cure, or prevent any disease.',
    ],
    ageRestricted: false,
    seo: {
      title: 'BODY Essential Nutrition 60 Capsules | Ayur Veda Global',
      description: 'Daily Ayurvedic wellness supplement with 6 potent herbs including Ashwagandha, Shatavari, and Amla. Supports immunity, energy, and overall vitality.',
      keywords: ['ayurvedic supplement', 'daily wellness', 'immunity booster', 'natural herbs', 'ashwagandha', 'shatavari'],
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'staymax-delay-spray',
    slug: 'staymax-delay-spray',
    name: 'STAYMAX+ Delay Spray',
    tagline: 'Natural endurance support for men',
    description: 'STAYMAX+ Delay Spray is a thoughtfully formulated topical spray designed for men seeking natural endurance support. Combining a mild topical anesthetic with a blend of traditional Ayurvedic herbs, this formula is crafted to help extend intimate moments while maintaining natural sensation.\n\nThe unique formulation includes Lidocaine USP for gentle desensitization, complemented by a proprietary blend of Ayurvedic herbs including Ashwagandha, Shilajit, and Safed Musli - herbs traditionally valued in men\'s wellness practices. Aloe Vera and Vitamin E provide soothing and nourishing benefits.\n\nEach 30ml bottle provides approximately 100+ sprays. Discreet packaging ensures privacy.',
    shortDescription: 'Topical endurance spray with Ayurvedic herbs for men. 18+ only.',
    category: 'personal-care',
    images: [
      { src: '/images/products/staymax/01-primary.jpg', alt: 'STAYMAX+ Delay Spray 30ml - Front view', isPrimary: true },
      { src: '/images/products/staymax/02-angle.jpg', alt: 'STAYMAX+ Delay Spray - Angled view', isPrimary: false },
      { src: '/images/products/staymax/03-packaging.jpg', alt: 'STAYMAX+ Delay Spray - Packaging detail', isPrimary: false },
      { src: '/images/products/staymax/04-usage.jpg', alt: 'STAYMAX+ Delay Spray - Usage demonstration', isPrimary: false },
      { src: '/images/products/staymax/05-lifestyle.jpg', alt: 'STAYMAX+ Delay Spray - Lifestyle shot', isPrimary: false },
    ],
    price: 89900,
    compareAtPrice: 109900,
    variants: [
      {
        id: 'staymax-delay-spray-30ml',
        name: '30 ml',
        price: 89900,
        compareAtPrice: 109900,
        inventory: 50,
        sku: 'STAYMAX-DS-30',
      },
    ],
    inventory: {
      quantity: 50,
      trackQuantity: true,
    },
    tags: ['mens-wellness', 'endurance', 'personal-care', 'ayurvedic', 'topical-spray'],
    ingredients: [
      'Lidocaine USP 10% w/w',
      'Ashwagandha (Withania somnifera) - Root extract',
      'Shilajit (Asphaltum) - Purified extract',
      'Safed Musli (Chlorophytum borivilianum) - Root extract',
      'Aloe Vera (Aloe barbadensis) - Leaf gel',
      'Vitamin E (Tocopheryl acetate)',
      'Purified water base',
      'Preservatives (as per regulatory standards)',
    ],
    usage: 'Apply 2-3 sprays to the desired area 10-15 minutes before intimacy. Allow to absorb completely. Wash off after use if desired. Do not exceed recommended usage.',
    warnings: [
      'For external use only. Do not ingest.',
      'Do not use if allergic to lidocaine or any listed ingredients.',
      'Discontinue use immediately if irritation, redness, or discomfort occurs.',
      'Not for use by individuals under 18 years of age.',
      'Consult a healthcare professional before use if you have any medical conditions.',
      'Avoid contact with eyes. If contact occurs, rinse thoroughly with water.',
      'Keep out of reach of children.',
      'Store in a cool, dry place.',
      'This product is not intended to diagnose, treat, cure, or prevent any disease.',
    ],
    ageRestricted: true,
    seo: {
      title: 'STAYMAX+ Delay Spray 30ml | Ayur Veda Global',
      description: 'Natural endurance spray for men with Ayurvedic herbs including Ashwagandha and Shilajit. 18+ only. Discreet packaging and delivery.',
      keywords: ['delay spray', 'mens wellness', 'endurance', 'ayurvedic personal care', 'staymax'],
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

export function getAllProducts(): Product[] {
  return products
}

export function getCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.tagline.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    p.ingredients.some(ing => ing.toLowerCase().includes(lowercaseQuery))
  )
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.slice(0, limit)
}

export function getRelatedProducts(currentProductId: string, limit = 4): Product[] {
  return products
    .filter(p => p.id !== currentProductId)
    .slice(0, limit)
}