"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Minus, Plus, Truck, Check, ArrowRight } from "lucide-react";
import { AppFrame } from "./Frame";
import { FlowSteps } from "./FlowSteps";
import { useAutoStep } from "./useAutoStep";
import { cn } from "@/lib/utils";

const initial = [
  { id: 1, n: "Disco de corte 115 mm", stock: 4, nivel: 20, prov: "Distribuidora Norte" },
  { id: 2, n: "Tornillo autoperforante x100", stock: 12, nivel: 30, prov: "Distribuidora Norte" },
  { id: 3, n: "Cinta aisladora 20 m", stock: 3, nivel: 15, prov: "Eléctrica Cuyo" },
  { id: 4, n: "Guantes de trabajo", stock: 6, nivel: 12, prov: "Seguridad Industrial Sur" },
  { id: 5, n: "Silicona transparente", stock: 14, nivel: 12, prov: "Eléctrica Cuyo" },
];
export const purchaseSteps = ["Revisá el stock", "Recibí una sugerencia", "Ajustá cantidades", "Armá el pedido por proveedor"];

export function SmartPurchasesDemo() {
  const { ref, step, go, manual } = useAutoStep(4);
  const [qty, setQty] = useState<Record<number, number>>(() => Object.fromEntries(initial.map((p) => [p.id, Math.max(0, p.nivel - p.stock)])));
  const bump = (id: number, d: number) => { go(2); setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + d) })); };
  const showSug = step >= 1;
  const editable = step >= 2;

  const groups = initial.filter((p) => qty[p.id] > 0).reduce<Record<string, typeof initial>>((acc, p) => {
    (acc[p.prov] ||= []).push(p); return acc;
  }, {});

  return (
    <div ref={ref} className="space-y-4">
      <FlowSteps steps={purchaseSteps} step={step} onSelect={go} manual={manual} />
      <AppFrame title="Compras · Sugerencia de reposición">
        <div className="relative min-h-[360px] p-4">
          <AnimatePresence mode="wait">
            {step < 3 ? (
              <motion.div key="table" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-3 border-b border-white/[0.06] px-2 pb-2 text-[10px] font-medium uppercase tracking-wider text-neutral-500 sm:grid-cols-[1fr_140px_auto_auto]">
                  <span>Producto</span><span className="hidden sm:block">Stock / nivel</span><span className="text-right">Stock</span><span className="w-24 text-right">Sugerido</span>
                </div>
                <ul>
                  {initial.map((p, i) => {
                    const pct = Math.min(100, (p.stock / p.nivel) * 100);
                    const low = p.stock < p.nivel;
                    const highlight = p.id === 1 && step >= 1;
                    return (
                      <motion.li key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                        className={cn("grid grid-cols-[1fr_auto_auto] items-center gap-x-3 rounded-xl px-2 py-2.5 text-xs sm:grid-cols-[1fr_140px_auto_auto]", highlight && "bg-gold-400/[0.06] ring-1 ring-gold-400/30")}>
                        <span className="min-w-0">
                          <span className="block truncate text-neutral-100">{p.n}</span>
                          <span className="block text-[10px] text-neutral-500">{p.prov}</span>
                        </span>
                        <span className="hidden sm:block">
                          <span className="block h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                            <motion.span className={cn("block h-full rounded-full", low ? "bg-gradient-to-r from-rose-500 to-gold-400" : "bg-mint-400")} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }} />
                          </span>
                          <span className="mt-1 block text-[10px] text-neutral-500">nivel de reposición: {p.nivel}</span>
                        </span>
                        <span className={cn("text-right tabular-nums", low ? "text-rose-300" : "text-neutral-300")}>{p.stock}</span>
                        <span className="flex w-24 justify-end">
                          <AnimatePresence mode="wait">
                            {showSug ? (
                              editable ? (
                                <motion.span key="ed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1 rounded-lg border border-white/10 bg-ink-950/70 p-0.5">
                                  <button aria-label="Restar" onClick={() => bump(p.id, -1)} className="grid h-6 w-6 place-items-center rounded-md text-neutral-400 hover:bg-white/10 hover:text-white"><Minus className="h-3 w-3" /></button>
                                  <span className="w-6 text-center font-semibold tabular-nums text-white">{qty[p.id]}</span>
                                  <button aria-label="Sumar" onClick={() => bump(p.id, 1)} className="grid h-6 w-6 place-items-center rounded-md text-neutral-400 hover:bg-white/10 hover:text-white"><Plus className="h-3 w-3" /></button>
                                </motion.span>
                              ) : (
                                <motion.span key="sg" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                                  className={cn("rounded-lg px-2 py-1 font-semibold tabular-nums", qty[p.id] > 0 ? "bg-gold-400/15 text-gold-300" : "text-neutral-600")}>
                                  {qty[p.id] > 0 ? `+${qty[p.id]}` : "—"}
                                </motion.span>
                              )
                            ) : <motion.span key="none" className="text-neutral-700">·</motion.span>}
                          </AnimatePresence>
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
                <AnimatePresence>
                  {step >= 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 rounded-xl border border-gold-400/25 bg-gold-400/[0.05] p-3 text-xs text-neutral-300">
                      <span className="font-semibold text-gold-300">Disco de corte 115 mm:</span> tenés 4 y querés mantener 20. Se sugiere reponer <span className="font-semibold text-white">16</span>. {editable ? "Ajustá la cantidad si necesitás." : "Podés revisar la cantidad antes de armar el pedido."}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div key="groups" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                <p className="mb-3 text-xs text-neutral-400">Pedido organizado por proveedor</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(groups).map(([prov, items], gi) => (
                    <motion.div key={prov} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi * 0.1 }} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
                      <p className="flex items-center gap-2 text-xs font-semibold text-white"><Truck className="h-3.5 w-3.5 text-gold-400" />{prov}</p>
                      <ul className="mt-2 space-y-1.5">
                        {items.map((p) => (
                          <li key={p.id} className="flex justify-between text-[11px] text-neutral-400"><span className="truncate pr-2">{p.n}</span><span className="tabular-nums text-white">{qty[p.id]} u.</span></li>
                        ))}
                      </ul>
                      <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2 text-[10px]">
                        <span className="text-neutral-500">{items.reduce((a, p) => a + qty[p.id], 0)} unidades</span>
                        <span className="inline-flex items-center gap-1 font-medium text-mint-300"><Check className="h-3 w-3" /> Listo para pedir</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <button onClick={() => go(0)} className="mt-4 inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white">Volver a revisar <ArrowRight className="h-3 w-3" /></button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AppFrame>
    </div>
  );
}
