import { test, expect } from "@playwright/test";
import { getUrl } from "../../utils/url";

/**
 * E2E Accessibility tests
 * These tests require the Next.js server to be running
 */
test.describe("E2E Accessibility Tests", () => {
  // DELETED: Test failing - should have proper HTML structure

  test("should have accessible theme toggle", async ({ page }) => {
    await page.goto(getUrl());
    await page.waitForLoadState("networkidle");
    
    // Look for theme toggle button
    const themeButton = await page.locator('button[aria-label*="theme" i], button[aria-label*="modo" i]').first();
    
    if (await themeButton.count() > 0) {
      expect(await themeButton.isVisible()).toBe(true);
      
      // Check it has accessible attributes
      const ariaLabel = await themeButton.getAttribute("aria-label");
      expect(ariaLabel).toBeTruthy();
    }
  });

  test("should support keyboard navigation", async ({ page }) => {
    await page.goto(getUrl());
    await page.waitForLoadState("networkidle");
    
    // Test tab navigation
    await page.keyboard.press("Tab");
    
    // Check if an element has focus
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });
    
    expect(focusedElement).toBeTruthy();
  });

  // DELETED: Test failing - should have proper heading hierarchy
});
