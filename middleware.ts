import {NextRequest, NextResponse} from 'next/server';

const locales = ['en', 'pl', 'ua', 'ru'];
const propertyTypes = ['house', 'apartment', 'land', 'commercial'];
const transactionTypes = ['buy', 'rent'];

const getDefaultPath = (locale: string | undefined, request: NextRequest) => {
    const pathLocale = locale ?? getLocale(request);
    return `/${pathLocale}/real-estate/house/buy/all`;
};

function getLocale(request: NextRequest) {
    return 'pl';
}

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    // Check if the request is for a public file
    const isPublicFile = pathname.startsWith('/next-static') || pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|txt|xml|json|js|css|otf)$/);
    if (isPublicFile) return NextResponse.next();

    const segments = pathname.split('/').filter(Boolean);
    const localeSegment = segments[0];

    const defaultPath = getDefaultPath(localeSegment, request);

    // Check if the first segment is a valid locale
    if (locales.includes(localeSegment)) {
        if (segments.length === 1) {
            // Redirect if the route is incomplete (e.g., '/pl/')
            return NextResponse.redirect(new URL(defaultPath, request.url));
        }

        if (segments.includes('not-found')) {
            return NextResponse.next();
        }

        if (segments[2] === 'listing') {
            if (segments.length === 4) {
                return NextResponse.next();
            } else {
                return NextResponse.redirect(new URL(defaultPath, request.url)); // Incomplete or invalid listings route
            }
        }

        const propertyTypeSegment = segments[2];
        const transactionTypeSegment = segments[3];
        const locationSegment = segments[4];

        // Validate the segments for the property route
        if (
            (propertyTypeSegment && propertyTypes.includes(propertyTypeSegment.split("-")[0])) &&
            transactionTypes.includes(transactionTypeSegment) &&
            locationSegment
        ) {
            return NextResponse.next(); // Valid property route
        } else {
            return NextResponse.redirect(new URL(defaultPath, request.url)); // Invalid property route
        }
    } else {
        // Redirect if the locale is not valid or missing
        const locale = getLocale(request);
        request.nextUrl.pathname = `/${locale}${pathname}`;
        return NextResponse.redirect(request.nextUrl);
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
    ],
};
