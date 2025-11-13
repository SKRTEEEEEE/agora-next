export const pathnames = {
  "/": "/",
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
} as const;
