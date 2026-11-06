import Image from "next/image";
import { cn } from "@/lib/utils";

export function AndexMarketMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-8 w-8", className)} aria-hidden>
      <defs>
        <linearGradient id="am-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFC61F" />
          <stop offset="1" stopColor="#E99400" />
        </linearGradient>
        <linearGradient id="am-gloss" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="9" fill="url(#am-fill)" />
      <rect width="40" height="40" rx="9" fill="url(#am-gloss)" />
      <path d="M6.6 27.2 L22.4 11.2 L33.6 22.2" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="butt" strokeLinejoin="miter" />
    </svg>
  );
}

export function AndexMarketWordmark({ className, size = "md", dark = false }: { className?: string; size?: "sm" | "md" | "lg"; dark?: boolean }) {
  const s = { sm: "text-base", md: "text-xl", lg: "text-2xl" }[size];
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <AndexMarketMark className={size === "lg" ? "h-10 w-10" : size === "sm" ? "h-6 w-6" : "h-8 w-8"} />
      <span className={cn("font-bold tracking-tight", dark ? "text-ink-900" : "text-white", s)}>
        Andex<span className={cn("font-normal", dark ? "text-ink-700" : "text-neutral-300")}>market</span>
      </span>
    </span>
  );
}

export function AndexTechLogo({ className }: { className?: string }) {
  return (
    <Image src="/img/logo-andextech.png" alt="Andex Tech" width={1491} height={551} priority className={cn("h-9 w-auto", className)} />
  );
}
