import { Metadata } from "next";
import {
  generateWebsiteStructuredData,
  generateOrganizationStructuredData,
} from "@/lib/seo";

// Redesigned & Complete Home Page Components
import { LuxuryHero } from "@/components/home/LuxuryHero";
import { HomeTrustBar } from "@/components/home/HomeTrustBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HomeAllProducts } from "@/components/home/HomeAllProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { AyurvedaPhilosophySection } from "@/components/home/AyurvedaPhilosophySection";
import { DoctorConsultBanner } from "@/components/home/DoctorConsultBanner";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { HomeFAQ } from "@/components/home/HomeFAQ";

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

      {/* 2. Trust Pillars & Clinical Certifications */}
      <HomeTrustBar />

      {/* 3. Featured Products Slider (Apothecary Showcase) */}
      <FeaturedProducts />

      {/* 4. Complete Products Grid with Category Tabs (ALL Products on Home) */}
      <HomeAllProducts />

      {/* 5. Targeted Collections Showcase */}
      <CategoryShowcase />

      {/* 6. Ayurvedic Heritage & The 3 Doshas Interactive Science */}
      <AyurvedaPhilosophySection />

      {/* 7. Free Doctor Consultation WhatsApp Banner */}
      <DoctorConsultBanner />

      {/* 8. Verified Patron Reviews & Testimonials */}
      <HomeTestimonials />

      {/* 9. Interactive Home FAQ Accordion */}
      <HomeFAQ />
    </>
  );
}
