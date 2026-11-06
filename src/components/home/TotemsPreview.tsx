"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/motion";
import { totems } from "@/lib/totems";

export function TotemsPreview() {
  return (
    <section className="surface-cream py-24 md:py-32">
      <div className="container">
        <SectionHeading tone="light" eyebrow="Tótems de autoservicio" title={<>Tótems a medida para <span className="text-gradient-deep">cada tipo de negocio</span></>}
          text="Diseñamos cada tótem a pedido: hardware, software y experiencia pensados para cómo atiende tu comercio." />
        <div className="mt-14 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {totems.map((t, i) => (
            <motion.div key={t.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              <Link href={`/totems#${t.slug}`} className="group relative block aspect-[9/15] overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-800 shadow-[0_24px_50px_-24px_rgba(14,19,26,.45)]">
                <Image src={t.img} alt={t.title} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.07]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-gold-300">{t.category}</p>
                  <p className="mt-1 text-lg font-semibold text-white md:text-xl">{t.title}</p>
                  <p className="mt-2 hidden max-h-0 overflow-hidden text-sm text-neutral-300 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 md:block">{t.short}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/totems" className="btn-dark">Conocé todos los tótems <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
