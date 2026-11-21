import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error('Missing Supabase URL or publishable key environment variable')
  }

  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options)
        })
      },
    },
  })

  const { data, error } = await supabase.auth.getClaims()
  const isAuthenticated = !error && Boolean(data?.claims)
  const pathname = request.nextUrl.pathname
  const isDashboardRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/')
  const isPasswordUpdateRoute = pathname === '/update-password'

  let redirectPath: string | null = null
  if (isDashboardRoute && !isAuthenticated) {
    redirectPath = '/'
  } else if (isPasswordUpdateRoute && !isAuthenticated) {
    redirectPath = '/forgot-password'
  } else if (pathname === '/' && isAuthenticated) {
    redirectPath = '/dashboard'
  }

  if (redirectPath) {
    const redirectResponse = NextResponse.redirect(new URL(redirectPath, request.url))
    supabaseResponse.cookies.getAll().forEach(({ name, value, ...options }) => {
      redirectResponse.cookies.set(name, value, options)
    })
    return redirectResponse
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/:path*', '/', '/update-password', '/api/chat/:path*'],
}
