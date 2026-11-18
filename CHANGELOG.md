# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangerot.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-11-18

Rebuild proper (program P1 repo #24). Repo ini sebelumnya hanya berisi
landing page + skema + dokumen rencana; banyak klaim di CHANGELOG lama
("team management page", "project tracking system") menggambarkan rencana,
bukan kode yang ada. Entri di bawah hanya mencatat yang benar-benar
dikerjakan di versi ini.

### Added
- Workspace demo (`/workspace`): Kanban board (tambah/pindah/hapus task,
  TODO/DOING/DONE) + visual canvas (node PRD/ERD/NOTE bisa di-drag) +
  pemilih tim + reset demo — tersimpan di localStorage, seed mengikuti
  `supabase/schema.sql`.
- Landing SaaS lengkap: seksi fitur (6 kartu), seksi docs, footer.
- `.env.example` (template tanpa nilai rahasia).
- CI (`.github/workflows/ci.yml`): build, typecheck, lint, python-tests,
  advisory-sweep, smoke, docs.
- `scripts/advisory-sweep.py` (sweep produksi vs GitHub Advisory DB) dan
  `scripts/serve.mjs` (server statis lokal meniru resolusi Cloudflare Pages).
- Docs lengkap: `docs/README.md`, `ARCHITECTURE.md`, `SCHEMA.md`,
  `SECURITY.md`, `DEPLOYMENT.md`, `DEMO.md`, `DIAGRAMS.html` (HTML+SVG),
  plus PRD/SDD/ROADMAP yang ditulis ulang sesuai kenyataan.
- Screenshot asli + video demo (`docs/screenshots/`, `docs/demo/demo.mp4`).
- Deploy live: https://orteam.pages.dev (proyek Pages `orteam`).

### Changed
- `shadcn` (CLI) dipindah dari `dependencies` ke `devDependencies`.
- Next.js 16.3.0 → 16.4.6; nama paket `temp-app` → `orteam`.
- Klien Supabase ditulis ulang tanpa Clerk (Clerk jadi integrasi opsional
  yang didokumentasikan).
- Link GitHub navbar diperbaiki: `bedegoist/orteam` → `dezzorigin/orteam`.
- CTA `/sign-in` / `/sign-up` (rute tak pernah ada) → `/workspace`.
- Package manager disederhanakan pnpm → npm (`package-lock.json`).
- `.gitignore` dibersihkan (pola `^.env$` yang salah + duplikat dihapus;
  `.env.example` dikecualikan dari ignore).

### Removed
- `src/middleware.ts` — middleware Clerk yang mengimpor paket tak
  terinstal (`@clerk/nextjs`); build gagal + runtime throw tanpa key.
- `send-email.js` — skrip tes Resend sekali pakai (placeholder, dead code).

### Fixed
- Build yang sebelumnya tidak bisa jalan (middleware Clerk + dependensi
  hilang) kini hijau: typecheck + lint 0 error + `next build` sukses.
- Rute `/workspace` yang sebelumnya 404 kini menyajikan workspace demo.

### Security
- Pindai secret: tidak ada secret asli ter-commit (`re_xxxxxxxxx` di
  `send-email.js` adalah placeholder; file sudah dihapus).
- Advisory sweep produksi: 81 paket, 0 high/critical (18 Nov 2026).

## [1.0.0] - 2024-11-05

### Added
- Initial Orteam project setup
- Team management system
- Project tracking functionality
- Supabase database integration
- Responsive design
