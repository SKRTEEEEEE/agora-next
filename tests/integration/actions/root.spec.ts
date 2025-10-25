import { test, expect } from "@playwright/test";
import { getUrl } from "../../utils/url";

/**
 * Integration tests for root actions
 * These tests require the Next.js server to be running
 */
test.describe("Root Actions Integration", () => {
  test.describe("Visit Counter Cookie Management", () => {
    test("should redirect to /ceo on first visit", async ({ context }) => {
      const page = await context.newPage();
      
      // Clear cookies before test
      await context.clearCookies();
      
      await page.goto(getUrl());
      
      // Should redirect to locale/ceo
      expect(page.url()).toContain("/ceo");
      
      // Check visit cookie is set
      const cookies = await context.cookies();
      const visitsCookie = cookies.find(c => c.name === "visits");
      expect(visitsCookie).toBeDefined();
      expect(visitsCookie?.value).toBe("1");
      
      await page.close();
    });

    test("should redirect to /ceo on second visit", async ({ context }) => {
      const page = await context.newPage();
      
      // Set visits cookie to 1
      await context.addCookies([{
        name: "visits",
        value: "1",
        domain: "localhost",
        path: "/",
      }]);
      
      await page.goto(getUrl());
      
      expect(page.url()).toContain("/ceo");
      
      const cookies = await context.cookies();
      const visitsCookie = cookies.find(c => c.name === "visits");
      expect(visitsCookie?.value).toBe("2");
      
      await page.close();
    });

    test("should redirect with query param on third visit", async ({ context }) => {
      const page = await context.newPage();
      
      // Set visits cookie to 2 (next visit will be 3rd)
      await context.addCookies([{
        name: "visits",
        value: "2",
        domain: "localhost",
        path: "/",
      }]);
      
      await page.goto(getUrl());
      
      // Should redirect with redirect query param
      expect(page.url()).toContain("redirect=manageRoot");
      
      const cookies = await context.cookies();
      const visitsCookie = cookies.find(c => c.name === "visits");
      expect(visitsCookie?.value).toBe("3");
      
      await page.close();
    });

    test("should not redirect after 3 visits", async ({ context }) => {
      const page = await context.newPage();
      
      // Set visits cookie to 4 (more than 3)
      await context.addCookies([{
        name: "visits",
        value: "4",
        domain: "localhost",
        path: "/",
      }]);
      
      await page.goto(getUrl());
      
      // Should not redirect anymore
      const cookies = await context.cookies();
      const visitsCookie = cookies.find(c => c.name === "visits");
      // Cookie should remain at 4, no increment
      expect(visitsCookie?.value).toBe("4");
      
      await page.close();
    });
  });
});
