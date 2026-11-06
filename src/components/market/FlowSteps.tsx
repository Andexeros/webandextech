"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FlowSteps({ steps, step, onSelect, manual }: { steps: string[]; step: number; onSelect: (i: number) => void; manual: boolean }) {
  return (
    <ol className="grid grid-cols-2 gap-2">
      {steps.map((s, i) => {
        const active = i === step; const done = i < step;
        return (
          <li key={s}>
            <button
              onClick={() => onSelect(i)}
              className={cn(
                "group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-3 py-2.5 text-left text-xs sm:px-4 sm:py-3 sm:text-sm transition-colors",
                active ? "border-gold-400/50 bg-gold-400/[0.07] text-white" : "border-white/[0.08] bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-neutral-200"
              )}
            >
              <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-semibold tabular-nums transition-colors",
                active ? "border-gold-400 bg-gold-400 text-ink-950" : done ? "border-gold-400/40 text-gold-300" : "border-white/15 text-neutral-500")}>
                {i + 1}
              </span>
              <span className="leading-snug">{s}</span>
              {active && !manual && (
                <motion.span key={`p${step}`} className="absolute bottom-0 left-0 h-0.5 bg-gold-400/70" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3.4, ease: "linear" }} />
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
