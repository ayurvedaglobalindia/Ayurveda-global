import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Leaf, Sparkles, Shield, ArrowRight } from "lucide-react";
import { getCategories, getProductsByCategory } from "@/lib/products/registry";
import {
  SITE_URL,
  SITE_NAME,
  generateWebsiteStructuredData,
  generateBreadcrumbStructuredData,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Formulation Collections & Ayurvedic Categories",
  description:
    "Browse our classical Ayurvedic collections: Herbal Supplements, Topical Personal Care, and Synergistic Regimen Kits formulated for vitality, endurance, and wellness.",
  alternates: {
    canonical: `${SITE_URL}/categories`,
  },
  openGraph: {
    title: `Formulation Collections & Ayurvedic Categories | ${SITE_NAME}`,
    description:
      "Browse our classical Ayurvedic collections: Herbal Supplements, Topical Personal Care, and Synergistic Regimen Kits.",
    url: `${SITE_URL}/categories`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-default.svg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Collections`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Formulation Collections & Ayurvedic Categories | ${SITE_NAME}`,
    description:
      "Browse our classical Ayurvedic collections: Herbal Supplements, Topical Personal Care, and Synergistic Regimen Kits.",
    images: [`${SITE_URL}/images/og-default.svg`],
  },
};

const categoryIcons = {
  supplements: Leaf,
  "personal-care": Sparkles,
  wellness: Shield,
};

const categoryImages: Record<string, string> = {
  supplements: "/images/categories/supplements.webp",
  "personal-care": "/images/categories/personal-care.webp",
  wellness: "/images/categories/wellness.webp",
};

export default function CategoriesPage() {
  const categories = getCategories();
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Collections", url: "/categories" },
  ]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebsiteStructuredData(),
            breadcrumbSchema,
          ]),
        }}
      />

      <div className="container py-6 sm:py-8 lg:py-10 pb-28 sm:pb-32 lg:pb-10">
        <div className="mb-6 sm:mb-8 pb-4 border-b border-[#9E8047]/25">
          <nav
            className="flex items-center gap-2 text-xs text-[#737373] mb-2 font-mono"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-[#1C1D1F] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#1C1D1F]">Collections</span>
          </nav>
          <h1 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">
            Formulation Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] mt-1 font-sans">
            Classical Rasayana remedies grouped by therapeutic intent and doshic calibration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {categories.map((cat) => {
            const Icon =
              categoryIcons[cat.slug as keyof typeof categoryIcons] || Leaf;
            const prods = getProductsByCategory(cat.slug);
            const imageSrc =
              categoryImages[cat.slug] || "/images/categories/supplements.webp";

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative bg-[#FAF7F2] rounded-2xl border border-[#9E8047]/25 overflow-hidden transition-all duration-300 hover:border-[#9E8047]/50 hover:shadow-lg flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-[#EAE4DC] overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                      {prods.length} {prods.length === 1 ? "Product" : "Products"}
                    </span>
                    <h2 className="font-heading text-lg font-medium">
                      {cat.name}
                    </h2>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#555555] line-clamp-2 mb-4 font-sans leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#9E8047]/15">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#9E8047]/10 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-[#9E8047]" />
                      </div>
                      <span className="text-xs font-medium text-[#1C1D1F]">
                        Explore Line
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9E8047] transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pharmacopeial Standards Strip */}
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#9E8047]/25 p-6 sm:p-8">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <span className="text-lg font-heading text-[#9E8047] block mb-1">
                100% Shodhana
              </span>
              <p className="text-xs text-[#555555] font-sans">
                Classical 7-step herbal and mineral detoxification processes
              </p>
            </div>
            <div className="border-y sm:border-y-0 sm:border-x border-[#9E8047]/20 py-4 sm:py-0">
              <span className="text-lg font-heading text-[#9E8047] block mb-1">
                NABL Tested
              </span>
              <p className="text-xs text-[#555555] font-sans">
                Every batch certified for zero heavy metals and chemical purity
              </p>
            </div>
            <div>
              <span className="text-lg font-heading text-[#9E8047] block mb-1">
                Discrete Delivery
              </span>
              <p className="text-xs text-[#555555] font-sans">
                Unmarked tamper-proof parcels across 19,000+ Indian PIN codes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
