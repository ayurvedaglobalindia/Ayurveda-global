import { Metadata } from "next";
import BlogClient from "./BlogClient";
import { SITE_URL, SITE_NAME, generateBreadcrumbStructuredData } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ayurvedic Wellness Journal & Health Articles",
  description:
    "Explore in-depth articles on classical Ayurveda, herbal nutrition, Dinacharya (daily rituals), hair restoration, and ancient Rasayana vitality therapies.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: `Ayurvedic Wellness Journal & Health Articles | ${SITE_NAME}`,
    description:
      "Explore in-depth articles on classical Ayurveda, herbal nutrition, Dinacharya, and natural vitality therapies.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
  },
};

export default function BlogPage() {
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <BlogClient />
    </>
  );
}
