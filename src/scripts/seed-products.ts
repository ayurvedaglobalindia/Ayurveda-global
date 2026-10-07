import { db } from "@/lib/db";
import { products } from "@/lib/products/registry";
import bcrypt from "bcryptjs";

console.log("Seeding database...");

// Seed products
const productStmt = db.prepare(`
  INSERT OR REPLACE INTO products (
    id, slug, name, tagline, description, short_description, category,
    price, compare_at_price, inventory_quantity, track_inventory,
    age_restricted, images_json, variants_json, ingredients_json,
    usage, warnings_json, tags_json, seo_json
  ) VALUES (
    @id, @slug, @name, @tagline, @description, @shortDescription, @category,
    @price, @compareAtPrice, @inventoryQuantity, @trackInventory,
    @ageRestricted, @imagesJson, @variantsJson, @ingredientsJson,
    @usage, @warningsJson, @tagsJson, @seoJson
  )
`);

const insertProducts = db.transaction((productList: typeof products) => {
  for (const product of productList) {
    productStmt.run({
      id: product.id,
      slug: product.slug,
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      shortDescription: product.shortDescription,
      category: product.category,
      price: product.price,
      compareAtPrice: product.compareAtPrice || null,
      inventoryQuantity: product.inventory.quantity,
      trackInventory: product.inventory.trackQuantity ? 1 : 0,
      ageRestricted: product.ageRestricted ? 1 : 0,
      imagesJson: JSON.stringify(product.images),
      variantsJson: JSON.stringify(product.variants),
      ingredientsJson: JSON.stringify(product.ingredients),
      usage: product.usage,
      warningsJson: JSON.stringify(product.warnings),
      tagsJson: JSON.stringify(product.tags),
      seoJson: JSON.stringify(product.seo),
    });
  }
});

insertProducts(products);
console.log(`Seeded ${products.length} products successfully`);

// Seed coupons
const couponStmt = db.prepare(`
  INSERT OR REPLACE INTO coupons (
    code, type, value, min_order_amount, max_discount_amount,
    usage_limit, used_count, expires_at, is_active,
    applicable_products_json, applicable_categories_json
  ) VALUES (
    @code, @type, @value, @minOrderAmount, @maxDiscountAmount,
    @usageLimit, @usedCount, @expiresAt, @isActive,
    @applicableProductsJson, @applicableCategoriesJson
  )
`);

const coupons = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrderAmount: 50000,
    maxDiscountAmount: 200000,
    usageLimit: 100,
    usedCount: 0,
    expiresAt: "2030-12-31 23:59:59",
    isActive: 1,
    applicableProductsJson: JSON.stringify([]),
    applicableCategoriesJson: JSON.stringify([]),
  },
  {
    code: "FREESHIP",
    type: "free_shipping",
    value: 0,
    minOrderAmount: 0,
    maxDiscountAmount: null,
    usageLimit: 500,
    usedCount: 0,
    expiresAt: "2030-12-31 23:59:59",
    isActive: 1,
    applicableProductsJson: JSON.stringify([]),
    applicableCategoriesJson: JSON.stringify([]),
  },
  {
    code: "AYURVEDA20",
    type: "percentage",
    value: 20,
    minOrderAmount: 150000,
    maxDiscountAmount: 500000,
    usageLimit: 50,
    usedCount: 0,
    expiresAt: "2030-12-31 23:59:59",
    isActive: 1,
    applicableProductsJson: JSON.stringify([]),
    applicableCategoriesJson: JSON.stringify([]),
  },
];

const insertCoupons = db.transaction((couponList: typeof coupons) => {
  for (const coupon of couponList) {
    couponStmt.run(coupon);
  }
});

insertCoupons(coupons);
console.log(`Seeded ${coupons.length} coupons successfully`);

console.log("Database seeding completed!");
