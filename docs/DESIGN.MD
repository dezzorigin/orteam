# 🎨 Orteam Design System & UI/UX Architecture

Dokumen ini adalah acuan teknis utama (*Single Source of Truth*) untuk seluruh implementasi *antarmuka pengguna* (UI) dan *pengalaman pengguna* (UX) pada Orteam. Desain ini menggunakan sistem token berbasis **Tailwind CSS v4** yang diintegrasikan dengan **shadcn/ui**.

---

## 1. Design Philosophy (SaaS Minimalist)

Orteam dibangun dengan filosofi **"Content First, Zero Bloat"**. Karena aplikasi ini menampung informasi padat (seperti diagram, teks panjang, dan tumpukan tugas), *interface* di sekelilingnya harus sebisa mungkin tidak mencolok dan menyingkir dari fokus utama.

- **Monochrome Dominance:** Warna antarmuka sangat minim (hitam/putih/abu-abu). Warna cerah hanya digunakan untuk status indikator (*semantic colors*).
- **High Contrast & Legibility:** Keterbacaan teks adalah prioritas utama.
- **Tactile Feedback:** Setiap interaksi (klik, *hover*) harus memberikan *feedback* visual yang instan namun halus (menggunakan *micro-animations*).
- **Mobile-Responsive Native:** Aplikasi harus terasa seperti aplikasi *native* di *mobile* (dukungan *swipe*, *bottom sheet* pengganti *modal*, dll).

---

## 2. Design Tokens (Tailwind CSS Variables)

Kita menggunakan CSS *Custom Properties* agar mudah jika di masa depan ingin mengimplementasikan tema *Dark Mode*, meskipun MVP difokuskan pada *Light Mode* yang *crisp*.

### 2.1. Base Colors (Monochrome Scale)
- `--background`: `0 0% 100%` (#FFFFFF) - Latar belakang utama.
- `--foreground`: `0 0% 3.9%` (#0A0A0A) - Teks utama.
- `--card`: `0 0% 100%` (#FFFFFF) - Latar belakang *card* atau modal.
- `--card-foreground`: `0 0% 3.9%` (#0A0A0A)
- `--popover`: `0 0% 100%` - *Dropdowns*, *tooltips*.
- `--popover-foreground`: `0 0% 3.9%`

### 2.2. Interactive & Surface Colors
- `--primary`: `0 0% 9%` (#171717) - Tombol utama (Solid Black).
- `--primary-foreground`: `0 0% 98%` (#FAFAFA) - Teks di dalam tombol utama.
- `--secondary`: `0 0% 96.1%` (#F5F5F5) - Permukaan sekunder (seperti *Sidebar* atau *hover state*).
- `--secondary-foreground`: `0 0% 9%`
- `--muted`: `0 0% 96.1%` - Elemen non-interaktif atau teks minor.
- `--muted-foreground`: `0 0% 45.1%` (#737373) - Teks *placeholder* atau metadata.

### 2.3. Borders & Utilities
- `--border`: `0 0% 89.8%` (#E5E5E5) - Garis pemisah, *border card*.
- `--input`: `0 0% 89.8%` - *Border* pada *text input*.
- `--ring`: `0 0% 3.9%` - *Focus ring* saat elemen diklik/di-Tab.
- `--radius`: `0.5rem` (8px) - Standar kelengkungan sudut (*border-radius*).

### 2.4. Semantic Colors (Status)
Hanya digunakan pada *Badge*, *Tags*, atau notifikasi.
- `Success`: Green (`#10B981`)
- `Warning`: Amber (`#F59E0B`)
- `Destructive` / `Error`: Red (`#EF4444`)

---

## 3. Typography Architecture

Menggunakan font Sans-Serif geometris yang terlihat modern dan rapi. (Direkomendasikan: **Geist**, **Inter**, atau **Outfit**).

| Element | Font Size (Tailwind) | Line Height | Font Weight | Color Variable |
| :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero)** | `text-4xl` / `text-5xl` | `tight` | `font-extrabold` | `--foreground` |
| **H2 (Section)** | `text-3xl` | `tight` | `font-bold` | `--foreground` |
| **H3 (Card Title)**| `text-xl` | `snug` | `font-semibold` | `--foreground` |
| **Body (Default)** | `text-base` | `relaxed` | `font-normal` | `--foreground` |
| **Body (Small)** | `text-sm` | `normal` | `font-normal` | `--muted-foreground` |
| **Tiny / Metadata**| `text-xs` | `normal` | `font-medium` | `--muted-foreground` |

---

## 4. Component Library Architecture (shadcn/ui)

Semua komponen UI dibangun menggunakan radix-ui (via shadcn/ui) untuk memastikan standar aksesibilitas (WAI-ARIA) terpenuhi.

### 4.1. Buttons
- **Default:** Hitam solid. `bg-primary text-primary-foreground hover:bg-primary/90`.
- **Outline:** Putih dengan border abu-abu transparan. `border border-input bg-background hover:bg-accent hover:text-accent-foreground`.
- **Ghost:** Tanpa *background* sampai di-*hover*. Digunakan untuk aksi sekunder di dalam *Card*.
- *Transition Rule:* Semua *button* harus memiliki `transition-colors duration-200`.

### 4.2. Forms & Inputs
- *Border* tipis (`--border`), saat `focus` berubah menjadi tebal dengan *ring* hitam (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
- Wajib memiliki *floating label* atau *label* jelas di atas *input*.

### 4.3. Cards & Surfaces
- *Drop shadows* sangat diminimalisir. Hierarki visual didapatkan dari *border* (`border border-border`) dan kelengkungan (`rounded-lg`).
- *Shadow* tipis (`shadow-sm`) hanya digunakan untuk *Card* utama, sedangkan *Dropdown* atau *Modal* menggunakan *shadow* lebih tebal (`shadow-lg`).

---

## 5. Layout & Spacing System

Menggunakan basis 4px (Standar Tailwind).

- **Global Container:** Maksimal lebar `max-w-7xl` untuk *Landing Page*. Untuk *App Dashboard*, menggunakan lebar penuh `w-full` (Edge-to-Edge).
- **Sidebar Width:** Tetap di `256px` (`w-64`) pada Desktop, dan di-sembunyikan di balik *Hamburger menu* pada layar `< 768px`.
- **Top Navigation Bar:** Tinggi konstan `64px` (`h-16`) dengan *border-bottom*.

---

## 6. Iconography & Micro-Interactions

### 6.1. Icons
Menggunakan pustaka **Lucide React** (`lucide-react`).
- **Stroke Width:** Selalu `2px` untuk konsistensi.
- **Sizes:** `size-4` (16px) untuk ikon di dalam tombol/menu, `size-6` (24px) untuk ikon navigasi utama.

### 6.2. Animations (Framer Motion / Tailwind)
- **Modal Enter:** Fade-in dan Scale-up (`duration-200 ease-out`).
- **Dropdown/Popover:** Slide dari atas/bawah secara halus.
- **Task Card Drag (Kanban):** Rotasi 3 derajat saat di-tarik (*dragged*), *drop shadow* membesar.

---

## 7. Detailed Screen Blueprints

### 7.1. SaaS Landing Page
1. **Navbar:** Logo di kiri, navigasi transparan di tengah, tombol "Login" & "Start Free" di kanan. Saat di-*scroll*, Navbar mendapat efek *glassmorphism* (`backdrop-blur-md`).
2. **Hero Section:** Teks tebal rata tengah, dengan *badge* "Open Source Software" di atasnya. Di bawah teks terdapat visualisasi (*mockup*) *Whiteboard* Orteam.
3. **Bento Grid Features:** Menggunakan tata letak grid asimetris untuk menonjolkan fitur (Kanban, Docs, Whiteboard).

### 7.2. Core App Dashboard (Tim Workspace)
- **Kiri (Sidebar):**
  - Profil Tim (*Dropdown* untuk ganti tim).
  - Menu Navigasi (Home, Canvas, Tasks, Calendar, Docs) dengan efek `hover:bg-secondary`.
- **Atas (Header):**
  - *Breadcrumbs* menunjukkan lokasi saat ini (ex: `Tim Orteam / Tasks`).
  - Kolom Search global (`Cmd + K`) untuk mencari dokumen atau tugas secara instan.
- **Area Tengah (Canvas/Whiteboard Mode):**
  - Kotak-kotak *grid* transparan di latar belakang (`bg-dot-pattern`).
  - *Floating toolbar* di tengah-bawah untuk *tools* (Panah, Teks, Kotak, *Sticky Note*).

### 7.3. Kanban Task Board Anatomy
- **Kolom:** Latar belakang abu-abu sangat muda (`bg-muted/50`), ujung membulat (`rounded-lg`).
- **Task Card:** Putih solid dengan *border*, judul tebal (`text-sm font-semibold`), *avatar* pengguna (bulat kecil) di pojok kanan bawah, dan *badge* *Due Date* dengan warna dinamis (Merah jika telat).
