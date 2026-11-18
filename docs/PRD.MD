# 📖 Orteam Internal Technical Documentation

Dokumen ini adalah sumber kebenaran internal untuk **Orteam** — ditulis ulang
18 Nov 2026 agar sesuai dengan kode yang benar-benar ada, bukan rencana lama.
Bila ada konflik antara dokumen ini dan kode, kode yang menang; laporkan
konfliknya sebagai issue.

---

## 🌟 1. Ringkasan teknis

**Orteam** adalah workspace kolaborasi tim open-source (MIT) untuk startup
tahap awal, tim hackathon, dan mahasiswa: Kanban board, visual canvas, dan
live roadmap dalam satu platform. Stack: **Next.js 16 + React 19 + Tailwind
v4 + shadcn/ui**, **Supabase** (Postgres + RLS) sebagai backend opsional,
**Python** hanya untuk skill scripts di `.agents/skills/`.

### Dua mode

| Mode | Data | Auth | Syarat |
|---|---|---|---|
| Demo (default, yang ter-deploy) | localStorage | tidak ada | tanpa env |
| Produksi (opsional) | Supabase | Clerk (opsional) | `.env.local` diset |

### Sistem inti (yang benar-benar ada)

1. **Landing SaaS** (`src/app/page.tsx`) — navbar, hero, preview produk,
   fitur, docs, footer.
2. **Workspace demo** (`src/app/workspace/page.tsx`) — Kanban + canvas,
   state di `src/lib/demo-data.ts` + localStorage.
3. **Skema Supabase** (`supabase/schema.sql`) — `users`, `teams`, `tasks` + RLS.
4. **Klien Supabase** (`src/lib/supabase/`) — tanpa Clerk; `null` bila env
   tidak diset.

### Sistem yang DIRENCANAKAN (belum ada — jangan diklaim)

Visual engine real-time (tldraw/React Flow + Yjs), sinkronisasi WebSocket,
dokumen kolaboratif, kalender, webhook Clerk, email Resend. Detail rencana
tetap tercatat di `docs/SDD.MD` sebagai desain, bukan sebagai fitur.

---

## 🛠️ 2. Arsitektur & stack

Lihat `docs/ARCHITECTURE.md` (ringkas) dan `docs/DIAGRAMS.html` (diagram).
Poin penting:

- **Framework:** Next.js 16.4.6 App Router, `output: "export"` — deploy
  statis ke Cloudflare Pages. Tidak ada route handler / middleware aktif.
- **UI:** React 19, Tailwind CSS v4, shadcn/ui, lucide-react. Filosofi
  desain di `docs/DESIGN.MD`: monokrom, content-first, zero bloat.
- **Data demo:** `src/lib/demo-data.ts` — seed 2 tim, 9 task, 4 node;
  bentuk baris = `schema.sql` persis.
- **Data produksi:** Supabase Postgres + RLS (`docs/SCHEMA.md`).
- **Python:** skrip skill `ui-ux-pro-max` (stdlib-only, 36 tes unittest).

---

## 🧭 3. Indeks dokumen

| Dokumen | Isi |
|---|---|
| `docs/README.md` | Indeks + ringkasan 30 detik + status |
| `docs/PRD.MD` | Dokumen ini (gambaran teknis internal) |
| `docs/SDD.MD` | Desain sistem mendalam |
| `docs/ARCHITECTURE.md` | Arsitektur runtime + riwayat penghapusan |
| `docs/DESIGN.MD` | Sistem desain & UI/UX |
| `docs/SCHEMA.md` | Skema DB + RLS |
| `docs/SECURITY.md` | Secret, dependensi, RLS |
| `docs/DEPLOYMENT.md` | Deploy Pages + verifikasi live |
| `docs/DEMO.md` | Cara demo + bukti play-test |
| `docs/DIAGRAMS.html` | Diagram (HTML+SVG) |
| `docs/ROADMAP.md` | Peta jalan per fase |
| `README.md` / `PRD.md` (root) | Wajah repo + PRD formal |

---

## 🤖 4. Skill agen AI (`.agents/skills/`)

21 skill ter-commit di `.agents/skills/` (code-review, codebase-design,
diagnosing-bugs, domain-modeling, find-skills, frontend-design, grill-me,
implement, improve-codebase-architecture, prototype, research,
resolving-merge-conflicts, shadcn, supabase, supabase-postgres-best-practices,
tdd, teach, triage, ui-ux-pro-max, wait-what, wayfinder, wizard,
writing-for-agents). Skill `ui-ux-pro-max` membawa skrip Python +
36 tes yang dijalankan CI (`python-tests`). Skill lain berupa dokumen
panduan; tidak dieksekusi CI.

---

## 🚀 5. Status & roadmap singkat

- ✅ Fase 1 (fondasi, landing, workspace demo, CI, docs, deploy) — 18 Nov 2026.
- ⏳ Fase 2: auth Clerk + Supabase live di UI, roadmap & kalender.
- ⏳ Fase 3: visual workspace real-time.
- ⏳ Fase 4: email Resend, QA end-to-end, rilis publik.

Detail: `docs/ROADMAP.md`.
