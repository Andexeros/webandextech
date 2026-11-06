"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, GraduationCap, Rocket, Trophy } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/ui/motion";

const entries = [
  {
    year: "2023", period: "Inicio", icon: Trophy,
    title: "Ganadores del BP INNOVA 2023",
    text: "",
    imgs: ["bp-innova", "bp-1", "bp-2", "bp-3"],
  },
  {
    year: "2023", period: "Julio – Diciembre", icon: GraduationCap,
    title: "Incubadora UNCUYO · Programa de Pre-Aceleración",
    text: "Programa de capacitación en negocios y emprendimiento.",
    imgs: ["uncuyo-1", "uncuyo-2", "uncuyo-3", "uncuyo-4"],
  },
  {
    year: "2024", period: "Formación", icon: Rocket,
    title: "Naves Argentina 2024 y Cámara Joven de San Rafael",
    text: "Participamos en Naves Argentina 2024, en el Programa de Gestión y Desarrollo de Habilidades Empresariales de la Cámara Joven de San Rafael y en otros programas de negocios y emprendimiento.",
    imgs: ["naves-1", "naves-2", "naves-3", "naves-4"],
  },
  {
    year: "2024", period: "Fin de año", icon: Award,
    title: "Finalistas en los programas que realizamos",
    text: "",
    list: ["Finalistas en Naves Argentina 2024", "Finalistas en Emprender 2024 · Cámara Joven de San Rafael"],
    imgs: ["final-1", "final-2", "final-3", "final-4"],
  },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="nosotros" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Sobre nosotros"
          title={<>Una startup de Mendoza que crece <span className="text-gradient">junto a los comercios</span></>}
          text="Somos un equipo joven que combina hardware, software e inteligencia artificial. Desde 2023 nos formamos en programas de innovación y emprendimiento mientras construíamos soluciones para negocios reales."
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute left-[15px] top-0 h-full w-px bg-white/10 md:left-[200px]" />
          <motion.div style={{ height: h }} className="absolute left-[15px] top-0 w-px bg-gradient-to-b from-gold-300 via-gold-500 to-transparent md:left-[200px]" />

          <div className="space-y-20 md:space-y-28">
            {entries.map((e, i) => (
              <div key={i} className="relative grid gap-6 pl-12 md:grid-cols-[200px_1fr] md:gap-12 md:pl-0">
                <div className="md:sticky md:top-32 md:self-start md:pr-10 md:text-right">
                  <span className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-gold-400/40 bg-ink-900 shadow-[0_0_0_6px_rgba(5,7,10,1)] md:left-[184px]">
                    <e.icon className="h-4 w-4 text-gold-400" />
                  </span>
                  <p className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{e.year}</p>
                  <p className="mt-1 text-sm text-neutral-500">{e.period}</p>
                </div>
                <div className="md:pl-10">
                  <Reveal>
                    <h3 className="text-xl font-semibold text-white md:text-2xl">{e.title}</h3>
                    {e.text && <p className="mt-3 max-w-xl text-neutral-400">{e.text}</p>}
                    {e.list && (
                      <ul className="mt-4 space-y-2">
                        {e.list.map((l) => (
                          <li key={l} className="flex items-center gap-2 text-sm text-neutral-300"><span className="h-1.5 w-1.5 rounded-full bg-gold-400" />{l}</li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                  <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4">
                    {e.imgs.map((src, j) => (
                      <Reveal key={src} delay={j * 0.06} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-ink-800">
                        <Image src={`/img/${src}.webp`} alt={e.title} fill sizes="(min-width:768px) 360px, 45vw" className={src === "uncuyo-4" ? "bg-white object-contain p-4" : "object-cover transition duration-700 group-hover:scale-[1.06]"} />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
