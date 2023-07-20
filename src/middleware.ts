import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/create-account') || req.nextUrl.pathname.startsWith('/log-in')) {
    if (req.cookies.has('dam-witter')) {
      return NextResponse.redirect(new URL('/', req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (!req.cookies.has('dam-witter') && !req.nextUrl.pathname.startsWith('/log-in')) {
    return NextResponse.redirect(new URL('/log-in', req.url));
  }
}
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
