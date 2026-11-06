import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { PageCtx } from "./shims/router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import Home from "@/app/page";
import Market from "@/app/andex-market/page";
import Totems from "@/app/totems/page";

const sectionPage: Record<string, string> = {
  nosotros: "/", testimonios: "/",
  funciones: "/andex-market", compras: "/andex-market", precios: "/andex-market", aida: "/andex-market", modulos: "/andex-market",
  turnero: "/totems", gastronomico: "/totems", verduleria: "/totems", publicitario: "/totems",
};
const pageOf: Record<string, string> = { inicio: "/", "andex-market": "/andex-market", totems: "/totems" };

function App() {
  const [page, setPage] = useState("/");
  useEffect(() => {
    const route = () => {
      const h = location.hash.slice(1);
      if (pageOf[h] !== undefined) { setPage(pageOf[h]); window.scrollTo({ top: 0 }); return; }
      const target = sectionPage[h];
      const scroll = () => document.getElementById(h)?.scrollIntoView({ behavior: "smooth" });
      setPage((cur) => { if (target && target !== cur) { setTimeout(scroll, 150); return target; } setTimeout(scroll, 0); return cur; });
    };
    route(); window.addEventListener("hashchange", route);
    return () => window.removeEventListener("hashchange", route);
  }, []);
  return (
    <PageCtx.Provider value={page}>
      <Navbar />
      <main className="overflow-x-clip" key={page}>
        {page === "/" ? <Home /> : page === "/andex-market" ? <Market /> : <Totems />}
      </main>
      <Footer />
    </PageCtx.Provider>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
