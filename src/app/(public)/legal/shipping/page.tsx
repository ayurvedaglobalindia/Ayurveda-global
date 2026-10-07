import { Metadata } from "next";
import { generateWebsiteStructuredData } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Ayur Veda Global Shipping Policy - Delivery times, charges, tracking, and international shipping information.",
};

const lastUpdated = "December 15, 2024";

export default function ShippingPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebsiteStructuredData()),
        }}
      />

      <div className="container py-6 sm:py-8 lg:py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <span className="text-[#9E8047] text-[10px] sm:text-xs uppercase tracking-widest font-semibold block mb-1.5">
              Logistics &amp; Dispatches
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-medium text-[#1C1D1F] mb-2">
              Shipping Policy
            </h1>
            <p className="text-[#737373] text-xs sm:text-sm">
              Effective: {lastUpdated}
            </p>
          </div>

          <div className="card-luxury p-6 sm:p-8 text-[#555555] leading-relaxed space-y-6 text-xs sm:text-sm">
            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                1. Shipping Rates &amp; Thresholds
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#555555] pl-2">
                <li>
                  <strong className="text-[#1C1D1F]">
                    Complimentary Express Shipping:
                  </strong>{" "}
                  Available on all orders above ₹999 across all serviceable PIN
                  codes in India.
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">
                    Standard Delivery Fee:
                  </strong>{" "}
                  Flat ₹49 on orders below ₹999.
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">
                    Zero Hidden Charges:
                  </strong>{" "}
                  All prices shown at checkout include GST and handling fees.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                2. Delivery Timelines
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#555555] pl-2">
                <li>
                  <strong className="text-[#1C1D1F]">
                    Metro Hubs (Mumbai, Delhi NCR, Bengaluru, Hyderabad,
                    Chennai, Kolkata):
                  </strong>{" "}
                  2–4 business days
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">
                    Tier-II &amp; Tier-III Cities:
                  </strong>{" "}
                  3–5 business days
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">
                    Rest of India &amp; Remote Outposts:
                  </strong>{" "}
                  5–7 business days
                </li>
              </ul>
              <p className="mt-3 text-xs text-[#737373]">
                Orders confirmed before 2:00 PM IST Monday through Saturday are
                dispatched the same calendar day.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                3. Discreet Packaging Protocol
              </h2>
              <p>
                We respect customer confidentiality. All formulations, including
                STAYMAX+ and Vitality Combos, are shipped in plain,
                tamper-evident corrugated boxes with zero external product
                markings or descriptions, bearing only discreet logistics
                labels.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                4. Courier Partners
              </h2>
              <p>
                We ship through premium air express networks including BlueDart,
                DTDC Apex, Delhivery Express, and Speed Post for remote regions.
                Airway Bill (AWB) numbers are assigned immediately upon
                packaging.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                5. Live Order Tracking
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#555555] pl-2">
                <li>
                  Tracking links are dispatched via automated WhatsApp and SMS
                  upon courier scan
                </li>
                <li>
                  Track anytime via our live portal at{" "}
                  <a
                    href="/track-order"
                    className="text-[#4E5F52] hover:underline"
                  >
                    ayurvedaglobal.com/track-order
                  </a>
                </li>
                <li>
                  Direct assistance available from our logistics desk via
                  WhatsApp
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                6. Shipping Assistance
              </h2>
              <p>
                For inquiries regarding dispatch status, PIN code
                serviceability, or delivery scheduling:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-[#555555] pl-2 mt-2">
                <li>
                  <strong className="text-[#1C1D1F]">
                    WhatsApp Dispatch Desk:
                  </strong>{" "}
                  <a
                    href="https://wa.me/919123485451"
                    className="text-[#4E5F52] hover:underline"
                  >
                    +91 91234 85451
                  </a>
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">Email:</strong>{" "}
                  <a
                    href="mailto:shipping@ayurvedaglobal.com"
                    className="text-[#4E5F52] hover:underline"
                  >
                    shipping@ayurvedaglobal.com
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
