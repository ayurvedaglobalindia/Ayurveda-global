/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User, Leaf } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";

export function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { getItemCount } = useCartStore();
  const { openModal, openCartDrawer, openSearch } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full transition-all duration-300 z-50 sticky top-0 ${
        isScrolled
          ? "bg-[#E8ECE9]/90 backdrop-blur-md border-b border-[#2D4A3E]/10 shadow-sm"
          : "bg-[#E8ECE9]"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 group py-1"
            aria-label="Ayurveda Global Home"
          >
            <div className="relative w-11 h-11 flex-shrink-0">
               <img
                  src="/images/brand-logo.png"
                  alt="Ayurveda Global Logo"
                  className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
               />
            </div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1F332A] transition-colors">
              Ayurveda Global
            </span>
          </Link>

          {/* Clean Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main Navigation"
          >
            {[
              { label: "Products", href: "/shop" },
              { label: "Our Story", href: "/about" },
              { label: "Consultation", href: "/consultation" },
              { label: "Wellness Blog", href: "/blog" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#3D5A49] hover:text-[#1F332A] transition-colors font-sans text-sm font-medium tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Search */}
            <button
              type="button"
              onClick={() => openSearch()}
              className="p-2 rounded-full text-[#2D4A3E] hover:bg-[#2D4A3E]/5 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* User Account */}
            <Link
              href="/account"
              className="hidden sm:block p-2 rounded-full text-[#2D4A3E] hover:bg-[#2D4A3E]/5 transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={openCartDrawer}
              className="relative p-2 rounded-full text-[#2D4A3E] hover:bg-[#2D4A3E]/5 transition-colors"
              aria-label={isMounted ? `Cart, ${cartCount} items` : "Cart"}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {isMounted && cartCount > 0 && (
                <span className="absolute 0 right-0 w-4 h-4 rounded-full bg-[#2D4A3E] text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => openModal("mobile-menu")}
              className="md:hidden p-2 rounded-full text-[#2D4A3E] hover:bg-[#2D4A3E]/5 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
