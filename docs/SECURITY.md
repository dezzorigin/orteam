# Keamanan Orteam

## Secret — hasil pemindaian 18 Nov 2026

- **Tidak ada secret asli yang ter-commit.** Pemindaian seluruh tree
  (di luar `node_modules`) tidak menemukan kunci API, token, atau
  kredensial aktif.
- `send-email.js` berisi `re_xxxxxxxxx` — itu **placeholder**, bukan kunci
  Resend asli. File tersebut sudah dihapus saat rebuild karena dead code
  (dependensi `resend` tidak terinstal).
- Tidak ada file `.env` di repo. `.env.example` berisi placeholder tanpa
  nilai rahasia. `.gitignore` mengabaikan `.env` dan `.env.*` kecuali
  `.env.example`.
- `SERVICE_ROLE_KEY` (bila dipakai di produksi) hanya boleh ada di server
  / `.env.local` — tidak pernah di klien, tidak pernah di-commit.
  `src/lib/supabase/server.ts` mendokumentasikan aturan ini di komentar.

## Klasifikasi dependensi

- `shadcn` (CLI scaffolding) dipindah dari `dependencies` ke
  `devDependencies`. Pelajaran repo #22: saat duduk di `dependencies` ia
  menyeret MCP SDK, express, dotenvx, undici ke klasifikasi produksi —
  57 temuan HIGH/CRITICAL di CI pertama. Tidak ada kode runtime yang
  mengimpor `shadcn`.
- Gate keamanan di CI bukan `npm audit --omit=dev` (bug npm: tetap
  melaporkan advisory dev-only) melainkan `scripts/advisory-sweep.py`
  yang memeriksa HANYA dependensi produksi terhadap GitHub Advisory
  Database dan FAIL bila ada high/critical. Hasil 18 Nov 2026:
  **81 paket produksi, 0 temuan high/critical**.
- Next.js di-upgrade 16.3.0 → **16.4.6** (pola repo #23).

## RLS

Lihat `docs/SCHEMA.md`. Prinsip: database yang menjaga, bukan hanya UI.
Pengguna hanya membaca profil sendiri; task hanya terlihat oleh anggota
tim pemilik. Klien admin (`createAdminSupabaseClient`, melewati RLS)
hanya tersedia di server dan hanya bila service-role key diset.

## Yang belum diaudit

- Kebijakan RLS di `schema.sql` belum diuji end-to-end terhadap Supabase
  live (tidak ada proyek Supabase untuk repo ini saat rebuild). Jangan
  klaim RLS "terverifikasi" sebelum ada tes tersebut.
- Tidak ada rate limiting / CAPTCHA — di luar cakupan mode demo.
