"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  X,
  Grid,
  List,
  Search,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";
import { classNames } from "@/lib/utils/formatters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters, CURATED_FILTER_TAGS } from "@/components/product/ProductFilters";
import { ProductSort } from "@/components/product/ProductSort";
import { Pagination } from "@/components/ui/Pagination";
import { getAllProducts, getCategories } from "@/lib/products/registry";
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from "@/store/whatsappStore";
import type { Product, Category } from "@/types";

const ITEMS_PER_PAGE = 12;

const QUICK_SEARCH_CHIPS = [
  "Shilajit Resin",
  "Ashwagandha KSM-66",
  "Delay Spray",
  "Hair Regrowth Kit",
  "Vajikara Oil",
  "Body Nutrition",
];

interface ShopClientProps {
  initialProducts?: Product[];
  initialCategories?: Category[];
}

function ShopContent({ initialProducts = [], initialCategories = [] }: ShopClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>(() =>
    initialProducts.length ? initialProducts : getAllProducts(),
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(() =>
    initialProducts.length ? initialProducts : getAllProducts(),
  );
  const [categories] = useState<Category[]>(() =>
    initialCategories.length ? initialCategories : getCategories(),
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    search: searchParams.get("q") || searchParams.get("search") || "",
    priceRange: [
      parseInt(searchParams.get("min_price") || "500", 10) || 500,
      parseInt(searchParams.get("max_price") || "2500", 10) || 2500,
    ] as [number, number],
    tags: searchParams.get("tags")
      ? searchParams.get("tags")!.split(",").filter(Boolean)
      : ([] as string[]),
    inStockOnly: searchParams.get("in_stock") === "true",
    sort: searchParams.get("sort") || "featured",
  });

  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    const q = searchParams.get("q") || searchParams.get("search") || "";
    const cat = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "featured";
    const inStock = searchParams.get("in_stock") === "true";
    const tagsParam = searchParams.get("tags");
    const minPrice = parseInt(searchParams.get("min_price") || "500", 10);
    const maxPrice = parseInt(searchParams.get("max_price") || "2500", 10);

    setFilters((prev) => ({
      ...prev,
      search: q,
      category: cat,
      sort,
      inStockOnly: inStock,
      priceRange: [
        isNaN(minPrice) ? 500 : minPrice,
        isNaN(maxPrice) ? 2500 : maxPrice,
      ],
      tags: tagsParam ? tagsParam.split(",").filter(Boolean) : [],
    }));
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];

    // Search query filter
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          (p.shortDescription || "").toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // Price range filter (converts Rupees to Paise)
    if (filters.priceRange[0] > 500 || filters.priceRange[1] < 2500) {
      const minPaise = filters.priceRange[0] * 100;
      const maxPaise = filters.priceRange[1] * 100;
      result = result.filter(
        (p) => p.price >= minPaise && p.price <= maxPaise,
      );
    }

    // Tags filter
    if (filters.tags.length > 0) {
      result = result.filter(
        (p) => p.tags && filters.tags.some((tag) => p.tags.includes(tag)),
      );
    }

    // In-stock filter
    if (filters.inStockOnly) {
      result = result.filter(
        (p) => !p.inventory.trackQuantity || p.inventory.quantity > 0,
      );
    }

    // Sort options
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "best-selling":
        result.sort((a, b) => {
          const aBest = (a.tags || []).includes("bestseller") ? 1 : 0;
          const bBest = (b.tags || []).includes("bestseller") ? 1 : 0;
          return bBest - aBest;
        });
        break;
      case "newest":
        result.reverse();
        break;
      default:
        // featured / default registry order
        break;
    }

    setFilteredProducts(result);
    setTotalPages(Math.max(1, Math.ceil(result.length / ITEMS_PER_PAGE)));
    setCurrentPage(1);
  }, [products, filters]);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    const params = new URLSearchParams();
    if (updated.category) params.set("category", updated.category);
    if (updated.search) params.set("q", updated.search);
    if (updated.sort && updated.sort !== "featured")
      params.set("sort", updated.sort);
    if (updated.inStockOnly) params.set("in_stock", "true");
    if (updated.tags.length > 0) params.set("tags", updated.tags.join(","));
    if (updated.priceRange[0] > 500)
      params.set("min_price", updated.priceRange[0].toString());
    if (updated.priceRange[1] < 2500)
      params.set("max_price", updated.priceRange[1].toString());

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleClearFilters = () => {
    const cleared = {
      category: "",
      search: "",
      priceRange: [500, 2500] as [number, number],
      tags: [] as string[],
      inStockOnly: false,
      sort: "featured",
    };
    setFilters(cleared);
    router.push(pathname, { scroll: false });
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const hasActiveFilters = Boolean(
    filters.category ||
    filters.search ||
    filters.priceRange[0] > 500 ||
    filters.priceRange[1] < 2500 ||
    filters.tags.length > 0 ||
    filters.inStockOnly,
  );

  const activeCategoryObj = categories.find((c) => c.slug === filters.category);

  const handleWhatsAppConsultation = () => {
    const message = buildVaidyaConsultationMessage();
    window.open(buildWhatsAppUrl(message), "_blank");
  };

  return (
    <div className="container py-3 sm:py-6 lg:py-8 pb-28 sm:pb-32 lg:pb-16">
      {/* Compact Luxury Apothecary Header */}
      <div className="mb-4 sm:mb-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#D4AF37]/30 p-3.5 sm:p-6 lg:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background watermark */}
        <div className="absolute right-0 top-0 w-72 h-72 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.1),_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#737373] mb-2 sm:mb-3 font-sans">
            <Link href="/" className="hover:text-[#0E3924] transition-colors">
              Home
            </Link>
            <span className="text-[#D4AF37]">/</span>
            <span className="text-[#0E3924] font-semibold">Dispensary</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0E3924]/8 border border-[#0E3924]/20 text-[#0E3924] text-[9.5px] sm:text-[11px] font-sans uppercase tracking-widest font-semibold mb-2">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>NABL Certified • AYUSH Approved Pharmacopeia</span>
          </div>

          <h1 className="font-editorial text-xl sm:text-3xl lg:text-4xl font-normal text-[#071A12] tracking-tight leading-tight">
            {activeCategoryObj
              ? activeCategoryObj.name
              : filters.search
                ? `Results for "${filters.search}"`
                : "The Royal Ayurvedic Dispensary"}
          </h1>

          <p className="text-[11.5px] sm:text-sm text-[#555555] mt-1 sm:mt-2 font-editorial leading-snug sm:leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
            Pure Rasayana extracts, classical Medicated Tailas, and targeted restorative kits. Verified for peak bio-active withanolides, fulvic acid, and zero synthetic adulteration.
          </p>

          {/* Trust Highlights Strip inside Header - Desktop & Tablet */}
          <div className="hidden sm:flex items-center gap-4 sm:gap-6 mt-3.5 pt-3.5 border-t border-[#D4AF37]/20 flex-wrap text-xs text-[#0E3924] font-sans font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>100% Shuddha Herbs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#D4AF37]" />
              <span>Discreet Pan-India Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-[#0E3924]" />
              <span>Free BAMS Vaidya Advice</span>
            </div>
          </div>
        </div>

        {/* Polished Touch-Friendly Horizontal Category Tabs (no-scrollbar, clear active state) */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-3.5 sm:mt-5 overflow-x-auto pb-1 no-scrollbar relative z-10 -mx-1 px-1 touch-pan-x">
          <button
            type="button"
            onClick={() => updateFilters({ category: "" })}
            className={classNames(
              "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-sans tracking-wide transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5",
              !filters.category
                ? "bg-[#0E3924] text-white shadow-xs font-semibold"
                : "bg-white text-[#555555] border border-[#0E3924]/15 hover:border-[#0E3924]/35 hover:text-[#071A12] font-medium",
            )}
          >
            <span>All Formulations</span>
            <span
              className={classNames(
                "text-[10px] px-1.5 py-0.2 rounded-full font-mono",
                !filters.category ? "bg-white/20 text-white" : "bg-[#0E3924]/6 text-[#0E3924]",
              )}
            >
              {products.length}
            </span>
          </button>
          {categories.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => updateFilters({ category: isSelected ? "" : cat.slug })}
                className={classNames(
                  "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-sans tracking-wide transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5",
                  isSelected
                    ? "bg-[#0E3924] text-white shadow-xs font-semibold"
                    : "bg-white text-[#555555] border border-[#0E3924]/15 hover:border-[#0E3924]/35 hover:text-[#071A12] font-medium",
                )}
              >
                <span>{cat.name}</span>
                <span
                  className={classNames(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-mono",
                    isSelected ? "bg-white/20 text-white" : "bg-[#0E3924]/6 text-[#0E3924]",
                  )}
                >
                  {cat.productCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Search & Popular Search Chips */}
      <div className="mb-4 sm:mb-6 space-y-2.5">
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0E3924]/60 pointer-events-none" />
          <input
            type="search"
            inputMode="search"
            enterKeyHint="search"
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            placeholder="Search pure formulations, herbs..."
            className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white border border-[#0E3924]/20 focus:border-[#0E3924] focus:ring-2 focus:ring-[#0E3924]/10 rounded-full text-xs sm:text-sm text-[#071A12] placeholder-[#777777] focus:outline-none transition-all shadow-2xs"
            aria-label="Search dispensary formulations"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => updateFilters({ search: "" })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#737373] hover:text-[#071A12] rounded-full transition-colors"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Keyword Chips - Smooth Horizontal Scroll on Mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] font-sans font-medium text-[#737373] flex-shrink-0 mr-0.5">
            Popular:
          </span>
          {QUICK_SEARCH_CHIPS.map((chip) => {
            const isSelected =
              filters.search.toLowerCase() === chip.toLowerCase();
            return (
              <button
                key={chip}
                type="button"
                onClick={() =>
                  updateFilters({ search: isSelected ? "" : chip })
                }
                className={classNames(
                  "px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-sans transition-all cursor-pointer flex-shrink-0",
                  isSelected
                    ? "bg-[#0E3924] text-white font-medium shadow-xs"
                    : "bg-white text-[#555555] hover:text-[#071A12] border border-[#0E3924]/15 hover:border-[#0E3924]/30",
                )}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Chips Bar (Shown when any filter is active) */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap mb-6 p-3 rounded-2xl bg-[#0E3924]/5 border border-[#0E3924]/15">
          <span className="text-[11px] font-sans uppercase font-bold tracking-wider text-[#0E3924] mr-1">
            Active Filters:
          </span>

          {filters.search && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0E3924]/20 text-xs text-[#071A12] shadow-2xs">
              <span>Keyword: &ldquo;{filters.search}&rdquo;</span>
              <button
                onClick={() => updateFilters({ search: "" })}
                className="hover:text-rose-600 transition-colors cursor-pointer"
                aria-label="Remove search filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0E3924]/20 text-xs text-[#071A12] shadow-2xs">
              <span>Category: {activeCategoryObj?.name || filters.category}</span>
              <button
                onClick={() => updateFilters({ category: "" })}
                className="hover:text-rose-600 transition-colors cursor-pointer"
                aria-label="Remove category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(filters.priceRange[0] > 500 || filters.priceRange[1] < 2500) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0E3924]/20 text-xs text-[#071A12] shadow-2xs">
              <span>
                Price: ₹{filters.priceRange[0]} – ₹{filters.priceRange[1]}
              </span>
              <button
                onClick={() => updateFilters({ priceRange: [500, 2500] })}
                className="hover:text-rose-600 transition-colors cursor-pointer"
                aria-label="Remove price filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.tags.map((tag) => {
            const tagObj = CURATED_FILTER_TAGS.find((t) => t.tag === tag);
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0E3924]/20 text-xs text-[#071A12] shadow-2xs"
              >
                <span>{tagObj ? tagObj.label : tag}</span>
                <button
                  onClick={() =>
                    updateFilters({
                      tags: filters.tags.filter((t) => t !== tag),
                    })
                  }
                  className="hover:text-rose-600 transition-colors cursor-pointer"
                  aria-label={`Remove ${tag} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}

          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0E3924]/20 text-xs text-[#071A12] shadow-2xs">
              <span>In Stock Only</span>
              <button
                onClick={() => updateFilters({ inStockOnly: false })}
                className="hover:text-rose-600 transition-colors cursor-pointer"
                aria-label="Remove in stock filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={handleClearFilters}
            className="text-xs text-[#0E3924] hover:text-[#071A12] font-semibold underline ml-auto font-sans uppercase tracking-wider cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content: Sidebar + Products Stream */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:w-72 flex-shrink-0">
          <div className="sticky top-24">
            <ProductFilters
              categories={categories}
              selectedCategory={filters.category || undefined}
              onCategoryChange={(category) =>
                updateFilters({ category: category || "" })
              }
              priceRange={filters.priceRange}
              onPriceRangeChange={(range) =>
                updateFilters({ priceRange: range })
              }
              selectedTags={filters.tags}
              onTagsChange={(tags) => updateFilters({ tags })}
              inStockOnly={filters.inStockOnly}
              onInStockChange={(value) => updateFilters({ inStockOnly: value })}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
              isMobile={false}
              totalResults={filteredProducts.length}
            />
          </div>
        </aside>

        {/* Products Area */}
        <div className="flex-1 w-full min-w-0">
          {/* Top Controls Bar - Compact & Responsive */}
          <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3.5 rounded-2xl bg-white border border-[#0E3924]/15 mb-4 sm:mb-6 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              {/* Mobile Filter Sheet Trigger */}
              <div className="lg:hidden flex-shrink-0">
                <ProductFilters
                  categories={categories}
                  selectedCategory={filters.category || undefined}
                  onCategoryChange={(category) =>
                    updateFilters({ category: category || "" })
                  }
                  priceRange={filters.priceRange}
                  onPriceRangeChange={(range) =>
                    updateFilters({ priceRange: range })
                  }
                  selectedTags={filters.tags}
                  onTagsChange={(tags) => updateFilters({ tags })}
                  inStockOnly={filters.inStockOnly}
                  onInStockChange={(value) =>
                    updateFilters({ inStockOnly: value })
                  }
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={handleClearFilters}
                  isMobile={true}
                  totalResults={filteredProducts.length}
                />
              </div>

              <span className="text-[#071A12] text-[11px] sm:text-xs font-semibold font-sans truncate">
                <span className="hidden sm:inline">Showing </span>
                <span>{filteredProducts.length}</span>
                <span className="text-[#737373] font-normal"> / {products.length}</span>
                <span className="hidden xs:inline text-[#737373]"> Items</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5 ml-auto flex-shrink-0">
              <div className="w-28 xs:w-32 sm:w-44">
                <ProductSort
                  selectedSort={filters.sort}
                  onSortChange={(sort) => updateFilters({ sort })}
                />
              </div>

              {/* View Mode Toggle: Grid vs List (Desktop & Tablet) */}
              <div className="hidden sm:flex items-center gap-1 bg-[#FAF7F2] border border-[#0E3924]/15 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={classNames(
                    "p-1.5 rounded-lg transition-colors cursor-pointer",
                    viewMode === "grid"
                      ? "bg-[#0E3924] text-white shadow-xs"
                      : "text-[#737373] hover:text-[#071A12]",
                  )}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={classNames(
                    "p-1.5 rounded-lg transition-colors cursor-pointer",
                    viewMode === "list"
                      ? "bg-[#0E3924] text-white shadow-xs"
                      : "text-[#737373] hover:text-[#071A12]",
                  )}
                  aria-label="List view"
                  title="List view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Cards Stream */}
          {loading ? (
            <ProductGrid products={[]} loading={true} />
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 px-6 text-center rounded-2xl bg-white border border-[#D4AF37]/25 space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#0E3924]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-normal text-[#071A12]">
                No formulations found {filters.search && `for "${filters.search}"`}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto font-editorial">
                No products match the selected criteria. Try adjusting your filters or search terms.
              </p>
              <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 rounded-full bg-[#0E3924] text-white text-xs font-semibold hover:bg-[#071A12] transition-colors shadow-xs cursor-pointer"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => updateFilters({ search: "Shilajit", category: "" })}
                  className="px-4 py-2 rounded-full border border-[#0E3924]/20 text-xs text-[#071A12] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Search Shilajit
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <ProductGrid
                products={paginatedProducts}
                columns={
                  viewMode === "list"
                    ? { base: 1, sm: 1, md: 1, lg: 1, xl: 1 }
                    : { base: 2, sm: 2, md: 3, lg: 3, xl: 3 }
                }
                variant={viewMode === "list" ? "list" : "default"}
              />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mt-8"
                />
              )}
            </div>
          )}

          {/* Bottom Ayurvedic Doctor Consult Banner */}
          <div className="mt-12 p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#071A12] border border-[#D4AF37]/35 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,175,55,0.18),_transparent_70%)] pointer-events-none" />

            <div className="space-y-2.5 text-center sm:text-left relative z-10">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold text-[#D4AF37] bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>1-on-1 Confidential Vaidya Concierge</span>
              </div>
              <h4 className="font-editorial text-xl sm:text-2xl lg:text-3xl font-normal text-white">
                Unsure which formulation matches your Prakriti &amp; Dosha?
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl font-editorial leading-relaxed">
                Chat directly with senior BAMS Ayurvedic physicians on WhatsApp for personalized dosage guidance, botanical synergism, and discreet doorstep ordering at zero consultation fee.
              </p>
            </div>
            <button
              onClick={handleWhatsAppConsultation}
              className="px-6 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] active:scale-95 text-[#071A12] text-xs font-sans font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg flex-shrink-0 cursor-pointer relative z-10"
            >
              <MessageCircle className="w-4 h-4 text-[#071A12]" />
              <span>Free Consultation on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopClient(props: ShopClientProps) {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center text-[#737373] text-xs font-mono">
            Loading dispensary catalog...
          </div>
        }
      >
        <ShopContent {...props} />
      </Suspense>
    </div>
  );
}
