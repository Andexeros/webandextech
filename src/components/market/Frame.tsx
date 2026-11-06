import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function AppFrame({ title, children, className, badge = true }: { title: string; children: ReactNode; className?: string; badge?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9),0_0_0_1px_rgba(255,255,255,.02)_inset]", className)}>
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-ink-850 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <p className="truncate text-[11px] font-medium text-neutral-400">{title}</p>
        {badge && <ExampleBadge className="ml-auto" />}
      </div>
      {children}
    </div>
  );
}

export function ExampleBadge({ className }: { className?: string }) {
  return (
    <span className={cn("shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-400", className)}>
      Datos de ejemplo
    </span>
  );
}

export const ars = (n: number) => "$ " + Math.round(n).toLocaleString("es-AR");
