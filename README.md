# Ayur Veda Global 🌿

> **Ancient Ayurvedic Wisdom, Modern High-Performance Wellness**  
> Premium Ayurvedic D2C E-Commerce platform built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Zustand**.

---

## ✨ Features & Architecture

- **🏛️ Premium E-Commerce Experience:**
  - Rich product catalog with laboratory purity certifications, standardized herbal extracts, and clinical usage guides.
  - Flagship products: **BODY Essential Nutrition** (60 & 120 Capsules), **STAYMAX+ Delay Spray** (30ml & Twin Pack), and **Vitality Power Combo**.
  - Interactive product showcases with video demonstrations, high-definition zoom galleries, and dosage calculators.

- **🛒 Seamless Cart & Checkout:**
  - Slide-out Cart Drawer with persistent `localStorage` sync.
  - Multi-step checkout with real-time address validation, PIN code checker, and coupon engine (`WELLNESS10`, `AYURVEDA`).
  - **WhatsApp Direct Checkout & Order Confirmation** — automatically generates formatted WhatsApp orders with full shipping details for instant fulfillment.
  - Cash on Delivery (COD) and Online Payment options.

- **📱 Mobile-First Responsive Design:**
  - Fluid mobile layout with dedicated bottom navigation bar (`Home`, `Shop`, `WhatsApp`, `Wishlist`, `Cart`).
  - Age verification gate for adult personal care formulations.
  - Interactive AGMascot Ayurvedic health guide widget.

- **⚡ Fast, Modern Tech Stack:**
  - **Framework:** Next.js 14 (App Router)
  - **Styling:** Tailwind CSS with custom Ayurvedic emerald, gold & cream palette
  - **Icons:** Lucide React
  - **State Management:** Zustand with client-side persistence
  - **SEO & Performance:** Structured JSON-LD microdata, dynamic OpenGraph metadata, and sitemap generation

---

## 🚀 Free Deployment on Cloudflare Pages

This repository is optimized for **100% Free** hosting on **Cloudflare Pages** directly from your GitHub repository:

### Steps to Deploy:
1. Log into your **[Cloudflare Dashboard](https://dash.cloudflare.com/)**.
2. Navigate to **Compute (Workers & Pages)** > **Create an application** > **Pages** > **Connect to Git**.
3. Select your repository: **`rawatriya7514-lab/Ayur-Veda-Global`**.
4. Configure Build Settings:
   - **Framework preset:** `Next.js`
   - **Build command:** `npm run build`
   - **Build output directory:** `.next`
   - **Environment Variables:**
     - `NODE_VERSION`: `20`
     - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `919123485451`
5. Click **Save and Deploy**. Cloudflare will build the site and provide you with a free `*.pages.dev` URL with global CDN caching and free SSL!

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Production build test
npm run build

# 4. Start production server
npm start
```

---

## 🔒 Confidential & License

Proprietary — Ayur Veda Global. All rights reserved.
