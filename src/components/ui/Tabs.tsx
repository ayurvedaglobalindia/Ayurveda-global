"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classNames } from "@/lib/utils/formatters";

interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
  variant?: "line" | "pills" | "underline";
}

export function Tabs({
  items,
  defaultIndex = 0,
  onChange,
  className,
  variant = "line",
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleTabClick = (index: number) => {
    if (!items[index].disabled) {
      setActiveIndex(index);
      onChange?.(index);
    }
  };

  const tabStyles = {
    line: (isActive: boolean) =>
      classNames(
        "px-4 py-2.5 text-xs sm:text-sm font-medium transition-all relative border-b-2",
        isActive
          ? "text-[#1C1D1F] border-[#1C1D1F] font-semibold"
          : "text-[#737373] border-transparent hover:text-[#1C1D1F] hover:border-[#9E8047]/30",
      ),
    pills: (isActive: boolean) =>
      classNames(
        "px-4 py-1.5 text-xs font-medium rounded-full transition-all border",
        isActive
          ? "bg-[#1C1D1F] text-[#FAF7F2] border-[#1C1D1F] font-semibold shadow-xs"
          : "bg-[#FAF7F2] text-[#555555] border-[#9E8047]/25 hover:bg-[#EAE4DC] hover:text-[#1C1D1F]",
      ),
    underline: (isActive: boolean) =>
      classNames(
        "px-4 py-2.5 text-xs sm:text-sm font-medium transition-all relative border-b-2",
        isActive
          ? "text-[#1C1D1F] border-[#1C1D1F] font-semibold"
          : "text-[#737373] border-transparent hover:text-[#1C1D1F] hover:border-[#9E8047]/30",
      ),
  };

  return (
    <div className={classNames("space-y-4", className)}>
      <div
        className={classNames(
          "flex gap-2 overflow-x-auto pb-1",
          variant !== "pills" && "border-b border-[#9E8047]/25",
        )}
        role="tablist"
      >
        {items.map((item, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            onClick={() => handleTabClick(index)}
            disabled={item.disabled}
            className={classNames(
              tabStyles[variant](index === activeIndex),
              item.disabled && "opacity-50 cursor-not-allowed",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          role="tabpanel"
          id={`tabpanel-${activeIndex}`}
          aria-labelledby={`tab-${activeIndex}`}
        >
          {items[activeIndex]?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
