import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, PenTool, Cpu, Wrench, Headset } from "lucide-react";
import { HeroGlow } from "@/components/ui/HeroGlow";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/ui/motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Contact } from "@/components/site/Contact";
import { TotemNav } from "@/components/site/TotemNav";
import { totems } from "@/lib/totems";

export const metadata: Metadata = {
  title: "Tótems de autoservicio a medida",
  description: "Tótems turnero, gastronómico, de verdulería y publicitario, diseñados a pedido para cada comercio por Andex Tech.",
};

export default function TotemsPage() {
  return (
    <>
      <section className="relative pt-36 md:pt-44">
        <HeroGlow />
        <div className="container grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal><span className="eyebrow">Tótems Andex Tech · Hechos a pedido</span></Reveal>
            <Reveal delay={0.05}><h1 className="h-display mt-6 text-4xl sm:text-6xl md:text-[4.25rem] md:leading-[1.04]">Autoservicio que <span className="text-gradient">trabaja por vos</span></h1></Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-pretty text-neutral-400 md:text-lg">
                Diseñamos tótems a medida para ordenar la atención, tomar pedidos, cobrar y comunicar tus promociones. Cada uno se adapta a tu espacio, a tu marca y a cómo trabaja tu equipo.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="#contacto" className="btn-primary">Cotizar mi tótem <ArrowRight className="h-4 w-4" /></Link>
                <Link href="#turnero" className="btn-ghost">Ver modelos</Link>
              </div>
            </Reveal>
          </div>
          <div className="relative h-[440px] sm:h-[520px]">
            <HeroStack />
          </div>
        </div>
      </section>

      <TotemNav />

      {totems.map((t, i) => { const light = i % 2 === 1; return (
        <section key={t.slug} id={t.slug} className={light ? "surface-cream my-6 py-20 md:py-28" : "py-20 md:py-28"}>
          <div className="container">
            <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="grid grid-cols-[0.8fr_1fr] gap-3 md:gap-4">
                <Reveal className={`relative row-span-2 aspect-[9/16] overflow-hidden rounded-3xl border ${light ? "border-ink-900/10 shadow-[0_24px_50px_-24px_rgba(14,19,26,.45)]" : "border-white/10"}`}>
                  <Image src={t.img} alt={t.title} fill sizes="(min-width:1024px) 22vw, 40vw" className="object-cover" />
                </Reveal>
                {t.gallery.slice(0, 2).map((g, k) => (
                  <Reveal key={g} delay={0.1 + k * 0.1} className={`group relative overflow-hidden rounded-3xl border ${light ? "border-ink-900/10" : "border-white/10"}`}>
                    <Image src={g} alt={`${t.title} en uso`} fill sizes="(min-width:1024px) 26vw, 50vw" className="object-cover transition duration-1000 group-hover:scale-105" />
                  </Reveal>
                ))}
                {t.gallery.length < 2 && (
                  <Reveal delay={0.2} className={`${light ? "card-light" : "card"} flex flex-col justify-end p-5`}>
                    <p className={`text-sm ${light ? "text-ink-600/80" : "text-neutral-400"}`}>Diseño a medida</p>
                    <p className={`mt-1 text-lg font-semibold ${light ? "text-ink-900" : "text-white"}`}>Con la identidad de tu marca</p>
                  </Reveal>
                )}
              </div>
              <div>
                <Reveal><p className={`font-mono text-sm ${light ? "font-semibold text-gold-600" : "text-gold-400"}`}>0{i + 1} · {t.category}</p></Reveal>
                <Reveal delay={0.05}><h2 className={`h-display mt-3 text-3xl md:text-5xl ${light ? "!text-ink-900" : ""}`}>{t.title}</h2></Reveal>
                <Reveal delay={0.1}><p className={`mt-5 text-pretty leading-relaxed md:text-lg ${light ? "text-ink-600/80" : "text-neutral-400"}`}>{t.text}</p></Reveal>
                <Reveal delay={0.15}>
                  <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                    {t.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2.5 text-sm ${light ? "text-ink-800" : "text-neutral-200"}`}>
                        <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${light ? "bg-gold-400 text-ink-950" : "bg-gold-400/15 text-gold-300"}`}><Check className="h-3 w-3" /></span>{f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    <span className={`text-xs uppercase tracking-widest ${light ? "text-ink-600/70" : "text-neutral-500"}`}>Ideal para</span>
                    {t.ideal.map((x) => <span key={x} className={`rounded-full border px-3 py-1 text-xs ${light ? "border-ink-900/10 bg-white text-ink-700" : "border-white/10 bg-white/[0.03] text-neutral-300"}`}>{x}</span>)}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ); })}

      <section className="surface-cream py-24 md:py-32">
        <div className="container">
          <SectionHeading tone="light" eyebrow="Proceso" title="Cada tótem se hace a pedido" text="Acompañamos el proyecto de punta a punta, desde la idea hasta que el tótem está atendiendo a tus clientes." />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: PenTool, t: "Diseño", d: "Definimos con vos el uso, el tamaño y la estética del tótem." },
              { i: Cpu, t: "Hardware y software", d: "Integramos pantalla, periféricos y el software que necesita tu negocio." },
              { i: Wrench, t: "Instalación", d: "Lo dejamos funcionando en tu local, listo para atender." },
              { i: Headset, t: "Soporte", d: "Te acompañamos después de la instalación con soporte técnico." },
            ].map((s, i) => (
              <StaggerItem key={s.t}>
                <SpotlightCard tone="light" className="h-full p-6">
                  <div className="flex items-center justify-between">
                    <s.i className="h-6 w-6 text-gold-600" />
                    <span className="font-mono text-xs text-ink-600/50">0{i + 1}</span>
                  </div>
                  <p className="mt-5 text-lg font-semibold text-ink-900">{s.t}</p>
                  <p className="mt-1.5 text-sm text-ink-600/80">{s.d}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Contact defaultInterest="Tótems" title="Contanos qué tótem necesitás" text="Te ayudamos a definir el modelo, el tamaño y el software ideal para tu comercio." />
    </>
  );
}

function HeroStack() {
  const pos = [
    { l: "2%", t: "50px", r: -6 },
    { l: "24%", t: "10px", r: -2 },
    { l: "44%", t: "60px", r: 2 },
    { l: "64%", t: "20px", r: 6 },
  ];
  return (
    <>
      {totems.map((t, i) => (
        <div key={t.slug} className="absolute w-[33%] animate-floaty" style={{ left: pos[i].l, top: pos[i].t, animationDelay: `${i * 0.7}s`, zIndex: i === 1 ? 20 : 10 - i }}>
          <Reveal delay={0.2 + i * 0.1}>
            <div className="aspect-[9/16] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,.9)] transition-transform duration-500 hover:-translate-y-2" style={{ transform: `rotate(${pos[i].r}deg)` }}>
              <Image src={t.img} alt={t.title} width={400} height={733} className="h-full w-full object-cover" priority={i < 2} />
            </div>
          </Reveal>
        </div>
      ))}
    </>
  );
}
