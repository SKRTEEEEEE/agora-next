import { test, expect } from "@playwright/test";
import { getUrl } from "../../utils/url";

/**
 * E2E Smoke tests for Academia migration validation
 * Ensures all migrated pages load and function correctly
 */
test.describe("E2E Academia Migration - Smoke Tests", () => {
  test.describe("All Pages Load Successfully", () => {
    test("home page (/) should load without errors", async ({ page }) => {
      const response = await page.goto(getUrl("/"));
      expect(response?.status()).toBeLessThan(400);
      await page.waitForLoadState("networkidle");
    });

    test("tarifas page should load without errors", async ({ page }) => {
      const response = await page.goto(getUrl("/tarifas"));
      expect(response?.status()).toBeLessThan(400);
      await page.waitForLoadState("networkidle");
    });

    test("temas-ejercicios page should load without errors", async ({ page }) => {
      const response = await page.goto(getUrl("/temas-ejercicios"));
      expect(response?.status()).toBeLessThan(400);
      await page.waitForLoadState("networkidle");
    });

    test("ejercicios page should load without errors", async ({ page }) => {
      const response = await page.goto(getUrl("/ejercicios"));
      expect(response?.status()).toBeLessThan(400);
      await page.waitForLoadState("networkidle");
    });
  });

  test.describe("Critical UI Elements Present", () => {
    test("home page should have main heading and CTA buttons", async ({ page }) => {
      await page.goto(getUrl("/"));
      await page.waitForLoadState("networkidle");

      // Main heading
      const heading = page.locator('h1:has-text("Aprendiendo")');
      expect(await heading.isVisible()).toBeTruthy();

      // CTA buttons
      const verEjerciciosButton = page.locator('a[href*="/ejercicios"]').first();
      expect(await verEjerciciosButton.isVisible()).toBeTruthy();
    });

    test("tarifas page should display plan cards", async ({ page }) => {
      await page.goto(getUrl("/tarifas"));
      await page.waitForLoadState("networkidle");

      const heading = page.locator('h1:has-text("Planes de Suscripción")');
      expect(await heading.isVisible()).toBeTruthy();
    });

    test("ejercicios page should have heading and description", async ({ page }) => {
      await page.goto(getUrl("/ejercicios"));
      await page.waitForLoadState("networkidle");

      const heading = page.locator('h1:has-text("Ejercicios")');
      expect(await heading.isVisible()).toBeTruthy();

      const description = page.locator('text=Aprendiendo de forma dinámica');
      expect(await description.isVisible()).toBeTruthy();
    });
  });

  test.describe("No Console Errors on Critical Pages", () => {
    test("home page should not have critical console errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", msg => {
        if (msg.type() === "error") {
          errors.push(msg.text());
        }
      });

      await page.goto(getUrl("/"));
      await page.waitForLoadState("networkidle");

      // Filter out known non-critical errors (e.g., NEXT_NOT_FOUND)
      const criticalErrors = errors.filter(err => 
        !err.includes("NEXT_NOT_FOUND") &&
        !err.includes("favicon")
      );

      expect(criticalErrors.length).toBe(0);
    });

    test("ejercicios page should not have critical console errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("console", msg => {
        if (msg.type() === "error") {
          errors.push(msg.text());
        }
      });

      await page.goto(getUrl("/ejercicios"));
      await page.waitForLoadState("networkidle");

      const criticalErrors = errors.filter(err => 
        !err.includes("NEXT_NOT_FOUND") &&
        !err.includes("favicon")
      );

      expect(criticalErrors.length).toBe(0);
    });
  });

  test.describe("Responsive Design", () => {
    test("home page should be responsive on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(getUrl("/"));
      await page.waitForLoadState("networkidle");

      const heading = page.locator('h1:has-text("Aprendiendo")');
      expect(await heading.isVisible()).toBeTruthy();
    });

    test("ejercicios page should be responsive on tablet", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(getUrl("/ejercicios"));
      await page.waitForLoadState("networkidle");

      const heading = page.locator('h1:has-text("Ejercicios")');
      expect(await heading.isVisible()).toBeTruthy();
    });
  });

  test.describe("SEO and Metadata", () => {
    test("home page should have correct title", async ({ page }) => {
      await page.goto(getUrl("/"));
      await page.waitForLoadState("networkidle");

      const title = await page.title();
      expect(title).toContain("Academia dev");
    });

    test("ejercicios page should have correct title", async ({ page }) => {
      await page.goto(getUrl("/ejercicios"));
      await page.waitForLoadState("networkidle");

      const title = await page.title();
      expect(title).toContain("Ejercicios");
    });

    test("temas page should have correct title", async ({ page }) => {
      await page.goto(getUrl("/temas-ejercicios"));
      await page.waitForLoadState("networkidle");

      const title = await page.title();
      expect(title).toContain("Temas");
    });
  });

  test.describe("Performance Basics", () => {
    test("home page should load within reasonable time", async ({ page }) => {
      const startTime = Date.now();
      await page.goto(getUrl("/"));
      await page.waitForLoadState("networkidle");
      const loadTime = Date.now() - startTime;

      // Should load within 10 seconds (generous for CI environments)
      expect(loadTime).toBeLessThan(10000);
    });

    test("ejercicios page should load within reasonable time", async ({ page }) => {
      const startTime = Date.now();
      await page.goto(getUrl("/ejercicios"));
      await page.waitForLoadState("networkidle");
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(10000);
    });
  });
});
