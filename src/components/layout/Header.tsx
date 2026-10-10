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
          ? "bg-[#FAF7F2]/88 backdrop-blur-[15px] border-b border-[#9E8047]/25 shadow-xs"
          : "bg-[#FAF7F2]/95 backdrop-blur-[15px] border-b border-[#9E8047]/15"
      }`}
      style={{ WebkitBackdropFilter: "blur(15px)" }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-3.5 gap-3 sm:gap-4 min-h-[58px] sm:min-h-[64px]">
          {/* Official Luxury Brand Lockup */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 group py-0.5"
            aria-label="Ayurveda Global Home"
          >
            {/* Logo Emblem: Scaled to 38px-40px (h-9.5 w-9.5 / sm:h-10 sm:w-10) with subtle depth shadow */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-full p-0.5 bg-white/80 border border-[#9E8047]/30 shadow-[0_2px_8px_rgba(31,51,42,0.12)] group-hover:shadow-[0_4px_12px_rgba(31,51,42,0.2)] transition-shadow">
               <img
                  src="/images/brand-logo.png"
                  alt="Ayurveda Global Emblem"
                  className="w-full h-full object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
               />
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <span className="font-serif text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-[#0f3822] transition-colors whitespace-nowrap block leading-tight">
                Ayurveda Global
              </span>
              <span className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.24em] text-[#8C703D] font-sans font-semibold whitespace-nowrap leading-none mt-0.5">
                Classical Apothecary
              </span>
            </div>
          </Link>

          {/* Clean Editorial Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-8"
            aria-label="Main Navigation"
          >
            {[
              { label: "Formulations", href: "/shop" },
              { label: "Heritage", href: "/about" },
              { label: "Vaidya Consult", href: "/consultation" },
              { label: "Journal", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#1F332A] hover:text-[#8C703D] transition-colors font-sans text-xs uppercase tracking-[0.14em] font-medium relative group/nav py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#8C703D] transition-all duration-300 group-hover/nav:w-full" />
              </Link>
            ))}
          </nav>

          {/* Attached Transparent Search Pill */}
          <div className="hidden lg:flex items-center flex-1 max-w-[240px] xl:max-w-xs mx-3">
            <button
              type="button"
              onClick={() => openSearch()}
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full bg-white/50 hover:bg-white/80 border border-[#2D4A3E]/25 hover:border-[#2D4A3E]/50 text-[#555555] text-xs transition-all backdrop-blur-md shadow-2xs group"
              aria-label="Search formulations"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#2D4A3E] group-hover:scale-110 transition-transform" />
                <span className="font-sans text-xs text-[#737373] group-hover:text-[#1C1D1F]">
                  Search formulations...
                </span>
              </div>
              <kbd className="text-[10px] font-mono bg-white/80 text-[#737373] px-1.5 py-0.5 rounded-sm border border-gray-200">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Search (Icon on small screens) */}
            <button
              type="button"
              onClick={() => openSearch()}
              className="lg:hidden p-1.5 sm:p-2 rounded-full text-[var(--color-forest-accent)] hover:bg-[var(--color-forest-accent)]/5 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* User Account */}
            <Link
              href="/account"
              className="p-1.5 sm:p-2 rounded-full text-[#1F332A] hover:bg-[#1F332A]/5 transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={openCartDrawer}
              className="relative p-1.5 sm:p-2 rounded-full text-[var(--color-forest-accent)] hover:bg-[var(--color-forest-accent)]/5 transition-colors"
              aria-label={isMounted ? `Cart, ${cartCount} items` : "Cart"}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {isMounted && cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#2D4A3E] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => openModal("mobile-menu")}
              className="md:hidden p-1.5 sm:p-2 rounded-full text-[var(--color-forest-accent)] hover:bg-[var(--color-forest-accent)]/5 transition-colors"
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
