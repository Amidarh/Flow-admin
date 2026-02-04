import { NextResponse, NextRequest } from "next/server";

const VALID_ROLES = {
    USER: 'USER',
} as const;

const ROUTE_PERMISSIONS: Record<string, string> = {
    '/dashboard': 'dashboard',
    '/admins': 'admins',
    '/users': 'users',
    '/courses': 'courses',
    '/notes': 'notes',
    '/settings': 'settings',
    '/plans': 'plans',
};

const AUTH_ROUTES = [
    '/login',
    '/sign-up',
    '/2fa',
    '/forget-password',
    '/password-reset',
    '/verify-otp',
    '/password',
    '/pricing',
    '/blog',
    '/',
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const userRole = request.cookies.get('role')?.value as
        | keyof typeof VALID_ROLES
        | undefined;

    // Redirect unauthenticated users on protected routes
    const isProtected = Object.keys(ROUTE_PERMISSIONS).some((route) =>
        pathname.startsWith(route)
    );
    if (!userRole || !VALID_ROLES[userRole]) {
        if (isProtected) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('callbackUrl', encodeURIComponent(request.url));
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    // Redirect authenticated users away from auth routes
    if (AUTH_ROUTES.includes(pathname)) {
        // return NextResponse.redirect(new URL('/home', request.url));
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    const isKnownRoute = Object.keys(ROUTE_PERMISSIONS).some((route) => pathname.startsWith(route));
    if (!isKnownRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};