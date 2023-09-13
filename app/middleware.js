import { NextResponse } from "next/server";

export function middleware(request) {
  const Path = request.nextUrl.pathname;
  const PublicPath = Path === "/user/login" || Path === "/user/signup";

  const token = request.cookies.get();
  console.log(token)

  if (PublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if(!PublicPath && !token){
    return NextResponse.redirect(new URL("/user/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/user/login", "/user/signup"],
};
