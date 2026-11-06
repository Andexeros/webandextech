"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function MarketHeroVisual({ dashboard, pos }: { dashboard: ReactNode; pos: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yPos = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rot = useTransform(scrollYProgress, [0, 0.5], [10, 0]);
  return (
    <div ref={ref} className="relative mx-auto mt-16 max-w-6xl [perspective:1600px] md:mt-20">
      <motion.div style={{ rotateX: rot }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="origin-top md:mr-28">
        <div className="absolute -inset-px -z-10 rounded-[22px] bg-gradient-to-b from-gold-400/40 via-white/10 to-transparent blur-sm" />
        {dashboard}
      </motion.div>
      <motion.div style={{ y: yPos }} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 mx-auto -mt-10 w-full max-w-[340px] md:absolute md:-bottom-10 md:right-0 md:mt-0">
        {pos}
      </motion.div>
    </div>
  );
}
