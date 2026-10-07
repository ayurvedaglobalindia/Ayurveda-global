/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1C1D1F] text-white pt-10 pb-8 border-t border-[var(--color-forest-accent)]">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-5">
          {/* Col 1: Brand & Social */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-24 h-24 flex-shrink-0 bg-white/5 rounded-full p-2 border border-white/10 group-hover:bg-white/10 transition-colors duration-300">
                 <img
                    src="/images/brand-logo.png"
                    alt="Ayurveda Global Logo"
                    className="w-full h-full object-contain filter brightness-110 drop-shadow-md"
                 />
              </div>
              <span className="font-serif text-3xl font-bold tracking-tight text-[#E8ECE9]">
                Ayurveda Global
              </span>
            </Link>
            <p className="font-sans text-sm text-[#999999] font-light leading-relaxed max-w-xs">
              Ancient botanical wisdom curated for modern vitality. 100%
              natural, ethical, and clinically verified formulations.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@ayurvedaglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919123485451"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-sans font-medium text-[#E8ECE9] tracking-wider uppercase text-xs mb-4">
              Shop &amp; Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/supplements"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  Herbal Supplements
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/personal-care"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  Skin & Hair Care
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  Wellness Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Help & Support */}
          <div>
            <h3 className="font-sans font-medium text-[#E8ECE9] tracking-wider uppercase text-xs mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/consultation"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  Vaidya Consultation
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/shipping"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/returns"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div>
            <h3 className="font-sans font-medium text-[#E8ECE9] tracking-wider uppercase text-xs mb-4">
              Contact Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2D4A3E] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#999999] font-light leading-relaxed">
                  Ayur Veda Global HQ,
                  <br />
                  Industrial Area, Phase 1,
                  <br />
                  New Delhi, 110020
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#2D4A3E] flex-shrink-0" />
                <a
                  href="mailto:ayurvedaglobalindia@gmail.com"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  ayurvedaglobalindia@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#2D4A3E] flex-shrink-0" />
                <a
                  href="tel:+919123485451"
                  className="text-sm text-[#999999] hover:text-white transition-colors font-light"
                >
                  +91 91234 85451
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#333333] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#737373] font-light">
            &copy; {new Date().getFullYear()} Ayurveda Global. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#737373] font-light">
            <Link
              href="/legal/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
