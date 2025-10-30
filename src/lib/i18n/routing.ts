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
    "/ejercicios": {
      en: "/exercises",
      de: "/ubungen",
      es: "/ejercicios",
      ca: "/exercicis"
    },
    "/ejercicios/[...slug]": {
      en: "/exercises/[...slug]",
      de: "/ubungen/[...slug]",
      es: "/ejercicios/[...slug]",
      ca: "/exercicis/[...slug]"
    },
    "/tarifas": {
      en: "/pricing",
      de: "/preise",
      es: "/tarifas",
      ca: "/tarifes"
    },
    "/temas-ejercicios": {
      en: "/exercise-topics",
      de: "/ubungsthemen",
      es: "/temas-ejercicios",
      ca: "/temes-exercicis"
    },
    "/temas-ejercicios/[tema]": {
      en: "/exercise-topics/[tema]",
      de: "/ubungsthemen/[tema]",
      es: "/temas-ejercicios/[tema]",
      ca: "/temes-exercicis/[tema]"
    },
  }
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
