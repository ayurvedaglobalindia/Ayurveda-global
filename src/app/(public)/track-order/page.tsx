import type { Metadata } from "next";
import TrackOrderClient from "./TrackOrderClient";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Track Your Order Status",
  description:
    "Live dispatch and courier tracking for your Ayur Veda Global shipments. Track BlueDart, Delhivery, and DTDC parcels in real-time.",
  alternates: {
    canonical: `${SITE_URL}/track-order`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}
