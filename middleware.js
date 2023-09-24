import { NextResponse } from "next/server";

export function middleware(request) {
  const Path = request.nextUrl.pathname;
  const PublicPath = Path === "/user/login" || Path === "/user/signup";

  const token = request.cookies.get("JWT_AUTH_TOKEN");

  if (PublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  // if(!PublicPath && !token){
  //   return NextResponse.redirect(new URL("/user/login", request.nextUrl));
  // }
}

export const config = {
  matcher: ["/","/user/login", "/user/signup"],
};
