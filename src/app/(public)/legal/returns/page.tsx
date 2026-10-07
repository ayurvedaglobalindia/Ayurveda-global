import { Metadata } from "next";
import { generateWebsiteStructuredData } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy",
  description:
    "Ayur Veda Global Returns & Refunds Policy - How to return products, eligibility, timelines, and refund process.",
};

const lastUpdated = "December 15, 2024";

export default function ReturnsPolicyPage() {
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
              Customer Assurance
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-medium text-[#1C1D1F] mb-2">
              Returns &amp; Refunds Policy
            </h1>
            <p className="text-[#737373] text-xs sm:text-sm">
              Effective: {lastUpdated}
            </p>
          </div>

          <div className="card-luxury p-6 sm:p-8 text-[#555555] leading-relaxed space-y-6 text-xs sm:text-sm">
            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                1. Return Eligibility
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#555555] pl-2">
                <li>
                  <strong className="text-[#1C1D1F]">Timeframe:</strong> 7 days
                  from verified courier delivery date
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">Condition:</strong>{" "}
                  Unopened, unused, in original tamper-evident packaging with
                  holographic seals intact
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">
                    Eligible Formulations:
                  </strong>{" "}
                  BODY Essential Nutrition &amp; unopened Vitality Combos (with
                  tamper seals intact)
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">Non-Returnable:</strong>{" "}
                  STAYMAX+ Delay Spray (opened/used) and broken-seal personal
                  wellness items due to Ayurvedic sanitary standards
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                2. How to Initiate a Return
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-[#555555] pl-2">
                <li>
                  Reach our Concierge directly on WhatsApp at{" "}
                  <a
                    href="https://wa.me/919123485451"
                    className="text-[#4E5F52] hover:underline"
                  >
                    +91 91234 85451
                  </a>{" "}
                  with your Order ID
                </li>
                <li>
                  Provide the specific reason for return and clear photos of
                  unopened tamper seals
                </li>
                <li>
                  Our quality team verifies eligibility and issues an official
                  Return Authorization (RA)
                </li>
                <li>Pack the formulation in its protective outer box</li>
                <li>
                  Our express courier partner will arrange doorstep reverse
                  pickup
                </li>
              </ol>
            </section>

            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                3. Return Shipping &amp; Transit
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#555555] pl-2">
                <li>
                  <strong className="text-[#1C1D1F]">
                    Defective/Damaged in Transit:
                  </strong>{" "}
                  Ayur Veda Global covers 100% of reverse courier costs
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">Change of Mind:</strong>{" "}
                  Nominal standard return fee (₹49) deducted from refund balance
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">
                    Complimentary Orders:
                  </strong>{" "}
                  If returned item reduces total order value below ₹999,
                  original shipping is factored
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                4. Refund Process
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#555555] pl-2">
                <li>
                  Refunds processed within 2 business days of verified warehouse
                  receipt &amp; inspection
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">WhatsApp Orders:</strong>{" "}
                  Direct refund via instant UPI or IMPS bank transfer
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">
                    Cash on Delivery Orders:
                  </strong>{" "}
                  Direct NEFT/IMPS transfer to verified account details provided
                  to concierge
                </li>
                <li>
                  Standard bank processing takes 2-4 banking days to reflect on
                  your statement
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                5. Damaged or Incorrect Dispatches
              </h2>
              <p>
                In the rare event your order arrives with courier damage or
                dispatch discrepancy:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-[#555555] pl-2 mt-2">
                <li>
                  Notify WhatsApp concierge within 24 hours of package delivery
                </li>
                <li>
                  Share an unboxing photograph or short video showing the outer
                  label and damage
                </li>
                <li>
                  An immediate complimentary replacement will be dispatched via
                  priority express
                </li>
              </ol>
            </section>

            <section>
              <h2 className="font-heading text-lg font-medium text-[#1C1D1F] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E5F52]" />
                6. Direct Returns Concierge
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-[#555555] pl-2">
                <li>
                  <strong className="text-[#1C1D1F]">
                    WhatsApp Concierge:
                  </strong>{" "}
                  <a
                    href="https://wa.me/919123485451"
                    className="text-[#4E5F52] hover:underline"
                  >
                    +91 91234 85451
                  </a>
                </li>
                <li>
                  <strong className="text-[#1C1D1F]">Email Desk:</strong>{" "}
                  <a
                    href="mailto:returns@ayurvedaglobal.com"
                    className="text-[#4E5F52] hover:underline"
                  >
                    returns@ayurvedaglobal.com
                  </a>
                </li>
                <li>Hours: Monday – Saturday, 9:00 AM – 7:00 PM IST</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
