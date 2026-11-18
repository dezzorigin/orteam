/**
 * Data demo workspace Orteam — cerminan skema `supabase/schema.sql`.
 *
 * Bentuk barisnya sama persis dengan tabel produksi (`users`, `teams`,
 * `tasks`): id, team_id, title, description, status, created_by.
 * Di mode demo (tanpa env Supabase) data ini di-seed ke localStorage
 * dan semua mutasi terjadi di sana; di mode produksi sumber yang sama
 * dibaca dari Supabase dengan RLS (lihat docs/SCHEMA.md).
 */

export type TaskStatus = "TODO" | "DOING" | "DONE";

export interface Team {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Task {
  id: string;
  team_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  created_by: string;
  created_at: string;
}

export interface CanvasNode {
  id: string;
  team_id: string;
  x: number;
  y: number;
  kind: "PRD" | "ERD" | "NOTE";
  title: string;
  body: string;
}

export const DEMO_USER = {
  id: "user_demo",
  email: "demo@orteam.dev",
  full_name: "Demo User",
};

export const SEED_TEAMS: Team[] = [
  { id: "team_core", name: "Orteam Core", slug: "orteam-core", color: "#171717" },
  { id: "team_pidi", name: "Hackathon PIDI", slug: "hackathon-pidi", color: "#2563eb" },
];

export const SEED_TASKS: Task[] = [
  { id: "task-01", team_id: "team_core", title: "Rancang skema RLS tasks per tim", description: "Policy SELECT/INSERT/UPDATE hanya untuk anggota org yang sama.", status: "DONE", created_by: "user_demo", created_at: "2026-11-10T09:00:00Z" },
  { id: "task-02", team_id: "team_core", title: "Landing page ala SaaS", description: "Navbar, hero, preview produk, fitur, footer.", status: "DONE", created_by: "user_demo", created_at: "2026-11-11T09:00:00Z" },
  { id: "task-03", team_id: "team_core", title: "Kanban board mode demo", description: "Tambah, pindah kolom, hapus task — tersimpan di localStorage.", status: "DOING", created_by: "user_demo", created_at: "2026-11-12T09:00:00Z" },
  { id: "task-04", team_id: "team_core", title: "Visual canvas: node PRD & ERD", description: "Node bisa di-drag; posisi tersimpan per tim.", status: "DOING", created_by: "user_demo", created_at: "2026-11-13T09:00:00Z" },
  { id: "task-05", team_id: "team_core", title: "Sinkronisasi webhook Clerk → users/teams", description: "Upsert user.created dan organization.created via svix.", status: "TODO", created_by: "user_demo", created_at: "2026-11-14T09:00:00Z" },
  { id: "task-06", team_id: "team_core", title: "Roadmap & kalender tim", description: "Tampilan roadmap dari status task + tenggat.", status: "TODO", created_by: "user_demo", created_at: "2026-11-15T09:00:00Z" },
  { id: "task-07", team_id: "team_pidi", title: "Pitch deck ERRNOR", description: "10 slide: masalah, solusi, demo, model bisnis.", status: "DOING", created_by: "user_demo", created_at: "2026-11-12T10:00:00Z" },
  { id: "task-08", team_id: "team_pidi", title: "Prototype dashboard juri", description: "Alur penilaian + rekap skor real-time.", status: "TODO", created_by: "user_demo", created_at: "2026-11-13T10:00:00Z" },
  { id: "task-09", team_id: "team_pidi", title: "Repo & README tim", description: "README, lisensi, dan CI hijau sebelum demo day.", status: "TODO", created_by: "user_demo", created_at: "2026-11-14T10:00:00Z" },
];

export const SEED_NODES: CanvasNode[] = [
  { id: "node-01", team_id: "team_core", x: 40, y: 40, kind: "PRD", title: "PRD — Orteam v0.2", body: "Workspace tim open-source: kanban, canvas visual, roadmap." },
  { id: "node-02", team_id: "team_core", x: 380, y: 60, kind: "ERD", title: "ERD — users → teams → tasks", body: "users 1—n teams, teams 1—n tasks. RLS per org_id." },
  { id: "node-03", team_id: "team_core", x: 200, y: 220, kind: "NOTE", title: "Catatan rilis", body: "Mode demo dulu; Supabase + Clerk opsional via .env.local." },
  { id: "node-04", team_id: "team_pidi", x: 60, y: 60, kind: "PRD", title: "PRD — Dashboard juri", body: "Penilaian real-time, rekap skor, export PDF." },
];

export const STORAGE_KEY = "orteam-demo-v1";

export interface DemoState {
  tasks: Task[];
  nodes: CanvasNode[];
}

export function seedState(): DemoState {
  return {
    tasks: SEED_TASKS.map((t) => ({ ...t })),
    nodes: SEED_NODES.map((n) => ({ ...n })),
  };
}

export function loadState(): DemoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState();
    const parsed = JSON.parse(raw) as DemoState;
    if (!Array.isArray(parsed.tasks) || !Array.isArray(parsed.nodes)) {
      return seedState();
    }
    return parsed;
  } catch {
    return seedState();
  }
}

export function saveState(state: DemoState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage penuh / nonaktif: demo tetap jalan di memori.
  }
}

export const STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: "To Do",
  DOING: "Doing",
  DONE: "Done",
};

export const STATUS_ORDER: TaskStatus[] = ["TODO", "DOING", "DONE"];
