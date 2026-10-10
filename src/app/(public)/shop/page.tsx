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
  "Shilajit",
  "Ashwagandha",
  "Delay Spray",
  "Power Combo",
  "Hair Oil",
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories] = useState<Category[]>(getCategories());
  const [loading, setLoading] = useState(true);
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
    <div className="container py-6 sm:py-8 lg:py-10 pb-20">
      {/* Breadcrumb & Luxury Hero Header */}
      <div className="mb-6 sm:mb-8 pb-6 border-b border-[#9E8047]/25">
        <nav className="flex items-center gap-2 text-xs text-[#737373] mb-3 font-mono">
          <Link href="/" className="hover:text-[#1C1D1F] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1C1D1F] font-medium">Dispensary</span>
        </nav>

        <div className="max-w-3xl">
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#4E5F52] uppercase block mb-1.5 font-semibold">
            Ayurveda Global Formulary
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1D1F] tracking-tight">
            {activeCategoryObj
              ? activeCategoryObj.name
              : filters.search
                ? `Results for "${filters.search}"`
                : "Classical Ayurvedic Formulations"}
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] mt-2 font-sans leading-relaxed">
            Standardized botanical extracts, NABL lab purity certified, 100% discreet packaging & Free Cash on Delivery across India.
          </p>
        </div>

        {/* Quick Horizontal Category Pills Bar */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => updateFilters({ category: "" })}
            className={classNames(
              "px-3.5 py-1.5 rounded-full text-xs transition-all flex-shrink-0 font-medium",
              !filters.category
                ? "bg-[#1F3D2B] text-white shadow-xs"
                : "bg-[#FFFFFF] text-[#555555] border border-[#9E8047]/25 hover:border-[#1F3D2B] hover:text-[#1C1D1F]",
            )}
          >
            All Formulations ({products.length})
          </button>
          {categories.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => updateFilters({ category: isSelected ? "" : cat.slug })}
                className={classNames(
                  "px-3.5 py-1.5 rounded-full text-xs transition-all flex-shrink-0 font-medium",
                  isSelected
                    ? "bg-[#1F3D2B] text-white shadow-xs"
                    : "bg-[#FFFFFF] text-[#555555] border border-[#9E8047]/25 hover:border-[#1F3D2B] hover:text-[#1C1D1F]",
                )}
              >
                {cat.name} ({cat.productCount})
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Search & Popular Search Chips */}
      <div className="mb-6 space-y-3">
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            placeholder="Search Shilajit, Ashwagandha, Delay Spray, Hair Oil..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#FFFFFF] border border-[#9E8047]/25 focus:border-[#1F3D2B] rounded-full text-xs sm:text-sm text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-colors shadow-2xs"
            aria-label="Search dispensary formulations"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => updateFilters({ search: "" })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#737373] hover:text-[#1C1D1F] rounded-full transition-colors"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Keyword Chips */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-[11px] font-mono text-[#737373] mr-1">
            Popular Searches:
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
                  "px-3 py-1 rounded-full text-xs transition-colors",
                  isSelected
                    ? "bg-[#1F3D2B] text-white font-medium"
                    : "bg-[#FFFFFF] text-[#555555] hover:text-[#1C1D1F] border border-[#9E8047]/25",
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
        <div className="flex items-center gap-2 flex-wrap mb-6 p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/20">
          <span className="text-[11px] font-mono text-[#737373] uppercase tracking-wider mr-1">
            Active Filters:
          </span>

          {filters.search && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#9E8047]/30 text-xs text-[#1C1D1F]">
              <span>Keyword: &ldquo;{filters.search}&rdquo;</span>
              <button
                onClick={() => updateFilters({ search: "" })}
                className="hover:text-rose-600 transition-colors"
                aria-label="Remove search filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.category && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#9E8047]/30 text-xs text-[#1C1D1F]">
              <span>Category: {activeCategoryObj?.name || filters.category}</span>
              <button
                onClick={() => updateFilters({ category: "" })}
                className="hover:text-rose-600 transition-colors"
                aria-label="Remove category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(filters.priceRange[0] > 500 || filters.priceRange[1] < 2500) && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#9E8047]/30 text-xs text-[#1C1D1F]">
              <span>
                Price: ₹{filters.priceRange[0]} – ₹{filters.priceRange[1]}
              </span>
              <button
                onClick={() => updateFilters({ priceRange: [500, 2500] })}
                className="hover:text-rose-600 transition-colors"
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
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#9E8047]/30 text-xs text-[#1C1D1F]"
              >
                <span>{tagObj ? tagObj.label : tag}</span>
                <button
                  onClick={() =>
                    updateFilters({
                      tags: filters.tags.filter((t) => t !== tag),
                    })
                  }
                  className="hover:text-rose-600 transition-colors"
                  aria-label={`Remove ${tag} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}

          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#9E8047]/30 text-xs text-[#1C1D1F]">
              <span>In Stock Only</span>
              <button
                onClick={() => updateFilters({ inStockOnly: false })}
                className="hover:text-rose-600 transition-colors"
                aria-label="Remove in stock filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={handleClearFilters}
            className="text-xs text-[#737373] hover:text-[#1C1D1F] underline ml-auto font-mono uppercase tracking-wider"
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
          {/* Top Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 mb-6 shadow-2xs">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Sheet Trigger */}
              <div className="lg:hidden">
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

              <span className="text-[#1C1D1F] text-xs font-medium font-sans">
                Showing {filteredProducts.length} of {products.length} Formulations
              </span>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <ProductSort
                selectedSort={filters.sort}
                onSortChange={(sort) => updateFilters({ sort })}
              />

              {/* View Mode Toggle: Grid vs List */}
              <div className="flex items-center gap-1 bg-[#FAF7F2] border border-[#9E8047]/25 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={classNames(
                    "p-1.5 rounded-lg transition-colors",
                    viewMode === "grid"
                      ? "bg-[#1F3D2B] text-white shadow-2xs"
                      : "text-[#737373] hover:text-[#1C1D1F]",
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
                    "p-1.5 rounded-lg transition-colors",
                    viewMode === "list"
                      ? "bg-[#1F3D2B] text-white shadow-2xs"
                      : "text-[#737373] hover:text-[#1C1D1F]",
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
            <div className="py-16 px-6 text-center rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#9E8047]/25 flex items-center justify-center mx-auto text-[#4E5F52]">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-lg font-normal text-[#1C1D1F]">
                No formulations found {filters.search && `for "${filters.search}"`}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto">
                No products match the selected criteria. Try adjusting your filters or search keywords.
              </p>
              <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 rounded-full bg-[#1F3D2B] text-white text-xs font-semibold hover:bg-[#162C1F] transition-colors shadow-xs"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => updateFilters({ search: "Shilajit", category: "" })}
                  className="px-4 py-2 rounded-full border border-[#9E8047]/30 text-xs text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors"
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
                    : { base: 1, sm: 2, md: 3, lg: 3, xl: 3 }
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
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-[#9E8047]/25 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#4E5F52] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#9E8047]/20">
                <Sparkles className="w-3 h-3 text-[#4E5F52]" />
                <span>Personalized Ayurvedic Consultation</span>
              </div>
              <h4 className="font-heading text-lg sm:text-xl font-normal text-[#1C1D1F]">
                Unsure which formulation matches your Prakriti?
              </h4>
              <p className="text-xs sm:text-sm text-[#555555] max-w-xl">
                Chat with our senior Ayurvedic Vaidyas on WhatsApp for free dosage recommendations, herb synergism details, and discreet delivery guidance.
              </p>
            </div>
            <button
              onClick={handleWhatsAppConsultation}
              className="px-5 py-3 rounded-xl bg-[#1F3D2B] text-white text-xs font-semibold hover:bg-[#162C1F] transition-all inline-flex items-center gap-2 shadow-sm flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consult on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center text-[#737373] text-xs font-mono">
            Loading dispensary catalog...
          </div>
        }
      >
        <ShopContent />
      </Suspense>
    </div>
  );
}
