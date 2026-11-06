"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Database, SendHorizontal, Sparkles } from "lucide-react";
import { AppFrame } from "./Frame";
import { cn } from "@/lib/utils";

type QA = { q: string; intro: string; items?: [string, string][]; outro?: string };
const qas: QA[] = [
  {
    q: "¿Cuáles fueron los productos más vendidos este mes?",
    intro: "Del 1 al 6 de noviembre, estos fueron tus productos con más unidades vendidas:",
    items: [["Disco de corte 115 mm", "42 u."], ["Tornillo autoperforante x100", "31 u."], ["Cinta aisladora 20 m", "28 u."]],
    outro: "Entre los tres suman el 34% de las unidades del mes.",
  },
  {
    q: "¿Qué productos debería reponer esta semana?",
    intro: "Estos productos están por debajo del nivel de reposición que configuraste:",
    items: [["Cinta aisladora 20 m", "3 de 15"], ["Disco de corte 115 mm", "4 de 20"], ["Guantes de trabajo", "6 de 12"]],
    outro: "Podés revisarlos en Compras y armar el pedido por proveedor.",
  },
  {
    q: "¿Cómo cerraron las ventas del mes?",
    intro: "Octubre cerró así:",
    items: [["Ventas totales", "$ 4.180.000"], ["Cantidad de ventas", "612"], ["Ticket promedio", "$ 6.830"]],
    outro: "Las ventas crecieron un 8% respecto de septiembre. El día más fuerte fue el sábado 18.",
  },
];

type Msg = { role: "user" | "aida"; qa: QA };

function Typing() {
  return (
    <span className="inline-flex gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-neutral-400" animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </span>
  );
}

function AidaAnswer({ qa }: { qa: QA }) {
  return (
    <motion.div initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.18 } } }}>
      <motion.p variants={{ h: { opacity: 0, y: 4 }, s: { opacity: 1, y: 0 } }}>{qa.intro}</motion.p>
      {qa.items && (
        <ul className="mt-2 space-y-1">
          {qa.items.map(([a, b]) => (
            <motion.li key={a} variants={{ h: { opacity: 0, x: -6 }, s: { opacity: 1, x: 0 } }} className="flex items-center justify-between gap-4 rounded-lg bg-white/[0.04] px-2.5 py-1.5">
              <span className="text-neutral-200">{a}</span><span className="font-semibold tabular-nums text-white">{b}</span>
            </motion.li>
          ))}
        </ul>
      )}
      {qa.outro && <motion.p variants={{ h: { opacity: 0 }, s: { opacity: 1 } }} className="mt-2 text-neutral-400">{qa.outro}</motion.p>}
    </motion.div>
  );
}

export function AidaDemo({ className }: { className?: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30% 0px" });
  const started = useRef(false);

  const ask = (qa: QA) => {
    if (typing) return;
    setMsgs((m) => [...m, { role: "user", qa }]);
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { role: "aida", qa }]); }, 1300);
  };

  useEffect(() => {
    if (inView && !started.current) { started.current = true; const t = setTimeout(() => ask(qas[0]), 700); return () => clearTimeout(t); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing]);

  const asked = new Set(msgs.filter((m) => m.role === "user").map((m) => m.qa.q));

  return (
    <div ref={ref} className={className}>
      <AppFrame title="Chat AIDA · Panel de administración">
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 text-ink-950">
            <Sparkles className="h-4 w-4" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-900 bg-mint-400" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">AIDA</p>
            <p className="flex items-center gap-1 truncate text-[11px] text-neutral-500"><Database className="h-3 w-3" /> Responde con las ventas, el stock y la caja de tu comercio</p>
          </div>
        </div>
        <div ref={scroller} className="scrollbar-none h-[340px] space-y-3 overflow-y-auto p-4 text-[13px] leading-relaxed">
          {msgs.length === 0 && !typing && <p className="pt-20 text-center text-xs text-neutral-500">Elegí una pregunta para ver cómo responde AIDA.</p>}
          <AnimatePresence initial={false}>
            {msgs.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35 }}
                className={cn("max-w-[88%] rounded-2xl px-3.5 py-2.5", m.role === "user" ? "ml-auto rounded-br-md bg-gold-400 font-medium text-ink-950" : "rounded-bl-md border border-white/[0.07] bg-ink-800 text-neutral-300")}>
                {m.role === "user" ? m.qa.q : <AidaAnswer qa={m.qa} />}
              </motion.div>
            ))}
            {typing && (
              <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-fit rounded-2xl rounded-bl-md border border-white/[0.07] bg-ink-800 px-3.5 py-2"><Typing /></motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="border-t border-white/[0.06] p-3">
          <div className="scrollbar-none -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-2">
            {qas.map((qa) => (
              <button key={qa.q} onClick={() => ask(qa)} disabled={typing}
                className={cn("shrink-0 rounded-full border px-3 py-1.5 text-[11px] transition", asked.has(qa.q) ? "border-white/10 text-neutral-500" : "border-gold-400/30 bg-gold-400/[0.06] text-gold-200 hover:border-gold-400/60")}>
                {qa.q}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-950/60 px-3 py-2 text-xs text-neutral-500">
            <span className="flex-1">Preguntale algo a AIDA…</span><SendHorizontal className="h-4 w-4 text-gold-400" />
          </div>
        </div>
      </AppFrame>
    </div>
  );
}
