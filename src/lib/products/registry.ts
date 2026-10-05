import type { Product, Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'supplements',
    name: 'Herbal Supplements',
    slug: 'supplements',
    description: 'Daily stamina, physical strength & holistic Ayurvedic revitalization',
    image: '/images/categories/supplements.svg',
    productCount: 4,
  },
  {
    id: 'personal-care',
    name: 'Personal Care & Vitality',
    slug: 'personal-care',
    description: 'Topical endurance, scalp rejuvenation & intimate wellness',
    image: '/images/categories/personal-care.svg',
    productCount: 3,
  },
  {
    id: 'wellness',
    name: 'Power Combos & Regrowth Kits',
    slug: 'wellness',
    description: 'Inside-out synergistic vitality & hair revitalization kits for maximum efficacy',
    image: '/images/categories/wellness.svg',
    productCount: 2,
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
      { src: '/images/products/body-essential-nutrition-card.jpg', alt: 'BODY Essential Nutrition 60 Capsules - Authentic Studio Bottle Shot', isPrimary: true },
      { src: '/images/products/body-nutrition/01-primary.jpg', alt: 'BODY Essential Nutrition - Herbal Roots & Ayurvedic Capsules on Rustic Wood', isPrimary: false },
      { src: '/images/products/body-nutrition/02-gift.jpg', alt: 'BODY Essential Nutrition - Premium Gift Edition with Apothecary Mortar & Pestle', isPrimary: false },
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
    id: 'hair-regrow-kit',
    slug: 'hair-regrow-kit',
    name: 'HAIR RE-GROW Complete Care Kit (Capsules + Scalp Oil)',
    tagline: 'प्रकृति की शक्ति | Clinically Tested Ayurvedic Hair Fall & Regrowth Treatment',
    description: `Ayur Veda Global's HAIR RE-GROW Complete Care Kit is a comprehensive dual-action Ayurvedic therapy designed to address hair thinning, excessive shedding, and scalp dryness from both inside and outside.

Built on classical Keshya Rasayana principles, the kit pairs 60 pure botanical dietary capsules with 100 mL of nutrient-dense scalp oil. The capsules work internally to detoxify the blood (Rakta Shodhana), pacify aggravated Pitta dosha, and deliver bioavailable micronutrients directly to dormant hair follicles. Simultaneously, the herbal scalp oil moisturizes dry scalp, unclogs hair roots, and boosts local microcirculation.

Enriched with time-tested Ayurvedic treasures including Organic Amla, Bhringraj (The King of Hair), Mulethi (Licorice), Brahmi, Hibiscus flower (Gudhal), and Rosemary leaf extracts. 100% pure Ayurvedic formulation, zero synthetic chemicals, and suitable for both men and women.`,
    shortDescription: 'Dual-action Ayurvedic hair revitalization course with 60 botanical capsules and 100ml scalp oil for clinically proven hair fall reduction and follicular regrowth.',
    category: 'wellness',
    images: [
      { src: '/images/products/hair-regrow-kit-card.jpg', alt: 'HAIR RE-GROW Complete Care Kit with Organic Herbs', isPrimary: true },
      { src: '/images/products/hair-regrow/01-lifestyle-kit.jpg', alt: 'HAIR RE-GROW Capsule & Oil with Rosemary & Argan Nuts', isPrimary: false },
      { src: '/images/products/hair-regrow/02-studio-pack.jpg', alt: 'HAIR RE-GROW Complete Combo Packshot', isPrimary: false },
      { src: '/images/products/hair-regrow/03-clinical-infographic.jpg', alt: 'HAIR RE-GROW Clinical Benefits & Natural Ingredients Infographic', isPrimary: false },
      { src: '/images/products/hair-regrow/04-3d-mascot.jpg', alt: 'Ayurveda Global Official Hair Re-Grow Master Poster', isPrimary: false },
      { src: '/images/products/hair-regrow-kit-detail.jpg', alt: 'HAIR RE-GROW Formula Close-up Detail', isPrimary: false },
      { src: '/images/products/hair-regrow-kit-thumb.jpg', alt: 'HAIR RE-GROW Kit Square Thumbnail', isPrimary: false },
    ],
    price: 189900,
    compareAtPrice: 249900,
    variants: [
      {
        id: 'hair-regrow-kit-standard',
        name: '1 Month Full Regrowth Course (Capsules + 100ml Oil)',
        price: 189900,
        compareAtPrice: 249900,
        inventory: 100,
        sku: 'AVG-HRG-KIT1',
      },
      {
        id: 'hair-regrow-kit-3month',
        name: '3 Months Intensive Root Restoration Course (Save ₹2,600)',
        price: 489900,
        compareAtPrice: 749700,
        inventory: 40,
        sku: 'AVG-HRG-KIT3',
      },
    ],
    inventory: {
      quantity: 100,
      trackQuantity: true,
    },
    tags: ['hair-care', 'hair-growth', 'anti-hairfall', 'ayurvedic', 'bhringraj', 'amla', 'wellness-combo', 'men-women'],
    ingredients: [
      'Amla Extract (Emblica officinalis) - Rich in natural Vitamin C & antioxidants',
      'Bhringraj (Eclipta alba) - Classical herb for follicular activation',
      'Brahmi (Bacopa monnieri) - Scalp cooling & stress relief',
      'Mulethi / Licorice (Glycyrrhiza glabra) - Root nourishment & anti-microbial support',
      'Hibiscus Flower (Hibiscus rosa-sinensis) - Natural conditioning & keratin enhancement',
      'Rosemary Leaf Essential Oil - Clinical circulation catalyst',
      'Cold-Pressed Virgin Coconut & Sesame Oil Base',
    ],
    usage: 'Capsules: Take 1 capsule twice daily after meals with lukewarm water. Scalp Oil: Apply 5-10 ml gently onto scalp 3 times a week, massaging with fingertips for 5 minutes. Leave on overnight or for at least 1 hour before gentle Ayurvedic washing.',
    warnings: [
      'Oil is for external scalp use only.',
      'Capsules: If pregnant or nursing, consult a qualified Ayurvedic physician before use.',
      'Store in a cool, dry place away from direct sunlight.',
    ],
    ageRestricted: false,
    seo: {
      title: 'HAIR RE-GROW Complete Care Kit | Ayurvedic Hair Fall & Regrowth | Ayur Veda Global',
      description: 'Order authentic Ayurvedic HAIR RE-GROW Kit with capsules and herbal scalp oil. Enriched with Amla, Bhringraj & Rosemary for dense, stronger hair.',
      keywords: ['hair regrow kit', 'ayurvedic hair fall treatment', 'hair growth oil and capsules', 'bhringraj hair oil', 'ayur veda global'],
    },
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2026-10-04T12:00:00Z',
  },
  {
    id: 'hair-regrow-capsules',
    slug: 'hair-regrow-capsules',
    name: 'HAIR RE-GROW Pure Botanical Capsules (60 Capsules)',
    tagline: 'Helps Restore Dry Hair Hydration | Supports Damaged Hair Repair',
    description: `HAIR RE-GROW Capsules provide targeted internal nutrition for weak, thinning, and brittle hair. Formulated with high-potency Ayurvedic Rasayana herbs including Amla, Bhringraj, Ashwagandha, and Giloy, this daily dietary supplement delivers crucial bioavailable micro-minerals and phytonutrients that rebuild keratin integrity from the inside out.

Designed to combat stress-induced hair shedding, nutritional deficiencies, and premature thinning, regular use helps restore hair density, fortify roots, and maintain vibrant, shiny strands.`,
    shortDescription: 'Internal Ayurvedic dietary supplement with 60 vegetarian capsules to hydrate dry hair roots, repair damaged hair, and reduce hair loss.',
    category: 'supplements',
    images: [
      { src: '/images/products/hair-regrow-capsules-card.jpg', alt: 'HAIR RE-GROW 60 Capsules Bottle Shot', isPrimary: true },
      { src: '/images/products/hair-regrow/capsules-packshot.jpg', alt: 'HAIR RE-GROW Capsules Clean Studio Packshot', isPrimary: false },
      { src: '/images/products/hair-regrow/capsules-closeup.jpg', alt: 'HAIR RE-GROW Capsules High Detail Bottle', isPrimary: false },
      { src: '/images/products/hair-regrow/03-clinical-infographic.jpg', alt: 'HAIR RE-GROW Clinical Infographic', isPrimary: false },
      { src: '/images/products/hair-regrow-capsules-detail.jpg', alt: 'HAIR RE-GROW Capsules Botanical Formulation Detail', isPrimary: false },
      { src: '/images/products/hair-regrow-capsules-thumb.jpg', alt: 'HAIR RE-GROW Capsules Square Thumbnail', isPrimary: false },
    ],
    price: 109900,
    compareAtPrice: 149900,
    variants: [
      {
        id: 'hair-regrow-capsules-60',
        name: '60 Capsules (1 Month Pack)',
        price: 109900,
        compareAtPrice: 149900,
        inventory: 120,
        sku: 'AVG-HRC-60',
      },
      {
        id: 'hair-regrow-capsules-120',
        name: '120 Capsules (2 Months Value Pack)',
        price: 199900,
        compareAtPrice: 299800,
        inventory: 60,
        sku: 'AVG-HRC-120',
      },
    ],
    inventory: {
      quantity: 120,
      trackQuantity: true,
    },
    tags: ['hair-capsules', 'hair-fall-control', 'ayurvedic-supplements', 'amla-capsules', 'bhringraj'],
    ingredients: [
      'Amalaki (Emblica officinalis) - 200mg',
      'Bhringraj (Eclipta alba) - 150mg',
      'Ashwagandha (Withania somnifera) - 100mg',
      'Guduchi / Giloy (Tinospora cordifolia) - 50mg',
      'Shankhpushpi (Convolvulus pluricaulis) - 50mg',
      'Vegetarian Capsule Shell',
    ],
    usage: 'Take 1 capsule twice daily with warm water after meals, or as directed by your physician.',
    warnings: [
      'Store in a cool, dry place away from sunlight.',
      'Keep out of reach of children.',
    ],
    ageRestricted: false,
    seo: {
      title: 'HAIR RE-GROW Capsules (60 Veg Capsules) | Ayur Veda Global',
      description: 'Buy Ayurvedic HAIR RE-GROW capsules for strong hair roots, reduced fall, and keratin hydration. 100% natural vegetarian capsules.',
      keywords: ['hair regrowth capsules', 'ayurvedic hair vitamins', 'hair fall control tablets', 'ayur veda global'],
    },
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2026-10-04T12:00:00Z',
  },
  {
    id: 'hair-regrow-oil',
    slug: 'hair-regrow-oil',
    name: 'HAIR RE-GROW Nourishing Ayurvedic Scalp Oil (100 ml)',
    tagline: 'Moisturizes Dry Hair & Scalp | Helps Strengthen & Protect',
    description: `HAIR RE-GROW Scalp Oil is a classical Ayurvedic formulation boiled in small batches using traditional Kshir Pak Vidhi. Infused with fresh Bhringraj, Amla, Rosemary essential oil, and Hibiscus into pure cold-pressed Sesame and Coconut oils, it penetrates deeply into the epidermal scalp layer to dislodge product build-up, nourish hair bulbs, and strengthen hair from the root.

Regular scalp massage stimulates circulation, cools the crown, and leaves hair silky, manageable, and visibly thicker without synthetic silicones or mineral oil.`,
    shortDescription: 'Deep-nourishing Ayurvedic scalp oil with Amla, Bhringraj, and Rosemary for dry scalp hydration, follicle stimulation, and root fortification.',
    category: 'personal-care',
    images: [
      { src: '/images/products/hair-regrow-oil-card.jpg', alt: 'HAIR RE-GROW 100ml Scalp Oil Bottle', isPrimary: true },
      { src: '/images/products/hair-regrow/oil-packshot.jpg', alt: 'HAIR RE-GROW Scalp Oil Clean Studio Packshot', isPrimary: false },
      { src: '/images/products/hair-regrow/oil-closeup.jpg', alt: 'HAIR RE-GROW Scalp Oil Detail Bottle', isPrimary: false },
      { src: '/images/products/hair-regrow/03-clinical-infographic.jpg', alt: 'HAIR RE-GROW Oil Clinical Benefits Infographic', isPrimary: false },
      { src: '/images/products/hair-regrow-oil-detail.jpg', alt: 'HAIR RE-GROW Scalp Oil Botanical Formula Detail', isPrimary: false },
      { src: '/images/products/hair-regrow-oil-thumb.jpg', alt: 'HAIR RE-GROW Scalp Oil Square Thumbnail', isPrimary: false },
    ],
    price: 89900,
    compareAtPrice: 119900,
    variants: [
      {
        id: 'hair-regrow-oil-100ml',
        name: 'Single Bottle (100 ml)',
        price: 89900,
        compareAtPrice: 119900,
        inventory: 150,
        sku: 'AVG-HRO-100',
      },
      {
        id: 'hair-regrow-oil-200ml',
        name: 'Twin Pack (2 x 100 ml - Save ₹800)',
        price: 159900,
        compareAtPrice: 239800,
        inventory: 70,
        sku: 'AVG-HRO-200',
      },
    ],
    inventory: {
      quantity: 150,
      trackQuantity: true,
    },
    tags: ['hair-oil', 'scalp-care', 'anti-dandruff', 'ayurvedic-oil', 'bhringraj-oil', 'rosemary-oil'],
    ingredients: [
      'Til Taila (Sesamum indicum oil) - 50%',
      'Narikela Taila (Cocos nucifera oil) - 30%',
      'Bhringraj (Eclipta alba) leaf extract - 10%',
      'Amalaki (Emblica officinalis) fruit extract - 5%',
      'Japapushpa (Hibiscus rosa-sinensis) flower extract - 3%',
      'Rosemary (Rosmarinus officinalis) leaf essential oil - 2%',
    ],
    usage: 'Part your hair and gently massage 5 to 10 ml of oil into your scalp using your fingertips. Leave for at least 1 hour or overnight before rinsing with a mild cleanser.',
    warnings: [
      'For external scalp and hair application only.',
      'Avoid contact with eyes. If contact occurs, rinse immediately with clear water.',
      'Store in a cool and dry location.',
    ],
    ageRestricted: false,
    seo: {
      title: 'HAIR RE-GROW Ayurvedic Scalp Oil (100 ml) | Ayur Veda Global',
      description: 'Shop pure Ayurvedic HAIR RE-GROW hair oil with Bhringraj, Amla and Rosemary. Nourishes scalp, stops shedding, and stimulates hair follicles.',
      keywords: ['ayurvedic hair oil', 'bhringraj scalp oil', 'hair regrowth oil', 'ayur veda global'],
    },
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2026-10-04T12:00:00Z',
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
    'hair-regrow-kit': {
      card: '/images/products/hair-regrow-kit-card.jpg',
      thumb: '/images/products/hair-regrow-kit-thumb.jpg',
      hero: '/images/products/hair-regrow-kit-card.jpg',
      detail: '/images/products/hair-regrow-kit-detail.jpg',
      default: '/images/products/hair-regrow-kit-card.jpg',
    },
    'hair-regrow-capsules': {
      card: '/images/products/hair-regrow-capsules-card.jpg',
      thumb: '/images/products/hair-regrow-capsules-thumb.jpg',
      hero: '/images/products/hair-regrow-capsules-card.jpg',
      detail: '/images/products/hair-regrow-capsules-detail.jpg',
      default: '/images/products/hair-regrow-capsules-card.jpg',
    },
    'hair-regrow-oil': {
      card: '/images/products/hair-regrow-oil-card.jpg',
      thumb: '/images/products/hair-regrow-oil-thumb.jpg',
      hero: '/images/products/hair-regrow-oil-card.jpg',
      detail: '/images/products/hair-regrow-oil-detail.jpg',
      default: '/images/products/hair-regrow-oil-card.jpg',
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
  if (idToMatch.includes('hair') || idToMatch.includes('regrow')) {
    if (idToMatch.includes('capsule')) {
      matchedKey = 'hair-regrow-capsules'
    } else if (idToMatch.includes('oil')) {
      matchedKey = 'hair-regrow-oil'
    } else {
      matchedKey = 'hair-regrow-kit'
    }
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
      : matchedKey === 'hair-regrow-kit'
      ? 'HAIR RE-GROW Complete Growth Kit (Oil + Capsules)'
      : matchedKey === 'hair-regrow-capsules'
      ? 'HAIR RE-GROW Pure Ayurvedic Botanical Capsules'
      : matchedKey === 'hair-regrow-oil'
      ? 'HAIR RE-GROW Ayurvedic Scalp Oil (100 ml)'
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