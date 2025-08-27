import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log(`🔵 Middleware: Processing request for ${pathname}`)
  
  // List of protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/preferences',
    '/settings'
  ]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  console.log(`🔵 Middleware: Is protected route? ${isProtectedRoute}`)

  if (isProtectedRoute) {
    // Check for session token in cookies
    const sessionToken = request.cookies.get('better-auth.session_token')?.value
    console.log(`🔵 Middleware: Session token found? ${!!sessionToken}`)
    
    if (sessionToken) {
      console.log(`🔵 Middleware: Session token: ${sessionToken.substring(0, 20)}...`)
    }

    if (!sessionToken) {
      console.log(`🔴 Middleware: No session token found, redirecting to login`)
      // No session token found, redirect to login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    console.log(`🟢 Middleware: Session token verified, allowing access to ${pathname}`)
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
