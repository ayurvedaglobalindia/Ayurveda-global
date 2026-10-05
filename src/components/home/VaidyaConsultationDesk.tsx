'use client'

import React from 'react'
import { MessageCircle, ShieldCheck } from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from '@/store/whatsappStore'

export function VaidyaConsultationDesk() {
  const { user } = useUserStore()

  const handleStartConsultation = () => {
    const primaryAddr = user?.addresses?.[0]
    const userCity = primaryAddr ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(', ') : ''
    const msg = buildVaidyaConsultationMessage({
      patientName: user?.name || '',
      patientPhone: user?.phone || '',
      patientCity: userCity,
      concern: 'Personalized Herbal Routine & Daily Dosage',
      enquiry: 'Pranam Vaidya Ji. I would like confidential guidance regarding recommended Ayurvedic formulations and daily dosage.',
      source: 'consultation-banner',
    })
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <section className="bg-[#FAF7F2] py-12 sm:py-16 border-b border-[#E2DDD5]" aria-label="Ayurvedic Consultation">
      <div className="container">
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#FFFFFF] border border-[#E2DDD5] p-6 sm:p-8 md:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-[#4E5F52]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
              <span>Resident Vaidya Concierge</span>
            </div>

            <h2 className="font-heading text-xl sm:text-2xl font-normal text-[#1C1D1F] tracking-tight">
              Confidential Ayurvedic Consultation
            </h2>

            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans">
              Need personalized guidance on formulations, timing, or dosage? Speak directly with our Resident Vaidya for confidential recommendations tailored to your constitution.
            </p>

            <div className="flex items-center gap-4 pt-1 text-[11px] text-[#737373]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4E5F52]" />
                BAMS Certified Panel
              </span>
              <span>•</span>
              <span>100% Confidential</span>
              <span>•</span>
              <span>Mon–Sat 09:00 – 20:00 IST</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleStartConsultation}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] font-medium text-xs tracking-wider uppercase transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#FAF7F2]" />
              <span>Consult on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
