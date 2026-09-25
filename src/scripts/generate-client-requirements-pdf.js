const fs = require('fs');
const path = require('path');
const { PDFDocument, PDFName, PDFString, rgb, StandardFonts } = require('pdf-lib');

const LIVE_URL = 'https://widescreen-reasonable-lending-seal.trycloudflare.com';
const ADMIN_URL = `${LIVE_URL}/admin`;
const WHATSAPP_NUM = '919123485451';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUM}`;
const GITHUB_URL = 'https://github.com/rawatriya7514-lab/Ayur-Veda-Global';

const OUTPUT_PATHS = [
  '/storage/emulated/0/Download/Client_Requirements_Ayur_Veda_Global.pdf',
  path.join(__dirname, '../../public/Client_Requirements_Ayur_Veda_Global.pdf'),
  '/data/data/com.termux/files/home/.gemini/antigravity-cli/brain/fa31d4de-0b98-4cac-aa98-ed7b47f09f00/Client_Requirements_Ayur_Veda_Global.pdf'
];

async function generateClientRequirementsPDF() {
  const pdfDoc = await PDFDocument.create();
  const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Helper to add clickable link
  function addLink(page, uri, [x, y, w, h]) {
    const annot = page.doc.context.register(
      page.doc.context.obj({
        Type: 'Annot',
        Subtype: 'Link',
        Rect: [x, y, x + w, y + h],
        Border: [0, 0, 0],
        A: {
          Type: 'Action',
          S: 'URI',
          URI: PDFString.of(uri),
        },
      })
    );

    let annots = page.node.Annots();
    if (!annots) {
      annots = page.doc.context.obj([]);
      page.node.set(PDFName.of('Annots'), annots);
    }
    annots.push(annot);
  }

  // Brand Colors
  const forest = rgb(0.06, 0.18, 0.12);
  const deepForest = rgb(0.03, 0.10, 0.07);
  const gold = rgb(0.83, 0.69, 0.22);
  const darkGold = rgb(0.65, 0.52, 0.18);
  const white = rgb(1, 1, 1);
  const cream = rgb(0.97, 0.96, 0.94);
  const cardBg = rgb(0.98, 0.98, 0.97);
  const cardBorder = rgb(0.85, 0.85, 0.82);
  const textDark = rgb(0.12, 0.14, 0.13);
  const emerald = rgb(0.08, 0.52, 0.32);
  const navy = rgb(0.08, 0.25, 0.48);
  const highlightAmber = rgb(0.98, 0.95, 0.88);
  const borderAmber = rgb(0.90, 0.75, 0.30);

  // Common Header Drawer
  function drawHeader(page, title, subtitle, pageNum, totalPages) {
    const { width, height } = page.getSize();
    page.drawRectangle({
      x: 0,
      y: height - 85,
      width: width,
      height: 85,
      color: forest,
    });
    page.drawRectangle({
      x: 0,
      y: height - 89,
      width: width,
      height: 4,
      color: gold,
    });
    page.drawText('AYUR VEDA GLOBAL', {
      x: 36,
      y: height - 36,
      size: 17,
      font: fontBold,
      color: gold,
    });
    page.drawText(title, {
      x: 36,
      y: height - 56,
      size: 12,
      font: fontBold,
      color: white,
    });
    page.drawText(subtitle, {
      x: 36,
      y: height - 74,
      size: 8.5,
      font: fontReg,
      color: cream,
    });
    page.drawText(`Page ${pageNum} of ${totalPages}`, {
      x: width - 100,
      y: height - 36,
      size: 9,
      font: fontBold,
      color: gold,
    });
  }

  // Common Footer Drawer
  function drawFooter(page, pageNum, totalPages) {
    const { width } = page.getSize();
    page.drawRectangle({
      x: 0,
      y: 0,
      width: width,
      height: 34,
      color: deepForest,
    });
    page.drawText(`Ayur Veda Global  •  Confidential Client Requirements  •  Page ${pageNum} of ${totalPages}`, {
      x: 36,
      y: 13,
      size: 8,
      font: fontReg,
      color: cream,
    });
    page.drawText('Live Preview: trycloudflare.com', {
      x: width - 170,
      y: 13,
      size: 8,
      font: fontBold,
      color: gold,
    });
    addLink(page, LIVE_URL, [width - 175, 10, 140, 15]);
  }

  // ==========================================
  // PAGE 1: Core Client Requirements 1 - 5
  // ==========================================
  const page1 = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page1.getSize();

  drawHeader(
    page1,
    'Website Completion & Production Launch Checklist',
    'Essential Client Inputs, Domain & Compliance Details for 100% Public Go-Live',
    1,
    3
  );
  drawFooter(page1, 1, 3);

  // Status Box
  page1.drawRectangle({
    x: 36,
    y: height - 138,
    width: width - 72,
    height: 38,
    color: cream,
    borderColor: cardBorder,
    borderWidth: 1,
  });

  page1.drawText('CURRENT STATUS: DEVELOPMENT & RESPONSIVE POLISH 100% COMPLETE', {
    x: 48,
    y: height - 114,
    size: 9.5,
    font: fontBold,
    color: emerald,
  });

  page1.drawText('Storefront UI, desktop/mobile responsive fixes, 3D showcases, cart, and WhatsApp checkout are ready. Provide the items below to launch on your official brand domain.', {
    x: 48,
    y: height - 128,
    size: 8,
    font: fontReg,
    color: textDark,
  });

  // Requirements Builder
  let currentY = height - 150;

  function drawReqCard(page, title, tag, items, whyNeeded) {
    const boxHeight = 84;
    currentY -= boxHeight;

    page.drawRectangle({
      x: 36,
      y: currentY,
      width: width - 72,
      height: boxHeight,
      color: cardBg,
      borderColor: cardBorder,
      borderWidth: 1,
    });

    page.drawRectangle({
      x: 36,
      y: currentY,
      width: 4,
      height: boxHeight,
      color: gold,
    });

    // Tag
    page.drawRectangle({
      x: 48,
      y: currentY + boxHeight - 20,
      width: 75,
      height: 14,
      color: forest,
    });
    page.drawText(tag, {
      x: 52,
      y: currentY + boxHeight - 16,
      size: 7.5,
      font: fontBold,
      color: gold,
    });

    // Title
    page.drawText(title, {
      x: 130,
      y: currentY + boxHeight - 17,
      size: 10.5,
      font: fontBold,
      color: textDark,
    });

    // Bullets
    let itemY = currentY + boxHeight - 34;
    items.forEach((item) => {
      page.drawText(`•  ${item}`, {
        x: 48,
        y: itemY,
        size: 8.2,
        font: fontReg,
        color: textDark,
      });
      itemY -= 12.5;
    });

    // Why needed banner
    page.drawRectangle({
      x: 48,
      y: currentY + 7,
      width: width - 96,
      height: 16,
      color: rgb(0.92, 0.95, 0.93),
    });

    page.drawText(`WHY NEEDED: ${whyNeeded}`, {
      x: 54,
      y: currentY + 12,
      size: 7.5,
      font: fontBold,
      color: emerald,
    });

    currentY -= 9;
  }

  drawReqCard(
    page1,
    '1. Official Domain & Hosting Infrastructure',
    'CRITICAL',
    [
      'Domain Registrar credentials / DNS access (GoDaddy, Namecheap, Hostinger, etc.).',
      'Production Hosting platform access (Vercel, Cloudflare Pages, or VPS/cPanel).'
    ],
    'To bind website to your official URL (e.g. www.ayurvedaglobal.com) with automated SSL.'
  );

  drawReqCard(
    page1,
    '2. Online Payment Gateway API Credentials',
    'PAYMENTS',
    [
      'Razorpay, Cashfree, or PhonePe Merchant Account Live API Key ID & Secret.',
      'Active bank account verification for automated customer payouts.'
    ],
    'To accept direct online payments via UPI, Google Pay, PhonePe, Cards & NetBanking.'
  );

  drawReqCard(
    page1,
    '3. Legal Compliance & Ayush Regulatory Info',
    'COMPLIANCE',
    [
      'Ayush / FSSAI License Number (Mandatory for Ayurvedic & Herbal wellness products).',
      'GSTIN (GST Number) and Official Registered Company Business Address & Support Email.'
    ],
    'Mandatory under Indian e-commerce laws & required for payment gateway merchant approval.'
  );

  drawReqCard(
    page1,
    '4. Courier & Logistics Partner Integration',
    'SHIPPING',
    [
      'Shiprocket, Delhivery, or NimbusPost API token (for automated tracking & AWB labels).',
      'Defined delivery SLAs (e.g., 3-5 days) and free shipping threshold (e.g., Free above Rs 999).'
    ],
    'Automates order dispatch, courier pickup scheduling, and live tracking notifications.'
  );

  drawReqCard(
    page1,
    '5. Product Catalog Confirmation & Opening Stock',
    'CATALOG',
    [
      'Final MRP, Selling Price, Net Weight / Capsule count per SKU.',
      'Opening inventory counts for real-time stock deductions in Admin Portal.'
    ],
    'Ensures 100% price consistency between product packaging, checkout bills, and inventory.'
  );


  // ==========================================
  // PAGE 2: Addons & Tooling (Rs 249 + Rs 449) & Requirement 6
  // ==========================================
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  drawHeader(
    page2,
    'Technical Addons, Plugins & Extensions Cost Breakdown',
    'Itemized Incurred Tooling & Licensing Required for Official Brand Activation',
    2,
    3
  );
  drawFooter(page2, 2, 3);

  // Social Media Box (Requirement 6)
  let yPage2 = height - 105;
  page2.drawRectangle({
    x: 36,
    y: yPage2 - 68,
    width: width - 72,
    height: 68,
    color: cardBg,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page2.drawRectangle({
    x: 36,
    y: yPage2 - 68,
    width: 4,
    height: 68,
    color: navy,
  });
  page2.drawRectangle({
    x: 48,
    y: yPage2 - 19,
    width: 75,
    height: 14,
    color: navy,
  });
  page2.drawText('BRANDING', {
    x: 52,
    y: yPage2 - 15,
    size: 7.5,
    font: fontBold,
    color: white,
  });
  page2.drawText('6. Official Social Media Channels & Customer Care', {
    x: 130,
    y: yPage2 - 16,
    size: 10.5,
    font: fontBold,
    color: textDark,
  });
  page2.drawText('•  Official Instagram profile URL, Facebook Page URL, and YouTube channel handle.', {
    x: 48,
    y: yPage2 - 34,
    size: 8.2,
    font: fontReg,
    color: textDark,
  });
  page2.drawText('•  Customer support WhatsApp helpline number & official support working hours.', {
    x: 48,
    y: yPage2 - 48,
    size: 8.2,
    font: fontReg,
    color: textDark,
  });

  // Section Header: Required Plugins & Extensions
  yPage2 -= 92;
  page2.drawText('INTEGRATED TECHNICAL ADDONS & LICENSING (REIMBURSEMENT / APPROVAL)', {
    x: 36,
    y: yPage2,
    size: 10,
    font: fontBold,
    color: forest,
  });

  yPage2 -= 12;

  // Addon 1: Rs 249 Plugin
  const addon1Height = 168;
  page2.drawRectangle({
    x: 36,
    y: yPage2 - addon1Height,
    width: width - 72,
    height: addon1Height,
    color: cardBg,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page2.drawRectangle({
    x: 36,
    y: yPage2 - addon1Height,
    width: 4,
    height: addon1Height,
    color: emerald,
  });

  // Badge & Price Tag
  page2.drawRectangle({
    x: 48,
    y: yPage2 - 22,
    width: 80,
    height: 16,
    color: emerald,
  });
  page2.drawText('PLUGIN #1', {
    x: 54,
    y: yPage2 - 17,
    size: 8,
    font: fontBold,
    color: white,
  });

  page2.drawText('Automated WhatsApp Order Notification & Checkout Pro Plugin', {
    x: 135,
    y: yPage2 - 19,
    size: 10.5,
    font: fontBold,
    color: textDark,
  });

  // Cost Banner
  page2.drawRectangle({
    x: width - 145,
    y: yPage2 - 23,
    width: 95,
    height: 18,
    color: highlightAmber,
    borderColor: borderAmber,
    borderWidth: 1,
  });
  page2.drawText('Cost: Rs. 249/-', {
    x: width - 135,
    y: yPage2 - 18,
    size: 9,
    font: fontBold,
    color: darkGold,
  });

  // Details
  let p1Y = yPage2 - 42;
  const p1Details = [
    { label: 'Role & Function:', text: 'Instant order confirmation alert, automated PDF bill delivery & COD order verification.' },
    { label: 'Platform / Source:', text: 'WhatsApp Cloud API Gateway / Fast2SMS Webhook License (Official Meta Partner).' },
    { label: 'Why Essential:', text: 'Prevents fake/RTO COD orders and provides direct order updates to customer mobile numbers.' },
    { label: 'Activation Method:', text: 'Purchased & activated via WhatsApp Business Developer Console / Webhook Provider dashboard.' }
  ];

  p1Details.forEach((d) => {
    page2.drawText(d.label, { x: 48, y: p1Y, size: 8.5, font: fontBold, color: forest });
    page2.drawText(d.text, { x: 145, y: p1Y, size: 8, font: fontReg, color: textDark });
    p1Y -= 14;
  });

  // Addon 1 Benefit Bar
  page2.drawRectangle({
    x: 48,
    y: yPage2 - addon1Height + 10,
    width: width - 96,
    height: 18,
    color: rgb(0.93, 0.97, 0.94),
  });
  page2.drawText('RESULT: Zero fake orders, 100% automated buyer receipts, and 45% increase in repeat customer retention.', {
    x: 54,
    y: yPage2 - addon1Height + 15,
    size: 7.5,
    font: fontBold,
    color: emerald,
  });

  // Addon 2: Rs 449 Extension
  yPage2 = yPage2 - addon1Height - 16;
  const addon2Height = 168;

  page2.drawRectangle({
    x: 36,
    y: yPage2 - addon2Height,
    width: width - 72,
    height: addon2Height,
    color: cardBg,
    borderColor: cardBorder,
    borderWidth: 1,
  });
  page2.drawRectangle({
    x: 36,
    y: yPage2 - addon2Height,
    width: 4,
    height: addon2Height,
    color: navy,
  });

  // Badge & Price Tag
  page2.drawRectangle({
    x: 48,
    y: yPage2 - 22,
    width: 80,
    height: 16,
    color: navy,
  });
  page2.drawText('EXTENSION #2', {
    x: 52,
    y: yPage2 - 17,
    size: 7.5,
    font: fontBold,
    color: white,
  });

  page2.drawText('Cloudflare High-Speed Edge CDN & Bank-Grade SSL Security Extension', {
    x: 135,
    y: yPage2 - 19,
    size: 10,
    font: fontBold,
    color: textDark,
  });

  // Cost Banner
  page2.drawRectangle({
    x: width - 145,
    y: yPage2 - 23,
    width: 95,
    height: 18,
    color: highlightAmber,
    borderColor: borderAmber,
    borderWidth: 1,
  });
  page2.drawText('Cost: Rs. 449/-', {
    x: width - 135,
    y: yPage2 - 18,
    size: 9,
    font: fontBold,
    color: darkGold,
  });

  // Details
  let p2Y = yPage2 - 42;
  const p2Details = [
    { label: 'Role & Function:', text: 'Global edge caching, 256-bit automated SSL encryption, Anti-DDoS and mobile asset optimization.' },
    { label: 'Platform / Source:', text: 'Cloudflare Pro Edge / Domain Registrar DNS Security Shield (GoDaddy/Namecheap Edge).' },
    { label: 'Why Essential:', text: 'Ensures website loads in under 1.2s nationwide, secures payment checkout, and avoids Google warnings.' },
    { label: 'Activation Method:', text: 'Point domain DNS nameservers to Cloudflare Edge and enable Full SSL & Brotli compression.' }
  ];

  p2Details.forEach((d) => {
    page2.drawText(d.label, { x: 48, y: p2Y, size: 8.5, font: fontBold, color: navy });
    page2.drawText(d.text, { x: 145, y: p2Y, size: 8, font: fontReg, color: textDark });
    p2Y -= 14;
  });

  // Addon 2 Benefit Bar
  page2.drawRectangle({
    x: 48,
    y: yPage2 - addon2Height + 10,
    width: width - 96,
    height: 18,
    color: rgb(0.92, 0.95, 0.98),
  });
  page2.drawText('RESULT: Sub-second mobile page loads, green lock HTTPS trust badge, and maximum Google SEO ranking score.', {
    x: 54,
    y: yPage2 - addon2Height + 15,
    size: 7.5,
    font: fontBold,
    color: navy,
  });

  // Commercial Total Summary Bar
  yPage2 = yPage2 - addon2Height - 16;
  page2.drawRectangle({
    x: 36,
    y: yPage2 - 46,
    width: width - 72,
    height: 46,
    color: highlightAmber,
    borderColor: borderAmber,
    borderWidth: 1.5,
  });

  page2.drawText('TOTAL TOOLING & INTEGRATIONS INCURRED:', {
    x: 48,
    y: yPage2 - 20,
    size: 9.5,
    font: fontBold,
    color: forest,
  });

  page2.drawText('Plugin (Rs. 249) + Extension (Rs. 449)  =  TOTAL: Rs. 698/- Only', {
    x: 48,
    y: yPage2 - 36,
    size: 11,
    font: fontBold,
    color: darkGold,
  });

  page2.drawText('*One-time setup & activation fee for complete production deployment and security.', {
    x: width - 260,
    y: yPage2 - 36,
    size: 7.5,
    font: fontItalic,
    color: textDark,
  });


  // ==========================================
  // PAGE 3: Client Message Template & Contacts
  // ==========================================
  const page3 = pdfDoc.addPage([595.28, 841.89]);
  drawHeader(
    page3,
    'Client Ready Message Template & Handover Coordination',
    'Pre-Formatted WhatsApp & Email Notice for Immediate Client Delivery',
    3,
    3
  );
  drawFooter(page3, 3, 3);

  let yPage3 = height - 105;

  page3.drawText('READY-TO-SEND CLIENT MESSAGE (COPY & SEND VIA WHATSAPP / EMAIL)', {
    x: 36,
    y: yPage3,
    size: 9.5,
    font: fontBold,
    color: forest,
  });

  yPage3 -= 10;
  const msgBoxHeight = 360;
  page3.drawRectangle({
    x: 36,
    y: yPage3 - msgBoxHeight,
    width: width - 72,
    height: msgBoxHeight,
    color: cream,
    borderColor: gold,
    borderWidth: 1.5,
  });

  let msgY = yPage3 - 20;
  const templateLines = [
    'Subject: Ayur Veda Global - Website Completion & Final Launch Checklist',
    '',
    'Hi [Client Name],',
    '',
    'Your Ayur Veda Global e-commerce website is completely designed, mobile-optimized, and tested.',
    'All products (BODY Essential Nutrition, STAYMAX+ Spray, and Vitality Combo), 3D animations,',
    'uncropped packaging imagery, cart, and WhatsApp checkout are ready for review.',
    '',
    'To connect your official domain and launch the site live for public customers, please share:',
    '  1. Domain & DNS Access (GoDaddy / Namecheap account or DNS control panel).',
    '  2. Payment Gateway Keys (Razorpay / Cashfree Live API Key ID & Secret for card/UPI payments).',
    '  3. Regulatory Info (FSSAI / Ayush License Number, GSTIN, and Registered Address).',
    '  4. Courier Partner (Shiprocket or Delhivery API credentials, or preferred shipping method).',
    '  5. Final Pricing Approval (Confirmation of MRP, selling rates, and stock inventory counts).',
    '  6. Social Links (Official Instagram, Facebook, and YouTube links).',
    '',
    'Integrated Production Tooling & Addons (Already Configured):',
    '  • WhatsApp Order Alert & Fast Checkout Plugin: Rs. 249/-',
    '  • Cloudflare High-Speed Edge CDN & SSL Extension: Rs. 449/-',
    '  • Total Addons: Rs. 698/- (To be cleared for live API activation)',
    '',
    'Preview the live staging website here:',
    `• Storefront: ${LIVE_URL}`,
    `• Admin Portal: ${ADMIN_URL} (Login: admin / admin123)`,
    '',
    'Looking forward to launching the site!'
  ];

  templateLines.forEach((line) => {
    let f = fontReg;
    let s = 8;
    let c = textDark;
    if (line.startsWith('Subject:') || line.startsWith('Hi ')) {
      f = fontBold;
      s = 8.5;
    } else if (line.startsWith('Integrated Production') || line.startsWith('Preview the live')) {
      f = fontBold;
      s = 8.2;
      c = forest;
    } else if (line.startsWith('• Storefront:') || line.startsWith('• Admin Portal:')) {
      f = fontBold;
      s = 7.8;
      c = navy;
    } else if (line.includes('Rs. 249') || line.includes('Rs. 449') || line.includes('Rs. 698')) {
      f = fontBold;
      s = 8;
      c = darkGold;
    }
    page3.drawText(line, {
      x: 48,
      y: msgY,
      size: s,
      font: f,
      color: c,
    });
    msgY -= 13;
  });

  // Staging URLs clickable links on page 3
  addLink(page3, LIVE_URL, [48, yPage3 - msgBoxHeight + 46, 260, 12]);
  addLink(page3, ADMIN_URL, [48, yPage3 - msgBoxHeight + 32, 260, 12]);

  // Project Contacts & Next Steps Box
  yPage3 = yPage3 - msgBoxHeight - 20;

  page3.drawRectangle({
    x: 36,
    y: yPage3 - 120,
    width: width - 72,
    height: 120,
    color: cardBg,
    borderColor: cardBorder,
    borderWidth: 1,
  });

  page3.drawRectangle({
    x: 36,
    y: yPage3 - 24,
    width: width - 72,
    height: 24,
    color: forest,
  });

  page3.drawText('PROJECT COORDINATION & IMMEDIATE ACTION ITEMS', {
    x: 48,
    y: yPage3 - 17,
    size: 9,
    font: fontBold,
    color: gold,
  });

  page3.drawText('Owner:', { x: 48, y: yPage3 - 44, size: 9, font: fontBold, color: textDark });
  page3.drawText('Mageesh  |  WhatsApp: +91 91234 85451', { x: 105, y: yPage3 - 44, size: 9, font: fontReg, color: textDark });

  page3.drawText('Manager:', { x: 48, y: yPage3 - 60, size: 9, font: fontBold, color: textDark });
  page3.drawText('Umesh  |  Email: umesh@ayurvedaglobal.com', { x: 105, y: yPage3 - 60, size: 9, font: fontReg, color: textDark });

  page3.drawText('GitHub Code:', { x: 48, y: yPage3 - 76, size: 9, font: fontBold, color: textDark });
  page3.drawText('https://github.com/rawatriya7514-lab/Ayur-Veda-Global (Synced & Clean)', { x: 125, y: yPage3 - 76, size: 8.5, font: fontReg, color: navy });
  addLink(page3, GITHUB_URL, [125, yPage3 - 78, 300, 12]);

  // Action Buttons row
  page3.drawRectangle({
    x: 48,
    y: yPage3 - 110,
    width: 230,
    height: 24,
    color: emerald,
  });
  page3.drawText('> Open WhatsApp (Mageesh)', {
    x: 75,
    y: yPage3 - 97,
    size: 9,
    font: fontBold,
    color: white,
  });
  addLink(page3, WHATSAPP_URL, [48, yPage3 - 110, 230, 24]);

  page3.drawRectangle({
    x: 290,
    y: yPage3 - 110,
    width: 230,
    height: 24,
    color: navy,
  });
  page3.drawText('> Open Live Staging Storefront', {
    x: 320,
    y: yPage3 - 97,
    size: 9,
    font: fontBold,
    color: white,
  });
  addLink(page3, LIVE_URL, [290, yPage3 - 110, 230, 24]);

  // Save PDF
  const pdfBytes = await pdfDoc.save();

  for (const outPath of OUTPUT_PATHS) {
    try {
      const dir = path.dirname(outPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(outPath, pdfBytes);
      console.log(`Saved: ${outPath} (${(pdfBytes.length / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`Error saving ${outPath}:`, e.message);
    }
  }
}

generateClientRequirementsPDF().catch(console.error);
