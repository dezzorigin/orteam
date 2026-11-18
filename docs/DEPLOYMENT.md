# Deployment Orteam

## Live

**https://orteam.pages.dev** — Cloudflare Pages, proyek `orteam`.

## Cara deploy (direct upload via API)

Repo ini memakai `~/workspace/github-actions/cf_pages.py`
(direct-upload deploy ala wrangler v4 — upload-token JWT → check-missing →
assets/upload → create deployment):

```bash
cd ~/workspace/orteam
npm ci
npm run build          # static export ke out/
python3 ~/workspace/github-actions/cf_pages.py create-project orteam
python3 ~/workspace/github-actions/cf_pages.py deploy orteam out
```

Nama `orteam` didapat bersih (tanpa sufiks) pada percobaan pertama —
tidak perlu fallback `or-team` / `tim-or`.

## Kenapa bukan GitHub-connected Pages

Deploy dilakukan via API dari VM ini agar hasilnya deterministik dan
terverifikasi di tempat yang sama dengan build. Proyek Pages tidak
terhubung ke repo GitHub (tidak ada auto-deploy per push); deploy ulang
adalah perintah eksplisit di atas.

## Perilaku Pages yang perlu diketahui

- Path extensionless disajikan dari `<path>.html` (`/workspace` →
  `out/workspace.html`). Ini TERBUKTI: pola yang sama live di
  `my-dayz.pages.dev/dashboard` = 200.
- Next 16 menulis direktori `out/workspace/` berisi artefak debug
  `__next.*.txt`. Itu BUKAN halaman dan tidak mengganggu Pages — tapi
  server lokal berbasis direktori (`python -m http.server`) akan
  menampilkan directory listing untuk rute itu. Gunakan
  `scripts/serve.mjs` untuk play-test lokal (meniru resolusi Pages).
- Tidak ada `_worker.js` / Functions: deploy ini 100% statis.

## Verifikasi live (18 Nov 2026)

| Cek | Hasil |
|---|---|
| `GET https://orteam.pages.dev/` | 200, hero "The smart workspace for your team." |
| `GET https://orteam.pages.dev/workspace` | 200, Kanban Board + seed task ter-render |
| Link GitHub di navbar | `github.com/dezzorigin/orteam` |
| Play-test live | tambah task + pindah kolom jalan (lihat `docs/DEMO.md`) |

## Deploy Supabase (opsional, produksi)

1. Buat proyek di Supabase, jalankan isi `supabase/schema.sql` di SQL editor.
2. Salin `.env.example` → `.env.local`, isi `NEXT_PUBLIC_SUPABASE_URL`
   dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. (Opsional, Clerk) Buat JWT template `supabase` di Clerk dan isi
   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`.
4. Catatan: UI produksi yang membaca Supabase belum diimplementasikan —
   build ini static export + mode demo. Jangan deploy Supabase lalu
   mengklaim UI sudah terhubung sebelum ada implementasi + tesnya.
