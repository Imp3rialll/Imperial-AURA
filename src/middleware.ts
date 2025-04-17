import { NextRequest, NextResponse } from 'next/server';

// List of protected routes that require authentication
const protectedRoutes = [
  '/profile',
  '/orders',
  '/checkout',
  '/account'
];

// For now, just check if the path starts with any protected route
const isProtectedRoute = (path: string): boolean => {
  return protectedRoutes.some(route => path.startsWith(route));
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Just pass through all requests for now
  // This will be replaced with Shopify authentication logic
  return NextResponse.next();
  
  // When integrating with Shopify, implement authentication check here:
  /*
  // Only check authentication for protected routes
  if (!isProtectedRoute(path)) {
    return NextResponse.next();
  }
  
  // Example Shopify auth check (implement based on Shopify's requirements)
  const shopifyAuthCookie = request.cookies.get('shopify_customer_auth');
  
  if (!shopifyAuthCookie) {
    // Redirect to Shopify login
    return NextResponse.redirect(new URL('/account/login', request.url));
  }
  
  return NextResponse.next();
  */
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 