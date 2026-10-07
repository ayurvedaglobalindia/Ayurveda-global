"use client";

import { Plus, Minus } from "lucide-react";
import { classNames } from "@/lib/utils/formatters";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (value < max) onChange(value + 1);
  };

  const sizeStyles = {
    sm: "h-7 text-xs px-2 w-10",
    md: "h-8 text-sm px-2 w-12",
    lg: "h-10 text-base px-3 w-14",
  };

  const buttonSize = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div
      className={classNames(
        "inline-flex items-center bg-[#FFFFFF] border border-[#9E8047]/25 rounded-lg overflow-hidden hover:border-[#1C1D1F]/40 transition-colors",
        className,
      )}
    >
      <button
        onClick={handleDecrease}
        disabled={value <= min}
        className={classNames(
          "flex items-center justify-center text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          buttonSize[size],
        )}
        aria-label="Decrease quantity"
      >
        <Minus
          className={classNames("w-3.5 h-3.5", size === "sm" && "w-3 h-3")}
        />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = Math.max(
            min,
            Math.min(max, parseInt(e.target.value) || min),
          );
          onChange(newValue);
        }}
        onBlur={(e) => {
          const newValue = Math.max(
            min,
            Math.min(max, parseInt(e.target.value) || min),
          );
          onChange(newValue);
        }}
        className={classNames(
          "text-center bg-transparent border-0 focus:outline-none focus:ring-0 appearance-none text-[#1C1D1F] font-mono font-medium",
          sizeStyles[size],
        )}
        min={min}
        max={max}
        aria-label="Quantity"
      />
      <button
        onClick={handleIncrease}
        disabled={value >= max}
        className={classNames(
          "flex items-center justify-center text-[#1C1D1F] hover:bg-[#FAF7F2] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          buttonSize[size],
        )}
        aria-label="Increase quantity"
      >
        <Plus
          className={classNames("w-3.5 h-3.5", size === "sm" && "w-3 h-3")}
        />
      </button>
    </div>
  );
}
