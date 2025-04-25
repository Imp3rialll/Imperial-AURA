import { NextRequest, NextResponse } from 'next/server';

// List of protected routes that require authentication
const protectedRoutes = [
  '/profile',
  '/orders',
  '/checkout',
  '/account'
];

// Auth-related pages that should be excluded from protection
const authPages = [
  '/account/login',
  '/account/register',
  '/account/forgot-password',
  '/account/reset-password'
];

// For now, just check if the path starts with any protected route
const isProtectedRoute = (path: string): boolean => {
  // First check if path is in the auth pages list - these should always be accessible
  if (authPages.some(page => path.startsWith(page))) {
    return false;
  }
  
  // Then check if it's a protected route
  return protectedRoutes.some(route => path.startsWith(route));
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Only check authentication for protected routes
  if (!isProtectedRoute(path)) {
    return NextResponse.next();
  }
  
  // Check for Shopify customer token
  const shopifyAccessToken = request.cookies.get('shopifyCustomerAccessToken')?.value;
  const tokenExpiry = request.cookies.get('shopifyCustomerTokenExpiry')?.value;
  
  // If no token or token is expired, redirect to login
  if (!shopifyAccessToken || !tokenExpiry || new Date(tokenExpiry) <= new Date()) {
    return NextResponse.redirect(new URL('/account/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 