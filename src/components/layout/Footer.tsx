'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#18191B] text-[#FAF7F2] border-t border-[#2C2D30] pt-12 pb-16 md:pb-12 text-xs font-sans">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-[#2C2D30]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Ayur Veda Global Home">
              <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/brand-logo.png"
                  alt="Ayur Veda Global"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-normal tracking-tight text-[#FAF7F2]">
                  Ayur Veda Global
                </span>
                <span className="text-[8.5px] uppercase tracking-[0.2em] text-[#9E8047] -mt-0.5 font-sans">
                  Classical Apothecary
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#999999] max-w-sm leading-relaxed">
              Classical Rasayana formulations engineered in compliance with AYUSH standards. Prepared with standardized Himalayan Shilajit, Ashwagandha, and Bhringraj — lab-certified for purity and delivered in 100% confidential unmarked parcels across India.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
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
                  className="w-8 h-8 rounded-full border border-[#999999]/30 flex items-center justify-center text-[#999999] hover:text-[#FAF7F2] hover:border-[#FAF7F2] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Formulations Column */}
          <div className="space-y-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FAF7F2]">
              Formulations
            </h3>
            <ul className="space-y-2 text-[#999999]">
              <li>
                <Link href="/shop" className="hover:text-[#FAF7F2] transition-colors">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/product/body-essential-nutrition" className="hover:text-[#FAF7F2] transition-colors">
                  BODY Essential Nutrition
                </Link>
              </li>
              <li>
                <Link href="/product/staymax-delay-spray" className="hover:text-[#FAF7F2] transition-colors">
                  STAYMAX+ Delay Spray
                </Link>
              </li>
              <li>
                <Link href="/product/vitality-power-combo" className="hover:text-[#FAF7F2] transition-colors">
                  Vitality &amp; Performance Combo
                </Link>
              </li>
              <li>
                <Link href="/product/hair-regrow-kit" className="hover:text-[#FAF7F2] transition-colors">
                  HAIR RE-GROW Complete Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Guidance Column */}
          <div className="space-y-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FAF7F2]">
              Guidance &amp; Care
            </h3>
            <ul className="space-y-2 text-[#999999]">
              <li>
                <a
                  href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20would%20like%20to%20consult%20with%20an%20Ayurvedic%20doctor."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Doctor Consultation (WhatsApp)
                </a>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FAF7F2] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-[#FAF7F2] transition-colors">
                  Track Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FAF7F2] transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FAF7F2] transition-colors">
                  Ayurvedic Heritage &amp; Science
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div className="space-y-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FAF7F2]">
              Assurances
            </h3>
            <ul className="space-y-2 text-[#999999]">
              <li>
                <Link href="/legal/shipping" className="hover:text-[#FAF7F2] transition-colors">
                  Discreet Shipping Guarantee
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-[#FAF7F2] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-[#FAF7F2] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/returns" className="hover:text-[#FAF7F2] transition-colors">
                  Returns &amp; Refunds
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Compliance & Disclaimer */}
        <div className="py-6 border-b border-[#2C2D30] text-[11px] text-[#999999] leading-relaxed">
          <p>
            <strong className="text-[#FAF7F2] font-medium">AYUSH Compliance Notice:</strong> Formulations are classical and proprietary Ayurvedic dietary supplements and personal care products formulated under AYUSH and GMP standards. These statements have not been evaluated by regulatory bodies to diagnose, treat, cure, or prevent any acute disease. Results may vary depending on individual constitution (Prakriti), diet, and consistency. Consult an Ayurvedic physician for tailored guidance.
          </p>
        </div>

        {/* Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#999999]">
          <p>© {new Date().getFullYear()} Ayur Veda Global. All rights reserved. 100% Confidential Delivery Nationwide.</p>
          <p className="font-mono text-[10px] text-[#737373]">ESTD. BHARAT • DISCREET ARCHIVAL DISPATCH</p>
        </div>
      </div>
    </footer>
  )
}