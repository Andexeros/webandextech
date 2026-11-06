import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1240px" } },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        ink: { 950: "#05070A", 900: "#0A0E13", 850: "#0E131A", 800: "#131A22", 700: "#1C2530", 600: "#2A3542" },
        gold: { 300: "#FFD766", 400: "#F5C21B", 500: "#E9B000", 600: "#D89005" },
        mint: { 300: "#7EE2B8", 400: "#3FCF8E", 500: "#1FA971", 700: "#145C43" },
        slatey: "#4C6971",
        cream: { DEFAULT: "#F5F0E6", 50: "#FBF8F2", 100: "#F8F4EC", 200: "#ECE5D6", 300: "#DDD3BF" },
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        shine: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
      },
      animation: {
        marquee: "marquee var(--marquee-duration,40s) linear infinite",
        shine: "shine 6s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
