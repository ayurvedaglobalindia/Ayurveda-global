"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  X,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Heart,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { formatINR } from "@/lib/utils/formatters";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { getProductBySlug } from "@/lib/products/registry";

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    dosha: "vata" | "pitta" | "kapha";
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How would you describe your natural physical build?",
    subtitle: "Share your baseline skeletal structure and metabolism",
    options: [
      {
        label: "Slender & Light-Boned",
        description: "Hard to gain weight, quick movements, lean limbs",
        dosha: "vata",
      },
      {
        label: "Medium & Athletic",
        description: "Good muscle definition, balanced frame, warm skin",
        dosha: "pitta",
      },
      {
        label: "Broad & Solid",
        description: "Naturally sturdy, thick hair, gains weight easily",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 2,
    question: "What are your daily stamina & energy patterns?",
    subtitle: "Notice how your endurance fluctuates throughout the day",
    options: [
      {
        label: "Variable Bursts & Sudden Fatigue",
        description: "Spikes of energy followed by sudden depletion or restlessness",
        dosha: "vata",
      },
      {
        label: "Intense, High-Drive & Focused",
        description: "Ambitious and sharp, but can burn out or become irritable",
        dosha: "pitta",
      },
      {
        label: "Slow to Start, but Long-Lasting",
        description: "High endurance once going, can feel sluggish in mornings",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 3,
    question: "How does your digestive fire (Agni) behave?",
    subtitle: "Digestive rhythm is the cornerstone of Ayurvedic diagnosis",
    options: [
      {
        label: "Irregular & Prone to Bloating",
        description: "Unpredictable appetite, dry stools, sensitive stomach",
        dosha: "vata",
      },
      {
        label: "Fierce & Demanding",
        description: "Strong hunger, cannot skip meals, prone to acidity",
        dosha: "pitta",
      },
      {
        label: "Slow & Methodical",
        description: "Heavy feeling after eating, comfortable skipping meals",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 4,
    question: "How is your sleep and stress response?",
    subtitle: "Observing neurological restoration and mental calm",
    options: [
      {
        label: "Light, Interrupted & Racing Mind",
        description: "Overthinks at night, wakes easily, anxious under stress",
        dosha: "vata",
      },
      {
        label: "Moderate (6-7h), Intense Dreams",
        description: "Wakes alert, gets impatient or heated when under pressure",
        dosha: "pitta",
      },
      {
        label: "Deep, Heavy & Sound (8h+)",
        description: "Sleeps effortlessly, resists change, calm in crises",
        dosha: "kapha",
      },
    ],
  },
  {
    id: 5,
    question: "What is your primary wellness / performance priority?",
    subtitle: "Choose your primary transformation target for tailored herbal pairing",
    options: [
      {
        label: "Daily Stamina, Muscle Strength & Stamina",
        description: "Overcome exhaustion, strengthen tissues, restore vitality",
        dosha: "vata",
      },
      {
        label: "Men's Endurance, Intimate Control & Pacing",
        description: "Extend intimate duration, calm hypersensitivity, gain confidence",
        dosha: "pitta",
      },
      {
        label: "Hair Regrowth, Scalp Roots & Thickening",
        description: "Reverse shedding, stop thinning, restore follicle density",
        dosha: "kapha",
      },
    ],
  },
];

interface DoshaResult {
  primaryDosha: "Vata" | "Pitta" | "Kapha";
  prakriti: string;
  summary: string;
  botanicalPairing: string;
  recommendedProductSlug: string;
  recommendedProductName: string;
  productPrice: number;
  dietAdvice: string;
}

export function DoshaQuizModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { addItem } = useCartStore();
  const { openCartDrawer, showToast } = useUIStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, "vata" | "pitta" | "kapha">>({});
  const [result, setResult] = useState<DoshaResult | null>(null);

  const handleAddToCart = () => {
    if (!result) return;
    const prod = getProductBySlug(result.recommendedProductSlug);
    if (prod) {
      addItem(prod);
      showToast({
        type: "success",
        title: "Added to Bag",
        message: `${result.recommendedProductName} added to cart.`,
      });
      onClose();
      openCartDrawer();
    }
  };

  if (!isOpen) return null;

  const totalSteps = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (dosha: "vata" | "pitta" | "kapha") => {
    const updated = { ...answers, [currentStep]: dosha };
    setAnswers(updated);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(updated);
    }
  };

  const calculateResult = (finalAnswers: Record<number, "vata" | "pitta" | "kapha">) => {
    let vataCount = 0;
    let pittaCount = 0;
    let kaphaCount = 0;

    Object.values(finalAnswers).forEach((d) => {
      if (d === "vata") vataCount++;
      if (d === "pitta") pittaCount++;
      if (d === "kapha") kaphaCount++;
    });

    let primaryDosha: "Vata" | "Pitta" | "Kapha" = "Vata";
    if (pittaCount >= vataCount && pittaCount >= kaphaCount) {
      primaryDosha = "Pitta";
    } else if (kaphaCount >= vataCount && kaphaCount >= pittaCount) {
      primaryDosha = "Kapha";
    }

    // Last answer priority overrides for specific health intent
    const priorityAnswer = finalAnswers[4];

    if (priorityAnswer === "pitta") {
      setResult({
        primaryDosha: "Pitta",
        prakriti: "Pitta-Vata Dynamic",
        summary:
          "Your profile displays high metabolic intensity and mental drive with a tendency toward nervous excitability and sensitivity. You benefit from grounding Rasayana herbs that cool internal heat while maintaining vigor.",
        botanicalPairing: "Ashwagandha, Shuddha Shilajit & Calibrated Cooling Botanicals",
        recommendedProductSlug: "staymax-delay-spray",
        recommendedProductName: "STAYMAX+ Delay Spray (30 ml)",
        productPrice: 89900,
        dietAdvice: "Favor cooling foods, coconut water, ghee, and avoid excessively spicy or sour foods.",
      });
    } else if (priorityAnswer === "kapha") {
      setResult({
        primaryDosha: "Kapha",
        prakriti: "Kapha-Pitta Balance",
        summary:
          "Your constitution demonstrates solid stamina and steady endurance, but requires active follicular stimulation and blood cooling to maintain scalp nutrition.",
        botanicalPairing: "Kshir Pak Infused Bhringraj, Brahmi, Amalaki & Jatamansi",
        recommendedProductSlug: "hair-regrow-kit",
        recommendedProductName: "HAIR RE-GROW Complete Care Kit",
        productPrice: 149900,
        dietAdvice: "Incorporate leafy greens, triphala powder at night, and avoid excess refined sugars.",
      });
    } else {
      setResult({
        primaryDosha: primaryDosha,
        prakriti: `${primaryDosha}-Dominant Rasayana Target`,
        summary:
          "Your biological rhythm requires deep cellular nourishment to combat sudden energy dips, support tissue rebuild, and preserve sustained daily strength.",
        botanicalPairing: "Standardized Nagori Ashwagandha, Himalayan Gold Shilajit, Safed Musli & Gokshura",
        recommendedProductSlug: "body-essential-nutrition",
        recommendedProductName: "BODY Essential Nutrition (60 Capsules)",
        productPrice: 89900,
        dietAdvice: "Warm cooked meals, dates with lukewarm milk, almonds, and regular sleep rhythms.",
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#9E8047]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#071A12] text-[#FDFBF7] flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block">
                Ayurvedic Prakriti Diagnostic
              </span>
              <h3 className="font-serif text-base sm:text-lg font-medium text-white">
                Personalized Dosha &amp; Regimen Assessment
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {!result ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#737373] mb-2">
                  <span>Question {currentStep + 1} of {totalSteps}</span>
                  <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-[#EAE4DC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#9E8047] transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1D1F] mb-1">
                  {currentQuestion.question}
                </h4>
                <p className="text-xs text-[#737373] font-sans">
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.dosha)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white border border-[#9E8047]/20 hover:border-[#9E8047] hover:bg-[#FDFBF7] hover:shadow-sm transition-all group flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div>
                      <span className="font-medium text-sm sm:text-base text-[#1C1D1F] block group-hover:text-[#9E8047] transition-colors">
                        {opt.label}
                      </span>
                      <span className="text-xs text-[#666666] mt-0.5 block font-sans">
                        {opt.description}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#737373] group-hover:text-[#9E8047] group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Presentation */
            <div className="animate-in fade-in duration-300">
              <div className="text-center mb-6 pb-6 border-b border-[#9E8047]/25">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E8047]/10 text-[#9E8047] text-xs font-mono font-medium mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Diagnostic Complete
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1D1F]">
                  Your Constitutional Dosha: <span className="text-[#9E8047]">{result.prakriti}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#555555] max-w-lg mx-auto mt-2 leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {/* Recommended Formulation Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#9E8047]/30 shadow-xs mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#9E8047] font-semibold block mb-1">
                      Calibrated Botanical Solution
                    </span>
                    <h5 className="font-serif text-lg font-medium text-[#1C1D1F]">
                      {result.recommendedProductName}
                    </h5>
                    <p className="text-xs text-[#737373] mt-1 font-sans">
                      Active herbs: {result.botanicalPairing}
                    </p>
                    <span className="text-sm font-mono font-bold text-[#1C1D1F] mt-2 block">
                      {formatINR(result.productPrice)} • Free Discreet Delivery
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto shrink-0">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="px-5 py-3 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#071A12] text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#071A12]" />
                      <span>Add to Bag</span>
                    </button>
                    <Link
                      href={`/product/${result.recommendedProductSlug}`}
                      onClick={onClose}
                      className="px-5 py-3 rounded-full bg-[#071A12] hover:bg-[#0E3924] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer text-center"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Vaidya WhatsApp Action */}
              <div className="p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-medium text-xs sm:text-sm text-[#075E54] block">
                      Send Results to BAMS Vaidya for 1-on-1 Guidance
                    </span>
                    <span className="text-[11px] text-[#555555] block">
                      100% Free Consultation • Custom Diet &amp; Dosage Instructions
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919123485451?text=Namaste%20Vaidya%20Ji%2C%20I%20completed%20the%20Dosha%20Quiz%20on%20Ayur%20Veda%20Global.%20My%20result%20is%20${encodeURIComponent(result.prakriti)}%20and%20recommended%20formulation%20is%20${encodeURIComponent(result.recommendedProductName)}.%20Please%20guide%20me%20on%20my%20routine.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold tracking-wide inline-flex items-center justify-center gap-2 transition-colors flex-shrink-0"
                >
                  <span>Chat With Doctor</span>
                </a>
              </div>

              {/* Retake */}
              <div className="text-center mt-5">
                <button
                  onClick={handleReset}
                  className="text-xs text-[#737373] hover:text-[#1C1D1F] inline-flex items-center gap-1.5 font-mono"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Dosha Assessment</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
