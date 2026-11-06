"use client";
import { motion } from "framer-motion";
import { Banknote, CreditCard, Scale, ScanBarcode, Search, Shuffle, Smartphone } from "lucide-react";
import { AppFrame, ars } from "./Frame";
import { cn } from "@/lib/utils";

const lines = [
  { n: "Disco de corte 115 mm", q: "2 u.", p: 2090 * 2 },
  { n: "Cinta aisladora 20 m", q: "1 u.", p: 1400 },
  { n: "Clavos 2\" (por peso)", q: "0,350 kg", p: 1225, w: true },
  { n: "Tornillo autoperforante x100", q: "1 u.", p: 4510 },
];

export function PosMock({ className }: { className?: string }) {
  const subtotal = lines.reduce((a, l) => a + l.p, 0);
  const desc = Math.round(subtotal * 0.05);
  return (
    <AppFrame title="Punto de venta · Caja 1" className={className}>
      <div className="p-4">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-950/60 px-3 py-2">
          <Search className="h-3.5 w-3.5 text-neutral-500" />
          <span className="flex-1 text-[11px] text-neutral-500">Buscar por nombre, código de barras o PLU</span>
          <ScanBarcode className="h-4 w-4 text-gold-400" />
        </div>
        <ul className="mt-3 divide-y divide-white/[0.05]">
          {lines.map((l, i) => (
            <motion.li key={l.n} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15 }} className="flex items-center justify-between py-2 text-[11px]">
              <span className="flex items-center gap-2 text-neutral-200">{l.w && <Scale className="h-3 w-3 text-mint-300" />}{l.n}</span>
              <span className="flex items-center gap-4"><span className="text-neutral-500">{l.q}</span><span className="w-16 text-right tabular-nums text-white">{ars(l.p)}</span></span>
            </motion.li>
          ))}
        </ul>
        <div className="mt-2 space-y-1 border-t border-white/[0.06] pt-2 text-[11px]">
          <div className="flex justify-between text-neutral-500"><span>Descuento 5%</span><span>− {ars(desc)}</span></div>
          <div className="flex justify-between text-sm font-semibold text-white"><span>Total</span><span className="tabular-nums">{ars(subtotal - desc)}</span></div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {[{ i: Banknote, l: "Efectivo" }, { i: CreditCard, l: "Tarjeta" }, { i: Smartphone, l: "Transfer." }, { i: Shuffle, l: "Combinar" }].map(({ i: I, l }, k) => (
            <div key={l} className={cn("flex flex-col items-center gap-1 rounded-lg border px-1 py-2 text-[9px]", k === 3 ? "border-gold-400/50 bg-gold-400/10 text-gold-300" : "border-white/10 text-neutral-400")}>
              <I className="h-3.5 w-3.5" />{l}
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-lg bg-gold-400 py-2 text-center text-[11px] font-semibold text-ink-950">Cobrar y facturar</div>
      </div>
    </AppFrame>
  );
}
