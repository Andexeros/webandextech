import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, ShoppingCart, Tags } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AndexMarketWordmark } from "@/components/ui/logos";
import { AidaDemo } from "@/components/market/Aida";

const feats = [
  { icon: ShoppingCart, t: "Compras inteligentes", d: "Sabé qué reponer, cuánto comprar y a qué proveedor pedirle.", href: "/andex-market#compras" },
  { icon: Tags, t: "Actualización inteligente de precios", d: "Subí la lista de tu proveedor y revisá todos los cambios de una vez.", href: "/andex-market#precios" },
  { icon: Sparkles, t: "AIDA, tu asesor de IA", d: "Preguntale cómo va tu negocio y respondé con tus propios datos.", href: "/andex-market#aida" },
];

export function MarketSpotlight() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute left-0 top-1/3 -z-10 h-[500px] w-[600px] rounded-full bg-gold-500/[0.07] blur-[120px]" />
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div className="min-w-0">
            <Reveal><span className="eyebrow">Producto principal</span></Reveal>
            <Reveal delay={0.05}><div className="mt-6"><AndexMarketWordmark size="lg" /></div></Reveal>
            <Reveal delay={0.1}>
              <h2 className="h-display mt-6 text-3xl sm:text-4xl md:text-5xl">Vendé, reponé stock y actualizá precios <span className="text-gradient">con ayuda de IA</span></h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-xl text-neutral-400 md:text-lg">
                Un punto de venta, un panel de administración web y herramientas de inteligencia artificial para gestionar tu comercio en un solo sistema.
              </p>
            </Reveal>
            <Stagger className="mt-8 grid gap-3">
              {feats.map((f) => (
                <StaggerItem key={f.t}>
                  <Link href={f.href}>
                    <SpotlightCard className="rounded-2xl p-4" innerClassName="flex items-center gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold-400/25 bg-gold-400/10 text-gold-300"><f.icon className="h-5 w-5" /></span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-white">{f.t}</span>
                        <span className="block text-sm text-neutral-400">{f.d}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-300" />
                    </SpotlightCard>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/andex-market" className="btn-primary">Ver Andex Market <ArrowRight className="h-4 w-4" /></Link>
                <Link href="#contacto" className="btn-ghost">Solicitar una demo</Link>
              </div>
            </Reveal>
          </div>
          <div className="relative min-w-0">
            <Reveal><AidaDemo /></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
