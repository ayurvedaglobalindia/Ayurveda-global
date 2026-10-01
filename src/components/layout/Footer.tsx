'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Truck,
  Shield,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  Check,
} from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'Vitality Power Combo (29% OFF)', href: '/product/vitality-power-combo' },
    { label: 'BODY Nutrition (60 Caps)', href: '/product/body-essential-nutrition' },
    { label: 'STAYMAX+ Delay Spray (30 ml)', href: '/product/staymax-delay-spray' },
    { label: 'Herbal Supplements', href: '/shop?category=supplements' },
    { label: 'Personal Care & Sprays', href: '/shop?category=personal-care' },
  ],
  support: [
    { label: 'Doctor Teleconsultation (BAMS)', href: '/consultation' },
    { label: 'WhatsApp Consultation Desk', href: 'https://wa.me/919123485451' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Frequently Asked Questions', href: '/faq' },
    { label: 'Track Your Order', href: '/track-order' },
    { label: 'Discreet Shipping Policy', href: '/legal/shipping' },
    { label: 'Returns & Refunds', href: '/legal/returns' },
  ],
  company: [
    { label: 'Health Journal & Research', href: '/blog' },
    { label: 'Our Ayurvedic Heritage', href: '/about' },
    { label: 'Botanical Science & Shilajit', href: '/about#ingredients' },
    { label: 'Lab Screening & GMP Certified', href: '/about#philosophy' },
    { label: 'Sustainable Sourcing', href: '/about#sustainability' },
    { label: 'Careers', href: '/contact?type=careers' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Discreet Delivery Guarantee', href: '/legal/shipping' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
  ],
}

const trustBadges = [
  { icon: Truck, label: 'Free Express Shipping', desc: 'On all orders above ₹999 across India' },
  { icon: Lock, label: '100% Discreet Packaging', desc: 'Plain unmarked brown box guarantee' },
  { icon: Shield, label: 'Ayush & GMP Certified', desc: 'Tested for heavy metals and purity' },
  { icon: RotateCcw, label: 'Cash on Delivery (COD)', desc: 'Pay safely at your doorstep' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (!footerRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.from('.footer-section', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })

      tl.from('.footer-badge', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.4')
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email.trim() && emailRegex.test(email)) {
      setSubscribed(true)
      setEmailError(false)
      const currentEmail = email.trim()
      setEmail('')
      try {
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: currentEmail }),
        })
      } catch (err) {
        console.error('Newsletter subscription note:', err)
      }
      setTimeout(() => setSubscribed(false), 5000)
    } else {
      setEmailError(true)
      setTimeout(() => setEmailError(false), 3000)
    }
  }

  return (
    <footer
      ref={footerRef}
      className="bg-ayur-void text-ayur-cream relative overflow-hidden border-t border-ayur-gold/15 pb-16 md:pb-0"
    >
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-ayur-gold/3 rounded-full blur-[200px] pointer-events-none animate-breathe" aria-hidden="true" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-ayur-emerald-glow/3 rounded-full blur-[200px] pointer-events-none animate-breathe" style={{ animationDelay: '-2s' }} aria-hidden="true" />

      {/* Gold Hairline Border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ayur-gold/40 to-transparent" aria-hidden="true" />

      {/* Trust Badges Bar */}
      <div className="border-b border-ayur-forest-dark/50 py-10 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trustBadges.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="footer-badge flex items-start gap-3.5 p-4 rounded-2xl bg-ayur-charcoal/80 border border-ayur-forest-dark/50 hover:border-ayur-gold/40 shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-ayur-gold/10 border border-ayur-gold/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-ayur-gold/20 transition-all duration-300 shadow-[0_0_12px_rgba(201,168,76,0.1)]">
                  <badge.icon className="w-5 h-5 text-ayur-gold" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-ayur-ivory">{badge.label}</p>
                  <p className="text-xs text-ayur-stone mt-0.5 leading-relaxed">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-14 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6 footer-section">
            <Link href="/" className="flex items-center gap-3" aria-label="Ayur Veda Global Home">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Ayur Veda Global"
                  width={48}
                  height={48}
                  className="object-contain filter drop-shadow-[0_2px_8px_rgba(201,168,76,0.3)]"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-ayur-ivory">
                  Ayur Veda Global
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-ayur-gold">
                  Authentic Herbal Wellness
                </span>
              </div>
            </Link>

            <p className="text-sm text-ayur-stone max-w-sm leading-relaxed">
              Bridging centuries of classical Ayurvedic wisdom with modern clinical standards.
              Empowering vitality with pure botanicals and 100% confidential doorstep support across India.
            </p>

            {/* VIP Newsletter */}
            <div className="pt-2 border-t border-ayur-forest-dark/50">
              <p className="text-xs font-bold text-ayur-gold-light uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-ayur-gold" />
                Join Ayurvedic VIP Club
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className={`w-full pl-4 pr-24 py-3 bg-ayur-charcoal border rounded-xl text-sm text-ayur-ivory placeholder-ayur-stone focus:outline-none focus:ring-2 focus:ring-ayur-gold transition-all ${
                    emailError ? 'border-ayur-crimson' : 'border-ayur-forest-dark/50 hover:border-ayur-gold/30'
                  }`}
                  aria-label="Email address for VIP club"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-gradient-to-r from-ayur-gold-light to-ayur-gold text-ayur-void font-bold text-xs hover:brightness-110 transition-all shadow-md disabled:opacity-50"
                >
                  {subscribed ? 'Subscribed ✓' : 'Join Club'}
                </button>
              </form>
              <p className="text-[11px] text-ayur-stone/70 mt-2">Exclusive offers, early access & Ayurvedic insights. No spam.</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 border-t border-ayur-forest-dark/50">
              {[
                { icon: Instagram, href: 'https://instagram.com/ayurvedaglobal', label: 'Instagram' },
                { icon: Facebook, href: 'https://facebook.com/ayurvedaglobal', label: 'Facebook' },
                { icon: Twitter, href: 'https://twitter.com/ayurvedaglobal', label: 'Twitter' },
                { icon: Youtube, href: 'https://youtube.com/ayurvedaglobal', label: 'YouTube' },
              ].map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-ayur-charcoal border border-ayur-forest-dark/50 flex items-center justify-center text-ayur-gold hover:bg-ayur-gold hover:text-ayur-void transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(201,168,76,0.3)] group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div className="footer-section">
            <h3 className="font-heading text-sm font-bold mb-5 text-ayur-gold-light uppercase tracking-wider">
              Specialized Catalog
            </h3>
            <nav className="space-y-3">
              {footerLinks.shop.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-ayur-stone hover:text-ayur-gold-light transition-colors group flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ayur-gold/30 group-hover:bg-ayur-gold group-hover:scale-150 transition-all" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support Column */}
          <div className="footer-section">
            <h3 className="font-heading text-sm font-bold mb-5 text-ayur-gold-light uppercase tracking-wider">
              Client Support
            </h3>
            <nav className="space-y-3">
              {footerLinks.support.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-ayur-stone hover:text-ayur-gold-light transition-colors group flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ayur-gold/30 group-hover:bg-ayur-gold group-hover:scale-150 transition-all" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Heritage Column */}
          <div className="footer-section">
            <h3 className="font-heading text-sm font-bold mb-5 text-ayur-gold-light uppercase tracking-wider">
              Ayurvedic Heritage
            </h3>
            <nav className="space-y-3">
              {footerLinks.company.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-ayur-stone hover:text-ayur-gold-light transition-colors group flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ayur-gold/30 group-hover:bg-ayur-gold group-hover:scale-150 transition-all" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Statutory Regulatory Disclaimer */}
        <div className="mt-12 pt-6 border-t border-ayur-forest-dark/30 text-[11px] text-ayur-stone/60 leading-relaxed space-y-1.5 footer-section">
          <p>
            <strong className="text-ayur-stone/80">Ayush & Regulatory Compliance Disclaimer:</strong> Statements regarding dietary supplements and herbal wellness products have not been evaluated by the FDA or the Drug Controller General of India. Ayur Veda Global products are classical and proprietary Ayurvedic formulations intended to support natural stamina, vitality, and well-being. They are not intended to diagnose, treat, cure, or prevent any acute or chronic medical condition. Individual results may vary based on physiological constitution (Prakriti), lifestyle, and consistent usage. Always read packaging labels and consult an Ayurvedic physician or qualified healthcare provider before initiating any new supplement regimen.
          </p>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-6 pt-6 border-t border-ayur-forest-dark/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ayur-stone/70 footer-section">
          <p>© {new Date().getFullYear()} Ayur Veda Global. All rights reserved. Ayush Approved & GMP Certified.</p>
          <div className="flex flex-wrap items-center gap-6">
            {footerLinks.legal.map(link => (
              <Link key={link.href} href={link.href} className="hover:text-ayur-gold-light transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Consultation Action Bar */}
      <div className="bg-ayur-obsidian border-t border-ayur-gold/15 py-4 relative z-10">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-ayur-gold animate-pulse" />
            <span className="text-xs text-ayur-gold-light font-semibold">
              Live Ayurvedic Consultants Online Now
            </span>
          </div>
          <a
            href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20want%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-emerald inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold shadow-md transition-all hover:shadow-lg"
          >
            <span>Confidential WhatsApp Order / Advice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}