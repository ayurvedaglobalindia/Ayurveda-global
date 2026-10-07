"use client";

import { SelectHTMLAttributes, forwardRef } from "react";
import { classNames } from "@/lib/utils/formatters";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, hint, options, placeholder, id, ...props },
    ref,
  ) => {
    const selectId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="label">
            {label}
            {props.required && (
              <span className="text-[#9E8047] ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={classNames(
              "input pr-10 appearance-none cursor-pointer bg-[#FFFFFF] text-[#1C1D1F] border border-[#9E8047]/25 rounded-xl",
              error && "border-rose-400 focus:ring-rose-400",
              className,
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${selectId}-error`
                : hint
                  ? `${selectId}-hint`
                  : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-[#FAF7F2] text-[#737373]">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[#FFFFFF] text-[#1C1D1F]"
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#737373]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-1 text-xs text-rose-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="mt-1 text-xs text-[#737373]">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
