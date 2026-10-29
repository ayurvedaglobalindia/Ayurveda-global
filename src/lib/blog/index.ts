export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  isoDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  relatedProductSlug: string;
  relatedProductName: string;
  tags: string[];
  content: {
    heading?: string;
    paragraphs: string[];
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "science-of-shilajit",
    slug: "science-of-shilajit",
    title: "The Science of Pure Shilajit: 84+ Minerals & Cellular Stamina",
    seoTitle: "The Science of Pure Shilajit: 84+ Minerals & Mitochondrial Energy",
    excerpt:
      "Originating high in the Himalayan peaks, Shilajit is known in classical compendia as the 'Destroyer of Weakness'. Learn how bioavailable fulvic acid activates mitochondrial ATP production.",
    category: "Herbal Wisdom",
    readTime: "5 min read",
    date: "October 2026",
    isoDate: "2026-10-15T00:00:00.000Z",
    author: {
      name: "Dr. Mageesh Sharma (BAMS)",
      role: "Chief Ayurvedic Vaidya & Formulator",
      avatar: "/images/team/mageesh.jpg",
    },
    image: "/images/products/himalayan-shilajit-resin-card.jpg",
    relatedProductSlug: "himalayan-shilajit-resin",
    relatedProductName: "Pure Himalayan Shilajit Resin (20g)",
    tags: ["Shilajit", "Mitochondrial Energy", "Fulvic Acid", "Stamina", "Rasayana"],
    content: [
      {
        heading: "Classical Lineage: Destroyer of Weakness",
        paragraphs: [
          "In classical Charaka Samhita and Sushruta Samhita treatises, Shilajit holds supreme status as an Anupama Rasayana—a master rejuvenator capable of restoring vigor across all seven bodily tissues (Sapta Dhatus: Rasa, Rakta, Mamsa, Meda, Asthi, Majja, and Shukra). Ancient seers described it as oozing from high Himalayan rock faces during the intense solar heat of May and June.",
          "Unlike modern synthetic multi-vitamins that offer low bioavailability, authentic Himalayan Shilajit contains over 84 trace minerals naturally bound to bioavailable fulvic acid and humic carriers.",
        ],
      },
      {
        heading: "Mitochondrial Bio-energetics & ATP Acceleration",
        paragraphs: [
          "Modern clinical biochemistry has unraveled the molecular action behind this ancient resin. Fulvic acid functions as a high-affinity electron transporter directly across cellular and mitochondrial membranes.",
          "By facilitating cellular electron transfer, Shilajit accelerates the regeneration of Adenosine Triphosphate (ATP)—the fundamental energy currency of human muscle fibers and neural tissue. This yields sustained, jitter-free physical stamina without elevating blood pressure or inducing caffeine crashes.",
        ],
      },
      {
        heading: "Shodhana Purification: Why Purity Is Mandatory",
        paragraphs: [
          "Raw, unpurified mineral pitch contains heavy metals and organic debris. At Ayur Veda Global, we follow authentic Surya Tapi (solar evaporation) and classical Triphala Shodhana purification.",
          "Every batch is verified through independent NABL-accredited third-party laboratory testing, certifying minimum 75% Fulvic Acid potency and zero heavy metal contamination.",
        ],
      },
    ],
  },
  {
    id: "ashwagandha-adaptogen-stress-vigor",
    slug: "ashwagandha-adaptogen-stress-vigor",
    title: "Ashwagandha: Ancient India's Premier Adaptogen for Stress & Muscle Vigor",
    seoTitle: "Ashwagandha KSM-66: Science of Cortisol Reduction & Muscle Vigor",
    excerpt:
      "How full-spectrum Withanolides modulate the HPA-axis, reduce serum cortisol by up to 28%, and restore deep REM sleep cycles for hardworking professionals.",
    category: "Vitality Science",
    readTime: "4 min read",
    date: "September 2026",
    isoDate: "2026-09-20T00:00:00.000Z",
    author: {
      name: "Dr. Mageesh Sharma (BAMS)",
      role: "Chief Ayurvedic Vaidya & Formulator",
      avatar: "/images/team/mageesh.jpg",
    },
    image: "/images/products/ashwagandha-root-extract-card.jpg",
    relatedProductSlug: "ashwagandha-root-extract",
    relatedProductName: "Ashwagandha KSM-66 Full-Spectrum (60 Capsules)",
    tags: ["Ashwagandha", "Cortisol", "Sleep Architecture", "Muscle Strength", "Adaptogen"],
    content: [
      {
        heading: "The Physiology of Withanolides",
        paragraphs: [
          "Ashwagandha (Withania somnifera) translates to 'Smell of the Horse', evoking the strength and enduring vitality of a stallion. In Ayurvedic pharmacology, it is classified as a Balya (strength-giver) and Vajikarana (vitality enhancer) herb.",
          "The bioactive constituents—primarily withanolides, withaferin A, and withanosides—act directly upon the hypothalamic-pituitary-adrenal (HPA) axis, down-regulating excessive cortisol production provoked by chronic modern stress.",
        ],
      },
      {
        heading: "Clinical Evidence: Cortisol, Strength & Deep Rest",
        paragraphs: [
          "Multiple double-blind, randomized placebo-controlled trials have demonstrated that 600mg of standardized root extract taken daily reduces serum cortisol levels by up to 27.9%, while significantly improving muscle recovery and sleep efficiency.",
          "Rather than acting as a sedative, Ashwagandha restores physiological equilibrium: energizing the body by day and promoting deep regenerative sleep by night.",
        ],
      },
      {
        heading: "Synergistic Pairing with Shilajit & Musli",
        paragraphs: [
          "In Ayur Veda Global's BODY Essential Nutrition, standardized Ashwagandha is blended with Shilajit, Safed Musli, Gokshura, and Kaunch Beej. This synergistic formulation amplifies bio-absorption and sustains athletic and neuro-muscular performance.",
        ],
      },
    ],
  },
  {
    id: "staymax-delay-spray-men-endurance-guide",
    slug: "staymax-delay-spray-men-endurance-guide",
    title: "Men's Vitality & Ayurvedic Endurance: The Science of Prolonging Intimacy",
    seoTitle: "Men's Ayurvedic Endurance: The Science of Prolonging Intimacy",
    excerpt:
      "Understanding hypersensitivity, neuro-muscular control, and how calibrated topical desensitization combined with soothing Ashwagandha and Aloe Vera extends intimate pacing.",
    category: "Men's Wellness",
    readTime: "6 min read",
    date: "August 2026",
    isoDate: "2026-08-10T00:00:00.000Z",
    author: {
      name: "Umesh Rawat",
      role: "Clinical Wellness Director",
      avatar: "/images/team/umesh.jpg",
    },
    image: "/images/products/staymax-delay-spray-card.jpg",
    relatedProductSlug: "staymax-delay-spray",
    relatedProductName: "STAYMAX+ Delay Spray (30 ml)",
    tags: ["Men's Health", "Endurance", "STAYMAX+", "Intimate Control", "Vajikarana"],
    content: [
      {
        heading: "De-mystifying Men's Intimate Hypersensitivity",
        paragraphs: [
          "Intimate pacing is one of the most common yet rarely discussed concerns among men across India. High sensory excitability combined with mental performance pressure frequently leads to premature climax, leaving both partners unsatisfied.",
          "In classical Ayurveda, intimate duration is governed by the Shukra Dhatu and the harmonious balance of Vata and Pitta doshas. When Vata becomes erratic through fatigue or nervous tension, physiological control diminishes.",
        ],
      },
      {
        heading: "Why Typical Numbing Creams Fail",
        paragraphs: [
          "Most cheap chemical sprays on the market use harsh, high-concentration local anesthetics that induce total numbness. This eliminates mutual pleasure, causes erectile deflation, and transfers numbness to the partner.",
          "STAYMAX+ was engineered specifically to solve this flaw: using a calibrated micro-metered dose of mild topical desensitizer paired with organic Aloe Vera and Ashwagandha to condition sensitive skin, preserve natural pleasure, and absorb cleanly within 10 to 15 minutes.",
        ],
      },
      {
        heading: "The 3-Step Protocol for Maximum Pacing",
        paragraphs: [
          "1. Spray 2 to 3 pumps onto the sensitive coronal margin 10 to 15 minutes prior to intimacy.",
          "2. Gently massage until completely absorbed into the skin.",
          "3. Experience calm, sustained control for 20 to 45 minutes of mutually satisfying intimacy. Dispatches are 100% confidential in plain, unmarked packaging.",
        ],
      },
    ],
  },
  {
    id: "ayurvedic-hair-fall-reversal-guide",
    slug: "ayurvedic-hair-fall-reversal-guide",
    title: "Ayurvedic Hair Fall Reversal: Scalp Kshir Pak Vidhi, Bhringraj & Follicular Nourishment",
    seoTitle: "Ayurvedic Hair Fall Reversal: Kshir Pak Vidhi & Follicular Roots",
    excerpt:
      "Discover the ancient Kshir Pak Vidhi slow-infusion method, how Bhringraj (King of Hair) revives dormant follicles, and why inside-out herbal nutrition outperforms surface shampoos.",
    category: "Hair & Scalp",
    readTime: "5 min read",
    date: "July 2026",
    isoDate: "2026-07-25T00:00:00.000Z",
    author: {
      name: "Dr. Mageesh Sharma (BAMS)",
      role: "Chief Ayurvedic Vaidya & Formulator",
      avatar: "/images/team/mageesh.jpg",
    },
    image: "/images/products/hair-regrow-kit-card.jpg",
    relatedProductSlug: "hair-regrow-kit",
    relatedProductName: "HAIR RE-GROW Complete Care Kit",
    tags: ["Hair Fall", "Bhringraj", "Kshir Pak", "Brahmi", "Follicles"],
    content: [
      {
        heading: "The Root Cause: Pitta Excess at the Follicular Papilla",
        paragraphs: [
          "Ayurveda identifies premature hair fall (Khalitya) as primarily a Pitta-dominant metabolic disorder. Excess heat in the blood stream (Rakta Dhatu) dries out the sebaceous roots and shrinks the hair follicle, shortening the active anagen growth phase.",
          "Surface shampoos packed with sulfates and parabens only strip the scalp of natural oils without penetrating to the deeper dermal papilla where hair cells regenerate.",
        ],
      },
      {
        heading: "Kshir Pak Vidhi: The 72-Hour Slow Infusion",
        paragraphs: [
          "HAIR RE-GROW Scalp Therapy Oil is prepared strictly adhering to classical Kshir Pak Vidhi: fresh Bhringraj, Brahmi, Amalaki, Jatamansi, and Methi roots are gently simmered in cow's milk and cold-pressed sesame oil over low heat for 72 hours until all water content evaporates.",
          "This ancient culinary technique captures both water-soluble and lipid-soluble botanical nutrients in high potency, enabling the oil to penetrate deep into the scalp matrix upon nightly application.",
        ],
      },
      {
        heading: "Inside-Out Dual Regimen",
        paragraphs: [
          "Optimal hair density requires simultaneous internal DHT balance and external root conditioning. Pairing oral botanical capsules with topical scalp taila stimulates micro-circulation, clears dandruff flakes, and encourages dormant follicles to enter new growth cycles within 60 to 90 days.",
        ],
      },
    ],
  },
  {
    id: "ayurvedic-daily-routine-dinacharya",
    slug: "ayurvedic-daily-routine-dinacharya",
    title: "Dinacharya: The Classical Ayurvedic Daily Routine for Sustained Peak Energy",
    seoTitle: "Dinacharya Daily Routine: Classical Ayurvedic Habits for Peak Energy",
    excerpt:
      "Transform your daily energy, digestion, and mental focus with time-tested morning rituals: Brahma Muhurta rising, Ushapan water drinking, and Nasya oil therapy.",
    category: "Holistic Lifestyle",
    readTime: "6 min read",
    date: "June 2026",
    isoDate: "2026-06-18T00:00:00.000Z",
    author: {
      name: "Dr. Mageesh Sharma (BAMS)",
      role: "Chief Ayurvedic Vaidya & Formulator",
      avatar: "/images/team/mageesh.jpg",
    },
    image: "/images/products/vitality-power-combo-card.jpg",
    relatedProductSlug: "body-essential-nutrition",
    relatedProductName: "BODY Essential Nutrition (60 Capsules)",
    tags: ["Dinacharya", "Daily Habits", "Ayurvedic Lifestyle", "Brahma Muhurta", "Agni"],
    content: [
      {
        heading: "Aligning With Natural Circadian Rhythms",
        paragraphs: [
          "Dinacharya represents one of Ayurveda's greatest gifts to human longevity: a structured daily regimen that harmonizes biological rhythms with the solar and doshic cycles of nature.",
          "According to Ashtanga Hridaya, the day is split into 4-hour cycles governed cyclically by Kapha (6 AM - 10 AM), Pitta (10 AM - 2 PM), and Vata (2 PM - 6 PM). Aligning meals, work, and restorative practices with these doshic windows unlocks effortless energy.",
        ],
      },
      {
        heading: "The 4 Essential Morning Rituals",
        paragraphs: [
          "1. Brahma Muhurta Rising: Waking approximately 45 minutes before sunrise when the atmosphere is rich in pure Sattva (clarity).",
          "2. Ushapan: Drinking 2 glasses of lukewarm water stored in a pure copper vessel to activate peristalsis and flush overnight toxins (Ama).",
          "3. Jihwa Nirlekhana (Tongue Scraping): Removing overnight microbial coating with a copper or brass scraper to enhance taste perception and stimulate digestive fire (Agni).",
          "4. Abhyanga (Self-Massage): 5 minutes of warm herbal oil massage to calm Vata, lubricate joints, and improve skin resilience.",
        ],
      },
      {
        heading: "Sustaining High-Performance Metabolism",
        paragraphs: [
          "When combined with authentic Rasayana supplements like BODY Essential Nutrition, Dinacharya transforms chronic afternoon fatigue into calm, focused productivity.",
        ],
      },
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
