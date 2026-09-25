import type { Product, Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'supplements',
    name: 'Herbal Supplements',
    slug: 'supplements',
    description: 'Daily stamina, physical strength & holistic Ayurvedic revitalization',
    image: '/images/categories/supplements.svg',
    productCount: 1,
  },
  {
    id: 'personal-care',
    name: 'Men\'s Personal Care',
    slug: 'personal-care',
    description: 'Topical endurance, long-lasting performance & intimate wellness',
    image: '/images/categories/personal-care.svg',
    productCount: 1,
  },
  {
    id: 'wellness',
    name: 'Power Combos',
    slug: 'wellness',
    description: 'Inside-out synergistic vitality kits for maximum efficacy and savings',
    image: '/images/categories/wellness.svg',
    productCount: 1,
  },
]

export const products: Product[] = [
  {
    id: 'body-essential-nutrition',
    slug: 'body-essential-nutrition',
    name: 'BODY Essential Nutrition (60 Capsules)',
    tagline: 'Herbal & Safe | Energy, Strength & Stamina',
    description: `Ayur Veda Global's BODY Essential Nutrition is an authentic, lab-certified Ayurvedic formulation engineered for peak energy, muscle vitality, and endurance. Built on classical Rasayana principles, this daily supplement works from within to strengthen bodily tissues (Dhatus), support nervous system vitality, and maintain healthy metabolism.

Whether you are facing daily fatigue, intense workouts, or demanding professional schedules, our synergistic herbal blend helps replenish depleted vigor, enhance stamina, and restore vitality naturally without artificial stimulants, steroids, or harmful additives.

Each vegetarian capsule delivers high-grade standardized extracts of Ashwagandha, Shilajit, Safed Musli, Gokshura, Kaunch Beej, and Amla for proven physiological revitalization.`,
    shortDescription: 'Premium Ayurvedic revitalization formula with 60 vegetarian capsules to boost physical stamina, inner strength, and sustained vitality.',
    category: 'supplements',
    images: [
      { src: '/images/products/body-essential-nutrition.png', alt: 'BODY Essential Nutrition 60 Capsules - Front Studio Shot', isPrimary: true },
      { src: '/images/products/vitality-power-combo.jpg', alt: 'BODY Essential Nutrition with StayMax+ Combo Set', isPrimary: false },
    ],
    price: 149900,
    compareAtPrice: 199900,
    variants: [
      {
        id: 'body-essential-nutrition-60',
        name: '60 Capsules (1 Month Pack)',
        price: 149900,
        compareAtPrice: 199900,
        inventory: 150,
        sku: 'AVG-BEN-60',
      },
      {
        id: 'body-essential-nutrition-120',
        name: '120 Capsules (2 Months Value Pack)',
        price: 269900,
        compareAtPrice: 399800,
        inventory: 75,
        sku: 'AVG-BEN-120',
      },
    ],
    inventory: {
      quantity: 150,
      trackQuantity: true,
    },
    tags: ['daily-wellness', 'immunity', 'energy', 'stamina', 'strength', 'ayurvedic', 'ashwagandha', 'shilajit'],
    ingredients: [
      'Ashwagandha (Withania somnifera) - 200mg (Root extract, 5% withanolides)',
      'Purified Shilajit (Asphaltum punjabianum) - 100mg (Rich in Fulvic Acid & 84+ minerals)',
      'Safed Musli (Chlorophytum borivilianum) - 100mg (High grade tuber extract)',
      'Gokshura (Tribulus terrestris) - 80mg (Fruit extract for endurance & vigor)',
      'Kaunch Beej (Mucuna pruriens) - 60mg (Standardized L-Dopa extract)',
      'Amla (Emblica officinalis) - 60mg (Potent natural Vitamin C antioxidant)',
      'Vegetarian Cellulose Capsule Shell (100% plant-derived)',
    ],
    usage: 'Take 1 to 2 capsules twice daily with warm water or lukewarm milk after breakfast and dinner, or as recommended by your Ayurvedic wellness physician. For best results, use regularly for 60 to 90 days.',
    warnings: [
      'Store in a cool, dry place away from direct sunlight and moisture.',
      'Keep bottle tightly sealed after each use.',
      'Consult a healthcare professional before use if you have any chronic medical condition.',
      'Keep out of reach of children.',
      'This product is an Ayurvedic proprietary supplement, not intended to diagnose or treat acute illnesses.',
    ],
    ageRestricted: false,
    seo: {
      title: 'BODY Essential Nutrition 60 Capsules | Energy, Strength & Stamina | Ayur Veda Global',
      description: 'Buy BODY Essential Nutrition Ayurvedic capsules with Ashwagandha, Shilajit & Safed Musli. 100% herbal, lab tested, boosts energy, stamina and strength.',
      keywords: ['body essential nutrition', 'ayurvedic stamina capsules', 'energy and strength', 'ashwagandha shilajit supplement', 'ayur veda global'],
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2026-09-25T14:00:00Z',
  },
  {
    id: 'staymax-delay-spray',
    slug: 'staymax-delay-spray',
    name: 'STAYMAX+ Delay Spray (30 ml)',
    tagline: 'Fast Action & Long Lasting | Herbal & Safe Endurance',
    description: `STAYMAX+ Delay Spray by Ayur Veda Global provides immediate, reliable endurance support for men seeking peak confidence. Formulated with a calibrated topical desensitizer complemented by pure Ayurvedic botanicals like Ashwagandha, Shilajit, Safed Musli, and soothing Aloe Vera, STAYMAX+ helps you control pacing and extend intimate moments while preserving natural sensation and pleasure.

Unlike harsh chemical alternatives, STAYMAX+ absorbs cleanly into the skin within 10 to 15 minutes without stickiness, greasy residue, or transfer when used as directed. The pocket-sized 30ml ergonomic bottle delivers over 100+ precision metered sprays with 100% discrete packaging and delivery.`,
    shortDescription: 'Clinically tested fast-acting herbal delay spray formulated to prolong endurance, enhance control, and deliver confident intimate moments without numbness.',
    category: 'personal-care',
    images: [
      { src: '/images/products/staymax-delay-spray.png', alt: 'STAYMAX+ Delay Spray 30ml - Studio Product Photography', isPrimary: true },
      { src: '/images/products/vitality-power-combo.jpg', alt: 'STAYMAX+ Delay Spray in Vitality Power Combo', isPrimary: false },
    ],
    price: 89900,
    compareAtPrice: 129900,
    variants: [
      {
        id: 'staymax-delay-spray-30ml',
        name: 'Single Bottle (30 ml - 100+ Sprays)',
        price: 89900,
        compareAtPrice: 129900,
        inventory: 120,
        sku: 'AVG-SMX-30',
      },
      {
        id: 'staymax-delay-spray-60ml',
        name: 'Twin Pack (2 x 30 ml Bottles)',
        price: 159900,
        compareAtPrice: 259800,
        inventory: 60,
        sku: 'AVG-SMX-60',
      },
    ],
    inventory: {
      quantity: 120,
      trackQuantity: true,
    },
    tags: ['mens-wellness', 'endurance', 'delay-spray', 'staymax', 'personal-care', 'ayurvedic', 'long-lasting'],
    ingredients: [
      'Lidocaine USP 10% w/w (Calibrated topical desensitizer)',
      'Ashwagandha (Withania somnifera) Root Extract (Herbal skin conditioning & vitality)',
      'Purified Shilajit Extract (Micro-mineral tissue nourishment)',
      'Safed Musli (Chlorophytum borivilianum) Extract (Traditional Rasayana botanical)',
      'Pure Aloe Vera (Aloe barbadensis) Leaf Gel (Soothing, anti-irritation moisturizing base)',
      'Vitamin E (Tocopheryl Acetate) (Antioxidant skin barrier protection)',
      'Clove Oil (Syzygium aromaticum) (Mild aromatic natural soothing essence)',
      'Purified Demineralized Water Base (Non-sticky, quick-absorbing)',
    ],
    usage: 'Shake gently before use. Hold the spray nozzle 5 cm away and apply 2 to 3 metered sprays to the shaft and head 10-15 minutes prior to intimate activity. Gently massage in a circular motion until completely absorbed. Wipe with a moist cloth or wash off before oral activity.',
    warnings: [
      'For external topical application only. Do not swallow or inhale.',
      'Do not apply on broken, irritated, sensitive, or inflamed skin.',
      'Discontinue use immediately if irritation, excessive tingling, or discomfort develops.',
      'Strictly intended for adult men aged 18 and above.',
      'Avoid contact with eyes. In case of accidental contact, flush thoroughly with clean water.',
      'Store in a cool place away from sunlight and flame. Keep out of reach of children.',
    ],
    ageRestricted: true,
    seo: {
      title: 'STAYMAX+ Delay Spray 30ml | Fast Action & Long Lasting Endurance | Ayur Veda Global',
      description: 'Shop STAYMAX+ Delay Spray for men. Herbal & safe endurance spray enriched with Ashwagandha, Shilajit & Aloe Vera. Fast acting, 100+ sprays, 100% discreet delivery.',
      keywords: ['staymax delay spray', 'herbal delay spray', 'mens endurance spray', 'long lasting spray', 'ayur veda global staymax'],
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2026-09-25T14:00:00Z',
  },
  {
    id: 'vitality-power-combo',
    slug: 'vitality-power-combo',
    name: 'Vitality & Performance Power Combo',
    tagline: 'Complete Dual Action: Internal Stamina + External Endurance',
    description: `The Vitality & Performance Power Combo represents the pinnacle of holistic male wellness, attacking stamina challenges from both sides. While BODY Essential Nutrition (60 Capsules) builds internal energy, physical strength, and daily vigor from the root, STAYMAX+ Delay Spray (30 ml) provides instant topical endurance, control, and confidence in intimate moments.

This complete 30-day transformation kit is specially discounted, saving you nearly ₹800 over purchasing individual products. Everything is packaged together in a premium gift presentation box, including an Ayurvedic wellness lifestyle guide and free express discreet courier delivery.

Experience complete inside-out vitality: build sustained daily energy while mastering peak performance and control.`,
    shortDescription: 'The ultimate dual-action kit: 1x BODY Essential Nutrition (60 Capsules) + 1x STAYMAX+ Delay Spray (30 ml). Save 29% with free discreet delivery.',
    category: 'wellness',
    images: [
      { src: '/images/products/vitality-power-combo.jpg', alt: 'Vitality & Performance Power Combo Pack with Red Gift Ribbon', isPrimary: true },
      { src: '/images/products/body-essential-nutrition.png', alt: 'BODY Essential Nutrition 60 Capsules Included in Combo', isPrimary: false },
      { src: '/images/products/staymax-delay-spray.png', alt: 'STAYMAX+ Delay Spray 30ml Included in Combo', isPrimary: false },
    ],
    price: 199900,
    compareAtPrice: 279800,
    variants: [
      {
        id: 'vitality-power-combo-standard',
        name: 'Standard Combo (1x Nutrition + 1x Delay Spray)',
        price: 199900,
        compareAtPrice: 279800,
        inventory: 100,
        sku: 'AVG-VPC-STD',
      },
      {
        id: 'vitality-power-combo-deluxe',
        name: 'Deluxe 2-Month Combo (2x Nutrition + 2x Delay Spray)',
        price: 369900,
        compareAtPrice: 559600,
        inventory: 50,
        sku: 'AVG-VPC-DLX',
      },
    ],
    inventory: {
      quantity: 100,
      trackQuantity: true,
    },
    tags: ['combo', 'vitality-bundle', 'mens-wellness', 'stamina', 'endurance', 'bestseller', 'special-offer'],
    ingredients: [
      '1x BODY Essential Nutrition Bottle (60 Vegetarian Capsules with Ashwagandha, Shilajit, Safed Musli, Gokshura, Kaunch Beej, Amla)',
      '1x STAYMAX+ Delay Spray Bottle (30 ml with Lidocaine USP 10%, Ashwagandha, Shilajit, Aloe Vera, Vitamin E, Clove Oil)',
      'Ayurvedic Daily Wellness & Nutrition Regimen Guide (Digital & Printed)',
      '100% Confidential Brown-Box Tamper Evident Courier Packaging',
    ],
    usage: 'Daily Routine: Take 1 capsule of BODY Essential Nutrition in the morning and 1 at night after meals with warm water or milk. As Needed: Apply 2-3 sprays of STAYMAX+ 10-15 minutes prior to intimate moments and massage gently until absorbed.',
    warnings: [
      'Contains STAYMAX+ which is intended for adult men aged 18 and older.',
      'Follow individual product instructions for storage, usage, and safety.',
      'External spray for topical use only; capsules for oral dietary use only.',
      'Store in a cool, dry place away from heat and direct sunlight.',
    ],
    ageRestricted: true,
    seo: {
      title: 'Vitality & Performance Power Combo | BODY Nutrition + STAYMAX+ Spray | Ayur Veda Global',
      description: 'Get the ultimate inside-out Ayurvedic vitality combo. Includes 60 capsules of BODY Essential Nutrition and 30ml STAYMAX+ Delay Spray. Save 29% today with free discreet shipping.',
      keywords: ['vitality power combo', 'mens stamina bundle', 'body nutrition staymax combo', 'ayurvedic combo kit', 'ayur veda global'],
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2026-09-25T14:00:00Z',
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