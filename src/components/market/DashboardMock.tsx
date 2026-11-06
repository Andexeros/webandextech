"use client";
import { motion } from "framer-motion";
import { BarChart3, Boxes, ClipboardList, History, Package, ShoppingCart, Store, Truck, Users, Wallet, Sparkles } from "lucide-react";
import { AppFrame } from "./Frame";
import { AndexMarketMark } from "@/components/ui/logos";
import { CountUp } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

const nav = [
  { i: BarChart3, l: "Reportes", a: true }, { i: History, l: "Historial" }, { i: Wallet, l: "Cierres" }, { i: ClipboardList, l: "Cuenta corriente" },
  { i: Package, l: "Productos" }, { i: Boxes, l: "Stock" }, { i: ShoppingCart, l: "Compras" }, { i: Users, l: "Clientes" }, { i: Truck, l: "Proveedores" }, { i: Store, l: "Sucursales" },
];

const series = [12, 18, 15, 22, 19, 28, 24, 31, 27, 36, 33, 42, 38, 47];

function Chart() {
  const w = 560, h = 150, max = 50;
  const pts = series.map((v, i) => [(i / (series.length - 1)) * w, h - (v / max) * h] as const);
  const d = pts.reduce((acc, [x, y], i, a) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = a[i - 1]; const cx = (px + x) / 2;
    return acc + ` C${cx},${py} ${cx},${y} ${x},${y}`;
  }, "");
  return (
    <svg viewBox={`0 0 ${w} ${h + 4}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3FCF8E" stopOpacity=".35" />
          <stop offset="1" stopColor="#3FCF8E" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="white" strokeOpacity=".06" strokeDasharray="3 5" />)}
      <motion.path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#area)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.6 }} />
      <motion.path d={d} fill="none" stroke="#3FCF8E" strokeWidth="2.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} />
    </svg>
  );
}

export function DashboardMock({ className, compact = false }: { className?: string; compact?: boolean }) {
  const kpis = [
    { l: "Ventas totales", v: 4180000, p: "$ ", d: "+8,0%" },
    { l: "Cantidad de ventas", v: 612, p: "", d: "+5,2%" },
    { l: "Margen de ganancia", v: 1540000, p: "$ ", d: "+6,4%" },
    { l: "Ticket promedio", v: 6830, p: "$ ", d: "+2,6%" },
  ];
  return (
    <AppFrame title="Andex Market · Panel de administración" className={className}>
      <div className="flex">
        <aside className={cn("hidden shrink-0 flex-col border-r border-white/[0.06] bg-ink-950/60 p-3 sm:flex", compact ? "w-40" : "w-48")}>
          <div className="mb-4 flex items-center gap-2 px-1"><AndexMarketMark className="h-6 w-6" /><span className="text-sm font-bold tracking-tight text-white">Andex<span className="font-normal text-neutral-300">market</span></span></div>
          {nav.slice(0, compact ? 7 : 10).map(({ i: I, l, a }) => (
            <div key={l} className={cn("flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px]", a ? "bg-white/[0.07] text-white" : "text-neutral-500")}>
              <I className={cn("h-3.5 w-3.5", a && "text-gold-400")} />{l}
            </div>
          ))}
          <div className="mt-auto rounded-xl border border-gold-400/20 bg-gold-400/[0.06] p-2.5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-gold-300"><Sparkles className="h-3 w-3" /> Chat AIDA</p>
            <p className="mt-1 text-[10px] text-neutral-500">Consultá tu negocio</p>
          </div>
        </aside>
        <div className="min-w-0 flex-1 p-4 md:p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-base font-semibold text-white">Reportes</p>
              <p className="text-[11px] text-neutral-500">Todas las sucursales · Este mes</p>
            </div>
            <div className="hidden gap-1 rounded-lg border border-white/10 p-0.5 text-[10px] md:flex">
              {["General", "Productos", "Facturación"].map((t, i) => <span key={t} className={cn("rounded-md px-2 py-1", i === 0 ? "bg-white/10 text-white" : "text-neutral-500")}>{t}</span>)}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.l} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                <p className="truncate text-[10px] text-neutral-500">{k.l}</p>
                <p className="mt-1 text-sm font-semibold text-white md:text-base"><CountUp to={k.v} prefix={k.p} /></p>
                <span className="mt-1 inline-block rounded-md bg-mint-400/10 px-1.5 py-0.5 text-[9px] font-semibold text-mint-300">↑ {k.d}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-neutral-300">Gráfico de ventas · por día</p>
              <div className="flex gap-2 text-[9px] text-neutral-500"><span className="text-white">Ventas</span><span>Cantidad</span><span>Margen</span></div>
            </div>
            <div className={cn("mt-2", compact ? "h-24" : "h-32 md:h-36")}><Chart /></div>
          </div>
          {!compact && (
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                <p className="text-[11px] text-neutral-300">Métodos de pago</p>
                <div className="mt-2 flex h-2 overflow-hidden rounded-full">
                  <motion.span initial={{ width: 0 }} whileInView={{ width: "52%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="bg-mint-400" />
                  <motion.span initial={{ width: 0 }} whileInView={{ width: "30%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="bg-gold-400" />
                  <motion.span initial={{ width: 0 }} whileInView={{ width: "18%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.7 }} className="bg-sky-400" />
                </div>
                <div className="mt-2 flex gap-3 text-[9px] text-neutral-500"><span>● Efectivo</span><span>● Tarjeta</span><span>● Transferencia</span></div>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                <p className="text-[11px] text-neutral-300">Ventas por vendedor</p>
                {[["Lucía", 62], ["Martín", 38]].map(([n, p]) => (
                  <div key={n} className="mt-2">
                    <div className="flex justify-between text-[9px] text-neutral-500"><span>{n}</span><span>{p}%</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/5"><motion.div initial={{ width: 0 }} whileInView={{ width: `${p}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="h-full rounded-full bg-mint-500" /></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppFrame>
  );
}
