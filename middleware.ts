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

    console.log(`🔵 Middleware: START - Processing request for ${pathname}`)
    console.log(`🔵 Middleware: Request URL: ${request.url}`)
    console.log(`🔵 Middleware: Request headers:`, {
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
      userAgent: request.headers.get('user-agent')?.substring(0, 100) + '...',
    })
  
  // List of protected routes that require authentication
  const protectedRoutes = [
    '/profile',
    '/settings',
    '/matches',
    '/internships'
  ]

  // Admin-only routes
  const adminRoutes = ['/admin', '/analytics', '/interviews', '/matching-system']

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  console.log(`🔵 Middleware: Is protected route? ${isProtectedRoute}`)

  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  console.log(`🔵 Middleware: Is admin route? ${isAdminRoute}`)

  // Log all cookies in detail
  console.log(`🔵 Middleware: About to get cookies...`)
  const allCookies = request.cookies.getAll()
  console.log(`🔵 Middleware: Got ${allCookies.length} cookies`)
  console.log(`🔵 Middleware: Cookie names:`, allCookies.map(c => c.name))
  console.log(`🔵 Middleware: All cookies (${allCookies.length}):`, allCookies.map(c => ({
    name: c.name,
    value: c.value?.substring(0, 50) + (c.value && c.value.length > 50 ? '...' : ''),
    hasValue: Boolean(c.value)
  })))

  // Helper to check session via backend if cookies are present but token name differs
  async function backendHasSession(): Promise<boolean> {
    try {
      const apiBase = resolveApiBase()
      const res = await fetch(`${apiBase}/auth/get-session`, {
        method: 'GET',
        headers: { cookie: request.headers.get('cookie') || '' },
        credentials: 'include',
      })
      return res.ok
    } catch (e) {
      console.log('🔴 Middleware: backendHasSession check failed:', e)
      return false
    }
  }

  // If user hits /login but is already authenticated, send them to intended page
  if (pathname.startsWith('/login')) {
    const secureToken = request.cookies.get('__Secure-better-auth.session_token')?.value
    const regularToken = request.cookies.get('better-auth.session_token')?.value
    const sessionToken = secureToken || regularToken
    let alreadyAuthed = Boolean(sessionToken)
    if (!alreadyAuthed) {
      alreadyAuthed = await (async () => {
        try {
          const apiBase = resolveApiBase()
          const res = await fetch(`${apiBase}/auth/get-session`, {
            headers: { cookie: request.headers.get('cookie') || '' },
            credentials: 'include',
          })
          return res.ok
        } catch {
          return false
        }
      })()
    }
    if (alreadyAuthed) {
      const target = request.nextUrl.searchParams.get('redirect') || '/'
      console.log(`🟢 Middleware: Authenticated user on /login, redirecting to ${target}`)
      return NextResponse.redirect(new URL(target, request.url))
    }
  }

  if (isProtectedRoute || isAdminRoute) {
    // Check for session token in cookies (try both secure and non-secure variants)
    const secureToken = request.cookies.get('__Secure-better-auth.session_token')?.value
    const regularToken = request.cookies.get('better-auth.session_token')?.value
    const sessionToken = secureToken || regularToken
    
    console.log(`🔵 Middleware: Secure token present? ${Boolean(secureToken)}`)
    console.log(`🔵 Middleware: Regular token present? ${Boolean(regularToken)}`)
    console.log(`🔵 Middleware: Session token present? ${Boolean(sessionToken)}`)
    
    if (secureToken) {
      console.log(`🔵 Middleware: Secure token value: ${secureToken.substring(0, 50)}...`)
    }
    if (regularToken) {
      console.log(`🔵 Middleware: Regular token value: ${regularToken.substring(0, 50)}...`)
    }

    if (!sessionToken) {
      console.log(`🔴 Middleware: No session token found, redirecting to login`)
      console.log(`🔴 Middleware: Available cookie names:`, allCookies.map(c => c.name))
      // Double-check with backend session endpoint before redirecting
      const hasSession = await backendHasSession()
      if (!hasSession) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        console.log(`🔴 Middleware: Redirecting to: ${loginUrl.toString()}`)
        return NextResponse.redirect(loginUrl)
      }
      console.log('🟢 Middleware: Backend reported active session; allowing access')
    }
    
    // Note: Removed admin pre-verification to avoid 403 loops; backend guards still protect admin APIs

    console.log(`🟢 Middleware: Session cookie present, allowing access to ${pathname}`)
  } else {
    console.log(`🟢 Middleware: Non-protected route, allowing access to ${pathname}`)
  }

  // Allow the request to continue for non-protected routes or authenticated users
  console.log(`🟢 Middleware: Request allowed to continue to ${pathname}`)
  return NextResponse.next()
  } catch (error) {
    console.error('🔴 Middleware: Error occurred:', error)
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
