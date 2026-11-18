# 🏗️ Orteam Software Design Document (SDD)

Dokumen ini merinci keputusan arsitektur dan alur data Orteam. Ditulis ulang
18 Nov 2026: bagian "yang ada" vs "yang direncanakan" dipisah secara
eksplisit — versi lama mencampur keduanya sehingga terbaca seolah semua
sudah diimplementasikan.

---

## 1. Konteks sistem — YANG ADA

Orteam v0.2 adalah **aplikasi statis** (Next.js static export) yang
di-deploy ke Cloudflare Pages. Tidak ada server aplikasi yang berjalan.

### Bounded context yang ada

1. **Presentasi (Next.js App Router):** landing `/` + workspace
   `/workspace`. Semua interaksi demo terjadi di klien.
2. **State demo (localStorage):** `orteam-demo-v1`, bentuk baris =
   `schema.sql`. Seed di `src/lib/demo-data.ts`.
3. **Persistensi produksi (Supabase):** Postgres + RLS, skema di
   `supabase/schema.sql`. Klien di `src/lib/supabase/` (tanpa Clerk).
   Aktif hanya bila env diset; UI produksi belum diimplementasikan.

### Bounded context yang DIRENCANAKAN (desain saja)

- **Identity & tenant (Clerk):** JWT template `supabase`, webhook sync
  `users`/`teams`. Desain lama menyebut "Cloudflare Access" di beberapa
  dokumen — itu tidak konsisten dengan `schema.sql` (Clerk ID) dan
  middleware lama (Clerk). Keputusan: **Clerk** adalah jalur auth yang
  didokumentasikan; sebutan Cloudflare Access dihapus dari dokumen baru.
- **Sync engine (Yjs + WebSockets):** whiteboard & docs real-time.
- **Cache (Upstash Redis):** belum ada kebutuhan di mode demo/statis.

---

## 2. Alur data

### 2.1 Mutasi di mode demo (yang ada)

```text
[Input kolom] ──(Enter)──► [addTask(status)] ──► [setState]
                                                          │
                                               [saveState()]
                                                          ▼
                                                 [localStorage]
```

Pindah kolom: `moveTask(id, ±1)` mengubah `status` (TODO ⇄ DOING ⇄ DONE)
lalu menyimpan. Hapus: filter keluar dari array. Semua sinkron, tanpa
request jaringan. Detail + bukti play-test: `docs/DEMO.md`.

### 2.2 Mutasi di mode produksi (desain, belum diimplementasikan)

```text
[Client UI] ──(form)──► [Server Action / Route Handler]
                              ├──► validasi JWT (Clerk)
                              ├──► validasi skema (Zod)
                              ▼
                       [Supabase DB + RLS]
                              │
[Client UI] ◄── revalidate ───┘
```

Tidak ada Server Action / Route Handler di build ini karena static
export menolaknya. Desain ini dicatat agar implementasi fase 2 tidak
mulai dari nol — bukan klaim bahwa ia sudah jalan.

### 2.3 Webhook ingestion (desain)

Endpoint yang direncanakan: `POST /api/webhooks/clerk`, verifikasi
svix, upsert ke `users` / `teams` saat `user.created` /
`organization.created`. Belum diimplementasikan.

---

## 3. Mesin kolaborasi real-time (RENCANA)

Desain lama (dipertahankan sebagai rencana fase 3): CRDT via Yjs untuk
whiteboard/docs, awareness (posisi kursor) via Supabase Realtime Presence
(tidak disimpan), persistensi state biner Yjs ke Redis lalu flush berkala
ke Postgres (`whiteboard_sessions.data` — tabel ini BELUM ada di
`schema.sql`). Versi demo saat ini mengganti seluruh mesin ini dengan
node draggable + localStorage — cukup untuk membuktikan UX canvas,
bukan kolaborasi multipemain.

---

## 4. Keputusan arsitektur (ADR singkat)

| # | Keputusan | Alasan | Status |
|---|---|---|---|
| 1 | Static export ke Pages | Demo tanpa server; deploy deterministik | ✅ |
| 2 | Hapus middleware Clerk | Paket tak terinstal; build gagal | ✅ 18 Nov 2026 |
| 3 | Klien Supabase tanpa Clerk | Lepas dependensi rusak; RLS tetap | ✅ |
| 4 | Seed demo = bentuk schema.sql | Migrasi demo → produksi tanpa ubah bentuk | ✅ |
| 5 | npm ganti pnpm | Satu paket, tanpa workspace | ✅ |
| 6 | Next 16.4.6 | Advisory bersih (pola repo #23) | ✅ |
| 7 | `scripts/serve.mjs` | Python http.server salah sajikan rute Next 16 | ✅ |
| 8 | Clerk sebagai jalur auth | Konsisten dengan schema.sql (Clerk ID) | Diputuskan |
| 9 | Yjs + Realtime fase 3 | Butuh desain matang; bukan MVP | Rencana |
| 10 | Resend fase 4 | Email bukan inti workspace | Rencana |

---

## 5. Struktur kode

```
src/app/                 / (landing) + /workspace (demo) + layout + globals
src/components/ui/       button.tsx (shadcn/ui)
src/lib/demo-data.ts     tipe + seed + load/save localStorage
src/lib/supabase/        client.ts + server.ts (tanpa Clerk)
src/lib/utils.ts         cn()
supabase/schema.sql      users / teams / tasks + RLS
scripts/                 advisory-sweep.py, serve.mjs
docs/                    semua lapisan dokumentasi
.agents/skills/          21 skill agen (1 dengan skrip Python + tes)
```
