# Arsitektur Orteam

## Ringkasan

Orteam adalah aplikasi **Next.js 16 (App Router) + React 19** yang di-deploy
sebagai **static export** ke Cloudflare Pages. Tidak ada server Node, route
handler dinamis, atau middleware yang berjalan di produksi. Ada dua mode:

| Mode | Data | Auth | Kapan |
|---|---|---|---|
| **Demo** (default) | localStorage (`orteam-demo-v1`) | tidak ada — langsung masuk workspace | Tanpa env apa pun |
| **Produksi** (opsional) | Supabase Postgres + RLS | Clerk (opsional) | Bila `.env.local` diset |

Mode demo bukan pura-pura jalan: Kanban dan canvas benar-benar berfungsi,
dan bentuk barisnya sama persis dengan skema produksi (`supabase/schema.sql`),
jadi migrasi tinggal mengganti sumber baca.

## Peta rute

| Rute | Jenis | Isi |
|---|---|---|
| `/` | Server Component (statis) | Landing SaaS: navbar, hero, preview produk, fitur, docs, footer |
| `/workspace` | Client Component | Kanban board + visual canvas, pemilih tim, reset demo |
| `/_not-found` | Statis | Halaman 404 bawaan Next |

## Kenapa static export

- Produk ini tidak butuh server untuk demo: semua interaksi demo terjadi di klien.
- Cloudflare Pages menyajikan file statis langsung; tidak ada cold start.
- Konsekuensinya: tidak ada API route. Logika yang butuh server (webhook
  Clerk, admin Supabase) didokumentasikan di sini dan di `docs/SCHEMA.md`,
  bukan di-deploy setengah jalan.

## Yang dihapus saat rebuild (18 Nov 2026) dan alasannya

1. **`src/middleware.ts` (Clerk)** — mengimpor `@clerk/nextjs/server`
   padahal paket itu TIDAK ada di `package.json`. Build gagal di typecheck,
   dan tanpa publishable key pun middleware akan throw saat runtime.
   Dihapus; Clerk kembali sebagai integrasi opsional yang didokumentasikan,
   bukan sebagai dependensi yang merusak build.
2. **`src/lib/supabase/client.ts` & `server.ts` (versi Clerk)** — ditulis
   ulang tanpa Clerk: klien Supabase standar (`@supabase/ssr`) yang
   mengembalikan `null` bila env tidak diset. RLS di `schema.sql` tetap
   menjadi penjaga akses.
3. **`send-email.js`** — skrip tes Resend sekali pakai (placeholder
   `re_xxxxxxxxx`, bukan kunci asli) dengan dependensi `resend` yang tidak
   terinstal. Dead code; dihapus. Pengiriman email produksi didokumentasikan
   di SDD sebagai fase 4, bukan diwujudkan sebagai file rusak.
4. **Link GitHub navbar** — menunjuk `bedegoist/orteam` (akun lama/salah).
   Diperbaiki ke `dezzorigin/orteam`.
5. **Tautan `/sign-in` & `/sign-up`** — rute itu tidak pernah ada (404).
   CTA kini mengarah ke `/workspace` (demo langsung jalan).
6. **`shadcn` di `dependencies`** — itu CLI scaffolding, bukan runtime.
   Dipindah ke `devDependencies` (pelajaran repo #22: 57 temuan HIGH karena
   klasifikasi ini). Tidak ada kode runtime yang mengimpor `shadcn`.
7. **pnpm → npm** — repo memakai `pnpm-lock.yaml` + `pnpm-workspace.yaml`
   untuk satu paket tanpa workspace. Disederhanakan ke npm
   (`package-lock.json`) agar CI `npm ci` konsisten dengan repo Next
   sebelumnya (#19–#23).
8. **Next 16.3.0 → 16.4.6** — mengikuti pola repo #23 (temuan advisory di
   16.2.3 hijau setelah upgrade ke 16.4.6). Hasil sweep: 81 paket produksi,
   0 high/critical.

## Dependensi runtime

Next 16.4.6, React 19, Tailwind v4 (+ `@tailwindcss/postcss`,
`tw-animate-css`), shadcn/ui (`@base-ui/react`, `class-variance-authority`,
`clsx`, `tailwind-merge`), `lucide-react`, `@supabase/ssr` +
`@supabase/supabase-js`, `jose`. Detail + hasil audit: `docs/SECURITY.md`.

## Alur data mode demo

```
seed (demo-data.ts, bentuk = schema.sql)
  → useState (prerender = seed, tanpa hydration mismatch)
  → effect mount: timpa dengan localStorage bila ada
  → tiap mutasi: setState + saveState() ke localStorage
```

Alur data mode produksi (bila env diset — belum diimplementasikan di UI,
didokumentasikan agar tidak diklaim sudah ada):

```
Server Component → createSupabaseServerClient() → Supabase + RLS
Webhook Clerk → upsert users/teams (endpoint didokumentasikan di SDD)
```

## Catatan Next 16

- `output: "export"` di `next.config.ts`. Build menulis `out/`.
- Next 16 menulis artefak debug `__next.*.txt` per rute (mis. `out/workspace/`
  berisi `__next._full.txt` — BUKAN halaman). Server lokal berbasis direktori
  (`python -m http.server`) salah menyajikan rute itu sebagai directory
  listing; `scripts/serve.mjs` meniru resolusi Cloudflare Pages
  (`/workspace` → `workspace.html`, terbukti live di my-dayz `/dashboard`).
- Ikon brand GitHub tidak lagi diekspor `lucide-react` — mark GitHub di
  landing memakai inline SVG (`GithubIcon` di `src/app/page.tsx`).
- Aturan lint React 19 di Next 16 melarang `Date.now()` / `Math.random()`
  di render dan `setState` sinkron di effect; workspace memakai counter
  `useRef` untuk id dan satu `eslint-disable` beralasan di effect pemuatan
  localStorage (lihat komentar di kode).
