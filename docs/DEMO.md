# Demo Orteam

## Cara mencoba (2 menit)

1. Buka https://orteam.pages.dev — landing tampil tanpa daftar.
2. Klik **Start for free** (atau **Log in**) → masuk `/workspace`.
3. **Kanban**: ketik judul di input bawah kolom (mis. "Siapkan demo day"),
   tekan Enter — task muncul di kolom itu. Klik `→` untuk memindahkan
   ke kolom berikut, `←` untuk kembali, ikon tempat sampah untuk hapus.
4. **Visual Canvas**: klik tab **Visual Canvas**, seret node PRD/ERD/
   catatan ke mana saja. Klik **Tambah node** untuk node baru, `×`
   untuk menghapus.
5. **Ganti tim**: pemilih tim di kanan atas (Orteam Core / Hackathon PIDI).
   Data tiap tim terpisah.
6. **Reset demo**: mengembalikan seed awal (9 task, 4 node).

Semua perubahan tersimpan di localStorage browser — refresh halaman
dan datamu tetap ada; buka di browser lain dan kembali ke seed.

## Bukti play-test (18 Nov 2026, lokal + live)

Play-test dilakukan lewat headless Chrome (Puppeteer) terhadap build
produksi yang disajikan `scripts/serve.mjs`:

- Tambah task "Verifikasi play-test: tambah task dari UI" lewat input —
  **muncul di kolom To Do**.
- Pindah task pertama TODO → DOING lewat tombol `→` — **kolom Doing
  bertambah dari 2 ke 3, To Do berkurang ke 2**.
- Tab Visual Canvas — **3 node seed ter-render** (PRD, ERD, NOTE).
- Ganti tim — filter bekerja (seed tim PIDI: 3 task, 1 node).

Screenshot: `docs/screenshots/` (01 hero, 02 full landing, 03 kanban,
04 kanban setelah tambah+pindah task, 05 canvas, 06 mobile).
Video demo: `docs/demo/demo.mp4` (15 detik, 1280×720, slideshow dari
screenshot di atas).

## Yang TIDAK didemo (jujur)

- Login Clerk / Supabase live — tidak ada kredensial di repo ini;
  mode demo adalah produk yang di-deploy.
- Sinkronisasi real-time antar pengguna (Yjs/Supabase Realtime) —
  rencana fase 3 di SDD, belum diimplementasikan.
- Email (Resend) — skrip tes lama dihapus; bukan fitur demo.
