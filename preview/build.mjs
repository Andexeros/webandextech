import { build } from "esbuild";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
const r = (p) => new URL(p, import.meta.url).pathname;
execSync(`npx tailwindcss -c tailwind.config.ts -i src/app/globals.css -o preview/out.css --minify`, { cwd: r("../"), stdio: "inherit" });
await build({
  entryPoints: [r("./main.tsx")], bundle: true, minify: true, format: "iife", outfile: r("./out.js"),
  jsx: "automatic", loader: { ".webp": "dataurl", ".png": "dataurl" },
  alias: { "next/link": r("./shims/link.tsx"), "next/image": r("./shims/image.tsx"), "next/navigation": r("./shims/router.tsx"), "@": r("../src") },
  define: { "process.env.NODE_ENV": '"production"' },
  tsconfig: r("../tsconfig.json"),
});
const css = readFileSync(r("./out.css"), "utf8");
const js = readFileSync(r("./out.js"), "utf8").replace(/<\/script/g, "<\\/script");
const html = `<!DOCTYPE html><html lang="es-AR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Andex Tech · Vista previa</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>:root{--font-geist-sans:"Geist";--font-geist-mono:"Geist Mono"}${css}</style></head>
<body class="min-h-screen font-sans"><div id="root"></div><script>${js}</script></body></html>`;
writeFileSync(r("./andex-preview.html"), html);
console.log("ok", (html.length / 1048576).toFixed(2), "MB");
