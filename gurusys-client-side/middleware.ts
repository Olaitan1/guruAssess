import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const verify = request.cookies.get("token");
    const url = request.nextUrl.clone();

    if (!verify && url.pathname.includes("/dashboard")) {
        url.pathname = "/admin";
        return NextResponse.redirect(url);
    }

    if (verify && url.pathname === "/admin") {
        url.pathname = "/admin/dashboard";
        return NextResponse.redirect(url);
    }
}
