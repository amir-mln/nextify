import { PROTECTED_PAGES } from "constants/protected-routes";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.AUTH_ACCESS_TOKEN;
  const currentPath = req.nextUrl.pathname;
  const isProtectedPage = PROTECTED_PAGES.SHOULD_SIGNED_IN.includes(currentPath);
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/auth/signin";

  if (!token && isProtectedPage) return NextResponse.redirect(redirectUrl);
}
