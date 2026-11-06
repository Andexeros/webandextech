"use client";
import { motion, useInView, useMotionValue, useSpring, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children, className, delay = 0, y = 24, as = "div",
}: { children: ReactNode; className?: string; delay?: number; y?: number; as?: "div" | "section" | "li" | "span" }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </M>
  );
}

export const staggerParent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} variants={staggerChild}>{children}</motion.div>;
}

export function CountUp({ to, prefix = "", suffix = "", className, decimals = 0 }: { to: number; prefix?: string; suffix?: string; className?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const [val, setVal] = useState(0);
  useEffect(() => { if (inView) mv.set(to); }, [inView, mv, to]);
  useEffect(() => spring.on("change", (v) => setVal(v)), [spring]);
  const fmt = val.toLocaleString("es-AR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref} className={cn("tabular-nums", className)}>{prefix}{fmt}{suffix}</span>;
}

export function SectionHeading({
  eyebrow, title, text, align = "center", className, tone = "dark",
}: { eyebrow?: ReactNode; title: ReactNode; text?: ReactNode; align?: "center" | "left"; className?: string; tone?: "dark" | "light" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "", className)}>
      {eyebrow && <Reveal><span className={tone === "light" ? "eyebrow-light" : "eyebrow"}>{eyebrow}</span></Reveal>}
      <Reveal delay={0.05}><h2 className={cn("h-display mt-5 text-3xl sm:text-4xl md:text-5xl", tone === "light" && "!text-ink-900")}>{title}</h2></Reveal>
      {text && <Reveal delay={0.1}><p className={cn("mt-5 text-pretty text-base leading-relaxed md:text-lg", tone === "light" ? "text-ink-600/80" : "text-neutral-400")}>{text}</p></Reveal>}
    </div>
  );
}
