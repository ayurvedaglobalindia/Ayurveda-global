import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { db } from "@/lib/db";
import { products, categories } from "@/lib/products/registry";
import type { DBCoupon } from "@/lib/db/schema/types";

export function initializeProductionSchema() {
  console.log("⚡ Executing production SQL schema initialization...");
  const schemaPath = join(process.cwd(), "src/lib/db/schema/schema.sql");
  
  if (existsSync(schemaPath)) {
    const sql = readFileSync(schemaPath, "utf-8");
    db.exec(sql);
    console.log("✅ Production SQL Schema executed successfully.");
  } else {
    console.warn("⚠️ Schema file not found at:", schemaPath);
  }
}

export function seedInitialData() {
  console.log("🌱 Seeding Categories, Products & Classical Coupons...");

  // 1. Seed Categories
  const categoryStmt = db.prepare(`
    INSERT OR REPLACE INTO categories (
      id, slug, name, description, image_url, display_order, is_active
    ) VALUES (
      @id, @slug, @name, @description, @imageUrl, @displayOrder, @isActive
    )
  `);

  categories.forEach((cat, idx) => {
    categoryStmt.run({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      description: cat.description,
      imageUrl: cat.image,
      displayOrder: idx + 1,
      isActive: 1,
    });
  });
  console.log(`✅ Seeded ${categories.length} categories.`);

  // 2. Seed Products
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

  for (const product of products) {
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
  console.log(`✅ Seeded ${products.length} standardized Ayurvedic formulations.`);

  // 3. Seed Promotional Coupons
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
      minOrderAmount: 50000, // ₹500
      maxDiscountAmount: 200000, // ₹2,000 max discount
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
      minOrderAmount: 150000, // ₹1,500
      maxDiscountAmount: 500000, // ₹5,000 max discount
      usageLimit: 50,
      usedCount: 0,
      expiresAt: "2030-12-31 23:59:59",
      isActive: 1,
      applicableProductsJson: JSON.stringify([]),
      applicableCategoriesJson: JSON.stringify([]),
    },
  ];

  for (const c of coupons) {
    couponStmt.run(c);
  }
  console.log(`✅ Seeded ${coupons.length} promotional coupons.`);
}

if (require.main === module) {
  initializeProductionSchema();
  seedInitialData();
}
