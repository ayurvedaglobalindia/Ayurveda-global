'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Leaf, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useUIStore } from '@/store/uiStore'

interface AgeVerificationGateProps {
  productId: string
  productName: string
  isOpen: boolean
  onClose?: () => void
  onVerify?: () => void
}

export function AgeVerificationGate({ productId, productName, isOpen, onClose, onVerify }: AgeVerificationGateProps) {
  const router = useRouter()
  const { isAgeVerified, verifyAge } = useUIStore()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Only show if open and not already verified in storage
    setShowModal(isOpen && !isAgeVerified(productId))
  }, [isOpen, productId, isAgeVerified])

  const handleVerify = () => {
    verifyAge(productId)
    setShowModal(false)
    onVerify?.()
  }

  const handleDeny = () => {
    setShowModal(false)
    if (onClose) {
      onClose()
    } else {
      router.push('/shop')
    }
  }

  if (!showModal) return null

  return (
    <Modal
      isOpen={showModal}
      onClose={handleDeny}
      title="Age Verification (18+)"
      description="Adult wellness product policy confirmation"
      size="md"
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <div className="text-center space-y-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-ayur-gold/15 border border-ayur-gold/30 flex items-center justify-center text-ayur-gold">
          <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-ayur-gold" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200 mb-2">
            18+ Age Restricted
          </span>
          <h3 className="text-xl sm:text-2xl font-medium text-ayur-black font-heading">
            {productName}
          </h3>
          <p className="mt-2 text-sm text-ayur-stone max-w-sm mx-auto">
            This formulation contains active botanical extracts intended strictly for adults 18 years and older.
          </p>
        </div>

        <div className="bg-ayur-cream rounded-2xl p-4 text-left border border-ayur-sand/50">
          <p className="text-xs font-bold text-ayur-forest uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            Compliance & Usage Notice
          </p>
          <ul className="space-y-1.5 text-xs text-ayur-stone">
            <li className="flex items-center gap-2">✓ 100% Ayurvedic herbal & topical ingredients</li>
            <li className="flex items-center gap-2">✓ Strictly not for individuals under 18 years</li>
            <li className="flex items-center gap-2">✓ Discreet plain brown box packaging guaranteed</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <Button
            variant="outline"
            onClick={handleDeny}
            className="w-full text-xs sm:text-sm font-semibold border-ayur-stone/40 hover:bg-ayur-beige"
            size="lg"
          >
            I am under 18
          </Button>
          <Button
            variant="gold"
            onClick={handleVerify}
            className="w-full text-xs sm:text-sm font-bold shadow-lg"
            size="lg"
          >
            I am 18 or older
          </Button>
        </div>

        <p className="text-[11px] text-ayur-stone/80">
          By clicking &apos;I am 18 or older&apos;, you confirm you meet the statutory age requirement.
        </p>
      </div>
    </Modal>
  )
}