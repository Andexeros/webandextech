"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle2, FileSpreadsheet, FileText, Sparkles, UploadCloud } from "lucide-react";
import { AppFrame, ars } from "./Frame";
import { FlowSteps } from "./FlowSteps";
import { useAutoStep } from "./useAutoStep";
import { cn } from "@/lib/utils";

const rows = [
  { id: 1, n: "Disco de corte 115 mm", a: 1850, b: 2090 },
  { id: 2, n: "Mecha acero rápido 8 mm", a: 3200, b: 3520 },
  { id: 3, n: "Pegamento epoxi 25 ml", a: 2600, b: 2470 },
  { id: 4, n: "Lija al agua N° 120", a: 520, b: 585 },
  { id: 5, n: "Tornillo autoperforante x100", a: 4100, b: 4510 },
  { id: 6, n: "Guantes de trabajo", a: 2900, b: 3480 },
];
const pct = (a: number, b: number) => ((b - a) / a) * 100;
export const priceSteps = ["Subí el archivo", "Compará valores", "Elegí los cambios", "Aplicá la actualización"];
const lists = ["Lista minorista", "Lista mayorista"];

export function SmartPricesDemo() {
  const { ref, step, go, manual } = useAutoStep(4, 3600);
  const [sel, setSel] = useState<Set<number>>(new Set(rows.map((r) => r.id)));
  const [targets, setTargets] = useState<Set<string>>(new Set([lists[0]]));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step !== 0) { setProgress(100); return; }
    setProgress(0);
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 100 : p + 4)), 60);
    return () => clearInterval(t);
  }, [step]);

  // En el paso 3 (auto) se destilda un producto para mostrar que se elige
  useEffect(() => {
    if (manual) return;
    if (step === 2) setSel(new Set(rows.filter((r) => r.id !== 6).map((r) => r.id)));
    if (step === 0) setSel(new Set(rows.map((r) => r.id)));
  }, [step, manual]);

  const toggle = (id: number) => { go(2); setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; }); };
  const toggleList = (l: string) => setTargets((s) => { const n = new Set(s); n.has(l) ? n.delete(l) : n.add(l); if (!n.size) n.add(l); return n; });
  const applied = step === 3;

  return (
    <div ref={ref} className="space-y-4">
      <FlowSteps steps={priceSteps} step={step} onSelect={go} manual={manual} />
      <AppFrame title="Precios · Actualización desde lista de proveedor">
        <div className="p-4">
          {/* archivo */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-white/15 bg-ink-950/50 p-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-mint-500/15 text-mint-300"><FileSpreadsheet className="h-4 w-4" /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">lista-precios-distribuidora-norte.xlsx</p>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]"><motion.div className="h-full bg-gradient-to-r from-mint-400 to-gold-400" animate={{ width: `${progress}%` }} transition={{ ease: "linear", duration: 0.06 }} /></div>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] text-neutral-500"><UploadCloud className="h-3.5 w-3.5" /> Excel <FileText className="ml-1 h-3.5 w-3.5" /> PDF</span>
          </div>
          <AnimatePresence>
            {progress >= 100 && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 flex items-center gap-1.5 text-[11px] text-gold-300">
                <Sparkles className="h-3.5 w-3.5" /> AIDA interpretó el archivo y detectó {rows.length} productos con cambios de costo.
              </motion.p>
            )}
          </AnimatePresence>

          {/* tabla */}
          <div className={cn("scrollbar-none mt-3 overflow-x-auto rounded-xl border border-white/[0.07] transition-opacity duration-500", step === 0 && progress < 100 ? "opacity-30" : "opacity-100")}>
            <table className="w-full min-w-[460px] text-left text-xs">
              <thead className="bg-white/[0.03] text-[10px] uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="w-8 py-2 pl-3" aria-label="Seleccionar" />
                  <th className="py-2 font-medium">Producto</th>
                  <th className="py-2 text-right font-medium">Valor actual</th>
                  <th className="py-2 text-right font-medium">Valor nuevo</th>
                  <th className="py-2 pr-3 text-right font-medium">Variación</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const v = pct(r.a, r.b); const on = sel.has(r.id);
                  return (
                    <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                      className={cn("border-t border-white/[0.05] transition-colors", on ? "" : "opacity-45", applied && on && "bg-mint-400/[0.05]")}>
                      <td className="py-2.5 pl-3">
                        <button onClick={() => toggle(r.id)} aria-label={`Elegir ${r.n}`} className={cn("grid h-4 w-4 place-items-center rounded border transition", on ? "border-gold-400 bg-gold-400 text-ink-950" : "border-white/20")}>
                          {on && <svg viewBox="0 0 12 12" className="h-3 w-3"><path d="M2.5 6.5l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </button>
                      </td>
                      <td className="py-2.5 pr-2 text-neutral-100"><span className="line-clamp-1">{r.n}</span></td>
                      <td className="py-2.5 text-right tabular-nums text-neutral-500">{ars(r.a)}</td>
                      <td className="py-2.5 text-right font-medium tabular-nums text-white">{ars(r.b)}</td>
                      <td className="py-2.5 pr-3 text-right">
                        <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums", v > 15 ? "bg-rose-500/15 text-rose-300" : v > 0 ? "bg-gold-400/15 text-gold-300" : "bg-mint-400/15 text-mint-300")}>
                          {v > 0 ? "+" : ""}{v.toFixed(1).replace(".", ",")}%
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* acción */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-neutral-500">Aplicar en:</span>
              {lists.map((l) => (
                <button key={l} onClick={() => toggleList(l)} className={cn("rounded-full border px-2.5 py-1 transition", targets.has(l) ? "border-gold-400/50 bg-gold-400/10 text-gold-200" : "border-white/10 text-neutral-500 hover:text-neutral-300")}>{l}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {applied ? (
                <motion.span key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-1.5 rounded-full bg-mint-400/15 px-3 py-1.5 text-xs font-semibold text-mint-300">
                  <CheckCircle2 className="h-4 w-4" /> {sel.size} precios actualizados
                </motion.span>
              ) : (
                <motion.button key="go" onClick={() => go(3)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-full bg-gold-400 px-4 py-1.5 text-xs font-semibold text-ink-950 hover:bg-gold-300">
                  Aplicar {sel.size} cambios
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </AppFrame>
    </div>
  );
}
