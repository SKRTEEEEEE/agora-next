# Refactor test
## Objetivo
Terminar correctamente los test para que pasen
## Contexto
Tienes un servidor de backend en :3001, y una no del frontend :3002. Por lo que puedes ejecutar test que requieren servidor sin problema (npm run test --individuales)
- No ejecutes npm run test 'completo', ya que este tarda casi 20/30 mins
- Tambien puedes fijarte en los ./docs/test-result para ver la ultima ejecucción

- **Tienes acceso al MCP de playwright**
## Key points
1. [ ] Asegurar-se de que el check del coverage es correcto
2. [ ] Asegurar-se que pasan todos los test, se pueden eliminar los mas conflictivos
3. [ ] Mejorar el tiempo de ejecucción de los test (si es posible)
4. [ ] Comprobar que el enfoque de la action playwright.yml sea correcto

## Test que no pasan - antes de cambios

```bash

  38 failed
    [unit] › tests\unit\pages\temas-ejercicios-production.spec.ts:24:7 › Unit Tests - Temas Ejercicios Production Config › should have generateStaticParams export for static generation
    [unit] › tests\unit\pages\temas-ejercicios-production.spec.ts:35:7 › Unit Tests - Temas Ejercicios Production Config › should have dynamicParams = false to prevent dynamic routes in production
    [unit] › tests\unit\pages\temas-ejercicios-production.spec.ts:42:7 › Unit Tests - Temas Ejercicios Production Config › should have dynamic = "force-static" or "error" for production builds
    [unit] › tests\unit\pages\temas-ejercicios-production.spec.ts:64:7 › Unit Tests - Temas Ejercicios Production Config › should use getAllTags for generating static paths
    [unit] › tests\unit\pages\temas-ejercicios-production.spec.ts:79:7 › Unit Tests - Temas Ejercicios Production Config › should return correct shape from generateStaticParams
    [integration] › tests\integration\components\site-header-navigation.spec.ts:8:7 › SiteHeader Apps Dropdown Navigation › should contain Apps dropdown menu in navigation
    [integration] › tests\integration\components\site-header-navigation.spec.ts:17:7 › SiteHeader Apps Dropdown Navigation › Apps dropdown should have correct structure
    [integration] › tests\integration\components\site-header-navigation.spec.ts:33:7 › SiteHeader Apps Dropdown Navigation › should have navigation to desarrollador.tech as main link
    [integration] › tests\integration\components\site-header-navigation.spec.ts:40:7 › SiteHeader Apps Dropdown Navigation › should have external links to profile-skrt.vercel.app
    [integration] › tests\integration\components\site-header-navigation.spec.ts:50:7 › SiteHeader Apps Dropdown Navigation › should have link to dev.desarrollador.tech
    [integration] › tests\integration\pages\academia-navigation.spec.ts:10:9 › Academia Navigation - Integration Tests › Home Page Navigation › should navigate to ejercicios page from home
    [integration] › tests\integration\pages\academia-navigation.spec.ts:39:9 › Academia Navigation - Integration Tests › Tarifas Page Navigation › should load tarifas page
    [integration] › tests\integration\pages\academia-navigation.spec.ts:47:9 › Academia Navigation - Integration Tests › Tarifas Page Navigation › should display subscription plan cards
    [integration] › tests\integration\pages\academia-navigation.spec.ts:57:9 › Academia Navigation - Integration Tests › Temas Ejercicios Navigation › should load temas page
    [integration] › tests\integration\pages\academia-navigation.spec.ts:65:9 › Academia Navigation - Integration Tests › Temas Ejercicios Navigation › should display tag links
    [integration] › tests\integration\pages\academia-navigation.spec.ts:91:9 › Academia Navigation - Integration Tests › Ejercicios Page Navigation › should load ejercicios listing page
    [integration] › tests\integration\pages\academia-navigation.spec.ts:99:9 › Academia Navigation - Integration Tests › Ejercicios Page Navigation › should display exercise items or empty message
    [integration] › tests\integration\pages\academia-navigation.spec.ts:113:9 › Academia Navigation - Integration Tests › Ejercicios Page Navigation › should display tags sidebar
    [integration] › tests\integration\routes\temas-ejercicios.spec.ts:99:9 › Integration Tests - Temas Ejercicios Routes › /temas-ejercicios/[tema] dynamic page › should have generateStaticParams function
    [integration] › tests\integration\routes\temas-ejercicios.spec.ts:123:9 › Integration Tests - Temas Ejercicios Routes › /temas-ejercicios/[tema] dynamic page › should render EjercicioItem components
    [integration] › tests\integration\routes\temas-ejercicios.spec.ts:178:9 › Integration Tests - Temas Ejercicios Routes › Route i18n configuration › should have /temas-ejercicios route configured
    [integration] › tests\integration\routes\temas-ejercicios.spec.ts:185:9 › Integration Tests - Temas Ejercicios Routes › Route i18n configuration › should have translations for all locales
    [integration] › tests\integration\routes\temas-ejercicios.spec.ts:201:9 › Integration Tests - Temas Ejercicios Routes › Route i18n configuration › should have dynamic route segment configured
    [integration] › tests\integration\routes\temas-ejercicios.spec.ts:208:9 › Integration Tests - Temas Ejercicios Routes › Route i18n configuration › should have dynamic translations for all locales
    [e2e] › tests\e2e\accessibility\a11y.spec.ts:9:7 › E2E Accessibility Tests › should have proper HTML structure
    [e2e] › tests\e2e\performance\index.spec.ts:66:7 › Next.js Performance + JS Coverage › Home page metrics and coverage
    [e2e] › tests\e2e\routes\temas-ejercicios-e2e.spec.ts:51:9 › E2E Tests - Temas Ejercicios Pages › /temas-ejercicios main page › should navigate to tag page when clicking a tag
    [e2e] › tests\e2e\routes\temas-ejercicios-e2e.spec.ts:185:9 › E2E Tests - Temas Ejercicios Pages › /temas-ejercicios/[tema] dynamic pages › should navigate between different temas
    [e2e] › tests\e2e\smoke\academia-migration.spec.ts:16:9 › E2E Academia Migration - Smoke Tests › All Pages Load Successfully › tarifas page should load without errors
    [e2e] › tests\e2e\smoke\academia-migration.spec.ts:22:9 › E2E Academia Migration - Smoke Tests › All Pages Load Successfully › temas-ejercicios page should load without errors
    [e2e] › tests\e2e\smoke\academia-migration.spec.ts:28:9 › E2E Academia Migration - Smoke Tests › All Pages Load Successfully › ejercicios page should load without errors
    [e2e] › tests\e2e\smoke\academia-migration.spec.ts:36:9 › E2E Academia Migration - Smoke Tests › Critical UI Elements Present › home page should have main heading and CTA buttons
    [e2e] › tests\e2e\smoke\academia-migration.spec.ts:49:9 › E2E Academia Migration - Smoke Tests › Critical UI Elements Present › tarifas page should display plan cards
    [e2e] › tests\e2e\smoke\academia-migration.spec.ts:57:9 › E2E Academia Migration - Smoke Tests › Critical UI Elements Present › ejercicios page should have heading and description
    [e2e] › tests\e2e\smoke\academia-migration.spec.ts:90:9 › E2E Academia Migration - Smoke Tests › No Console Errors on Critical Pages › ejercicios page should not have critical console errors
    [e2e] › tests\e2e\smoke\academia-migration.spec.ts:120:9 › E2E Academia Migration - Smoke Tests › Responsive Design › ejercicios page should be responsive on tablet
    [e2e] › tests\e2e\smoke\academia-migration.spec.ts:139:9 › E2E Academia Migration - Smoke Tests › SEO and Metadata › ejercicios page should have correct title
    [e2e] › tests\e2e\smoke\academia-migration.spec.ts:147:9 › E2E Academia Migration - Smoke Tests › SEO and Metadata › temas page should have correct title
  1 flaky
    [e2e] › tests\e2e\routes\temas-ejercicios-e2e.spec.ts:287:9 › E2E Tests - Temas Ejercicios Pages › Performance › should load within reasonable time
  262 passed (5.3m)

```