# 📖 Orteam Internal Technical Documentation

Welcome to the internal technical documentation of **Orteam** (Open-Source Collaboration Team). This document serves as the central source of truth for developers, product managers, and system administrators working on the codebase.

---

## 🌟 1. High-Level Technical Summary

**Orteam** is an open-source SaaS collaborative workspace tailored for early-stage startups, hackathon teams, and students. It eliminates the need for scattered, paid subscriptions by unifying a real-time visual canvas, task management, calendar, and collaborative documents into a single, high-performance platform.

### Core Systems

```text
                     ┌──────────────────┐
                     │   Orteam Client  │
                     │  (Next.js App)   │
                     └────────┬─────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
     │ Cloudflare Access Auth & │  │ Visual Engine│  │ Real-time    │
     │ Teams (B2B)  │  │ (tldraw /    │  │ Sync (WSS)   │
     │              │  │  React Flow) │  │              │
     └──────────────┘  └──────────────┘  └──────────────┘
            ▲                 ▲                 ▲
            │                 │                 │
            └─────────┬───────┴─────────────────┘
                      ▼
             ┌─────────────────┐
             │ API Routes &    │
             │ Server Actions  │
             └────────┬────────┘
                      │
            ┌─────────┴─────────┐
            ▼                   ▼
    ┌───────────────┐   ┌───────────────┐
    │ Supabase DB   │   │ Upstash Redis │
    │ (PostgreSQL)  │   │ (Caching)     │
    └───────────────┘   └───────────────┘
```

1. **Authentication & Multi-tenant (Cloudflare Access):** Handles secure signups, social logins, session management, and B2B Team/Organization switching out of the box.
2. **Visual Workspace Engine:** Powers the infinite canvas (Whiteboard). Allows users to drop nodes (PRD, ERD, generic text) and connect them via edges.
3. **Real-time Sync & Caching:** Utilizes WebSockets (via Supabase Realtime or PartyKit) for multiplayer cursor tracking and live state updates. **Redis (Upstash)** is used for ephemeral caching, rate limiting, and storing transient board states before committing to the database.
4. **Task & Document Management:** Kanban boards and Markdown-based editors interconnected within the same team workspace.

---

## 🛠️ 2. System Architecture & Technical Stack

The platform is designed around a modern, typing-strict, and high-performance stack:

1. **Framework:** Next.js (App Router) utilizing Server Actions for mutations and Route Handlers for webhooks.
2. **Runtime & UI Logic:** React 19 paired with TypeScript (`^5`) for component safety.
3. **Styling & Presentation:** Tailwind CSS (v4) paired with `shadcn/ui` for a minimalist, monochrome (Black & White) aesthetic.
4. **Backend-as-a-Service:** Supabase (PostgreSQL) for persistent data storage.
5. **Auth Provider:** Cloudflare Access for zero-friction identity and Organization management.
6. **Caching Layer:** Redis (Upstash) combined with Next.js built-in Data Cache.

### 📂 App Router Directory Structure

```text
Orteam/
├── app/
│   ├── api/
│   │   ├── webhooks/clerk/           # Syncs Cloudflare Access Organizations/Users to Supabase
│   │   └── cron/                     # Background jobs (e.g., deadline notifications)
│   ├── (marketing)/                  # Public facing pages
│   │   └── page.tsx                  # SaaS Landing Page
│   ├── (auth)/                       # Cloudflare Access Auth routes
│   │   ├── sign-in/                  # Login page
│   │   └── sign-up/                  # Registration page
│   ├── dashboard/                    # Core Product routes
│   │   ├── [teamId]/
│   │   │   ├── canvas/               # The Whiteboard / Visual Workspace
│   │   │   ├── tasks/                # Kanban Board
│   │   │   ├── docs/                 # Real-time Document editor
│   │   │   └── roadmap/              # Calendar & Milestones
│   ├── layout.tsx                    # Root HTML wrapper (Providers, Fonts)
│   └── globals.css                   # Global styles and Tailwind imports
├── components/
│   ├── ui/                           # shadcn/ui primitives (button, dialog, etc.)
│   ├── canvas/                       # Node/Edge rendering components
│   └── shared/                       # Sidebar, TopNav, Global Search (Cmd+K)
├── lib/
│   ├── supabase/                     # Supabase client instantiation
│   ├── redis.ts                      # Upstash Redis client
│   └── utils.ts                      # Helper functions (cn, formatting)
└── types/
    └── index.ts                      # Core Type declarations (Task, Node, Edge)
```

### 🔄 Client-Server Data Flow (Real-time Example)

```text
+───────────────────+   (1) Drag Node / Card   +────────────────────+
│    Client UI      ├─────────────────────────>│  WebSocket Server  │
│ (Canvas/Kanban)   │                          │ (Supabase Realtime)│
+─────────┬─────────+                          +─────────┬──────────+
          │                                              │
          │ (4) UI Updates           (2) Broadcast State │
          ▼                                              ▼
+───────────────────+       (3) Ephemeral      +────────────────────+
│   Other Clients   │<─────────────────────────│   Redis (Upstash)  │
│  (Multiplayer)    │                          │   (Cache Layer)    │
+───────────────────+                          +─────────┬──────────+
                                                         │
                                   (5) Debounced Save    │
                                                         ▼
                                               +────────────────────+
                                               │   Supabase DB      │
                                               │    (PostgreSQL)    │
                                               +────────────────────+
```

---

## 📊 3. Database Schema & Row Level Security (RLS)

### Schema Breakdown

#### 1. `teams` Table
Stores organization metadata (mirrored from Cloudflare Access via Webhooks).

| Column Name | Data Type | Constraints / Defaults | Description |
| --- | --- | --- | --- |
| `id` | `text` | `primary key` | Unique ID matching Cloudflare Access Organization ID. |
| `name` | `text` | `not null` | Name of the team/startup. |
| `created_at` | `timestamptz` | `default now()` | Creation timestamp. |

#### 2. `tasks` Table
Houses Kanban board items.

| Column Name | Data Type | Constraints / Defaults | Description |
| --- | --- | --- | --- |
| `id` | `uuid` | `primary key`, `default gen_random_uuid()` | Unique task identifier. |
| `team_id` | `text` | `references teams(id) on cascade` | Foreign key binding task to a team. |
| `title` | `text` | `not null` | Task title. |
| `status` | `text` | `default 'TODO'` | Status enum (`TODO`, `IN_PROGRESS`, `DONE`). |
| `assignee_id` | `text` | `nullable` | Cloudflare Access User ID of the assigned member. |
| `due_date` | `timestamptz` | `nullable` | Deadline for the task. |

#### 3. `whiteboard_sessions` Table
Stores the persistent state of the collaborative canvas.

| Column Name | Data Type | Constraints / Defaults | Description |
| --- | --- | --- | --- |
| `id` | `uuid` | `primary key`, `default gen_random_uuid()` | Unique board identifier. |
| `team_id` | `text` | `references teams(id) on cascade` | Foreign key binding board to a team. |
| `data` | `jsonb` | `not null`, `default '{}'::jsonb` | The serialized state of nodes and edges. |
| `updated_at`| `timestamptz` | `default now()` | Last commit timestamp. |

### Row Level Security (RLS) Policies

To ensure strict multi-tenant isolation, RLS must be enabled on all tables.

*   **`tasks` & `whiteboard_sessions` Tables:**
    *   `Select / Insert / Update / Delete`: Allowed **only** if the authenticated user's active Cloudflare Access Organization ID matches the row's `team_id`.
    *   *Implementation Note:* Since we use Cloudflare Access for Auth, the Next.js Server passes the active `org_id` token claim to Supabase during queries to evaluate the RLS policy dynamically.

---

## 🏗️ 4. Real-Time Sync & Caching Architecture

Orteam demands sub-50ms latency for a smooth collaborative experience on the canvas. 

### The Sync Lifecycle
1. **Local Optimistic UI:** When a user moves a node on the canvas, the UI updates instantly locally.
2. **WebSocket Broadcast:** The exact coordinates delta is sent via WebSocket (Supabase Realtime Presence/Broadcast).
3. **Redis Caching:** To prevent hammering the PostgreSQL database on every pixel movement, the intermediate state is cached in **Upstash Redis**.
4. **Debounced Commit:** A background worker or a debounced Server Action flushes the aggregated JSON state from Redis into the `whiteboard_sessions.data` column in Supabase every few seconds (e.g., every 5s of inactivity).

---

## 🔌 5. Integrations & Native APIs

### Transactional Integrations

*   **Cloudflare Access Webhooks:** 
    *   Endpoint at `/api/webhooks/clerk` validates Svix signatures.
    *   Listens for `organization.created`, `organization.updated`, and `organizationMembership.created` to sync team access into the Supabase database.
*   **Resend (Email Notifications):** 
    *   Triggers via Next.js Server Actions.
    *   Used to send out email alerts for Tasks that are approaching their `due_date`, or to invite external collaborators to a document.
*   **Upstash Redis:**
    *   Accessed via `@upstash/redis` HTTP client (Edge compatible).
    *   Used for caching canvas states, limiting API rate abuse (Rate Limiting), and preventing brute-force attacks on public sharing links.