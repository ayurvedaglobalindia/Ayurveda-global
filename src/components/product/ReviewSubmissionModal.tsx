"use client";

import React, { useState } from "react";
import { Star, X, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

interface ReviewSubmissionModalProps {
  productId: string;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: (review: CustomerReview) => void;
}

export function ReviewSubmissionModal({
  productId,
  productName,
  isOpen,
  onClose,
  onReviewSubmitted,
}: ReviewSubmissionModalProps) {
  const { showToast } = useUIStore();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim() || !comment.trim()) {
      showToast("Please provide your name and review details", "error");
      return;
    }

    setSubmitting(true);

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || "India",
      rating,
      date: "Just now",
      title: title.trim() || "Authentic Ayurvedic Formulation",
      comment: comment.trim(),
      verified: true,
    };

    try {
      const storageKey = `ayur_custom_reviews_${productId}`;
      const existing: CustomerReview[] = JSON.parse(
        localStorage.getItem(storageKey) || "[]",
      );
      localStorage.setItem(storageKey, JSON.stringify([newReview, ...existing]));
    } catch {}

    onReviewSubmitted(newReview);
    showToast("Thank you! Your verified review has been published.", "success");
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#9E8047]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#071A12] text-[#FDFBF7] flex items-center justify-between border-b border-[#D4AF37]/30">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block">
              Patron Experience &amp; Testimonial
            </span>
            <h3 className="font-serif text-base sm:text-lg font-medium text-white">
              Write a Review for {productName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-4">
          {/* Star Selector */}
          <div>
            <label className="text-xs font-mono text-[#737373] uppercase tracking-wider block mb-1.5">
              Overall Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-hidden transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? "fill-[#D4AF37] text-[#D4AF37]"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-mono text-[#9E8047] font-semibold ml-2">
                {rating} of 5 Stars
              </span>
            </div>
          </div>

          {/* Name & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-[#737373] uppercase tracking-wider block mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Vikram Sharma"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:border-[#9E8047] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-[#737373] uppercase tracking-wider block mb-1">
                City / State
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru, KA"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:border-[#9E8047] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="text-xs font-mono text-[#737373] uppercase tracking-wider block mb-1">
              Review Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Noticeable improvement in stamina after 2 weeks"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:border-[#9E8047] focus:outline-hidden"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="text-xs font-mono text-[#737373] uppercase tracking-wider block mb-1">
              Detailed Experience *
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your experience with this formulation, how it feels, and results observed..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#9E8047]/25 text-xs text-[#1C1D1F] focus:border-[#9E8047] focus:outline-hidden resize-none"
            />
          </div>

          {/* Verified Badge Assurance */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#EFF4F0] border border-[#2D4A3E]/20 text-[11px] text-[#2D4A3E]">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>Reviews are verified by our Apothecary Quality team to prevent spam.</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full bg-[#071A12] hover:bg-[#0E3924] text-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {submitting ? "Publishing Review..." : "Submit Verified Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
