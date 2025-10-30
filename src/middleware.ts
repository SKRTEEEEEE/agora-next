import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

// Middleware de internacionalización
const middleware = createMiddleware(routing);

export default middleware;

export const config = {
  matcher: ['/', '/(de|en|es|ca)/:path*']
};