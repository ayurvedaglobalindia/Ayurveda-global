"use client";

import { classNames } from "@/lib/utils/formatters";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import type { Product } from "@/types";
import { motion } from "framer-motion";
import { staggerContainerVariant, fadeUpVariant } from "@/lib/animations";

interface ProductGridProps {
  products: Product[];
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  variant?: "default" | "compact" | "featured" | "list";
  showQuickActions?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
}

export function ProductGrid({
  products,
  columns: customColumns,
  variant = "default",
  showQuickActions = true,
  loading = false,
  emptyMessage = "No products found",
  emptyAction,
}: ProductGridProps) {
  const isList = variant === "list";
  const columns = isList
    ? { base: 1, sm: 1, md: 1, lg: 1, xl: 1, ...customColumns }
    : { base: 1, sm: 2, md: 2, lg: 3, xl: 3, ...customColumns };

  const getColClass = (cols: number) => {
    switch (cols) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-2";
      case 3: return "grid-cols-3";
      case 4: return "grid-cols-4";
      default: return "grid-cols-1";
    }
  };
  const getSmColClass = (cols: number) => {
    switch (cols) {
      case 1: return "sm:grid-cols-1";
      case 2: return "sm:grid-cols-2";
      case 3: return "sm:grid-cols-3";
      case 4: return "sm:grid-cols-4";
      default: return "sm:grid-cols-2";
    }
  };
  const getMdColClass = (cols: number) => {
    switch (cols) {
      case 1: return "md:grid-cols-1";
      case 2: return "md:grid-cols-2";
      case 3: return "md:grid-cols-3";
      case 4: return "md:grid-cols-4";
      default: return "md:grid-cols-2";
    }
  };
  const getLgColClass = (cols: number) => {
    switch (cols) {
      case 1: return "lg:grid-cols-1";
      case 2: return "lg:grid-cols-2";
      case 3: return "lg:grid-cols-3";
      case 4: return "lg:grid-cols-4";
      default: return "lg:grid-cols-3";
    }
  };
  const getXlColClass = (cols: number) => {
    switch (cols) {
      case 1: return "xl:grid-cols-1";
      case 2: return "xl:grid-cols-2";
      case 3: return "xl:grid-cols-3";
      case 4: return "xl:grid-cols-4";
      default: return "xl:grid-cols-3";
    }
  };

  const gridClasses = classNames(
    "grid gap-5 sm:gap-6",
    getColClass(columns.base),
    getSmColClass(columns.sm),
    getMdColClass(columns.md),
    getLgColClass(columns.lg),
    getXlColClass(columns.xl),
  );

  if (loading) {
    return (
      <div className={gridClasses} role="status" aria-label="Loading products">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFFFFF] border border-[#9E8047]/25 flex items-center justify-center text-[#9E8047]">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-[#1C1D1F] mb-2">{emptyMessage}</h3>
        <p className="text-[#737373] mb-6">Try adjusting your filters or search terms</p>
        {emptyAction}
      </div>
    );
  }

  return (
    <motion.div 
      variants={staggerContainerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={gridClasses} 
      role="list" 
      aria-label="Products"
    >
      {products.map((product) => (
        <motion.div variants={fadeUpVariant} key={product.id}>
          <ProductCard
            product={product}
            variant={variant}
            showQuickActions={showQuickActions}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
