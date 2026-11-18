# 🗺️ Orteam Roadmap & Documentation Index

Peta jalan pengembangan Orteam — diperbarui 18 Nov 2026 (rebuild proper v0.2).

---

## 📚 Indeks Dokumentasi

*   **[README.md](./README.md)**: Indeks pusat + ringkasan 30 detik + status.
*   **[PRD.MD](./PRD.MD)**: Gambaran teknis internal (sumber kebenaran).
*   **[SDD.MD](./SDD.MD)**: Desain sistem — dipisah "yang ada" vs "rencana".
*   **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Arsitektur runtime + riwayat penghapusan.
*   **[DESIGN.MD](./DESIGN.MD)**: Panduan UI/UX (monokrom, Tailwind v4, shadcn/ui).
*   **[SCHEMA.md](./SCHEMA.md)**: Skema database Supabase + RLS.
*   **[SECURITY.md](./SECURITY.md)**: Secret, klasifikasi dependensi, audit.
*   **[DEPLOYMENT.md](./DEPLOYMENT.md)**: Deploy Cloudflare Pages + verifikasi.
*   **[DEMO.md](./DEMO.md)**: Cara demo + bukti play-test.
*   **[DIAGRAMS.html](./DIAGRAMS.html)**: Diagram arsitektur/data/alur (HTML+SVG).
*   **[AGENTS.MD](./AGENTS.MD)**: Aturan agen AI di workspace ini.
*   **[README.MD](./README.MD)**: Pengantar singkat proyek.

---

## 🤖 Kemampuan Agen AI (`.agents/skills/`)

21 skill di `.agents/skills/`: `shadcn` + `ui-ux-pro-max` (UI/komponen),
`supabase` + `supabase-postgres-best-practices` (backend/DB), `codebase-design`
+ `tdd` (arsitektur & pengujian), `research` + `triage` + `grill-me`
(analisa), `resolving-merge-conflicts` + `code-review` (pemeliharaan),
dan sisanya (prototype, implement, teach, wayfinder, wizard, dll).
Skill `ui-ux-pro-max` membawa skrip Python + 36 tes yang dijalankan CI.

---

## 🚀 Peta Jalan Pengembangan

### 🟩 Fase 1: Fondasi, landing & workspace demo — ✅ SELESAI (18 Nov 2026)
- [x] Next.js 16 App Router + Tailwind v4 + shadcn/ui
- [x] Landing page ala SaaS (navbar, hero, preview, fitur, docs, footer)
- [x] Workspace demo: Kanban board + visual canvas + multi-tim
- [x] Skema Supabase awal (users, teams, tasks + RLS)
- [x] CI hijau + docs lengkap + deploy Cloudflare Pages (orteam.pages.dev)

### 🟨 Fase 2: Auth & data live — ⏳ BERIKUTNYA
- [ ] Integrasi Clerk di UI (login/sign-up beneran, ganti CTA demo)
- [ ] Klien Supabase live di workspace (ganti localStorage)
- [ ] Webhook Clerk → upsert users/teams (verifikasi svix)
- [ ] Roadmap & kalender tim
- [ ] Uji RLS end-to-end terhadap Supabase live

### 🟧 Fase 3: Visual workspace real-time — 📋 RENCANA
- [ ] Engine visual (tldraw / React Flow) + node-edge PRD & ERD
- [ ] Sync real-time via Yjs + Supabase Realtime
- [ ] Dokumen kolaboratif

### 🟦 Fase 4: Poles akhir & rilis — 📋 RENCANA
- [ ] Notifikasi email (Resend)
- [ ] QA end-to-end + perbaikan bug
- [ ] Rilis Public Launch
