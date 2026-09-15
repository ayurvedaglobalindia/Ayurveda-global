/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ayurvedaglobal.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/admin/*', '/api/*', '/checkout/*', '/cart', '/wishlist', '/orders/*', '/track-order'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/admin/' },
      { userAgent: '*', disallow: '/api/' },
      { userAgent: '*', disallow: '/checkout/' },
      { userAgent: '*', disallow: '/cart' },
      { userAgent: '*', disallow: '/wishlist' },
      { userAgent: '*', disallow: '/orders/' },
      { userAgent: '*', disallow: '/track-order' },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ayurvedaglobal.com'}/sitemap-products.xml`,
    ],
  },
}