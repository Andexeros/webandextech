import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.andex.tech"),
  title: { default: "Andex Tech · Tecnología e IA para comercios", template: "%s · Andex Tech" },
  description: "Andex Tech combina hardware, software e inteligencia artificial para comercios: Andex Market, el punto de venta con IA, y tótems de autoservicio a medida.",
  openGraph: { title: "Andex Tech", description: "Punto de venta con IA y tótems de autoservicio para comercios.", url: "https://www.andex.tech", siteName: "Andex Tech", locale: "es_AR", type: "website" },
};
export const viewport: Viewport = { themeColor: "#05070A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen font-sans">
        <Navbar />
        <main className="overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
