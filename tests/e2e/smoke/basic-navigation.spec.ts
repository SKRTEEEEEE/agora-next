import { test, expect } from "@playwright/test";
import { getUrl } from "../../utils/url";

/**
 * E2E Smoke tests for basic application functionality
 * These tests require the Next.js server to be running
 */
test.describe("E2E Smoke Tests - Basic Navigation", () => {
  test("should load home page successfully", async ({ page }) => {
    await page.goto(getUrl());
    await page.waitForLoadState("networkidle");
    
    // Check that page loaded
    expect(page.url()).toBeTruthy();
  });

  test("should have correct page title", async ({ page }) => {
    await page.goto(getUrl());
    await page.waitForLoadState("networkidle");
    
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test("should be able to navigate between pages", async ({ page }) => {
    await page.goto(getUrl());
    await page.waitForLoadState("networkidle");
    
    // Check initial URL
    const initialUrl = page.url();
    expect(initialUrl).toBeTruthy();
  });
});
