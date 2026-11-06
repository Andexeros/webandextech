"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Instagram, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/motion";
import { EMAIL, INSTAGRAM, WHATSAPP, cn, waLink } from "@/lib/utils";

type Interest = "Andex Market" | "Tótems" | "Ambos";

export function Contact({ defaultInterest = "Andex Market" as Interest, title, text }: { defaultInterest?: Interest; title?: string; text?: string }) {
  const [interest, setInterest] = useState<Interest>(defaultInterest);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", comercio: "", rubro: "", ciudad: "", mensaje: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hola Andex Tech, quiero solicitar una demo de ${interest}.`,
      form.nombre && `Nombre: ${form.nombre}`,
      form.comercio && `Comercio: ${form.comercio}`,
      form.rubro && `Rubro: ${form.rubro}`,
      form.ciudad && `Ciudad: ${form.ciudad}`,
      form.mensaje && `Comentario: ${form.mensaje}`,
    ].filter(Boolean).join("\n");
    window.open(waLink(lines), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field = "w-full rounded-2xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-gold-400/60 focus:ring-4 focus:ring-gold-400/10";

  return (
    <section id="contacto" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[120px]" />
      </div>
      <div className="container">
        <div className="card relative grid gap-10 overflow-hidden p-6 md:grid-cols-[1fr_1.1fr] md:p-12">
          <div className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <Reveal><span className="eyebrow"><span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-mint-400" /> Respondemos por WhatsApp</span></Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-5 text-3xl md:text-5xl">{title ?? "Pedí una demo y vé el sistema funcionando en tu comercio."}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-neutral-400">
                {text ?? "Contanos qué vendés y cómo trabajás hoy. Te mostramos Andex Market o los tótems con un recorrido pensado para tu rubro."}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-3 text-sm">
                <li><a className="group inline-flex items-center gap-3 text-neutral-300 hover:text-white" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"><span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 group-hover:border-mint-400/40"><MessageCircle className="h-4 w-4" /></span>+54 9 260 401-7239</a></li>
                <li><a className="group inline-flex items-center gap-3 text-neutral-300 hover:text-white" href={`mailto:${EMAIL}`}><span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 group-hover:border-gold-400/40"><Mail className="h-4 w-4" /></span>{EMAIL}</a></li>
                <li><a className="group inline-flex items-center gap-3 text-neutral-300 hover:text-white" href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 group-hover:border-pink-400/40"><Instagram className="h-4 w-4" /></span>@andex.tech</a></li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-ink-900/80 p-5 backdrop-blur md:p-7">
              <p className="text-sm font-medium text-white">¿Qué te interesa ver?</p>
              <div className="mt-3 grid grid-cols-3 gap-1 rounded-2xl border border-white/10 bg-ink-950/60 p-1">
                {(["Andex Market", "Tótems", "Ambos"] as Interest[]).map((o) => (
                  <button type="button" key={o} onClick={() => setInterest(o)} className={cn("relative rounded-xl px-2 py-2 text-xs font-medium transition-colors sm:text-sm", interest === o ? "text-ink-950" : "text-neutral-400 hover:text-white")}>
                    {interest === o && <motion.span layoutId="interest" className="absolute inset-0 -z-0 rounded-xl bg-gold-400" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                    <span className="relative">{o}</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <input required className={field} placeholder="Tu nombre" value={form.nombre} onChange={set("nombre")} aria-label="Tu nombre" />
                <input className={field} placeholder="Nombre del comercio" value={form.comercio} onChange={set("comercio")} aria-label="Nombre del comercio" />
                <input className={field} placeholder="Rubro (ej.: ferretería)" value={form.rubro} onChange={set("rubro")} aria-label="Rubro" />
                <input className={field} placeholder="Ciudad" value={form.ciudad} onChange={set("ciudad")} aria-label="Ciudad" />
              </div>
              <textarea className={cn(field, "mt-3 min-h-[96px] resize-none")} placeholder="¿Qué te gustaría resolver? (opcional)" value={form.mensaje} onChange={set("mensaje")} aria-label="Comentario" />
              <button type="submit" className="btn-primary mt-4 w-full">Solicitar una demo <ArrowRight className="h-4 w-4" /></button>
              <AnimatePresence>
                {sent && (
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 flex items-center gap-2 text-xs text-mint-300">
                    <Check className="h-4 w-4" /> Abrimos WhatsApp con tu solicitud. Si no se abrió, escribinos a {EMAIL}.
                  </motion.p>
                )}
              </AnimatePresence>
              <p className="mt-3 text-center text-[11px] text-neutral-500">Al enviar, se abre WhatsApp con tus datos para que confirmes el mensaje.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
