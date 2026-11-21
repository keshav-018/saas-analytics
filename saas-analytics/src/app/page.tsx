import { Login } from "@/components/pages/Login/Main";
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()

  if (!error && data?.claims) {
    redirect('/dashboard')
  }

  return (
    <Login />
  );
}
