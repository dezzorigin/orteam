"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Columns3,
  Info,
  Layers,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEMO_USER,
  SEED_TEAMS,
  STATUS_LABEL,
  STATUS_ORDER,
  loadState,
  saveState,
  seedState,
  type CanvasNode,
  type DemoState,
  type Task,
  type TaskStatus,
} from "@/lib/demo-data";

const KIND_STYLE: Record<CanvasNode["kind"], string> = {
  PRD: "border-zinc-950",
  ERD: "border-blue-600",
  NOTE: "border-amber-500",
};

export default function WorkspacePage() {
  // State awal = seed (sama di server prerender & klien pertama kali,
  // jadi tidak ada hydration mismatch); effect di bawah menimpa dengan
  // simpanan localStorage bila ada.
  const [state, setState] = useState<DemoState>(() => seedState());
  const [teamId, setTeamId] = useState(SEED_TEAMS[0].id);
  const [tab, setTab] = useState<"kanban" | "canvas">("kanban");
  const [drafts, setDrafts] = useState<Partial<Record<TaskStatus, string>>>({});
  const [dragNode, setDragNode] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const idSeq = useRef(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  function nextId(prefix: string): string {
    idSeq.current += 1;
    return `${prefix}-${idSeq.current}`;
  }

  // Muat state demo dari localStorage sekali saat mount. Ini satu-satunya
  // tempat setState-in-effect dipakai — localStorage tidak ada saat
  // prerender statis, jadi state awal harus seed, lalu diganti hasil
  // simpanan klien. Aturan react-hooks/set-state-in-effect dimatikan
  // khusus baris ini (bukan global) karena pola ini yang benar di sini.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loadState());
  }, []);

  useEffect(() => {
    if (state) saveState(state);
  }, [state]);

  const team = SEED_TEAMS.find((t) => t.id === teamId) ?? SEED_TEAMS[0];
  const tasks = useMemo(
    () => state.tasks.filter((t) => t.team_id === teamId),
    [state, teamId],
  );
  const nodes = useMemo(
    () => state.nodes.filter((n) => n.team_id === teamId),
    [state, teamId],
  );

  function update(patch: Partial<DemoState>) {
    setState((prev) => ({ ...prev, ...patch }));
  }

  function addTask(status: TaskStatus) {
    const title = (drafts[status] ?? "").trim();
    if (!title) return;
    const task: Task = {
      id: nextId("task"),
      team_id: teamId,
      title,
      description: "",
      status,
      created_by: DEMO_USER.id,
      created_at: new Date().toISOString(),
    };
    update({ tasks: [...state.tasks, task] });
    setDrafts((d) => ({ ...d, [status]: "" }));
  }

  function moveTask(id: string, dir: -1 | 1) {
    update({
      tasks: state.tasks.map((t) => {
        if (t.id !== id) return t;
        const idx = STATUS_ORDER.indexOf(t.status);
        const next = STATUS_ORDER[Math.min(2, Math.max(0, idx + dir))];
        return { ...t, status: next };
      }),
    });
  }

  function deleteTask(id: string) {
    update({ tasks: state.tasks.filter((t) => t.id !== id) });
  }

  function addNode() {
    const n = state.nodes.filter((x) => x.team_id === teamId).length;
    const node: CanvasNode = {
      id: nextId("node"),
      team_id: teamId,
      x: 40 + (n % 5) * 40,
      y: 40 + (n % 4) * 60,
      kind: "NOTE",
      title: "Catatan baru",
      body: "Seret untuk memindahkan — hapus dengan tombol ×.",
    };
    update({ nodes: [...state.nodes, node] });
  }

  function deleteNode(id: string) {
    update({ nodes: state.nodes.filter((n) => n.id !== id) });
  }

  function onNodePointerDown(e: React.PointerEvent, node: CanvasNode) {
    e.preventDefault();
    setDragNode(node.id);
    dragOffset.current = { x: e.clientX - node.x, y: e.clientY - node.y };
  }

  function onCanvasPointerMove(e: React.PointerEvent) {
    if (!dragNode || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width - 240, e.clientX - rect.left - dragOffset.current.x));
    const y = Math.max(0, Math.min(rect.height - 120, e.clientY - rect.top - dragOffset.current.y));
    update({
      nodes: state.nodes.map((n) => (n.id === dragNode ? { ...n, x, y } : n)),
    });
  }

  function resetDemo() {
    const fresh = seedState();
    setState(fresh);
    saveState(fresh);
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-zinc-950 flex flex-col">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tighter">
            <span className="w-7 h-7 bg-zinc-950 rounded-[6px] flex items-center justify-center text-white text-xs">O</span>
            Orteam
          </Link>
          <span className="text-zinc-300">/</span>
          <span className="font-medium text-zinc-600">Workspace</span>
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="team" className="text-sm text-zinc-500 hidden sm:block">Tim</label>
            <select
              id="team"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className="h-9 rounded-full border border-zinc-200 bg-white px-3 text-sm font-medium"
            >
              {SEED_TEAMS.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <Button variant="outline" size="sm" className="rounded-full" onClick={resetDemo}>
              <RotateCcw className="size-4" /> Reset demo
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-4 pt-6">
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <Info className="size-4 mt-0.5 shrink-0" />
          <p>
            <strong>Mode demo</strong> — tanpa Supabase/Clerk. Semua perubahan tersimpan
            di localStorage browser ini saja. Seed awal mengikuti{" "}
            <code className="font-mono text-xs bg-amber-100 px-1 rounded">supabase/schema.sql</code>{" "}
            (tabel <code className="font-mono text-xs bg-amber-100 px-1 rounded">teams</code> &amp;{" "}
            <code className="font-mono text-xs bg-amber-100 px-1 rounded">tasks</code>).
          </p>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <Button
            variant={tab === "kanban" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setTab("kanban")}
          >
            <Columns3 className="size-4" /> Kanban Board
          </Button>
          <Button
            variant={tab === "canvas" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setTab("canvas")}
          >
            <Layers className="size-4" /> Visual Canvas
          </Button>
          <span className="ml-auto text-sm text-zinc-500">
            {tasks.length} task · {nodes.length} node — {team.name}
          </span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {tab === "kanban" ? (
          <div className="grid md:grid-cols-3 gap-4 items-start">
            {STATUS_ORDER.map((status) => {
              const col = tasks.filter((t) => t.status === status);
              return (
                <section key={status} className="rounded-2xl border border-zinc-200 bg-white p-3">
                  <header className="flex items-center justify-between px-1 pb-3">
                    <h2 className="font-semibold text-sm tracking-wide uppercase text-zinc-600">
                      {STATUS_LABEL[status]}
                    </h2>
                    <span className="text-xs font-medium bg-zinc-100 rounded-full px-2 py-0.5">
                      {col.length}
                    </span>
                  </header>
                  <div className="space-y-2">
                    {col.map((task) => (
                      <article key={task.id} className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                        <h3 className="font-medium text-sm leading-snug">{task.title}</h3>
                        {task.description && (
                          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{task.description}</p>
                        )}
                        <div className="flex items-center gap-1 mt-3">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            aria-label="Pindah ke kolom sebelumnya"
                            disabled={status === "TODO"}
                            onClick={() => moveTask(task.id, -1)}
                          >
                            <ArrowLeft className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            aria-label="Pindah ke kolom berikutnya"
                            disabled={status === "DONE"}
                            onClick={() => moveTask(task.id, 1)}
                          >
                            <ArrowRight className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            aria-label="Hapus task"
                            className="ml-auto text-zinc-400 hover:text-red-600"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </article>
                    ))}
                    {col.length === 0 && (
                      <p className="text-xs text-zinc-400 px-1 py-2">Belum ada task di kolom ini.</p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input
                      value={drafts[status] ?? ""}
                      onChange={(e) => setDrafts((d) => ({ ...d, [status]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && addTask(status)}
                      placeholder={`+ Task ${STATUS_LABEL[status].toLowerCase()}`}
                      aria-label={`Judul task baru di kolom ${STATUS_LABEL[status]}`}
                      className="min-w-0 flex-1 h-9 rounded-full border border-zinc-200 px-3 text-sm outline-none focus:border-zinc-950"
                    />
                    <Button size="sm" className="rounded-full shrink-0" onClick={() => addTask(status)}>
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-sm text-zinc-500">Seret node untuk memindahkannya. Posisi tersimpan otomatis.</p>
              <Button size="sm" className="rounded-full ml-auto" onClick={addNode}>
                <Plus className="size-4" /> Tambah node
              </Button>
            </div>
            <div
              ref={canvasRef}
              onPointerMove={onCanvasPointerMove}
              onPointerUp={() => setDragNode(null)}
              onPointerLeave={() => setDragNode(null)}
              className="relative h-[480px] rounded-2xl border border-zinc-800 bg-[#111] overflow-hidden touch-none select-none"
              style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "24px 24px" }}
            >
              {nodes.map((node) => (
                <div
                  key={node.id}
                  onPointerDown={(e) => onNodePointerDown(e, node)}
                  className={`absolute w-60 rounded-xl border-2 bg-zinc-900 p-4 cursor-grab active:cursor-grabbing shadow-2xl ${KIND_STYLE[node.kind]} ${dragNode === node.id ? "z-10 scale-[1.02]" : ""}`}
                  style={{ left: node.x, top: node.y }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">{node.kind}</span>
                    <button
                      aria-label={`Hapus node ${node.title}`}
                      onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }}
                      className="text-zinc-500 hover:text-red-400 text-sm leading-none px-1"
                    >
                      ×
                    </button>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-100 mt-1">{node.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{node.body}</p>
                </div>
              ))}
              {nodes.length === 0 && (
                <p className="absolute inset-0 flex items-center justify-center text-zinc-500 text-sm">
                  Canvas kosong — tambah node pertama.
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-400">
        Orteam · demo lokal — data tersimpan di browser, bukan di server.
      </footer>
    </div>
  );
}
