"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import {
  buildWhatsAppUrl,
  buildProductEnquiryMessage,
} from "@/store/whatsappStore";
import { useWhatsAppStore } from "@/store/whatsappStore";
import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import { normalizeIndianPhone } from "@/lib/auth/otpService";

const contactInfo = [
  {
    icon: MessageSquare,
    title: "WhatsApp Concierge",
    value: "+91 91234 85451",
    desc: "Mon–Sat 09:00–20:00 IST",
    action: "Open WhatsApp",
  },
  {
    icon: Mail,
    title: "Email Correspondence",
    value: "ayurvedaglobalindia@gmail.com",
    desc: "Response within 24 business hours",
    action: "Compose Email",
  },
  {
    icon: Phone,
    title: "Telephone Support",
    value: "+91 91234 85451",
    desc: "Mon–Fri 10:00–18:00 IST",
    action: "Call Now",
  },
];

const enquiryTypes = [
  { value: "general", label: "General Formulation Guidance" },
  { value: "product", label: "Specific Product Dosage & Routine" },
  { value: "order", label: "Order Tracking & Delivery Status" },
  { value: "wholesale", label: "Institutional / Distribution Inquiry" },
  { value: "other", label: "Other Correspondence" },
];

export default function ContactPage() {
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    enquiryType: "general",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const { trackLead } = useWhatsAppStore();
  const { showToast } = useUIStore();

  useEffect(() => {
    if (user) {
      const parts = (user.name || "").split(" ");
      setFormData((prev) => ({
        ...prev,
        firstName: prev.firstName || parts[0] || "",
        lastName: prev.lastName || parts.slice(1).join(" ") || "",
        phone: prev.phone || user.phone || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      newErrors.email = "Valid email address is required";

    const phoneVal = normalizeIndianPhone(formData.phone);
    if (!phoneVal.isValid)
      newErrors.phone =
        phoneVal.error || "Valid 10-digit mobile number required";

    if (!formData.message.trim())
      newErrors.message = "Please provide details of your enquiry";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast({
        type: "error",
        title: "Form Incomplete",
        message: "Please review and complete all required fields.",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      showToast({
        type: "success",
        title: "Enquiry Received",
        message:
          "Your message has been safely logged. A Vaidya representative will respond shortly.",
      });
    }, 600);
  };

  const handleDirectWhatsApp = (topic: string) => {
    const message = buildProductEnquiryMessage({
      customerName:
        `${formData.firstName} ${formData.lastName}`.trim() || undefined,
      customerPhone: formData.phone.trim() || undefined,
      customerEmail: formData.email.trim() || undefined,
      productName: topic,
      enquiry: `Pranam. I would like assistance regarding ${topic}.`,
      source: "contact",
    });
    window.open(buildWhatsAppUrl(message), "_blank");
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <div className="container py-6 sm:py-10 lg:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 pb-4 border-b border-[#9E8047]/25">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase block mb-1">
              Patron Concierge
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1D1F]">
              Contact Ayur Veda Global
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] mt-1 font-sans">
              Connect with our resident Vaidya panel or operational desk for
              confidential product guidance.
            </p>
          </div>

          {/* Contact Channels Grid */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="p-5 rounded-xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#9E8047]/25 flex items-center justify-center text-[#4E5F52] mb-3">
                    <info.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading text-sm font-medium text-[#1C1D1F]">
                    {info.title}
                  </h3>
                  <p className="text-xs font-mono text-[#1C1D1F] mt-1 font-medium">
                    {info.value}
                  </p>
                  <p className="text-[11px] text-[#737373] mt-0.5">
                    {info.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#9E8047]/25">
                  <button
                    onClick={() => handleDirectWhatsApp(info.title)}
                    className="text-xs font-mono uppercase tracking-wider text-[#1C1D1F] hover:text-[#9E8047] transition-colors"
                  >
                    {info.action} →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Form and Leadership Split */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Message Form */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#9E8047]/25 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="font-heading text-xl font-normal text-[#1C1D1F] mb-1">
                Send a Message
              </h2>
              <p className="text-xs text-[#737373] mb-6">
                Our Ayurvedic team responds within 24 hours.
              </p>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-[#FAF7F2] border border-[#4E5F52]/30 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4E5F52] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-xs text-[#1C1D1F]">
                      Message Successfully Delivered
                    </p>
                    <p className="text-[11px] text-[#737373]">
                      Thank you. We will respond promptly to your registered
                      contact.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <Select
                  label="Enquiry Category"
                  value={formData.enquiryType}
                  onChange={(e) =>
                    setFormData({ ...formData, enquiryType: e.target.value })
                  }
                  options={enquiryTypes}
                  placeholder="Select enquiry category"
                  required
                />

                <div className="grid sm:grid-cols-2 gap-3">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    error={errors.firstName}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    error={errors.lastName}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    error={errors.email}
                    required
                  />
                  <Input
                    label="10-Digit Mobile Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    error={errors.phone}
                    required
                    placeholder="9876543210"
                  />
                </div>

                <Input
                  label="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="e.g. Guidance on Vitality Power Combo"
                />

                <Textarea
                  label="Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  error={errors.message}
                  required
                  placeholder="Please describe your health context, questions, or dosage inquiries..."
                  rows={4}
                />

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] text-xs font-medium uppercase tracking-wider"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    <Send className="w-3.5 h-3.5 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>

            {/* Right: Management & Logistics Desk */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#9E8047] uppercase block mb-1">
                  Executive Desk
                </span>
                <h3 className="font-heading text-base font-medium text-[#1C1D1F]">
                  Direct Administration
                </h3>

                <div className="space-y-4 mt-4 pt-4 border-t border-[#9E8047]/25">
                  {/* Mageesh */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#9E8047]/25 relative flex-shrink-0 bg-[#FAF7F2]">
                      <Image
                        src="/images/team/mageesh.jpg"
                        alt="Mageesh"
                        fill
                        className="object-cover object-top"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-xs text-[#1C1D1F]">
                        Mageesh
                      </p>
                      <p className="text-[11px] text-[#737373]">
                        Brand Direction &amp; Formulations
                      </p>
                      <a
                        href="tel:+919123485451"
                        className="text-[11px] font-mono text-[#4E5F52] hover:underline"
                      >
                        +91 91234 85451
                      </a>
                    </div>
                  </div>

                  {/* Umesh */}
                  <div className="flex items-center gap-3 pt-3 border-t border-[#9E8047]/25">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#9E8047]/25 relative flex-shrink-0 bg-[#FAF7F2]">
                      <Image
                        src="/images/team/umesh.jpg"
                        alt="Umesh"
                        fill
                        className="object-cover object-top"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-xs text-[#1C1D1F]">
                        Umesh
                      </p>
                      <p className="text-[11px] text-[#737373]">
                        Operations &amp; Dispatch Logistics
                      </p>
                      <a
                        href="mailto:ayurvedaglobalindia@gmail.com"
                        className="text-[11px] font-mono text-[#4E5F52] hover:underline"
                      >
                        ayurvedaglobalindia@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Address */}
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#4E5F52]" />
                  <h3 className="font-heading text-sm font-medium text-[#1C1D1F]">
                    Discreet Dispatch Center
                  </h3>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed font-sans">
                  Ayur Veda Global Apothecary Logistics
                  <br />
                  Mumbai, Maharashtra, India
                  <br />
                  Pan-India express courier delivery across 19,000+ pin codes.
                </p>
              </div>

              {/* Official Social Channels */}
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#9E8047]/25 shadow-xs">
                <h3 className="font-heading text-sm font-medium text-[#1C1D1F] mb-3">
                  Official Community &amp; Social Channels
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://www.instagram.com/ayurveda.global"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-gray-200 text-xs text-[#1C1D1F] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                    <span className="truncate">Instagram</span>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61594780446401"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-gray-200 text-xs text-[#1C1D1F] transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-[#1877F2]" />
                    <span className="truncate">Facebook</span>
                  </a>
                  <a
                    href="https://youtube.com/@ayurvedaglobal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-gray-200 text-xs text-[#1C1D1F] transition-colors"
                  >
                    <Youtube className="w-4 h-4 text-[#FF0000]" />
                    <span className="truncate">YouTube</span>
                  </a>
                  <a
                    href="https://wa.me/919123485451"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F4EFEA] border border-gray-200 text-xs text-[#1C1D1F] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span className="truncate">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
