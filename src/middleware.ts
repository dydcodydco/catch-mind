import { NextRequest, NextResponse } from 'next/server';

export { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  console.log('------------------------------------middleware start ------------------------------------------');
  console.log('------------------------------------middleware end ------------------------------------------');
  return NextResponse.next();
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
