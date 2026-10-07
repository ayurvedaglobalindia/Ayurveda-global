import { Metadata } from "next";
import {
  generateWebsiteStructuredData,
  generateOrganizationStructuredData,
} from "@/lib/seo";

// Import new redesign components
import { LuxuryHero } from "@/components/home/LuxuryHero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export const metadata: Metadata = {
  title: "Ayurveda Global | Ancient Wisdom for Modern Healing",
  description:
    "Pure, authentic & holistic wellness products powered by nature. Discover time-tested Ayurvedic remedies for a balanced life.",
  openGraph: {
    title: "Ayurveda Global | Ancient Wisdom for Modern Healing",
    description:
      "Pure, authentic & holistic wellness products powered by nature. Discover time-tested Ayurvedic remedies for a balanced life.",
    type: "website",
  },
};

export default function HomePage() {
  const structuredData = [
    generateWebsiteStructuredData(),
    generateOrganizationStructuredData(),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <LuxuryHero />
      <FeaturedProducts />
    </>
  );
}
