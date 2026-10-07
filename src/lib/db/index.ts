
const dbPath = (typeof process !== "undefined" && process.cwd ? process.cwd() : "") + "/.data/ayurveda.json";

try {
  const fs = require('fs');
  if (fs.existsSync && !fs.existsSync('.data')) {
    fs.mkdirSync('.data', { recursive: true });
  }
  if (fs.existsSync && !fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({
      products: [],
      orders: [],
      orderStatusHistory: [],
      coupons: [],
      whatsappLeads: []
    }, null, 2));
  }
} catch(e) {}




let inMemoryDB = {
  products: [],
  orders: [],
  orderStatusHistory: [],
  coupons: [],
  whatsappLeads: [],
};

let isEdge = false;
try {
  if (typeof process !== 'undefined' && process.env && process.env.CF_PAGES) {
    isEdge = true;
  }
} catch (e) {}

function readDB() {
  if (isEdge) return inMemoryDB;
  try {
    const { readFileSync } = require("fs");
    return JSON.parse(readFileSync(dbPath, "utf8"));
  } catch (e) {
    return inMemoryDB;
  }
}

function writeDB(data: any) {
  inMemoryDB = data;
  if (isEdge) return;
  try {
    const { writeFileSync } = require("fs");
    writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (e) {}
}

function createStatement(sql: string) {
  return {
    run: (...params: any[]) => {
      const db = readDB();
      const firstArg = params[0];
      const isObject =
        typeof firstArg === "object" &&
        firstArg !== null &&
        !Array.isArray(firstArg);

      if (
        sql.includes("INSERT INTO products") ||
        sql.includes("INSERT OR REPLACE INTO products")
      ) {
        const p = isObject ? firstArg : {};
        const product = {
          id: isObject ? p.id || p["@id"] : params[0],
          slug: isObject ? p.slug || p["@slug"] : params[1],
          name: isObject ? p.name || p["@name"] : params[2],
          tagline: isObject ? p.tagline || p["@tagline"] : params[3],
          description: isObject
            ? p.description || p["@description"]
            : params[4],
          short_description: isObject
            ? p.shortDescription ||
              p.short_description ||
              p["@shortDescription"]
            : params[5],
          category: isObject ? p.category || p["@category"] : params[6],
          price: isObject ? p.price || p["@price"] : params[7],
          compare_at_price: isObject
            ? p.compareAtPrice || p.compare_at_price || p["@compareAtPrice"]
            : params[8],
          inventory_quantity: isObject
            ? p.inventoryQuantity ||
              p.inventory_quantity ||
              p["@inventoryQuantity"]
            : params[9],
          track_inventory: isObject
            ? (p.trackInventory ??
              p.track_inventory ??
              p["@trackInventory"] ??
              1)
            : params[10],
          age_restricted: isObject
            ? (p.ageRestricted ?? p.age_restricted ?? p["@ageRestricted"] ?? 0)
            : params[11],
          images_json: isObject
            ? p.imagesJson || p.images_json || p["@imagesJson"]
            : params[12],
          variants_json: isObject
            ? p.variantsJson || p.variants_json || p["@variantsJson"]
            : params[13],
          ingredients_json: isObject
            ? p.ingredientsJson || p.ingredients_json || p["@ingredientsJson"]
            : params[14],
          usage: isObject ? p.usage || p["@usage"] : params[15],
          warnings_json: isObject
            ? p.warningsJson || p.warnings_json || p["@warningsJson"]
            : params[16],
          tags_json: isObject
            ? p.tagsJson || p.tags_json || p["@tagsJson"]
            : params[17],
          seo_json: isObject
            ? p.seoJson || p.seo_json || p["@seoJson"]
            : params[18],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        const idx = db.products.findIndex(
          (prod: any) => prod.id === product.id || prod.slug === product.slug,
        );
        if (idx >= 0)
          db.products[idx] = {
            ...db.products[idx],
            ...product,
            updated_at: new Date().toISOString(),
          };
        else db.products.push(product);
        writeDB(db);
        return { changes: 1 };
      }

      if (
        sql.includes("INSERT INTO orders") ||
        sql.includes("INSERT OR REPLACE INTO orders")
      ) {
        const o = isObject ? firstArg : {};
        const order = {
          id: isObject ? o.id || o["@id"] : params[0],
          order_number: isObject
            ? o.order_number || o.orderNumber || o["@order_number"]
            : params[1],
          customer_name: isObject
            ? o.customer_name || o.customerName || o["@customer_name"]
            : params[2],
          customer_phone: isObject
            ? o.customer_phone || o.customerPhone || o["@customer_phone"]
            : params[3],
          customer_email: isObject
            ? o.customer_email || o.customerEmail || o["@customer_email"]
            : params[4],
          shipping_address_json: isObject
            ? typeof o.shipping_address_json === "string"
              ? o.shipping_address_json
              : JSON.stringify(o.shipping_address_json || o.shippingAddress)
            : typeof params[5] === "string"
              ? params[5]
              : JSON.stringify(params[5]),
          billing_address_json: isObject
            ? typeof o.billing_address_json === "string"
              ? o.billing_address_json
              : JSON.stringify(
                  o.billing_address_json ||
                    o.billingAddress ||
                    o.shippingAddress,
                )
            : typeof params[6] === "string"
              ? params[6]
              : JSON.stringify(params[6]),
          items_json: isObject
            ? typeof o.items_json === "string"
              ? o.items_json
              : JSON.stringify(o.items_json || o.items)
            : typeof params[7] === "string"
              ? params[7]
              : JSON.stringify(params[7]),
          subtotal: isObject ? o.subtotal || o["@subtotal"] : params[8],
          shipping_cost: isObject
            ? (o.shipping_cost ?? o.shipping ?? o["@shipping_cost"] ?? 0)
            : (params[9] ?? 0),
          tax_amount: isObject
            ? (o.tax_amount ?? o.tax ?? o["@tax_amount"] ?? 0)
            : (params[10] ?? 0),
          discount_amount: isObject
            ? (o.discount_amount ?? o.discount ?? o["@discount_amount"] ?? 0)
            : (params[11] ?? 0),
          total_amount: isObject
            ? o.total_amount || o.total || o["@total_amount"]
            : params[12],
          payment_method: isObject
            ? o.payment_method || o.paymentMethod || o["@payment_method"]
            : params[13],
          payment_status: isObject
            ? o.payment_status || o.paymentStatus || "pending"
            : params[14] || "pending",
          order_status: isObject
            ? o.order_status || o.orderStatus || "confirmed"
            : params[15] || "confirmed",
          coupon_code: isObject
            ? o.coupon_code || o.couponCode || null
            : params[16] || null,
          notes: isObject ? o.notes || null : params[17] || null,
          whatsapp_message_sent: isObject
            ? o.whatsapp_message_sent
              ? 1
              : 0
            : params[18]
              ? 1
              : 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        const idx = db.orders.findIndex(
          (ord: any) =>
            ord.id === order.id || ord.order_number === order.order_number,
        );
        if (idx >= 0)
          db.orders[idx] = {
            ...db.orders[idx],
            ...order,
            updated_at: new Date().toISOString(),
          };
        else db.orders.push(order);
        writeDB(db);
        return { changes: 1 };
      }

      if (
        sql.includes("INSERT INTO coupons") ||
        sql.includes("INSERT OR REPLACE INTO coupons")
      ) {
        const c = isObject ? firstArg : {};
        const coupon = {
          code: (isObject ? c.code || c["@code"] : params[0]).toUpperCase(),
          type: isObject ? c.type || c["@type"] : params[1],
          value: isObject ? c.value || c["@value"] : params[2],
          min_order_amount: isObject
            ? (c.minOrderAmount ??
              c.min_order_amount ??
              c["@minOrderAmount"] ??
              0)
            : (params[3] ?? 0),
          max_discount_amount: isObject
            ? (c.maxDiscountAmount ??
              c.max_discount_amount ??
              c["@maxDiscountAmount"] ??
              null)
            : (params[4] ?? null),
          usage_limit: isObject
            ? (c.usageLimit ?? c.usage_limit ?? c["@usageLimit"] ?? 100)
            : (params[5] ?? 100),
          used_count: isObject
            ? (c.usedCount ?? c.used_count ?? c["@usedCount"] ?? 0)
            : (params[6] ?? 0),
          expires_at: isObject
            ? c.expiresAt || c.expires_at || c["@expiresAt"]
            : params[7],
          is_active: isObject
            ? (c.isActive ?? c.is_active ?? c["@isActive"] ?? 1)
            : (params[8] ?? 1),
          applicable_products_json: isObject
            ? c.applicableProductsJson || c["@applicableProductsJson"] || "[]"
            : params[9] || "[]",
          applicable_categories_json: isObject
            ? c.applicableCategoriesJson ||
              c["@applicableCategoriesJson"] ||
              "[]"
            : params[10] || "[]",
        };
        const idx = db.coupons.findIndex(
          (item: any) => item.code === coupon.code,
        );
        if (idx >= 0) db.coupons[idx] = coupon;
        else db.coupons.push(coupon);
        writeDB(db);
        return { changes: 1 };
      }

      if (sql.includes("INSERT INTO order_status_history")) {
        db.orderStatusHistory.push({
          id: Date.now(),
          order_id: params[0],
          status: params[1],
          note: params[2],
          created_at: new Date().toISOString(),
        });
        writeDB(db);
        return { changes: 1 };
      }

      if (sql.includes("INSERT INTO whatsapp_leads")) {
        db.whatsappLeads.push({
          id: Date.now(),
          source: params[0],
          product_id: params[1],
          product_name: params[2],
          customer_name: params[3],
          customer_phone: params[4],
          customer_email: params[5],
          quantity: params[6],
          order_total: params[7],
          message_preview: params[8],
          user_agent: params[9],
          referrer: params[10],
          created_at: new Date().toISOString(),
        });
        writeDB(db);
        return { changes: 1 };
      }

      if (sql.includes("UPDATE orders SET order_status")) {
        const targetId = params[1];
        const order = db.orders.find(
          (o: any) => o.id === targetId || o.order_number === targetId,
        );
        if (order) {
          order.order_status = params[0];
          order.updated_at = new Date().toISOString();
          writeDB(db);
          return { changes: 1 };
        }
        return { changes: 0 };
      }

      if (
        sql.includes(
          "UPDATE products SET inventory_quantity = inventory_quantity -",
        )
      ) {
        const product = db.products.find((p: any) => p.id === params[1]);
        if (product && product.track_inventory) {
          product.inventory_quantity = Math.max(
            0,
            product.inventory_quantity - params[0],
          );
          writeDB(db);
        }
        return { changes: 1 };
      }

      if (
        sql.includes(
          "UPDATE products SET inventory_quantity = inventory_quantity +",
        )
      ) {
        const product = db.products.find((p: any) => p.id === params[1]);
        if (product && product.track_inventory) {
          product.inventory_quantity += params[0];
          writeDB(db);
        }
        return { changes: 1 };
      }

      return { changes: 0 };
    },
    get: (...params: any[]) => {
      const db = readDB();
      if (sql.includes("FROM products")) {
        if (sql.includes("slug = ?")) {
          return db.products.find((p: any) => p.slug === params[0]);
        }
        return db.products.find(
          (p: any) => p.id === params[0] || p.slug === params[0],
        );
      }
      if (sql.includes("FROM orders")) {
        if (sql.includes("COUNT")) {
          let list = db.orders;
          if (
            params.length > 0 &&
            typeof params[0] === "string" &&
            params[0].startsWith("%")
          ) {
            const s = params[0].replace(/%/g, "").toLowerCase();
            list = list.filter(
              (o: any) =>
                (o.customer_name &&
                  o.customer_name.toLowerCase().includes(s)) ||
                (o.customer_phone && o.customer_phone.includes(s)) ||
                (o.customer_email &&
                  o.customer_email.toLowerCase().includes(s)) ||
                (o.id && o.id.toLowerCase().includes(s)) ||
                (o.order_number && o.order_number.toLowerCase().includes(s)),
            );
          }
          return { total: list.length };
        }
        const query = params[0];
        return db.orders.find(
          (o: any) =>
            o.id === query ||
            o.order_number === query ||
            o.customer_phone === query,
        );
      }
      if (sql.includes("FROM coupons")) {
        const code = (params[0] || "").toString().toUpperCase();
        return db.coupons.find((c: any) => c.code === code);
      }
      return undefined;
    },
    all: (...params: any[]) => {
      const db = readDB();
      if (sql.includes("SELECT * FROM orders")) {
        let result = [...db.orders].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        if (
          params.length > 0 &&
          typeof params[0] === "string" &&
          params[0].startsWith("%")
        ) {
          const s = params[0].replace(/%/g, "").toLowerCase();
          result = result.filter(
            (o: any) =>
              (o.customer_name && o.customer_name.toLowerCase().includes(s)) ||
              (o.customer_phone && o.customer_phone.includes(s)) ||
              (o.customer_email &&
                o.customer_email.toLowerCase().includes(s)) ||
              (o.id && o.id.toLowerCase().includes(s)) ||
              (o.order_number && o.order_number.toLowerCase().includes(s)),
          );
        }

        const limitMatch = sql.match(/LIMIT (\d+|\?)/);
        const offsetMatch = sql.match(/OFFSET (\d+|\?)/);
        let limit = 20;
        let offset = 0;

        if (
          params.length >= 2 &&
          typeof params[params.length - 2] === "number"
        ) {
          limit = params[params.length - 2];
          offset = params[params.length - 1];
        } else if (limitMatch && limitMatch[1] !== "?") {
          limit = parseInt(limitMatch[1]);
          if (offsetMatch && offsetMatch[1] !== "?")
            offset = parseInt(offsetMatch[1]);
        }

        return result.slice(offset, offset + limit);
      }
      if (sql.includes("SELECT * FROM whatsapp_leads")) {
        return [...db.whatsappLeads]
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )
          .slice(0, 100);
      }
      if (sql.includes("SELECT * FROM products")) {
        return db.products;
      }
      if (sql.includes("SELECT * FROM order_status_history")) {
        if (params.length > 0) {
          return db.orderStatusHistory.filter(
            (h: any) => h.order_id === params[0],
          );
        }
        return db.orderStatusHistory;
      }
      return [];
    },
  };
}

export const db = {
  exec: (sql: string) => {
    // Schema creation is satisfied by JSON structure in readDB/writeDB
  },
  prepare: (sql: string) => createStatement(sql),
  transaction: (fn: Function) => {
    return (...args: any[]) => fn(...args);
  },
};

export function getDb() {
  return db;
}

export function initializeDatabase() {}

initializeDatabase();
