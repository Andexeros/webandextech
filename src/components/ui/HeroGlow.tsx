"use client";
import { motion } from "framer-motion";

export function HeroGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-grid mask-radial absolute inset-0" />
      <motion.div className="absolute left-1/2 top-[-10%] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(245,194,27,.22),transparent)] blur-2xl"
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-[-10%] top-[20%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(76,105,113,.45),transparent)] blur-2xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute left-[-8%] top-[45%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(63,207,142,.14),transparent)] blur-2xl"
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  );
}
