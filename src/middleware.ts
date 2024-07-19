import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  console.log('------------------------------------middleware start ------------------------------------------');
  console.log('------------------------------------middleware end ------------------------------------------');

  const session = await auth();
  const path = request.nextUrl.pathname;

  console.log(path, '--------------------middleware path');
  console.log(session?.user?.id, '--------------------middleware session id');
  if (!session && path === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
