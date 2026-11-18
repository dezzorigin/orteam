import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export untuk Cloudflare Pages. Tidak ada Route Handler dinamis
  // atau middleware di build ini — auth (Clerk) dan data (Supabase) adalah
  // integrasi opsional yang didokumentasikan di docs/ARCHITECTURE.md;
  // workspace demo berjalan sepenuhnya di sisi klien (localStorage).
  output: "export",
};

export default nextConfig;
