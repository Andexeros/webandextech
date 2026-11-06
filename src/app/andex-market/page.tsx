import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, PlayCircle, ScanBarcode, FileCheck2, Wallet, History, Boxes, Truck, Users, BarChart3, Store,
  MonitorSmartphone, LayoutDashboard, Sparkles, ShoppingCart, Tags, Lightbulb, Rocket, Settings2, MessagesSquare,
} from "lucide-react";
import { HeroGlow } from "@/components/ui/HeroGlow";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/ui/motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AndexMarketWordmark } from "@/components/ui/logos";
import { DashboardMock } from "@/components/market/DashboardMock";
import { PosMock } from "@/components/market/PosMock";
import { SmartPurchasesDemo } from "@/components/market/SmartPurchases";
import { SmartPricesDemo } from "@/components/market/SmartPrices";
import { AidaDemo } from "@/components/market/Aida";
import { MarketHeroVisual } from "@/components/market/HeroVisual";
import { Contact } from "@/components/site/Contact";

export const metadata: Metadata = {
  title: "Andex Market · Punto de venta y gestión comercial con IA",
  description: "Cobrá y facturá desde el punto de venta, administrá stock, caja y proveedores desde la web y usá AIDA para tomar decisiones de compra y de precios con tus propios datos.",
};

const groups = [
  {
    t: "Vender y cobrar",
    items: [
      { i: ScanBarcode, t: "Punto de venta", d: "Buscá productos por nombre, código de barras o PLU. Vendé por unidad o por peso, aplicá descuentos y cobrá en efectivo, con tarjeta, por transferencia o combinando medios de pago." },
      { i: FileCheck2, t: "Facturación y remitos", d: "Emití comprobantes electrónicos A y B mediante la integración con ARCA y generá remitos desde el sistema." },
    ],
  },
  {
    t: "Controlar la operación",
    items: [
      { i: Wallet, t: "Caja y vendedores", d: "Identificá quién realizó cada venta, controlá los movimientos de caja y revisá cada cierre con el detalle por medio de pago." },
      { i: History, t: "Historial de ventas", d: "Consultá cada venta realizada con su detalle, el medio de pago y el vendedor que la hizo." },
    ],
  },
  {
    t: "Abastecer el negocio",
    items: [
      { i: Boxes, t: "Productos y stock", d: "Organizá tu catálogo, controlá el stock disponible y configurá el nivel de reposición de cada producto." },
      { i: Truck, t: "Proveedores y compras", d: "Registrá a tus proveedores y armá los pedidos de compra de cada uno desde el mismo panel." },
    ],
  },
  {
    t: "Clientes y resultados",
    items: [
      { i: Users, t: "Clientes y cuenta corriente", d: "Guardá los datos de tus clientes y llevá el saldo de cada cuenta corriente al día." },
      { i: BarChart3, t: "Reportes", d: "Mirá ventas, cantidad, margen y ticket promedio por día, junto con los medios de pago y las ventas por vendedor." },
      { i: Store, t: "Sucursales", d: "Consultá los reportes de cada sucursal o de todas juntas desde un solo lugar." },
    ],
  },
];

function FeatureBlock({
  id, n, icon: Icon, label, title, text, example, demo, reverse,
}: { id: string; n: string; icon: typeof Sparkles; label: string; title: string; text: string; example: React.ReactNode; demo: React.ReactNode; reverse?: boolean }) {
  return (
    <section id={id} className="relative py-20 md:py-28">
      <div className="container">
        <div className={`grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div className="min-w-0 lg:sticky lg:top-28">
            <Reveal>
              <span className="eyebrow"><Icon className="h-3.5 w-3.5 text-gold-400" /> <span className="font-mono text-gold-300">{n}</span> {label}</span>
            </Reveal>
            <Reveal delay={0.05}><h3 className="h-display mt-6 text-3xl md:text-[2.75rem] md:leading-[1.08]">{title}</h3></Reveal>
            <Reveal delay={0.1}><p className="mt-5 text-pretty leading-relaxed text-neutral-400 md:text-lg">{text}</p></Reveal>
            <Reveal delay={0.15}>
              <div className="mt-7 flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                <div className="text-sm leading-relaxed text-neutral-300">{example}</div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="min-w-0">{demo}</Reveal>
        </div>
      </div>
    </section>
  );
}

export default function AndexMarketPage() {
  return (
    <>
      {/* 1 · Encabezado */}
      <section className="relative pt-36 md:pt-44">
        <HeroGlow />
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal><div className="flex justify-center"><AndexMarketWordmark size="lg" /></div></Reveal>
            <Reveal delay={0.05}><p className="mt-6 text-sm font-medium tracking-wide text-gold-300">Andex Market · Punto de venta y gestión comercial</p></Reveal>
            <Reveal delay={0.1}><h1 className="h-display mt-4 text-4xl sm:text-6xl md:text-[4.25rem] md:leading-[1.04]">Vendé, reponé stock y actualizá precios <span className="text-gradient">con ayuda de IA</span></h1></Reveal>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 md:text-lg">
                Cobrá y facturá desde el punto de venta. Administrá stock, caja y proveedores desde la web. Usá AIDA para consultar cómo va tu negocio y tomá decisiones de compra y de precios con tus propios datos.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="#contacto" className="btn-primary">Solicitar una demo <ArrowRight className="h-4 w-4" /></Link>
                <Link href="#funciones" className="btn-ghost"><PlayCircle className="h-4 w-4" /> Ver cómo funciona</Link>
              </div>
            </Reveal>
          </div>
          <MarketHeroVisual dashboard={<DashboardMock />} pos={<PosMock />} />
        </div>
      </section>

      {/* Qué combina */}
      <section className="py-20 md:py-28">
        <div className="container">
          <Stagger className="grid gap-4 md:grid-cols-3">
            {[
              { i: MonitorSmartphone, t: "Punto de venta", d: "Para cobrar y facturar rápido en el mostrador." },
              { i: LayoutDashboard, t: "Panel de administración web", d: "Para gestionar stock, caja, proveedores y reportes desde cualquier lugar." },
              { i: Sparkles, t: "Inteligencia artificial", d: "Para decidir qué comprar, qué precios cambiar y entender cómo va tu negocio." },
            ].map((c) => (
              <StaggerItem key={c.t}>
                <SpotlightCard className="h-full p-6">
                  <c.i className="h-6 w-6 text-gold-400" />
                  <p className="mt-4 text-lg font-semibold text-white">{c.t}</p>
                  <p className="mt-1.5 text-sm text-neutral-400">{c.d}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 2 · Funciones destacadas */}
      <div id="funciones" className="relative">
        <div className="container pt-8">
          <SectionHeading eyebrow={<><Sparkles className="h-3.5 w-3.5 text-gold-400" /> Funciones inteligentes</>}
            title={<>Tres funciones para <span className="text-gradient">decidir mejor</span> todos los días</>}
            text="Las tareas que más tiempo llevan en un comercio, resueltas con tus propios datos. Probá las demos: podés tocar cada paso." />
        </div>

        <FeatureBlock
          id="compras" n="01" icon={ShoppingCart} label="Compras inteligentes"
          title="Sabé qué reponer, cuánto comprar y a qué proveedor pedirle."
          text="Andex Market toma el stock disponible y los niveles de reposición que configurás para sugerirte qué productos comprar y en qué cantidades. Revisá la propuesta, ajustá lo que necesites y organizá el pedido por proveedor."
          example={<>Una ferretería tiene <b className="text-white">4 discos de corte</b> y quiere mantener <b className="text-white">20</b> en stock. El sistema le sugiere reponer <b className="text-gold-300">16</b> y le permite revisar esa cantidad antes de armar el pedido.</>}
          demo={<SmartPurchasesDemo />}
        />

        <div className="container"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

        <FeatureBlock
          id="precios" n="02" icon={Tags} label="Actualización inteligente de precios" reverse
          title="Cuando tu proveedor cambia los precios, revisá toda la lista de una vez."
          text="Subí la lista de tu proveedor en Excel o PDF. AIDA te ayuda a interpretar el archivo y detectar qué productos cambiaron de costo o de precio. Compará el valor actual con el nuevo, elegí qué cambios aplicar y actualizá las listas de precios que correspondan."
          example={<>Un proveedor manda un Excel nuevo. Andex Market muestra el <b className="text-white">valor anterior y el nuevo</b> por producto. Elegís los cambios que querés aceptar y los aplicás en conjunto. Nada se modifica hasta que lo aprobás.</>}
          demo={<SmartPricesDemo />}
        />

        <div className="container"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

        <FeatureBlock
          id="aida" n="03" icon={MessagesSquare} label="AIDA, el asesor de IA para tu negocio"
          title="Preguntale a AIDA cómo va tu negocio."
          text="AIDA te ayuda a interpretar la información de tu comercio con preguntas en lenguaje cotidiano. Consultá tus ventas, revisá qué productos necesitan reposición y pedí un resumen del mes desde el panel de administración."
          example={<>AIDA responde con <b className="text-white">los datos de tu propio comercio</b>: tus ventas, tu stock y tu caja. Las cifras de esta demo son de ejemplo.</>}
          demo={<AidaDemo />}
        />
      </div>

      {/* 3 · Módulos */}
      <div className="surface-cream mt-12">
      <section id="modulos" className="relative py-24 md:py-32">
        <div className="container">
          <SectionHeading tone="light" eyebrow="Módulos" title="Todo lo que podés gestionar con Andex Market" text="Las herramientas del día a día, agrupadas según la tarea que tenés que resolver." />
          <div className="mt-16 space-y-12">
            {groups.map((g, gi) => (
              <div key={g.t} className="grid gap-6 md:grid-cols-[220px_1fr]">
                <Reveal>
                  <p className="font-mono text-xs font-semibold text-gold-600">0{gi + 1}</p>
                  <p className="mt-1 text-xl font-semibold text-ink-900">{g.t}</p>
                </Reveal>
                <Stagger className={`grid gap-4 ${g.items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                  {g.items.map((m) => (
                    <StaggerItem key={m.t}>
                      <SpotlightCard tone="light" className="h-full p-5">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950 shadow-[0_6px_16px_-6px_rgba(233,176,0,.7)]"><m.i className="h-5 w-5" /></span>
                        <p className="mt-4 font-semibold text-ink-900">{m.t}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-600/80">{m.d}</p>
                      </SpotlightCard>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo empezar */}
      <section className="pb-24 pt-4 md:pb-32">
        <div className="container">
          <div className="mx-auto mb-16 h-px max-w-5xl bg-ink-900/10" />
          <SectionHeading tone="light" eyebrow="Cómo empezar" title="De la demo a tu primera venta" />
          <Stagger className="relative mt-14 grid gap-4 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-9 hidden h-px bg-gradient-to-r from-gold-400/0 via-gold-400/40 to-gold-400/0 md:block" />
            {[
              { i: PlayCircle, t: "Pedí una demo", d: "Te mostramos el sistema con ejemplos de tu rubro y respondemos tus dudas." },
              { i: Settings2, t: "Lo configuramos con vos", d: "Cargamos tu catálogo, tus listas de precios y tus medios de cobro." },
              { i: Rocket, t: "Empezá a vender", d: "Usá el punto de venta en el mostrador y el panel web para gestionar tu negocio." },
            ].map((s, i) => (
              <StaggerItem key={s.t} className="relative text-center">
                <span className="relative mx-auto grid h-[72px] w-[72px] place-items-center rounded-2xl border border-ink-900/[0.07] bg-white shadow-[0_16px_40px_-16px_rgba(14,19,26,.35)]">
                  <s.i className="h-6 w-6 text-gold-600" />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-gold-400 font-mono text-[11px] font-bold text-ink-950">{i + 1}</span>
                </span>
                <p className="mt-5 text-lg font-semibold text-ink-900">{s.t}</p>
                <p className="mx-auto mt-1.5 max-w-xs text-sm text-ink-600/80">{s.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      </div>

      <Contact defaultInterest="Andex Market" title="Pedí una demo de Andex Market" text="Contanos qué vendés y cómo trabajás hoy. Te mostramos cómo vender, reponer stock y actualizar precios con ayuda de IA en tu comercio." />
    </>
  );
}
