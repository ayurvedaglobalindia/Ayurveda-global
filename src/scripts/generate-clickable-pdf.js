const fs = require('fs');
const path = require('path');
const { PDFDocument, PDFName, PDFString, rgb, StandardFonts } = require('pdf-lib');

const LIVE_URL = 'https://widescreen-reasonable-lending-seal.trycloudflare.com';
const WHATSAPP_NUM = '919123485451';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUM}`;
const OUTPUT_PATH = '/storage/emulated/0/Download/Ayur_Veda_Global_Website_Links.pdf';

async function generateClickablePDF() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Helper to add native clickable link annotation
  function addLinkAnnotation(page, uri, [x, y, w, h]) {
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

  // Theme Colors
  const forest = rgb(0.06, 0.18, 0.12);
  const deepForest = rgb(0.03, 0.10, 0.07);
  const gold = rgb(0.83, 0.69, 0.22);
  const darkGold = rgb(0.65, 0.52, 0.18);
  const charcoal = rgb(0.12, 0.14, 0.13);
  const cream = rgb(0.97, 0.96, 0.94);
  const white = rgb(1, 1, 1);
  const gray = rgb(0.45, 0.45, 0.45);
  const linkBlue = rgb(0.05, 0.35, 0.75);
  const emeraldBtn = rgb(0.08, 0.52, 0.32);
  const crimson = rgb(0.72, 0.12, 0.15);

  // ==========================================
  // PAGE 1: Overview & All Clickable Links Hub
  // ==========================================
  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page1.getSize();

  // Header Banner
  page1.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: forest,
  });

  // Embed logo
  try {
    const logoBytes = fs.readFileSync(path.join(process.cwd(), 'public/images/brand-logo.png'));
    const logoImg = await pdfDoc.embedPng(logoBytes);
    page1.drawImage(logoImg, {
      x: 35,
      y: height - 90,
      width: 60,
      height: 60,
    });
  } catch (e) {}

  page1.drawText('AYUR VEDA GLOBAL', {
    x: 105,
    y: height - 55,
    size: 24,
    font: fontBold,
    color: gold,
  });

  page1.drawText('Interactive Official Website Dossier (Touch / Click Any Link to Open)', {
    x: 105,
    y: height - 76,
    size: 10.5,
    font: fontBold,
    color: rgb(0.95, 0.95, 0.95),
  });

  page1.drawText('Status: 100% Active & Operational  |  Cloudflare Global CDN Running', {
    x: 105,
    y: height - 95,
    size: 9,
    font: fontItalic,
    color: rgb(0.85, 0.8, 0.7),
  });

  let y = height - 150;

  function drawSectionHeader(title) {
    page1.drawRectangle({
      x: 35,
      y: y - 5,
      width: width - 70,
      height: 24,
      color: cream,
      borderColor: gold,
      borderWidth: 1,
    });
    page1.drawText(title, {
      x: 45,
      y: y + 2,
      size: 10.5,
      font: fontBold,
      color: forest,
    });
    y -= 32;
  }

  function drawClickableRow(name, pathStr, desc, btnText = 'Open >', btnColor = emeraldBtn) {
    const fullUrl = pathStr.startsWith('http') ? pathStr : `${LIVE_URL}${pathStr}`;
    const rowH = 34;

    page1.drawRectangle({
      x: 35,
      y: y - 8,
      width: width - 70,
      height: rowH,
      color: white,
      borderColor: rgb(0.88, 0.88, 0.88),
      borderWidth: 0.8,
    });

    page1.drawText(name, {
      x: 45,
      y: y + 10,
      size: 9.5,
      font: fontBold,
      color: charcoal,
    });

    page1.drawText(desc, {
      x: 45,
      y: y - 2,
      size: 8,
      font: fontRegular,
      color: gray,
    });

    const displayUrl = fullUrl.length > 48 ? fullUrl.substring(0, 48) + '...' : fullUrl;
    page1.drawText(displayUrl, {
      x: 235,
      y: y + 5,
      size: 8,
      font: fontRegular,
      color: linkBlue,
    });

    const btnW = 85;
    const btnH = 20;
    const btnX = width - 35 - btnW - 8;
    const btnY = y - 1;

    page1.drawRectangle({
      x: btnX,
      y: btnY,
      width: btnW,
      height: btnH,
      color: btnColor,
    });

    page1.drawText(btnText, {
      x: btnX + 10,
      y: btnY + 6,
      size: 8,
      font: fontBold,
      color: white,
    });

    addLinkAnnotation(page1, fullUrl, [235, y, 190, 16]);
    addLinkAnnotation(page1, fullUrl, [btnX, btnY, btnW, btnH]);

    y -= 40;
  }

  // Section 1: Main Store & Catalog
  drawSectionHeader('1. STORE PAGES & PRODUCT LINKS');
  drawClickableRow('Ayur Veda Global Home', '/', 'Official luxury storefront with 3D showcase', 'Open Store >', emeraldBtn);
  drawClickableRow('Vitality Power Combo', '/product/vitality-power-combo', 'Save Rs. 799 • Dual Action Full Performance Pack', 'View Combo >', gold);
  drawClickableRow('BODY Essential Nutrition', '/product/body-essential-nutrition', 'Pure Herbal Stamina & Vitality Formulation', 'View Product >', emeraldBtn);
  drawClickableRow('STAYMAX+ Delay Spray', '/product/staymax-delay-spray', 'Instant Climax Control & Endurance Spray', 'View Spray >', emeraldBtn);
  drawClickableRow('Complete Shop Catalog', '/shop', 'Browse all products, filters, sorting & bundles', 'Open Shop >', emeraldBtn);

  // Section 2: Order Management & Customer Services
  drawSectionHeader('2. CUSTOMER SERVICES & ORDER TRACKING');
  drawClickableRow('Shopping Cart', '/cart', 'Review cart items & automatic combo discounts', 'Open Cart >', forest);
  drawClickableRow('Direct Checkout', '/checkout', 'Fast COD & Online checkout with free shipping', 'Checkout >', emeraldBtn);
  drawClickableRow('Track Order Status', '/track-order', 'Real-time dispatch & WhatsApp tracking status', 'Track Order >', forest);
  drawClickableRow('Order History', '/orders', 'View previous purchases and live status updates', 'View Orders >', forest);

  // Section 3: Owner & Manager Desk
  drawSectionHeader('3. OWNER & MANAGER DESK');
  drawClickableRow('About Ayur Veda Global', '/about', 'Mission, heritage & leadership (Mageesh & Umesh)', 'About Us >', forest);
  drawClickableRow('Owner & Manager Desk', '/contact', 'Owner: Mageesh (+91 91234 85451) | Manager: Umesh', 'Direct Desk >', forest);
  drawClickableRow('WhatsApp Direct Support', `${WHATSAPP_URL}?text=Hi%20Ayur%20Veda%20Global%2C%20I%20have%20an%20enquiry`, 'Direct line with Owner Mageesh & Manager Umesh', 'Chat on WA >', emeraldBtn);


  // Big Banner at Bottom of Page 1
  const bigBtnH = 34;
  page1.drawRectangle({
    x: 35,
    y: 40,
    width: width - 70,
    height: bigBtnH,
    color: gold,
    borderColor: darkGold,
    borderWidth: 1.5,
  });
  page1.drawText('>>> TAP HERE TO VISIT AYUR VEDA GLOBAL LIVE STORE <<<', {
    x: 105,
    y: 52,
    size: 11,
    font: fontBold,
    color: charcoal,
  });
  addLinkAnnotation(page1, LIVE_URL, [35, 40, width - 70, bigBtnH]);

  // ==========================================
  // PAGE 2: Product Showcase & Instant Purchase
  // ==========================================
  const page2 = pdfDoc.addPage([595.28, 841.89]);

  page2.drawRectangle({
    x: 0,
    y: height - 80,
    width: width,
    height: 80,
    color: forest,
  });
  page2.drawText('PRODUCT SHOWCASE & INSTANT PURCHASE', {
    x: 35,
    y: height - 42,
    size: 17,
    font: fontBold,
    color: gold,
  });
  page2.drawText('Tap any image or button to open product page directly in your browser', {
    x: 35,
    y: height - 62,
    size: 9.5,
    font: fontItalic,
    color: white,
  });

  // PRODUCT 1: BODY Essential Nutrition
  const p1BoxY = height - 280;
  const p1BoxH = 185;
  page2.drawRectangle({
    x: 35,
    y: p1BoxY,
    width: width - 70,
    height: p1BoxH,
    color: cream,
    borderColor: rgb(0.85, 0.85, 0.85),
    borderWidth: 1,
  });

  try {
    const p1Bytes = fs.readFileSync(path.join(process.cwd(), 'public/images/products/body-essential-nutrition.jpg'));
    const p1Img = await pdfDoc.embedJpg(p1Bytes);
    page2.drawImage(p1Img, {
      x: 45,
      y: p1BoxY + 15,
      width: 105,
      height: 155,
    });
    addLinkAnnotation(page2, `${LIVE_URL}/product/body-essential-nutrition`, [45, p1BoxY + 15, 105, 155]);
  } catch (e) {}

  page2.drawText('BODY Essential Nutrition (60 Veg Capsules)', {
    x: 165,
    y: p1BoxY + 155,
    size: 11,
    font: fontBold,
    color: forest,
  });
  page2.drawText('Natural Energy, Internal Stamina & Deep Cellular Rejuvenation', {
    x: 165,
    y: p1BoxY + 140,
    size: 8.5,
    font: fontBold,
    color: darkGold,
  });
  page2.drawText('Price: Rs. 1,499  (MRP: Rs. 1,899 • 21% OFF)', {
    x: 165,
    y: p1BoxY + 125,
    size: 9,
    font: fontBold,
    color: crimson,
  });
  page2.drawText('• Premium Gold Standard Ashwagandha, Pure Shilajit, Safed Musli & Gokshura', {
    x: 165,
    y: p1BoxY + 108,
    size: 8,
    font: fontRegular,
    color: charcoal,
  });
  page2.drawText('• Enhances physical endurance, vitality, immune defense and muscle strength', {
    x: 165,
    y: p1BoxY + 95,
    size: 8,
    font: fontRegular,
    color: charcoal,
  });
  page2.drawText('• 100% Herbal • GMP Certified Facility • Free from heavy metals & chemicals', {
    x: 165,
    y: p1BoxY + 82,
    size: 8,
    font: fontRegular,
    color: forest,
  });

  const p1BtnW = 140;
  const p1BtnH = 24;
  page2.drawRectangle({
    x: 165,
    y: p1BoxY + 30,
    width: p1BtnW,
    height: p1BtnH,
    color: forest,
    borderColor: gold,
    borderWidth: 1,
  });
  page2.drawText('View & Buy Online >', {
    x: 185,
    y: p1BoxY + 38,
    size: 8.5,
    font: fontBold,
    color: gold,
  });
  addLinkAnnotation(page2, `${LIVE_URL}/product/body-essential-nutrition`, [165, p1BoxY + 30, p1BtnW, p1BtnH]);

  // PRODUCT 2: STAYMAX+ Delay Spray
  const p2BoxY = height - 485;
  const p2BoxH = 185;
  page2.drawRectangle({
    x: 35,
    y: p2BoxY,
    width: width - 70,
    height: p2BoxH,
    color: cream,
    borderColor: rgb(0.85, 0.85, 0.85),
    borderWidth: 1,
  });

  try {
    const p2Bytes = fs.readFileSync(path.join(process.cwd(), 'public/images/products/staymax-delay-spray.jpg'));
    const p2Img = await pdfDoc.embedJpg(p2Bytes);
    page2.drawImage(p2Img, {
      x: 45,
      y: p2BoxY + 15,
      width: 105,
      height: 155,
    });
    addLinkAnnotation(page2, `${LIVE_URL}/product/staymax-delay-spray`, [45, p2BoxY + 15, 105, 155]);
  } catch (e) {}

  page2.drawText('STAYMAX+ Delay Spray for Men (30 ml Metered Spray)', {
    x: 165,
    y: p2BoxY + 155,
    size: 11,
    font: fontBold,
    color: forest,
  });
  page2.drawText('Instant Climax Control, Prolonged Intimacy & Supreme Confidence', {
    x: 165,
    y: p2BoxY + 140,
    size: 8.5,
    font: fontBold,
    color: darkGold,
  });
  page2.drawText('Price: Rs. 1,299  (MRP: Rs. 1,599 • 19% OFF)', {
    x: 165,
    y: p2BoxY + 125,
    size: 9,
    font: fontBold,
    color: crimson,
  });
  page2.drawText('• Clinically formulated with Clove Bud, Nutmeg, Lavender & Natural Vitamin E', {
    x: 165,
    y: p2BoxY + 108,
    size: 8,
    font: fontRegular,
    color: charcoal,
  });
  page2.drawText('• Fast-absorbing, non-numbing, non-sticky and safe for partner skin', {
    x: 165,
    y: p2BoxY + 95,
    size: 8,
    font: fontRegular,
    color: charcoal,
  });
  page2.drawText('• Metered spray bottle: 120+ applications • Discreet plain box delivery', {
    x: 165,
    y: p2BoxY + 82,
    size: 8,
    font: fontRegular,
    color: forest,
  });

  page2.drawRectangle({
    x: 165,
    y: p2BoxY + 30,
    width: p1BtnW,
    height: p1BtnH,
    color: forest,
    borderColor: gold,
    borderWidth: 1,
  });
  page2.drawText('View & Buy Online >', {
    x: 185,
    y: p2BoxY + 38,
    size: 8.5,
    font: fontBold,
    color: gold,
  });
  addLinkAnnotation(page2, `${LIVE_URL}/product/staymax-delay-spray`, [165, p2BoxY + 30, p1BtnW, p1BtnH]);

  // COMBO CARD (Vitality & Performance Power Combo)
  const comboBoxY = height - 765;
  const comboBoxH = 265;
  page2.drawRectangle({
    x: 35,
    y: comboBoxY,
    width: width - 70,
    height: comboBoxH,
    color: rgb(0.95, 0.98, 0.96),
    borderColor: gold,
    borderWidth: 1.5,
  });

  try {
    const comboBytes = fs.readFileSync(path.join(process.cwd(), 'public/images/products/vitality-power-combo.jpg'));
    const comboImg = await pdfDoc.embedJpg(comboBytes);
    page2.drawImage(comboImg, {
      x: 45,
      y: comboBoxY + 20,
      width: 105,
      height: 220,
    });
    addLinkAnnotation(page2, `${LIVE_URL}/product/vitality-power-combo`, [45, comboBoxY + 20, 105, 220]);
  } catch (e) {}

  page2.drawText('THE ULTIMATE VITALITY & PERFORMANCE POWER COMBO', {
    x: 165,
    y: comboBoxY + 235,
    size: 11,
    font: fontBold,
    color: forest,
  });
  page2.drawText('Dual Action: Internal Stamina (BODY) + Instant External Endurance (STAYMAX+)', {
    x: 165,
    y: comboBoxY + 218,
    size: 8.5,
    font: fontBold,
    color: darkGold,
  });
  page2.drawText('Combo Price: Rs. 1,999  (Total Value: Rs. 2,798 - SAVE FLAT Rs. 799)', {
    x: 165,
    y: comboBoxY + 200,
    size: 9.5,
    font: fontBold,
    color: crimson,
  });
  page2.drawText('Package Includes:', {
    x: 165,
    y: comboBoxY + 180,
    size: 8.5,
    font: fontBold,
    color: charcoal,
  });
  page2.drawText('• 1x BODY Essential Nutrition (60 Vegetarian Capsules Bottle)', {
    x: 170,
    y: comboBoxY + 165,
    size: 8,
    font: fontRegular,
    color: charcoal,
  });
  page2.drawText('• 1x STAYMAX+ Delay Spray (30 ml Metered Spray Bottle)', {
    x: 170,
    y: comboBoxY + 151,
    size: 8,
    font: fontRegular,
    color: charcoal,
  });
  page2.drawText('• 1x FREE Ayurvedic Wellness Lifestyle Protocol Guide', {
    x: 170,
    y: comboBoxY + 137,
    size: 8,
    font: fontRegular,
    color: charcoal,
  });
  page2.drawText('• 100% Confidential Plain Box Delivery + Free Express Shipping Nationwide', {
    x: 170,
    y: comboBoxY + 123,
    size: 8,
    font: fontRegular,
    color: forest,
  });

  const comboBtnW = 185;
  const comboBtnH = 26;
  page2.drawRectangle({
    x: 165,
    y: comboBoxY + 65,
    width: comboBtnW,
    height: comboBtnH,
    color: gold,
    borderColor: darkGold,
    borderWidth: 1,
  });
  page2.drawText('CLAIM COMBO OFFER - Rs. 1,999 >', {
    x: 176,
    y: comboBoxY + 74,
    size: 8.5,
    font: fontBold,
    color: charcoal,
  });
  addLinkAnnotation(page2, `${LIVE_URL}/product/vitality-power-combo`, [165, comboBoxY + 65, comboBtnW, comboBtnH]);

  const waBtnW = 160;
  const waBtnH = 26;
  page2.drawRectangle({
    x: 165 + comboBtnW + 10,
    y: comboBoxY + 65,
    width: waBtnW,
    height: waBtnH,
    color: emeraldBtn,
    borderColor: rgb(0.1, 0.6, 0.4),
    borderWidth: 1,
  });
  page2.drawText('Order on WhatsApp (COD) >', {
    x: 165 + comboBtnW + 20,
    y: comboBoxY + 74,
    size: 8.5,
    font: fontBold,
    color: white,
  });
  addLinkAnnotation(page2, `${WHATSAPP_URL}?text=Hi%20Ayur%20Veda%20Global%2C%20I%20want%20to%20order%20the%20Vitality%20Power%20Combo%20at%20Rs.1999`, [165 + comboBtnW + 10, comboBoxY + 65, waBtnW, waBtnH]);

  page2.drawText('Tap anywhere on the buttons or product photos above to open directly in your browser.', {
    x: 40,
    y: 20,
    size: 8,
    font: fontItalic,
    color: gray,
  });

  // ==========================================
  // PAGE 3: Owner & Manager Desk + AI Engine
  // ==========================================
  const page3 = pdfDoc.addPage([595.28, 841.89]);

  page3.drawRectangle({
    x: 0,
    y: height - 80,
    width: width,
    height: 80,
    color: forest,
  });
  page3.drawText('OWNER & MANAGER DESK + SMART AI OPERATIONS', {
    x: 35,
    y: height - 42,
    size: 16,
    font: fontBold,
    color: gold,
  });
  page3.drawText('Direct Access to Owner (Mageesh) and Manager (Umesh)', {
    x: 35,
    y: height - 62,
    size: 9.5,
    font: fontItalic,
    color: white,
  });

  // Card 1: Owner Mageesh
  const oBoxY = height - 280;
  const oBoxH = 185;
  page3.drawRectangle({
    x: 35,
    y: oBoxY,
    width: width - 70,
    height: oBoxH,
    color: cream,
    borderColor: gold,
    borderWidth: 1.5,
  });

  try {
    const oBytes = fs.readFileSync(path.join(process.cwd(), 'public/images/team/mageesh.jpg'));
    const oImg = await pdfDoc.embedJpg(oBytes);
    page3.drawImage(oImg, {
      x: 45,
      y: oBoxY + 15,
      width: 130,
      height: 155,
    });
    addLinkAnnotation(page3, `${LIVE_URL}/contact`, [45, oBoxY + 15, 130, 155]);
  } catch (e) {}

  page3.drawText('MAGEESH', {
    x: 190,
    y: oBoxY + 155,
    size: 14,
    font: fontBold,
    color: forest,
  });
  page3.drawText('Owner — Ayur Veda Global', {
    x: 190,
    y: oBoxY + 138,
    size: 9.5,
    font: fontBold,
    color: darkGold,
  });
  page3.drawText('• Founder and brand owner driving authentic Ayurvedic wellness in India', {
    x: 190,
    y: oBoxY + 118,
    size: 8,
    font: fontRegular,
    color: charcoal,
  });
  page3.drawText('• Committed to pure natural herb formulations, ethical sourcing & safety', {
    x: 190,
    y: oBoxY + 104,
    size: 8,
    font: fontRegular,
    color: charcoal,
  });
  page3.drawText('• WhatsApp & Phone: +91 91234 85451', {
    x: 190,
    y: oBoxY + 90,
    size: 8,
    font: fontBold,
    color: forest,
  });

  // Action Buttons for Owner Mageesh
  const callBtnW = 120;
  const callBtnH = 24;
  page3.drawRectangle({
    x: 190,
    y: oBoxY + 45,
    width: callBtnW,
    height: callBtnH,
    color: forest,
  });
  page3.drawText('Call Owner Desk >', {
    x: 202,
    y: oBoxY + 53,
    size: 8,
    font: fontBold,
    color: gold,
  });
  addLinkAnnotation(page3, 'tel:+919123485451', [190, oBoxY + 45, callBtnW, callBtnH]);

  page3.drawRectangle({
    x: 190 + callBtnW + 10,
    y: oBoxY + 45,
    width: 140,
    height: callBtnH,
    color: emeraldBtn,
  });
  page3.drawText('WhatsApp Owner >', {
    x: 190 + callBtnW + 20,
    y: oBoxY + 53,
    size: 8,
    font: fontBold,
    color: white,
  });
  addLinkAnnotation(page3, `${WHATSAPP_URL}?text=Hello%20Mageesh%2C%20regarding%20Ayur%20Veda%20Global`, [190 + callBtnW + 10, oBoxY + 45, 140, callBtnH]);

  // Card 2: Manager Umesh
  const mBoxY = height - 485;
  const mBoxH = 185;
  page3.drawRectangle({
    x: 35,
    y: mBoxY,
    width: width - 70,
    height: mBoxH,
    color: cream,
    borderColor: gold,
    borderWidth: 1.5,
  });

  try {
    const mBytes = fs.readFileSync(path.join(process.cwd(), 'public/images/team/umesh.jpg'));
    const mImg = await pdfDoc.embedJpg(mBytes);
    page3.drawImage(mImg, {
      x: 45,
      y: mBoxY + 15,
      width: 130,
      height: 155,
    });
    addLinkAnnotation(page3, `${LIVE_URL}/contact`, [45, mBoxY + 15, 130, 155]);
  } catch (e) {}

  page3.drawText('UMESH', {
    x: 190,
    y: mBoxY + 155,
    size: 14,
    font: fontBold,
    color: forest,
  });
  page3.drawText('Manager — Ayur Veda Global', {
    x: 190,
    y: mBoxY + 138,
    size: 9.5,
    font: fontBold,
    color: darkGold,
  });
  page3.drawText('• Direct management of brand operations, inventory, orders & logistics', {
    x: 190,
    y: mBoxY + 118,
    size: 8,
    font: fontRegular,
    color: charcoal,
  });
  page3.drawText('• Dedicated customer satisfaction, prompt order dispatch & support', {
    x: 190,
    y: mBoxY + 104,
    size: 8,
    font: fontRegular,
    color: charcoal,
  });
  page3.drawText('• Email: umesh@ayurvedaglobal.com  |  Support Desk Active', {
    x: 190,
    y: mBoxY + 90,
    size: 8,
    font: fontBold,
    color: forest,
  });

  // Action Buttons for Manager Umesh
  page3.drawRectangle({
    x: 190,
    y: mBoxY + 45,
    width: callBtnW,
    height: callBtnH,
    color: forest,
  });
  page3.drawText('Email Manager >', {
    x: 215,
    y: mBoxY + 53,
    size: 8,
    font: fontBold,
    color: gold,
  });
  addLinkAnnotation(page3, 'mailto:umesh@ayurvedaglobal.com', [190, mBoxY + 45, callBtnW, callBtnH]);

  page3.drawRectangle({
    x: 190 + callBtnW + 10,
    y: mBoxY + 45,
    width: 140,
    height: callBtnH,
    color: emeraldBtn,
  });
  page3.drawText('Operations Support Desk >', {
    x: 190 + callBtnW + 12,
    y: mBoxY + 53,
    size: 7.5,
    font: fontBold,
    color: white,
  });
  addLinkAnnotation(page3, `${WHATSAPP_URL}?text=Hello%20Umesh%2C%20regarding%20Ayur%20Veda%20Global%20Operations`, [190 + callBtnW + 10, mBoxY + 45, 140, callBtnH]);

  // Card 3: AI Engine & Intelligence Suite
  const aiBoxY = height - 765;
  const aiBoxH = 260;
  page3.drawRectangle({
    x: 35,
    y: aiBoxY,
    width: width - 70,
    height: aiBoxH,
    color: deepForest,
    borderColor: gold,
    borderWidth: 1.5,
  });

  page3.drawText('INTELLIGENT AI ENGINE & MULTIMODAL SUITE', {
    x: 50,
    y: aiBoxY + 230,
    size: 12,
    font: fontBold,
    color: gold,
  });
  page3.drawText('Powered by NVIDIA NIM Multimodal Vision-Instruct LLM & Next-Gen Search', {
    x: 50,
    y: aiBoxY + 214,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.85, 0.85, 0.85),
  });

  page3.drawText('• Live SEO Auto-Optimization: Generates structured metadata, rich snippets & JSON-LD', {
    x: 50,
    y: aiBoxY + 190,
    size: 8,
    font: fontRegular,
    color: white,
  });
  page3.drawText('• Semantic Search Expansion: Hindi & English query translation (taqat, stamina, shakti)', {
    x: 50,
    y: aiBoxY + 176,
    size: 8,
    font: fontRegular,
    color: white,
  });
  page3.drawText('• Product Copywriting Intelligence: Luxury storytelling & clinical benefit highlights', {
    x: 50,
    y: aiBoxY + 162,
    size: 8,
    font: fontRegular,
    color: white,
  });
  page3.drawText('• Multi-Key Resilience: Primary NVIDIA NIM + secondary multimodal AI key configured', {
    x: 50,
    y: aiBoxY + 148,
    size: 8,
    font: fontRegular,
    color: white,
  });
  page3.drawText('• API Route Active: POST /api/ai/optimize (Actions: seo | copy | search)', {
    x: 50,
    y: aiBoxY + 134,
    size: 8,
    font: fontBold,
    color: gold,
  });

  // Buttons at bottom of AI Card
  const aiBtnW = 200;
  const aiBtnH = 26;
  page3.drawRectangle({
    x: 50,
    y: aiBoxY + 70,
    width: aiBtnW,
    height: aiBtnH,
    color: gold,
    borderColor: darkGold,
    borderWidth: 1,
  });
  page3.drawText('OPEN LIVE WEBSITE NOW >', {
    x: 75,
    y: aiBoxY + 79,
    size: 8.5,
    font: fontBold,
    color: charcoal,
  });
  addLinkAnnotation(page3, LIVE_URL, [50, aiBoxY + 70, aiBtnW, aiBtnH]);

  page3.drawRectangle({
    x: 50 + aiBtnW + 15,
    y: aiBoxY + 70,
    width: 220,
    height: aiBtnH,
    color: emeraldBtn,
  });
  page3.drawText('CONNECT ON WHATSAPP (+91 91234 85451) >', {
    x: 50 + aiBtnW + 24,
    y: aiBoxY + 79,
    size: 8,
    font: fontBold,
    color: white,
  });
  addLinkAnnotation(page3, WHATSAPP_URL, [50 + aiBtnW + 15, aiBoxY + 70, 220, aiBtnH]);

  page3.drawText('Ayur Veda Global • All links in this document are clickable and open in your default browser.', {
    x: 40,
    y: 20,
    size: 8,
    font: fontItalic,
    color: gray,
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(OUTPUT_PATH, pdfBytes);
}

generateClickablePDF().catch(err => {
  console.error('PDF generation error:', err);
  process.exit(1);
});
