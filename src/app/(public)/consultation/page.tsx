import { Metadata } from "next";
import ConsultationClient from "./ConsultationClient";

export const metadata: Metadata = {
  title: "Free Ayurvedic Doctor Consultation | Ayur Veda Global",
  description:
    "Consult certified Ayurvedic Vaidyas (BAMS) for personalized health guidance, customized herbal formulations, and lifestyle recommendations. 100% confidential.",
  openGraph: {
    title: "Free Ayurvedic Doctor Consultation | Ayur Veda Global",
    description:
      "Consult certified Ayurvedic Vaidyas for personalized health guidance and herbal regimens. 100% confidential.",
  },
};

export default function ConsultationPage() {
  return <ConsultationClient />;
}
