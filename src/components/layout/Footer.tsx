'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Truck, Shield, RotateCcw, Headphones, Leaf } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Supplements', href: '/categories/supplements' },
    { label: 'Personal Care', href: '/categories/personal-care' },
    { label: 'Wellness', href: '/categories/wellness' },
    { label: 'Best Sellers', href: '/shop?sort=popular' },
    { label: 'New Arrivals', href: '/shop?sort=newest' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Track Order', href: '/track-order' },
    { label: 'Shipping Policy', href: '/legal/shipping' },
    { label: 'Returns & Refunds', href: '/legal/returns' },
    { label: 'Wholesale Enquiry', href: '/contact?type=wholesale' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Philosophy', href: '/about#philosophy' },
    { label: 'Ingredients', href: '/about#ingredients' },
    { label: 'Sustainability', href: '/about#sustainability' },
    { label: 'Careers', href: '/contact?type=careers' },
    { label: 'Press', href: '/contact?type=press' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
    { label: 'Accessibility', href: '/legal/accessibility' },
  ],
}

const trustBadges = [
  { icon: Truck, label: 'Free Shipping', desc: 'On orders above ₹999' },
  { icon: Shield, label: 'Authentic Products', desc: '100% genuine herbs' },
  { icon: RotateCcw, label: 'Easy Returns', desc: '7-day return policy' },
  { icon: Headphones, label: 'Customer Support', desc: 'WhatsApp & Email' },
]

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/ayurvedaglobal', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/ayurvedaglobal', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/ayurvedaglobal', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/ayurvedaglobal', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-ayur-forest-deep text-ayur-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/images/textures/botanical-lines.svg')" }} />
      <div className="container py-16 lg:py-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3" aria-label="Ayur Veda Global Home">
              <div className="relative w-12 h-12 flex items-center justify-center bg-transparent">
                <Image
                  src="/images/logo.png"
                  alt="Ayur Veda Global"
                  fill
                  className="object-contain"
                  priority
                  sizes="48px"
                />
              </div>
              <span className="font-heading text-2xl font-medium tracking-tight">Ayur Veda Global</span>
            </Link>
            <p className="text-ayur-sand max-w-xs text-base leading-relaxed">
              Bringing authentic Ayurvedic wisdom to modern wellness. Pure herbs, trusted formulations, sustainable practices.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-ayur-black/30 flex items-center justify-center text-ayur-sand hover:bg-ayur-gold hover:text-ayur-black transition-all duration-300 focus-visible-ring group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-medium mb-4 text-ayur-cream">Shop</h3>
            <nav className="space-y-3">
              {footerLinks.shop.map(link => (
                <Link key={link.href} href={link.href} className="block text-ayur-sand hover:text-ayur-gold transition-colors duration-300 group">
                  <span className="inline-block transition-transform group-hover:translate-x-1">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-heading text-lg font-medium mb-4 text-ayur-cream">Support</h3>
            <nav className="space-y-3">
              {footerLinks.support.map(link => (
                <Link key={link.href} href={link.href} className="block text-ayur-sand hover:text-ayur-gold transition-colors duration-300 group">
                  <span className="inline-block transition-transform group-hover:translate-x-1">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-heading text-lg font-medium mb-4 text-ayur-cream">Company</h3>
            <nav className="space-y-3">
              {footerLinks.company.map(link => (
                <Link key={link.href} href={link.href} className="block text-ayur-sand hover:text-ayur-gold transition-colors duration-300 group">
                  <span className="inline-block transition-transform group-hover:translate-x-1">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ayur-forest/50 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-ayur-black/30 rounded-xl border border-ayur-forest/30 hover:border-ayur-gold/50 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-ayur-forest/50 flex items-center justify-center flex-shrink-0 group-hover:bg-ayur-gold/20 transition-colors">
                  <badge.icon className="w-5 h-5 text-ayur-gold group-hover:text-ayur-crimson transition-colors" />
                </div>
                <div>
                  <p className="font-medium text-ayur-cream">{badge.label}</p>
                  <p className="text-sm text-ayur-sand">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ayur-sand text-sm">
              © {new Date().getFullYear()} Ayur Veda Global. All rights reserved.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {footerLinks.legal.map(link => (
                <Link key={link.href} href={link.href} className="text-sm text-ayur-sand hover:text-ayur-gold transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <WhatsAppFooterCTA />
    </footer>
  )
}

function WhatsAppFooterCTA() {
  const handleWhatsAppClick = () => {
    const message = buildProductEnquiryMessage({
      customerName: '',
      productName: 'General Enquiry',
      quantity: 1,
      enquiry: 'I would like to know more about your products and offerings.',
      source: 'contact',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  return (
    <div className="bg-ayur-black/50 border-t border-ayur-forest/50 py-6 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ayur-gold to-ayur-copper flex items-center justify-center flex-shrink-0 animate-pulse-gold">
              <svg className="w-6 h-6 text-ayur-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2-.2-.3-.3-.3-.5 0-.2 0-.4-.1-.5-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5 0 1.5 1.1 2.9 1.2 3.1.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.3-.2-.6-.3" />
              </svg>
            </div>
            <div>
              <p className="font-heading text-lg font-medium text-ayur-cream">Connect on WhatsApp</p>
              <p className="text-ayur-sand text-sm">Questions? Orders? We're here to help.</p>
            </div>
          </div>
          <Button
            variant="gold"
            size="lg"
            onClick={handleWhatsAppClick}
            className="whitespace-nowrap animate-pulse-gold"
          >
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}