import type { Product, Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'supplements',
    name: 'Herbal Supplements',
    slug: 'supplements',
    description: 'Daily stamina, physical strength & holistic Ayurvedic revitalization',
    image: '/images/categories/supplements.svg',
    productCount: 3,
  },
  {
    id: 'personal-care',
    name: 'Men\'s Personal Care',
    slug: 'personal-care',
    description: 'Topical endurance, long-lasting performance & intimate wellness',
    image: '/images/categories/personal-care.svg',
    productCount: 2,
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
      { src: '/images/products/body-essential-nutrition-card.jpg', alt: 'BODY Essential Nutrition 60 Capsules - Front Studio Shot', isPrimary: true },
      { src: '/images/products/body-essential-nutrition.png', alt: 'BODY Essential Nutrition 60 Capsules - Editorial Presentation', isPrimary: false },
      { src: '/images/products/body-essential-nutrition-detail.jpg', alt: 'BODY Essential Nutrition - Pure Botanical Extracts & Capsules', isPrimary: false },
      { src: '/images/products/body-essential-nutrition-thumb.jpg', alt: 'BODY Essential Nutrition - Square Thumbnail', isPrimary: false },
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
      { src: '/images/products/staymax-delay-spray-card.jpg', alt: 'STAYMAX+ Delay Spray 30ml - Studio Product Photography', isPrimary: true },
      { src: '/images/products/staymax-delay-spray.png', alt: 'STAYMAX+ Delay Spray 30ml - Editorial Presentation', isPrimary: false },
      { src: '/images/products/staymax-delay-spray-detail.jpg', alt: 'STAYMAX+ Delay Spray - Botanical Skin Conditioning Detail', isPrimary: false },
      { src: '/images/products/staymax-delay-spray-thumb.jpg', alt: 'STAYMAX+ Delay Spray - Square Thumbnail', isPrimary: false },
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
      { src: '/images/products/vitality-power-combo-card.jpg', alt: 'Vitality & Performance Power Combo - Studio Showcase', isPrimary: true },
      { src: '/images/products/vitality-power-combo.jpg', alt: 'Vitality & Performance Power Combo Pack with Red Gift Ribbon', isPrimary: false },
      { src: '/images/products/vitality-power-combo-detail.jpg', alt: 'Vitality Power Combo - Ayurvedic Rasayana Botanical Base Detail', isPrimary: false },
      { src: '/images/products/vitality-power-combo-thumb.jpg', alt: 'Vitality Power Combo - Square Thumbnail', isPrimary: false },
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
  {
    id: 'himalayan-shilajit-resin',
    slug: 'himalayan-shilajit-resin',
    name: 'Pure Himalayan Shilajit Resin (Gold Grade, 20g)',
    tagline: '16,000+ Ft Sourced | >75% Fulvic Acid & 84+ Minerals',
    description: `Ayur Veda Global's Pure Himalayan Shilajit Resin is an authentic, sun-dried, gold-grade Rasayana harvested above 16,000 feet in the pristine Himalayan ranges of Ladakh and Zanskar. Purified through 21 classical Shodhana cycles with Triphala decoctions, this live mineral resin delivers unmatched cellular revitalization.

Rich in over 84+ ionic trace minerals, bioactive humic acids, and >75% natural fulvic acid, it acts as an authentic Yogavahi catalyst, driving nutrients directly across cellular membranes to stimulate ATP production, eliminate deep chronic fatigue, optimize free testosterone, and enhance mental clarity.

Infused with pure Kashmiri Mongra Saffron (Kesar), this elixir is packaged in a UV-protective dark amber glass jar accompanied by an authentic pure brass measuring spoon.`,
    shortDescription: '100% pure Himalayan Shilajit resin with >75% Fulvic Acid and 84+ ionic minerals, enriched with Kashmiri Mongra Kesar in a luxury amber glass jar with brass spoon.',
    category: 'supplements',
    images: [
      { src: '/images/products/himalayan-shilajit-resin-card.jpg', alt: 'Pure Himalayan Shilajit Resin 20g - Studio Product Photography', isPrimary: true },
      { src: '/images/products/himalayan-shilajit-resin-detail.jpg', alt: 'Pure Himalayan Shilajit Resin - Brass Spoon & Texture Detail', isPrimary: false },
      { src: '/images/products/himalayan-shilajit-resin-thumb.jpg', alt: 'Pure Himalayan Shilajit Resin - Square Thumbnail', isPrimary: false },
    ],
    price: 129900,
    compareAtPrice: 179900,
    variants: [
      {
        id: 'himalayan-shilajit-resin-20g',
        name: '20g Glass Jar + Pure Brass Spoon',
        price: 129900,
        compareAtPrice: 179900,
        inventory: 85,
        sku: 'AVG-SHL-20G',
      },
      {
        id: 'himalayan-shilajit-resin-40g',
        name: '40g Value Twin Pack (2x20g - Save ₹1,100)',
        price: 229900,
        compareAtPrice: 359800,
        inventory: 40,
        sku: 'AVG-SHL-40G',
      },
    ],
    inventory: {
      quantity: 85,
      trackQuantity: true,
    },
    tags: ['shilajit', 'fulvic-acid', 'cellular-energy', 'stamina', 'supplements', 'ayurvedic', 'immunity', 'bestseller'],
    ingredients: [
      'Pure Himalayan Shuddha Shilajit Resin (Asphaltum punjabianum) - >75% Fulvic Acid, 84+ Ionic Trace Minerals',
      'Kashmiri Mongra Saffron (Crocus sativus) Threads Extract',
      'Triphala Shodhana Purified (Emblica officinalis, Terminalia bellirica, Terminalia chebula)',
    ],
    usage: 'Using the included pure brass spoon, dissolve a pea-sized portion (300mg - 500mg) in a glass of warm milk, green tea, or lukewarm water. Stir until completely dissolved and consume every morning on an empty stomach.',
    warnings: [
      'Store in a cool, dry place. Keep jar tightly sealed.',
      'Do not heat directly over fire or microwave the jar.',
      'Not recommended for children or individuals with active kidney stones without medical guidance.',
    ],
    ageRestricted: false,
    seo: {
      title: 'Pure Himalayan Shilajit Resin (Gold Grade) 20g | Ayur Veda Global',
      description: 'Buy 100% pure Himalayan Shilajit Resin with >75% Fulvic Acid & 84+ trace minerals. Lab certified purity with brass spoon.',
      keywords: ['himalayan shilajit resin', 'pure shilajit', 'gold grade shilajit', 'fulvic acid shilajit', 'ayur veda global shilajit'],
    },
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2026-09-25T14:00:00Z',
  },
  {
    id: 'ksm66-ashwagandha-root-extract',
    slug: 'ksm66-ashwagandha-root-extract',
    name: 'KSM-66 Organic Ashwagandha (60 Capsules)',
    tagline: '5% Withanolides | Cortisol Relief & Deep Recovery',
    description: `Ayur Veda Global's KSM-66 Ashwagandha is the highest-concentration, full-spectrum root extract available on the global market today. Extracted exclusively from organic roots using classical aqueous 'Green Chemistry' without toxic alcohol or solvents, each vegetarian capsule provides 600mg of clinically backed bioactives.

Recognized as the King of Ayurvedic Adaptogens (Balya & Medhya Rasayana), it is clinically shown to lower elevated serum cortisol levels by up to 27.9%, support healthy free testosterone and muscle development, soothe anxious nervous states, and enhance restorative REM sleep architecture.

Enriched with 5mg of BioPerine organic black pepper extract for enhanced cellular bioavailability and nutrient transport.`,
    shortDescription: 'Gold-standard KSM-66 Ashwagandha root extract (600mg per capsule) standardized to 5% withanolides for cortisol control, athletic recovery, and daily male vigor.',
    category: 'supplements',
    images: [
      { src: '/images/products/ashwagandha-root-extract-card.jpg', alt: 'KSM-66 Ashwagandha Root Extract 60 Capsules - Front View', isPrimary: true },
      { src: '/images/products/ashwagandha-root-extract-detail.jpg', alt: 'KSM-66 Ashwagandha - Organic Roots and Capsules Detail', isPrimary: false },
      { src: '/images/products/ashwagandha-root-extract-thumb.jpg', alt: 'KSM-66 Ashwagandha - Square Thumbnail', isPrimary: false },
    ],
    price: 99900,
    compareAtPrice: 149900,
    variants: [
      {
        id: 'ksm66-ashwagandha-60',
        name: '60 Vegetarian Capsules (1 Month Course)',
        price: 99900,
        compareAtPrice: 149900,
        inventory: 110,
        sku: 'AVG-ASH-60',
      },
      {
        id: 'ksm66-ashwagandha-120',
        name: '120 Capsules (2 Months Value Pack)',
        price: 179900,
        compareAtPrice: 299800,
        inventory: 55,
        sku: 'AVG-ASH-120',
      },
    ],
    inventory: {
      quantity: 110,
      trackQuantity: true,
    },
    tags: ['ashwagandha', 'ksm66', 'adaptogen', 'cortisol', 'sleep', 'stress-relief', 'supplements', 'ayurvedic'],
    ingredients: [
      'KSM-66 Organic Ashwagandha (Withania somnifera) Root Extract - 600mg (Standardized to 5% withanolides by HPLC)',
      'BioPerine Organic Black Pepper (Piper nigrum) Extract - 5mg (95% Piperine bio-enhancer)',
      'Vegetarian Plant-derived HPMC Capsule Shell',
    ],
    usage: 'Take 1 capsule twice daily with warm water or milk after meals, preferably with breakfast and 1 hour before sleep.',
    warnings: [
      'Store in a cool, dry place away from direct sunlight.',
      'Consult your doctor before use if taking sedatives or thyroid medications.',
    ],
    ageRestricted: false,
    seo: {
      title: 'KSM-66 Ashwagandha Root Extract 60 Capsules | Ayur Veda Global',
      description: 'Buy organic KSM-66 Ashwagandha capsules standardized to 5% withanolides. Reduces cortisol, enhances vitality and recovery.',
      keywords: ['ksm-66 ashwagandha', 'ashwagandha root extract', 'cortisol reduction', 'ayurvedic adaptogen', 'ayur veda global'],
    },
    createdAt: '2024-03-12T10:00:00Z',
    updatedAt: '2026-09-25T14:00:00Z',
  },
  {
    id: 'vajikara-gold-vitality-oil',
    slug: 'vajikara-gold-vitality-oil',
    name: 'Vajikara Gold Muscular & Intimate Vitality Oil (50 ml)',
    tagline: 'Traditional Taila Paka Vidhi | Firmness, Circulation & Tissue Tone',
    description: `Formulated according to classical Bhaishajya Ratnavali texts, Vajikara Gold Vitality Oil is slow-brewed through authentic Taila Paka Vidhi over 7 days in pure cold-pressed sesame oil. Infused with Ashwagandha, Jaiphal, Malkangani (Jyotishmati), Akarkara, and Clove Oil, this topical massage elixir warms tissues, stimulates micro-vascular nitric oxide circulation, strengthens muscle tone, and relieves local fatigue.

Non-sticky, rapidly absorbed, and free from mineral oils, liquid paraffin, or artificial scents. Designed for daily therapeutic massage and tissue conditioning.`,
    shortDescription: 'Classical 7-day slow-brewed Ayurvedic massage oil with Ashwagandha, Malkangani, Jaiphal and Akarkara to enhance blood circulation, muscle tone and tissue firmness.',
    category: 'personal-care',
    images: [
      { src: '/images/products/vajikara-gold-vitality-oil-card.jpg', alt: 'Vajikara Gold Vitality Oil 50ml - Amber Dropper Bottle', isPrimary: true },
      { src: '/images/products/vajikara-gold-vitality-oil-detail.jpg', alt: 'Vajikara Gold Vitality Oil - Herbal Botanical Base Detail', isPrimary: false },
      { src: '/images/products/vajikara-gold-vitality-oil-thumb.jpg', alt: 'Vajikara Gold Vitality Oil - Square Thumbnail', isPrimary: false },
    ],
    price: 119900,
    compareAtPrice: 169900,
    variants: [
      {
        id: 'vajikara-gold-vitality-oil-50ml',
        name: '50ml Amber Glass Dropper Bottle',
        price: 119900,
        compareAtPrice: 169900,
        inventory: 90,
        sku: 'AVG-VGO-50',
      },
      {
        id: 'vajikara-gold-vitality-oil-100ml',
        name: '100ml Twin Pack (2x50ml - Save ₹700)',
        price: 209900,
        compareAtPrice: 339800,
        inventory: 45,
        sku: 'AVG-VGO-100',
      },
    ],
    inventory: {
      quantity: 90,
      trackQuantity: true,
    },
    tags: ['massage-oil', 'vitality-oil', 'vajikara', 'blood-circulation', 'personal-care', 'ayurvedic', 'tissue-tone'],
    ingredients: [
      'Pure Cold-Pressed Black Sesame Oil (Sesamum indicum) Base',
      'Ashwagandha (Withania somnifera) Root Maceration',
      'Akarkara (Anacyclus pyrethrum) Extract',
      'Jyotishmati / Malkangani (Celastrus paniculatus) Seed Oil',
      'Jaiphal / Nutmeg (Myristica fragrans) Oil',
      'Clove (Syzygium aromaticum) Essential Oil',
      'Pure Vitamin E (Tocopherol)',
    ],
    usage: 'Take 5 to 7 drops of Vajikara Gold Vitality Oil on your palm. Gently massage in an upward motion into target muscles and tissues for 3-5 minutes until fully absorbed. For best results, use daily at night before sleeping.',
    warnings: [
      'For external topical application only. Do not ingest.',
      'Do not apply on open cuts, sensitive mucus membranes, or broken skin.',
      'Store in a cool place away from direct sunlight.',
    ],
    ageRestricted: true,
    seo: {
      title: 'Vajikara Gold Vitality Oil 50ml | Ayur Veda Global',
      description: 'Shop classical Ayurvedic Vajikara Gold Massage Oil for men. Enriched with Ashwagandha, Malkangani & Jaiphal for tissue tone and circulation.',
      keywords: ['vajikara gold oil', 'ayurvedic massage oil', 'vitality oil', 'mens tonic oil', 'ayur veda global'],
    },
    createdAt: '2024-03-15T10:00:00Z',
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

export function getFeaturedProducts(limit = 6): Product[] {
  return products.slice(0, limit)
}

export function getRelatedProducts(currentProductId: string, limit = 4): Product[] {
  return products
    .filter(p => p.id !== currentProductId)
    .slice(0, limit)
}

export type ProductImageVariant = 'card' | 'thumb' | 'hero' | 'detail' | 'default'

/**
 * Bulletproof product image resolver.
 * Handles Product objects, CartItems, DB entities (images_json), legacy string image URLs,
 * and returns tailored crops ('card' 4:5, 'thumb' 1:1, 'hero' full shoot, 'detail' botanical).
 */
export function getProductImage(
  productOrItem?: any,
  fallbackId?: string,
  variant: ProductImageVariant = 'card'
): { src: string; alt: string; isPrimary: boolean } {
  const cropMap: Record<string, Record<ProductImageVariant, string>> = {
    'body-essential-nutrition': {
      card: '/images/products/body-essential-nutrition-card.jpg',
      thumb: '/images/products/body-essential-nutrition-thumb.jpg',
      hero: '/images/products/body-essential-nutrition.png',
      detail: '/images/products/body-essential-nutrition-detail.jpg',
      default: '/images/products/body-essential-nutrition-card.jpg',
    },
    'staymax-delay-spray': {
      card: '/images/products/staymax-delay-spray-card.jpg',
      thumb: '/images/products/staymax-delay-spray-thumb.jpg',
      hero: '/images/products/staymax-delay-spray.png',
      detail: '/images/products/staymax-delay-spray-detail.jpg',
      default: '/images/products/staymax-delay-spray-card.jpg',
    },
    'vitality-power-combo': {
      card: '/images/products/vitality-power-combo-card.jpg',
      thumb: '/images/products/vitality-power-combo-thumb.jpg',
      hero: '/images/products/vitality-power-combo.jpg',
      detail: '/images/products/vitality-power-combo-detail.jpg',
      default: '/images/products/vitality-power-combo-card.jpg',
    },
    'himalayan-shilajit-resin': {
      card: '/images/products/himalayan-shilajit-resin-card.jpg',
      thumb: '/images/products/himalayan-shilajit-resin-thumb.jpg',
      hero: '/images/products/himalayan-shilajit-resin-card.jpg',
      detail: '/images/products/himalayan-shilajit-resin-detail.jpg',
      default: '/images/products/himalayan-shilajit-resin-card.jpg',
    },
    'ksm66-ashwagandha-root-extract': {
      card: '/images/products/ashwagandha-root-extract-card.jpg',
      thumb: '/images/products/ashwagandha-root-extract-thumb.jpg',
      hero: '/images/products/ashwagandha-root-extract-card.jpg',
      detail: '/images/products/ashwagandha-root-extract-detail.jpg',
      default: '/images/products/ashwagandha-root-extract-card.jpg',
    },
    'vajikara-gold-vitality-oil': {
      card: '/images/products/vajikara-gold-vitality-oil-card.jpg',
      thumb: '/images/products/vajikara-gold-vitality-oil-thumb.jpg',
      hero: '/images/products/vajikara-gold-vitality-oil-card.jpg',
      detail: '/images/products/vajikara-gold-vitality-oil-detail.jpg',
      default: '/images/products/vajikara-gold-vitality-oil-card.jpg',
    },
  }

  // Identify product key
  const product = productOrItem?.product || productOrItem
  const idToMatch = String(
    fallbackId ||
    product?.id ||
    product?.slug ||
    product?.productId ||
    productOrItem?.productId ||
    product?.name ||
    ''
  ).toLowerCase()

  let matchedKey = 'body-essential-nutrition'
  if (idToMatch.includes('shilajit') && !idToMatch.includes('combo')) {
    matchedKey = 'himalayan-shilajit-resin'
  } else if (idToMatch.includes('ashwagandha') && !idToMatch.includes('body')) {
    matchedKey = 'ksm66-ashwagandha-root-extract'
  } else if (idToMatch.includes('vajikara') || idToMatch.includes('oil')) {
    matchedKey = 'vajikara-gold-vitality-oil'
  } else if (idToMatch.includes('staymax') || idToMatch.includes('spray') || idToMatch.includes('delay')) {
    matchedKey = 'staymax-delay-spray'
  } else if (idToMatch.includes('combo') || idToMatch.includes('vitality') || idToMatch.includes('wellness')) {
    matchedKey = 'vitality-power-combo'
  }

  const productName = product?.name || (
    matchedKey === 'staymax-delay-spray'
      ? 'STAYMAX+ Delay Spray (30 ml)'
      : matchedKey === 'vitality-power-combo'
      ? 'Vitality & Performance Power Combo'
      : matchedKey === 'himalayan-shilajit-resin'
      ? 'Pure Himalayan Shilajit Resin (Gold Grade, 20g)'
      : matchedKey === 'ksm66-ashwagandha-root-extract'
      ? 'KSM-66 Organic Ashwagandha (60 Capsules)'
      : matchedKey === 'vajikara-gold-vitality-oil'
      ? 'Vajikara Gold Muscular & Intimate Vitality Oil (50 ml)'
      : 'BODY Essential Nutrition (60 Capsules)'
  )

  // 1. If product.images array exists and requested variant is matched in it
  if (Array.isArray(product?.images) && product.images.length > 0) {
    if (variant === 'thumb') {
      const thumb = product.images.find((img: any) => typeof img?.src === 'string' && img.src.includes('-thumb'))
      if (thumb) return { src: thumb.src, alt: thumb.alt || productName, isPrimary: true }
    } else if (variant === 'card') {
      const card = product.images.find((img: any) => typeof img?.src === 'string' && img.src.includes('-card'))
      if (card) return { src: card.src, alt: card.alt || productName, isPrimary: true }
    } else if (variant === 'detail') {
      const detail = product.images.find((img: any) => typeof img?.src === 'string' && img.src.includes('-detail'))
      if (detail) return { src: detail.src, alt: detail.alt || productName, isPrimary: true }
    } else if (variant === 'hero') {
      const hero = product.images.find((img: any) => typeof img?.src === 'string' && (img.src.endsWith('.png') || img.src.endsWith('.jpg')) && !img.src.includes('-thumb') && !img.src.includes('-card') && !img.src.includes('-detail'))
      if (hero) return { src: hero.src, alt: hero.alt || productName, isPrimary: true }
    }
  }

  // 2. Return tailored crop from cropMap
  const variantSrc = cropMap[matchedKey]?.[variant] || cropMap[matchedKey]?.card || cropMap['body-essential-nutrition'].card
  return {
    src: variantSrc,
    alt: productName,
    isPrimary: true,
  }
}