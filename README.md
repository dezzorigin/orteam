# Orteam

Orteam — project oleh Nabil Aulia Dika (dezzorigin).

## Status Proyek

**Hampir selesai (beta)** _(README ada, build artifact ada)_

## 📋 Tech Stack

Next.js, Python

## 🏗️ Arsitektur

```mermaid
flowchart LR
  U[Pengguna] --> B[Browser]
  B --> F[Frontend (React/Next.js)]
  F --> A[API Routes]
  A --> D[(Database)]
```

## 📁 Struktur Proyek

```
.agents/
docs/
public/
src/
supabase/
AGENTS.md
CLAUDE.md
LICENSE
PRD.md
README.md
components.json
eslint.config.mjs
next-env.d.ts
next.config.ts
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
postcss.config.mjs
send-email.js
skills-lock.json
tsconfig.json
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

> Untuk project HTML/Python/Go, lihat instruksi di atas atau file konfigurasi.

## 📄 Lisensi

MIT — lihat [LICENSE](./LICENSE).

---
_Dikembangkan oleh **dezzorigin** (Nabil Aulia Dika)._
