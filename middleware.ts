import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("token") as any as string;
  const isLoggedIn = token ? true : false;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
