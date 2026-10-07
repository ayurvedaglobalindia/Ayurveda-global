"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Create an array for falling leaves/elements
  const leaves = Array.from({ length: 12 }).map((_, i) => {
    const size = Math.random() * 15 + 10;
    const startX = Math.random() * 100;
    const duration = Math.random() * 15 + 15;
    const delay = Math.random() * -20; // negative delay so they are already on screen
    const icon = i % 3 === 0 ? "🍃" : i % 3 === 1 ? "🌿" : "✨";
    return { size, startX, duration, delay, icon };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#FAF7F2]">
      {/* Animated subtle gradients for a breathing, natural feel */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(78,95,82,0.08)_0%,transparent_60%)] blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[40%] -right-[20%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(158,128,71,0.06)_0%,transparent_60%)] blur-3xl"
      />

      {/* Floating Elements Loop */}
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          animate={{
            y: ["-10vh", "110vh"],
            x: [`${leaf.startX}vw`, `${leaf.startX + (i % 2 === 0 ? 10 : -10)}vw`],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              duration: leaf.duration,
              repeat: Infinity,
              ease: "linear",
              delay: leaf.delay,
            },
            x: {
              duration: leaf.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror",
              delay: leaf.delay,
            },
            rotate: {
              duration: leaf.duration * 1.5,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="absolute opacity-[0.06] grayscale drop-shadow-sm"
          style={{
            left: 0,
            top: 0,
            fontSize: `${leaf.size}px`,
          }}
        >
          {leaf.icon}
        </motion.div>
      ))}
    </div>
  );
}
