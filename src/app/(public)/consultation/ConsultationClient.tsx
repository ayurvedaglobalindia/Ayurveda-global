"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  CheckCircle2,
  HeartPulse,
  Shield,
  Clock,
  Sparkles,
  Phone,
  User,
  MapPin,
  Calendar,
  ArrowRight,
  Leaf,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import { useWhatsAppStore, buildWhatsAppUrl, buildVaidyaConsultationMessage } from "@/store/whatsappStore";
import {
  CONTACT_CONFIG,
  OFFICIAL_PHONE,
  OFFICIAL_PHONE_TEL,
  CHIEF_VAIDYA_DESK_TITLE,
  DIRECT_TELEPHONE_SUPPORT_LABEL,
} from "@/lib/config/contact";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
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
  "Delhi / NCR",
  "Jammu & Kashmir",
  "Ladakh",
  "Other / Union Territory",
];

const consultationCategories = [
  {
    id: "vitality",
    title: "Vitality, Energy & Stamina",
    desc: "Ancient Rasayana therapy for physical strength, chronic fatigue & natural vigor",
  },
  {
    id: "hair",
    title: "Hair Fall & Regrowth Regimen",
    desc: "Holistic scalp balancing, herbal oiling routines & root nutrition",
  },
  {
    id: "personal-care",
    title: "Intimate Wellness & Timing",
    desc: "Discrete, private guidance on herbal endurance formulations & pacing",
  },
  {
    id: "stress-sleep",
    title: "Stress, Anxiety & Restful Sleep",
    desc: "Herbal adaptogens, Medhya Rasayana & calming Ayurvedic evening rituals",
  },
  {
    id: "digestive",
    title: "Metabolism, Gut & Agni",
    desc: "Digestive fire restoration, gut cleansing & Ayurvedic nutrition principles",
  },
  {
    id: "joint-pain",
    title: "Joint Care & Muscle Mobility",
    desc: "Sandhi-Vata easing oils, Guggulu synergies & stiffness relief",
  },
];

export default function ConsultationClient() {
  const { user } = useUserStore();
  const { showToast } = useUIStore();
  const trackLead = useWhatsAppStore((s) => s.trackLead);

  const [selectedConcern, setSelectedConcern] = useState("vitality");
  const [titlePrefix, setTitlePrefix] = useState("Shri");
  const [patientName, setPatientName] = useState(user?.name || "");
  const [patientPhone, setPatientPhone] = useState(user?.phone || "");
  const [patientState, setPatientState] = useState("Rajasthan");
  const [patientPincode, setPatientPincode] = useState("");
  const [patientCity, setPatientCity] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("Male");
  const [preferredLanguage, setPreferredLanguage] = useState("Hindi (हिंदी)");
  const [preferredSlot, setPreferredSlot] = useState(
    "Morning (10:00 AM – 01:00 PM)",
  );
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState("");

  const selectedCategoryTitle =
    consultationCategories.find((c) => c.id === selectedConcern)?.title ||
    "General Ayurvedic Consultation";

  const handleWhatsAppConsult = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      showToast({
        type: "error",
        title: "Name Required",
        message: "Please enter your full name.",
      });
      return;
    }

    const rawDigits = patientPhone.replace(/\D/g, "");
    if (rawDigits.length < 10) {
      showToast({
        type: "error",
        title: "Valid Phone Needed",
        message: "Please enter a valid 10-digit mobile number.",
      });
      return;
    }

    const cleanPincode = patientPincode.replace(/\D/g, "");
    if (cleanPincode.length > 0 && cleanPincode.length !== 6) {
      showToast({
        type: "error",
        title: "Valid Pincode Needed",
        message: "Indian Postal Pincode must be exactly 6 digits.",
      });
      return;
    }

    const formattedPhone =
      rawDigits.length === 10 ? `+91 ${rawDigits}` : `+${rawDigits}`;

    const msg = buildVaidyaConsultationMessage({
      titlePrefix,
      patientName: patientName.trim(),
      patientPhone: formattedPhone,
      patientState: patientState.trim() || undefined,
      patientPincode: cleanPincode || undefined,
      patientCity: patientCity.trim() || undefined,
      patientAge: patientAge.trim() || undefined,
      patientGender: patientGender || undefined,
      preferredLanguage,
      preferredTimeSlot: preferredSlot,
      concern: selectedCategoryTitle,
      symptoms: additionalNotes.trim() || undefined,
      source: "vaidya_consultation_form",
    });

    const whatsappUrl = buildWhatsAppUrl(msg);
    setGeneratedWhatsAppUrl(whatsappUrl);
    setSubmitted(true);

    // Track lead in store & analytics
    trackLead({
      source: "consultation_appointment_form",
      customerName: `${titlePrefix} ${patientName.trim()}`,
      customerPhone: rawDigits,
      productName: `Vaidya Appointment: ${selectedCategoryTitle}`,
    });

    showToast({
      type: "success",
      title: "Appointment Details Prepared",
      message: "Opening WhatsApp with your filled details...",
    });

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };



  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-[#737373] mb-6 font-mono"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#1C1D1F] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1C1D1F]">Vaidya Consultation</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-[#2D4A3E] to-[#1F332A] rounded-2xl p-6 sm:p-10 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#9E8047]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E8047]/30 border border-[#9E8047]/40 text-[#E8ECE9] text-xs font-mono uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Free Ayurvedic Guidance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
              Consult Our Senior Ayurvedic Vaidyas
            </h1>
            <p className="text-[#E8ECE9]/90 text-sm sm:text-base font-light leading-relaxed mb-6">
              Receive 100% confidential, personalized health advice rooted in classical Charaka Samhita &amp; Sushruta Samhita principles. Free dietary charts, dosha evaluation, and targeted herbal guidance.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#E8ECE9]/80 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#9E8047]" />
                Certified BAMS Practitioners
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#9E8047]" />
                100% Private &amp; Confidential
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#9E8047]" />
                Zero Consultation Fee
              </span>
            </div>
          </div>
        </div>

        {/* Dedicated "Call Chief Vaidya Desk" Consultation Section */}
        <div
          id="call-chief-vaidya"
          className="mb-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#1B4332] via-[#245842] to-[#1B4332] text-white shadow-xl border border-[#D4AF37]/35 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FAF7F2] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[#D4AF37] font-semibold uppercase tracking-wider text-[11px]">
                  {DIRECT_TELEPHONE_SUPPORT_LABEL}
                </span>
                <span className="text-white/60">•</span>
                <span className="text-white/90">Instant BAMS Physician Desk</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-normal leading-tight">
                {CHIEF_VAIDYA_DESK_TITLE}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 font-light leading-relaxed">
                Connect directly with our Chief Ayurvedic Doctor for priority tele-triage, dosha diagnosis, and acute symptom remedies at zero consultation fee.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-emerald-100/90 pt-1">
                <span>⏱️ {CONTACT_CONFIG.supportTiming}</span>
                <span>🔒 100% Confidential Private Line</span>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2.5 flex-shrink-0">
              <a
                href={OFFICIAL_PHONE_TEL}
                className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#C29D26] text-[#081C15] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-5 h-5 fill-current" />
                <span>Call {OFFICIAL_PHONE}</span>
              </a>
              <p className="text-[11px] text-center text-emerald-100 font-mono">
                {DIRECT_TELEPHONE_SUPPORT_LABEL}
              </p>
            </div>
          </div>
        </div>

        {/* Main Consultation Form & Trust Pillars */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#9E8047]/25 p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-[#1C1D1F] mb-2">
              Book Your Confidential Consultation
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mb-6">
              Select your health focus, enter your location details, and connect directly with our Vaidya team over WhatsApp.
            </p>

            <form onSubmit={handleWhatsAppConsult} className="space-y-6">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-3">
                  1. Select Area of Concern
                </label>
                <div className="space-y-2.5">
                  {consultationCategories.map((cat) => (
                    <label
                      key={cat.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                        selectedConcern === cat.id
                          ? "border-[#2D4A3E] bg-[#EFF4F0]/60 shadow-xs"
                          : "border-gray-200 hover:border-[#9E8047]/40 bg-gray-50/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="concern"
                        value={cat.id}
                        checked={selectedConcern === cat.id}
                        onChange={() => setSelectedConcern(cat.id)}
                        className="mt-1 text-[#2D4A3E] focus:ring-[#2D4A3E]"
                      />
                      <div>
                        <div className="font-sans text-sm font-medium text-[#1C1D1F]">
                          {cat.title}
                        </div>
                        <div className="text-xs text-[#737373] mt-0.5">
                          {cat.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Patient Details */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-3">
                  2. Patient Profile &amp; Contact Details
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#737373] mb-1 font-medium">
                      Title &amp; Full Name *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={titlePrefix}
                        onChange={(e) => setTitlePrefix(e.target.value)}
                        className="w-24 px-2.5 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#2D4A3E]"
                      >
                        <option value="Shri">Shri</option>
                        <option value="Smt">Smt</option>
                        <option value="Dr">Dr.</option>
                        <option value="Mr">Mr.</option>
                        <option value="Ms">Ms.</option>
                      </select>
                      <Input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="flex-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#737373] mb-1 font-medium">
                      WhatsApp Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500">
                        +91
                      </span>
                      <Input
                        type="tel"
                        placeholder="98765 43210"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="pl-12"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#737373] mb-1 font-medium">
                      State / UT *
                    </label>
                    <select
                      value={patientState}
                      onChange={(e) => setPatientState(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#2D4A3E]"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#737373] mb-1 font-medium">
                      Pincode (6 Digits)
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. 302001"
                      value={patientPincode}
                      onChange={(e) =>
                        setPatientPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      maxLength={6}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#737373] mb-1 font-medium">
                      City / District
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Jaipur"
                      value={patientCity}
                      onChange={(e) => setPatientCity(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#737373] mb-1 font-medium">
                      Age &amp; Gender
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Age (e.g. 32)"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        min="1"
                        max="120"
                      />
                      <select
                        value={patientGender}
                        onChange={(e) => setPatientGender(e.target.value)}
                        className="w-full px-2 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#2D4A3E]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#737373] mb-1 font-medium">
                      Preferred Language
                    </label>
                    <select
                      value={preferredLanguage}
                      onChange={(e) => setPreferredLanguage(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#2D4A3E]"
                    >
                      <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
                      <option value="English">English</option>
                      <option value="Hinglish / Both">Both / Hinglish</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#737373] mb-1 font-medium">
                      Direct Telephone Line
                    </label>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-stone-50 border border-stone-200 text-xs text-[#1C1D1F]">
                      <Phone className="w-3.5 h-3.5 text-[#1B4332]" />
                      <span>{OFFICIAL_PHONE}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Time Slot */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#737373] mb-2 font-medium">
                  3. Preferred Consultation Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    "Morning (10:00 AM – 01:00 PM)",
                    "Afternoon (02:00 PM – 05:00 PM)",
                    "Evening (06:00 PM – 09:00 PM)",
                  ].map((slot) => (
                    <label
                      key={slot}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        preferredSlot === slot
                          ? "border-[#2D4A3E] bg-[#EFF4F0] font-semibold text-[#1C1D1F]"
                          : "border-gray-200 bg-white text-[#737373] hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="slot"
                        value={slot}
                        checked={preferredSlot === slot}
                        onChange={() => setPreferredSlot(slot)}
                        className="text-[#2D4A3E] focus:ring-[#2D4A3E]"
                      />
                      <span>{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specific Notes */}
              <div>
                <label className="block text-xs text-[#737373] mb-1 font-medium">
                  4. Specific Symptoms or Medical History (Confidential)
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Share details such as symptom duration, ongoing medications, digestive habits, or specific health goals..."
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#2D4A3E] focus:border-[#2D4A3E] resize-none"
                />
              </div>

              {/* Live WhatsApp Dossier Preview */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#9E8047]" />
                    WhatsApp Dossier Transferred to Doctor
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Live Auto-Format
                  </span>
                </div>
                <div className="text-xs text-stone-700 font-mono space-y-1 bg-white p-3 rounded-lg border border-stone-200 whitespace-pre-line leading-relaxed">
                  {`🌿 AYURVEDA GLOBAL — VAIDYA APPOINTMENT
• Name: ${titlePrefix} ${patientName.trim() || "[Your Name]"}
• WhatsApp: ${patientPhone.trim() ? (patientPhone.replace(/\D/g, "").length === 10 ? `+91 ${patientPhone.replace(/\D/g, "")}` : patientPhone) : "[Your Phone]"}
• State: ${patientState}${patientPincode ? ` (PIN: ${patientPincode})` : ""}
• Concern: ${selectedCategoryTitle}
• Slot: ${preferredSlot}`}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center gap-2 text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  <span>Book Appointment &amp; Open WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <p className="text-[11px] text-center text-[#737373] mt-2 font-mono">
                  Direct connection with {CHIEF_VAIDYA_DESK_TITLE} ({OFFICIAL_PHONE}) • Free Service
                </p>

                {submitted && generatedWhatsAppUrl && (
                  <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
                    <p className="text-xs font-semibold text-emerald-900">
                      ✅ Appointment Dossier Prepared!
                    </p>
                    <p className="text-xs text-emerald-700">
                      If WhatsApp did not launch automatically, click the direct button below:
                    </p>
                    <a
                      href={generatedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-xs shadow-md hover:bg-[#20BD5A] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      Open WhatsApp Chat Now
                    </a>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Right: Pillars & Doctor Credentials */}
          <div className="lg:col-span-5 space-y-6">
            {/* Why Consult Card */}
            <div className="bg-white rounded-2xl border border-[#9E8047]/25 p-6 shadow-sm">
              <h3 className="font-serif text-lg text-[#1C1D1F] mb-4 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#2D4A3E]" />
                Why Consult Ayurveda Global?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFF4F0] flex items-center justify-center flex-shrink-0 text-[#2D4A3E] mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#1C1D1F]">
                      Certified Ayurvedic Vaidyas
                    </h4>
                    <p className="text-xs text-[#737373] mt-0.5 leading-relaxed">
                      All guidance is provided by qualified BAMS Ayurvedic practitioners with deep clinical experience in Rasayana and Vajikarana therapies.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFF4F0] flex items-center justify-center flex-shrink-0 text-[#2D4A3E] mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#1C1D1F]">
                      100% Discrete &amp; Safe
                    </h4>
                    <p className="text-xs text-[#737373] mt-0.5 leading-relaxed">
                      Your consultations, symptoms, and order history remain strictly confidential between you and the doctor.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFF4F0] flex items-center justify-center flex-shrink-0 text-[#2D4A3E] mt-0.5">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#1C1D1F]">
                      Holistic Root-Cause Treatment
                    </h4>
                    <p className="text-xs text-[#737373] mt-0.5 leading-relaxed">
                      We address the root cause via diet (Ahara), lifestyle (Vihara), and authentic herbal remedies (Aushadha)—not temporary band-aids.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Direct Call / Contact Alternative */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#9E8047]/30 p-6 text-center">
              <h4 className="font-sans text-sm font-semibold text-[#1C1D1F] mb-1">
                {DIRECT_TELEPHONE_SUPPORT_LABEL}
              </h4>
              <p className="text-xs text-[#737373] mb-4">
                Speak directly to our Chief Vaidya helpline ({CONTACT_CONFIG.supportTiming}):
              </p>
              <a
                href={OFFICIAL_PHONE_TEL}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D4A3E] text-white text-xs font-mono tracking-wider hover:bg-[#1F332A] transition-colors"
              >
                <Phone className="w-4 h-4" />
                {OFFICIAL_PHONE}
              </a>
            </div>

            {/* Direct Catalog Link */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
              <h4 className="font-serif text-base text-[#1C1D1F] mb-1">
                Explore Clinical Formulations
              </h4>
              <p className="text-xs text-[#737373] mb-4">
                View our lab-tested herbal supplements, endurance sprays &amp; hair kits.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2D4A3E] hover:underline"
              >
                <span>Browse All Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
