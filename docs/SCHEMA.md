# Skema Database Orteam

Sumber kebenaran: `supabase/schema.sql`. Terapkan ke proyek Supabase
dengan SQL editor atau `supabase db push` (lihat `docs/DEPLOYMENT.md`).

## Tabel

### `public.users` — disinkronkan dari Clerk

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | TEXT PK | Clerk User ID (`user_2...`) |
| `email` | TEXT NOT NULL | |
| `full_name` | TEXT | |
| `avatar_url` | TEXT | |
| `created_at` / `updated_at` | TIMESTAMPTZ NOT NULL | default `NOW()` |

### `public.teams` — disinkronkan dari Clerk Organizations

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | TEXT PK | Clerk Org ID (`org_2...`) |
| `name` | TEXT NOT NULL | |
| `slug` | TEXT | |
| `image_url` | TEXT | |
| `created_at` / `updated_at` | TIMESTAMPTZ NOT NULL | default `NOW()` |

### `public.tasks` — inti produk

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | default `gen_random_uuid()` |
| `team_id` | TEXT NOT NULL → `teams(id)` | ON DELETE CASCADE |
| `title` | TEXT NOT NULL | |
| `description` | TEXT | |
| `status` | TEXT default `'TODO'` | `TODO` / `DOING` / `DONE` |
| `created_by` | TEXT NOT NULL → `users(id)` | |
| `created_at` | TIMESTAMPTZ NOT NULL | default `NOW()` |

## Row Level Security

RLS aktif di ketiga tabel. Kebijakan di `schema.sql`:

- **users**: `SELECT` hanya bila `id = (auth.jwt() ->> 'sub')` — pengguna
  hanya membaca profilnya sendiri.
- **tasks**: hanya anggota tim (`org_id` di JWT) yang sesuai yang bisa
  melihat/mengubah task tim itu. Anggota tim lain tidak melihat barisnya
  sama sekali — bukan 403, melainkan hasil kosong.

Token JWT yang dipakai adalah token dari template `supabase` di Clerk
(bila Clerk dipakai); tanpa itu, anon key hanya bisa mengakses apa yang
diizinkan policy publik — dan schema ini tidak memberikan akses publik.

## Mode demo memakai skema yang sama

`src/lib/demo-data.ts` men-seed task dengan kolom yang sama persis
(`id`, `team_id`, `title`, `description`, `status`, `created_by`,
`created_at`) dan dua tim seed (`team_core`, `team_pidi`) dengan 9 task
+ 4 node canvas. Jadi demo bukan data asal-asalan: ia adalah baris-baris
yang valid terhadap skema ini, hanya saja tersimpan di localStorage.

## Yang belum ada (jujur)

- Tabel untuk node canvas (`whiteboard_sessions`) dan dokumen/roadmap
  disebut di SDD sebagai rencana fase 2–3 — belum ada di `schema.sql`.
  Jangan diklaim sudah ada.
- Sinkronisasi webhook Clerk (`POST /api/webhooks/clerk`, verifikasi
  svix) didokumentasikan di SDD; endpoint-nya belum diimplementasikan
  karena build ini static export tanpa route handler.
