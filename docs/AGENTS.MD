# 🤖 Orteam AI Agent Protocols & Directives (AGENTS.MD)

This file contains the strict operational protocols, architectural rules, and required skills for any AI Agent (Antigravity, Cursor, Windsurf, etc.) operating within the **Orteam** codebase. 

Agents MUST read and adhere to these directives before executing code modifications.

---

## 🧠 1. Core Architectural Directives

1. **Zero Bloat Policy:** 
   - Before adding any new `npm` package, verify if the functionality can be achieved using native browser APIs, existing Next.js features, or TailwindCSS utilities.
   - For UI components, always attempt to compose using existing `shadcn/ui` primitives before reaching for third-party headless UI libraries.
2. **Monolith Serverless Architecture (Next.js App Router):**
   - **DO NOT** create a separate backend directory or Node.js server.
   - All server-side logic MUST live in **Server Actions** (`"use server"`) for mutations, or **Route Handlers** (`app/api/...`) for Webhooks (e.g., Cloudflare Access callbacks).
3. **Strict Type Safety Data Flow:**
   - Types must flow directly from the Supabase database schema to the UI.
   - Utilize Supabase CLI to auto-generate database types (`database.types.ts`). Do not hand-write database interfaces.

---

## 🔐 2. Security & Multi-Tenant (B2B) Protocols

Orteam is a multi-tenant SaaS. Data isolation between Organizations/Teams is paramount.

1. **The Cloudflare Access-Supabase JWT Handoff:**
   - **NEVER** use the Supabase Service Role Key (`SUPABASE_SERVICE_ROLE_KEY`) for standard user requests.
   - Agents must instantiate the Supabase client by passing the Cloudflare Access Auth token (which contains the active `org_id`) in the `Authorization` header.
2. **Implicit Row Level Security (RLS) over Explicit JS Filters:**
   - Do not rely solely on JavaScript/TypeScript `.eq('team_id', activeTeamId)` to filter records.
   - You MUST ensure that the Supabase Postgres RLS policies inherently block cross-tenant access. JS filters are only for UX/Performance, not security.

---

## 🔄 3. Real-Time, Canvas, & Caching Rules

1. **WebSocket & Yjs Canvas Sync:**
   - When modifying the `Visual Workspace` (Canvas) engine, understand that collaborative state is managed via CRDTs (Yjs).
   - **CRITICAL:** Do NOT save mouse movements or real-time drag events directly to PostgreSQL. 
   - Ephemeral presence (cursors) must use Supabase Realtime *Presence* channels.
2. **Redis as the Intermediate Buffer:**
   - Real-time changes to the document/canvas state must be synced to **Upstash Redis** first.
   - Use a debounced background job or Server Action to persist the aggregated JSON from Redis to the `whiteboard_sessions.data` column in Supabase (e.g., flush every 5-10 seconds of inactivity).

---

## 🎨 4. UI/UX Design System Enforcement

1. **Monochrome Minimalist Constraints:**
   - The primary palette is strictly Black, White, and Light Gray.
   - Semantic colors (Green, Yellow, Red) are reserved strictly for Task Statuses and destructive actions.
2. **Mobile-First Responsiveness:**
   - Every component created must have defined behaviors for `sm:`, `md:`, and `lg:` breakpoints. 
   - Sidebars must collapse into `Sheet` (from shadcn) on mobile screens.

---

## 🛠️ 5. Required Installed Agent Skills

Agents operating in this repository should leverage the following local skills (located in `.agents/skills/`):

1. **`shadcn`**: For managing, installing, and customizing shadcn/ui components.
2. **`supabase-postgres-best-practices`**: For writing efficient SQL migrations, RLS policies, and database functions.
3. **`ui-ux-pro-max`**: For referencing the minimalist design patterns, layout grids, and typography scales.
4. **`resolving-merge-conflicts`**: For handling Git operations when working in parallel with human developers.