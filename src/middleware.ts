import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Legacy URLs from before the locale prefix, e.g. /publications/jobs-in-tension?id=1.
// Google still knows them, so send them straight to the English article with one
// permanent redirect (query string dropped) instead of letting next-intl add a temporary hop.
const LEGACY_PUBLICATION = /^\/publications\/([a-z0-9-]+)\/?$/;

export default function middleware(request: NextRequest) {
  const match = LEGACY_PUBLICATION.exec(request.nextUrl.pathname);
  if (match) {
    const url = request.nextUrl.clone();
    url.pathname = `/en/publications/${match[1]}`;
    url.search = '';
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … /apple-app-site-association (the site has no iOS app: answer 404 directly, no locale redirect)
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|apple-app-site-association|.*\\..*).*)'
};
