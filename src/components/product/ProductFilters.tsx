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
  { id: "shilajit", label: "Pure Shilajit", tag: "shilajit" },
  { id: "ashwagandha", label: "KSM-66 Ashwagandha", tag: "ashwagandha" },
  { id: "stress-relief", label: "Stress & Sleep", tag: "stress-relief" },
  { id: "vitality", label: "Classical Vajikara", tag: "vitality" },
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
          <h3 className="text-xs font-sans uppercase tracking-wider text-[#071A12] font-bold">
            Formulation Category
          </h3>
          {selectedCategory && (
            <button
              onClick={() => onCategoryChange(undefined)}
              className="text-[11px] text-[#0E3924] font-medium hover:underline cursor-pointer"
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
              "w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer",
              !selectedCategory
                ? "bg-[#0E3924] text-white font-medium shadow-xs"
                : "text-[#555555] hover:bg-[#FAF7F2] hover:text-[#071A12]",
            )}
          >
            <span>All Formulations</span>
            <span
              className={classNames(
                "text-[10px] font-mono px-2 py-0.5 rounded-full",
                !selectedCategory
                  ? "bg-white/20 text-white"
                  : "bg-[#0E3924]/6 text-[#0E3924]",
              )}
            >
              {totalResults ?? categories.reduce((sum, c) => sum + (c.productCount || 0), 0)}
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
                  "w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer",
                  isSelected
                    ? "bg-[#0E3924] text-white font-medium shadow-xs"
                    : "text-[#555555] hover:bg-[#FAF7F2] hover:text-[#071A12]",
                )}
              >
                <span className="truncate pr-2">{cat.name}</span>
                <span
                  className={classNames(
                    "text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#0E3924]/6 text-[#0E3924]",
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
      <hr className="border-[#0E3924]/10" />

      {/* Price Range Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-sans uppercase tracking-wider text-[#071A12] font-bold">
            Price Range
          </h3>
          <span className="text-[11px] font-mono text-[#0E3924] font-semibold">
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
                  "px-2.5 py-1.5 rounded-lg text-[11px] font-sans border transition-all text-center truncate cursor-pointer",
                  isActive
                    ? "bg-[#0E3924] text-white border-[#0E3924] font-medium shadow-xs"
                    : "bg-white text-[#555555] border-[#0E3924]/15 hover:border-[#0E3924]/35 hover:text-[#071A12]",
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
                className="w-full pl-6 pr-2 py-1.5 bg-[#FAF7F2] border border-[#0E3924]/20 rounded-lg text-xs text-[#071A12] focus:outline-none focus:border-[#0E3924]"
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
                className="w-full pl-6 pr-2 py-1.5 bg-[#FAF7F2] border border-[#0E3924]/20 rounded-lg text-xs text-[#071A12] focus:outline-none focus:border-[#0E3924]"
                placeholder="Max"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyPrice}
              className="px-3.5 py-1.5 bg-[#0E3924] text-white rounded-lg text-xs font-semibold hover:bg-[#071A12] transition-colors cursor-pointer"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[#0E3924]/10" />

      {/* Health Indication & Tags */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-sans uppercase tracking-wider text-[#071A12] font-bold">
            Health Focus
          </h3>
          {selectedTags.length > 0 && (
            <button
              onClick={() => onTagsChange([])}
              className="text-[11px] text-[#0E3924] font-medium hover:underline cursor-pointer"
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
                  "px-3 py-1 rounded-full text-[11px] font-sans border transition-all inline-flex items-center gap-1 cursor-pointer",
                  isSelected
                    ? "bg-[#0E3924] text-white border-[#0E3924] font-medium shadow-xs"
                    : "bg-white text-[#555555] border-[#0E3924]/15 hover:border-[#0E3924]/35 hover:text-[#071A12]",
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
      <hr className="border-[#0E3924]/10" />

      {/* Availability */}
      <div className="space-y-3">
        <h3 className="text-xs font-sans uppercase tracking-wider text-[#071A12] font-bold">
          Availability
        </h3>
        <label className="flex items-center gap-2.5 cursor-pointer py-1 group">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="w-4 h-4 text-[#0E3924] border-[#0E3924]/30 rounded focus:ring-[#0E3924] accent-[#0E3924] cursor-pointer"
          />
          <span className="text-xs text-[#333333] group-hover:text-[#071A12] transition-colors font-sans">
            In stock ready for immediate dispatch
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
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#0E3924]/20 text-xs font-semibold text-[#071A12] hover:bg-[#FAF7F2] transition-colors shadow-xs cursor-pointer"
          aria-label="Open filter drawer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#0E3924]" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#0E3924] text-white text-[10px] font-bold flex items-center justify-center">
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
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                onClick={() => setIsOpen(false)}
              />

              {/* Drawer Sheet */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
              >
                {/* Drawer Header */}
                <div className="p-4 border-b border-[#0E3924]/15 flex items-center justify-between bg-[#FAF7F2]">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#0E3924]" />
                    <h2 className="font-editorial text-base font-medium text-[#071A12]">
                      Filter Formulations
                    </h2>
                    {activeFiltersCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#0E3924] text-white text-[10px] font-mono">
                        {activeFiltersCount} active
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-[#737373] hover:text-[#071A12] hover:bg-black/5 transition-colors cursor-pointer"
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
                <div className="p-4 border-t border-[#0E3924]/15 bg-[#FAF7F2] flex items-center gap-3">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={() => {
                        onClearFilters();
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-[#0E3924]/20 text-xs font-semibold text-[#555555] hover:text-[#071A12] bg-white transition-colors text-center cursor-pointer"
                    >
                      Reset All
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#0E3924] text-white text-xs font-bold hover:bg-[#071A12] transition-colors shadow-sm text-center cursor-pointer"
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
    <div className="bg-white rounded-3xl border border-[#0E3924]/15 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#0E3924]/15">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#0E3924]" />
          <h2 className="font-editorial text-base font-normal text-[#071A12]">
            Refine Formulary
          </h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-[11px] font-sans text-[#0E3924] hover:text-[#071A12] font-semibold flex items-center gap-1 transition-colors uppercase tracking-wider cursor-pointer"
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
