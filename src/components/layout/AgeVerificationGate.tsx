"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Leaf, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useUIStore } from "@/store/uiStore";

interface AgeVerificationGateProps {
  productId: string;
  productName: string;
  isOpen: boolean;
  onClose?: () => void;
  onVerify?: () => void;
}

export function AgeVerificationGate({
  productId,
  productName,
  isOpen,
  onClose,
  onVerify,
}: AgeVerificationGateProps) {
  const router = useRouter();
  const { isAgeVerified, verifyAge } = useUIStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen && !isAgeVerified(productId));
  }, [isOpen, productId, isAgeVerified]);

  const handleVerify = () => {
    verifyAge(productId);
    setShowModal(false);
    onVerify?.();
  };

  const handleDeny = () => {
    setShowModal(false);
    if (onClose) {
      onClose();
    } else {
      router.push("/shop");
    }
  };

  if (!showModal) return null;

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
      <div className="text-center space-y-4 pt-1">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-[#FAF7F2] border border-[#9E8047]/25 flex items-center justify-center text-[#4E5F52] shadow-xs">
          <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-[#4E5F52]" />
        </div>

        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wider bg-rose-50 text-rose-700 border border-rose-200 mb-2">
            18+ Age Restricted
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-normal text-[#1C1D1F]">
            {productName}
          </h3>
          <p className="mt-1 text-xs text-[#737373] max-w-sm mx-auto leading-relaxed">
            This formulation contains active Ayurvedic botanicals intended
            strictly for mature adults 18 years and older.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#9E8047]/25 rounded-xl p-4 text-left shadow-xs">
          <p className="text-xs font-semibold text-[#1C1D1F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-[#4E5F52]" />
            Ayurvedic Compliance &amp; Protocol
          </p>
          <ul className="space-y-1.5 text-xs text-[#555555]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4E5F52] flex-shrink-0" />
              <span>100% Ayurvedic herbal &amp; topical ingredients</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4E5F52] flex-shrink-0" />
              <span>Strictly intended for individuals 18 years and older</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4E5F52] flex-shrink-0" />
              <span>Discreet, tamper-evident unmarked packaging guaranteed</span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="outline"
            onClick={handleDeny}
            className="w-full text-xs font-medium rounded-full py-2.5"
            size="md"
          >
            I am under 18
          </Button>
          <Button
            variant="primary"
            onClick={handleVerify}
            className="w-full text-xs font-semibold rounded-full py-2.5 shadow-xs"
            size="md"
          >
            I am 18 or older
          </Button>
        </div>
      </div>
    </Modal>
  );
}
