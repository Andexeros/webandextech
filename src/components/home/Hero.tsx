"use client";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Cpu, Sparkles, MonitorSmartphone } from "lucide-react";
import { HeroGlow } from "@/components/ui/HeroGlow";
import { DashboardMock } from "@/components/market/DashboardMock";

const words = ["venda más", "reponga a tiempo", "atienda mejor"];

export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.02]);

  return (
    <section ref={ref} className="relative pt-36 md:pt-44">
      <HeroGlow />
      <div className="container text-center">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow">
          <Cpu className="h-3.5 w-3.5 text-gold-400" /> Hardware · Software · Inteligencia artificial
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-display mx-auto mt-6 max-w-4xl text-4xl sm:text-6xl md:text-7xl">
          Inteligencia para que tu comercio{" "}
          <span className="relative inline-block min-w-[6ch] align-bottom">
            <RotatingWord />
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="mx-auto mt-6 max-w-2xl text-pretty text-base text-neutral-400 md:text-lg">
          En Andex Tech combinamos hardware, software e IA para optimizar la operación de los comercios, mejorar la experiencia de sus clientes y acompañar su crecimiento.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/andex-market" className="btn-primary">Conocé Andex Market <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/totems" className="btn-ghost"><MonitorSmartphone className="h-4 w-4" /> Ver tótems</Link>
        </motion.div>
      </div>

      <div className="container relative mt-16 [perspective:1600px] md:mt-20">
        <motion.div style={{ rotateX: rot, y, scale }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto max-w-5xl origin-top">
          <div className="absolute -inset-px -z-10 rounded-[22px] bg-gradient-to-b from-gold-400/40 via-white/10 to-transparent blur-sm" />
          <DashboardMock />
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute -right-4 -top-10 hidden w-44 animate-floaty overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:block xl:-right-16">
            <Image src="/img/totem-gastronomico.webp" alt="Tótem gastronómico Andex Tech" width={400} height={733} className="h-auto w-full" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute -bottom-6 -left-4 hidden max-w-[260px] rounded-2xl border border-gold-400/30 bg-ink-900/90 p-3.5 text-left shadow-2xl backdrop-blur md:block xl:-left-14">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-gold-300"><Sparkles className="h-3.5 w-3.5" /> AIDA</p>
            <p className="mt-1 text-xs text-neutral-300">Hay 3 productos por debajo del nivel de reposición. ¿Los revisamos?</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % words.length), 2600); return () => clearInterval(t); }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span key={words[i]} className="text-gradient inline-block"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        {words[i]}
      </motion.span>
    </AnimatePresence>
  );
}
