import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware({
  ...routing,
  // Disable Accept-Language auto-detection so we always default to `routing.defaultLocale`
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Align the Language cookie with the active locale so the client and server agree
  const pathnameLocale = request.nextUrl.pathname.split('/')[1];
  const activeLocale = routing.locales.includes(pathnameLocale as any)
    ? pathnameLocale
    : routing.defaultLocale;

  const cookieLocale = request.cookies.get('Language')?.value;
  if (cookieLocale !== activeLocale) {
    response.cookies.set('Language', activeLocale, { path: '/' });
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
