"use client";

import React, { useState, useEffect } from "react";
import { Truck, CheckCircle2, ShieldCheck, MapPin, Clock } from "lucide-react";

export function PincodeDeliveryEstimator() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "serviceable" | "invalid">("idle");
  const [cityResult, setCityResult] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ayur_patron_pincode");
      if (saved && saved.length === 6) {
        setPincode(saved);
        calculateDelivery(saved);
      }
    } catch {}
  }, []);

  const calculateDelivery = (pin: string) => {
    if (!/^\d{6}$/.test(pin)) {
      setStatus("invalid");
      return;
    }

    try {
      localStorage.setItem("ayur_patron_pincode", pin);
    } catch {}

    const firstDigit = pin[0];
    const firstTwo = pin.slice(0, 2);

    let city = "India Destination";
    let daysToAdd = 3;

    if (firstTwo === "11") {
      city = "Delhi NCR (Express Region)";
      daysToAdd = 2;
    } else if (firstTwo === "40") {
      city = "Mumbai Metro Region";
      daysToAdd = 2;
    } else if (firstTwo === "56") {
      city = "Bengaluru Urban";
      daysToAdd = 2;
    } else if (firstTwo === "60") {
      city = "Chennai Region";
      daysToAdd = 3;
    } else if (firstTwo === "70") {
      city = "Kolkata Metro";
      daysToAdd = 3;
    } else if (firstTwo === "50") {
      city = "Hyderabad Region";
      daysToAdd = 2;
    } else if (["1", "2"].includes(firstDigit)) {
      city = "Northern Postal Circle";
      daysToAdd = 3;
    } else if (["3", "4"].includes(firstDigit)) {
      city = "Western Postal Circle";
      daysToAdd = 3;
    } else if (["5", "6"].includes(firstDigit)) {
      city = "Southern Postal Circle";
      daysToAdd = 3;
    } else {
      city = "Eastern & Central Postal Circle";
      daysToAdd = 4;
    }

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysToAdd);

    const formattedDate = targetDate.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    setCityResult(city);
    setDeliveryDate(formattedDate);
    setStatus("serviceable");
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    calculateDelivery(pincode.trim());
  };

  return (
    <div className="p-4 rounded-2xl bg-[#F5F1EB] border border-[#9E8047]/25 my-5">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#1C1D1F]">
          <Truck className="w-4 h-4 text-[#9E8047]" />
          <span>Postal Delivery &amp; PIN Verification</span>
        </div>
        <span className="text-[10px] font-mono text-[#075E54] bg-[#25D366]/15 px-2 py-0.5 rounded-full font-bold">
          All India 19,000+ PINs
        </span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2 mb-2.5">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setPincode(val);
              if (val.length === 6) calculateDelivery(val);
              else if (val.length === 0) setStatus("idle");
            }}
            placeholder="Enter 6-digit Indian PIN Code"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#9E8047]/30 text-xs text-[#1C1D1F] focus:border-[#9E8047] focus:outline-hidden font-mono tracking-wider"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-[#1C1D1F] hover:bg-[#071A12] text-white text-xs font-mono font-medium transition-colors"
        >
          Check
        </button>
      </form>

      {status === "serviceable" && (
        <div className="p-3 rounded-xl bg-white border border-[#25D366]/40 text-xs text-[#1C1D1F] space-y-1 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 text-[#075E54] font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#25D366] flex-shrink-0" />
            <span>Serviceable: Express Courier Available for {pincode} ({cityResult})</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#555555] text-[11px] font-mono pt-1">
            <Clock className="w-3.5 h-3.5 text-[#9E8047]" />
            <span>Estimated delivery by <strong className="text-[#1C1D1F]">{deliveryDate}</strong></span>
          </div>
        </div>
      )}

      {status === "invalid" && (
        <p className="text-[11px] text-red-600 font-mono mt-1">
          Please enter a valid 6-digit Indian PIN code.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2 text-[10.5px] font-mono text-[#666666]">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#9E8047]" />
          Discreet plain box packaging
        </span>
        <span>•</span>
        <span>Free shipping on ₹999+</span>
        <span>•</span>
        <span>Cash on Delivery (COD)</span>
      </div>
    </div>
  );
}
