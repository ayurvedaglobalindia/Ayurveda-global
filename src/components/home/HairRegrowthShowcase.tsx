'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  Eye,
  Award,
  Leaf,
  FlaskConical,
} from 'lucide-react'
import { getProductById } from '@/lib/products/registry'
import { formatINR as formatPrice } from '@/lib/utils/formatters'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { buildWhatsAppUrl, buildVaidyaConsultationMessage } from '@/store/whatsappStore'
import { Modal } from '@/components/ui/Modal'

export function HairRegrowthShowcase() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const hairKit = getProductById('hair-regrow-kit')

  const { addItem } = useCartStore()
  const { user, isAuthenticated } = useUserStore()
  const { openCartDrawer, openModal } = useUIStore()

  const handleQuickAdd = () => {
    if (!hairKit) return
    const variantId = hairKit.variants?.[0]?.id || 'hair-regrow-kit-standard'
    if (!isAuthenticated) {
      openModal('auth-gate', {
        product: hairKit,
        variantId,
        quantity: 1,
        mode: 'add-to-cart',
      })
      return
    }
    addItem(hairKit, variantId, 1)
    openCartDrawer()
  }

  const handleHairConsult = () => {
    const primaryAddr = user?.addresses?.[0]
    const userCity = primaryAddr ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(', ') : ''
    const msg = buildVaidyaConsultationMessage({
      patientName: user?.name || '',
      patientPhone: user?.phone || '',
      patientCity: userCity,
      concern: 'Hair Fall & Follicle Re-Growth Analysis',
      enquiry: 'Pranam Vaidya Ji. I would like a personalized hair consultation regarding hair thinning, shedding, and the HAIR RE-GROW Ayurvedic Therapy Kit.',
      source: 'hair-regrow-showcase',
    })
    window.open(buildWhatsAppUrl(msg), '_blank')
  }

  return (
    <section className="bg-[#08090C] py-12 sm:py-16 lg:py-20 border-b border-[#999999]/20 text-[#FAF7EE] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#D8C28A]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[350px] h-[350px] bg-[#6EE7B7]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11141E] border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-semibold tracking-[0.24em] uppercase mb-3 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#6EE7B7]" />
            <span>№ 05 • Ayurvedic Clinical Innovation</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-light text-[#FAF7EE] tracking-tight">
            प्रकृति की शक्ति • <span className="italic font-serif text-[#D8C28A]">Stronger Roots. Healthier You.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#999999] mt-3 max-w-xl mx-auto leading-relaxed font-sans font-normal">
            Classical herbal science meets modern cellular vitality. Targeted follicular revitalization with pure Bhringraj, Amla, Mulethi, and Hibiscus.
          </p>
        </div>

        {/* Dual Visual Feature Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Visual Artwork Cards (2 Creative Posters side-by-side or stacked) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            
            {/* Poster 1: Master Clinical Infographic */}
            <div className="rounded-3xl bg-gradient-to-b from-[#131722] via-[#0E1118] to-[#0A0C11] border border-[#999999]/25 overflow-hidden group shadow-2xl flex flex-col justify-between hover:border-[#D8C28A]/45 transition-all duration-300">
              <div className="relative aspect-[4/5] w-full bg-[#08090C] overflow-hidden">
                <Image
                  src="/images/banners/hair-regrow-clinical-poster.jpg"
                  alt="Ayurveda Global HAIR RE-GROW Clinical Infographic - Stronger Roots & Healthier You"
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 340px"
                />
                
                {/* View Larger Badge */}
                <button
                  onClick={() => setSelectedAsset('/images/banners/hair-regrow-clinical-poster.jpg')}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#08090C]/85 backdrop-blur-md border border-[#999999]/30 text-[#FAF7EE] text-[10px] font-medium flex items-center gap-1.5 opacity-90 group-hover:opacity-100 hover:bg-[#151926] hover:border-[#D8C28A]/60 transition-all shadow-md"
                  aria-label="Zoom clinical infographic"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D8C28A]" />
                  <span>Inspect Poster</span>
                </button>
              </div>

              <div className="p-4 sm:p-5 bg-[#090C12]/90 border-t border-[#999999]/20">
                <div className="flex items-center gap-1.5 text-[#6EE7B7] text-[10px] font-semibold uppercase tracking-wider mb-1">
                  <FlaskConical className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  <span>Botanical Formulation Actives</span>
                </div>
                <h4 className="font-heading text-sm sm:text-base font-normal text-[#FAF7EE]">
                  Master Hair Revitalization Chart
                </h4>
                <p className="text-xs text-[#999999] mt-1 line-clamp-2">
                  Clinical synergy of Amalaki, Japapushpa, Yashtimadhu, and pure Bhringraj extracts.
                </p>
              </div>
            </div>

            {/* Poster 2: 3D Mascot Artwork */}
            <div className="rounded-3xl bg-gradient-to-b from-[#131722] via-[#0E1118] to-[#0A0C11] border border-[#999999]/25 overflow-hidden group shadow-2xl flex flex-col justify-between hover:border-[#D8C28A]/45 transition-all duration-300">
              <div className="relative aspect-[4/5] w-full bg-[#08090C] overflow-hidden">
                <Image
                  src="/images/banners/hair-regrow-3d-creative.jpg"
                  alt="Ayurveda Global Hair Treatment Mascot - Say Goodbye to Hair Loss"
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 340px"
                />

                <button
                  onClick={() => setSelectedAsset('/images/banners/hair-regrow-3d-creative.jpg')}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#08090C]/85 backdrop-blur-md border border-[#999999]/30 text-[#FAF7EE] text-[10px] font-medium flex items-center gap-1.5 opacity-90 group-hover:opacity-100 hover:bg-[#151926] hover:border-[#D8C28A]/60 transition-all shadow-md"
                  aria-label="Zoom mascot creative"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D8C28A]" />
                  <span>Inspect Creative</span>
                </button>
              </div>

              <div className="p-4 sm:p-5 bg-[#090C12]/90 border-t border-[#999999]/20">
                <div className="flex items-center gap-1.5 text-[#6EE7B7] text-[10px] font-semibold uppercase tracking-wider mb-1">
                  <Award className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  <span>Official Quality Hallmark</span>
                </div>
                <h4 className="font-heading text-sm sm:text-base font-normal text-[#FAF7EE]">
                  Certified Pure Ayurvedic Care
                </h4>
                <p className="text-xs text-[#999999] mt-1 line-clamp-2">
                  Say farewell to follicle miniaturization with authentic doctor-approved Rasayana chemistry.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Inside-Out Regrowth Therapy Protocol & Quick Action */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#131722] via-[#0E1118] to-[#0A0C11] border border-[#999999]/25 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#999999]/20">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.22em] text-[#6EE7B7]">
                    Complete 2-in-1 Protocol
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-normal text-[#FAF7EE] tracking-tight mt-0.5">
                    HAIR RE-GROW Dual Therapy Kit
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-[#FAF7EE]">
                    {hairKit ? formatPrice(hairKit.price) : '₹1,899'}
                  </span>
                  <span className="block text-xs text-[#999999] line-through mt-0.5">
                    {hairKit?.compareAtPrice ? formatPrice(hairKit.compareAtPrice) : '₹2,499'}
                  </span>
                </div>
              </div>

              {/* Inside-Out Methodology */}
              <div className="space-y-3 text-xs">
                
                <div className="p-3.5 rounded-2xl bg-[#090C12]/90 border border-[#999999]/20 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-[#151926] border border-[#999999]/25 text-[#6EE7B7] flex items-center justify-center flex-shrink-0 text-xs font-bold font-mono">
                    01
                  </div>
                  <div>
                    <h5 className="font-heading text-xs sm:text-[13px] font-semibold text-[#FAF7EE]">
                      External: 100ml Scalp Taila Massage
                    </h5>
                    <p className="text-[11px] sm:text-xs text-[#999999] mt-0.5 leading-relaxed">
                      Clears dandruff, calms scalp heat (Pitta), and opens micro-channels directly to dermal follicles.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#090C12]/90 border border-[#999999]/20 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-[#151926] border border-[#999999]/25 text-[#6EE7B7] flex items-center justify-center flex-shrink-0 text-xs font-bold font-mono">
                    02
                  </div>
                  <div>
                    <h5 className="font-heading text-xs sm:text-[13px] font-semibold text-[#FAF7EE]">
                      Internal: 60 Botanical Vegetarian Capsules
                    </h5>
                    <p className="text-[11px] sm:text-xs text-[#999999] mt-0.5 leading-relaxed">
                      Supplies essential micronutrients and antioxidants via the bloodstream to stop premature shedding.
                    </p>
                  </div>
                </div>

              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#999999] pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6EE7B7] flex-shrink-0" />
                  <span>100% Herbal & AYUSH Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6EE7B7] flex-shrink-0" />
                  <span>Free Express COD Across India</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleQuickAdd}
                  className="py-3.5 px-3 rounded-full bg-gradient-to-r from-[#E6D5AC] to-[#D8C28A] hover:from-[#F0E2C2] hover:to-[#E6D5AC] text-[#08090C] font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#D8C28A]/20 flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add Kit to Bag</span>
                </button>

                <button
                  onClick={handleHairConsult}
                  className="py-3.5 px-3 rounded-full bg-[#151926] hover:bg-[#1E2536] border border-[#999999]/25 hover:border-[#6EE7B7]/40 text-[#FAF7EE] font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  <span>Hair Analysis</span>
                </button>
              </div>

              {/* View Full Product Link */}
              <div className="text-center pt-2">
                <Link
                  href="/product/hair-regrow-kit"
                  className="inline-flex items-center gap-1.5 text-[11px] tracking-wider uppercase text-[#999999] hover:text-[#D8C28A] transition-colors font-medium"
                >
                  <span>Explore Complete Hair Re-Grow Clinical Details</span>
                  <ArrowRight className="w-3 h-3 text-[#D8C28A]" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Modal Lightbox for Poster Inspection */}
      {selectedAsset && (
        <Modal
          isOpen={Boolean(selectedAsset)}
          onClose={() => setSelectedAsset(null)}
          title="Clinical Formulation Visual Showcase"
          size="lg"
        >
          <div className="relative w-full aspect-square max-h-[60vh] rounded-xl overflow-hidden bg-[#08090C]">
            <Image
              src={selectedAsset}
              alt="Ayurveda Global Formulation Asset"
              fill
              className="object-contain p-2"
              sizes="(max-width: 1024px) 90vw, 800px"
            />
          </div>
        </Modal>
      )}
    </section>
  )
}
