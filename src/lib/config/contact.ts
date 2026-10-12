/**
 * Central Brand Contact Configuration for Ayur Veda Global
 * Single source of truth for all phone numbers, WhatsApp, and helpline desks.
 */

export const CONTACT_CONFIG = {
  // Official Phone Formats
  phoneRaw: "9123485451",
  phoneDisplay: "+91 91234 85451",
  phoneE164: "+919123485451",
  phoneTel: "tel:+919123485451",

  // WhatsApp
  whatsappNumber: "919123485451",
  whatsappDisplay: "+91 91234 85451",

  // Desk Titles & Operations
  chiefVaidyaDeskTitle: "Call Chief Vaidya Desk",
  directTelephoneSupportLabel: "Direct Telephone Support",
  doctorDesignation: "Chief BAMS Ayurvedic Physician",
  supportTiming: "Mon–Sat 9:00 AM – 8:00 PM IST",
  supportEmail: "care@ayurvedaglobal.com",

  // Brand Info
  registeredAddress: "Ayur Veda Global Apothecary, India",
} as const;

export const OFFICIAL_PHONE = CONTACT_CONFIG.phoneDisplay;
export const OFFICIAL_PHONE_TEL = CONTACT_CONFIG.phoneTel;
export const OFFICIAL_PHONE_E164 = CONTACT_CONFIG.phoneE164;
export const OFFICIAL_WHATSAPP_NUMBER = CONTACT_CONFIG.whatsappNumber;
export const CHIEF_VAIDYA_DESK_TITLE = CONTACT_CONFIG.chiefVaidyaDeskTitle;
export const DIRECT_TELEPHONE_SUPPORT_LABEL =
  CONTACT_CONFIG.directTelephoneSupportLabel;

export function getTelLink(): string {
  return CONTACT_CONFIG.phoneTel;
}

export function getWhatsAppDirectUrl(message?: string): string {
  const target = CONTACT_CONFIG.whatsappNumber;
  if (!message) {
    return `https://wa.me/${target}`;
  }
  return `https://wa.me/${target}?text=${encodeURIComponent(message)}`;
}
