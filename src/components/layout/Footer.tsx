'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Instagram,
  Facebook,
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
    { label: 'Doctor Teleconsultation (BAMS)', href: 'https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20would%20like%20to%20consult%20with%20an%20Ayurvedic%20doctor.' },
    { label: 'WhatsApp Consultation Desk', href: 'https://wa.me/919123485451' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Frequently Asked Questions', href: '/faq' },
    { label: 'Track Your Order', href: '/track-order' },
    { label: 'Discreet Shipping Policy', href: '/legal/shipping' },
    { label: 'Returns & Refunds', href: '/legal/returns' },
  ],
  company: [
    { label: 'Health Journal & Research', href: '/about' },
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
    { label: 'Cookie Policy', href: '/legal/privacy' },
  ],
}

const trustBadges = [
  { icon: Lock, label: '100% Discreet Packaging', desc: 'Dispatched in plain unmarked boxes with zero sensitive labels' },
  { icon: RotateCcw, label: 'Cash on Delivery (COD)', desc: 'Pay safely at your doorstep via cash or instant UPI' },
  { icon: Truck, label: 'Free Express Shipping', desc: 'Pan-India delivery across 25,000+ pincodes on orders over ₹999' },
  { icon: Shield, label: 'AYUSH & GMP Certified', desc: 'Tested for heavy metals and purity with zero synthetic chemicals' },
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
        if (typeof window !== 'undefined') {
          const stored = JSON.parse(localStorage.getItem('avg_newsletter_subscribers') || '[]')
          if (!stored.includes(currentEmail)) {
            stored.push(currentEmail)
            localStorage.setItem('avg_newsletter_subscribers', JSON.stringify(stored))
          }
        }
      } catch {}
      setTimeout(() => setSubscribed(false), 5000)
    } else {
      setEmailError(true)
      setTimeout(() => setEmailError(false), 3000)
    }
  }

  return (
    <footer
      ref={footerRef}
      className="bg-[#07080B] text-[#FAF7EE] relative overflow-hidden border-t border-[#999999]/20 pb-16 md:pb-0"
    >
      {/* Top Gold Hairline */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D8C28A]/30 to-transparent" aria-hidden="true" />

      {/* Trust Badges Bar */}
      <div className="border-b border-[#999999]/20 py-4 sm:py-5 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="footer-badge flex items-start gap-3 p-3.5 rounded-2xl bg-[#11141E] border border-[#999999]/20 hover:border-[#6EE7B7]/40 transition-all duration-300 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-[#151926] border border-[#999999]/25 flex items-center justify-center flex-shrink-0 text-[#6EE7B7]">
                  <badge.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-heading text-xs sm:text-[13px] font-medium text-[#FAF7EE]">{badge.label}</p>
                  <p className="text-[10.5px] text-[#999999] mt-0.5 leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-8 sm:py-10 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6 footer-section">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3" aria-label="Ayur Veda Global Home">
              <div className="relative w-8.5 h-8.5 sm:w-9 sm:h-9 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/brand-logo.png"
                  alt="Ayur Veda Global"
                  width={34}
                  height={34}
                  className="object-contain filter drop-shadow-[0_2px_6px_rgba(216,194,138,0.25)]"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base sm:text-lg font-normal tracking-tight text-[#FAF7EE]">
                  Ayur Veda Global
                </span>
                <span className="text-[8px] sm:text-[8.5px] uppercase font-semibold tracking-[0.24em] text-[#D8C28A] -mt-0.5">
                  Classical Apothecary
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#999999] max-w-sm leading-relaxed font-sans">
              Rooted in the Charaka Samhita and certified under AYUSH clinical standards. Delivering authentic Rasayana chemistry and 100% confidential doorstep support across India.
            </p>

            {/* VIP Newsletter */}
            <div className="pt-2 border-t border-[#999999]/20">
              <p className="text-[11px] font-semibold text-[#D8C28A] uppercase tracking-[0.2em] mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#6EE7B7]" />
                Ayurvedic Wellness Dispatch
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  required
                  className={`w-full pl-3.5 pr-24 py-2.5 bg-[#11141E] border rounded-xl text-xs text-[#FAF7EE] placeholder-[#999999]/60 focus:outline-none focus:ring-1 focus:ring-[#6EE7B7] transition-all ${
                    emailError ? 'border-red-500' : 'border-[#999999]/25 hover:border-[#999999]/40'
                  }`}
                  aria-label="Email address for dispatch"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg bg-[#D8C28A] hover:bg-[#E6D5AC] text-[#08090C] font-semibold text-[11px] transition-all disabled:opacity-50"
                >
                  {subscribed ? 'Joined ✓' : 'Subscribe'}
                </button>
              </form>
              <p className="text-[10px] text-[#999999] mt-1.5">Private seasonal wellness dispatches. Zero marketing spam.</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2 border-t border-[#999999]/20">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/ayurveda.global?stkn=MTFvZHQ2NnltZHlwcA==', label: 'Instagram' },
                { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61594780446401', label: 'Facebook' },
                { icon: Youtube, href: 'https://youtube.com/@ayurvedaglobal?si=IDt-zzne1fhgLEJR', label: 'YouTube' },
              ].map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#11141E] border border-[#999999]/25 flex items-center justify-center text-[#D8C28A] hover:bg-[#D8C28A] hover:text-[#08090C] transition-all shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div className="footer-section">
            <h3 className="font-heading text-xs font-semibold mb-4 text-[#D8C28A] uppercase tracking-[0.2em]">
              The Formulations
            </h3>
            <nav className="space-y-2.5">
              {footerLinks.shop.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-[#999999] hover:text-[#FAF7EE] transition-colors group flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8C28A]/40 group-hover:bg-[#6EE7B7] transition-all" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support Column */}
          <div className="footer-section">
            <h3 className="font-heading text-xs font-semibold mb-4 text-[#D8C28A] uppercase tracking-[0.2em]">
              Client Concierge
            </h3>
            <nav className="space-y-2.5">
              {footerLinks.support.map(link => (
                link.href.startsWith('http') ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#999999] hover:text-[#FAF7EE] transition-colors group flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D8C28A]/40 group-hover:bg-[#6EE7B7] transition-all" />
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs text-[#999999] hover:text-[#FAF7EE] transition-colors group flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D8C28A]/40 group-hover:bg-[#6EE7B7] transition-all" />
                    {link.label}
                  </Link>
                )
              ))}
            </nav>
          </div>

          {/* Heritage Column */}
          <div className="footer-section">
            <h3 className="font-heading text-xs font-semibold mb-4 text-[#D8C28A] uppercase tracking-[0.2em]">
              Apothecary Heritage
            </h3>
            <nav className="space-y-2.5">
              {footerLinks.company.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-[#999999] hover:text-[#FAF7EE] transition-colors group flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8C28A]/40 group-hover:bg-[#6EE7B7] transition-all" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Statutory Regulatory Disclaimer */}
        <div className="mt-12 pt-6 border-t border-[#999999]/20 text-[11px] text-[#999999] leading-relaxed space-y-1.5 footer-section">
          <p>
            <strong className="text-[#FAF7EE]">AYUSH &amp; Statutory Compliance Notice:</strong> Statements regarding dietary supplements and herbal wellness products have not been evaluated by the FDA or the Drug Controller General of India. Ayur Veda Global products are classical and proprietary Ayurvedic formulations intended to support natural stamina, vitality, and well-being. They are not intended to diagnose, treat, cure, or prevent any acute or chronic medical condition. Individual results may vary based on physiological constitution (Prakriti), lifestyle, and consistent usage. Always read packaging labels and consult an Ayurvedic physician or qualified healthcare provider before initiating any new supplement regimen.
          </p>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-6 pt-6 border-t border-[#999999]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#999999] footer-section">
          <p>© {new Date().getFullYear()} Ayur Veda Global. All rights reserved. AYUSH Ministry Licensed &amp; GMP Certified.</p>
          <div className="flex flex-wrap items-center gap-6">
            {footerLinks.legal.map(link => (
              <Link key={link.href} href={link.href} className="hover:text-[#D8C28A] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Consultation Action Bar */}
      <div className="bg-[#07080B] border-t border-[#999999]/20 py-3.5 relative z-10">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#6EE7B7] animate-pulse" />
            <span className="text-xs text-[#FAF7EE] font-medium">
              Chief Ayurvedic Vaidya Desk Online for Confidential Guidance
            </span>
          </div>
          <a
            href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20want%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#D8C28A] hover:bg-[#E6D5AC] text-[#08090C] transition-all shadow-md shadow-[#D8C28A]/20"
          >
            <span>Confidential WhatsApp Order / Advice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}