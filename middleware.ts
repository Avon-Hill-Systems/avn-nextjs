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

    console.log(`🔵 Middleware: Processing request for ${pathname}`)
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
  const allCookies = request.cookies.getAll()
  console.log(`🔵 Middleware: All cookies (${allCookies.length}):`, allCookies.map(c => ({
    name: c.name,
    value: c.value?.substring(0, 50) + (c.value && c.value.length > 50 ? '...' : ''),
    hasValue: Boolean(c.value)
  })))

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
      // No session token found, redirect to login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      console.log(`🔴 Middleware: Redirecting to: ${loginUrl.toString()}`)
      return NextResponse.redirect(loginUrl)
    }
    
    // If admin route, verify admin with backend
    if (isAdminRoute) {
      try {
        const apiBase = resolveApiBase()
        const verifyUrl = `${apiBase}/users/admin/verify`
        console.log(`🔵 Middleware: Admin route detected, verifying with: ${verifyUrl}`)
        console.log(`🔵 Middleware: Sending cookies: ${request.headers.get('cookie')?.substring(0, 100)}...`)
        
        const res = await fetch(verifyUrl, {
          method: 'GET',
          headers: { cookie: request.headers.get('cookie') || '' },
          credentials: 'include',
        })
        
        console.log(`🔵 Middleware: Admin verify response status: ${res.status}`)
        
        if (!res.ok) {
          console.log(`🔴 Middleware: Admin verify failed (${res.status}), redirecting home`)
          return NextResponse.redirect(new URL('/', request.url))
        }
        
        console.log(`🟢 Middleware: Admin verification successful`)
      } catch (error) {
        console.log('🔴 Middleware: Admin verify request failed:', error)
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

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
