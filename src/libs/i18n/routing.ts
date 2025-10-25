import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export type AllPathnamesType = keyof typeof routing.pathnames;


export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', "es", "ca"],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // List of rutes translation
  pathnames: {
    "/":"/",
    "/academia":{
      en: "/academy",
      de: "/akademie",
      es: "/academia",
      ca: "/academia"
    },
    "/academia/ejercicios":"/academia/ejercicios",
    "/academia/ejercicios/[...slug]":"/academia/ejercicios/[...slug]",
    "/academia/tarifas":"/academia/tarifas",
    "/academia/temas-ejercicios": "/academia/temas-ejercicios",
    "/academia/temas-ejercicios/[tema]": "/academia/temas-ejercicios/[tema]",
  }
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);