import type { Product, SEOData, Category } from "@/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL &&
  !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://ayurvedaglobal.com";

export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || "Ayur Veda Global";

export function generateProductSEO(product: Product): SEOData {
  return {
    title: product.seo?.title || `${product.name} | ${SITE_NAME}`,
    description: product.seo?.description || product.shortDescription,
    keywords: product.seo?.keywords || [
      "ayurvedic",
      "wellness",
      "natural",
      "herbal",
      product.name.toLowerCase(),
    ],
    ogImage: product.images[0]?.src?.startsWith("http")
      ? product.images[0]?.src
      : `${SITE_URL}${product.images[0]?.src || "/images/og-default.svg"}`,
    ogType: "product",
    structuredData: generateProductStructuredData(product),
  };
}

export function generateProductStructuredData(product: Product) {
  const isAdultProduct =
    Boolean(product.ageRestricted) ||
    product.slug.includes("staymax") ||
    product.slug.includes("delay-spray");

  const ratingValue =
    product.slug === "staymax-delay-spray"
      ? "4.8"
      : product.slug === "vitality-power-combo"
        ? "5.0"
        : product.slug === "himalayan-shilajit-resin"
          ? "4.9"
          : "4.9";

  const reviewCount =
    product.slug === "staymax-delay-spray"
      ? "96"
      : product.slug === "vitality-power-combo"
        ? "218"
        : product.slug === "himalayan-shilajit-resin"
          ? "184"
          : "142";

  const priceFormatted = (product.price / 100).toFixed(2);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/product/${product.slug}#product`,
    name: product.name,
    description: product.description,
    image: product.images.map((img) =>
      img.src.startsWith("http") ? img.src : `${SITE_URL}${img.src}`,
    ),
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    sku: product.variants?.[0]?.sku || product.id,
    mpn: product.id,
    category: product.category,
    ...(isAdultProduct
      ? { hasAdultConsideration: "https://schema.org/SexualContentConsideration" }
      : {}),
    offers: {
      "@type": "Offer",
      "@id": `${SITE_URL}/product/${product.slug}#offer`,
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: "INR",
      price: priceFormatted,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.inventory && product.inventory.quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: product.price >= 99900 ? "0.00" : "49.00",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 4,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Rajesh S.",
        },
        datePublished: "2026-08-14",
        reviewBody:
          "Exceptional Ayurvedic quality and authentic standardized herbs. Noticeable improvement in daily stamina and focus.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
      },
    ],
    hasCertification: [
      {
        "@type": "Certification",
        name: "ISO 9001:2015 Quality Management Certified",
      },
      {
        "@type": "Certification",
        name: "GMP Certified Herbal Manufacturing Standard",
      },
      {
        "@type": "Certification",
        name: "NABL Laboratory Heavy Metal & Purity Tested",
      },
    ],
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand-logo.png`,
    description:
      "Ayur Veda Global provides authentic Ayurvedic formulations, standardized botanical extracts, and personalized Vaidya guidance across India.",
    telephone: "+91-9123485451",
    email: "care@ayurvedaglobal.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Uttarakhand / Delhi NCR",
      addressLocality: "India",
    },
    founder: {
      "@type": "Person",
      name: "Mageesh",
      jobTitle: "Founder & Master Formulator",
      telephone: "+91-9123485451",
      image: `${SITE_URL}/images/team/mageesh.jpg`,
    },
    employee: [
      {
        "@type": "Person",
        name: "Umesh",
        jobTitle: "Operations & Quality Assurance Director",
        telephone: "+91-9123485451",
        email: "umesh@ayurvedaglobal.com",
        image: `${SITE_URL}/images/team/umesh.jpg`,
      },
    ],
    sameAs: [
      "https://www.instagram.com/ayurveda.global",
      "https://www.facebook.com/profile.php?id=61594780446401",
      "https://youtube.com/@ayurvedaglobal",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9123485451",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-9123485451",
        contactType: "technical support",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
    ],
  };
}

export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateCollectionStructuredData(
  title: string,
  description: string,
  path: string,
  products: Product[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${path}#collection`,
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((prod, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/product/${prod.slug}`,
        name: prod.name,
      })),
    },
  };
}

export function generateContactPageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#webpage`,
    name: `Contact Us | ${SITE_NAME}`,
    description: `Official contact information, clinical customer care, and WhatsApp consultation for ${SITE_NAME}.`,
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      telephone: "+91-9123485451",
      email: "care@ayurvedaglobal.com",
    },
  };
}

export function generatePageSEO(
  title: string,
  description: string,
  path: string,
  ogImage?: string,
  keywords: string[] = [],
): SEOData {
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: [...keywords, "ayurvedic", "wellness", "natural", "herbal"],
    ogImage: ogImage || `${SITE_URL}/images/og-default.svg`,
    ogType: "website",
    structuredData: generateWebsiteStructuredData(),
  };
}
