import type { ShippingCalculation, Address } from "@/types";

export const SHIPPING_FLAT_RATE = 4900;
export const FREE_SHIPPING_THRESHOLD = 99900;

export function calculateShipping(
  subtotal: number,
  _address?: Address,
): ShippingCalculation {
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const cost = freeShipping ? 0 : SHIPPING_FLAT_RATE;

  let estimatedDays = "5-7 business days";
  if (freeShipping) {
    estimatedDays = "5-7 business days (Free Shipping)";
  }

  return {
    cost,
    freeShipping,
    estimatedDays,
  };
}

export function getShippingMessage(subtotal: number): string {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return "Enjoy free shipping on this order!";
  }
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  return `Add ${formatINR(remaining)} more for free shipping`;
}

export function formatINR(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(rupees);
}
