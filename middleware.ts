import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const response = NextResponse.next();
  response.headers.set("url-pathname", pathname);

  return response;
}
