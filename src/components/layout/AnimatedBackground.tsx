"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-[-1] bg-[#FAF7F2]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#FAF7F2]"
      aria-hidden="true"
    >
      {/* 1. Luxurious Breathing Botanical Ambient Halos */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.14, 0.08],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(45,74,62,0.18)_0%,rgba(45,74,62,0.04)_45%,transparent_70%)] blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.12, 0.06],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-[35%] -right-[15%] w-[75vw] h-[75vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(158,128,71,0.14)_0%,rgba(158,128,71,0.03)_50%,transparent_75%)] blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
        className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(31,51,42,0.12)_0%,transparent_65%)] blur-3xl"
      />

      {/* 2. Classical Botanical Manuscript Watermark (Ultra Subtle & Elegant) */}
      <svg
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] text-[#2D4A3E]/[0.018] pointer-events-none select-none"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.35"
      >
        <circle cx="50" cy="50" r="45" strokeDasharray="1 2" />
        <circle cx="50" cy="50" r="36" />
        <circle cx="50" cy="50" r="28" strokeDasharray="2 3" />
        <circle cx="50" cy="50" r="16" />
        <path d="M50 5 L50 95 M5 50 L95 50" strokeDasharray="1 3" />
        <path d="M18 18 L82 82 M18 82 L82 18" strokeDasharray="1 3" />
        {/* Subtle lotus petal curves */}
        <path d="M50 20 C42 32 42 42 50 50 C58 42 58 32 50 20 Z" />
        <path d="M50 80 C42 68 42 58 50 50 C58 58 58 68 50 80 Z" />
        <path d="M20 50 C32 42 42 42 50 50 C42 58 32 58 20 50 Z" />
        <path d="M80 50 C68 42 58 42 50 50 C58 58 68 58 80 50 Z" />
      </svg>

      {/* 3. Subtle Warm Paper Texture Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
