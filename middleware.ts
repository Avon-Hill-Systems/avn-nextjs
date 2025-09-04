/* eslint-disable no-console */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { config as appConfig } from './lib/config'

// Lightweight logger to avoid noisy console in production and satisfy linters
const DEBUG = process.env.NODE_ENV !== 'production'
const log = (...args: unknown[]) => { if (DEBUG) console.log(...args) }
const warn = (...args: unknown[]) => { if (DEBUG) console.warn(...args) }
const errLog = (...args: unknown[]) => { if (DEBUG) console.error(...args) }



function resolveApiBase() {
  const base = process.env.NEXT_PUBLIC_API_URL || appConfig.api.baseUrl
  return base.endsWith('/') ? base.slice(0, -1) : base
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl
    const postVerify = request.nextUrl.searchParams.get('postVerify') === '1'
    const postLogin = request.nextUrl.searchParams.get('postLogin') === '1'

    log(`🔵 Middleware: START - Processing request for ${pathname}`)
    log(`🔵 Middleware: Request URL: ${request.url}`)
    log(`🔵 Middleware: Request headers:`, {
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
      userAgent: request.headers.get('user-agent')?.substring(0, 100) + '...',
    })

    // Canonical host redirect (production): force www.tostendout.com
    // Avoids cross-host cookie issues between apex and www.
    try {
      const hostname = request.nextUrl.hostname
      const isProd = process.env.NODE_ENV === 'production'
      if (isProd && hostname === 'tostendout.com') {
        const url = new URL(request.url)
        url.hostname = 'www.tostendout.com'
        log(`🟡 Middleware: Canonical redirect to ${url.toString()}`)
        return NextResponse.redirect(url)
      }
    } catch (e) {
      warn('⚠️ Middleware: Canonical host check failed:', e)
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

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  log(`🔵 Middleware: Is protected route? ${isProtectedRoute}`)

  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  log(`🔵 Middleware: Is admin route? ${isAdminRoute}`)

  // Log all cookies in detail
  log(`🔵 Middleware: About to get cookies...`)
  const allCookies = request.cookies.getAll()
  log(`🔵 Middleware: Got ${allCookies.length} cookies`)
  log(`🔵 Middleware: Cookie names:`, allCookies.map(c => c.name))

  // Helper to check session via backend if cookies are present but token name differs
  async function backendHasSession(): Promise<boolean> {
    try {
      const apiBase = resolveApiBase()
      // Try preferred endpoint then fallback to legacy
      const primary = `${apiBase}/auth/session`
      const fallback = `${apiBase}/auth/get-session`
      log('🟡 Middleware: Probing backend session at', primary)
      let res = await fetch(primary, {
        method: 'GET',
        headers: { cookie: request.headers.get('cookie') || '' },
        credentials: 'include',
      })
      log('🟡 Middleware: backendHasSession status (primary):', res.status, res.statusText)
      if (!res.ok) {
        log('🟡 Middleware: Primary failed, trying fallback at', fallback)
        res = await fetch(fallback, {
          method: 'GET',
          headers: { cookie: request.headers.get('cookie') || '' },
          credentials: 'include',
        })
        log('🟡 Middleware: backendHasSession status (fallback):', res.status, res.statusText)
        if (!res.ok) return false
      }
      const ct = res.headers.get('content-type') || ''
      if (!ct.includes('application/json')) return false
      const data = await res.json().catch(() => null) as unknown as { user?: unknown; session?: unknown; data?: { user?: unknown; session?: unknown } } | null
      const user = data?.user ?? data?.data?.user
      const session = data?.session ?? data?.data?.session
      log('🟡 Middleware: backendHasSession parsed:', { hasUser: Boolean(user), hasSession: Boolean(session) })
      return Boolean(user || session)
    } catch (e) {
      warn('🔴 Middleware: backendHasSession check failed:', e)
      return false
    }
  }

  // REMOVED: Logic that prevented users from accessing /login page
  // This was causing users to be redirected away from /login even when they needed to log in
  // if (pathname.startsWith('/login') || pathname.startsWith('/verify-email')) {
  //   try {
  //     const has = await backendHasSession()
  //     if (has) {
  //       const defaultTarget = pathname.startsWith('/verify-email') ? '/profile' : '/'
  //       const target = request.nextUrl.searchParams.get('redirect') || defaultTarget
  //       log(`🟢 Middleware: Valid session on ${pathname}, redirecting to ${target}`)
  //       return NextResponse.redirect(new URL(target, request.url))
  //     }
  //   } catch (e) {
  //     warn('⚠️ Middleware: session check failed, allowing page:', e)
  //   }
  // }

  if (isProtectedRoute || isAdminRoute) {
    // Allow a one-time pass for post-verification landings to let the app
    // bootstrap and read cookies after cross-site redirects
    if (postVerify || postLogin) {
      if (postVerify) log('🟢 Middleware: postVerify flag present; allowing initial access to', pathname)
      if (postLogin) log('🟢 Middleware: postLogin flag present; allowing initial access to', pathname)
      return NextResponse.next()
    }
    // Check for session token in cookies (try both secure and non-secure variants)
    const secureToken = request.cookies.get('__Secure-__Secure-better-auth.session_token')?.value
    const regularToken = request.cookies.get('__Secure-better-auth.session_token')?.value
    const legacyToken = request.cookies.get('better-auth.session_token')?.value
    const sessionToken = secureToken || regularToken || legacyToken
    
    log(`🔵 Middleware: Secure token present? ${Boolean(secureToken)}`)
    log(`🔵 Middleware: Regular token present? ${Boolean(regularToken)}`)
    log(`🔵 Middleware: Session token present? ${Boolean(sessionToken)}`)

    if (!sessionToken) {
      log(`🔴 Middleware: No session token found, checking backend session before redirect`)
      log(`🔴 Middleware: Available cookie names:`, allCookies.map(c => c.name))
      // Double-check with backend session endpoint before redirecting
      const hasSession = await backendHasSession()
      if (!hasSession) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        log(`🔴 Middleware: Redirecting to: ${loginUrl.toString()}`)
        return NextResponse.redirect(loginUrl)
      }
      log('🟢 Middleware: Backend reported active session; allowing access')
    }
    
    // Note: Removed admin pre-verification to avoid 403 loops; backend guards still protect admin APIs

    log(`🟢 Middleware: Session cookie present or verified, allowing access to ${pathname}`)
  } else {
    log(`🟢 Middleware: Non-protected route, allowing access to ${pathname}`)
  }

  // Allow the request to continue for non-protected routes or authenticated users
  log(`🟢 Middleware: Request allowed to continue to ${pathname}`)
  return NextResponse.next()
  } catch (error) {
    errLog('🔴 Middleware: Error occurred:', error)
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
