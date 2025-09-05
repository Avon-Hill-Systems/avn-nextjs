import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { config as appConfig } from './lib/config'



function resolveApiBase() {
  const base = process.env.NEXT_PUBLIC_API_URL || appConfig.api.baseUrl
  return base.endsWith('/') ? base.slice(0, -1) : base
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl
    const postVerify = request.nextUrl.searchParams.get('postVerify') === '1'
    const postLogin = request.nextUrl.searchParams.get('postLogin') === '1'

    // Canonical host redirect (production): force www.tostendout.com
    // Avoids cross-host cookie issues between apex and www.
    try {
      const hostname = request.nextUrl.hostname
      const isProd = process.env.NODE_ENV === 'production'
      if (isProd && hostname === 'tostendout.com') {
        const url = new URL(request.url)
        url.hostname = 'www.tostendout.com'
        return NextResponse.redirect(url)
      }
    } catch (e) {
    }
  
  // List of protected routes that require authentication
  const protectedRoutes = [
    '/profile',
    '/settings',
    '/matches',
    '/internships'
  ]

  // Admin-only routes
  const adminRoutes = ['/admin', '/analytics', '/interviews', '/matching-system']

  // Routes that should always be accessible without redirecting away,
  // even if the user is authenticated (prevents bounce loops during
  // cookie propagation/verification flows).
  const alwaysAllowRoutes = ['/login', '/signup', '/verify-email']
  const isAlwaysAllow = alwaysAllowRoutes.some(route => pathname.startsWith(route))

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  

  // Helper to check session via backend if cookies are present but token name differs
  async function backendHasSession(): Promise<boolean> {
    try {
      const apiBase = resolveApiBase()
      const urls = [
        `${apiBase}/api/auth/get-session`,
        `${apiBase}/api/auth/session`,
        `${apiBase}/auth/get-session`,
      ]
      let res: Response | null = null
      for (const u of urls) {
        res = await fetch(u, {
          method: 'GET',
          headers: { cookie: request.headers.get('cookie') || '' },
          credentials: 'include',
        })
        if (res.ok) break
      }
      if (!res || !res.ok) return false
      const ct = res.headers.get('content-type') || ''
      if (!ct.includes('application/json')) return false
      const data = await res.json().catch(() => null) as unknown as { user?: unknown; session?: unknown; data?: { user?: unknown; session?: unknown } } | null
      const user = data?.user ?? data?.data?.user
      const session = data?.session ?? data?.data?.session
      return Boolean(user || session)
    } catch (e) {
      return false
    }
  }


  // Only redirect authenticated users from the ROOT path to /profile
  if (pathname === '/') {
    // Check for session token in cookies
    const regularToken = request.cookies.get('__Secure-better-auth.session_token')?.value
    const legacyToken = request.cookies.get('better-auth.session_token')?.value
    const sessionToken = regularToken || legacyToken

    if (sessionToken) {
      return NextResponse.redirect(new URL('/profile', request.url))
    }

    // Fallback: probe backend in case cookie name differs
    const has = await backendHasSession()
    if (has) {
      return NextResponse.redirect(new URL('/profile', request.url))
    }

    // Not authenticated: allow through and add cache-busting headers
    const response = NextResponse.next()
    response.headers.set('x-middleware-cache', 'no-cache')
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  }

  if (isProtectedRoute || isAdminRoute) {
    // Allow a one-time pass for post-verification landings to let the app
    // bootstrap and read cookies after cross-site redirects
    if (postVerify || postLogin) {
      return NextResponse.next()
    }
    // Check for session token in cookies (try both secure and non-secure variants)
    const regularToken = request.cookies.get('__Secure-better-auth.session_token')?.value
    const legacyToken = request.cookies.get('better-auth.session_token')?.value
    const sessionToken = regularToken || legacyToken

    if (!sessionToken) {
      // Double-check with backend session endpoint before redirecting
      const hasSession = await backendHasSession()
      if (!hasSession) {
        const landingUrl = new URL('/', request.url)
        return NextResponse.redirect(landingUrl)
      }
    }
    
    // Note: Removed admin pre-verification to avoid 403 loops; backend guards still protect admin APIs
    
  } else {
    // Non-protected, non-root route: always allow (no auto-redirects)
  }

  // Allow the request to continue for non-protected routes or authenticated users
  return NextResponse.next()
  } catch (error) {
    // Allow request to continue on error to avoid breaking the app
    return NextResponse.next()
  }
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
}
