import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import { pathnames } from './pathnames';

export type AllPathnamesType = keyof typeof pathnames;


export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', "es", "ca"],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // List of rutes translation
  pathnames
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
