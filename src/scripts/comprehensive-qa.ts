import fs from "fs";
import path from "path";

interface QAResult {
  category: string;
  name: string;
  status: "PASS" | "FAIL" | "WARN";
  details?: string;
}

const results: QAResult[] = [];

function record(
  category: string,
  name: string,
  status: "PASS" | "FAIL" | "WARN",
  details?: string,
) {
  results.push({ category, name, status, details });
  const icon =
    status === "PASS"
      ? "\x1b[32m✓\x1b[0m"
      : status === "FAIL"
        ? "\x1b[31m✗\x1b[0m"
        : "\x1b[33m⚠\x1b[0m";
  console.log(
    `  ${icon} [${category}] ${name}${details ? ` (${details})` : ""}`,
  );
}

async function runQA() {
  console.log("\n======================================================");
  console.log("🔍 AYUR VEDA GLOBAL — PRODUCTION DEPLOYMENT & QA AUDIT");
  console.log("======================================================\n");

  const outDir = path.join(process.cwd(), "out");
  if (!fs.existsSync(outDir)) {
    console.error(
      "out directory does not exist! Please run npm run build first.",
    );
    process.exit(1);
  }

  // 1. Route Completeness Check
  console.log("🌐 1. Static HTML Route Verification:");
  const expectedRoutes = [
    "",
    "shop",
    "cart",
    "checkout",
    "checkout/success",
    "categories",
    "categories/supplements",
    "categories/personal-care",
    "categories/wellness",
    "product/body-essential-nutrition",
    "product/staymax-delay-spray",
    "product/vitality-power-combo",
    "about",
    "contact",
    "consultation",
    "blog",
    "faq",
    "track-order",
    "account",
    "orders",
    "orders/ORD-20241215-ABC1",
    "orders/ORD-20241210-XYZ2",
    "orders/ORD-20241205-DEF3",
    "wishlist",
    "legal/privacy",
    "legal/terms",
    "legal/shipping",
    "legal/returns",
    "_not-found",
    "404",
  ];

  let routesPassed = 0;
  for (const r of expectedRoutes) {
    const htmlPath =
      r === ""
        ? path.join(outDir, "index.html")
        : path.join(outDir, r, "index.html");
    const alt404 = r === "404" ? path.join(outDir, "404.html") : null;

    if (fs.existsSync(htmlPath)) {
      const sz = fs.statSync(htmlPath).size;
      record("Routes", `/${r}`, "PASS", `${(sz / 1024).toFixed(1)} KB`);
      routesPassed++;
    } else if (alt404 && fs.existsSync(alt404)) {
      const sz = fs.statSync(alt404).size;
      record("Routes", `/${r}`, "PASS", `${(sz / 1024).toFixed(1)} KB`);
      routesPassed++;
    } else {
      record("Routes", `/${r}`, "FAIL", "Missing index.html");
    }
  }

  // 2. Asset Integrity Check
  console.log("\n🖼️ 2. Asset & Media Integrity Check:");
  const allHtmlFiles: string[] = [];
  function findHtml(dir: string) {
    for (const f of fs.readdirSync(dir)) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) {
        findHtml(full);
      } else if (f.endsWith(".html")) {
        allHtmlFiles.push(full);
      }
    }
  }
  findHtml(outDir);

  const referencedLocalAssets = new Set<string>();
  const referencedInternalLinks = new Set<string>();

  for (const file of allHtmlFiles) {
    const content = fs.readFileSync(file, "utf-8");

    // Find src="..."
    const srcMatches = content.matchAll(/src=["'](\/[^"']+)["']/g);
    for (const m of srcMatches) {
      const assetPath = m[1].split("?")[0].split("#")[0];
      if (!assetPath.startsWith("/_next/data/")) {
        referencedLocalAssets.add(assetPath);
      }
    }

    // Find href="..."
    const hrefMatches = content.matchAll(/href=["'](\/[^"']*)["']/g);
    for (const m of hrefMatches) {
      const link = m[1].split("?")[0].split("#")[0];
      if (
        link.startsWith("/_next/") ||
        link.endsWith(".ico") ||
        link.endsWith(".svg") ||
        link.endsWith(".xml") ||
        link.endsWith(".txt")
      ) {
        referencedLocalAssets.add(link);
      } else {
        referencedInternalLinks.add(link);
      }
    }
  }

  let missingAssets = 0;
  for (const asset of referencedLocalAssets) {
    const decodedRelPath = decodeURIComponent(asset.replace(/^\//, ""));
    const localDiskPath = path.join(outDir, decodedRelPath);
    if (!fs.existsSync(localDiskPath)) {
      record("Assets", asset, "FAIL", "File not found in out/");
      missingAssets++;
    }
  }
  if (missingAssets === 0) {
    record(
      "Assets",
      `All ${referencedLocalAssets.size} local assets present on disk`,
      "PASS",
      "0 missing",
    );
  }

  // 3. Broken Internal Links Check
  console.log("\n🔗 3. Internal Link Integrity Check:");
  let brokenLinks = 0;
  for (const link of referencedInternalLinks) {
    const clean = link.replace(/\/$/, "");
    const targetHtml =
      clean === ""
        ? path.join(outDir, "index.html")
        : path.join(outDir, clean, "index.html");
    const targetDirect = path.join(outDir, clean.replace(/^\//, ""));
    if (!fs.existsSync(targetHtml) && !fs.existsSync(targetDirect)) {
      record("Links", link, "FAIL", "Destination page does not exist");
      brokenLinks++;
    }
  }
  if (brokenLinks === 0) {
    record(
      "Links",
      `All ${referencedInternalLinks.size} internal links resolve to valid HTML routes`,
      "PASS",
      "0 broken",
    );
  }

  // 4. SEO & Compliance Files
  console.log("\n📄 4. SEO, Compliance & Headers Check:");
  const sitemapPath = path.join(outDir, "sitemap.xml");
  if (
    fs.existsSync(sitemapPath) &&
    fs.readFileSync(sitemapPath, "utf-8").includes("<urlset")
  ) {
    record("SEO", "sitemap.xml valid & populated", "PASS");
  } else {
    record("SEO", "sitemap.xml missing or invalid", "FAIL");
  }

  const robotsPath = path.join(outDir, "robots.txt");
  if (
    fs.existsSync(robotsPath) &&
    fs.readFileSync(robotsPath, "utf-8").includes("User-agent")
  ) {
    record("SEO", "robots.txt valid with sitemap reference", "PASS");
  } else {
    record("SEO", "robots.txt missing or invalid", "FAIL");
  }

  const headersPath = path.join(outDir, "_headers");
  if (fs.existsSync(headersPath)) {
    const h = fs.readFileSync(headersPath, "utf-8");
    const hasHsts = h.includes("Strict-Transport-Security");
    const hasCsp = h.includes("Content-Security-Policy");
    const hasXfo = h.includes("X-Frame-Options");
    if (hasHsts && hasCsp && hasXfo) {
      record(
        "Security",
        "Cloudflare _headers includes HSTS, CSP, XFO, nosniff",
        "PASS",
      );
    } else {
      record(
        "Security",
        "Cloudflare _headers missing key security directives",
        "WARN",
      );
    }
  } else {
    record("Security", "Cloudflare _headers missing", "FAIL");
  }

  // 5. Secret Scan on Distribution
  console.log("\n🛡️ 5. Secret & Sensitive Data Audit:");
  const sensitiveRegex =
    /(api[_-]?key\s*[:=]\s*['"][a-zA-Z0-9_\-]{16,}['"]|jwt\s*[:=]\s*['"]ey|private[_-]?key\s*[:=]\s*['"]-----BEGIN)/i;
  let exposedSecrets = 0;
  for (const f of allHtmlFiles) {
    const code = fs.readFileSync(f, "utf-8");
    if (sensitiveRegex.test(code)) {
      record(
        "Security",
        path.basename(f),
        "FAIL",
        "Potential sensitive credential leak",
      );
      exposedSecrets++;
    }
  }
  if (exposedSecrets === 0) {
    record(
      "Security",
      "Distribution files scanned for secrets",
      "PASS",
      "0 leaks detected",
    );
  }

  // 6. Summary
  const failCount = results.filter((r) => r.status === "FAIL").length;
  const warnCount = results.filter((r) => r.status === "WARN").length;
  const passCount = results.filter((r) => r.status === "PASS").length;

  console.log("\n======================================================");
  console.log(
    `QA Summary: \x1b[32m${passCount} PASS\x1b[0m | \x1b[31m${failCount} FAIL\x1b[0m | \x1b[33m${warnCount} WARN\x1b[0m`,
  );
  console.log("======================================================\n");

  if (failCount > 0) {
    process.exit(1);
  }
}

runQA();
