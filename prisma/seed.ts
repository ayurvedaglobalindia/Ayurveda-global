import { db } from "@/lib/db";

export async function runPrismaSeed() {
  console.log("🌱 Executing Prisma/SQL Seed for Ayur Veda Global...");

  // 1. Users
  const userStmt = db.prepare(`
    INSERT OR REPLACE INTO users (id, name, phone_number, email, role, created_at, updated_at)
    VALUES (@id, @name, @phoneNumber, @email, @role, @createdAt, @updatedAt)
  `);

  const users = [
    {
      id: "usr-001",
      name: "Dr. Ramesh Vaidya",
      phoneNumber: "919123485451",
      email: "vaidya@ayurvedaglobal.com",
      role: "ADMIN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "usr-002",
      name: "Vikram Malhotra",
      phoneNumber: "919876543210",
      email: "vikram.m@example.com",
      role: "CUSTOMER",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "usr-003",
      name: "Ananya Deshmukh",
      phoneNumber: "919820011223",
      email: "ananya.d@example.com",
      role: "CUSTOMER",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  for (const u of users) {
    try {
      userStmt.run(u);
    } catch (e) {}
  }
  console.log(`✅ Seeded ${users.length} users.`);

  // 2. Core Sample Products
  const prodStmt = db.prepare(`
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

  const sampleProducts = [
    {
      id: "prod-body-nutrition",
      slug: "body-essential-nutrition",
      name: "BODY Essential Nutrition (60 Capsules)",
      tagline: "Herbal & Safe | Energy, Strength & Stamina",
      description: "Ayur Veda Global's BODY Essential Nutrition is an authentic, lab-certified Ayurvedic formulation engineered for peak energy, muscle vitality, and endurance. Built on classical Rasayana principles, this daily supplement works from within to strengthen bodily tissues (Dhatus).",
      shortDescription: "Premium Ayurvedic revitalization formula with 60 vegetarian capsules to boost physical stamina, inner strength, and sustained vitality.",
      category: "supplements",
      price: 149900,
      compareAtPrice: 199900,
      inventoryQuantity: 250,
      trackInventory: 1,
      ageRestricted: 0,
      imagesJson: JSON.stringify([{ src: "/images/products/body-essential-nutrition-card.jpg", alt: "BODY Essential Nutrition", isPrimary: true }]),
      variantsJson: JSON.stringify([]),
      ingredientsJson: JSON.stringify(["Ashwagandha", "Shilajit", "Safed Musli", "Gokshura", "Kaunch Beej"]),
      usage: "Take 1-2 capsules daily with lukewarm water or milk after meals.",
      warningsJson: JSON.stringify(["Keep out of reach of children", "Consult doctor if pregnant"]),
      tagsJson: JSON.stringify(["stamina", "vitality", "rasayana"]),
      seoJson: JSON.stringify({ title: "BODY Essential Nutrition | Ayur Veda Global", description: "Standardized Ayurvedic revitalization formula." }),
    },
    {
      id: "prod-staymax-spray",
      slug: "staymax-delay-spray",
      name: "STAYMAX+ Delay Spray for Men (30ml)",
      tagline: "Natural Aloe & Vitamin E Topical Endurance Formula",
      description: "STAYMAX+ is a doctor-formulated intimate endurance topical solution combining soothing Aloe Vera and Vitamin E with mild desensitizing agents.",
      shortDescription: "Clinically verified natural delay spray with Aloe Vera & Vitamin E for extended performance and heightened intimacy endurance.",
      category: "personal-care",
      price: 99900,
      compareAtPrice: 149900,
      inventoryQuantity: 180,
      trackInventory: 1,
      ageRestricted: 1,
      imagesJson: JSON.stringify([{ src: "/images/products/staymax-delay-spray-card.jpg", alt: "STAYMAX+ Spray", isPrimary: true }]),
      variantsJson: JSON.stringify([]),
      ingredientsJson: JSON.stringify(["Aloe Vera Extract", "Vitamin E", "Herbal Base"]),
      usage: "Spray 2-3 pumps 15 minutes before intimacy. Wipe excess before contact.",
      warningsJson: JSON.stringify(["For external use only", "Not for individuals under 18"]),
      tagsJson: JSON.stringify(["endurance", "men's health"]),
      seoJson: JSON.stringify({ title: "STAYMAX+ Delay Spray | Ayur Veda Global", description: "Natural delay spray for men." }),
    },
    {
      id: "prod-hair-regrow-kit",
      slug: "hair-regrow-kit",
      name: "Complete Ayurvedic Hair Re-Grow Kit",
      tagline: "Classical Bhringraj Taila + Follicle Micronutrient Capsules",
      description: "Complete Ayurvedic therapy targeting hair fall and thinning at the follicular root with inside-out synergistic herbs.",
      shortDescription: "Holistic 2-in-1 inside-out kit: Classical Bhringraj Scalp Taila (100ml) paired with 60 Botanical Follicle Nutrition Capsules.",
      category: "wellness",
      price: 189900,
      compareAtPrice: 279900,
      inventoryQuantity: 140,
      trackInventory: 1,
      ageRestricted: 0,
      imagesJson: JSON.stringify([{ src: "/images/products/hair-regrow-kit-card.jpg", alt: "Hair Re-Grow Kit", isPrimary: true }]),
      variantsJson: JSON.stringify([]),
      ingredientsJson: JSON.stringify(["Bhringraj", "Amla", "Brahmi", "Shankhpushpi"]),
      usage: "Massage oil onto scalp 3 nights a week. Take 1 capsule morning and night.",
      warningsJson: JSON.stringify(["Patch test oil before first use"]),
      tagsJson: JSON.stringify(["hair care", "hair regrowth"]),
      seoJson: JSON.stringify({ title: "Ayurvedic Hair Re-Grow Kit | Ayur Veda Global", description: "Holistic hair revitalization therapy." }),
    },
  ];

  for (const p of sampleProducts) {
    prodStmt.run(p);
  }
  console.log(`✅ Seeded ${sampleProducts.length} core sample products.`);

  // 3. Sample Order (AVG-476972)
  const orderStmt = db.prepare(`
    INSERT OR REPLACE INTO orders (
      id, order_number, customer_name, customer_phone, customer_email,
      shipping_address_json, billing_address_json, items_json,
      subtotal, shipping_cost, tax_amount, discount_amount, total_amount,
      payment_method, payment_status, order_status, notes
    ) VALUES (
      @id, @orderNumber, @customerName, @customerPhone, @customerEmail,
      @shippingAddressJson, @billingAddressJson, @itemsJson,
      @subtotal, @shippingCost, @taxAmount, @discountAmount, @totalAmount,
      @paymentMethod, @paymentStatus, @orderStatus, @notes
    )
  `);

  orderStmt.run({
    id: "ord-001",
    orderNumber: "AVG-476972",
    customerName: "Vikram Malhotra",
    customerPhone: "919876543210",
    customerEmail: "vikram.m@example.com",
    shippingAddressJson: JSON.stringify({
      firstName: "Vikram",
      lastName: "Malhotra",
      addressLine1: "Flat 402, Lotus Grand",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "919876543210",
      country: "India",
    }),
    billingAddressJson: JSON.stringify({}),
    itemsJson: JSON.stringify([
      { productId: "prod-body-nutrition", productName: "BODY Essential Nutrition", quantity: 1, price: 149900 }
    ]),
    subtotal: 149900,
    shippingCost: 0,
    taxAmount: 0,
    discountAmount: 0,
    totalAmount: 149900,
    paymentMethod: "COD",
    paymentStatus: "pending",
    orderStatus: "dispatched",
    notes: "Express discreet dispatch",
  });
  console.log("✅ Seeded sample order AVG-476972.");

  // 4. Sample Vaidya Consultation
  const leadStmt = db.prepare(`
    INSERT INTO whatsapp_leads (
      source, product_id, product_name, customer_name, customer_phone,
      quantity, order_total, message_preview, user_agent, referrer
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  leadStmt.run(
    "vaidya_consult_nav",
    "prod-body-nutrition",
    "BODY Essential Nutrition",
    "Vikram Malhotra",
    "919876543210",
    1,
    149900,
    "Patient reported Vata-Pitta dosha imbalance and afternoon stamina dips. Confirmed tele-consultation.",
    "WebBrowser",
    "https://ayurvedaglobal.com"
  );
  console.log("✅ Seeded sample Vaidya Doctor consultation.");
  console.log("🎉 Prisma/SQL Database seeding completed successfully!");
}

if (require.main === module) {
  runPrismaSeed();
}
