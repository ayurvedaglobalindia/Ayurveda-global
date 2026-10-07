import type { Coupon } from "@/types";

// Static in-memory coupon engine for static export / Cloudflare Pages

interface DbCoupon {
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  usage_limit: number;
  used_count: number;
  expires_at: string;
  is_active: number | boolean;
  applicable_products_json?: string;
  applicable_categories_json?: string;
}

function mapDbCoupon(row: DbCoupon): Coupon {
  return {
    code: row.code,
    type: row.type,
    value: row.value,
    minOrderAmount: row.min_order_amount,
    maxDiscountAmount: row.max_discount_amount,
    usageLimit: row.usage_limit,
    usedCount: row.used_count,
    expiresAt: row.expires_at,
    isActive: Boolean(row.is_active),
    applicableProducts: JSON.parse(row.applicable_products_json || "[]"),
    applicableCategories: JSON.parse(row.applicable_categories_json || "[]"),
  };
}

const defaultCoupons: Record<string, DbCoupon> = {
  AYUR10: {
    code: "AYUR10",
    type: "percentage",
    value: 10,
    min_order_amount: 0,
    max_discount_amount: 100000,
    usage_limit: 10000,
    used_count: 0,
    expires_at: "2028-12-31T23:59:59Z",
    is_active: 1,
    applicable_products_json: "[]",
    applicable_categories_json: "[]",
  },
  WELCOME10: {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    min_order_amount: 0,
    max_discount_amount: 100000,
    usage_limit: 10000,
    used_count: 0,
    expires_at: "2028-12-31T23:59:59Z",
    is_active: 1,
    applicable_products_json: "[]",
    applicable_categories_json: "[]",
  },
  AYUR20: {
    code: "AYUR20",
    type: "percentage",
    value: 20,
    min_order_amount: 250000,
    max_discount_amount: 150000,
    usage_limit: 5000,
    used_count: 0,
    expires_at: "2028-12-31T23:59:59Z",
    is_active: 1,
    applicable_products_json: "[]",
    applicable_categories_json: "[]",
  },
};

export function validateCoupon(
  code: string,
  subtotal: number,
  productIds: string[],
  categories: string[],
): { valid: boolean; coupon?: Coupon; discount: number; error?: string } {
  const row: DbCoupon | undefined = defaultCoupons[code.toUpperCase()];

  if (!row) {
    return { valid: false, discount: 0, error: "Invalid coupon code" };
  }

  const now = new Date();
  const expiresAt = new Date(row.expires_at);

  if (now > expiresAt) {
    return { valid: false, discount: 0, error: "Coupon has expired" };
  }

  if (row.used_count >= row.usage_limit) {
    return { valid: false, discount: 0, error: "Coupon usage limit reached" };
  }

  if (subtotal < row.min_order_amount) {
    return {
      valid: false,
      discount: 0,
      error: `Minimum order amount of ${formatINR(row.min_order_amount)} required`,
    };
  }

  const applicableProducts = JSON.parse(row.applicable_products_json || "[]");
  const applicableCategories = JSON.parse(
    row.applicable_categories_json || "[]",
  );

  if (
    applicableProducts.length > 0 &&
    !productIds.some((id) => applicableProducts.includes(id))
  ) {
    return {
      valid: false,
      discount: 0,
      error: "Coupon not applicable to items in cart",
    };
  }

  if (
    applicableCategories.length > 0 &&
    !categories.some((cat) => applicableCategories.includes(cat))
  ) {
    return {
      valid: false,
      discount: 0,
      error: "Coupon not applicable to items in cart",
    };
  }

  let discount = 0;
  switch (row.type) {
    case "percentage":
      discount = Math.round((subtotal * row.value) / 100);
      if (row.max_discount_amount && discount > row.max_discount_amount) {
        discount = row.max_discount_amount;
      }
      break;
    case "fixed":
      discount = Math.min(row.value, subtotal);
      break;
    case "free_shipping":
      discount = 0;
      break;
  }

  const coupon = mapDbCoupon(row);
  return { valid: true, coupon, discount };
}

export function applyCoupon(code: string): Coupon | null {
  const row = defaultCoupons[code.toUpperCase()];
  if (row) {
    row.used_count += 1;
  }
  return getCoupon(code);
}

export function getCoupon(code: string): Coupon | null {
  const row = defaultCoupons[code.toUpperCase()];
  return row ? mapDbCoupon(row) : null;
}

export function getActiveCoupons(): Coupon[] {
  return Object.values(defaultCoupons).map(mapDbCoupon);
}

function formatINR(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(rupees);
}
