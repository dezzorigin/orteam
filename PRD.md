# PRD — Orteam

## 1. Informasi Proyek

| Field | Nilai |
|---|---|
| Nama Proyek | Orteam |
| Deskripsi | Workspace kolaborasi tim open-source: Kanban, visual canvas, live roadmap |
| Tech Stack | Next.js 16 + React 19 + Tailwind v4 + Supabase (opsional) + Python (skill scripts) |
| Status | Beta — landing + workspace demo live di Cloudflare Pages |
| Live | https://orteam.pages.dev |
| Penanggung Jawab | Nabil Aulia Dika (dezzorigin) |
| Versi Dokumen | 2.0 (rebuild proper, 18 Nov 2026) |
| Tanggal | 2026-11-18 |

## 2. Latar Belakang

Tim kecil (startup tahap awal, tim hackathon, mahasiswa) butuh satu tempat
untuk mengatur task, memetakan ide secara visual, dan melihat roadmap —
tanpa membayar tiga langganan berbeda. Orteam menyatukan ketiganya dalam
satu workspace open-source (MIT) yang bisa dijalankan sendiri.

## 3. Masalah yang Diselesaikan

- Task tersebar di chat dan catatan — tidak ada sumber kebenaran tunggal.
- Perencanaan visual (PRD/ERD) terpisah dari eksekusi (task).
- Tools kolaborasi yang ada berbayar per kursi dan mengunci data.
- Onboarding tool baru lambat karena butuh akun + konfigurasi.

## 4. Tujuan & Sasaran

- Pengguna bisa mencoba workspace dalam < 1 menit, tanpa daftar (mode demo).
- Kanban dan canvas benar-benar berfungsi end-to-end, bukan mockup.
- Data demo berbentuk sama dengan skema produksi agar migrasi mulus.
- Dokumentasi lengkap dari PRD sampai deployment.

## 5. Ruang Lingkup

### In Scope (v0.2 — sudah live)

- Landing SaaS: navbar + GitHub, hero + preview produk, fitur, docs, footer.
- Workspace demo: Kanban (tambah/pindah/hapus task), visual canvas
  (tambah/drag/hapus node), pemilih tim, reset demo.
- Skema Supabase `users` / `teams` / `tasks` + RLS.
- CI hijau + deploy Cloudflare Pages + docs lengkap.

### Out of Scope (fase berikut)

- Auth Clerk + webhook sync (didokumentasikan, belum diimplementasikan).
- Real-time multiplayer (Yjs / Supabase Realtime).
- Roadmap & kalender, dokumen kolaboratif, notifikasi email.
- Klien Supabase live di UI (mode produksi).

## 6. Fitur & Persyaratan Fungsional

| ID | Fitur | Kriteria terima |
|---|---|---|
| F1 | Landing page | Hero, preview, 6 kartu fitur, docs, footer; link GitHub benar |
| F2 | Kanban board | 3 kolom TODO/DOING/DONE; tambah via Enter; pindah ← →; hapus; tersimpan di localStorage |
| F3 | Visual canvas | Node PRD/ERD/NOTE bisa di-drag; tambah & hapus; posisi tersimpan |
| F4 | Multi-tim | 2 tim seed; ganti tim memfilter task & node; data tim lain utuh |
| F5 | Reset demo | Mengembalikan seed awal (9 task, 4 node) |
| F6 | Skema + RLS | `schema.sql` menerapkan 3 tabel + RLS; didokumentasikan |
| F7 | CI | build + typecheck + lint + python-tests + advisory-sweep + smoke + docs hijau |

## 7. Persyaratan Non-Fungsional

- **Performa:** static export; landing < 1 MB JS awal; tanpa server.
- **Keamanan:** tanpa secret ter-commit; `shadcn` di devDeps; sweep
  advisory produksi 0 high/critical; RLS per baris di skema.
- **Maintainability:** TypeScript strict, lint 0 error, docs per layer.
- **Portabilitas:** Linux/macOS/Windows; Node 20+; deploy ulang = 1 perintah.

## 8. Arsitektur & Tech Stack

Lihat `docs/ARCHITECTURE.md` dan `docs/DIAGRAMS.html`. Ringkas: Next.js
static export → Cloudflare Pages; mode demo localStorage; mode produksi
Supabase + Clerk (opsional).

## 9. Milestone / Roadmap

| Fase | Status |
|---|---|
| Fondasi & landing | ✅ (v0.2, 18 Nov 2026) |
| Workspace demo (Kanban + canvas) | ✅ (v0.2, 18 Nov 2026) |
| CI + docs + deploy Pages | ✅ (v0.2, 18 Nov 2026) |
| Auth Clerk + Supabase live di UI | ⏳ fase 2 |
| Roadmap & kalender, docs kolaboratif | ⏳ fase 2 |
| Visual workspace real-time (Yjs) | ⏳ fase 3 |
| Notifikasi email (Resend) | ⏳ fase 4 |

Detail: `docs/ROADMAP.md`.

## 10. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Konfigurasi env bocor | `.gitignore` + `.env.example` tanpa nilai |
| Dependency usang / rentan | advisory-sweep CI (prod-only) + upgrade Next berkala |
| Klaim fitur yang belum ada | DEMO.md menulis eksplisit apa yang TIDAK didemo |
| RLS belum dites live | SECURITY.md menandai statusnya; jangan klaim terverifikasi |
| Server lokal salah sajikan rute | `scripts/serve.mjs` meniru resolusi Pages |

## 11. Kriteria Keberhasilan

- Aplikasi berjalan tanpa error di dev dan di Pages live.
- Play-test end-to-end (tambah + pindah task, drag node) lolos + screenshot.
- README berisi screenshot asli + video demo.
- CI hijau di PR dan di main; 0 secret ter-commit.

## 12. Lampiran

- Arsitektur: `docs/ARCHITECTURE.md`, diagram: `docs/DIAGRAMS.html`
- Skema: `supabase/schema.sql` + `docs/SCHEMA.md`
- Demo & bukti: `docs/DEMO.md`, `docs/screenshots/`, `docs/demo/demo.mp4`
- Lisensi: MIT (LICENSE)
