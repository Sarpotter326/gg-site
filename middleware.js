import { NextResponse } from 'next/server';

// Redirect all non-local requests to the Shopify storefront.
// Skips localhost/127.0.0.1 so local dev is not interrupted.
export function middleware(request) {
  const host = request.headers.get('host') || '';

  // Allow local development hosts to pass through
  if (
    host.includes('localhost') ||
    host.startsWith('127.') ||
    host.startsWith('::1') ||
    host === ''
  ) {
    return NextResponse.next();
  }

  const shopDomain = 'graceandgoldcompany.com';
  const url = request.nextUrl.clone();

  // Build destination on Shopify, preserving path and query
  const dest = `https://${shopDomain}${url.pathname}${url.search}`;
  return NextResponse.redirect(dest);
}

// Avoid redirecting static assets and Next internals
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
