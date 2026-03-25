import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isAuth = !!req.auth;
    const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');
    const isLoginPage = req.nextUrl.pathname === '/login';

    // Redirect authenticated users away from login page
    if (isLoginPage && isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    // Redirect unauthenticated users to login
    if (isDashboard && !isAuth) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json).*)'],
};
