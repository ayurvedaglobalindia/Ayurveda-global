"use client";

import {
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  ShoppingBag,
  Sparkles,
  Calendar,
  Tag,
} from "lucide-react";
import { classNames } from "@/lib/utils/formatters";
import { Select } from "@/components/ui/Select";

const sortOptions = [
  { value: "featured", label: "Featured", icon: Sparkles },
  { value: "best-selling", label: "Best Selling", icon: ShoppingBag },
  { value: "newest", label: "Newest", icon: Calendar },
  { value: "price-asc", label: "Price: Low to High", icon: ArrowUpDown },
  { value: "price-desc", label: "Price: High to Low", icon: ArrowUpDown },
  { value: "name-asc", label: "Name: A to Z", icon: Tag },
  { value: "name-desc", label: "Name: Z to A", icon: Tag },
];

interface ProductSortProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
  className?: string;
}

export function ProductSort({
  selectedSort,
  onSortChange,
  className,
}: ProductSortProps) {
  return (
    <Select
      value={selectedSort}
      onChange={(e) => onSortChange(e.target.value)}
      options={sortOptions}
      placeholder="Sort by"
      className={classNames("w-full sm:w-48", className)}
      aria-label="Sort products"
    />
  );
}
