"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { X, Grid, List, Search } from "lucide-react";
import { classNames } from "@/lib/utils/formatters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductSort } from "@/components/product/ProductSort";
import { Pagination } from "@/components/ui/Pagination";
import { getAllProducts, getCategories } from "@/lib/products/registry";
import type { Product, Category } from "@/types";

const ITEMS_PER_PAGE = 12;

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
    priceRange: [0, 500000] as [number, number],
    tags: searchParams.get("tags")
      ? searchParams.get("tags")!.split(",")
      : ([] as string[]),
    inStockOnly: searchParams.get("in_stock") === "true",
    sort: searchParams.get("sort") || "featured",
  });

  const availableTags = [
    "daily-wellness",
    "immunity",
    "energy",
    "ayurvedic",
    "herbal-supplement",
    "mens-wellness",
    "endurance",
    "personal-care",
    "topical-spray",
  ];

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

    setFilters((prev) => ({
      ...prev,
      search: q,
      category: cat,
      sort,
      inStockOnly: inStock,
      tags: tagsParam ? tagsParam.split(",").filter(Boolean) : [],
    }));
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];

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

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500000) {
      result = result.filter(
        (p) =>
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
      );
    }

    if (filters.tags.length > 0) {
      result = result.filter(
        (p) => p.tags && filters.tags.some((tag) => p.tags.includes(tag)),
      );
    }

    if (filters.inStockOnly) {
      result = result.filter(
        (p) => !p.inventory.trackQuantity || p.inventory.quantity > 0,
      );
    }

    // Sort
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
      default:
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
    if (updated.search) params.set("search", updated.search);
    if (updated.sort && updated.sort !== "featured")
      params.set("sort", updated.sort);
    if (updated.inStockOnly) params.set("in_stock", "true");
    if (updated.tags.length > 0) params.set("tags", updated.tags.join(","));

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleClearFilters = () => {
    const cleared = {
      category: "",
      search: "",
      priceRange: [0, 500000] as [number, number],
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
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500000 ||
    filters.tags.length > 0 ||
    filters.inStockOnly,
  );

  return (
    <div className="container py-6 sm:py-8 lg:py-10 pb-16">
      {/* Page Header */}
      <div className="pb-4 mb-6 border-b border-[#9E8047]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1">
            Ayurveda Global Formulary
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F] tracking-tight">
            {filters.search
              ? `Search: "${filters.search}"`
              : "All Formulations"}
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] mt-1 font-sans">
            Standardized botanical extracts, NABL purity tested, 100% discreet
            delivery.
          </p>
        </div>

        {/* Active Search Badge */}
        {filters.search && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#9E8047]/25 text-xs text-[#1C1D1F] font-medium flex items-center gap-1.5 shadow-xs">
              <Search className="w-3.5 h-3.5 text-[#4E5F52]" />
              <span>&ldquo;{filters.search}&rdquo;</span>
              <button
                onClick={() => updateFilters({ search: "" })}
                className="ml-1 p-0.5 hover:text-[#000000] rounded-full"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Catalog Search Input & Quick Keyword Chips */}
      <div className="mb-6 space-y-3">
        <div className="relative max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            placeholder="Search Shilajit, Ashwagandha, Spray, Combo..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#FFFFFF] border border-[#9E8047]/25 focus:border-[#1C1D1F] rounded-full text-xs sm:text-sm text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-colors"
            aria-label="Search all catalog formulations"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => updateFilters({ search: "" })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-[#737373] hover:text-[#1C1D1F]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Tags */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-[11px] font-mono text-[#737373] mr-1">
            Quick Select:
          </span>
          {["Shilajit", "Ashwagandha", "Spray", "Combo", "Hair Care"].map(
            (tag) => {
              const isSelected =
                filters.search.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    updateFilters({ search: isSelected ? "" : tag })
                  }
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    isSelected
                      ? "bg-[#1C1D1F] text-[#FAF7F2] font-medium"
                      : "bg-[#FFFFFF] text-[#555555] hover:text-[#1C1D1F] border border-[#9E8047]/25"
                  }`}
                >
                  {tag}
                </button>
              );
            },
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="sticky top-20">
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
              availableTags={availableTags}
              inStockOnly={filters.inStockOnly}
              onInStockChange={(value) => updateFilters({ inStockOnly: value })}
              sortBy={filters.sort}
              onSortChange={(sort) => updateFilters({ sort })}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
              isMobile={false}
            />
          </div>
        </aside>

        {/* Main Products Area */}
        <div className="flex-1 w-full min-w-0">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 mb-5">
            <div className="flex items-center gap-2.5">
              {/* Mobile Filter Button */}
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
                  availableTags={availableTags}
                  inStockOnly={filters.inStockOnly}
                  onInStockChange={(value) =>
                    updateFilters({ inStockOnly: value })
                  }
                  sortBy={filters.sort}
                  onSortChange={(sort) => updateFilters({ sort })}
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={handleClearFilters}
                  isMobile={true}
                />
              </div>

              <span className="text-[#1C1D1F] text-xs font-medium font-sans">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "Formulation" : "Formulations"}
              </span>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-[#737373] hover:text-[#1C1D1F] flex items-center gap-1 font-mono uppercase tracking-wider ml-2"
                >
                  <X className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 ml-auto">
              <ProductSort
                selectedSort={filters.sort}
                onSortChange={(sort) => updateFilters({ sort })}
              />

              <div className="flex items-center gap-1 bg-[#FAF7F2] border border-[#9E8047]/25 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={classNames(
                    "p-1.5 rounded transition-colors",
                    viewMode === "grid"
                      ? "bg-[#1C1D1F] text-[#FAF7F2]"
                      : "text-[#737373] hover:text-[#1C1D1F]",
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={classNames(
                    "p-1.5 rounded transition-colors",
                    viewMode === "list"
                      ? "bg-[#1C1D1F] text-[#FAF7F2]"
                      : "text-[#737373] hover:text-[#1C1D1F]",
                  )}
                  aria-label="List view"
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
            <div className="py-12 px-4 text-center rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#9E8047]/25 flex items-center justify-center mx-auto text-[#737373]">
                <Search className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-base font-normal text-[#1C1D1F]">
                No formulations found{" "}
                {filters.search && `for "${filters.search}"`}
              </h3>
              <p className="text-xs text-[#555555] max-w-sm mx-auto">
                Try searching for &ldquo;Ashwagandha&rdquo;,
                &ldquo;Shilajit&rdquo;, &ldquo;Delay Spray&rdquo;, or
                &ldquo;Power Combo&rdquo;.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-2 px-5 py-2 rounded-full border border-[#1C1D1F] text-[#1C1D1F] text-xs font-medium uppercase tracking-wider hover:bg-[#1C1D1F] hover:text-[#FAF7F2] transition-colors"
              >
                Browse All Formulations
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <ProductGrid
                products={paginatedProducts}
                columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
                variant={viewMode === "list" ? "compact" : "default"}
              />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mt-6"
                />
              )}
            </div>
          )}
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
          <div className="min-h-[50vh] flex items-center justify-center text-[#737373] text-xs">
            Loading catalog...
          </div>
        }
      >
        <ShopContent />
      </Suspense>
    </div>
  );
}
