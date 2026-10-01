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
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-ayur-forest-deep/80 border-2 border-ayur-gold/50 flex items-center justify-center text-ayur-gold-light shadow-lg shadow-ayur-gold/10">
          <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-ayur-gold-light" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-ayur-crimson/20 text-ayur-crimson-light border border-ayur-crimson/40 mb-2">
            18+ Age Restricted
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-normal text-ayur-ivory">
            {productName}
          </h3>
          <p className="mt-2 text-sm text-ayur-stone max-w-sm mx-auto leading-relaxed">
            This formulation contains active Ayurvedic botanicals intended strictly for mature adults 18 years and older.
          </p>
        </div>

        <div className="card-luxury rounded-2xl p-4 text-left">
          <p className="text-xs font-bold text-ayur-gold-light uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-ayur-sage-light" />
            Vedic Compliance & Usage Protocol
          </p>
          <ul className="space-y-1.5 text-xs text-ayur-stone">
            <li className="flex items-center gap-2"><span className="text-ayur-gold">✓</span> 100% Ayurvedic herbal & topical ingredients</li>
            <li className="flex items-center gap-2"><span className="text-ayur-gold">✓</span> Strictly prohibited for individuals under 18 years</li>
            <li className="flex items-center gap-2"><span className="text-ayur-gold">✓</span> Discreet, tamper-evident outer packaging guaranteed</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <Button
            variant="emerald-outline"
            onClick={handleDeny}
            className="w-full text-xs sm:text-sm font-medium border-ayur-gold/40 text-ayur-ivory hover:bg-ayur-gold/10"
            size="lg"
          >
            I am under 18
          </Button>
          <Button
            variant="gold"
            onClick={handleVerify}
            className="w-full text-xs sm:text-sm font-semibold shadow-xl shadow-ayur-gold/20 gold-shimmer"
            size="lg"
          >
            I am 18 or older
          </Button>
        </div>

        <p className="text-[11px] text-ayur-stone/70">
          By confirming age, you verify statutory compliance under applicable wellness regulations.
        </p>
      </div>
    </Modal>
  )
}