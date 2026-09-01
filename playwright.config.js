const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // 1. GLOBAL EXECUTION CONTROL
  testDir: './tests',                     // Directory where Playwright searches for test files
  timeout: 30000,                         // Maximum duration (ms) allowed for a single test case (default: 30s)[cite: 1, 2]
  expect: {
    timeout: 5000,                        // Maximum time (ms) for web-first assertions like expect().toBeVisible()[cite: 1, 2, 6]
  },
  fullyParallel: true,                    // Run tests across all files concurrently
  forbidOnly: !!process.env.CI,           // Fail the build if test.only is left in code on CI[cite: 4]
  retries: process.env.CI ? 2 : 0,        // Retry failed tests on CI pipelines to catch flakiness
  workers: process.env.CI ? 1 : undefined,// Limit parallel worker processes on CI agents[cite: 1, 4, 5]

  // 2. REPORTING CONFIGURATION
  reporter: [
    ['list'],                             // Console terminal output
    ['html', { open: 'never' }],          // Standard HTML report viewer[cite: 1]
    ['allure-playwright', { outputFolder: 'allure-results' }] // Third-party visual dashboard[cite: 3, 7]
  ],

  // 3. SHARED CONTEXT & OPTIONS (use)
  use: {
    baseURL: 'https://www.saucedemo.com', // Base path for relative navigation (page.goto('/'))
    trace: 'on-first-retry',              // Record execution traces for failed attempts[cite: 1]
    screenshot: 'only-on-failure',        // Capture screenshot on test failure[cite: 1]
    video: 'retain-on-failure',           // Record video on failure[cite: 1]
    headless: true,                       // Run browser in headless mode by default[cite: 1]
  },

  // 4. MULTI-BROWSER / DEVICE MATRIX
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] }, // Predefined browser viewport/user agent settings[cite: 1]
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});