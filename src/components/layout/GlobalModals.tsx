'use client'

import { useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'
import { ProductQuickViewModal } from '@/components/product/ProductQuickViewModal'
import { AgeVerificationGate } from '@/components/layout/AgeVerificationGate'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { MobileMenuDrawer } from '@/components/layout/MobileMenuDrawer'
import type { Product } from '@/types'

export function GlobalModals() {
  const { modals, closeModal, openCartDrawer } = useUIStore()

  const quickViewModal = modals['quick-view']
  const ageGateModal = modals['age-gate']
  const cartModal = modals['cart']
  const mobileMenuModal = modals['mobile-menu']

  useEffect(() => {
    if (cartModal?.isOpen) {
      closeModal('cart')
      openCartDrawer()
    }
  }, [cartModal?.isOpen, closeModal, openCartDrawer])

  return (
    <>
      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Global Quick View Modal */}
      {quickViewModal?.isOpen && (
        <ProductQuickViewModal
          product={(quickViewModal.data as { product: Product })?.product || null}
          isOpen={true}
          onClose={() => closeModal('quick-view')}
        />
      )}

      {/* Global Adult Age Verification Modal */}
      {ageGateModal?.isOpen && (
        <AgeVerificationGate
          productId={(ageGateModal.data as { productId: string })?.productId || ''}
          productName={(ageGateModal.data as { productName: string })?.productName || 'Adult Wellness Formulation'}
          isOpen={true}
          onClose={() => closeModal('age-gate')}
          onVerify={() => {
            const onVerifyCb = (ageGateModal.data as { onVerify?: () => void })?.onVerify
            onVerifyCb?.()
            closeModal('age-gate')
          }}
        />
      )}

      {/* Slide-out Mobile Navigation Drawer */}
      <MobileMenuDrawer
        isOpen={Boolean(mobileMenuModal?.isOpen)}
        onClose={() => closeModal('mobile-menu')}
      />
    </>
  )
}
