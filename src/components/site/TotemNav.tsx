"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { totems } from "@/lib/totems";
import { cn } from "@/lib/utils";

export function TotemNav() {
  const [active, setActive] = useState(totems[0].slug);
  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    totems.forEach((t) => { const el = document.getElementById(t.slug); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <div className="sticky top-20 z-30 mt-24 flex justify-center px-3">
      <nav className="scrollbar-none flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-ink-900/80 p-1 backdrop-blur-xl">
        {totems.map((t) => (
          <a key={t.slug} href={`#${t.slug}`} className={cn("relative shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-sm", active === t.slug ? "text-ink-950" : "text-neutral-400 hover:text-white")}>
            {active === t.slug && <motion.span layoutId="totem-pill" className="absolute inset-0 rounded-full bg-gold-400" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
            <span className="relative">{t.title.replace("Tótem ", "").replace(/^./, (c) => c.toUpperCase())}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
