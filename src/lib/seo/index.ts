import type { Product, SEOData } from '@/types'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayurvedaglobal.com'
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Ayur Veda Global'

export function generateProductSEO(product: Product): SEOData {
  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    ogImage: product.images[0]?.src,
    ogType: 'product',
    structuredData: generateProductStructuredData(product),
  }
}

export function generateProductStructuredData(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map(img => `${SITE_URL}${img.src}`),
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    sku: product.variants[0]?.sku || product.id,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: (product.price / 100).toFixed(2),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inventory.quantity > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '0',
    },
  }
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    founder: {
      '@type': 'Person',
      name: 'Mageesh',
      jobTitle: 'Owner',
      telephone: '+91-9123485451',
      image: `${SITE_URL}/images/team/mageesh.jpg`,
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Umesh',
        jobTitle: 'Manager',
        telephone: '+91-9123485451',
        email: 'umesh@ayurvedaglobal.com',
        image: `${SITE_URL}/images/team/umesh.jpg`,
      },
    ],
    sameAs: [
      'https://www.instagram.com/ayurvedaglobal',
      'https://www.facebook.com/ayurvedaglobal',
      'https://twitter.com/ayurvedaglobal',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9123485451',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generatePageSEO(
    title: string,
    description: string,
    path: string,
    ogImage?: string,
    keywords: string[] = []
  ): SEOData {
    return {
      title: `${title} | ${SITE_NAME}`,
      description,
      keywords: [...keywords, 'ayurvedic', 'wellness', 'natural', 'herbal'],
      ogImage: ogImage || `${SITE_URL}/images/og-default.svg`,
      ogType: 'website',
      structuredData: generateWebsiteStructuredData(),
    }
  }