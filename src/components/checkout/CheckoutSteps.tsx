/* eslint-disable @next/next/no-img-element */
"use client";
import { placeOrderServer, saveLeadServer } from "@/app/actions";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Truck,
  RotateCcw,
  CheckCircle2,
  CreditCard,
  Smartphone,
  MapPin,
  Phone,
  User,
  Mail,
  Gift,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Sparkles,
  KeyRound,
  AlertCircle,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useWhatsAppStore } from "@/store/whatsappStore";
import { trackEvent } from "@/lib/analytics";
import { useUserStore } from "@/store/userStore";
import {
  buildWhatsAppUrl,
  buildOrderWhatsAppMessage,
} from "@/store/whatsappStore";
import {
  formatINR,
  calculateShipping,
  validatePhone,
  validatePincode,
  validateEmail,
} from "@/lib/utils/formatters";
import { validateCoupon } from "@/lib/coupons";
import { getProductImage } from "@/lib/products/registry";
import {
  sendOTP,
  verifyOTP,
  normalizeIndianPhone,
  isPhoneAlreadyVerified,
  getWhatsAppVerifyUrl,
} from "@/lib/auth/otpService";
import type { Order } from "@/types";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi NCR",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Chandigarh",
  "Puducherry",
];

export function CheckoutForm() {
  const router = useRouter();
  const {
    items,
    couponCode,
    discount,
    tax,
    getSubtotal,
    getTotal,
    clearCart,
    applyCoupon,
    removeCoupon,
    getItemCount,
  } = useCartStore();

  const { showToast } = useUIStore();
  const { trackLead } = useWhatsAppStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "Delhi NCR",
    pincode: "",
    paymentMethod: "whatsapp" as "whatsapp" | "cod" | "upi",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mobile OTP Verification State
  const { user } = useUserStore();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [testOtpCode, setTestOtpCode] = useState<string | null>(null);
  const [whatsappVerifyUrl, setWhatsappVerifyUrl] = useState("");

  // Pre-fill user data & check verified phone status
  useEffect(() => {
    if (user?.phone) {
      setFormData((prev) => ({
        ...prev,
        phone: prev.phone || user.phone,
        firstName: prev.firstName || (user.name ? user.name.split(" ")[0] : ""),
        lastName:
          prev.lastName ||
          (user.name ? user.name.split(" ").slice(1).join(" ") : ""),
        email: prev.email || user.email || "",
      }));
      if (user.isPhoneVerified || isPhoneAlreadyVerified(user.phone)) {
        setIsPhoneVerified(true);
      }
    }
  }, [user]);

  useEffect(() => {
    trackEvent("checkout_start", {
      subtotal: getSubtotal(),
      total: getTotal(),
      itemsCount: items.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resend Countdown Timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(
      () => setResendCooldown((prev) => prev - 1),
      1000,
    );
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handlePhoneInputChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: digits }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));

    if (isPhoneAlreadyVerified(digits)) {
      setIsPhoneVerified(true);
      setOtpSent(false);
      setOtpError(null);
    } else {
      setIsPhoneVerified(false);
      setOtpSent(false);
      setOtpInput("");
      setTestOtpCode(null);
    }
  };

  const handleSendCheckoutOtp = async () => {
    const {
      isValid,
      phone: cleanPhone,
      error,
    } = normalizeIndianPhone(formData.phone);
    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        phone: error || "Please enter a valid 10-digit mobile number",
      }));
      const el = document.getElementById("field-phone");
      if (el) el.focus();
      return;
    }

    setOtpLoading(true);
    setOtpError(null);
    try {
      const res = await sendOTP(cleanPhone, formData.firstName.trim());
      setOtpLoading(false);
      if (res.success) {
        setOtpSent(true);
        setResendCooldown(30);
        if (res.simulatedOtp) {
          setTestOtpCode(res.simulatedOtp);
          setWhatsappVerifyUrl(
            getWhatsAppVerifyUrl(cleanPhone, res.simulatedOtp),
          );
        }
        showToast({
          type: "info",
          title: "OTP Dispatched",
          message: res.message,
        });
      } else {
        setOtpError(res.message);
      }
    } catch {
      setOtpLoading(false);
      setOtpError(
        "Failed to send verification code. Please check your network.",
      );
    }
  };

  const handleVerifyCheckoutOtp = async () => {
    const { isValid, phone: cleanPhone } = normalizeIndianPhone(formData.phone);
    if (!isValid) return;

    if (otpInput.trim().length !== 6) {
      setOtpError("Please enter all 6 digits of the OTP.");
      return;
    }

    setOtpLoading(true);
    setOtpError(null);
    try {
      const res = await verifyOTP(cleanPhone, otpInput.trim());
      setOtpLoading(false);
      if (res.success) {
        setIsPhoneVerified(true);
        setOtpSent(false);
        setOtpError(null);
        setTestOtpCode(null);
        showToast({
          type: "success",
          title: "Mobile Number Verified",
          message: "Your phone number has been verified for this order.",
        });
      } else {
        setOtpError(res.message);
      }
    } catch {
      setOtpLoading(false);
      setOtpError("Verification failed. Please retry.");
    }
  };

  const subtotal = getSubtotal();
  const total = getTotal();
  const itemCount = getItemCount();
  const shippingCalc = calculateShipping(subtotal);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    setCouponError(null);
    setCouponLoading(true);
    try {
      const data = validateCoupon(
        couponInput.trim().toUpperCase(),
        subtotal,
        items.map((i) => i.productId),
        items.map((i) => i.product?.category).filter(Boolean) as string[],
      );
      if (data.valid) {
        applyCoupon(
          data.coupon?.code || couponInput.trim().toUpperCase(),
          data.discount,
        );
        setCouponInput("");
        setCouponError(null);
        showToast({
          type: "success",
          title: "Coupon Applied",
          message: "Discount has been deducted from your order.",
        });
      } else {
        setCouponError(data.error || "Invalid coupon code");
      }
    } catch {
      setCouponError("Unable to apply coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "10-digit WhatsApp number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }
    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.addressLine1.trim())
      newErrors.addressLine1 = "House/Flat & Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "6-digit pincode is required";
    } else if (!validatePincode(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit Indian pincode";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus();
      }
      return false;
    }
    return true;
  };

  const handlePlaceOrder = (forcedMode?: "whatsapp" | "cod") => {
    if (!validateAll()) return;

    setIsSubmitting(true);
    const effectivePayment = forcedMode || formData.paymentMethod;

    const orderId = `AVG-${Date.now().toString().slice(-6)}`;
    const orderNumber = orderId;
    const customerFullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

    const recordedOrder: Order = {
      id: orderId,
      orderNumber,
      createdAt: new Date().toISOString(),
      total,
      subtotal,
      shipping: shippingCalc.cost,
      discount,
      status: "confirmed",
      paymentMethod: effectivePayment,
      items: items.map((item) => {
        const img = getProductImage(item.product, item.productId, "thumb");
        const variantName = item.product?.variants?.find(
          (v) => v.id === item.variantId,
        )?.name;
        return {
          productId: item.productId,
          variantId: item.variantId,
          name: item.product.name,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
          image: img.src,
          variantName,
        };
      }),
      shippingAddress: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        country: "India",
      },
      couponCode: couponCode || undefined,
      notes: formData.notes.trim() || undefined,
      whatsappMessageSent: true,
    };

    // Save to user store & localStorage for instant tracking
    useUserStore.getState().addOrder(recordedOrder);
    placeOrderServer(recordedOrder).catch(console.error);
    try {
      if (typeof window !== "undefined") {
        const stored = JSON.parse(localStorage.getItem("ayur_orders") || "[]");
        stored.unshift(recordedOrder);
        localStorage.setItem(
          "ayur_orders",
          JSON.stringify(stored.slice(0, 50)),
        );
      }
    } catch {}

    // Track order conversion in privacy-conscious analytics
    trackEvent("order_conversion", {
      orderId,
      total,
      itemsCount: items.length,
      paymentMethod: effectivePayment,
    });

    // Track analytics lead
    saveLeadServer({
      source: "checkout_whatsapp",
      productName: items.map((i) => i.product.name).join(", "),
      customerName: customerFullName,
      customerPhone: formData.phone.trim(),
      customerEmail: formData.email.trim(),
      quantity: items.reduce((sum, i) => sum + i.quantity, 0),
      orderTotal: total,
      orderId,
    }).catch(console.error);
    trackLead({
      source: "checkout_whatsapp",
      productName: items.map((i) => i.product.name).join(", "),
      customerName: customerFullName,
      customerPhone: formData.phone.trim(),
      customerEmail: formData.email.trim(),
      quantity: items.reduce((sum, i) => sum + i.quantity, 0),
      orderTotal: total,
      orderId,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    });

    // Build rich, custom WhatsApp order message
    const message = buildOrderWhatsAppMessage({
      orderId,
      orderNumber,
      customerName: customerFullName,
      customerPhone: formData.phone.trim(),
      customerEmail: formData.email.trim() || undefined,
      shippingAddress: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2.trim() || undefined,
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        phone: formData.phone.trim(),
      },
      items: items.map((item) => {
        const variantName = item.product?.variants?.find(
          (v) => v.id === item.variantId,
        )?.name;
        return {
          name: item.product.name,
          productName: item.product.name,
          variantName,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        };
      }),
      subtotal,
      shipping: shippingCalc.cost,
      tax: 0,
      discount,
      total,
      paymentMethod: effectivePayment,
      couponCode: couponCode || undefined,
      notes: formData.notes.trim() || undefined,
    });

    // Open WhatsApp URL directly
    const whatsappUrl = buildWhatsAppUrl(message);
    window.open(whatsappUrl, "_blank");

    // Clear cart and redirect
    clearCart();
    router.push(`/checkout/success?order=${orderNumber}`);
  };

  return (
    <div className="container py-4 sm:py-6 lg:py-8 pb-16">
      <div className="max-w-5xl mx-auto">
        {/* Compact Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 sm:mb-5 border-b border-[#9E8047]/25">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#9E8047]/25 p-1 flex-shrink-0 shadow-sm">
              <img src="/images/brand-logo.png" alt="Ayurveda Global" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[9.5px] uppercase tracking-[0.2em] font-semibold text-[#9E8047] block">
                Direct Apothecary Dispatch
              </span>
              <h1 className="font-heading text-lg sm:text-xl font-medium text-[#1C1D1F] tracking-tight mt-0.5">
                Confidential Checkout
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10.5px] text-[#737373]">
            <span className="flex items-center gap-1 text-[#555555]">
              <Lock className="w-3.5 h-3.5 text-[#4E5F52]" />
              100% Discreet Packaging
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#555555]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4E5F52]" />
              AYUSH Standard
            </span>
          </div>
        </div>

        {/* 2-Column Unified Layout (Zero Dead Space) */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* Left Column: Customer & Delivery Details + Payment Choice (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Card 1: Contact & Delivery Address */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#9E8047]/25 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25 flex items-center justify-center text-[#4E5F52]">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-[#1C1D1F]">
                      1. Contact &amp; Delivery Address
                    </h2>
                  </div>
                </div>
                <span className="text-[10px] text-[#737373] font-mono">
                  Pan-India Courier
                </span>
              </div>

              {/* Name Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#1C1D1F] mb-1">
                    First Name <span className="text-[#9E8047]">*</span>
                  </label>
                  <input
                    id="field-firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName)
                        setErrors({ ...errors, firstName: "" });
                    }}
                    placeholder="e.g. Vikram"
                    className={`w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-all ${
                      errors.firstName
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                        : "border-[#9E8047]/25 focus:border-[#4E5F52] focus:ring-1 focus:ring-[#4E5F52]/20"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#1C1D1F] mb-1">
                    Last Name <span className="text-[#9E8047]">*</span>
                  </label>
                  <input
                    id="field-lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName)
                        setErrors({ ...errors, lastName: "" });
                    }}
                    placeholder="e.g. Sharma"
                    className={`w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-all ${
                      errors.lastName
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                        : "border-[#9E8047]/25 focus:border-[#4E5F52] focus:ring-1 focus:ring-[#4E5F52]/20"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & Email Row */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-medium text-[#1C1D1F]">
                      Mobile Number (+91){" "}
                      <span className="text-[#9E8047]">*</span>
                    </label>
                    {isPhoneVerified && (
                      <span className="text-[10px] font-bold text-[#4E5F52] flex items-center gap-1 bg-[#EFF4F0] px-2 py-0.5 rounded border border-[#4E5F52]/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>OTP Verified</span>
                      </span>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-semibold text-[#737373] pointer-events-none">
                      +91
                    </span>
                    <input
                      id="field-phone"
                      type="tel"
                      maxLength={10}
                      disabled={isPhoneVerified}
                      value={formData.phone}
                      onChange={(e) => handlePhoneInputChange(e.target.value)}
                      placeholder="98765 43210"
                      className={`w-full pl-11 pr-20 py-2 rounded-xl bg-[#FAF7F2] border text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-all ${
                        isPhoneVerified
                          ? "border-[#4E5F52]/50 bg-[#EFF4F0] text-[#4E5F52] font-semibold"
                          : errors.phone
                            ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                            : "border-[#9E8047]/25 focus:border-[#4E5F52] focus:ring-1 focus:ring-[#4E5F52]/20"
                      }`}
                    />
                    {isPhoneVerified ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsPhoneVerified(false);
                          setOtpSent(false);
                        }}
                        className="absolute right-2 px-2 py-1 text-[10px] text-[#9E8047] hover:text-[#1C1D1F] transition-colors"
                      >
                        Change
                      </button>
                    ) : (
                      formData.phone.length === 10 &&
                      !otpSent && (
                        <button
                          type="button"
                          onClick={handleSendCheckoutOtp}
                          disabled={otpLoading}
                          className="absolute right-1.5 px-2.5 py-1 rounded-lg bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] text-[10px] font-medium transition-all shadow-sm"
                        >
                          {otpLoading ? "..." : "Send OTP"}
                        </button>
                      )
                    )}
                  </div>

                  {/* Inline OTP Verification Box when OTP is sent */}
                  {!isPhoneVerified && otpSent && (
                    <div className="mt-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 space-y-2.5 shadow-sm">
                      <div className="flex items-center justify-between text-xs text-[#1C1D1F]">
                        <span className="flex items-center gap-1.5 font-semibold text-[11px]">
                          <KeyRound className="w-3.5 h-3.5 text-[#4E5F52]" />
                          <span>Enter 6-Digit OTP</span>
                        </span>
                        <button
                          type="button"
                          onClick={handleSendCheckoutOtp}
                          disabled={resendCooldown > 0 || otpLoading}
                          className={`text-[10px] font-medium ${
                            resendCooldown > 0
                              ? "text-gray-400"
                              : "text-[#4E5F52] hover:underline"
                          }`}
                        >
                          {resendCooldown > 0
                            ? `Resend (${resendCooldown}s)`
                            : "Resend OTP"}
                        </button>
                      </div>

                      {testOtpCode && (
                        <div className="p-1.5 rounded-lg bg-[#F7F3EB] border border-[#9E8047]/30 text-center">
                          <span className="text-[10px] text-[#9E8047]">
                            Verification Code:{" "}
                            <strong className="font-mono text-[#1C1D1F] text-xs tracking-wider">
                              {testOtpCode}
                            </strong>
                          </span>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) => {
                            const val = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6);
                            setOtpInput(val);
                            if (otpError) setOtpError(null);
                          }}
                          placeholder="••••••"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#9E8047]/25 text-center font-mono text-sm tracking-[0.3em] text-[#1C1D1F] focus:outline-none focus:border-[#4E5F52]"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyCheckoutOtp}
                          disabled={otpLoading || otpInput.trim().length !== 6}
                          className="px-3.5 py-1.5 rounded-lg bg-[#4E5F52] hover:bg-[#3D4B40] text-white text-xs font-medium transition-all disabled:opacity-50"
                        >
                          {otpLoading ? "..." : "Verify"}
                        </button>
                      </div>

                      {otpError && (
                        <p className="text-[10px] text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          <span>{otpError}</span>
                        </p>
                      )}

                      {whatsappVerifyUrl && (
                        <div className="pt-1 text-center border-t border-[#9E8047]/25">
                          <a
                            href={whatsappVerifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-[#4E5F52] hover:underline inline-flex items-center gap-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Verify instantly via WhatsApp Desk</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Status helper text */}
                  {errors.phone ? (
                    <p className="text-[10px] text-red-500 mt-1">
                      {errors.phone}
                    </p>
                  ) : !isPhoneVerified ? (
                    <p className="text-[9.5px] text-[#737373] mt-1 flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-[#4E5F52]" />
                      <span>
                        Order confirmation &amp; live parcel tracking will be
                        sent to this WhatsApp number
                      </span>
                    </p>
                  ) : (
                    <p className="text-[9.5px] text-[#4E5F52] mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#4E5F52] flex-shrink-0" />
                      <span>
                        Order updates &amp; live parcel tracking enabled for
                        this verified number
                      </span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#1C1D1F] mb-1">
                    Email Address{" "}
                    <span className="text-[#999999] font-normal">
                      (Optional receipt)
                    </span>
                  </label>
                  <input
                    id="field-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="vikram@example.com"
                    className={`w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-all ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#9E8047]/25 focus:border-[#4E5F52] focus:ring-1 focus:ring-[#4E5F52]/20"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Complete Address */}
              <div>
                <label className="block text-[11px] font-medium text-[#1C1D1F] mb-1">
                  Flat, House No., Building &amp; Street{" "}
                  <span className="text-[#9E8047]">*</span>
                </label>
                <input
                  id="field-addressLine1"
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) => {
                    setFormData({ ...formData, addressLine1: e.target.value });
                    if (errors.addressLine1)
                      setErrors({ ...errors, addressLine1: "" });
                  }}
                  placeholder="e.g. Flat 402, Block B, Green Heights, MG Road"
                  className={`w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-all ${
                    errors.addressLine1
                      ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                      : "border-[#9E8047]/25 focus:border-[#4E5F52] focus:ring-1 focus:ring-[#4E5F52]/20"
                  }`}
                />
                {errors.addressLine1 && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.addressLine1}
                  </p>
                )}
              </div>

              {/* Landmark / Colony */}
              <div>
                <label className="block text-[11px] font-medium text-[#1C1D1F] mb-1">
                  Area, Colony or Landmark{" "}
                  <span className="text-[#999999] font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.addressLine2}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine2: e.target.value })
                  }
                  placeholder="e.g. Near Metro Station / Behind Axis Bank"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 focus:border-[#4E5F52] text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none focus:ring-1 focus:ring-[#4E5F52]/20 transition-all"
                />
              </div>

              {/* City, State, Pincode Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#1C1D1F] mb-1">
                    City <span className="text-[#9E8047]">*</span>
                  </label>
                  <input
                    id="field-city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value });
                      if (errors.city) setErrors({ ...errors, city: "" });
                    }}
                    placeholder="e.g. New Delhi"
                    className={`w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-all ${
                      errors.city
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#9E8047]/25 focus:border-[#4E5F52]"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#1C1D1F] mb-1">
                    State <span className="text-[#9E8047]">*</span>
                  </label>
                  <select
                    id="field-state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 focus:border-[#4E5F52] text-xs text-[#1C1D1F] focus:outline-none"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="bg-[#FFFFFF] text-[#1C1D1F]"
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#1C1D1F] mb-1">
                    Pincode <span className="text-[#9E8047]">*</span>
                  </label>
                  <input
                    id="field-pincode"
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, pincode: val });
                      if (errors.pincode) setErrors({ ...errors, pincode: "" });
                    }}
                    placeholder="110001"
                    className={`w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-all ${
                      errors.pincode
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#9E8047]/25 focus:border-[#4E5F52]"
                    }`}
                  />
                  {errors.pincode && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Card 2: Payment & Order Confirmation Preference */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#9E8047]/25 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25 flex items-center justify-center text-[#4E5F52]">
                    <CreditCard className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="font-heading text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-[#1C1D1F]">
                    2. Payment &amp; Confirmation Method
                  </h2>
                </div>
              </div>

              {/* 3 Selectable Radio Options */}
              <div className="space-y-2 pt-1">
                {/* Option 1: WhatsApp Direct Order (Recommended) */}
                <label
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "whatsapp" })
                  }
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === "whatsapp"
                      ? "bg-[#F5F1EB] border-[#4E5F52] shadow-xs"
                      : "bg-[#FAF7F2] border-[#9E8047]/25 hover:border-[#D5CEC4]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "whatsapp"}
                    onChange={() =>
                      setFormData({ ...formData, paymentMethod: "whatsapp" })
                    }
                    className="mt-0.5 accent-[#4E5F52]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-heading text-xs sm:text-[13px] font-medium text-[#1C1D1F] flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5 text-[#4E5F52]" />
                        WhatsApp Direct Order &amp; Concierge
                      </span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] font-semibold border border-[#4E5F52]/30 flex-shrink-0">
                        Fastest Dispatch
                      </span>
                    </div>
                    <p className="text-[11px] text-[#737373] leading-relaxed mt-0.5">
                      Directly sends order summary &amp; address to our
                      Ayurvedic Concierge on WhatsApp for instant confirmation.
                    </p>
                  </div>
                </label>

                {/* Option 2: Cash on Delivery (COD) */}
                <label
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "cod" })
                  }
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === "cod"
                      ? "bg-[#F5F1EB] border-[#4E5F52] shadow-xs"
                      : "bg-[#FAF7F2] border-[#9E8047]/25 hover:border-[#D5CEC4]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={() =>
                      setFormData({ ...formData, paymentMethod: "cod" })
                    }
                    className="mt-0.5 accent-[#4E5F52]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-heading text-xs sm:text-[13px] font-medium text-[#1C1D1F] flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#4E5F52]" />
                        Cash on Delivery (Doorstep COD)
                      </span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-[#EFF4F0] text-[#4E5F52] font-semibold border border-[#4E5F52]/30 flex-shrink-0">
                        Pay on Delivery
                      </span>
                    </div>
                    <p className="text-[11px] text-[#737373] leading-relaxed mt-0.5">
                      Inspect package at doorstep &amp; pay via Cash or UPI QR
                      upon delivery across 25,000+ pin codes.
                    </p>
                  </div>
                </label>

                {/* Option 3: Instant UPI */}
                <label
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "upi" })
                  }
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === "upi"
                      ? "bg-[#F5F1EB] border-[#4E5F52] shadow-xs"
                      : "bg-[#FAF7F2] border-[#9E8047]/25 hover:border-[#D5CEC4]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === "upi"}
                    onChange={() =>
                      setFormData({ ...formData, paymentMethod: "upi" })
                    }
                    className="mt-0.5 accent-[#4E5F52]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-heading text-xs sm:text-[13px] font-medium text-[#1C1D1F] flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-[#4E5F52]" />
                      Instant UPI (PhonePe / GPay / Paytm)
                    </span>
                    <p className="text-[11px] text-[#737373] leading-relaxed mt-0.5">
                      Instant verification via official handle (
                      <span className="text-[#1C1D1F] font-mono">
                        ayurvedaglobal@okhdfcbank
                      </span>
                      ).
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Card 3: Optional Delivery Note */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25">
              <label className="block text-[11px] font-medium text-[#1C1D1F] mb-1">
                Special Delivery Instructions{" "}
                <span className="text-[#999999] font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="e.g. Deliver between 2 PM - 6 PM, leave with security guard, plain brown box."
                className="w-full px-3 py-2 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25 focus:border-[#4E5F52] text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none focus:ring-1 focus:ring-[#4E5F52]/20 resize-none"
              />
            </div>
          </div>

          {/* Right Column: Sticky Order Summary & Direct WhatsApp Action (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-sm space-y-4">
              {/* Summary Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#9E8047]/25">
                <h3 className="font-heading text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-[#1C1D1F]">
                  Order Summary ({itemCount}{" "}
                  {itemCount === 1 ? "item" : "items"})
                </h3>
                <Link
                  href="/cart"
                  className="text-[11px] text-[#4E5F52] hover:underline font-medium"
                >
                  Edit Bag
                </Link>
              </div>

              {/* Items Compact Strip */}
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => {
                  const resolvedImg = getProductImage(
                    item.product,
                    item.productId,
                    "thumb",
                  );
                  const variantName = item.product?.variants?.find(
                    (v) => v.id === item.variantId,
                  )?.name;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25"
                    >
                      <div className="relative w-11 h-11 rounded-lg bg-[#FFFFFF] border border-[#9E8047]/25 flex-shrink-0 overflow-hidden">
                        <Image
                          src={resolvedImg.src}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs text-[#1C1D1F] truncate leading-tight">
                          {item.product.name}
                        </p>
                        {variantName && (
                          <span className="text-[9.5px] text-[#737373] font-medium block truncate">
                            {variantName}
                          </span>
                        )}
                        <p className="text-[10px] text-[#999999] mt-0.5">
                          Qty: {item.quantity} × {formatINR(item.price)}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-semibold text-[#1C1D1F]">
                          {formatINR(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Compact Coupon Code Input */}
              <div className="pt-2 border-t border-[#9E8047]/25">
                {couponCode ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#EFF4F0] border border-[#4E5F52]/30 text-xs">
                    <div className="flex items-center gap-1.5 text-[#4E5F52]">
                      <Gift className="w-3.5 h-3.5" />
                      <span className="font-mono font-semibold">
                        {couponCode}
                      </span>
                      <span className="text-[10px] text-[#4E5F52]">
                        (-{formatINR(discount)})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[10px] text-red-500 hover:text-red-600 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) =>
                          setCouponInput(e.target.value.toUpperCase())
                        }
                        placeholder="Promo code (e.g. AYUR10)"
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25 text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none uppercase"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponInput.trim() || couponLoading}
                        className="px-3 py-1.5 rounded-lg bg-[#1C1D1F] hover:bg-[#333333] border border-[#1C1D1F] text-[#FAF7F2] text-xs font-medium disabled:opacity-50 transition-all"
                      >
                        {couponLoading ? "..." : "Apply"}
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[10.5px] text-red-500">
                        {couponError}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-[#9E8047]/25">
                <div className="flex justify-between text-[#737373]">
                  <span>Subtotal</span>
                  <span className="text-[#1C1D1F] font-medium">
                    {formatINR(subtotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#4E5F52]">
                    <span>Coupon Discount</span>
                    <span className="font-medium">-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#737373]">
                  <span>Express Shipping</span>
                  <span className="text-[#4E5F52] font-medium">
                    {shippingCalc.freeShipping
                      ? "FREE"
                      : formatINR(shippingCalc.cost)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#1C1D1F] pt-2 border-t border-[#9E8047]/25">
                  <span>Grand Total</span>
                  <span className="text-[#1C1D1F] font-bold">
                    {formatINR(total)}
                  </span>
                </div>
              </div>

              {/* Primary Direct WhatsApp Action Button */}
              <div className="pt-2 space-y-2">
                {formData.paymentMethod === "cod" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handlePlaceOrder("cod")}
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#4E5F52] hover:bg-[#3D4D40] text-white font-medium text-xs sm:text-sm tracking-wide shadow-sm flex items-center justify-center gap-2 group transition-all duration-200 active:scale-[0.99] disabled:opacity-60"
                    >
                      <Truck className="w-4 h-4 flex-shrink-0" />
                      <span>Confirm Cash on Delivery — {formatINR(total)}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePlaceOrder("whatsapp")}
                      disabled={isSubmitting}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-[#9E8047]/25 text-[#1C1D1F] font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#4E5F52]" />
                      <span>Or Confirm Instantly via WhatsApp Desk</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handlePlaceOrder("whatsapp")}
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#4E5F52] hover:bg-[#3D4D40] text-white font-medium text-xs sm:text-sm tracking-wide shadow-sm flex items-center justify-center gap-2 group transition-all duration-200 active:scale-[0.99] disabled:opacity-60"
                    >
                      <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
                      <span>Confirm Order via WhatsApp Concierge</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePlaceOrder("cod")}
                      disabled={isSubmitting}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-[#9E8047]/25 text-[#1C1D1F] font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-all"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#4E5F52]" />
                      <span>Pay via Cash on Delivery (COD)</span>
                    </button>
                  </>
                )}

                <p className="text-[10px] text-center text-[#737373] leading-tight pt-0.5">
                  Tapping will record your order &amp; connect directly to our
                  Ayurvedic concierge on WhatsApp for instant confirmation.
                </p>
              </div>

              {/* Trust Badges Strip (Nature Sage Green + Soft Grey) */}
              <div className="pt-3 border-t border-[#9E8047]/25 space-y-2 text-[10.5px] text-[#737373]">
                <div className="flex items-center gap-2 text-[#555555]">
                  <Lock className="w-3.5 h-3.5 text-[#4E5F52] flex-shrink-0" />
                  <span>100% Plain Unmarked Box • Complete Privacy</span>
                </div>
                <div className="flex items-center gap-2 text-[#555555]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E5F52] flex-shrink-0" />
                  <span>AYUSH Standard Certified Classical Rasayana</span>
                </div>
                <div className="flex items-center gap-2 text-[#555555]">
                  <Truck className="w-3.5 h-3.5 text-[#4E5F52] flex-shrink-0" />
                  <span>Doorstep Delivery Across 25,000+ Pin Codes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
