'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Clock,
  Truck,
  Package,
  ShieldCheck,
  MapPin,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Lock,
} from 'lucide-react'
import { buildWhatsAppUrl } from '@/store/whatsappStore'

interface DeliveryTrackerProps {
  orderNumber?: string
  createdAt?: string
  currentDay?: number // 1 to 4
  carrier?: string
  trackingNumber?: string
  shippingCity?: string
}

export function DeliveryTracker4Day({
  orderNumber = 'AVG-PROCESSING',
  createdAt,
  currentDay = 1,
  carrier = 'BlueDart Express / Delivery Logistics',
  trackingNumber,
  shippingCity = 'Your City',
}: DeliveryTrackerProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(currentDay - 1)

  const baseDate = createdAt ? new Date(createdAt) : new Date()

  const formatDateOffset = (daysOffset: number) => {
    const d = new Date(baseDate)
    d.setDate(d.getDate() + daysOffset)
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  }

  const steps = [
    {
      day: 'Day 1',
      title: 'Authenticated & Packed',
      subtitle: 'Apothecary Lab Verification',
      date: formatDateOffset(0),
      time: '10:30 AM',
      icon: Sparkles,
      status: 'completed',
      location: 'Central Apothecary Lab, New Delhi',
      desc: 'Formulation verified by Chief Vaidya panel for standardized HPLC bioactives. Sealed in a 100% plain, unmarked, tamper-evident discreet box with zero exterior branding.',
    },
    {
      day: 'Day 2',
      title: 'Dispatched via Air Express',
      subtitle: 'Logistics Handover',
      date: formatDateOffset(1),
      time: '02:15 PM',
      icon: Package,
      status: currentDay >= 2 ? 'completed' : currentDay === 1 ? 'in-progress' : 'upcoming',
      location: 'National Logistics Hub, IGI Cargo',
      desc: 'Handed over to BlueDart / Express Air Logistics. Priority AWB tracking barcode scanned and cleared for express interstate air cargo transfer.',
    },
    {
      day: 'Day 3',
      title: 'In Transit to Local Hub',
      subtitle: 'Regional Distribution',
      date: formatDateOffset(2),
      time: '08:45 AM',
      icon: Truck,
      status: currentDay >= 3 ? 'completed' : currentDay === 2 ? 'in-progress' : 'upcoming',
      location: `Regional Sorting Facility, ${shippingCity}`,
      desc: 'Arrived at regional delivery hub. Loaded into temperature-shielded transit van for final route allocation to your delivery postal code.',
    },
    {
      day: 'Day 4',
      title: 'Doorstep Delivery & COD',
      subtitle: 'Private Handover',
      date: formatDateOffset(3),
      time: 'By 05:00 PM',
      icon: MapPin,
      status: currentDay >= 4 ? 'completed' : currentDay === 3 ? 'in-progress' : 'upcoming',
      location: `Doorstep Delivery, ${shippingCity}`,
      desc: 'Courier executive en route to your doorstep. Inspect outer carton condition and pay securely via Cash or instant UPI upon physical handover.',
    },
  ]

  const activeStep = steps[activeDayIndex] || steps[0]
  const progressPercent = ((currentDay - 0.5) / 4) * 100

  const handleWhatsAppStatus = () => {
    const msg = `*Track Order Status - Ayur Veda Global*\n` +
      `• Order ID: ${orderNumber}\n` +
      `• Status: Day ${currentDay} of 4 (In Progress)\n` +
      `Please share real-time live dispatch tracking coordinates.`
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <div className="rounded-2xl bg-[#FFFFFF] border border-[#999999]/30 p-4 sm:p-5 shadow-sm space-y-4 text-left">
      
      {/* Header with Live Status & Order ID */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-[#999999]/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4E5F52] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4E5F52]" />
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#4E5F52]">
              4-Day Express Dispatch Journey
            </span>
          </div>
          <h3 className="font-heading text-sm sm:text-base font-medium text-[#1C1D1F] mt-0.5">
            Order #{orderNumber}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#EFF4F0] border border-[#4E5F52]/30 text-[#4E5F52] text-[10.5px] font-semibold flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#4E5F52]" />
            Day {currentDay} of 4 • On Schedule
          </span>
        </div>
      </div>

      {/* 4-Day Animated Progress Timeline Bar */}
      <div className="relative pt-3 pb-2">
        {/* Background Track Line */}
        <div className="absolute top-7 left-4 right-4 sm:left-6 sm:right-6 h-1 bg-[#999999]/20 rounded-full z-0" />
        
        {/* Animated Progress Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(12, progressPercent))}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute top-7 left-4 sm:left-6 h-1 bg-[#4E5F52] rounded-full z-0"
        />

        {/* 4 Day Indicator Nodes */}
        <div className="relative z-10 grid grid-cols-4 gap-1 sm:gap-2">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentDay - 1
            const isCurrent = idx === currentDay - 1
            const isSelected = idx === activeDayIndex

            return (
              <button
                key={idx}
                onClick={() => setActiveDayIndex(idx)}
                className="flex flex-col items-center text-center group focus:outline-none"
              >
                {/* Step Circle Node */}
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                    isCompleted
                      ? 'bg-[#4E5F52] text-white shadow-xs'
                      : isCurrent
                      ? 'bg-[#FFFFFF] border-2 border-[#4E5F52] text-[#4E5F52] ring-4 ring-[#4E5F52]/10 shadow-sm'
                      : 'bg-[#FAF7F2] border border-[#999999]/30 text-[#999999]'
                  } ${isSelected ? 'scale-110' : 'hover:scale-105'}`}
                >
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full border border-[#4E5F52] animate-ping opacity-30" />
                  )}
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <step.icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#4E5F52]' : ''}`} />
                  )}
                </div>

                {/* Day Label */}
                <span
                  className={`text-[10px] sm:text-[11px] font-semibold mt-2 transition-colors ${
                    isSelected ? 'text-[#1C1D1F]' : isCompleted ? 'text-[#4E5F52]' : 'text-[#737373]'
                  }`}
                >
                  {step.day}
                </span>

                {/* Compact Date */}
                <span className="text-[9px] text-[#999999] hidden sm:block truncate max-w-full">
                  {step.date.split(',')[0]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Day Clinical & Dispatch Dossier Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDayIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-3.5 sm:p-4 rounded-xl bg-[#FAF7F2] border border-[#999999]/30 space-y-2.5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#999999]/30">
            <div className="flex items-center gap-2">
              <span className="text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30">
                {activeStep.day} Landmark
              </span>
              <h4 className="font-heading text-xs sm:text-sm font-semibold text-[#1C1D1F]">
                {activeStep.title}
              </h4>
            </div>
            <span className="text-[10.5px] text-[#737373] font-mono">
              {activeStep.date} • {activeStep.time}
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-[#555555] leading-relaxed font-sans">
            {activeStep.desc}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#999999]/30 text-[10px] text-[#737373]">
            <div className="flex items-center gap-1.5 text-[#1C1D1F]">
              <MapPin className="w-3.5 h-3.5 text-[#4E5F52] flex-shrink-0" />
              <span>{activeStep.location}</span>
            </div>
            <div className="flex items-center gap-1 text-[#737373]">
              <Lock className="w-3 h-3 text-[#9E8047]" />
              <span>Discreet Logistics Protocol</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Dispatch Footer & WhatsApp Updates */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
        <div className="text-[10.5px] text-[#737373]">
          <span className="text-[#1C1D1F] font-medium">Logistics Partner:</span> {carrier}
          {trackingNumber && (
            <span className="ml-2 font-mono text-[#9E8047]">AWB: {trackingNumber}</span>
          )}
        </div>

        <button
          onClick={handleWhatsAppStatus}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F5F1EB] border border-[#999999]/30 text-[#1C1D1F] text-[11px] font-medium transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#4E5F52]" />
          <span>Ask Live Status via WhatsApp</span>
        </button>
      </div>

    </div>
  )
}
