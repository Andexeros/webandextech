"use client";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Avanza pasos automáticamente mientras el bloque está visible, hasta que el usuario interactúa. */
export function useAutoStep(total: number, ms = 3400) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px" });
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    if (!inView || manual) return;
    const t = setInterval(() => setStep((s) => (s + 1) % total), ms);
    return () => clearInterval(t);
  }, [inView, manual, total, ms]);
  const go = (s: number) => { setManual(true); setStep(s); };
  return { ref, step, go, manual };
}
