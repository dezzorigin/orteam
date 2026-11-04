-- ==============================================================================
-- 🏗️ ORTEAM SUPABASE INITIAL SCHEMA
-- ==============================================================================

-- 1. Tabel Users (Disinkronisasikan dari Clerk)
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY, -- Clerk User ID (co: user_2...)
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Tabel Teams / Organizations (Disinkronisasikan dari Clerk)
CREATE TABLE IF NOT EXISTS public.teams (
  id TEXT PRIMARY KEY, -- Clerk Org ID (co: org_2...)
  name TEXT NOT NULL,
  slug TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Tabel Tasks (Contoh tabel yang menggunakan JWT RLS)
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id TEXT NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'TODO',
  created_by TEXT NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- 🔒 ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- 🛡️ USERS POLICY: Hanya user yang bersangkutan yang bisa melihat datanya sendiri
CREATE POLICY "Users can read their own profile"
ON public.users
FOR SELECT
USING (id = (auth.jwt() ->> 'sub'));

-- 🛡️ TASKS POLICY: Hanya anggota tim (org_id) yang sesuai yang bisa melihat/mengubah task
CREATE POLICY "Isolate Team Tasks" 
ON public.tasks
FOR ALL
USING (team_id = (auth.jwt() ->> 'org_id'));

-- Note: Sinkronisasi write untuk users & teams dilakukan via Supabase Admin Client (Service Role) 
-- dari dalam Clerk Webhook, sehingga tidak butuh policy INSERT/UPDATE publik.
