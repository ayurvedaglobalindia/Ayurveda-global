import { Metadata } from "next";
import {
  generateWebsiteStructuredData,
  generateOrganizationStructuredData,
} from "@/lib/seo";

// D2C Premium Home Page Components
import { LuxuryHero } from "@/components/home/LuxuryHero";
import { ConcernsScroller } from "@/components/home/ConcernsScroller";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { AyurvedaPhilosophySection } from "@/components/home/AyurvedaPhilosophySection";
import { DoctorConsultBanner } from "@/components/home/DoctorConsultBanner";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { HomeTrustBar } from "@/components/home/HomeTrustBar";

export const metadata: Metadata = {
  title: "Ayurveda Global | Ancient Ayurvedic Wisdom, Modern Wellness",
  description:
    "Pure, authentic & holistic wellness formulations powered by standardized botanical extracts. Shop BODY Essential Nutrition, STAYMAX+ Spray, and complete hair regrowth kits.",
  openGraph: {
    title: "Ayurveda Global | Ancient Ayurvedic Wisdom, Modern Wellness",
    description:
      "Pure, authentic & holistic wellness formulations powered by standardized botanical extracts. Discrete delivery across India.",
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

      {/* 1. Luxury Hero Banner */}
      <LuxuryHero />

      {/* 2. Shop By Health Concern Circular Scroller */}
      <ConcernsScroller />

      {/* 3. Best Sellers Carousel */}
      <FeaturedProducts />

      {/* 3. Shop by Category */}
      <CategoryShowcase />

      {/* 4. Ayurvedic Science & Dosha Heritage */}
      <AyurvedaPhilosophySection />

      {/* 5. Free Doctor Consultation WhatsApp Banner */}
      <DoctorConsultBanner />

      {/* 6. Customer Reviews & Testimonials */}
      <HomeTestimonials />

      {/* 7. Frequently Asked Questions */}
      <HomeFAQ />

      {/* 8. Closing Trust Badges Strip (Right Above Footer) */}
      <HomeTrustBar />
    </>
  );
}
