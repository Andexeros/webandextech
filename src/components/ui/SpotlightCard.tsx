"use client";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({ children, className, innerClassName, tone = "dark", color }: { children: ReactNode; className?: string; innerClassName?: string; tone?: "dark" | "light"; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={move} className={cn("group relative overflow-hidden transition-all duration-300", tone === "light" ? "card-light hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_rgba(14,19,26,.3)]" : "card hover:border-white/15", className)}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--x) var(--y), ${color ?? (tone === "light" ? "rgba(245,194,27,.18)" : "rgba(245,194,27,.12)")}, transparent 60%)` }} />
      <div className={cn("relative", innerClassName)}>{children}</div>
    </div>
  );
}
