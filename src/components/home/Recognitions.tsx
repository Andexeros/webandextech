const items = ["Ganadores BP INNOVA 2023", "Incubadora UNCUYO", "Naves Argentina 2024 · Finalistas", "Cámara Joven de San Rafael", "Emprender 2024 · Finalistas"];
export function Recognitions() {
  return (
    <section className="border-y border-white/[0.06] bg-ink-900/40 py-6">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12 [--marquee-duration:35s]">
          {[...items, ...items, ...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap text-sm font-medium text-neutral-500">
              {t}<span className="h-1 w-1 rounded-full bg-gold-500/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
