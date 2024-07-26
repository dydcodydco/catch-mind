import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('------------------------------------middleware start ------------------------------------------');
  console.log('------------------------------------middleware end ------------------------------------------');

  const session = await auth();
  const path = request.nextUrl.pathname;

  console.log(path, '--------------------middleware path');
  console.log(session?.user?.id, '--------------------middleware session id');
  if (session && path === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  
  if (pathname.startsWith('/room/')) {
    // 여기서 referer를 체크합니다
    const referer = request.headers.get('referer')
    
    if (!referer || !referer.includes(request.headers.get('host') || '')) {
      // 유효하지 않은 접근으로 간주하고 리다이렉트
      return NextResponse.redirect(new URL('/join-room', request.url))
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
