import { NextRequest, NextResponse } from 'next/server';

export { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  console.log(request);
  return NextResponse.next();
}