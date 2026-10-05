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
    <section className="bg-[#08090C] py-8 sm:py-12 lg:py-16 border-b border-[#999999]/20 text-[#FAF7EE] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#D8C28A]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[350px] h-[350px] bg-[#6EE7B7]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11141E] border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-semibold tracking-[0.24em] uppercase mb-2.5 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3 h-3 text-[#6EE7B7]" />
            <span>№ 05 • Ayurvedic Clinical Innovation</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#FAF7EE] tracking-tight">
            प्रकृति की शक्ति • <span className="italic font-serif text-[#D8C28A]">Stronger Roots. Healthier You.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#999999] mt-2.5 max-w-lg mx-auto leading-relaxed font-sans">
            Classical herbal science meets modern cellular vitality. Targeted follicular revitalization with pure Bhringraj, Amla, Mulethi, and Hibiscus.
          </p>
        </div>

        {/* Dual Visual Feature Grid */}
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Visual Artwork Cards (2 Creative Posters side-by-side or stacked) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            
            {/* Poster 1: Master Clinical Infographic */}
            <div className="rounded-2xl bg-[#11141E] border border-[#999999]/20 overflow-hidden group shadow-xl flex flex-col justify-between hover:border-[#6EE7B7]/40 transition-all duration-300">
              <div className="relative aspect-[4/5] w-full bg-[#08090C] overflow-hidden">
                <Image
                  src="/images/banners/hair-regrow-clinical-poster.jpg"
                  alt="Ayurveda Global HAIR RE-GROW Clinical Infographic - Stronger Roots & Healthier You"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 340px"
                />
                
                {/* View Larger Badge */}
                <button
                  onClick={() => setSelectedAsset('/images/banners/hair-regrow-clinical-poster.jpg')}
                  className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#08090C]/85 backdrop-blur-md border border-[#999999]/30 text-[#FAF7EE] text-[10px] font-medium flex items-center gap-1 opacity-90 group-hover:opacity-100 hover:bg-[#151926] transition-all"
                  aria-label="Zoom clinical infographic"
                >
                  <Eye className="w-3 h-3 text-[#D8C28A]" />
                  <span>Inspect Poster</span>
                </button>
              </div>

              <div className="p-3.5 bg-[#0D1017] border-t border-[#999999]/20">
                <div className="flex items-center gap-1.5 text-[#6EE7B7] text-[10px] font-semibold uppercase tracking-wider mb-0.5">
                  <FlaskConical className="w-3 h-3 text-[#6EE7B7]" />
                  <span>Botanical Formulation Actives</span>
                </div>
                <h4 className="font-heading text-xs sm:text-[13px] font-medium text-[#FAF7EE]">
                  Master Hair Revitalization Chart
                </h4>
                <p className="text-[10.5px] text-[#999999] mt-0.5 line-clamp-2">
                  Clinical synergy of Amalaki, Japapushpa, Yashtimadhu, and pure Bhringraj extracts.
                </p>
              </div>
            </div>

            {/* Poster 2: 3D Mascot Artwork */}
            <div className="rounded-2xl bg-[#11141E] border border-[#999999]/20 overflow-hidden group shadow-xl flex flex-col justify-between hover:border-[#6EE7B7]/40 transition-all duration-300">
              <div className="relative aspect-[4/5] w-full bg-[#08090C] overflow-hidden">
                <Image
                  src="/images/banners/hair-regrow-3d-creative.jpg"
                  alt="Ayurveda Global Hair Treatment Mascot - Say Goodbye to Hair Loss"
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 340px"
                />

                <button
                  onClick={() => setSelectedAsset('/images/banners/hair-regrow-3d-creative.jpg')}
                  className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#08090C]/85 backdrop-blur-md border border-[#999999]/30 text-[#FAF7EE] text-[10px] font-medium flex items-center gap-1 opacity-90 group-hover:opacity-100 hover:bg-[#151926] transition-all"
                  aria-label="Zoom mascot creative"
                >
                  <Eye className="w-3 h-3 text-[#D8C28A]" />
                  <span>Inspect Creative</span>
                </button>
              </div>

              <div className="p-3.5 bg-[#0D1017] border-t border-[#999999]/20">
                <div className="flex items-center gap-1.5 text-[#6EE7B7] text-[10px] font-semibold uppercase tracking-wider mb-0.5">
                  <Award className="w-3 h-3 text-[#6EE7B7]" />
                  <span>Official Quality Hallmark</span>
                </div>
                <h4 className="font-heading text-xs sm:text-[13px] font-medium text-[#FAF7EE]">
                  Certified Pure Ayurvedic Care
                </h4>
                <p className="text-[10.5px] text-[#999999] mt-0.5 line-clamp-2">
                  Say farewell to follicle miniaturization with authentic doctor-approved Rasayana chemistry.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Inside-Out Regrowth Therapy Protocol & Quick Action */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#11141E] border border-[#999999]/20 shadow-xl space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#999999]/20">
                <div>
                  <span className="text-[9.5px] uppercase font-bold tracking-widest text-[#6EE7B7]">
                    Complete 2-in-1 Protocol
                  </span>
                  <h3 className="font-heading text-base sm:text-lg font-medium text-[#FAF7EE] tracking-tight">
                    HAIR RE-GROW Dual Therapy Kit
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-heading text-base sm:text-lg font-bold text-[#FAF7EE]">
                    {hairKit ? formatPrice(hairKit.price) : '₹1,899'}
                  </span>
                  <span className="block text-[10px] text-[#999999] line-through">
                    {hairKit?.compareAtPrice ? formatPrice(hairKit.compareAtPrice) : '₹2,499'}
                  </span>
                </div>
              </div>

              {/* Inside-Out Methodology */}
              <div className="space-y-2.5 text-xs">
                
                <div className="p-3 rounded-xl bg-[#08090C] border border-[#999999]/20 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#151926] border border-[#999999]/25 text-[#6EE7B7] flex items-center justify-center flex-shrink-0 text-[11px] font-bold">
                    01
                  </div>
                  <div>
                    <h5 className="font-heading text-xs font-semibold text-[#FAF7EE]">
                      External: 100ml Scalp Taila Massage
                    </h5>
                    <p className="text-[11px] text-[#999999] mt-0.5">
                      Clears dandruff, calms scalp heat (Pitta), and opens micro-channels directly to dermal follicles.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#08090C] border border-[#999999]/20 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#151926] border border-[#999999]/25 text-[#6EE7B7] flex items-center justify-center flex-shrink-0 text-[11px] font-bold">
                    02
                  </div>
                  <div>
                    <h5 className="font-heading text-xs font-semibold text-[#FAF7EE]">
                      Internal: 60 Botanical Vegetarian Capsules
                    </h5>
                    <p className="text-[11px] text-[#999999] mt-0.5">
                      Supplies essential micronutrients and antioxidants via the bloodstream to stop premature shedding.
                    </p>
                  </div>
                </div>

              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-[10.5px] text-[#999999] pt-1">
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
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={handleQuickAdd}
                  className="py-2.5 px-3 rounded-xl bg-[#D8C28A] hover:bg-[#E6D5AC] text-[#08090C] font-bold text-xs tracking-wide transition-all duration-200 hover:scale-[1.02] shadow-md shadow-[#D8C28A]/20 flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add Kit to Bag</span>
                </button>

                <button
                  onClick={handleHairConsult}
                  className="py-2.5 px-3 rounded-xl bg-[#151926] hover:bg-[#1E2536] border border-[#999999]/25 hover:border-[#6EE7B7]/40 text-[#FAF7EE] font-medium text-xs tracking-wide transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  <span>Hair Analysis</span>
                </button>
              </div>

              {/* View Full Product Link */}
              <div className="text-center pt-1">
                <Link
                  href="/product/hair-regrow-kit"
                  className="inline-flex items-center gap-1 text-[11px] text-[#999999] hover:text-[#D8C28A] transition-colors font-medium"
                >
                  <span>Explore Complete Hair Re-Grow Clinical Details</span>
                  <ArrowRight className="w-3 h-3" />
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
