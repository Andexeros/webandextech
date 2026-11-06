"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { AndexTechLogo } from "@/components/ui/logos";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/andex-market", label: "Andex Market" },
  { href: "/totems", label: "Tótems" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-3 pl-5 transition-all duration-500",
          scrolled || open ? "border-white/10 bg-ink-900/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,.8)] backdrop-blur-xl" : "border-transparent bg-transparent"
        )}
      >
        <Link href="/" aria-label="Andex Tech, inicio"><AndexTechLogo className="h-7" /></Link>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = l.href === path;
            return (
              <li key={l.href}>
                <Link href={l.href} className={cn("relative rounded-full px-3.5 py-2 text-sm transition-colors", active ? "text-white" : "text-neutral-400 hover:text-white")}>
                  {active && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <Link href="#contacto" className="btn-primary hidden !py-2 sm:inline-flex">Solicitar demo <ArrowRight className="h-4 w-4" /></Link>
          <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full text-white md:hidden" aria-label="Abrir menú" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-ink-900/90 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base text-neutral-200 hover:bg-white/5">{l.label}</Link>
            ))}
            <Link href="#contacto" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">Solicitar una demo</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
