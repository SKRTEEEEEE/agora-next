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
    "/academia": "/academia",
    "/academia/ejercicios": {
      en: "/academia/exercises",
      de: "/academia/ubungen",
      es: "/academia/ejercicios",
      ca: "/academia/exercicis"
    },
    "/academia/ejercicios/[...slug]": {
      en: "/academia/exercises/[...slug]",
      de: "/academia/ubungen/[...slug]",
      es: "/academia/ejercicios/[...slug]",
      ca: "/academia/exercicis/[...slug]"
    },
    "/academia/tarifas": {
      en: "/academia/pricing",
      de: "/academia/preise",
      es: "/academia/tarifas",
      ca: "/academia/tarifes"
    },
    "/academia/temas-ejercicios": {
      en: "/academia/exercise-topics",
      de: "/academia/ubungsthemen",
      es: "/academia/temas-ejercicios",
      ca: "/academia/temes-exercicis"
    },
    "/academia/temas-ejercicios/[tema]": {
      en: "/academia/exercise-topics/[tema]",
      de: "/academia/ubungsthemen/[tema]",
      es: "/academia/temas-ejercicios/[tema]",
      ca: "/academia/temes-exercicis/[tema]"
    },
  }
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);