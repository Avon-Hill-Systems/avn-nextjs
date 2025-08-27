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

  // TEMPORARILY DISABLED: Authentication redirects
  // if (isProtectedRoute) {
  //   // Redirect to login page before the protected page loads
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // Allow the request to continue for non-protected routes
  return NextResponse.next()
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
}
