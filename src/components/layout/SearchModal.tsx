"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  Leaf,
  Tag,
  ShieldCheck,
  HeartPulse,
  CornerDownLeft,
} from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { getAllProducts, getProductImage } from "@/lib/products/registry";
import { formatINR } from "@/lib/utils/formatters";
import type { Product } from "@/types";

const POPULAR_SEARCHES = [
  "Vitality Power Combo",
  "BODY Essential Nutrition",
  "STAYMAX+ Delay Spray",
  "HAIR RE-GROW Kit",
  "Scalp Revitalizing Oil",
  "Hair Growth Capsules",
  "Safed Musli",
  "Bhringraj Oil",
];

const QUICK_CATEGORIES = [
  {
    label: "Herbal Supplements",
    href: "/shop?category=supplements",
    icon: Leaf,
  },
  {
    label: "Men's Personal Care",
    href: "/shop?category=personal-care",
    icon: Tag,
  },
  {
    label: "Power Combos (Save 29%)",
    href: "/shop?category=wellness",
    icon: Sparkles,
  },
];

export function SearchModal() {
  const router = useRouter();
  const { isSearchOpen, closeSearch, openSearch } = useUIStore();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        } else {
          openSearch();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, openSearch, closeSearch]);

  // Scroll lock & Escape key handler
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleEscape);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus input on open
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timeout);
    };
  }, [isSearchOpen, closeSearch]);

  // Reset query on close
  useEffect(() => {
    if (!isSearchOpen) {
      setQuery("");
    }
  }, [isSearchOpen]);

  if (!mounted) return null;

  const allProducts = getAllProducts();

  // Match products against query
  const matchingProducts: Product[] = query.trim()
    ? allProducts.filter((p) => {
        const q = query.toLowerCase().trim();
        const searchableFields = [
          p.name,
          p.tagline,
          p.description,
          p.shortDescription || "",
          p.category,
          ...(p.tags || []),
          ...(p.ingredients || []),
        ]
          .join(" ")
          .toLowerCase();
        return searchableFields.includes(q);
      })
    : [];

  const executeSearch = (searchTerm: string) => {
    const term = searchTerm.trim();
    if (!term) return;
    closeSearch();
    router.push(`/shop?q=${encodeURIComponent(term)}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      executeSearch(query);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[999] overflow-y-auto overscroll-contain"
          role="dialog"
          aria-modal="true"
          aria-label="Search apothecary formulations"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs -z-10"
            aria-hidden="true"
          />

          {/* Centering wrapper with pointer-events isolation */}
          <div className="flex min-h-full items-start justify-center p-3 sm:p-6 pt-14 sm:pt-20 text-center pointer-events-none">
            {/* Search Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="pointer-events-auto relative w-full max-w-2xl bg-[#FAF7F2] border border-[#9E8047]/25 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-[#1C1D1F] flex flex-col text-left my-auto sm:my-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Search Input Bar */}
              <form
                onSubmit={handleFormSubmit}
                className="relative border-b border-[#9E8047]/25 bg-[#FFFFFF]"
              >
                <div className="flex items-center px-4 sm:px-6 py-3.5 sm:py-4 gap-3">
                  <Search className="w-5 h-5 text-[#4E5F52] flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search formulations, herbs (e.g. Ashwagandha, Bhringraj, Delay Spray)..."
                    className="w-full bg-transparent text-sm sm:text-base text-[#1C1D1F] placeholder-[#999999] focus:outline-none caret-[#4E5F52]"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      className="p-1 rounded-full text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors"
                      aria-label="Clear search query"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="p-1.5 rounded-xl text-[#737373] hover:text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1"
                    aria-label="Close search modal"
                  >
                    <span className="hidden sm:inline text-[10px] font-mono uppercase bg-[#FAF7F2] border border-[#9E8047]/25 px-1.5 py-0.5 rounded text-[#737373]">
                      ESC
                    </span>
                    <X className="w-5 h-5 sm:hidden" />
                  </button>
                </div>
              </form>

              {/* Results & Suggestions Scrollable Area */}
              <div className="max-h-[65vh] overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-5">
                {query.trim() ? (
                  /* LIVE QUERY RESULTS */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#737373] px-1 font-semibold uppercase tracking-wider">
                      <span>Matching Formulations</span>
                      <span className="text-[#4E5F52]">
                        {matchingProducts.length} Found
                      </span>
                    </div>

                    {matchingProducts.length > 0 ? (
                      <div className="space-y-2.5">
                        {matchingProducts.map((product) => {
                          const img = getProductImage(
                            product,
                            product.id,
                            "thumb",
                          );
                          const hasDiscount =
                            product.compareAtPrice &&
                            product.compareAtPrice > product.price;
                          return (
                            <Link
                              key={product.id}
                              href={`/product/${product.slug || product.id}`}
                              onClick={closeSearch}
                              className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FFFFFF] hover:bg-[#F5F1EB] border border-[#9E8047]/25 transition-all group"
                            >
                              <div className="relative w-14 h-14 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 flex-shrink-0 overflow-hidden">
                                <Image
                                  src={img.src}
                                  alt={product.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                  sizes="56px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#4E5F52] px-2 py-0.5 rounded-full bg-[#EFF4F0] border border-[#4E5F52]/30">
                                    {product.category === "supplements"
                                      ? "Supplement"
                                      : product.category === "personal-care"
                                        ? "Personal Care"
                                        : "Power Combo"}
                                  </span>
                                  {hasDiscount && (
                                    <span className="text-[10px] font-bold text-[#4E5F52] bg-[#EFF4F0] px-1.5 py-0.5 rounded border border-[#4E5F52]/20">
                                      SAVE{" "}
                                      {Math.round(
                                        ((product.compareAtPrice! -
                                          product.price) /
                                          product.compareAtPrice!) *
                                          100,
                                      )}
                                      %
                                    </span>
                                  )}
                                </div>
                                <h4 className="text-sm font-medium text-[#1C1D1F] group-hover:text-[#4E5F52] transition-colors truncate mt-1">
                                  {product.name}
                                </h4>
                                <p className="text-xs text-[#737373] truncate mt-0.5">
                                  {product.tagline}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <span className="text-sm font-semibold text-[#1C1D1F] block">
                                  {formatINR(product.price)}
                                </span>
                                {hasDiscount && (
                                  <span className="text-[11px] text-[#999999] line-through block">
                                    {formatINR(product.compareAtPrice!)}
                                  </span>
                                )}
                              </div>
                            </Link>
                          );
                        })}

                        <button
                          type="button"
                          onClick={() => executeSearch(query)}
                          className="w-full mt-3 py-3 px-4 rounded-xl bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 shadow-sm group"
                        >
                          <span>
                            View all matching formulations in Shop Catalog
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    ) : (
                      /* NO RESULTS STATE */
                      <div className="py-8 px-4 text-center rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 space-y-3">
                        <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#9E8047]/25 flex items-center justify-center mx-auto text-[#4E5F52]">
                          <Search className="w-5 h-5" />
                        </div>
                        <h4 className="font-heading text-base font-medium text-[#1C1D1F]">
                          No formulations matching &ldquo;{query}&rdquo;
                        </h4>
                        <p className="text-xs text-[#737373] max-w-sm mx-auto">
                          We could not find an exact match. Try searching for
                          &ldquo;Ashwagandha&rdquo;, &ldquo;Hair
                          Regrowth&rdquo;, &ldquo;Delay Spray&rdquo;, or
                          &ldquo;Power Combo&rdquo;.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            closeSearch();
                            router.push("/shop");
                          }}
                          className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F5F1EB] border border-[#9E8047]/25 text-[#1C1D1F] text-xs font-medium transition-all inline-block"
                        >
                          Browse Complete Catalog →
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* DEFAULT STATE: POPULAR SUGGESTIONS & CATEGORIES */
                  <div className="space-y-5">
                    {/* Popular Botanical Searches */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#1C1D1F] mb-2.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#9E8047]" />
                        <span>Popular Botanical Searches</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_SEARCHES.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => executeSearch(term)}
                            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#555555] bg-[#FFFFFF] hover:bg-[#F5F1EB] border border-[#9E8047]/25 hover:text-[#1C1D1F] transition-all"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Explore Categories */}
                    <div>
                      <div className="text-xs uppercase font-bold tracking-wider text-[#737373] mb-2.5">
                        Apothecary Categories
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {QUICK_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.label}
                            href={cat.href}
                            onClick={closeSearch}
                            className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F5F1EB] border border-[#9E8047]/25 transition-all text-xs font-medium text-[#1C1D1F] group"
                          >
                            <cat.icon className="w-4 h-4 text-[#4E5F52] group-hover:scale-110 transition-transform flex-shrink-0" />
                            <span className="truncate">{cat.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Doctor Consultation Prompt */}
                    <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#EFF4F0] border border-[#4E5F52]/30 flex items-center justify-center text-[#4E5F52] flex-shrink-0">
                          <HeartPulse className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#1C1D1F] block">
                            Need Personal Dosage Guidance?
                          </span>
                          <span className="text-[11px] text-[#737373] block">
                            Consult with Chief Ayurvedic Vaidya on WhatsApp
                          </span>
                        </div>
                      </div>
                      <a
                        href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20would%20like%20to%20consult%20an%20Ayurvedic%20doctor."
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeSearch}
                        className="px-3 py-1.5 rounded-xl bg-[#4E5F52] hover:bg-[#3D4B40] text-white text-xs font-medium transition-colors flex-shrink-0"
                      >
                        Consult Free
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Keyboard Hint Bar */}
              <div className="px-4 sm:px-6 py-2.5 border-t border-[#9E8047]/25 bg-[#FFFFFF] flex items-center justify-between text-[11px] text-[#737373]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <CornerDownLeft className="w-3 h-3 text-[#4E5F52]" />
                    <span>
                      Press{" "}
                      <kbd className="font-mono text-[#1C1D1F] bg-[#FAF7F2] border border-[#9E8047]/25 px-1 py-0.5 rounded text-[10px]">
                        Enter
                      </kbd>{" "}
                      to search
                    </span>
                  </span>
                  <span className="hidden sm:inline text-[#999999]">•</span>
                  <span className="hidden sm:inline">Esc to dismiss</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#4E5F52] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Classical Actives</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
