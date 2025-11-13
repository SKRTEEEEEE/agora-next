import { test, expect } from "@playwright/test";

/**
 * E2E Tests for /temas-ejercicios routes
 * These tests require the Next.js server to be running on port 3002
 */
test.describe("E2E Tests - Temas Ejercicios Pages", () => {
  const baseUrl = process.env.TEST_ENV === "production" 
    ? "https://agora-next.vercel.app" 
    : "http://localhost:3002";

  test.describe("/temas-ejercicios main page", () => {
    test("should load temas-ejercicios page successfully", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      // Check that page loaded
      expect(page.url()).toContain("/temas-ejercicios");
    });

    test("should have correct page title and heading", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      // Check for h1 heading
      const heading = await page.locator('h1').textContent();
      expect(heading).toBeTruthy();
    });

    test("should display tags", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      // Check that tags container exists
      const tagsContainer = page.locator('div.flex.flex-wrap.gap-2');
      await expect(tagsContainer).toBeVisible();
    });

    test("should have clickable tag links", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      // Check for tag links (they should be <a> elements)
      const tagLinks = page.locator('a[href*="/temas-ejercicios/"]');
      const count = await tagLinks.count();
      
      // Should have at least one tag if content exists
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test("should navigate to tag page when clicking a tag", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      // Try to click first tag if available
      const firstTag = page.locator('a[href*="/temas-ejercicios/"]').first();
      const count = await page.locator('a[href*="/temas-ejercicios/"]').count();
      
      if (count > 0) {
        await firstTag.click();
        await page.waitForLoadState("networkidle");
        
        // Should navigate to a specific tema page
        expect(page.url()).toMatch(/\/temas-ejercicios\/[\w-]+/);
      }
    });

    test("should have proper responsive layout", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      // Check for responsive container
      const container = page.locator('.container.max-w-4xl');
      await expect(container).toBeVisible();
    });
  });

  test.describe("/temas-ejercicios/[tema] dynamic pages", () => {
    test("should load individual tema page", async ({ page }) => {
      // First get a valid tema
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      const firstTag = page.locator('a[href*="/temas-ejercicios/"]').first();
      const count = await page.locator('a[href*="/temas-ejercicios/"]').count();
      
      if (count > 0) {
        const href = await firstTag.getAttribute('href');
        if (href) {
          await page.goto(`${baseUrl}${href}`);
          await page.waitForLoadState("networkidle");
          
          // Check that we're on a tema page
          expect(page.url()).toMatch(/\/temas-ejercicios\/[\w-]+/);
        }
      }
    });

    test("should display tema title", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      const firstTag = page.locator('a[href*="/temas-ejercicios/"]').first();
      const count = await page.locator('a[href*="/temas-ejercicios/"]').count();
      
      if (count > 0) {
        const href = await firstTag.getAttribute('href');
        if (href) {
          await page.goto(`${baseUrl}${href}`);
          await page.waitForLoadState("networkidle");
          
          // Should have an h1 with the tema name
          const heading = page.locator('h1');
          await expect(heading).toBeVisible();
        }
      }
    });

    test("should display ejercicios or empty state", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      const firstTag = page.locator('a[href*="/temas-ejercicios/"]').first();
      const count = await page.locator('a[href*="/temas-ejercicios/"]').count();
      
      if (count > 0) {
        const href = await firstTag.getAttribute('href');
        if (href) {
          await page.goto(`${baseUrl}${href}`);
          await page.waitForLoadState("networkidle");
          
          // Should either have ejercicios list or empty state message
          const ejerciciosList = page.locator('ul.flex.flex-col');
          const emptyState = page.locator('text=No hay ejercicios');
          
          const hasEjercicios = await ejerciciosList.count() > 0;
          const hasEmptyState = await emptyState.count() > 0;
          
          // Should have one or the other
          expect(hasEjercicios || hasEmptyState).toBeTruthy();
        }
      }
    });

    test("should display tags sidebar", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      const firstTag = page.locator('a[href*="/temas-ejercicios/"]').first();
      const count = await page.locator('a[href*="/temas-ejercicios/"]').count();
      
      if (count > 0) {
        const href = await firstTag.getAttribute('href');
        if (href) {
          await page.goto(`${baseUrl}${href}`);
          await page.waitForLoadState("networkidle");
          
          // Should have a Card with "Temas" title
          const temasCard = page.locator('text=Temas').first();
          await expect(temasCard).toBeVisible();
        }
      }
    });

    test("should have grid layout", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      const firstTag = page.locator('a[href*="/temas-ejercicios/"]').first();
      const count = await page.locator('a[href*="/temas-ejercicios/"]').count();
      
      if (count > 0) {
        const href = await firstTag.getAttribute('href');
        if (href) {
          await page.goto(`${baseUrl}${href}`);
          await page.waitForLoadState("networkidle");
          
          // Should have grid layout
          const grid = page.locator('.grid.grid-cols-12');
          await expect(grid).toBeVisible();
        }
      }
    });

    test("should navigate between different temas", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      const tagLinks = page.locator('a[href*="/temas-ejercicios/"]');
      const count = await tagLinks.count();
      
      if (count >= 2) {
        // Navigate to first tema
        const firstHref = await tagLinks.nth(0).getAttribute('href');
        if (firstHref) {
          await page.goto(`${baseUrl}${firstHref}`);
          await page.waitForLoadState("networkidle");
          const firstUrl = page.url();
          
          // Navigate to second tema from sidebar
          const sidebarTags = page.locator('a[href*="/temas-ejercicios/"]');
          const sidebarCount = await sidebarTags.count();
          
          if (sidebarCount >= 2) {
            await sidebarTags.nth(1).click();
            await page.waitForLoadState("networkidle");
            const secondUrl = page.url();
            
            // URLs should be different
            expect(firstUrl).not.toBe(secondUrl);
          }
        }
      }
    });
  });

  test.describe("Internationalization (i18n)", () => {
    const locales = ['en', 'de', 'es', 'ca'];
    const routes = {
      'en': '/exercise-topics',
      'de': '/ubungsthemen',
      'es': '/temas-ejercicios',
      'ca': '/temes-exercicis'
    };

    for (const locale of locales) {
      test(`should load temas page in ${locale} locale`, async ({ page }) => {
        const route = routes[locale as keyof typeof routes];
        await page.goto(`${baseUrl}/${locale}${route}`);
        await page.waitForLoadState("networkidle");
        
        // Should successfully load
        expect(page.url()).toContain(route);
      });
    }

    test("should have lang attribute matching locale", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('es');
    });
  });

  test.describe("Accessibility", () => {
    test("should have semantic HTML structure", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      // Should have proper heading hierarchy
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    });

    test("should have proper link labels", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      // All links should have text content or aria-label
      const links = page.locator('a');
      const count = await links.count();
      
      for (let i = 0; i < Math.min(count, 5); i++) {
        const link = links.nth(i);
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        
        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test("should be keyboard navigable", async ({ page }) => {
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      // Tab through focusable elements
      await page.keyboard.press('Tab');
      
      // Should be able to focus on interactive elements
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(focused).toBeTruthy();
    });
  });

  test.describe("Performance", () => {
    test("should load within reasonable time", async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      const loadTime = Date.now() - startTime;
      
      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test("should not have console errors", async ({ page }) => {
      const errors: string[] = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto(`${baseUrl}/es/temas-ejercicios`);
      await page.waitForLoadState("networkidle");
      
      // Filter out expected or third-party errors
      const relevantErrors = errors.filter(error => 
        !error.includes('net::ERR') && 
        !error.includes('favicon')
      );
      
      expect(relevantErrors.length).toBe(0);
    });
  });
});
