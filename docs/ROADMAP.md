# 🗺️ Orteam Roadmap & Documentation Index

Selamat datang di Roadmap dan Pusat Dokumentasi **Orteam**. File ini berfungsi sebagai panduan utama (peta jalan) pengembangan proyek, serta daftar referensi lengkap untuk semua dokumen `.md` dan agen AI (skills) yang tersedia di repositori ini.

---

## 📚 Indeks Dokumentasi (Referensi `.md`)

Berikut adalah struktur dokumen yang saat ini mengatur dan merencanakan pengembangan Orteam:

*   **[README.md](./README.MD)**: Wajah utama proyek. Berisi pengenalan Orteam, Tech Stack (Next.js, Supabase, Cloudflare Access), dan cara menjalankan aplikasi di *local environment*.
*   **[PRD.MD](./PRD.MD)**: *Product Requirements Document*. Menjabarkan secara detail fitur-fitur utama (Visual Workspace, Task Management, dll), target audiens, dan spesifikasi produk.
*   **[SDD.MD](./SDD.MD)**: *Software Design Document*. Penjelasan teknis mengenai arsitektur sistem, skema *database*, dan alur data antar komponen.
*   **[DESIGN.MD](./DESIGN.MD)**: Panduan UI/UX. Berisi sistem desain, *color palette* (putih dominan & aksen hitam), tipografi, dan aturan *styling* menggunakan TailwindCSS + shadcn/ui.
*   **[AGENTS.MD](./AGENTS.MD)**: Aturan global dan instruksi khusus untuk Agen AI yang bekerja di dalam *workspace* ini.

---

## 🤖 Kemampuan Agen AI (`.agents/skills/`)

Proyek ini dilengkapi dengan berbagai *skills* khusus (di dalam folder `.agents/skills/`) untuk membantu pengembangan lebih cepat. Beberapa *skills* penting yang bisa digunakan oleh agen meliputi:

*   **UI & Komponen (`shadcn`, `ui-ux-pro-max`)**: Digunakan untuk membangun dan merancang UI yang estetik, konsisten, dan *responsive*.
*   **Backend & Database (`supabase`)**: Membantu mengelola arsitektur database PostgreSQL, Autentikasi, dan Edge Functions.
*   **Pengembangan & Arsitektur (`codebase-design`, `tdd`)**: Digunakan untuk merancang arsitektur kode yang bersih dan melakukan *Test-Driven Development*.
*   **Manajemen Proyek & Analisa (`research`, `triage`, `grill-me`)**: Digunakan untuk mereset topik tertentu, memprioritaskan masalah (*triage*), atau mewawancarai *developer* untuk mematangkan ide.
*   **Pemeliharaan (`resolving-merge-conflicts`, `code-review`)**: Digunakan untuk merapikan kode dan membantu menyelesaikan konflik *Git*.

---

## 🚀 Peta Jalan Pengembangan (Roadmap)

Pengembangan Orteam dibagi menjadi beberapa fase (Milestones):

### 🟩 Fase 1: Fondasi & Autentikasi (Q1)
- [ ] Inisialisasi proyek Next.js dengan App Router.
- [ ] Setup *Styling* (Tailwind CSS + shadcn/ui).
- [ ] Integrasi sistem *Authentication* menggunakan Cloudflare Access (Multi-tenant/Organisasi).
- [ ] Setup Database Supabase dan migrasi skema awal.
- [ ] Membuat desain *Landing Page* (SaaS Style).

### 🟨 Fase 2: Fitur Kolaborasi Inti (Q2)
- [ ] Pengembangan modul **Task Management** (Kanban Board).
- [ ] Pembuatan modul **Roadmap & Calendar**.
- [ ] Pengembangan **Real-time Docs** (Text Editor kolaboratif).

### 🟧 Fase 3: Visual Workspace / Whiteboard (Q3)
- [ ] Integrasi *engine* visual (seperti `tldraw` atau `React Flow`).
- [ ] Sistem *node-edge* connection untuk PRD & ERD visual.
- [ ] Sinkronisasi *real-time* via WebSockets (Supabase Realtime).

### 🟦 Fase 4: Poles Akhir & Rilis (Q4)
- [ ] Integrasi sistem notifikasi email menggunakan Resend.
- [ ] *Quality Assurance*, *End-to-End Testing*, & Perbaikan *Bug*.
- [ ] Rilis versi Beta Tertutup (Closed Beta).
- [ ] Peluncuran Publik (Public Launch).

---
*Dokumen ini akan terus diperbarui seiring dengan berjalannya pengembangan proyek.*
