import { createBrowserClient } from '@supabase/ssr'
import { useAuth } from '@clerk/nextjs'
import { useMemo } from 'react'

export function useClerkSupabaseClient() {
  const { getToken } = useAuth()
  
  return useMemo(() => {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await getToken({ template: 'supabase' })
            
            const headers = new Headers(options?.headers)
            headers.set('Authorization', `Bearer ${clerkToken}`)
            
            return fetch(url, {
              ...options,
              headers,
            })
          }
        }
      }
    )
  }, [getToken])
}
