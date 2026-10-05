'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { MessageCircle, PhoneCall, ShieldCheck, Clock, Award, CheckCircle2, User, Phone, MapPin } from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from '@/store/whatsappStore'
import { normalizeIndianPhone } from '@/lib/auth/otpService'

export function VaidyaConsultationDesk() {
  const { user } = useUserStore()
  const [selectedConcern, setSelectedConcern] = useState('Daily Fatigue & Workout Stamina')
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
    'Daily Fatigue & Workout Stamina',
    'Intimate Endurance & Performance Timing',
    'Vitality Power Combo Course Guidance',
    'Dosha Imbalance & Agni Cleansing',
  ]

  const handleStartConsultation = () => {
    const newErrors: Record<string, string> = {}
    const finalName = patientName.trim() || user?.name || ''
    const finalPhone = patientPhone.trim() || user?.phone || ''

    if (!finalName) {
      newErrors.name = 'Please enter your full name'
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
      enquiry: `Pranam Vaidya Ji. I would like confidential Ayurvedic guidance regarding: "${selectedConcern}". Please advise me on the recommended herbal dosage, timing, and dietary lifestyle guidelines.`,
      source: 'doctor-section',
    })
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <section className="bg-[#08090C] py-8 sm:py-12 lg:py-16 border-b border-[#999999]/20 text-[#FAF7EE] relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#11141E] border border-[#999999]/20 p-5 sm:p-7 lg:p-9 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6EE7B7]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D8C28A]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Doctor Profile & Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151926] border border-[#999999]/25 text-[#D8C28A] text-[10px] font-semibold tracking-[0.22em] uppercase">
                  <Award className="w-3 h-3 text-[#D8C28A]" />
                  <span>№ 06 • Certified BAMS / MD Vaidyas</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151926] border border-[#6EE7B7]/30 text-[10px] text-[#6EE7B7] font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6EE7B7] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6EE7B7]" />
                  </span>
                  <span>Physician Desk Active</span>
                </div>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#FAF7EE] tracking-tight leading-snug">
                Confidential Ayurvedic Consultation,{' '}
                <span className="italic font-serif text-[#D8C28A]">
                  Tailored to Your Constitution.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#999999] leading-relaxed font-sans font-normal">
                Every human constitution (Prakriti) possesses distinct biological requirements. Our in-house Ayurvedic physicians assess your lifestyle, doshic balance, and stamina goals to provide discreet, individualized herbal dosage protocols.
              </p>

              {/* Consultation Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#FAF7EE]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6EE7B7] flex-shrink-0" />
                  <span>100% Confidential &amp; Private</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6EE7B7] flex-shrink-0" />
                  <span>No Consultation Fees</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6EE7B7] flex-shrink-0" />
                  <span>Personalized Diet &amp; Herb Regimen</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6EE7B7] flex-shrink-0" />
                  <span>Instant WhatsApp / Phone Callback</span>
                </div>
              </div>

              {/* Verified Physician Badge */}
              <div className="pt-4 border-t border-[#999999]/20 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D8C28A]/60 shadow-md flex-shrink-0 bg-[#151926]">
                  <Image
                    src="/images/team/mageesh.jpg"
                    alt="Ayurvedic Vaidya Panel Lead"
                    fill
                    className="object-cover object-top"
                    sizes="48px"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#6EE7B7] rounded-full border-2 border-[#08090C]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#FAF7EE] flex items-center gap-1.5">
                    <span>Dr. Vaidya Panel (BAMS, MD Ayu)</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  </p>
                  <p className="text-[11px] text-[#999999]">Over 25+ Years of Classical Rasayana &amp; Clinical Practice</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Card */}
            <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#08090C] border border-[#999999]/25 shadow-xl space-y-4">
              <div>
                <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#6EE7B7] block mb-1">
                  Step 1: Select Your Primary Concern
                </span>
                <div className="space-y-1.5 mt-2">
                  {concerns.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedConcern(c)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all border flex items-center justify-between ${
                        selectedConcern === c
                          ? 'bg-[#151926] border-[#6EE7B7]/60 text-[#FAF7EE] font-medium shadow-sm'
                          : 'bg-[#11141E] border-[#999999]/20 text-[#999999] hover:text-[#FAF7EE] hover:border-[#999999]/40'
                      }`}
                    >
                      <span className="text-[11px] sm:text-xs">{c}</span>
                      {selectedConcern === c && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#6EE7B7] flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Patient Context (Prefilled / Editable) */}
              <div className="space-y-2.5 pt-2 border-t border-[#999999]/20">
                <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#6EE7B7] block">
                  Step 2: Patient Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <div className="relative">
                      <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999999] pointer-events-none" />
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value)
                          if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
                        }}
                        placeholder="Your Full Name *"
                        className={`w-full pl-8 pr-2.5 py-2 rounded-lg bg-[#11141E] border text-xs text-[#FAF7EE] placeholder-[#999999]/60 focus:outline-none transition-all ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-[#999999]/25 focus:border-[#6EE7B7]'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999999] pointer-events-none" />
                      <input
                        type="tel"
                        maxLength={10}
                        value={patientPhone}
                        onChange={(e) => {
                          setPatientPhone(e.target.value.replace(/\D/g, ''))
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
                        }}
                        placeholder="10-Digit Mobile / WhatsApp *"
                        className={`w-full pl-8 pr-2.5 py-2 rounded-lg bg-[#11141E] border text-xs text-[#FAF7EE] placeholder-[#999999]/60 focus:outline-none transition-all ${
                          errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#999999]/25 focus:border-[#6EE7B7]'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#999999] pointer-events-none" />
                  <input
                    type="text"
                    value={patientCity}
                    onChange={(e) => setPatientCity(e.target.value)}
                    placeholder="City / State (e.g. Pune, Maharashtra)"
                    className="w-full pl-8 pr-2.5 py-2 rounded-lg bg-[#11141E] border border-[#999999]/25 text-xs text-[#FAF7EE] placeholder-[#999999]/60 focus:border-[#6EE7B7] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleStartConsultation}
                  className="w-full py-3 px-4 rounded-xl bg-[#D8C28A] hover:bg-[#E6D5AC] text-[#08090C] font-bold text-xs tracking-wide transition-all shadow-md shadow-[#D8C28A]/20 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#08090C]" />
                  <span>Start WhatsApp Doctor Consult</span>
                </button>

                <p className="text-[10px] text-center text-[#999999] mt-2">
                  Available Mon–Sat: 9:00 AM – 8:00 PM IST • Free Service
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
