import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function resolveAuthBase() {
  const base = process.env.NEXT_PUBLIC_AUTH_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  const basePath = process.env.NEXT_PUBLIC_AUTH_BASE_PATH || '/auth'
  try {
    const u = new URL(base)
    if (u.pathname === '/' || u.pathname === '') {
      u.pathname = basePath
    }
    return u.toString().replace(/\/$/, '')
  } catch {
    const withPath = base.endsWith('/') ? base.slice(0, -1) : base
    return `${withPath}${basePath}`.replace(/\/$/, '')
  }
}

function resolveApiBase() {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  return base.endsWith('/') ? base.slice(0, -1) : base
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log(`🔵 Middleware: Processing request for ${pathname}`)
  
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

  if (isProtectedRoute || isAdminRoute) {
    // Check for session token in cookies
    const sessionToken = request.cookies.get('better-auth.session_token')?.value
    console.log(`🔵 Middleware: Session token present? ${Boolean(sessionToken)}`)

    if (!sessionToken) {
      console.log(`🔴 Middleware: No session token found, redirecting to login`)
      // No session token found, redirect to login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    // If admin route, verify admin with backend
    if (isAdminRoute) {
      try {
        const apiBase = resolveApiBase()
        const verifyUrl = `${apiBase}/users/admin/verify`
        const res = await fetch(verifyUrl, {
          method: 'GET',
          headers: { cookie: request.headers.get('cookie') || '' },
          credentials: 'include',
        })
        if (!res.ok) {
          console.log(`🔴 Middleware: Admin verify failed (${res.status}), redirecting home`)
          return NextResponse.redirect(new URL('/', request.url))
        }
      } catch (e) {
        console.log('🔴 Middleware: Admin verify request failed, redirecting home')
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    console.log(`🟢 Middleware: Session cookie present, allowing access to ${pathname}`)
  }

  // Allow the request to continue for non-protected routes or authenticated users
  console.log(`🟢 Middleware: Request allowed to continue`)
  return NextResponse.next()
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
}
