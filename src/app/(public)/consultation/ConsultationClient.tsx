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
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from "@/store/whatsappStore";

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
];

export default function ConsultationClient() {
  const { user } = useUserStore();
  const { showToast } = useUIStore();

  const [selectedConcern, setSelectedConcern] = useState("vitality");
  const [patientName, setPatientName] = useState(user?.name || "");
  const [patientPhone, setPatientPhone] = useState(user?.phone || "");
  const [patientCity, setPatientCity] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("Hindi");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsAppConsult = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      showToast({
        type: "error",
        title: "Required Information",
        message: "Please enter your name.",
      });
      return;
    }

    if (!patientPhone.trim() || patientPhone.replace(/\D/g, "").length < 10) {
      showToast({
        type: "error",
        title: "Valid Phone Needed",
        message: "Please enter a valid 10-digit mobile number.",
      });
      return;
    }

    const selectedCategoryTitle =
      consultationCategories.find((c) => c.id === selectedConcern)?.title ||
      "my health concerns";

    const msg = buildVaidyaConsultationMessage({
      concern: selectedCategoryTitle,
      enquiry: additionalNotes?.trim()
        ? `I would like to consult a Vaidya regarding ${selectedCategoryTitle} (${additionalNotes.trim()}) and personalized Ayurvedic guidance. Please assist me.`
        : undefined,
    });

    const whatsappUrl = buildWhatsAppUrl(msg);
    setSubmitted(true);
    showToast({
      type: "success",
      title: "Opening WhatsApp Desk",
      message: "Connecting you with our senior Ayurvedic Vaidya...",
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

        {/* Main Consultation Form & Trust Pillars */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#9E8047]/25 p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-[#1C1D1F] mb-2">
              Book Your Confidential Consultation
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mb-6">
              Select your health focus and connect directly with our Vaidya team over WhatsApp.
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
                  2. Your Contact Details
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#737373] mb-1">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#737373] mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="e.g. 98765 43210"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#737373] mb-1">
                      City &amp; State
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Jaipur, Rajasthan"
                      value={patientCity}
                      onChange={(e) => setPatientCity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#737373] mb-1">
                      Preferred Language
                    </label>
                    <select
                      value={preferredLanguage}
                      onChange={(e) => setPreferredLanguage(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#2D4A3E] focus:border-[#2D4A3E]"
                    >
                      <option value="Hindi">Hindi (हिंदी)</option>
                      <option value="English">English</option>
                      <option value="Both">Both / Hinglish</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Specific Notes */}
              <div>
                <label className="block text-xs text-[#737373] mb-1">
                  Specific Questions or Symptoms (Optional &amp; Confidential)
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Tell our Vaidya about how long you've had symptoms, current medicines, or specific queries..."
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#2D4A3E] focus:border-[#2D4A3E] resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full py-3.5 bg-[#1F332A] hover:bg-[#2D4A3E] text-white flex items-center justify-center gap-2 text-sm font-medium tracking-wide shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span>Start WhatsApp Doctor Consultation</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <p className="text-[11px] text-center text-[#737373] mt-2 font-mono">
                  Instant Response during Mon–Sat 9:00 AM – 8:00 PM IST • No Consultation Fee
                </p>
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
                Prefer a Phone Call?
              </h4>
              <p className="text-xs text-[#737373] mb-4">
                Speak directly to our wellness support helpline during business hours:
              </p>
              <a
                href="tel:+919123485451"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D4A3E] text-white text-xs font-mono tracking-wider hover:bg-[#1F332A] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 91234 85451
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
