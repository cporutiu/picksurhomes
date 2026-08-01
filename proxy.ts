import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Keystatic uses local storage — editing only ever happens via `npm run dev`
// on a developer's machine, then the resulting content is committed/pushed.
// The admin UI and its API have no purpose (and no login) on the deployed
// site, so block them there entirely rather than expose an unauthenticated
// CMS to the public.
export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};
