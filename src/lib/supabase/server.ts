import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Klien Supabase sisi server (tanpa Clerk).
 *
 * Versi sebelumnya memakai `auth()` dari `@clerk/nextjs/server` dan
 * template JWT Clerk — paket itu tidak terdaftar di package.json dan
 * tidak ada kunci Clerk di repo ini, sehingga build gagal. Klien ini
 * memakai anon key + cookie Supabase standar; RLS di
 * supabase/schema.sql tetap menjadi penjaga akses per baris.
 * Tanpa env Supabase, mengembalikan `null` (mode demo).
 */
export async function createSupabaseServerClient(): Promise<SupabaseClient | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Abaikan error ini saat dipanggil dari Server Component.
        }
      },
    },
  });
}

/**
 * Klien admin (melewati RLS) — HANYA untuk server, HANYA bila
 * SUPABASE_SERVICE_ROLE_KEY diset. Jangan pernah mengekspos key ini
 * ke klien atau men-commit-nya. Tanpa key, mengembalikan `null`.
 */
export async function createAdminSupabaseClient(): Promise<SupabaseClient | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  const cookieStore = await cookies();
  return createServerClient(url, serviceKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Abaikan error ini saat dipanggil dari Server Component.
        }
      },
    },
  });
}
