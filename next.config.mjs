/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      { source: "/paltasys", destination: "/andex-market", permanent: true },
      { source: "/palta-sys", destination: "/andex-market", permanent: true },
    ];
  },
};
export default nextConfig;
