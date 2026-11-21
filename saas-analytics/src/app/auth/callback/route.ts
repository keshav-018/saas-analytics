import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/forgot-password', requestUrl.origin))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(new URL('/forgot-password', requestUrl.origin))
  }

  // This callback is currently used for password recovery only. Keep the
  // destination fixed to avoid open redirects from query-string input.
  return NextResponse.redirect(new URL('/update-password', requestUrl.origin))
}
