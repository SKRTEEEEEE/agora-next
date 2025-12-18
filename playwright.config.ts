import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '*.spec.ts',
  timeout: 90000,
  retries: process.env.CI ? 2 : 1,
  outputDir: "docs/test-results/artifacts",
  fullyParallel: true,
  
  // Global expect timeout
  expect: {
    timeout: 10000,
  },
  
  // Automatic server management
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:3002',
    reuseExistingServer: true,
    timeout: 120000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
  
  // Configure projects for different test types
  projects: [
    {
      name: 'unit',
      testMatch: /tests\/unit\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'integration',
      testMatch: /tests\/integration\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.CI ? 'http://localhost:3002' : 'http://localhost:3002',
      },
    },
    {
      name: 'e2e',
      testMatch: /tests\/e2e\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.CI ? 'http://localhost:3002' : 'http://localhost:3002',
      },
    },
  ],
  
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  
  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { outputFolder: 'docs/test-results/html-report', open: 'never' }],
    ['json', { outputFile: 'docs/test-results/test-results.json' }],
  ],
});
