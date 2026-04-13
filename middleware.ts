import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const adminPass = process.env.ADMIN_PASSWORD;

  // Protect /admin/dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!adminPass || token !== adminPass) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Redirect /admin back to dashboard if already logged in
  if (request.nextUrl.pathname === '/admin') {
    if (adminPass && token === adminPass) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
