import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Klien Supabase sisi browser (tanpa Clerk).
 *
 * Riwayat: versi sebelumnya mengimpor `@clerk/nextjs` dan meminta token
 * dari template JWT Clerk (`supabase`), padahal paket itu TIDAK terdaftar
 * di package.json — `next build` gagal di typecheck. Clerk tetap
 * didukung sebagai jalur auth produksi (lihat docs/ARCHITECTURE.md),
 * tapi klien ini tidak lagi bergantung padanya: tanpa
 * NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY, fungsi ini
 * mengembalikan `null` dan aplikasi jatuh ke mode demo (localStorage).
 */
export function createSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createBrowserClient(url, anonKey);
}

/** True kalau Supabase terkonfigurasi (mode produksi), false = mode demo. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
