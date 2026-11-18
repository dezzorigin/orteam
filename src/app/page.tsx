import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Columns3,
  Layers,
  Lock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/** Mark GitHub — lucide-react tidak lagi mengekspor ikon brand. */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const FEATURES = [
  {
    icon: Columns3,
    title: "Kanban Board",
    body: "Task per tim dalam tiga kolom — To Do, Doing, Done. Tambah, pindah, dan hapus task tanpa refresh.",
  },
  {
    icon: Layers,
    title: "Visual Canvas",
    body: "Whiteboard node PRD, ERD, dan catatan yang bisa di-drag. Posisi tersimpan otomatis per tim.",
  },
  {
    icon: CalendarDays,
    title: "Live Roadmap",
    body: "Status task mengalir jadi roadmap tim: apa yang selesai, berjalan, dan antre berikutnya.",
  },
  {
    icon: Users,
    title: "Multi-tim",
    body: "Satu akun, banyak tim. Ganti workspace dari pemilih tim — data tiap tim terpisah.",
  },
  {
    icon: Lock,
    title: "RLS per baris",
    body: "Skema Supabase dengan Row Level Security: anggota tim hanya melihat task timnya sendiri.",
  },
  {
    icon: BookOpen,
    title: "Open source",
    body: "MIT. Baca kodenya, jalankan sendiri, atau fork dan sesuaikan — tanpa langganan.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans text-zinc-950 relative selection:bg-zinc-200">

      {/* Floating Pill Navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <header className="pointer-events-auto flex items-center gap-2 sm:gap-6 px-4 py-3 bg-white/70 backdrop-blur-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-black/5 rounded-full">
          <Link href="/" className="font-bold text-lg tracking-tighter flex items-center gap-2 pr-2">
            <div className="w-7 h-7 bg-zinc-950 rounded-[6px] shadow-sm flex items-center justify-center">
              <span className="text-white text-xs">O</span>
            </div>
            Orteam
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium text-zinc-500 ml-2">
            <Link href="#features" className="hover:text-zinc-950 transition-colors">Features</Link>
            <Link href="#docs" className="hover:text-zinc-950 transition-colors">Docs</Link>
            <Link href="https://github.com/dezzorigin/orteam" target="_blank" rel="noreferrer" className="hover:text-zinc-950 transition-colors flex items-center gap-2">
              <GithubIcon className="size-4" />
              GitHub
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-zinc-200/60">
            <Link href="/workspace">
              <Button variant="ghost" className="font-semibold text-[15px] rounded-full hidden sm:inline-flex h-10 px-4 hover:bg-zinc-100">
                Log in
              </Button>
            </Link>
            <Link href="/workspace">
              <Button className="font-semibold text-[15px] rounded-full h-10 px-5 bg-zinc-950 text-white hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 shadow-md">
                Get Started
              </Button>
            </Link>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-52 pb-24 relative overflow-hidden">

        {/* Subtle background glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-zinc-200/50 to-transparent rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-black/5 text-zinc-600 text-sm font-medium mb-10 transition-transform hover:scale-105 cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Orteam is now in Public Beta
        </div>

        <h1 className="text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] font-extrabold tracking-tighter max-w-[1000px] leading-[0.95] mb-8 text-zinc-950 drop-shadow-sm">
          The smart workspace for your team.
        </h1>

        <p className="text-lg md:text-2xl text-zinc-500 max-w-2xl mb-12 font-medium leading-relaxed tracking-tight">
          The open-source alternative for your team&apos;s visual workspaces, live roadmaps, and task management. Everything you need, unified in one platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/workspace">
            <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold bg-zinc-950 text-white hover:bg-zinc-800 transition-all hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
              Start for free
            </Button>
          </Link>
          <Link href="https://github.com/dezzorigin/orteam" target="_blank" rel="noreferrer">
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base font-semibold">
              <GithubIcon className="size-5" /> View on GitHub
            </Button>
          </Link>
        </div>
        <p className="text-sm text-zinc-400 mt-4">Tanpa daftar — workspace demo langsung jalan di browser.</p>

      </main>

      {/* Preview Image / Mockup Area */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-24 flex justify-center relative z-10">
        <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-[2rem] bg-zinc-950 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-zinc-800 overflow-hidden relative transition-transform hover:scale-[1.01] duration-700 ease-out">
           {/* Mockup Topbar */}
           <div className="absolute top-0 left-0 right-0 h-12 flex items-center px-4 sm:px-6 bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800 z-20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
                <div className="w-48 sm:w-64 h-6 bg-zinc-800/50 rounded-md"></div>
              </div>
           </div>

           {/* Mockup Canvas */}
           <div className="absolute inset-0 pt-12 bg-[#111] overflow-hidden">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

             {/* Fake UI Elements for Orteam Workspace */}
             <div className="absolute top-20 left-10 sm:left-20 w-48 sm:w-64 bg-zinc-800/80 rounded-xl border border-zinc-700 shadow-2xl p-4 transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer">
               <div className="text-xs font-bold text-zinc-300 mb-3 tracking-wider uppercase">Kanban Board</div>
               <div className="w-full h-8 bg-zinc-700/50 rounded-md mb-2 border border-zinc-600/50 flex items-center px-2">
                 <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                 <div className="w-1/2 h-2 bg-zinc-500 rounded-full"></div>
               </div>
               <div className="w-full h-8 bg-zinc-700/50 rounded-md mb-2 border border-zinc-600/50 flex items-center px-2">
                 <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                 <div className="w-2/3 h-2 bg-zinc-500 rounded-full"></div>
               </div>
             </div>

             <div className="absolute top-40 right-10 sm:right-32 w-64 bg-white/5 rounded-xl border border-zinc-700 shadow-2xl p-4 transform rotate-3 hover:rotate-0 transition-transform cursor-pointer backdrop-blur-md">
               <div className="text-xs font-bold text-zinc-300 mb-3 tracking-wider uppercase">Visual Canvas</div>
               <div className="flex items-center gap-2 mb-3">
                 <div className="w-6 h-6 rounded-md border border-zinc-600 flex items-center justify-center text-[10px] text-zinc-400">⌘</div>
                 <div className="w-2/3 h-2 bg-zinc-500 rounded-full"></div>
               </div>
               <div className="flex items-center gap-2 mb-3">
                 <div className="w-6 h-6 rounded-md bg-green-500/20 border border-green-500/50 flex items-center justify-center text-[10px] text-green-400">✓</div>
                 <div className="w-1/2 h-2 bg-zinc-500 rounded-full"></div>
               </div>
             </div>

             {/* Connection Line */}
             <svg className="absolute top-28 left-40 sm:left-56 w-64 h-32 text-zinc-600/70 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 200 100" preserveAspectRatio="none">
               <path d="M 10,20 C 100,20 100,80 190,80" strokeWidth="2" strokeDasharray="4 4" />
               <circle cx="10" cy="20" r="4" fill="currentColor" />
               <circle cx="190" cy="80" r="4" fill="currentColor" />
             </svg>
           </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="w-full max-w-6xl mx-auto px-4 pb-24 scroll-mt-28">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-center">Satu workspace, semua kerja tim.</h2>
        <p className="text-zinc-500 text-center mt-3 max-w-xl mx-auto">
          Kanban, canvas visual, dan roadmap — tanpa langganan bertumpuk, tanpa akun baru untuk sekadar mencoba.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {FEATURES.map((f) => (
            <article key={f.title} className="rounded-2xl border border-zinc-200 bg-white p-6 hover:shadow-md transition-shadow">
              <f.icon className="size-6" />
              <h3 className="font-semibold text-lg mt-4">{f.title}</h3>
              <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{f.body}</p>
            </article>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/workspace">
            <Button size="lg" className="rounded-full h-12 px-7 bg-zinc-950 text-white hover:bg-zinc-800">
              Coba workspace demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Docs */}
      <section id="docs" className="w-full border-t border-zinc-200 bg-white scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tighter">Dokumentasi lengkap.</h2>
            <p className="text-zinc-500 mt-2 leading-relaxed">
              Dari PRD sampai skema database, arsitektur, keamanan RLS, dan cara deploy —
              semuanya ada di folder <code className="font-mono text-sm bg-zinc-100 px-1 rounded">docs/</code> repo ini.
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link className="underline underline-offset-4" href="https://github.com/dezzorigin/orteam/blob/main/docs/PRD.MD">PRD — kebutuhan produk</Link></li>
            <li><Link className="underline underline-offset-4" href="https://github.com/dezzorigin/orteam/blob/main/docs/ARCHITECTURE.md">Arsitektur — Next.js + Supabase</Link></li>
            <li><Link className="underline underline-offset-4" href="https://github.com/dezzorigin/orteam/blob/main/docs/SCHEMA.md">Skema database &amp; RLS</Link></li>
            <li><Link className="underline underline-offset-4" href="https://github.com/dezzorigin/orteam/blob/main/docs/DEPLOYMENT.md">Deployment — Cloudflare Pages</Link></li>
            <li><Link className="underline underline-offset-4" href="https://github.com/dezzorigin/orteam/blob/main/docs/DIAGRAMS.html">Diagram arsitektur (HTML+SVG)</Link></li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center gap-4 text-sm text-zinc-500">
          <Link href="/" className="font-bold tracking-tighter text-zinc-950 flex items-center gap-2">
            <span className="w-6 h-6 bg-zinc-950 rounded-[5px] flex items-center justify-center text-white text-[10px]">O</span>
            Orteam
          </Link>
          <p className="sm:ml-4">Open-source workspace untuk tim. Lisensi MIT.</p>
          <div className="sm:ml-auto flex items-center gap-5">
            <Link href="https://github.com/dezzorigin/orteam" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-zinc-950">
              <GithubIcon className="size-4" /> GitHub
            </Link>
            <Link href="https://github.com/dezzorigin" target="_blank" rel="noreferrer" className="hover:text-zinc-950">dezzorigin</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
