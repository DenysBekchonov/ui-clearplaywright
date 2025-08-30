import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './scenarios',               // where tests are located
  fullyParallel: true,              // tests can run in parallel
  forbidOnly: !!process.env.CI,     // forbid leaving test.only in CI
  retries: process.env.CI ? 2 : 0,  // retry failed tests on CI
  workers: process.env.CI ? 1 : undefined, // avoid flaky tests on CI
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  // reporter: [['html'], ['list']],   // html report + simple list in console

  use: {
    baseURL: 'https://automationexercise.com',  // convenient to avoid writing full URLs in each test
    headless: true,                    // run in headless mode by default
    viewport: { width: 1280, height: 720 }, 
    ignoreHTTPSErrors: true,
    actionTimeout: 0,                  // no limits for actions (click, fill)
    navigationTimeout: 30000,          // max 30 seconds to wait for navigation
    trace: 'on-first-retry',           // collect trace if test fails
    video: 'retain-on-failure',        // keep video only when test fails
    screenshot: 'only-on-failure',     // take screenshot only when test fails
  },

  // can run tests on different browsers/devices
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});