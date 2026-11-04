# 🚀 Orteam: The Open-Source Collaboration OS

**Orteam** adalah platform *SaaS (Software as a Service)* *open-source* yang dirancang khusus untuk tim lomba, mahasiswa, dan *early-stage startup*. Orteam mengeliminasi kebutuhan untuk membayar langganan berbagai aplikasi (seperti Miro, Trello, Notion) dengan menyediakan satu *workspace* kolaboratif yang terpusat, gratis, dan mudah digunakan.

## 🎯 Visi & Konsep

Kami percaya bahwa setiap ide hebat berawal dari kolaborasi. Orteam hadir untuk membantu tim baru merancang produk, membagi tugas, dan memonitor *roadmap* tanpa hambatan finansial. 

**Alur Pengguna (User Flow):**
1. **SaaS Landing Page:** Menjelaskan fitur dan nilai tambah Orteam (Desain minimalis: Putih dominan & aksen Hitam).
2. **Login/Register:** Autentikasi aman yang mendukung sistem *multi-tenant* (Organisasi/Tim).
3. **App Dashboard:** Masuk ke dalam produk utama di mana tim bisa berkolaborasi secara *real-time*.

---

## 🛠️ Tech Stack

Proyek ini dibangun menggunakan teknologi modern yang *developer-friendly* dan *mobile-friendly*:

- **Frontend & API (Fullstack):** [Next.js](https://nextjs.org/) (App Router & Server Actions)
- **Styling:** [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Database & Storage:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication:** [Cloudflare Access](https://clerk.com/) (Sempurna untuk manajemen B2B / Organisasi Tim)
- **Email/Notifications:** [Resend](https://resend.com/)
- **Visual Node Engine:** (misal: `tldraw` atau `React Flow` untuk fitur Canvas/Whiteboard)

---

## 💡 Fitur Utama

Orteam dibagi menjadi beberapa modul produktivitas yang saling terintegrasi:

### 1. 🎨 Visual Workspace (Whiteboard Sakti)
- Papan tulis *real-time* dengan fitur *node-edge connection*.
- Tim bisa membuat **PRD (Product Requirements Document)** visual, **ERD (Entity Relationship Diagram)**, atau merancang arsitektur.
- *Sticky notes* yang saling "lengket" dan dapat dihubungkan satu sama lain untuk *brainstorming*.

### 2. 📋 Task Management & Tracking
- Sistem pembagian tugas ala *Kanban board* (To Do, In Progress, Done).
- Delegasi *task* (Assignees) ke anggota tim tertentu.
- Sinkronisasi status kerja tim agar tidak ada tugas yang terbengkalai.

### 3. 🗓️ Roadmap & Calendar
- Kalender bersama untuk menentukan *milestone* dan *deadline* proyek.
- Penjadwalan *meeting* internal atau pengumpulan dokumen (sangat berguna untuk tenggat waktu perlombaan).

### 4. 📝 Real-time Docs
- Tempat menulis notulensi *meeting*, skrip presentasi, atau draf ide secara *real-time*.

---

## 🚦 Getting Started (Local Development)

### Prerequisites
- Node.js (v20+)
- pnpm (Recommended package manager)
- Akun Supabase, Cloudflare Access, dan Resend untuk *environment variables*.

### 1. Clone & Install
```bash
git clone <repo-url>
cd orteam
pnpm install
```

### 2. Environment Setup
Buat file `.env` di *root* direktori dan isi dengan variabel berikut (lihat `.env.example` untuk referensi):
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
```

### 3. Run Development Server
```bash
pnpm dev
```
Aplikasi akan berjalan di `http://localhost:3000`.

---
*Orteam - Built with ❤️ for the open-source community.*