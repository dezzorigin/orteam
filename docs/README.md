# Dokumentasi Orteam

Indeks pusat dokumentasi. Baca dari atas ke bawah untuk onboarding;
tiap berkas berdiri sendiri untuk rujukan cepat.

| Berkas | Isi |
|---|---|
| [PRD.MD](./PRD.MD) | Product Requirements Document — masalah, tujuan, fitur, kriteria sukses |
| [SDD.MD](./SDD.MD) | Software Design Document — keputusan arsitektur & alur data |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arsitektur runtime: Next.js static export, mode demo vs produksi |
| [DESIGN.MD](./DESIGN.MD) | Sistem desain & UI/UX (monokrom, Tailwind v4, shadcn/ui) |
| [SCHEMA.md](./SCHEMA.md) | Skema database Supabase + kebijakan RLS |
| [SECURITY.md](./SECURITY.md) | Keamanan: secret, klasifikasi dependensi, RLS, audit |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy Cloudflare Pages + verifikasi live |
| [DEMO.md](./DEMO.md) | Cara memainkan demo + bukti play-test |
| [DIAGRAMS.html](./DIAGRAMS.html) | Diagram arsitektur, data, dan alur (HTML+SVG) |
| [ROADMAP.md](./ROADMAP.md) | Peta jalan pengembangan per fase |
| [AGENTS.MD](./AGENTS.MD) | Aturan agen AI di workspace ini |
| [README.MD](./README.MD) | Pengantar singkat proyek |

## Ringkasan 30 detik

Orteam adalah workspace kolaborasi tim open-source (MIT): **Kanban board**,
**visual canvas** (node PRD/ERD/catatan yang bisa di-drag), dan **live roadmap**,
di atas **Next.js 16 + Supabase**. Versi yang ter-deploy berjalan dalam
**mode demo** — tanpa daftar, tanpa kunci — dengan data tersimpan di
localStorage; bentuk datanya sama persis dengan skema Supabase produksi.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export ke out/
```

Mode produksi (opsional): salin `.env.example` ke `.env.local` dan isi
`NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
Tanpa itu aplikasi tetap jalan dalam mode demo.

## Status (18 Nov 2026)

- Landing SaaS lengkap: navbar + GitHub, hero + preview, fitur, docs, footer.
- Workspace demo jalan end-to-end: tambah/pindah/hapus task, drag node canvas,
  ganti tim, reset demo — terverifikasi lewat play-test + screenshot.
- CI hijau (build, typecheck, lint, python-tests, advisory-sweep, smoke, docs).
- Live: https://orteam.pages.dev
