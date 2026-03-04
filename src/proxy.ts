import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

    const {pathname} = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const isValidAccessToken = accessToken && jwtUtils.verifyToken(accessToken,process.env.JWT_ACCESS_SECRET as string).success

    


  
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
