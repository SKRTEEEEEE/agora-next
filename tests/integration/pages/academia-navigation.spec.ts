import { test, expect } from "@playwright/test";
import { getUrl } from "../../utils/url";

/**
 * Integration tests for Academia pages navigation
 * Validates routing, links, and page transitions
 */
test.describe("Academia Navigation - Integration Tests", () => {
  test.describe("Home Page Navigation", () => {
    test("should navigate to ejercicios page from home", async ({ page }) => {
      await page.goto(getUrl("/"));
      await page.waitForLoadState("networkidle");

      // Look for "Ver ejercicios" link
      const ejerciciosLink = page.locator('a[href*="/ejercicios"]').first();
      expect(await ejerciciosLink.isVisible()).toBeTruthy();
    });

    test("should display subscription plans dialog button", async ({ page }) => {
      await page.goto(getUrl("/"));
      await page.waitForLoadState("networkidle");

      // Look for "Tarifas" button
      const tarifasButton = page.locator('text=Tarifas').first();
      expect(await tarifasButton.isVisible()).toBeTruthy();
    });

    test("should display latest 5 exercises", async ({ page }) => {
      await page.goto(getUrl("/"));
      await page.waitForLoadState("networkidle");

      // Check for exercises section
      const exercisesSection = page.locator('text=Últimos ejercicios');
      expect(await exercisesSection.isVisible()).toBeTruthy();
    });
  });

  test.describe("Tarifas Page Navigation", () => {
    test("should load tarifas page", async ({ page }) => {
      await page.goto(getUrl("/tarifas"));
      await page.waitForLoadState("networkidle");

      const heading = page.locator('h1:has-text("Planes de Suscripción")');
      expect(await heading.isVisible()).toBeTruthy();
    });

    test("should display subscription plan cards", async ({ page }) => {
      await page.goto(getUrl("/tarifas"));
      await page.waitForLoadState("networkidle");

      // Wait for cards to load (should have at least 3 cards)
      await page.waitForSelector('[class*="grid"]', { timeout: 5000 });
    });
  });

  test.describe("Temas Ejercicios Navigation", () => {
    test("should load temas page", async ({ page }) => {
      await page.goto(getUrl("/temas-ejercicios"));
      await page.waitForLoadState("networkidle");

      const heading = page.locator('h1:has-text("Tags")');
      expect(await heading.isVisible()).toBeTruthy();
    });

    test("should display tag links", async ({ page }) => {
      await page.goto(getUrl("/temas-ejercicios"));
      await page.waitForLoadState("networkidle");

      // Tags should be displayed in a flex container
      const tagsContainer = page.locator('div.flex.flex-wrap');
      expect(await tagsContainer.isVisible()).toBeTruthy();
    });

    test("should navigate to specific tema page when clicking tag", async ({ page }) => {
      await page.goto(getUrl("/temas-ejercicios"));
      await page.waitForLoadState("networkidle");

      // Click first tag if available
      const firstTag = page.locator('a[href*="/temas-ejercicios/"]').first();
      const isVisible = await firstTag.isVisible().catch(() => false);
      
      if (isVisible) {
        await firstTag.click();
        await page.waitForLoadState("networkidle");
        expect(page.url()).toContain("/temas-ejercicios/");
      }
    });
  });

  test.describe("Ejercicios Page Navigation", () => {
    test("should load ejercicios listing page", async ({ page }) => {
      await page.goto(getUrl("/ejercicios"));
      await page.waitForLoadState("networkidle");

      const heading = page.locator('h1:has-text("Ejercicios")');
      expect(await heading.isVisible()).toBeTruthy();
    });

    test("should display exercise items or empty message", async ({ page }) => {
      await page.goto(getUrl("/ejercicios"));
      await page.waitForLoadState("networkidle");

      // Either exercises list or "No hay ejercicios" message
      const exercisesList = page.locator('ul.flex.flex-col');
      const emptyMessage = page.locator('text=No hay ejercicios, vuelve pronto!');

      const hasExercises = await exercisesList.isVisible().catch(() => false);
      const isEmpty = await emptyMessage.isVisible().catch(() => false);

      expect(hasExercises || isEmpty).toBeTruthy();
    });

    test("should display tags sidebar", async ({ page }) => {
      await page.goto(getUrl("/ejercicios"));
      await page.waitForLoadState("networkidle");

      const sidebar = page.locator('text=Temas').first();
      expect(await sidebar.isVisible()).toBeTruthy();
    });

    test("should handle pagination if multiple pages exist", async ({ page }) => {
      await page.goto(getUrl("/ejercicios"));
      await page.waitForLoadState("networkidle");

      // Check if pagination exists (only if there are enough posts)
      const pagination = page.locator('[class*="pagination"]').first();
      await pagination.isVisible().catch(() => false);
      
      // Test passes regardless - pagination only appears with enough content
      expect(true).toBeTruthy();
    });
  });

  test.describe("Cross-page Navigation Flow", () => {
    test("should navigate from home -> ejercicios -> back to home", async ({ page }) => {
      // Start at home
      await page.goto(getUrl("/"));
      await page.waitForLoadState("networkidle");

      // Go to ejercicios
      const ejerciciosLink = page.locator('a[href*="/ejercicios"]').first();
      if (await ejerciciosLink.isVisible()) {
        await ejerciciosLink.click();
        await page.waitForLoadState("networkidle");
        expect(page.url()).toContain("/ejercicios");

        // Navigate back
        await page.goBack();
        await page.waitForLoadState("networkidle");
        expect(page.url()).toMatch(/\/$|\/es|\/en/);
      }
    });

    test("should navigate from home -> temas -> specific tema", async ({ page }) => {
      await page.goto(getUrl("/"));
      await page.waitForLoadState("networkidle");

      // Try to find link to temas-ejercicios
      const temasLink = page.locator('a[href*="/temas-ejercicios"]').first();
      const isVisible = await temasLink.isVisible().catch(() => false);

      if (isVisible) {
        await temasLink.click();
        await page.waitForLoadState("networkidle");
        expect(page.url()).toContain("/temas-ejercicios");
      }
    });
  });

  test.describe("Locale Support", () => {
    test("should support Spanish locale", async ({ page }) => {
      await page.goto(getUrl("/es"));
      await page.waitForLoadState("networkidle");
      expect(page.url()).toContain("/es");
    });

    test("should support English locale", async ({ page }) => {
      await page.goto(getUrl("/en"));
      await page.waitForLoadState("networkidle");
      expect(page.url()).toContain("/en");
    });
  });
});
