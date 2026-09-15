'use client'

import { useEffect } from 'react'
import { Shield, Leaf } from 'lucide-react'
import { motion } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useUIStore } from '@/store/uiStore'

interface AgeVerificationGateProps {
  productId: string
  productName: string
  isOpen: boolean
  onClose: () => void
  onVerify: () => void
}

export function AgeVerificationGate({ productId, productName, isOpen, onClose, onVerify }: AgeVerificationGateProps) {
  const { isAgeVerified, verifyAge } = useUIStore()
  const [showModal, setShowModal] = useState(isOpen && !isAgeVerified(productId))

  useEffect(() => {
    setShowModal(isOpen && !isAgeVerified(productId))
  }, [isOpen, productId])

  const handleVerify = () => {
    verifyAge(productId)
    setShowModal(false)
    onVerify()
  }

  const handleDeny = () => {
    onClose()
    setShowModal(false)
  }

  return (
    <Modal
      isOpen={showModal}
      onClose={handleDeny}
      title="Age Verification Required"
      description={`You must be 18 years or older to view ${productName}`}
      size="md"
      showCloseButton={false}
    >
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-ayur-forest/10 flex items-center justify-center">
          <Shield className="w-10 h-10 text-ayur-forest" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-ayur-black">Age Restricted Product</h3>
          <p className="mt-2 text-ayur-stone">
            <strong>{productName}</strong> is an age-restricted product intended for adults only.
          </p>
        </div>
        <div className="bg-ayur-cream rounded-xl p-4 text-left">
          <p className="text-sm text-ayur-forest font-medium mb-2">Important Information:</p>
          <ul className="space-y-1 text-sm text-ayur-stone">
            <li className="flex items-center gap-2"><Leaf className="w-4 h-4 flex-shrink-0" /> For external use only</li>
            <li className="flex items-center gap-2"><Leaf className="w-4 h-4 flex-shrink-0" /> Not for individuals under 18 years</li>
            <li className="flex items-center gap-2"><Leaf className="w-4 h-4 flex-shrink-0" /> Consult a healthcare professional if needed</li>
            <li className="flex items-center gap-2"><Leaf className="w-4 h-4 flex-shrink-0" /> Discontinue if irritation occurs</li>
          </ul>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleDeny}
            className="flex-1"
            size="lg"
          >
            I am under 18
          </Button>
          <Button
            variant="primary"
            onClick={handleVerify}
            className="flex-1"
            size="lg"
          >
            I am 18 or older
          </Button>
        </div>
        <p className="text-xs text-ayur-sand">
          By continuing, you confirm you are 18 years or older and agree to use this product responsibly.
        </p>
      </div>
    </Modal>
  )
}

import { useState } from 'react'