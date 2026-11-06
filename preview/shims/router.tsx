import { createContext, useContext } from "react";
export const PageCtx = createContext<string>("/");
export const usePathname = () => useContext(PageCtx);
export const useRouter = () => ({ push: (h: string) => { location.hash = toHash(h); } });
const pages: Record<string, string> = { "/": "inicio", "/andex-market": "andex-market", "/totems": "totems" };
export function toHash(href: string) {
  if (href.startsWith("#")) return href;
  const [path, frag] = href.split("#");
  if (frag) return "#" + frag;
  return "#" + (pages[path] ?? "inicio");
}
