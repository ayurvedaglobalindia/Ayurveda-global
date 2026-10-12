"use client";

import React, { useState } from "react";
import {
  X,
  MessageCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  Shield,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import {
  useWhatsAppStore,
  buildWhatsAppUrl,
  buildVaidyaConsultationMessage,
} from "@/store/whatsappStore";
import {
  CONTACT_CONFIG,
  OFFICIAL_PHONE,
  OFFICIAL_PHONE_TEL,
  CHIEF_VAIDYA_DESK_TITLE,
  DIRECT_TELEPHONE_SUPPORT_LABEL,
} from "@/lib/config/contact";

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialConcern?: string;
}

export function AppointmentBookingModal({
  isOpen,
  onClose,
  initialConcern = "Vitality, Energy & Stamina",
}: AppointmentBookingModalProps) {
  const { user } = useUserStore();
  const { showToast } = useUIStore();
  const trackLead = useWhatsAppStore((s) => s.trackLead);

  const [titlePrefix, setTitlePrefix] = useState("Shri");
  const [patientName, setPatientName] = useState(user?.name || "");
  const [patientPhone, setPatientPhone] = useState(user?.phone || "");
  const [patientState, setPatientState] = useState("Rajasthan");
  const [patientPincode, setPatientPincode] = useState("");
  const [patientCity, setPatientCity] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("Male");
  const [selectedConcern, setSelectedConcern] = useState(initialConcern);
  const [preferredSlot, setPreferredSlot] = useState(
    "Morning (10:00 AM – 01:00 PM)",
  );
  const [preferredLanguage, setPreferredLanguage] = useState("Hindi (हिंदी)");
  const [symptoms, setSymptoms] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      showToast({
        type: "error",
        title: "Name Required",
        message: "Please enter your name for the doctor consultation.",
      });
      return;
    }

    const rawDigits = patientPhone.replace(/\D/g, "");
    if (rawDigits.length < 10) {
      showToast({
        type: "error",
        title: "Valid WhatsApp Number Required",
        message: "Please enter a valid 10-digit mobile number.",
      });
      return;
    }

    const cleanPincode = patientPincode.replace(/\D/g, "").slice(0, 6);

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
      concern: selectedConcern,
      symptoms: symptoms.trim() || undefined,
      source: "quick_appointment_modal",
    });

    const url = buildWhatsAppUrl(msg);
    setSubmittedUrl(url);

    // Track lead
    trackLead({
      source: "modal_appointment_form",
      customerName: `${titlePrefix} ${patientName.trim()}`,
      customerPhone: rawDigits,
      productName: `Vaidya Appointment: ${selectedConcern}`,
    });

    showToast({
      type: "success",
      title: "Appointment Dossier Prepared",
      message: "Opening WhatsApp with your filled details...",
    });

    if (typeof window !== "undefined") {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      if (isMobile) {
        window.location.href = url;
      } else {
        window.open(url, "_blank");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-[#9E8047]/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-[#1B4332] text-white p-5 sm:p-6 pb-5 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#9E8047]/30 border border-[#9E8047]/40 text-[#FAF7F2] text-[10px] font-mono uppercase tracking-wider">
              Free Vaidya Tele-Consultation
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-normal leading-snug">
            Book Ayurvedic Appointment
          </h3>
          <p className="text-xs text-stone-200 mt-1 font-light leading-relaxed">
            Fill your details below. We will format your complete consultation dossier and open WhatsApp instantly.
          </p>

          <div className="flex items-center gap-3 mt-3 text-[10px] sm:text-[11px] font-mono text-emerald-100">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              BAMS Doctors
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              100% Confidential
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              Zero Fee
            </span>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4 flex-1">
          {submittedUrl ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-[#25D366] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#1C1D1F]">
                  Appointment Dossier Ready
                </h4>
                <p className="text-xs text-[#737373] mt-1 max-w-sm mx-auto">
                  Your information has been packaged into the doctor message format. If WhatsApp did not open automatically, click below:
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
                <a
                  href={submittedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Doctor Chat</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSubmittedUrl(null)}
                  className="text-xs text-[#737373] hover:text-[#1C1D1F] underline py-1"
                >
                  Edit details and re-send
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Concern */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#737373] mb-1.5 font-medium">
                  Health Concern / Area
                </label>
                <select
                  value={selectedConcern}
                  onChange={(e) => setSelectedConcern(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#1B4332] focus:border-[#1B4332]"
                >
                  <option value="Vitality, Energy & Stamina">Vitality, Energy &amp; Stamina</option>
                  <option value="Hair Fall & Regrowth Regimen">Hair Fall &amp; Regrowth Regimen</option>
                  <option value="Intimate Wellness & Timing">Intimate Wellness &amp; Timing</option>
                  <option value="Stress, Anxiety & Restful Sleep">Stress, Anxiety &amp; Restful Sleep</option>
                  <option value="Metabolism, Gut & Agni">Metabolism, Gut &amp; Agni</option>
                  <option value="Joint Care & Muscle Mobility">Joint Care &amp; Muscle Mobility</option>
                  <option value="General Health Rejuvenation">General Health Rejuvenation</option>
                </select>
              </div>

              {/* Patient Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#737373] mb-1 font-medium">
                    Title &amp; Full Name *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={titlePrefix}
                      onChange={(e) => setTitlePrefix(e.target.value)}
                      className="w-20 px-2 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#1B4332]"
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
                    WhatsApp Number *
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
              </div>

              {/* State & Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#737373] mb-1 font-medium">
                    State / UT *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Rajasthan"
                    value={patientState}
                    onChange={(e) => setPatientState(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#737373] mb-1 font-medium">
                    Pincode (6 digits)
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
              </div>

              {/* Age, Gender & City */}
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs text-[#737373] mb-1 font-medium">
                    Age
                  </label>
                  <Input
                    type="number"
                    placeholder="32"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    min="1"
                    max="120"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#737373] mb-1 font-medium">
                    Gender
                  </label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full px-2 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#1B4332]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#737373] mb-1 font-medium">
                    City
                  </label>
                  <Input
                    type="text"
                    placeholder="Jaipur"
                    value={patientCity}
                    onChange={(e) => setPatientCity(e.target.value)}
                  />
                </div>
              </div>

              {/* Slot & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#737373] mb-1 font-medium">
                    Preferred Slot
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#1B4332]"
                  >
                    <option value="Morning (10:00 AM – 01:00 PM)">Morning (10 AM – 1 PM)</option>
                    <option value="Afternoon (02:00 PM – 05:00 PM)">Afternoon (2 PM – 5 PM)</option>
                    <option value="Evening (06:00 PM – 09:00 PM)">Evening (6 PM – 9 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#737373] mb-1 font-medium">
                    Consultation Language
                  </label>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#1B4332]"
                  >
                    <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
                    <option value="English">English</option>
                    <option value="Hinglish / Both">Both / Hinglish</option>
                  </select>
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="block text-xs text-[#737373] mb-1 font-medium">
                  Symptoms / Specific Query (Confidential)
                </label>
                <textarea
                  rows={2}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. Duration of symptoms, digestive issues, sleep quality..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#1B4332] resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 space-y-2">
                <Button
                  type="submit"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Details &amp; Open WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>

                <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[#737373]">
                  <span>Prefer calling?</span>
                  <a
                    href={OFFICIAL_PHONE_TEL}
                    className="font-semibold text-[#1B4332] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{DIRECT_TELEPHONE_SUPPORT_LABEL}: {OFFICIAL_PHONE}</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
