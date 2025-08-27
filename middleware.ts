import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // List of protected routes that require authentication
  const protectedRoutes = [
    '/simulations',
    '/simulations/new', 
    '/simulations/past',
    '/organisation',
    '/organisation/about',
    '/organisation/products', 
    '/organisation/customer-base',
    '/settings'
  ]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Check for session token in cookies
    const sessionToken = request.cookies.get('better-auth.session_token')?.value

    if (!sessionToken) {
      // No session token found, redirect to login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Allow the request to continue for non-protected routes or authenticated users
  return NextResponse.next()
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
}
