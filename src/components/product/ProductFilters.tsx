"use client";

import { useState, useEffect } from "react";
import { Filter, X, SlidersHorizontal, Check, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { classNames } from "@/lib/utils/formatters";
import type { Category } from "@/types";

export interface FilterTagOption {
  id: string;
  label: string;
  tag: string;
}

export const CURATED_FILTER_TAGS: FilterTagOption[] = [
  { id: "stamina", label: "Energy & Stamina", tag: "stamina" },
  { id: "immunity", label: "Immunity & Rasayana", tag: "immunity" },
  { id: "mens-wellness", label: "Men's Vitality", tag: "mens-wellness" },
  { id: "delay-spray", label: "Delay & Performance", tag: "delay-spray" },
  { id: "hair-growth", label: "Hair Regrowth", tag: "hair-growth" },
  { id: "anti-hairfall", label: "Anti-Hairfall", tag: "anti-hairfall" },
  { id: "bestseller", label: "Bestseller Combos", tag: "bestseller" },
];

const PRICE_PRESETS = [
  { label: "All Prices", min: 500, max: 2500 },
  { label: "Under ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 – ₹1,500", min: 1000, max: 1500 },
  { label: "₹1,500 – ₹2,500", min: 1500, max: 2500 },
];

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
  priceRange: [number, number]; // In Rupees! e.g. [500, 2500]
  onPriceRangeChange: (range: [number, number]) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags?: string[];
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  isMobile?: boolean;
  totalResults?: number;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedTags,
  onTagsChange,
  inStockOnly,
  onInStockChange,
  hasActiveFilters,
  onClearFilters,
  isMobile = false,
  totalResults,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [minInput, setMinInput] = useState<number>(priceRange[0]);
  const [maxInput, setMaxInput] = useState<number>(priceRange[1]);

  // Keep local inputs in sync with parent props
  useEffect(() => {
    setMinInput(priceRange[0]);
    setMaxInput(priceRange[1]);
  }, [priceRange]);

  const handleApplyPrice = () => {
    const validMin = Math.max(0, Math.min(minInput, maxInput));
    const validMax = Math.max(validMin, maxInput);
    onPriceRangeChange([validMin, validMax]);
  };

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (priceRange[0] > 500 || priceRange[1] < 2500 ? 1 : 0) +
    selectedTags.length +
    (inStockOnly ? 1 : 0);

  const filterContent = (
    <div className="space-y-6">
      {/* Category Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#1C1D1F] font-semibold">
            Formulation Category
          </h3>
          {selectedCategory && (
            <button
              onClick={() => onCategoryChange(undefined)}
              className="text-[11px] text-[#4E5F52] hover:underline"
            >
              Reset
            </button>
          )}
        </div>
        <div className="space-y-1.5 text-xs">
          <button
            type="button"
            onClick={() => onCategoryChange(undefined)}
            className={classNames(
              "w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between",
              !selectedCategory
                ? "bg-[#1F3D2B] text-white font-medium shadow-xs"
                : "text-[#555555] hover:bg-[#FAF7F2] hover:text-[#1C1D1F]",
            )}
          >
            <span>All Formulations</span>
            <span
              className={classNames(
                "text-[10px] font-mono px-1.5 py-0.5 rounded-full",
                !selectedCategory
                  ? "bg-white/20 text-white"
                  : "bg-[#FAF7F2] text-[#737373]",
              )}
            >
              6
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(isSelected ? undefined : cat.slug)}
                className={classNames(
                  "w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between",
                  isSelected
                    ? "bg-[#1F3D2B] text-white font-medium shadow-xs"
                    : "text-[#555555] hover:bg-[#FAF7F2] hover:text-[#1C1D1F]",
                )}
              >
                <span className="truncate pr-2">{cat.name}</span>
                <span
                  className={classNames(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded-full flex-shrink-0",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#FAF7F2] text-[#737373]",
                  )}
                >
                  {cat.productCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[#9E8047]/20" />

      {/* Price Range Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#1C1D1F] font-semibold">
            Price Range
          </h3>
          <span className="text-[11px] font-mono text-[#4E5F52] font-medium">
            ₹{priceRange[0].toLocaleString()} – ₹{priceRange[1].toLocaleString()}
          </span>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-2 gap-1.5">
          {PRICE_PRESETS.map((preset) => {
            const isActive =
              priceRange[0] === preset.min && priceRange[1] === preset.max;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => onPriceRangeChange([preset.min, preset.max])}
                className={classNames(
                  "px-2.5 py-1.5 rounded-lg text-[11px] font-sans border transition-all text-center truncate",
                  isActive
                    ? "bg-[#1F3D2B] text-white border-[#1F3D2B] font-medium shadow-xs"
                    : "bg-[#FFFFFF] text-[#555555] border-[#9E8047]/25 hover:border-[#1F3D2B] hover:text-[#1C1D1F]",
                )}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Inputs & Apply */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#737373]">
                ₹
              </span>
              <input
                type="number"
                min="0"
                max="5000"
                step="50"
                value={minInput}
                onChange={(e) => setMinInput(parseInt(e.target.value) || 0)}
                className="w-full pl-6 pr-2 py-1.5 bg-[#FAF7F2] border border-[#9E8047]/25 rounded-lg text-xs text-[#1C1D1F] focus:outline-none focus:border-[#1F3D2B]"
                placeholder="Min"
              />
            </div>
            <span className="text-xs text-[#737373]">–</span>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#737373]">
                ₹
              </span>
              <input
                type="number"
                min="0"
                max="5000"
                step="50"
                value={maxInput}
                onChange={(e) => setMaxInput(parseInt(e.target.value) || 0)}
                className="w-full pl-6 pr-2 py-1.5 bg-[#FAF7F2] border border-[#9E8047]/25 rounded-lg text-xs text-[#1C1D1F] focus:outline-none focus:border-[#1F3D2B]"
                placeholder="Max"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyPrice}
              className="px-3 py-1.5 bg-[#1F3D2B] text-white rounded-lg text-xs font-medium hover:bg-[#162C1F] transition-colors"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[#9E8047]/20" />

      {/* Health Indication & Tags */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#1C1D1F] font-semibold">
            Health Focus
          </h3>
          {selectedTags.length > 0 && (
            <button
              onClick={() => onTagsChange([])}
              className="text-[11px] text-[#4E5F52] hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CURATED_FILTER_TAGS.map((t) => {
            const isSelected = selectedTags.includes(t.tag);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  const newTags = isSelected
                    ? selectedTags.filter((tag) => tag !== t.tag)
                    : [...selectedTags, t.tag];
                  onTagsChange(newTags);
                }}
                className={classNames(
                  "px-2.5 py-1 rounded-full text-[11px] font-sans border transition-all inline-flex items-center gap-1",
                  isSelected
                    ? "bg-[#1F3D2B] text-white border-[#1F3D2B] font-medium shadow-xs"
                    : "bg-[#FFFFFF] text-[#555555] border-[#9E8047]/25 hover:border-[#1F3D2B] hover:text-[#1C1D1F]",
                )}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[#9E8047]/20" />

      {/* Availability */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#1C1D1F] font-semibold">
          Availability
        </h3>
        <label className="flex items-center gap-2.5 cursor-pointer py-1 group">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="w-4 h-4 text-[#1F3D2B] border-[#9E8047]/30 rounded focus:ring-[#1F3D2B] accent-[#1F3D2B]"
          />
          <span className="text-xs text-[#333333] group-hover:text-[#1C1D1F] transition-colors">
            In stock ready for dispatch
          </span>
        </label>
      </div>
    </div>
  );

  // Mobile Drawer Mode
  if (isMobile) {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/30 text-xs font-medium text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors shadow-xs"
          aria-label="Open filter drawer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#4E5F52]" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#1F3D2B] text-white text-[10px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-xs"
                onClick={() => setIsOpen(false)}
              />

              {/* Drawer Sheet */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#FFFFFF] shadow-2xl z-50 flex flex-col"
              >
                {/* Drawer Header */}
                <div className="p-4 border-b border-[#9E8047]/20 flex items-center justify-between bg-[#FAF7F2]">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#4E5F52]" />
                    <h2 className="font-heading text-base font-medium text-[#1C1D1F]">
                      Filter Formulations
                    </h2>
                    {activeFiltersCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#1F3D2B] text-white text-[10px] font-mono">
                        {activeFiltersCount} active
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-[#737373] hover:text-[#1C1D1F] hover:bg-black/5 transition-colors"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="flex-1 overflow-y-auto p-5">
                  {filterContent}
                </div>

                {/* Drawer Sticky Footer */}
                <div className="p-4 border-t border-[#9E8047]/20 bg-[#FAF7F2] flex items-center gap-3">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={() => {
                        onClearFilters();
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-[#9E8047]/30 text-xs font-medium text-[#737373] hover:text-[#1C1D1F] bg-white transition-colors text-center"
                    >
                      Reset All
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#1F3D2B] text-white text-xs font-semibold hover:bg-[#162C1F] transition-colors shadow-sm text-center"
                  >
                    View {totalResults !== undefined ? `${totalResults} ` : ""}Formulations
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop Sidebar Mode
  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#9E8047]/25 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#9E8047]/20">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#4E5F52]" />
          <h2 className="font-heading text-sm font-semibold text-[#1C1D1F]">
            Refine Catalog
          </h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-[11px] font-mono text-[#737373] hover:text-[#1C1D1F] flex items-center gap-1 transition-colors uppercase tracking-wider"
          >
            <RefreshCw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {filterContent}
    </div>
  );
}
