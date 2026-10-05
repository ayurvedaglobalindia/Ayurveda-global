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
    <section className="bg-[#090A0D] py-14 sm:py-20 lg:py-24 border-b border-[#999999]/20 text-[#FAF7EE] relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-[11px] font-mono tracking-[0.24em] text-[#999999] uppercase mb-2">
            Targeted Follicular Revitalization
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF7EE] tracking-tight">
            HAIR RE-GROW Therapy Protocol
          </h2>

          <p className="text-sm sm:text-[15px] text-[#999999] mt-3.5 max-w-xl mx-auto leading-relaxed font-sans font-normal">
            Sanskrit classical science meets clinical follicle restoration. Synergistic protocol formulated with pure Bhringraj, Amalaki, Mulethi, and therapeutic Rosemary Taila.
          </p>
        </div>

        {/* Dual Visual Feature Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Artwork Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            
            {/* Poster 1: Master Clinical Infographic */}
            <div className="rounded-2xl bg-[#0D0F15] border border-[#999999]/15 overflow-hidden flex flex-col justify-between hover:border-[#999999]/35 transition-all duration-300">
              <div className="relative aspect-[4/5] w-full bg-[#08090C] overflow-hidden">
                <Image
                  src="/images/banners/hair-regrow-clinical-poster.jpg"
                  alt="Ayurveda Global HAIR RE-GROW Clinical Infographic - Stronger Roots & Healthier You"
                  fill
                  className="object-contain p-3 group-hover:scale-103 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 340px"
                />
                
                {/* View Larger Badge */}
                <button
                  onClick={() => setSelectedAsset('/images/banners/hair-regrow-clinical-poster.jpg')}
                  className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#090A0D]/90 border border-[#999999]/30 text-[#FAF7EE] text-[10px] font-mono tracking-wider flex items-center gap-1.5 hover:border-[#D8C28A] transition-all"
                  aria-label="Inspect clinical infographic"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D8C28A]" />
                  <span>Inspect Chart</span>
                </button>
              </div>

              <div className="p-4 bg-[#0A0C11] border-t border-[#999999]/15">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#999999] block mb-1">
                  Actives Monograph
                </span>
                <h4 className="font-heading text-sm font-normal text-[#FAF7EE]">
                  Master Follicle Revitalization Chart
                </h4>
                <p className="text-xs text-[#999999] mt-1 leading-relaxed">
                  Synergistic bio-potency of Amalaki, Japapushpa, Yashtimadhu, and cold-pressed Bhringraj.
                </p>
              </div>
            </div>

            {/* Poster 2: 3D Artwork */}
            <div className="rounded-2xl bg-[#0D0F15] border border-[#999999]/15 overflow-hidden flex flex-col justify-between hover:border-[#999999]/35 transition-all duration-300">
              <div className="relative aspect-[4/5] w-full bg-[#08090C] overflow-hidden">
                <Image
                  src="/images/banners/hair-regrow-3d-creative.jpg"
                  alt="Ayurveda Global Hair Treatment Mascot - Say Goodbye to Hair Loss"
                  fill
                  className="object-contain p-3 group-hover:scale-103 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 340px"
                />

                <button
                  onClick={() => setSelectedAsset('/images/banners/hair-regrow-3d-creative.jpg')}
                  className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#090A0D]/90 border border-[#999999]/30 text-[#FAF7EE] text-[10px] font-mono tracking-wider flex items-center gap-1.5 hover:border-[#D8C28A] transition-all"
                  aria-label="Inspect creative"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D8C28A]" />
                  <span>Inspect Creative</span>
                </button>
              </div>

              <div className="p-4 bg-[#0A0C11] border-t border-[#999999]/15">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#999999] block mb-1">
                  Quality Hallmark
                </span>
                <h4 className="font-heading text-sm font-normal text-[#FAF7EE]">
                  Classical Scalp Restoration
                </h4>
                <p className="text-xs text-[#999999] mt-1 leading-relaxed">
                  Reverses follicle miniaturization through calibrated biological nourishment.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Inside-Out Regrowth Therapy Protocol */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0D0F15] border border-[#999999]/15 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#999999]/15">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#999999]">
                    Dual Therapy Protocol
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-normal text-[#FAF7EE] tracking-tight mt-0.5">
                    HAIR RE-GROW Complete Kit
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-serif text-xl sm:text-2xl font-normal text-[#FAF7EE]">
                    {hairKit ? formatPrice(hairKit.price) : '₹1,899'}
                  </span>
                  <span className="block text-xs text-[#999999] line-through mt-0.5">
                    {hairKit?.compareAtPrice ? formatPrice(hairKit.compareAtPrice) : '₹2,499'}
                  </span>
                </div>
              </div>

              {/* Inside-Out Methodology */}
              <div className="space-y-3 text-xs">
                
                <div className="p-3.5 rounded-xl bg-[#090A0D] border border-[#999999]/15 flex items-start gap-3.5">
                  <span className="font-mono text-xs text-[#D8C28A] font-medium pt-0.5">01</span>
                  <div>
                    <h5 className="font-heading text-xs sm:text-[13px] font-medium text-[#FAF7EE]">
                      External: 100ml Scalp Taila Massage
                    </h5>
                    <p className="text-xs text-[#999999] mt-1 leading-relaxed font-normal">
                      Clears scalp heat (Pitta), dissolves sebum blockages, and opens micro-channels directly to dermal papilla.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090A0D] border border-[#999999]/15 flex items-start gap-3.5">
                  <span className="font-mono text-xs text-[#D8C28A] font-medium pt-0.5">02</span>
                  <div>
                    <h5 className="font-heading text-xs sm:text-[13px] font-medium text-[#FAF7EE]">
                      Internal: 60 Botanical Vegetarian Capsules
                    </h5>
                    <p className="text-xs text-[#999999] mt-1 leading-relaxed font-normal">
                      Delivers concentrated antioxidant withanolides and bio-flavonoids systemically to strengthen the hair bulb.
                    </p>
                  </div>
                </div>

              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-between text-xs text-[#999999] pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6EE7B7] flex-shrink-0" />
                  <span>100% Classical &amp; AYUSH Licensed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6EE7B7] flex-shrink-0" />
                  <span>Pan-India Cash on Delivery</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleQuickAdd}
                  className="py-3.5 px-3 rounded-full bg-[#D8C28A] hover:bg-[#E6D5AC] text-[#090A0D] font-semibold text-xs uppercase tracking-[0.12em] transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add Kit to Bag</span>
                </button>

                <button
                  onClick={handleHairConsult}
                  className="py-3.5 px-3 rounded-full bg-transparent hover:bg-[#141720] border border-[#999999]/30 hover:border-[#6EE7B7]/50 text-[#FAF7EE] font-medium text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  <span>Hair Analysis</span>
                </button>
              </div>

              {/* View Full Product Link */}
              <div className="text-center pt-2">
                <Link
                  href="/product/hair-regrow-kit"
                  className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-[#999999] hover:text-[#D8C28A] transition-colors font-medium"
                >
                  <span>Explore Formulation Monograph</span>
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
