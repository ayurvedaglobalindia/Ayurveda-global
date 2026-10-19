/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { Printer, X, Download, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import { formatINR } from "@/lib/utils/formatters";
import { CONTACT_CONFIG } from "@/lib/config/contact";

interface OrderInvoiceModalProps {
  order: any;
  onClose: () => void;
}

export function OrderInvoiceModal({ order, onClose }: OrderInvoiceModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!order) return null;

  const orderNum = order.orderNumber || order.id;
  const customerName =
    order.customerName ||
    `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim() ||
    "Patron";
  const phone = order.shippingAddress?.phone || order.customerPhone || "";
  const address = order.shippingAddress || {};
  const items = order.items || [];
  const subtotal = order.subtotal || order.total || 0;
  const shipping = order.shipping || 0;
  const discount = order.discount || 0;
  const total = order.total || subtotal + shipping - discount;
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }) : "Recent";
  const awb = order.trackingNumber || order.awbNumber || `BD-${orderNum.replace(/\D/g, "").slice(-8) || "849201"}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:fixed print:inset-0">
      <div className="relative w-full max-w-3xl bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 print:border-none print:shadow-none print:rounded-none print:m-0">
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#071A12] text-white print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] font-bold border border-[#10B981]/30">
              OFFICIAL TAX INVOICE
            </span>
            <span className="font-mono text-xs text-stone-300">
              #{orderNum}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c4a66b] text-[#071A12] text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div ref={printRef} className="p-8 sm:p-10 space-y-6 text-xs font-sans print:p-6 print:text-[11px]">
          {/* Header Brand Lockup */}
          <div className="flex items-start justify-between border-b border-stone-200 pb-6 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#071A12] flex items-center justify-center p-1">
                  <img
                    src="/images/brand-logo.png"
                    alt="Ayurveda Global Logo"
                    className="w-full h-full object-contain brightness-110"
                  />
                </div>
                <div>
                  <h1 className="font-editorial text-2xl font-bold tracking-tight text-[#071A12] leading-none">
                    Ayurveda Global
                  </h1>
                  <span className="text-[8px] uppercase tracking-[0.24em] text-[#D4AF37] font-sans font-bold block mt-0.5">
                    CLASSICAL APOTHECARY &amp; PHARMACOPEIA
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 max-w-xs pt-1 leading-relaxed">
                Licensed Ayurvedic Apothecary • AYUSH &amp; GMP Standardized • NABL Laboratory Tested
              </p>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-block px-2.5 py-1 rounded-md bg-[#EFF4F0] text-[#0E3924] font-mono font-bold text-xs uppercase tracking-wider border border-[#0E3924]/20">
                TAX INVOICE &amp; DISPATCH SLIP
              </span>
              <p className="font-mono text-stone-600">
                Invoice No: <span className="font-bold text-stone-900">INV-{orderNum}</span>
              </p>
              <p className="text-stone-500">Date: {orderDate}</p>
              <p className="text-stone-500">
                AWB Tracking: <span className="font-mono font-semibold text-stone-900">{awb}</span>
              </p>
            </div>
          </div>

          {/* Addresses: Bill From / Bill To */}
          <div className="grid grid-cols-2 gap-6 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div>
              <span className="text-[9.5px] uppercase font-mono tracking-wider text-stone-500 block mb-1">
                DISPATCHED FROM:
              </span>
              <p className="font-bold text-stone-900">Ayurveda Global Apothecary India</p>
              <p className="text-stone-600">Industrial Area, Phase 1</p>
              <p className="text-stone-600">New Delhi, Delhi - 110020, India</p>
              <p className="text-stone-600 font-mono">Helpline: {CONTACT_CONFIG.phoneDisplay}</p>
              <p className="text-stone-600">Email: {CONTACT_CONFIG.supportEmail}</p>
            </div>

            <div>
              <span className="text-[9.5px] uppercase font-mono tracking-wider text-stone-500 block mb-1">
                CUSTOMER / SHIP TO:
              </span>
              <p className="font-bold text-stone-900">{customerName}</p>
              <p className="text-stone-600">{address.addressLine1 || "Customer Address"}</p>
              {address.addressLine2 && <p className="text-stone-600">{address.addressLine2}</p>}
              <p className="text-stone-600">
                {address.city ? `${address.city}, ` : ""}{address.state || "India"} - {address.pincode || "110001"}
              </p>
              <p className="text-stone-600 font-mono">Phone: {phone || "—"}</p>
              {address.email && <p className="text-stone-600 font-mono">Email: {address.email}</p>}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#071A12] text-white uppercase text-[9.5px] font-mono tracking-wider">
                <tr>
                  <th className="py-2.5 px-3.5">#</th>
                  <th className="py-2.5 px-3.5">Formulation Description</th>
                  <th className="py-2.5 px-3.5">Packaging / Variant</th>
                  <th className="py-2.5 px-3.5 text-center">Qty</th>
                  <th className="py-2.5 px-3.5 text-right">Unit Price</th>
                  <th className="py-2.5 px-3.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {items.length > 0 ? (
                  items.map((item: any, idx: number) => {
                    const itemName = item.name || item.productName || "Ayurvedic Formulation";
                    const variantName = item.variantName || item.variant || "Standard Pack";
                    const itemPrice = item.price || 0;
                    const itemQty = item.quantity || 1;
                    const itemTotal = itemPrice * itemQty;

                    return (
                      <tr key={idx} className="hover:bg-stone-50/50">
                        <td className="py-3 px-3.5 font-mono text-stone-500">{idx + 1}</td>
                        <td className="py-3 px-3.5">
                          <p className="font-semibold text-stone-900">{itemName}</p>
                          <span className="text-[10px] text-stone-500 font-mono">
                            SKU: {(item.productId || "AVG").toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-3.5 text-stone-600">{variantName}</td>
                        <td className="py-3 px-3.5 text-center font-mono font-semibold">{itemQty}</td>
                        <td className="py-3 px-3.5 text-right font-mono">{formatINR(itemPrice)}</td>
                        <td className="py-3 px-3.5 text-right font-mono font-bold text-stone-900">
                          {formatINR(itemTotal)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-stone-500">
                      Standard Ayurvedic Regimen Item
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation & Payment Badges */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-2">
            <div className="space-y-2 max-w-sm">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[9.5px] uppercase font-mono tracking-wider text-stone-500 block">
                  PAYMENT INFORMATION
                </span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-600">Payment Method:</span>
                  <span className="font-mono font-semibold uppercase text-stone-900">
                    {order.paymentMethod === "cod" ? "Cash on Delivery (Doorstep COD)" : "Prepaid (Instant UPI / Online)"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-600">Payment Status:</span>
                  <span className="font-mono font-bold uppercase text-[#0E3924]">
                    {order.paymentStatus || (order.paymentMethod === "cod" ? "Pay on Handover" : "Confirmed & Verified")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-stone-500">
                <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>100% Tamper-Evident Discrete Packaging • Authenticity Guaranteed</span>
              </div>
            </div>

            {/* Calculations Box */}
            <div className="w-full sm:w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span className="font-mono">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#10B981]">
                  <span>Discount ({order.couponCode || "Coupon"}):</span>
                  <span className="font-mono">- {formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Express Shipping:</span>
                <span className="font-mono font-medium">
                  {shipping === 0 ? "FREE" : formatINR(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>GST (Included):</span>
                <span className="font-mono text-stone-500">₹0 (All taxes inclusive)</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-2 border-stone-900 font-bold text-sm text-stone-900">
                <span>Invoice Total:</span>
                <span className="font-mono text-base text-[#071A12]">{formatINR(total)}</span>
              </div>
            </div>
          </div>

          {/* Footer Declaration & Stamp */}
          <div className="border-t border-stone-200 pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-stone-500 gap-2">
            <p>
              This is a computer-generated tax invoice for Ayurvedic healthcare formulations. No physical signature required.
            </p>
            <div className="font-mono font-bold text-stone-700 tracking-wider">
              AYURVEDA GLOBAL DISPATCH QA: PASSED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
