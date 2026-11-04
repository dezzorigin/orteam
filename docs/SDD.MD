# 🏗️ Orteam Software Design Document (SDD)

This document details the architectural decisions, data flows, and technical implementation strategies for the Orteam SaaS platform. It serves as the deep-dive counterpart to the PRD.

---

## 1. System Context & Paradigm

Orteam operates on a **Monolith Serverless** architecture. By utilizing Next.js as a fullstack framework deployed to edge/serverless runtimes (e.g., Vercel), we eliminate the network boundary overhead between frontend and backend, enabling deeply integrated React Server Components (RSC) and Server Actions.

### Core Bounded Contexts
1. **Identity & Tenant Boundary (Cloudflare Access):** Manages user lifecycles, JWT generation, and B2B Organization (Team) groupings.
2. **Persistent State & Access Control (Supabase):** PostgreSQL database shielded by strictly evaluated Row Level Security (RLS) policies.
3. **Ephemeral Sync Engine (Yjs + WebSockets):** Handles the sub-millisecond collaboration state for the Visual Workspace and Document editors.
4. **Application Logic (Next.js):** Coordinates UI rendering, server-side data fetching, and external API integrations (Resend for emails).

---

## 2. API Design & Data Flow

Instead of traditional REST APIs, Orteam heavily leverages **Next.js Server Actions** for mutations and **React Server Components (RSC)** for reads. This guarantees type safety from database schema to UI component without intermediate DTOs (Data Transfer Objects).

### 2.1. Standard Mutation Flow (e.g., Creating a Task)

```text
[Client UI] ──(1) Form Submit──► [Server Action: createTask()]
                                         │
                                         ├──► (2) Validate Auth JWT (Cloudflare Access)
                                         ├──► (3) Parse schema (Zod)
                                         │
                                         ▼
                                 [Supabase DB]
                                 (Insert Row)
                                         │
                                         ▼
[Client UI] ◄──(5) revalidatePath() ──(4) Return Success
```
*Note: Due to `revalidatePath()`, the UI automatically refetches the updated task list without requiring client-side `useEffect` polling.*

### 2.2. Webhook Ingestion (Auth Sync)
To keep the Postgres database aware of user/team identities without querying Cloudflare Access on every request, we mirror the data via Webhooks.
- Endpoint: `POST /api/webhooks/clerk`
- Cryptographic Verification: Uses `svix` to verify the webhook payload signature.
- Operations: Upserts into `users` or `teams` tables in Supabase upon `user.created` or `organization.created` events.

---

## 3. Real-Time Collaboration Engine (The Visual Core)

The most complex subsystem in Orteam is the real-time syncing for the Whiteboard and Docs. We utilize **CRDTs (Conflict-free Replicated Data Types)** via `Yjs` to ensure that concurrent edits by multiple users merge flawlessly without central locking.

### 3.1. Sync Architecture (Yjs + Supabase Realtime)

```text
+─────────────+       Awareness (Cursor Pos)      +──────────────+
│  Client A   ├──────────────────────────────────>│   Supabase   │
│ (React UI)  │                                   │   Realtime   │
+──────┬──────+                                   │   (Channels) │
       │                                          +──────┬───────+
       │ Yjs Delta Updates                               │
       ▼                                                 ▼
+─────────────+                                   +──────────────+
│ Yjs Local   │<────── Sync Broadcast ────────────┤  Client B    │
│ CRDT Doc    │                                   │ (React UI)   │
+──────┬──────+                                   +──────────────+
       │
       │ (Debounced Save every 5s)
       ▼
+─────────────+
│ Upstash     │
│ Redis Cache │
+─────────────+
```

1. **Yjs Document:** The local state of the whiteboard is represented as a Yjs document.
2. **Awareness Protocol:** Ephemeral data (like mouse cursor positions) is broadcasted via Supabase Realtime Presence. It is *not* saved to the database.
3. **State Sync:** Changes to nodes/edges (deltas) are merged locally and broadcasted to other peers.
4. **Persistence:** To avoid database write-locking, the final binary state of the Yjs document is saved to **Upstash Redis**, and periodically flushed to Supabase PostgreSQL (`whiteboard_sessions.data`).

---

## 4. Authentication & Security Model

### 4.1. The JWT Handoff (Cloudflare Access to Supabase)
Since Cloudflare Access issues the authentication tokens but Supabase holds the data, we must inject the Cloudflare Access context into the Supabase client.

1. **Middleware Intercept:** Next.js Middleware reads the Cloudflare Access session cookie.
2. **Custom JWT Template:** Cloudflare Access generates a custom JWT containing the user's active `org_id` (Team ID).
3. **Client Initialization:** The Supabase client is initialized using this custom JWT.
```typescript
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: { headers: { Authorization: `Bearer ${clerkToken}` } }
});
```
4. **PostgreSQL RLS:** The Supabase RLS policy reads the token to allow access:
```sql
CREATE POLICY "Isolate Team Data" ON tasks
FOR ALL USING (
  team_id = (auth.jwt() ->> 'org_id')
);
```
*Result: True cryptographic multi-tenancy. A user mathematically cannot query tasks from a team they are not currently authenticated into.*

---

## 5. Performance, Scalability & Monitoring

### 5.1. Caching Strategy
- **Static Assets & Marketing Pages:** Cached heavily at the CDN edge via Next.js default static generation.
- **Route Handlers / API:** Edge caching with `stale-while-revalidate` where applicable.
- **Rate Limiting:** Implemented in Next.js Middleware using Upstash Redis. (e.g., Max 10 API requests per 10 seconds per IP) to prevent DDoS on public invitation links.

### 5.2. Error Observability (Sentry)
Sentry is instrumented across all runtime layers:
- **Client (Browser):** React Error Boundaries catch rendering crashes in the Canvas engine.
- **Server (Node.js):** Tracks failures in Server Actions and database query timeouts.
- **Edge:** Traces middleware exceptions and unauthorized access attempts.

### 5.3. Asset Storage
User-uploaded assets (logos, PDF attachments in tasks) are uploaded directly from the Client to **Supabase Storage** (bypassing the Next.js server to reduce bandwidth bottlenecks) using pre-signed upload URLs.
