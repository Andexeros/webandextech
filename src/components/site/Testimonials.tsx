import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/motion";

const items = [
  { quote: "Andex Tech nos brindó una atención personalizada que logró adaptarse de inmediato a las particularidades de nuestra clínica. Su servicio postventa es excelente, es ágil y confiable, lo que hizo de la integración un éxito.", name: "Dr. Juan Ignacio Luffi", title: "Veterinaria Dr. Luffi" },
  { quote: "Trabajan con profesionalismo, responsabilidad y calidad humana, lo que se refleja en la dedicación que le ponen a cada proyecto.", name: "Ignacio Montoro", title: "Dueño de Modestan" },
  { quote: "Tuve el privilegio de acompañar a los fundadores de Andex Tech en su gestación, donde construyeron una empresa basada en valores y profesionalismo. Se destaca por su compromiso con la excelencia, la innovación y la satisfacción del cliente.", name: "Juan Pablo Bustos", title: "Profesor de la UNCUYO" },
  { quote: "La implementación fue rápida y el soporte técnico es excelente.", name: "Carlos Rodríguez", title: "Dueño de local" },
  { quote: "La solución se adaptó perfectamente a nuestras necesidades específicas.", name: "Laura Martínez", title: "Administradora" },
];

function Card({ t }: { t: (typeof items)[number] }) {
  return (
    <figure className="card-light relative w-[340px] shrink-0 p-6 md:w-[420px]">
      <Quote className="h-6 w-6 text-gold-500" />
      <blockquote className="mt-4 text-[15px] leading-relaxed text-ink-700">{t.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-slatey to-ink-700 text-sm font-semibold text-white">
          {t.name.replace("Dr. ", "").split(" ").map((w) => w[0]).slice(0, 2).join("")}
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink-900">{t.name}</span>
          <span className="block text-xs text-ink-600/70">{t.title}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section id="testimonios" className="surface-cream py-24 md:py-32">
      <div className="container">
        <SectionHeading tone="light" eyebrow="Clientes" title="Lo que dicen quienes trabajan con nosotros" />
      </div>
      <div className="mask-fade-x group mt-14 overflow-hidden py-4">
        <div className="flex w-max animate-marquee gap-5 [--marquee-duration:60s] group-hover:[animation-play-state:paused]">
          {[...items, ...items].map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
