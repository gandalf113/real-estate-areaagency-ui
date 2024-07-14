import { NextRequest, NextResponse } from 'next/server';

let locales = ['en', 'pl', 'ua'];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
    return 'pl';
}

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;

    // Check if the request is for a public file
    const isPublicFile = pathname.startsWith('/static') || pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|txt|xml|json|js|css|otf)$/);

    if (isPublicFile) return NextResponse.next();

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return NextResponse.next();

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Skip /static paths
    ],
};