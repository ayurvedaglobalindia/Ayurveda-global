'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { MessageCircle, ShieldCheck, CheckCircle2, User, Phone, MapPin } from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from '@/store/whatsappStore'
import { normalizeIndianPhone } from '@/lib/auth/otpService'

export function VaidyaConsultationDesk() {
  const { user } = useUserStore()
  const [selectedConcern, setSelectedConcern] = useState('Daily Stamina & Energy Optimization')
  const [patientName, setPatientName] = useState('')
  const [patientPhone, setPatientPhone] = useState('')
  const [patientCity, setPatientCity] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (user) {
      setPatientName(prev => prev || user.name || '')
      setPatientPhone(prev => prev || user.phone || '')
      setPatientCity(prev => {
        if (prev) return prev
        const addr = user.addresses?.[0]
        return addr ? [addr.city, addr.state].filter(Boolean).join(', ') : ''
      })
    }
  }, [user])

  const concerns = [
    'Daily Stamina & Energy Optimization',
    'Intimate Endurance & Performance Timing',
    'Scalp Nutrition & Hair Regrowth Protocol',
    'Dosha Balance & General Wellness',
  ]

  const handleStartConsultation = () => {
    const newErrors: Record<string, string> = {}
    const finalName = patientName.trim() || user?.name || ''
    const finalPhone = patientPhone.trim() || user?.phone || ''

    if (!finalName) {
      newErrors.name = 'Please enter your name'
    }

    const phoneVal = normalizeIndianPhone(finalPhone)
    if (!phoneVal.isValid) {
      newErrors.phone = phoneVal.error || 'Please enter a valid 10-digit mobile number'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    const msg = buildVaidyaConsultationMessage({
      patientName: finalName,
      patientPhone: phoneVal.phone,
      patientCity: patientCity.trim() || (user?.addresses?.[0]?.city ? `${user.addresses[0].city}, ${user.addresses[0].state || ''}` : ''),
      concern: selectedConcern,
      enquiry: `Pranam Vaidya Ji. I would like confidential Ayurvedic guidance regarding: "${selectedConcern}". Please advise me on the recommended herbal dosage, timing, and routine.`,
      source: 'doctor-section',
    })
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <section className="bg-[#FAF7F2] py-14 sm:py-20 lg:py-24 border-b border-[#E2DDD5]">
      <div className="container">
        <div className="max-w-5xl mx-auto rounded-2xl bg-[#FFFFFF] border border-[#E2DDD5] p-6 sm:p-8 lg:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Doctor Profile & Guidance Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#737373]">
                  Confidential Guidance
                </span>
                <span className="text-[#999999]/40">•</span>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-[#4E5F52]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                  <span>Resident Vaidya Desk</span>
                </div>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1D1F] tracking-tight leading-snug">
                Confidential Ayurvedic Consultation
              </h2>

              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans font-normal">
                Every constitution has unique physiological requirements. Our Ayurvedic practitioners review your daily lifestyle, doshic balance, and health goals to provide personalized dosage recommendations.
              </p>

              {/* Consultation Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#1C1D1F]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4E5F52] flex-shrink-0" />
                  <span className="text-[#555555]">100% Confidential &amp; Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4E5F52] flex-shrink-0" />
                  <span className="text-[#555555]">Complimentary Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4E5F52] flex-shrink-0" />
                  <span className="text-[#555555]">Personalized Herbal Routine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4E5F52] flex-shrink-0" />
                  <span className="text-[#555555]">Direct WhatsApp Interaction</span>
                </div>
              </div>

              {/* Verified Physician Badge */}
              <div className="pt-4 border-t border-[#E2DDD5] flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#E2DDD5] flex-shrink-0 bg-[#F5F1EB]">
                  <Image
                    src="/images/team/mageesh.jpg"
                    alt="Ayurvedic Vaidya Panel Lead"
                    fill
                    className="object-cover object-top"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#1C1D1F] flex items-center gap-1.5">
                    <span>Ayurvedic Vaidya Panel (BAMS)</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4E5F52]" />
                  </p>
                  <p className="text-[11px] text-[#737373] font-sans mt-0.5">Classical Rasayana Guidance • Mon–Sat: 09:00 – 20:00 IST</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Card */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-xl bg-[#FAF7F2] border border-[#E2DDD5] space-y-5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#737373] block mb-2">
                  01 / Select Primary Concern
                </span>
                <div className="space-y-1.5">
                  {concerns.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedConcern(c)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors border flex items-center justify-between ${
                        selectedConcern === c
                          ? 'bg-[#1C1D1F] border-[#1C1D1F] text-[#FAF7F2] font-medium'
                          : 'bg-[#FFFFFF] border-[#E2DDD5] text-[#555555] hover:text-[#1C1D1F]'
                      }`}
                    >
                      <span className="text-xs">{c}</span>
                      {selectedConcern === c && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FAF7F2] flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Patient Context */}
              <div className="space-y-2.5 pt-3 border-t border-[#E2DDD5]">
                <span className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#737373] block">
                  02 / Patient Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#737373] pointer-events-none" />
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value)
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
                        }}
                        placeholder="Your Name *"
                        className={`w-full pl-8 pr-3 py-2 rounded-lg bg-[#FFFFFF] border text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-colors ${
                          errors.name ? 'border-red-500' : 'border-[#E2DDD5] focus:border-[#1C1D1F]'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#737373] pointer-events-none" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={patientPhone}
                        onChange={(e) => {
                          setPatientPhone(e.target.value.replace(/\D/g, ''))
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
                        }}
                        placeholder="10-Digit Mobile *"
                        className={`w-full pl-8 pr-3 py-2 rounded-lg bg-[#FFFFFF] border text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-[#E2DDD5] focus:border-[#1C1D1F]'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#737373] pointer-events-none" />
                  <input
                    type="text"
                    value={patientCity}
                    onChange={(e) => setPatientCity(e.target.value)}
                    placeholder="City / State (e.g. Pune, Maharashtra)"
                    className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#E2DDD5] text-xs text-[#1C1D1F] placeholder-[#999999] focus:border-[#1C1D1F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleStartConsultation}
                  className="w-full py-2.5 px-4 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] font-medium text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#FAF7F2]" />
                  <span>Initiate WhatsApp Consultation</span>
                </button>

                <p className="text-[10px] text-center text-[#737373] mt-2 font-mono">
                  Confidential &amp; Secure • Private Dispatches
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
