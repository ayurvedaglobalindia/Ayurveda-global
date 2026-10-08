"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  Leaf,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  relatedProductSlug?: string;
  relatedProductName?: string;
  content: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "science-of-shilajit",
    slug: "science-of-shilajit",
    title: "The Science of Pure Shilajit: 84+ Minerals & Cellular Stamina",
    excerpt:
      "Originating high in the Himalayan peaks, Shilajit is known in classical texts as the 'Destroyer of Weakness'. Learn how fulvic acid activates mitochondrial ATP production.",
    category: "Herbal Wisdom",
    readTime: "5 min read",
    date: "October 2024",
    image: "/images/products/himalayan-shilajit-resin-card.jpg",
    relatedProductSlug: "body-essential-nutrition",
    relatedProductName: "BODY Essential Nutrition",
    content: [
      "In the classical Ayurvedic pharmacopeia, Shilajit holds supreme status as an Anupama Rasayana—a premier rejuvenator capable of restoring vigor across all seven bodily tissues (Sapta Dhatus). Modern biochemical research validates this ancient wisdom: Shilajit is exceptionally rich in fulvic acid, humic compounds, and over 84 trace minerals in ionic, bioavailable form.",
      "The primary mechanism of Shilajit operates at the cellular powerhouse: the mitochondria. Fulvic acid acts as an electron carrier, accelerating the synthesis of Adenosine Triphosphate (ATP). This results in sustained physical endurance, reduced lactic acid buildup during exertion, and enhanced mental alertness without the jittery crashes associated with synthetic caffeine stimulants.",
      "When combined with standardized Ashwagandha and Safed Musli, Shilajit creates an unmatched physiological surge in vitality, muscle repair, and immune resistance.",
    ],
  },
  {
    id: "ashwagandha-adaptogen-stress-vigor",
    slug: "ashwagandha-adaptogen-stress-vigor",
    title: "Ashwagandha: Ancient India's Premier Adaptogen for Stress & Muscle Vigor",
    excerpt:
      "How Withanolides modulate cortisol, strengthen neuromuscular pathways, and restore deep restorative sleep cycles for hardworking professionals.",
    category: "Vitality Science",
    readTime: "4 min read",
    date: "September 2024",
    image: "/images/products/ashwagandha-root-extract-card.jpg",
    relatedProductSlug: "vitality-power-combo",
    relatedProductName: "Vitality Power Combo",
    content: [
      "Ashwagandha (Withania Somnifera), affectionately translating to 'smell of a horse' in Sanskrit, represents the embodiment of equine stamina and resilience. Classified as a Medhya and Balya herb, it provides profound adaptogenic support to individuals navigating high stress, taxing workdays, and intense training regimens.",
      "Clinical trials demonstrate that standardized root extracts containing high concentrations of Withanolides effectively downregulate serum cortisol levels by up to 28%. By easing the adrenal stress axis, the body shifts from a catabolic breakdown state into an anabolic repair mode, fostering healthy testosterone maintenance, muscle tone, and cardiovascular capacity.",
      "Pairing daily Ashwagandha supplementation with warm milk or a balanced diet supports the Vata dosha, eliminating restlessness and insomnia while instilling steady daytime vigor.",
    ],
  },
  {
    id: "ayurvedic-hair-regrowth-therapy",
    slug: "ayurvedic-hair-regrowth-therapy",
    title: "Ayurvedic Hair Loss Therapy: Calming Scalp Pitta & Stimulating Roots",
    excerpt:
      "Uncover why excess internal heat (Pitta) triggers premature thinning, and how combining Bhringraj, Brahmi, and herbal scalp oils stops shedding at the follicle level.",
    category: "Hair Health",
    readTime: "6 min read",
    date: "August 2024",
    image: "/images/products/hair-regrow-kit-card.jpg",
    relatedProductSlug: "hair-regrow-kit",
    relatedProductName: "HAIR RE-GROW Complete Kit",
    content: [
      "Ayurveda views hair (Kesha) as a byproduct (Upadhatu) of Asthi Dhatu (bone tissue). Hair loss, or Khalitya, is primarily triggered by an aggravated Pitta dosha—excessive internal heat and inflammation that 'burns' the delicate hair follicles and disrupts microcirculation across the scalp.",
      "To reverse this process, a dual inside-out regimen is essential. Topically, classical Ksheerabala and Bhringraj oils provide cooling nourishment, clearing sebum buildup and delivering antioxidant minerals directly to dormant hair papillae. Internally, nutrient-dense herbs like Amla and Shankhpushpi purify the blood (Rakta) and replenish essential micronutrients.",
      "Consistent 90-day application combined with gentle nightly scalp massage stimulates microvascular dilation, halting excessive shedding and encouraging dense follicular reactivation.",
    ],
  },
  {
    id: "vajikarana-intimate-endurance",
    slug: "vajikarana-intimate-endurance",
    title: "The Art of Vajikarana: Pacing, Confidence & Modern Intimate Wellness",
    excerpt:
      "A respectful, science-backed exploration of Ayurvedic topical pacing, desensitization botanicals, and overcoming performance anxiety naturally.",
    category: "Personal Care",
    readTime: "5 min read",
    date: "July 2024",
    image: "/images/products/vajikara-gold-vitality-oil-card.jpg",
    relatedProductSlug: "staymax-delay-spray",
    relatedProductName: "STAYMAX+ Delay Spray",
    content: [
      "Vajikarana is one of the eight classical branches of Ashtanga Ayurveda, dedicated entirely to reproductive vitality, sexual health, and intimate harmony. Far from being a modern taboo, ancient Vaidyas treated intimate endurance as a cornerstone of overall marital wellness and vitality.",
      "Modern stress and sensory overload often cause hyper-sensitized penile nerve endings and rapid sympathetic nervous system triggers. By combining calibrated topical solutions with soothing Ayurvedic botanicals like Aloe Vera, Vitamin E, and Clove Oil, men can gently modulate sensitivity without complete numbness.",
      "This balanced approach allows partners to extend intimacy, align pacing, and build lasting bedroom confidence naturally and discreetly.",
    ],
  },
  {
    id: "ayurvedic-dinacharya-routine",
    slug: "ayurvedic-dinacharya-routine",
    title: "The Ayurvedic Dinacharya: Daily Rituals for Boundless All-Day Vitality",
    excerpt:
      "Simple morning practices—from copper water hydration to mindful breathing—that align your circadian clock with natural biological rhythms.",
    category: "Lifestyle",
    readTime: "4 min read",
    date: "June 2024",
    image: "/images/products/body-essential-nutrition-detail.jpg",
    relatedProductSlug: "body-essential-nutrition",
    relatedProductName: "BODY Essential Nutrition",
    content: [
      "Dinacharya refers to the sacred daily routine prescribed by Maharishi Charaka to synchronize human biorhythms with cosmic solar cycles. Awakening during the Brahma Muhurta (roughly 45 minutes before sunrise) primes the mind with serene Sattvic clarity before the day's frantic pace begins.",
      "Key morning rituals include drinking warm copper-infused water (Ushapan) to stimulate digestive peristalsis, gentle tongue scraping (Jihwa Nirlekhana) to eliminate accumulated Ama (toxins), and a brief oil application (Abhyanga) to lubricate joint tissues.",
      "Incorporating these foundational habits alongside authentic Rasayana herbs creates an unshakeable foundation for metabolic resilience, vibrant skin, and peaceful sleep.",
    ],
  },
];

const categories = [
  "All Articles",
  "Herbal Wisdom",
  "Vitality Science",
  "Hair Health",
  "Personal Care",
  "Lifestyle",
];

export default function BlogClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const filteredPosts =
    selectedCategory === "All Articles"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-[#737373] mb-6 font-mono"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#1C1D1F] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1C1D1F]">Wellness Journal</span>
        </nav>

        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF4F0] border border-[#2D4A3E]/20 text-[#2D4A3E] text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9E8047]" />
            Ayurveda Global Journal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-3">
            Ancient Wisdom for Modern Healing
          </h1>
          <p className="text-sm text-[#737373] leading-relaxed">
            Evidence-based Ayurvedic guidance, clinical herb studies, and daily wellness rituals curated by classical scholars and Vaidyas.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveArticle(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#2D4A3E] text-white shadow-sm"
                  : "bg-white text-[#737373] border border-gray-200 hover:border-[#9E8047]/40 hover:text-[#1C1D1F]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Detailed Modal/View if Article Clicked */}
        {activeArticle ? (
          <div className="bg-white rounded-2xl border border-[#9E8047]/25 p-6 sm:p-10 shadow-sm mb-12">
            <button
              onClick={() => setActiveArticle(null)}
              className="text-xs text-[#2D4A3E] font-medium flex items-center gap-1 mb-6 hover:underline"
            >
              ← Back to all articles
            </button>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#737373] font-mono mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EFF4F0] text-[#2D4A3E]">
                {activeArticle.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {activeArticle.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1D1F] mb-6 leading-snug">
              {activeArticle.title}
            </h2>

            <div className="relative w-full aspect-[16/9] max-h-80 rounded-xl overflow-hidden mb-8 border border-gray-100">
              <Image
                src={activeArticle.image}
                alt={activeArticle.title}
                fill
                className="object-contain bg-gray-50 p-4"
              />
            </div>

            <div className="prose max-w-none text-[#555555] space-y-4 text-sm sm:text-base leading-relaxed">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Related Formulation Recommendation Card */}
            {activeArticle.relatedProductSlug && (
              <div className="mt-8 p-6 rounded-xl bg-[#EFF4F0]/60 border border-[#2D4A3E]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#2D4A3E] font-semibold block mb-1">
                    Recommended Herbal Formulation
                  </span>
                  <h4 className="font-serif text-base text-[#1C1D1F]">
                    {activeArticle.relatedProductName}
                  </h4>
                  <p className="text-xs text-[#737373] mt-0.5">
                    100% Herbal, GMP Certified &amp; Lab-Tested for Authentic Purity.
                  </p>
                </div>
                <Link
                  href={`/product/${activeArticle.relatedProductSlug}`}
                  className="px-5 py-2.5 rounded-lg bg-[#2D4A3E] hover:bg-[#1F332A] text-white text-xs font-medium tracking-wide flex items-center gap-2 transition-colors flex-shrink-0"
                >
                  <span>View Formulation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        ) : (
          /* Articles Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-[#9E8047]/20 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                onClick={() => setActiveArticle(post)}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden border-b border-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-white/90 backdrop-blur-xs text-[#2D4A3E] border border-gray-200 shadow-2xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-[#737373] font-mono mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg text-[#1C1D1F] group-hover:text-[#2D4A3E] transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#737373] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#2D4A3E] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Read Full Article
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    {post.relatedProductName && (
                      <span className="text-[10px] font-mono text-[#9E8047]">
                        {post.relatedProductName}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Banner for Doctor Consultation */}
        <div className="mt-14 bg-gradient-to-r from-[#2D4A3E] to-[#1F332A] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-medium mb-2">
              Have Specific Health or Dosage Questions?
            </h3>
            <p className="text-xs sm:text-sm text-[#E8ECE9]/90 font-light leading-relaxed">
              Consult directly with our qualified Ayurvedic Vaidyas on WhatsApp. Free advice, dosha evaluation, and customized treatment recommendations.
            </p>
          </div>
          <Link
            href="/consultation"
            className="px-6 py-3 rounded-full bg-[#9E8047] hover:bg-[#8A6F3B] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex-shrink-0"
          >
            Consult Chief Vaidya
          </Link>
        </div>
      </div>
    </div>
  );
}
