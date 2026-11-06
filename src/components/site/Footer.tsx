import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { AndexTechLogo, AndexMarketWordmark } from "@/components/ui/logos";
import { EMAIL, INSTAGRAM, WHATSAPP } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <AndexTechLogo className="h-9" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
            Hardware, software e inteligencia artificial para que los comercios vendan mejor y trabajen con menos fricción.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Productos</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/andex-market" className="text-neutral-300 hover:text-white"><AndexMarketWordmark size="sm" /></Link></li>
            <li><Link href="/totems" className="text-neutral-300 hover:text-white">Tótems de autoservicio</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Empresa</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/#nosotros" className="text-neutral-300 hover:text-white">Nuestra historia</Link></li>
            <li><Link href="/#testimonios" className="text-neutral-300 hover:text-white">Clientes</Link></li>
            <li><Link href="#contacto" className="text-neutral-300 hover:text-white">Solicitar demo</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Contacto</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neutral-300 hover:text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a></li>
            <li><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-neutral-300 hover:text-white"><Instagram className="h-4 w-4" /> @andex.tech</a></li>
            <li><a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-neutral-300 hover:text-white"><Mail className="h-4 w-4" /> {EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div className="container flex flex-col items-start justify-between gap-2 border-t border-white/[0.06] py-6 text-xs text-neutral-500 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Andex Tech. Todos los derechos reservados.</p>
        <p>San Rafael, Mendoza · Argentina</p>
      </div>
    </footer>
  );
}
