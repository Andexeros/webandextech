# Andex Tech · Sitio web

Sitio de Andex Tech con foco en **Andex Market** (antes Palta Sys) y los tótems de autoservicio.

- Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion
- Páginas: `/` (inicio), `/andex-market`, `/totems`
- `/paltasys` redirige automáticamente a `/andex-market` (301)
- El formulario de demo abre WhatsApp con los datos cargados (no necesita backend)

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
```

## Publicar en Vercel

1. Subí esta carpeta a tu repo de GitHub.
2. En Vercel: **Add New → Project**, importá el repo. Vercel detecta Next.js solo; no hace falta configurar nada.
3. Conectá el dominio `andex.tech` en **Settings → Domains**.

## Dónde editar

| Qué | Archivo |
|---|---|
| WhatsApp, email, Instagram | `src/lib/utils.ts` |
| Textos e info de tótems | `src/lib/totems.ts` |
| Página Andex Market y módulos | `src/app/andex-market/page.tsx` |
| Demos interactivas (compras, precios, AIDA) | `src/components/market/` |
| Línea de tiempo | `src/components/site/Timeline.tsx` |
| Testimonios | `src/components/site/Testimonials.tsx` |
| Imágenes | `public/img/` (WebP optimizadas) |

Las cifras de las demos de Andex Market son datos de ejemplo y están marcadas así en la interfaz.
