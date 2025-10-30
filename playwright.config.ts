import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  timeout: 30000,
  retries: 2,
  outputDir: "docs/test-results",
  
  // Different test projects for different types of tests
  projects: [
    {
      name: 'unit',
      testMatch: '**/unit/**/*.spec.ts',
      use: {
        headless: true,
      },
    },
    {
      name: 'integration',
      testMatch: '**/integration/**/*.spec.ts',
      use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
      },
    },
    {
      name: 'e2e',
      testMatch: '**/e2e/**/*.spec.ts',
      use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
      },
    },
  ],
  
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  
  reporter: [
    ['list'],
    ['html', { outputFolder: 'docs/test-reports' }]
  ],
});
